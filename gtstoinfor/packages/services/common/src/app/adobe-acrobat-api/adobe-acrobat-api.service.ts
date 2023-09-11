import { Injectable } from '@nestjs/common';
import { CommonResponseModel } from '@project-management-system/shared-models';
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
import { appConfig } from 'packages/services/common/config';
import { LegalPoPdfDto } from './dto/legal-po-pdf.dto';
import { ACCEPTNACE_DATE, DELIVERY_DATE_INDEX, DESCRIPTION_INDEX, ITEM_NO_INDEX, MATERIAL_INDEX, MODE_INDEX, PO_NUMBER_POSITION } from './pdf-positions-constants';
import { PoItemDetailsDto } from './dto/po-item-details.dto';
import { OpenAIApi, Configuration, CreateCompletionRequest } from 'openai';
import { PoItemVariantDto } from './dto/po-item-variant-details';
const AdmZip = require('adm-zip');
const path = require('path');

export class CreateCompletionDto {
    question: string;
    model?: string;
    temperature?: number;
}
@Injectable()
export class AdobeAcrobatApiService {
    private openAIApi: OpenAIApi;
    constructor() {

    }

    async createCompletion({
        question,
        model,
        temperature,
    }: CreateCompletionDto) {
        try {
            const configuration = new Configuration({
                // organization:'org-aACNaAwGXVoOc2ELjyhPYulY',
                apiKey: process.env.OPENAI_API_KEY,
            });

            this.openAIApi = new OpenAIApi(configuration);
            const params: CreateCompletionRequest = {
                prompt: question,
                model: model || 'gpt-3.5-turbo',
                temperature: temperature || 1,
            };
            const { data } = await this.openAIApi.createCompletion(params);

            return data;
        } catch (e) {
            console.log(e)
            throw new Error(e);
        }
    }

    //First create an ExecutionContext using credentials

    async createExecutionContext() {
        try {
            const { adobeAcrobatApiCred } = appConfig
            const credentials = PDFServicesSdk.Credentials
                .servicePrincipalCredentialsBuilder()
                .withClientId(adobeAcrobatApiCred.client_credentials.client_id)
                .withClientSecret(adobeAcrobatApiCred.client_credentials.client_secret)
                .build();
            const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
            return executionContext
        } catch (err) {
            throw Error("Error while creating execution context")
        }
    }


    async extractTextFromPdf(pdfFile) {
        // Build extractPDF options
        const executionContext = await this.createExecutionContext()
        const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
            .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT)
            .addCharInfo(false)
            .getStylingInfo(false)
            .build()
        // Create a new operation instance.
        const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
            input = PDFServicesSdk.FileRef.createFromLocalFile(
                pdfFile.path,
                PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
            );
        // Set operation input from a source file.
        extractPDFOperation.setInput(input);

        // Set options
        extractPDFOperation.setOptions(options);

        //Generating a file name
        let outputFilePath = createOutputFilePath();
        const result = await extractPDFOperation.execute(executionContext)

        await result.saveAsFile(outputFilePath)


