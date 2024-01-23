import { BomPoDetails, BomPoItemDetails, BomPoItemVariant } from "@project-management-system/shared-models"
import { EMP_STR_EXP, ITEM_BILL_TO_START_TEXT, ITEM_MATERIAL_INDEX, ITEM_NO_EXP, ITEM_SHIP_TO_END_TEXT, ITEM_TEXT_END_TEXT, ITEM_VARIANT_START_TEXT, PO_DOC_DATE_TXT, PO_NUMBER_TEXT, UNWANTED_TEXT_1, UNWANTED_TEXT_2, UNWANTED_TEXT_3, UNWANTED_TEXT_4, UNWANTED_TEXT_5, UNWANTED_TEXT_6, UNWANTED_TEXT_7 } from "./bom-pdf-regex-expressions"


/** 
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib. 
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details. 
 * step 1 : Filter all the empty strings and unwanted texts from the raw data 
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data 
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push 
 *   all the matched texts into an array.Now this array will contains all the items of the pdf 
 * ste 4 : Find the no of item variant lines and push them into item variant details. 
 * @param pdf  
 * @returns {BomPoDetails} 
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new BomPoDetails()
    const itemsArr: { itemIndex: number, amountIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: BomPoItemDetails[] = []
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent: any = await page.getTextContent();
        // console.log(textContent) 
        //parsing  po data  
        // po details exists only in first data of pdf ,so using only first page for extracting po details 
        if (i == 1) {
            const firstPageContent: any[] = textContent.items.filter((v) => {
                return !EMP_STR_EXP.test(v.str)
            })
            console.log(firstPageContent)
            // find indexes of all the po data fields 
            let poNumberTextIndex
            let sellerStartIndex
            let sellerEndIndex
            let buyerAddStartIndex
            let buyerAddEndIndex
            let shipToAddStartIndex;
            let shipToAddEndIndex;
            let dateSentIndex;
            let materialIndex;
            for (const [ind, ele] of firstPageContent.entries()) {
                if (ele.str == PO_NUMBER_TEXT) {
                    poNumberTextIndex = ind
                }
                if (ele.str == ITEM_BILL_TO_START_TEXT) {
                    buyerAddStartIndex = ind 
                }
                if (ele.str == 'GREENSBORO') {
                    shipToAddStartIndex = ind + 3;
                    buyerAddEndIndex = ind + 4
                }
                if (ele.str === 'PLAN LES OUATES') {
                    shipToAddStartIndex = ind + 2;
                    buyerAddEndIndex = ind + 3
                }
                if (ele.str == 'TORONTO') {
                    shipToAddStartIndex = ind + 3;
                    buyerAddEndIndex = ind + 4
                }
                if (ele.str === 'SEOUL') {
                    shipToAddStartIndex = ind + 2;
                    buyerAddEndIndex = ind + 3
                }
                if (ele.str == ITEM_SHIP_TO_END_TEXT) {
                    shipToAddEndIndex = ind
                }
                if (ele.str == PO_DOC_DATE_TXT) {
                    dateSentIndex = ind
                }
                if (ele.str == ITEM_MATERIAL_INDEX) {
                    materialIndex = ind
                }
            }
            poData.styleName = firstPageContent[poNumberTextIndex +2].str
            poData.style = firstPageContent[shipToAddEndIndex -4].str
            poData.msc = firstPageContent[shipToAddEndIndex + 7].str
            poData.season = firstPageContent[shipToAddEndIndex -5].str
            poData.factoryLo = firstPageContent[buyerAddStartIndex +2].str
            poData.status = firstPageContent[buyerAddStartIndex +8].str
            poData.exp = firstPageContent[shipToAddEndIndex +3].str
        }

        // po details parsing ends here  
        //------------------------------------------------------------------------------------------- 
        // data filtering satrts here 
        // filtering the pdf data i.e remove unnecessary data which is  not required for data parsing 
        let startFlag = false;
        let endFlag = false;
        const pageContent = textContent.items.filter((val, index) => {
            if (val.str == 'UOM') {
                startFlag = true;
            }
        
            if (endFlag) {
                startFlag = false;
                endFlag = false;
            }
        
            if (val.str == "CONT - ") {
                endFlag = true;
            }
        
            return !(
                EMP_STR_EXP.test(val.str)
                || val.str.includes(UNWANTED_TEXT_1)
                || val.str.includes(UNWANTED_TEXT_2)
                || val.str.includes(UNWANTED_TEXT_3)
                || val.str.includes(UNWANTED_TEXT_4)
                || val.str.includes(UNWANTED_TEXT_5)
                || val.str.includes(UNWANTED_TEXT_6)
                || val.str.includes(UNWANTED_TEXT_7)
                || /\w+\s+\d+\/+\d+/.test(val.str)
            );
        });
        
        const printedIndex = pageContent.findIndex(val => val.str.includes("Printed:"));
        if (printedIndex !== -1) {
            const startIndex = Math.max(0, printedIndex - 6);
            const endIndex = printedIndex + 1;
            pageContent.splice(startIndex, endIndex - startIndex, ...pageContent.slice(endIndex));
        }
        filteredData.push(...pageContent);
    }           
    //------------------------------------------------------------------------------ 
    console.log(filteredData, "filteredData")
    let prevItemIndex = 0
    let prevColorIndex = 0;
    let isSecondFormat = false;
    for (const [index, rec] of filteredData.entries()) {
        if (rec.str.match(ITEM_NO_EXP)) {
            prevItemIndex = index
        }
        if (rec.str.includes(ITEM_VARIANT_START_TEXT)) {
            itemsArr.push({ itemIndex: prevItemIndex, amountIndex: index })
        }
       

    }

    console.log(itemsArr, 'AAAAAAAAA')


    for (const rec of itemsArr) {
        let shipToEndIndex = 0;
        let itemTextEndIndex = 0;
        let itemDetailsEndIndex = 0;
        let itemVariantStartIndex;
    
        const itemDetailsObj = new BomPoItemDetails();
        console.log(rec.itemIndex, "iiiiiiiiiiiiii");
    
        //-------------------#
        const vendorDescIndex = filteredData.findIndex(item => item.str === "VENDOR/DESCRIPTION");
        const lastUpdatedIndex = filteredData.findIndex(item => item.str === "Last Updated:");
        if (vendorDescIndex !== -1 && lastUpdatedIndex !== -1) {
            itemDetailsObj.poLine = filteredData.slice(vendorDescIndex + 1, lastUpdatedIndex).map(item => item.str).join(' ');
        }
       //-------------------Vendor/Description
        const startKeywords = ["CONT -", "SHAX -", "NIKE -"];
        const startIndex = filteredData.findIndex(item => startKeywords.some(keyword => item.str.includes(keyword)));
        const colorlastUpdatedIndex = filteredData.findIndex(item => item.str === "Last Updated:");
        if (startIndex !== -1 && colorlastUpdatedIndex !== -1) {
            itemDetailsObj.color = filteredData.slice(startIndex, colorlastUpdatedIndex).map(item => item.str).join(' ');
        }

        

        itemDetailsObj.material = filteredData[rec.itemIndex + 12].str.replace(/^\d{2}|-.*$/g, '');
        itemDetailsObj.ppkupc = filteredData[rec.itemIndex + 13].str;
        // itemDetailsObj.color = filteredData[rec.itemIndex + 14].str;
    
    
            itemTextEndIndex = rec.amountIndex
            itemVariantStartIndex = itemTextEndIndex + 1

            //------------------------------------------------------------------------- 
            // item varinat details parsing starts here 
            const itemVarinatsTextArr = []
            let k = itemVariantStartIndex
            while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT)) {
                itemVarinatsTextArr.push(filteredData[k].str)
                k++
            }
            console.log(itemVarinatsTextArr, 'VVVVVVVv')
            const stringsWithLength13 = itemVarinatsTextArr.filter(value => value.includes('Plug CW Cd:'));

            console.log("stringsWithLength13", stringsWithLength13)

            const sizes = stringsWithLength13.length;
            const count = itemVarinatsTextArr.length / sizes;

            const itemVariantsArr: BomPoItemVariant[] = []

            for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
                const itemVariantsObj = new BomPoItemVariant();
                itemVariantsObj.size = itemVarinatsTextArr[(count * l) + 19]
                itemVariantsObj.upc = itemVarinatsTextArr[(count * l) + 1]
                itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + count + 19]
               
                console.log(itemVariantsObj)
                itemVariantsArr.push(itemVariantsObj)
            }
            itemDetailsObj.BompoItemVariantDetails = itemVariantsArr
            itemDetailsArr.push(itemDetailsObj)


            
        }

  
    poData.BomPoItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}
