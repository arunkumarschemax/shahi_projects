import { CentricPoDetails, CentricPoItemDetails, CentricPoItemVariant } from "@project-management-system/shared-models";
import { EMP_STR_EXP, FORMAT_SEPARATION_KEYWORD, FRIEGHT_PAY_METHOD, ITEM_NO_EXP, ITEM_TEXT_END_TEXT, ITEM_TEXT_END_TEXT1, ITEM_VARIANT_START_TEXT, MANUFACTURE_1, MANUFACTURE_2, PAYMENT_TERM_DESCRIPTION, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_TEXT, REFRENCE, SPECIAL_INSTRUCTIONS, UNWANTED_TEXT_1, UNWANTED_TEXT_10, UNWANTED_TEXT_11, UNWANTED_TEXT_12, UNWANTED_TEXT_13, UNWANTED_TEXT_2, UNWANTED_TEXT_3, UNWANTED_TEXT_4, UNWANTED_TEXT_5, UNWANTED_TEXT_6, UNWANTED_TEXT_7, UNWANTED_TEXT_8, UNWANTED_TEXT_9 } from "./popdf-regex-expressions";


/** 
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib. 
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details. 
 * step 1 : Filter all the empty strings and unwanted texts from the raw data 
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data 
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push 
 *   all the matched texts into an array.Now this array will contains all the items of the pdf 
 * ste 4 : Find the no of item variant lines and push them into item variant details. 
 * @param pdf  
 * @returns {CentricPoDetails} 
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new CentricPoDetails()
    const itemsArr: { itemIndex: number, amountIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: CentricPoItemDetails[] = []
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
            let frieghtPayMethodIndex;
            let paymentTermDescriptionIndex;
            let refrenceIndex;
            let specialInstructionsIndex;
            for (const [ind, ele] of firstPageContent.entries()) {
                if (ele.str == PO_NUMBER_TEXT) {
                    poNumberTextIndex = ind
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
                if (ele.str == PO_DOC_DATE_TXT) {
                    dateSentIndex = ind
                }
                if (ele.str == MANUFACTURE_1 || ele.str == MANUFACTURE_2) {
                    materialIndex = ind
                }
                if (ele.str == REFRENCE) {
                    refrenceIndex = ind
                }
                if (ele.str == FRIEGHT_PAY_METHOD) {
                    frieghtPayMethodIndex = ind
                }
                if (ele.str == PAYMENT_TERM_DESCRIPTION) {
                    paymentTermDescriptionIndex = ind
                }
                if (ele.str == SPECIAL_INSTRUCTIONS) {
                    specialInstructionsIndex = ind
                }

            }
            poData.poNumber = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX].str
            poData.poDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 1].str
            poData.shipment = firstPageContent[frieghtPayMethodIndex - 1].str
            poData.season = firstPageContent[dateSentIndex + 4].str
            poData.portOfExport = firstPageContent[dateSentIndex + 2].str
            poData.portOfEntry = firstPageContent[dateSentIndex + 3].str
            if (firstPageContent.length > refrenceIndex + 1) {
                const referenceContentWithAlphabets = firstPageContent[refrenceIndex + 1].str;
                if (/[a-zA-Z]/.test(referenceContentWithAlphabets)) {
                    poData.Refrence = referenceContentWithAlphabets;
                } else {
                    poData.Refrence = "-";
                }
            }
            // poData.Refrence = firstPageContent[dateSentIndex + 10].str
            poData.poPrint = firstPageContent[dateSentIndex + 7].str
            poData.paymentTermDescription = firstPageContent[paymentTermDescriptionIndex + 2].str
            // poData.specialInstructions = firstPageContent[specialInstructionsIndex + 1]?.str || '';
            if (typeof poData.specialInstructions === 'undefined') {
                poData.specialInstructions = '';
            }
            for (let i = specialInstructionsIndex + 1; i < firstPageContent.length; i++) {
                if (firstPageContent[i]?.str.includes("PO History")) {
                    poData.specialInstructions += firstPageContent[i]?.str.split("PO History")[0];
                    break;
                } else {
                    poData.specialInstructions += firstPageContent[i]?.str || '';
                }
            }
            poData.division = firstPageContent[dateSentIndex + 5].str
            poData.incoterm = firstPageContent[dateSentIndex - 8].str + firstPageContent[dateSentIndex - 7].str + " " + firstPageContent[dateSentIndex - 6].str + firstPageContent[dateSentIndex - 5].str.replace(/\d+|\w+/g, "")

            // poData.shipToAdd = firstPageContent[dateSentIndex + 5].str 
            // poData.shipToAdd = firstPageContent[materialIndex + 48].str + " " + firstPageContent[materialIndex + 49].str + " " +
            //     firstPageContent[materialIndex + 50].str + " " + firstPageContent[materialIndex + 51].str
            // const shipToAddFirstIndex = firstPageContent[materialIndex + 48].str;
            // const replacingIndexFirstIndex = shipToAddFirstIndex.replace(/\d+$/, '');
            // let shipToAddData = replacingIndexFirstIndex + " " +
            //     firstPageContent[materialIndex + 49].str + " " +
            //     firstPageContent[materialIndex + 50].str + " " +
            //     firstPageContent[materialIndex + 51].str;
            // shipToAddData += " " + firstPageContent[materialIndex + 52].str;
            // poData.shipToAdd = shipToAddData;

            const shipToAddIndexHasNumber = /^\d+$/.test(firstPageContent[materialIndex + 48]?.str);
            if (shipToAddIndexHasNumber) {
                poData.shipToAdd = firstPageContent[materialIndex + 49]?.str + " " +
                                  firstPageContent[materialIndex + 50]?.str + " " +
                                  firstPageContent[materialIndex + 51]?.str + " " +
                                  firstPageContent[materialIndex + 52]?.str;
            } else {
                poData.shipToAdd = firstPageContent[materialIndex + 48]?.str + " " +
                                  firstPageContent[materialIndex + 49]?.str + " " +
                                  firstPageContent[materialIndex + 50]?.str + " " +
                                  firstPageContent[materialIndex + 51]?.str;
            }
            
            poData.manufacture = firstPageContent[materialIndex + 36].str + " " + firstPageContent[materialIndex + 37].str + " " +
                firstPageContent[materialIndex + 38].str + " " + firstPageContent[materialIndex + 39].str + " " + firstPageContent[materialIndex + 40].str

            let selleraddress = '';
            for (let a = sellerStartIndex + 1; a < sellerEndIndex; a++) {
                selleraddress += firstPageContent[a].str + ','
            }
            poData.sellerAddress = selleraddress
            let buyerAddress = '';
            for (let b = buyerAddStartIndex + 1; b < buyerAddEndIndex; b++) {
                if (b < buyerAddEndIndex - 1)
                    buyerAddress += firstPageContent[b].str + ','
                else
                    buyerAddress += firstPageContent[b].str
            }
            poData.buyerAddress = buyerAddress;
            let shipToAddress = ''
            for (let c = shipToAddStartIndex + 1; c < shipToAddEndIndex; c++) {
                if (c < shipToAddEndIndex - 1)
                    shipToAddress += firstPageContent[c].str + ','
                else
                    shipToAddress += firstPageContent[c].str
            }
            poData.shipToAddress = shipToAddress;
        }
        // po details parsing ends here  
        //------------------------------------------------------------------------------------------- 
        // data filtering satrts here 
        // filtering the pdf data i.e remove unnecessary data which is  not required for data parsing 
        let startFlag = false; // Initialize startFlag to false  
        let endFlag = false;   // Initialize endFlag to false 
        const pageContent = textContent.items.filter((val, index) => {
            if (val.str == 'PO Line') { startFlag = true; }
            if (endFlag) {
                startFlag = false;
                endFlag = false;
            }
            if (val.str == "Total Eaches") { endFlag = true; }
            // using NOR operation for filtering   
            return !(
                EMP_STR_EXP.test(val.str)
                || val.str.includes(UNWANTED_TEXT_1)
                || val.str.includes(UNWANTED_TEXT_2)
                || val.str.includes(UNWANTED_TEXT_3)
                || val.str.includes(UNWANTED_TEXT_4)
                || val.str.includes(UNWANTED_TEXT_5)
                || val.str.includes(UNWANTED_TEXT_6)
                || val.str.includes(UNWANTED_TEXT_7)
                // || val.str.includes(UNWANTED_TEXT_8)  
                // || val.str.includes(UNWANTED_TEXT_9)  
                // || val.str.includes(UNWANTED_TEXT_10)  
                // || val.str.includes(UNWANTED_TEXT_11)  
                // || val.str.includes(UNWANTED_TEXT_12)  
                // || val.str.includes(UNWANTED_TEXT_13)   
                // || val.str.includes(UNWANTED_TEXT_14)  
                // || val.str.includes(UNWANTED_TEXT_15)  
                // || val.str.includes(UNWANTED_TEXT_16)  
                // || val.str.includes(UNWANTED_TEXT_17)  
                // || val.str.includes(UNWANTED_TEXT_18)  

            )
        })
        filteredData.push(...pageContent)
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
        if (rec.str.includes(FORMAT_SEPARATION_KEYWORD)) {
            isSecondFormat = true;
        }

    }

    console.log(itemsArr, 'AAAAAAAAA')

    /* 2nd format */
    if (ITEM_TEXT_END_TEXT1 === "Per Pack" && isSecondFormat) {
        for (const rec of itemsArr) {
            let shipToEndIndex = 0;
            let itemTextEndIndex = 0;
            let itemDetailsEndIndex = 0
            let itemVariantStartIndex
            const itemDetailsObj = new CentricPoItemDetails();
            console.log(rec.itemIndex, "iiiiiiiiiiiiii")
            itemDetailsObj.poLine = filteredData[rec.itemIndex + 11].str
            itemDetailsObj.material = filteredData[rec.itemIndex + 12].str
            itemDetailsObj.ppkupc = filteredData[rec.itemIndex + 13].str;
            itemDetailsObj.color = filteredData[rec.itemIndex + 14].str;

            for (let i = rec.itemIndex + 15; i < filteredData.length; i++) {
                if (filteredData[i].str.includes("Mens")) {
                    itemDetailsObj.color = itemDetailsObj.color.split("Mens")[0];
                    break;
                } else if (filteredData[i].str.includes("Womens")) {
                    itemDetailsObj.color = itemDetailsObj.color.split("Womens")[0];
                    break;
                } else {
                    itemDetailsObj.color += filteredData[i].str;
                }
            }
            let foundMens = false;
            for (let i = rec.itemIndex + 16; i < filteredData.length; i++) {
                const currentInfo = filteredData[i].str;
                if (currentInfo.includes("Mens" || "Womens")) {
                    itemDetailsObj.gender = currentInfo;
                    foundMens = true;
                    break;
                }
            }
            if (!foundMens) {
                for (let i = rec.itemIndex; i < filteredData.length; i++) {
                    const currentInfo = filteredData[i].str;

                    if (currentInfo.includes("Mens" || "Womens")) {
                        itemDetailsObj.gender = currentInfo;
                        break;
                    }
                }
            }
            let shortDescriptionMatching;
            let vendorBookingFlagMatching;
            let packMethodMatching;

            filteredData.forEach(item => {
                if (/Short/.test(item.str)) {
                    shortDescriptionMatching = item;
                    return;
                }
            });

            if (shortDescriptionMatching) {
                itemDetailsObj.shortDescription = shortDescriptionMatching.str.replace(/Short Description: /g, "");
            }

            filteredData.forEach(item => {
                if (/Vendor Booking Flag =/.test(item.str)) {
                    vendorBookingFlagMatching = item;
                    return;
                }
            });

            if (vendorBookingFlagMatching) {
                itemDetailsObj.vendorBookingFlag = vendorBookingFlagMatching.str.replace(/Vendor Booking Flag =/g, "");
            }


            filteredData.forEach(item => {
                if (/Pack Method: /.test(item.str)) {
                    packMethodMatching = item;
                    return;
                }
            });

            if (packMethodMatching) {
                itemDetailsObj.packMethod = packMethodMatching.str.replace(/Pack Method: /g, "");
            }

            itemTextEndIndex = rec.amountIndex
            itemVariantStartIndex = itemTextEndIndex + 1

            //------------------------------------------------------------------------- 
            // item varinat details parsing starts here 
            const itemVarinatsTextArr = []
            let k = itemVariantStartIndex
            while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT1)) {
                itemVarinatsTextArr.push(filteredData[k].str)
                k++
            }
            console.log(itemVarinatsTextArr, 'VVVVVVVv')
            const stringsWithLength13 = itemVarinatsTextArr.filter(value => typeof value === 'string' && value.length === 13 || value.length === 12);
            console.log("stringsWithLength13", stringsWithLength13)
            const regexPattern = /[0-9]{2}[A-Z]{5}\w+-\d+/;
            const CompMaterialData = itemVarinatsTextArr.filter(value => regexPattern.test(value));
            console.log("CompMaterialData", CompMaterialData);
            const sizes = stringsWithLength13.length;
            const count = itemVarinatsTextArr.length / sizes;
            const itemVariantsArr: CentricPoItemVariant[] = []
            for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
                const itemVariantsObj = new CentricPoItemVariant();
                itemVariantsObj.comptMaterial = CompMaterialData[l];
                itemVariantsObj.upc = stringsWithLength13[l];
                const upcIndex = itemVarinatsTextArr.indexOf(stringsWithLength13[l]);
                if (upcIndex !== -1 && upcIndex < itemVarinatsTextArr.length - 1) {
                    const nextIndexValue = itemVarinatsTextArr[upcIndex + 1];

                    itemVariantsObj.ratio = itemVarinatsTextArr[upcIndex - 1];
                    itemVariantsObj.size = itemVarinatsTextArr[upcIndex - 2];

                    if (!isNaN(parseInt(nextIndexValue))) {
                        itemVariantsObj.quantity = nextIndexValue;
                        itemVariantsObj.label = "-";

                        itemVariantsObj.unitPrice = itemVarinatsTextArr[upcIndex + 3];
                        itemVariantsObj.exFactory = itemVarinatsTextArr[upcIndex + 5];
                        itemVariantsObj.exPort = itemVarinatsTextArr[upcIndex + 6];
                        itemVariantsObj.deliveryDate = itemVarinatsTextArr[upcIndex + 7];
                        itemVariantsObj.retialPrice = itemVarinatsTextArr[upcIndex + 8];
                    } else {
                        itemVariantsObj.label = nextIndexValue;
                        const labelWithQuantity = itemVarinatsTextArr[upcIndex + 2];

                        if (!isNaN(parseInt(labelWithQuantity))) {
                            itemVariantsObj.quantity = labelWithQuantity;

                            itemVariantsObj.unitPrice = itemVarinatsTextArr[upcIndex + 4];
                            itemVariantsObj.exFactory = itemVarinatsTextArr[upcIndex + 6];
                            itemVariantsObj.exPort = itemVarinatsTextArr[upcIndex + 7];
                            itemVariantsObj.deliveryDate = itemVarinatsTextArr[upcIndex + 8];
                            itemVariantsObj.retialPrice = itemVarinatsTextArr[upcIndex + 9];
                        }
                    }
                }
                // itemVariantsObj.label = itemVarinatsTextArr[(count * l) + 1]
                // itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + 5]
                // itemVariantsObj.unitPrice = itemVarinatsTextArr[(count * l) +  7]
                // itemVariantsObj.exFactory = itemVarinatsTextArr[(count * l) + 9]
                // itemVariantsObj.exPort = itemVarinatsTextArr[(count * l) + 10]
                // itemVariantsObj.deliveryDate = itemVarinatsTextArr[(count * l) + 11]
                // itemVariantsObj.retialPrice = itemVarinatsTextArr[(count * l) + 12]

                itemVariantsObj.currency = itemVarinatsTextArr[(count * l) + count - 4]
                itemVariantsObj.amount = itemVarinatsTextArr[(count * l) + count - 1]
                console.log(itemVariantsObj)
                itemVariantsArr.push(itemVariantsObj)
            }
            itemDetailsObj.CentricpoItemVariantDetails = itemVariantsArr
            itemDetailsArr.push(itemDetailsObj)
        }
    }

    /* 1st format */
    else if (ITEM_TEXT_END_TEXT === "Total Eaches") {
        for (const rec of itemsArr) {
            let shipToEndIndex = 0;
            let itemTextEndIndex = 0;
            let itemDetailsEndIndex = 0
            let itemVariantStartIndex
            const itemDetailsObj = new CentricPoItemDetails();
            console.log(rec.itemIndex, "iiiiiiiiiiiiii")
            itemDetailsObj.poLine = filteredData[rec.itemIndex + 10].str
            itemDetailsObj.material = filteredData[rec.itemIndex + 11].str
            itemDetailsObj.color = filteredData[rec.itemIndex + 12].str;

            for (let i = rec.itemIndex + 13; i < filteredData.length; i++) {
                if (filteredData[i].str.includes("Mens")) {
                    itemDetailsObj.color = itemDetailsObj.color.split("Mens")[0];
                    break;
                } else if (filteredData[i].str.includes("Womens")) {
                    itemDetailsObj.color = itemDetailsObj.color.split("Womens")[0];
                    break;
                } else {
                    itemDetailsObj.color += filteredData[i].str;
                }
            } let foundMens = false;
            for (let i = rec.itemIndex + 13; i < filteredData.length; i++) {
                const currentInfo = filteredData[i].str;
                if (currentInfo.includes("Mens" || "Womens")) {
                    itemDetailsObj.gender = currentInfo;
                    foundMens = true;
                    break;
                }
            }
            if (!foundMens) {
                for (let i = rec.itemIndex; i < filteredData.length; i++) {
                    const currentInfo = filteredData[i].str;

                    if (currentInfo.includes("Mens" || "Womens")) {
                        itemDetailsObj.gender = currentInfo;
                        break;
                    }
                }
            }
            let shortDescriptionMatching;
            let vendorBookingFlagMatching;
            let packMethodMatching;

            filteredData.forEach(item => {
                if (/Short/.test(item.str)) {
                    shortDescriptionMatching = item;
                    return;
                }
            });

            if (shortDescriptionMatching) {
                itemDetailsObj.shortDescription = shortDescriptionMatching.str.replace(/Short Description: /g, "");
            }

            filteredData.forEach(item => {
                if (/Vendor Booking Flag =/.test(item.str)) {
                    vendorBookingFlagMatching = item;
                    return;
                }
            });

            if (vendorBookingFlagMatching) {
                itemDetailsObj.vendorBookingFlag = vendorBookingFlagMatching.str.replace(/Vendor Booking Flag =/g, "");
            }


            filteredData.forEach(item => {
                if (/Pack Method: /.test(item.str)) {
                    packMethodMatching = item;
                    return;
                }
            });

            if (packMethodMatching) {
                itemDetailsObj.packMethod = packMethodMatching.str.replace(/Pack Method: /g, "");
            }

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
            const stringsWithLength13 = itemVarinatsTextArr.filter(value => typeof value === 'string' && value.length === 13 || value.length === 12);
            const sizes = stringsWithLength13.length;
            const count = itemVarinatsTextArr.length / sizes;
            const itemVariantsArr: CentricPoItemVariant[] = []
            for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
                const itemVariantsObj = new CentricPoItemVariant();
                itemVariantsObj.size = itemVarinatsTextArr[(count * l) + 0]
                itemVariantsObj.upc = itemVarinatsTextArr[(count * l) + 1]
                const labelWithAlphabets = itemVarinatsTextArr[(count * l) + 2];
                if (/[a-zA-Z]/.test(labelWithAlphabets)) {
                    itemVariantsObj.label = labelWithAlphabets;
                } else {
                    itemVariantsObj.label = "-";
                }
                itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + count - 8]
                itemVariantsObj.unitPrice = itemVarinatsTextArr[(count * l) + count - 6]
                itemVariantsObj.exFactory = itemVarinatsTextArr[(count * l) + count - 4]
                itemVariantsObj.exPort = itemVarinatsTextArr[(count * l) + count - 3]
                itemVariantsObj.deliveryDate = itemVarinatsTextArr[(count * l) + count - 2]
                itemVariantsObj.retialPrice = itemVarinatsTextArr[(count * l) + count - 1]

                itemVariantsObj.currency = itemVarinatsTextArr[(count * l) + count - 4]
                itemVariantsObj.amount = itemVarinatsTextArr[(count * l) + count - 1]
                console.log(itemVariantsObj)
                itemVariantsArr.push(itemVariantsObj)
            }
            itemDetailsObj.CentricpoItemVariantDetails = itemVariantsArr
            itemDetailsArr.push(itemDetailsObj)
        }
    }

    poData.CentricpoItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}