        //Generates a string containing a directory structure and file name for the output file.
        function createOutputFilePath() {
            let date = new Date();
            let dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + "-" +
                ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2);
            return ("output/ExtractTextTableWithTableStructure/extract" + dateString + ".zip");
        }
        console.log('pdf file',pdfFile)
        await this.usePdf2Json(pdfFile)
        const tableWiseMap = await this.extractJSONObject(outputFilePath)
        const poPdfData = await this.constructDataFromPdfJson(tableWiseMap)
        return poPdfData
    }

    async usePdf2Json(pdfFile){
        console.log(pdfFile,'pdf 2 json called');
        
        import('pdf2json/pdfparser').then(async (pdfParser:any) => {
            await pdfParser.loadPDF(pdfFile.path)
            await pdfParser.on("pdfParser_dataError", (errData:any) => console.error(errData.parserError) );
            await pdfParser.on("pdfParser_dataReady", pdfData => {
                console.log(pdfData)
            });
        
        })
       
    }


    async extractJSONObject(filepath) {
        // Path to the zip file
        const zipFilePath = filepath;
        // Name of the JSON file inside the zip folder
        const jsonFileName = 'structuredData.json';
        const zip = new AdmZip(zipFilePath);
        try {
            // Get the JSON file entry
            const jsonFileEntry = zip.getEntry(jsonFileName);

            if (jsonFileEntry) {
                // Read the JSON file content
                const jsonFileContent = jsonFileEntry.getData().toString('utf8');
                const jsonData = JSON.parse(jsonFileContent);
                const pathAndTextArr = []
                const tableWiseMap = new Map<string, any[]>()
                for (let rec of jsonData.elements) {
                    if (rec.Path && rec.Text) {
                        const pathAndTextObj = { path: rec.Path, text: rec.Text, bounds: rec.Bounds }
                        pathAndTextArr.push(pathAndTextObj)
                    }
                }
                for (let i = 1; i < 30; i++) {
                    for (const obj of pathAndTextArr) {
                        if (obj.path.includes('Table')) {
                            const tableName = (i === 1) ? `Table/` : `Table[${i}]`
                            if (obj.path.includes(tableName)) {
                                if (tableWiseMap.has(tableName)) {
                                    tableWiseMap.get(tableName).push(obj)
                                } else {
                                    tableWiseMap.set(tableName, [obj])
                                }
                            }
                        }
                    }
                }
                return tableWiseMap
            } else {
                console.error(`JSON file ${jsonFileName} not found in the zip archive.`);
                throw Error(`JSON file ${jsonFileName} not found in the zip archive.`)
            }
        } catch (error) {
            console.error('Error extracting and parsing JSON data:', error);
            throw Error('Error extracting and parsing JSON data:')
        }
    }

    async constructDataFromPdfJson(tableWiseMap: Map<string, any[]>) {
        console.log('constructDataFromPdfJson')
        try {
            const poPdfArr: LegalPoPdfDto[] = []
            const poItemDetailsArr: PoItemDetailsDto[] = []
            const tablesArr = Array.from(tableWiseMap.entries());
            for (const [tableIndex, value] of tablesArr.values()) {
                // const poNumber = value
                //     .find(e => e.path?.includes(PO_NUMBER_POSITION))?.text
                //     .split("/")[1];
                if (value && value[0].text.includes('ITEM#')) {
                    const matchingIndices = [];
                    const specificIndices = [];

                    const itemNumberFormat = /^0\d{4}\s.*$/;

                    const dataRows = value.filter(entry => !entry.path.includes('TH'));

                    for (const [index, item] of dataRows.entries()) {
                        if (itemNumberFormat.test(item.text)) {
                            if (String(item.text).length < 7) {
                                matchingIndices.push(index);
                            } else {
                                specificIndices.push(index)
                            }
                        }
                    }

                    if (matchingIndices && matchingIndices.length) {
                        //item details loop
                        // console.log(matchingIndices, 'matching indices')
                        for (const index of matchingIndices) {
                            const itemTopBound = dataRows[index].bounds[3]
                            const itemElemets = dataRows.filter((a) => a.bounds[3] === itemTopBound)
                            // console.log(itemElemets)
                            const poItemDetailsDto = new PoItemDetailsDto();
                            poItemDetailsDto.itemNo = dataRows[index + ITEM_NO_INDEX].text;
                            poItemDetailsDto.matrial = dataRows[index + MATERIAL_INDEX].text;
                            poItemDetailsDto.description = dataRows[index + DESCRIPTION_INDEX].text;
                            poItemDetailsDto.mode = dataRows[index + MODE_INDEX].text;
                            poItemDetailsDto.acceptanceDate = dataRows[index + ACCEPTNACE_DATE].text;
                            poItemDetailsDto.deliveryDate = dataRows[index + DELIVERY_DATE_INDEX].text;


                            // item variant details loop

                            const variantsStartLineindex: number = await this.findNearestIndexOfValue(dataRows, (index + ACCEPTNACE_DATE), "__________________")
                            const endingLineIndexOfTheVariants: number = await this.findNearestIndexOfValue(dataRows, variantsStartLineindex, "__________________")
                            // check if variants content is picking as individual cell or single cell through the length of the first element.
                            // if the first element lenght is more(consider 4) ,pick all elements from single cell else
                            // pick elements from each cell
                            // console.log(dataRows[index + ACCEPTNACE_DATE])'

                            // If any item  starts the end of that page , that item related variants will be in next page.
                            // so ${variantsStartLineindex} will return 0 if the index will be in next else it returns satrt line index
                            // console.log(dataRows[index + ITEM_NO_INDEX].text, '--item number --')
                            const itemVariantsArr: PoItemVariantDto[] = []
                            if (variantsStartLineindex) {
                                // console.log(dataRows[index + ACCEPTNACE_DATE])
                                const firstElement = dataRows[index + ACCEPTNACE_DATE + 1].text
                                // console.log(firstElement, 'first element')
                                if (firstElement?.length > 4) {
                                    //if picked as single cell,then split cell into array of values
                                    const splittedCell = firstElement.split(/\s+/)
                                    // console.log(splittedCell, '--splited cell --')
                                    // console.log(splittedCell.length, Math.floor(splittedCell.length / 6))
                                    for (let i = 0; i < Math.floor(splittedCell.length / 6); i++) {

                                        const itemVariantsObj = new PoItemVariantDto();
                                        itemVariantsObj.uom = splittedCell[(6 * i) + 0]
                                        itemVariantsObj.unitPrice = splittedCell[(6 * i) + 1] + ' ' + splittedCell[(6 * i) + 2]
                                        itemVariantsObj.size = splittedCell[(6 * i) + 3]
                                        itemVariantsObj.qunatity = splittedCell[(6 * i) + 4]
                                        itemVariantsObj.amount = splittedCell[(6 * i) + 5]
                                        // console.log(itemVariantsObj)
                                        itemVariantsArr.push(itemVariantsObj)
                                    }
                                } else {
                                    const noOfItems: number = await this.countMatchingValuesInRange(dataRows, variantsStartLineindex, endingLineIndexOfTheVariants, firstElement, 'text')
                                    // console.log(noOfItems, "--no of items -- ")
                                    for (let i = 0; i < noOfItems; i++) {
                                        const itemVariantsObj = new PoItemVariantDto();
                                        const firstELemtnIndex = (index + ACCEPTNACE_DATE + 1)
                                        // console.log(dataRows[firstELemtnIndex].text, 'first element')
                                        // console.log(dataRows[firstELemtnIndex + 1].text, 'second element')
                                        itemVariantsObj.uom = dataRows[(6 * i) + firstELemtnIndex + 0]?.text
                                        itemVariantsObj.unitPrice = dataRows[(6 * i) + firstELemtnIndex + 1]?.text; + ' ' + dataRows[(6 * i) + firstELemtnIndex + 2]?.text;
                                        itemVariantsObj.size = dataRows[(6 * i) + firstELemtnIndex + 3]?.text;
                                        itemVariantsObj.qunatity = dataRows[(6 * i) + firstELemtnIndex + 4]?.text;
                                        itemVariantsObj.amount = dataRows[(6 * i) + firstELemtnIndex + 5]?.text;
                                        itemVariantsArr.push(itemVariantsObj)
                                    }
                                }

                            } else {
                                const nextPageTable = tablesArr[tableIndex + 1]
                                // console.log(nextPageTable, 'next page table')

                            }
                            poItemDetailsDto.poItemVariantDetails = itemVariantsArr
                            poItemDetailsArr.push(poItemDetailsDto)
                        }
                    }
                    if (specificIndices && specificIndices.length) {
                        // console.log(specificIndices, 'specific indices')
                        for (const indextwo of specificIndices) {
                            const poItemDetailsDto = new PoItemDetailsDto();
                            const itemTopBound = dataRows[indextwo].bounds[3]
                            // console.log(itemElemets)
                            const wordsArray = dataRows[indextwo].text.split(/\s+/).filter((part) => part.trim() !== '');;
                            // console.log(wordsArray, 'words array')
                            if (wordsArray.length > 3) {
                                poItemDetailsDto.itemNo = wordsArray[0]
                                poItemDetailsDto.matrial = wordsArray[1]
                                poItemDetailsDto.description = wordsArray.slice(2, wordsArray.length - 3).join(" ");
                                poItemDetailsDto.mode = wordsArray[wordsArray.length - 2]
                                poItemDetailsDto.acceptanceDate = wordsArray[wordsArray.length - 1]
                                poItemDetailsDto.deliveryDate = wordsArray[wordsArray.length - 3]
                                poItemDetailsArr.push(poItemDetailsDto)
                            }
                            const variantsStartLineindex: number = await this.findNearestIndexOfValue(dataRows, (indextwo + ACCEPTNACE_DATE), "__________________")
                            const endingLineIndexOfTheVariants: number = await this.findNearestIndexOfValue(dataRows, variantsStartLineindex, "__________________")
                            // check if variants content is picking as individual cell or single cell through the length of the first element.
                            // if the first element lenght is more(consider 4) ,pick all elements from single cell else
                            // pick elements from each cell
                            // console.log(dataRows[index + ACCEPTNACE_DATE])'

                            // If any item  starts the end of that page , that item related variants will be in next page.
                            // so ${variantsStartLineindex} will return 0 if the index will be in next else it returns satrt line index
                            // console.log(dataRows[indextwo + ITEM_NO_INDEX].text, '--item number --')
                            const itemVariantsArr: PoItemVariantDto[] = []
                            if (variantsStartLineindex) {
                                const firstElement = dataRows[variantsStartLineindex + 1].text.split(/\s+/)
                                // console.log(firstElement, 'first element')
                                if (firstElement?.length > 7) {
                                    //if picked as single cell,then split cell into array of values
                                    const splittedCell = firstElement.split(/\s+/)
                                    // console.log(splittedCell, '--splited cell --')
                                    for (let i = 0; i < (splittedCell.length / 5); i++) {
                                        const itemVariantsObj = new PoItemVariantDto();
                                        itemVariantsObj.uom = splittedCell[(6 * i) + 0]
                                        itemVariantsObj.unitPrice = splittedCell[(6 * i) + 1] + ' ' + splittedCell[(6 * i) + 2]
                                        itemVariantsObj.size = splittedCell[(6 * i) + 3]
                                        itemVariantsObj.qunatity = splittedCell[(6 * i) + 4]
                                        itemVariantsObj.amount = splittedCell[(6 * i) + 5]
                                        itemVariantsArr.push(itemVariantsObj)
                                    }
                                } else if (firstElement.lenght < 7) {
                                    const noOfItems: number = await this.countMatchingValuesInRange(dataRows, variantsStartLineindex, endingLineIndexOfTheVariants, firstElement, 'text')
                                    // console.log(noOfItems, "--no of items -- ")
                                    for (let i = 0; i < noOfItems; i++) {
                                        const itemVariantsObj = new PoItemVariantDto();
                                        const firstELemtnIndex = endingLineIndexOfTheVariants + 1
                                        itemVariantsObj.uom = dataRows[(6 * i) + firstELemtnIndex + 0]
                                        itemVariantsObj.unitPrice = dataRows[(6 * i) + firstELemtnIndex + 1] + ' ' + dataRows[(6 * i) + firstELemtnIndex + 2]
                                        itemVariantsObj.size = dataRows[(6 * i) + firstELemtnIndex + 3]
                                        itemVariantsObj.qunatity = dataRows[(6 * i) + firstELemtnIndex + 4]
                                        itemVariantsObj.amount = dataRows[(6 * i) + firstELemtnIndex + 5]
                                        itemVariantsArr.push(itemVariantsObj)
                                    }
                                }
                            } else {
                                const nextPageTable = tablesArr[tableIndex + 1]
                                // console.log(nextPageTable, 'next page table')

                            }
                            poItemDetailsDto.poItemVariantDetails = itemVariantsArr
                            poItemDetailsArr.push(poItemDetailsDto)

                        }

                    }

                }
            }
            // console.log(poItemDetailsArr)
            return poItemDetailsArr
        } catch {

        }
    }

    async findNearestIndexOfValue(arr, targetIndex, targetValue) {
        let nearestIndex = 0; // Initialize with 0 as the default
        let minDistance = Infinity;

        for (let i = targetIndex + 1; i < arr.length; i++) {
            if (arr[i]?.text?.includes(targetValue)) {
                const distance = i - targetIndex;
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestIndex = i;
                }
            }
        }

        return nearestIndex;
    }

    async countMatchingValuesInRange(arr, startIndex, endIndex, targetValue, keyToCheck) {
        let count = 0;

        for (let i = startIndex; i <= endIndex; i++) {
            const item = arr[i];
            if (item && item[keyToCheck] === targetValue) {
                count++;
            }
        }

        return count;
    }
}
