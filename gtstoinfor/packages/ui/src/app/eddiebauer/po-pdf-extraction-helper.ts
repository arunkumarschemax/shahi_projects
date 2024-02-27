import { EddiePoDetails, EddiePoItemDetails, EddiePoItemVariant } from "@project-management-system/shared-models";
import { CURRENCY, DELIVERY_DATE, EMP_STR_EXP, FORMAT_SEPARATION_KEYWORD, FRIEGHT_PAY_METHOD, INCOTERM, ITEM_NO_EXP, ITEM_TEXT_END_TEXT, ITEM_TEXT_END_TEXT1, ITEM_VARIANT_START_TEXT, MANUFACTURE_1, PAYMENT_TERM_DESCRIPTION, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_TEXT, REFRENCE, SHIPMENT_MODE, SHIP_TO_ADD, SPECIAL_INSTRUCTIONS, UNWANTED_TEXT_1, UNWANTED_TEXT_10, UNWANTED_TEXT_11, UNWANTED_TEXT_12, UNWANTED_TEXT_13, UNWANTED_TEXT_2, UNWANTED_TEXT_3, UNWANTED_TEXT_4, UNWANTED_TEXT_5, UNWANTED_TEXT_6, UNWANTED_TEXT_7, UNWANTED_TEXT_8, UNWANTED_TEXT_9 } from "./popdf-regex-expressions";


/** 
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib. 
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details. 
 * step 1 : Filter all the empty strings and unwanted texts from the raw data 
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data 
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push 
 *   all the matched texts into an array.Now this array will contains all the items of the pdf 
 * ste 4 : Find the no of item variant lines and push them into item variant details. 
 * @param pdf  
 * @returns {EddiePoDetails} 
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new EddiePoDetails()
    const itemsArr: { itemIndex: number, amountIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: EddiePoItemDetails[] = []
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
            let shipToAddIndex;
            let incotermIndex;
            let shipMentModeIndex;
            let deliveryDateIndex;
            let currencyIndex;
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
                if (ele.str == MANUFACTURE_1) {
                    materialIndex = ind
                }
                if (ele.str == SHIP_TO_ADD) {
                    shipToAddIndex = ind
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
                if (ele.str == INCOTERM) {
                    incotermIndex = ind
                }
                if (ele.str == SHIPMENT_MODE) {
                    shipMentModeIndex = ind
                }
                if (ele.str == DELIVERY_DATE) {
                    deliveryDateIndex = ind
                }
                if (ele.str == CURRENCY) {
                    currencyIndex = ind
                }

            }
            // poData.poNumber = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX - 4].str
            const originalPoNumber = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX - 4].str;
            const splittedPoNumber = originalPoNumber.split('-');
            const reversedPoNumber = splittedPoNumber.reverse().join('-');
            poData.poNumber = reversedPoNumber;

            // poData.poDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 1].str
            poData.deliveryDate = firstPageContent[deliveryDateIndex + 2].str
            const deliveryDate = new Date(poData.deliveryDate);
            const exFactoryDate = new Date(deliveryDate);
            exFactoryDate.setDate(deliveryDate.getDate() - 9);
            poData.exFactoryDate = exFactoryDate.toISOString().split('T')[0];


            // poData.incoterm = firstPageContent[incotermIndex + 1].str
            // poData.shipmentMode = firstPageContent[shipMentModeIndex - 2].str
            // poData.paymentTerms = firstPageContent[shipMentModeIndex - 3].str



            // poData.shipToAdd =
            //     firstPageContent[shipToAddIndex - 6]?.str + " " +
            //     firstPageContent[shipToAddIndex - 5]?.str + " " +
            //     firstPageContent[shipToAddIndex - 4]?.str + " " +
            //     firstPageContent[shipToAddIndex - 3]?.str;

            // poData.manufacture =
            //     firstPageContent[shipToAddIndex - 24]?.str + " " +
            //     firstPageContent[shipToAddIndex - 23]?.str + " " +
            //     firstPageContent[shipToAddIndex - 22]?.str + " " +
            //     firstPageContent[shipToAddIndex - 21]?.str + " " +
            //     firstPageContent[shipToAddIndex - 20]?.str + " " +
            //     firstPageContent[shipToAddIndex - 19]?.str + " " +
            //     firstPageContent[shipToAddIndex - 18]?.str + " " +
            //     firstPageContent[shipToAddIndex - 17]?.str + " " +
            //     firstPageContent[shipToAddIndex - 16]?.str + " " +
            //     firstPageContent[shipToAddIndex - 15]?.str;

            /* buyer address */

            if (firstPageContent[materialIndex + 32]?.str === 'E') {
                poData.buyerAddress =
                    firstPageContent[materialIndex + 33]?.str + " " +
                    firstPageContent[materialIndex + 34]?.str + " " +
                    firstPageContent[materialIndex + 35]?.str + " " +
                    firstPageContent[materialIndex + 36]?.str;
            } else {
                poData.buyerAddress =
                    firstPageContent[materialIndex + 32]?.str + " " +
                    firstPageContent[materialIndex + 33]?.str + " " +
                    firstPageContent[materialIndex + 34]?.str + " " +
                    firstPageContent[materialIndex + 35]?.str;
            }

            if (firstPageContent[materialIndex + 32]?.str === 'E') {
                poData.deliveryAddress =
                    firstPageContent[materialIndex + 33]?.str + " " +
                    firstPageContent[materialIndex + 34]?.str + " " +
                    firstPageContent[materialIndex + 35]?.str + " " +
                    firstPageContent[materialIndex + 36]?.str;
            } else {
                poData.deliveryAddress =
                    firstPageContent[materialIndex + 32]?.str + " " +
                    firstPageContent[materialIndex + 33]?.str + " " +
                    firstPageContent[materialIndex + 34]?.str + " " +
                    firstPageContent[materialIndex + 35]?.str;
            }

            poData.currency = firstPageContent[currencyIndex + 2].str.replace(/Unit Price\s+\(/g, "").replace(/\)/g, "");

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
    // let isSecondFormat = false;
    for (const [index, rec] of filteredData.entries()) {
        // if (rec.str.match(ITEM_NO_EXP)) {
        //     prevItemIndex = index
        // }
        // if (rec.str.includes(ITEM_VARIANT_START_TEXT)) {
        //     itemsArr.push({ itemIndex: prevItemIndex, amountIndex: index })
        // }

        if (rec.str.match(/^\d{3}-\d{4}$/)) {
            prevItemIndex = index;
        }

        if (rec.str.match(ITEM_VARIANT_START_TEXT)) {
            itemsArr.push({ itemIndex: prevItemIndex, amountIndex: index })
        }
        // if (rec.str.includes(FORMAT_SEPARATION_KEYWORD)) {
        //     isSecondFormat = true;
        // }

    }

    console.log(itemsArr, 'AAAAAAAAA')


    for (const rec of itemsArr) {
        let shipToEndIndex = 0;
        let itemTextEndIndex = 0;
        let itemDetailsEndIndex = 0;
        let itemVariantStartIndex;
        const itemDetailsObj = new EddiePoItemDetails();
        console.log(rec.itemIndex, "iiiiiiiiiiiiii");

        const regex = /^\d{3}-\d{4}$/;
        const shortDescStartIndex = /^\d{3}-\d{4}$/;
        const shortDescEndIndex = /(\d+(,|.|\d+)\d+\s+EACH)|\d+\s+EACH/
        const colorRegex = /\d+\s+\w+/
        const matchIndex = filteredData.findIndex((data, index) => index >= rec.itemIndex && regex.test(data.str));
        if (matchIndex !== -1 && matchIndex < filteredData.length - 1) {
            itemDetailsObj.poLine = filteredData[matchIndex - 1].str;
            itemDetailsObj.buyerItem = filteredData[matchIndex].str;
            const ifWeFindShortDescription = filteredData.findIndex((data, index) => index >= matchIndex && shortDescStartIndex.test(data.str));
            if (ifWeFindShortDescription !== -1) {
                let shortDesc = '';
                let currentIndex = ifWeFindShortDescription + 1;
                while (currentIndex < filteredData.length && !shortDescEndIndex.test(filteredData[currentIndex].str)) {
                    shortDesc += filteredData[currentIndex].str + ' ';
                    currentIndex++;
                }
                itemDetailsObj.shortDescription = shortDesc.trim();
            }
            let currentIndex = matchIndex + 1;
            while (currentIndex < filteredData.length && !colorRegex.test(filteredData[currentIndex].str)) {
                const parts = filteredData[currentIndex].str.split('-');
                if (parts.length > 1) {
                    itemDetailsObj.color = (itemDetailsObj.color || '') + parts[1];
                }
                currentIndex++;
            }
            const buyerStyleRegex = /Buyer's Style #/
            const buyerStyleMatchingIndex = filteredData.findIndex((data, index) => index >= rec.itemIndex && buyerStyleRegex.test(data.str));
            itemDetailsObj.buyerStyle = filteredData[buyerStyleMatchingIndex + 1].str;

            // const quantityRegex = /\d+(,|.|\d)\d+/;
            // if (quantityRegex.test(filteredData[matchIndex + 2].str)) {
            //     itemDetailsObj.shortDescription = filteredData[matchIndex + 1].str;
            // } else {
            //     itemDetailsObj.shortDescription = filteredData[matchIndex + 1].str + " " + filteredData[matchIndex + 2].str;

            //     const colorMatch = /-(.*)/.exec(itemDetailsObj.shortDescription);
            //     if (colorMatch && colorMatch.length > 1) {
            //         const color = colorMatch[1].trim();                 
            //         itemDetailsObj.color = color;
            //     }
            // }
            console.log(matchIndex, "matchIndex")
        }
        // const currencyRegex = /Size Code/
        // const currencyMatchingIndex = filteredData.findIndex((data, index) => index >= rec.itemIndex && currencyRegex.test(data.str));
        // itemDetailsObj.currency = filteredData[currencyMatchingIndex - 1].str.replace(/Cost\s+\(/g, "").replace(/\)/g, "").trim();


        itemTextEndIndex = rec.amountIndex
        itemVariantStartIndex = itemTextEndIndex + 1

        //-------------------------------------------------------------------------
        // item varinat details parsing starts here
        const itemVarinatsTextArr = []
        let k = itemVariantStartIndex
        // while (k < filteredData.length && !filteredData[k].str.match(/^\d{3}-\d{4}$/)) {
        //     itemVarinatsTextArr.push(filteredData[k].str)
        //     k++
        // }
        while (k < filteredData.length) {
            if (filteredData[k].str.match(/^\d{3}-\d{4}$/)) {
                break;
            }
            else if (filteredData[k].str.includes("-Eddie Bauer LLC")) {
                break;
            } else if (filteredData[k].str.includes("Lines Ordered")) {
                break;
            } else {
                itemVarinatsTextArr.push(filteredData[k].str);
                k++;
            }
        }
        console.log(itemVarinatsTextArr, 'VVVVVVVv')
        const stringsWithLength13 = itemVarinatsTextArr.filter(value => typeof value === 'string' && value.length === 12);
        console.log(stringsWithLength13, "stringsWithLength13");
        const sizes = stringsWithLength13.length;
        const count = itemVarinatsTextArr.length / sizes;
        const itemVariantsArr: EddiePoItemVariant[] = []
        for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
            const itemVariantsObj = new EddiePoItemVariant();
            itemVariantsObj.upc = stringsWithLength13[l];/* upc */
            const upcIndex = itemVarinatsTextArr.indexOf(stringsWithLength13[l]);
            if (upcIndex !== -1 && upcIndex < itemVarinatsTextArr.length - 1) {
                itemVariantsObj.sizeCode = itemVarinatsTextArr[upcIndex - 2] /* size code */
                // itemVariantsObj.size = itemVarinatsTextArr[upcIndex - 1]; /* size */
                // itemVariantsObj.size = (itemVarinatsTextArr[upcIndex - 1]+(itemDetailsObj.shortDescription.slice(1,4)));
                if (itemDetailsObj.shortDescription.includes("P")) {
                    itemVariantsObj.size = (itemDetailsObj.shortDescription.slice(1, 4).includes("P") ? "P" : "") + itemVarinatsTextArr[upcIndex - 1]
                } else {
                    itemVariantsObj.size = itemVarinatsTextArr[upcIndex - 1] + (itemDetailsObj.shortDescription.slice(1, 4).includes("T") ? "T" : "");
                }
                itemVariantsObj.sku = itemVarinatsTextArr[upcIndex + 1]; /* sku */
                itemVariantsObj.quantityPerInnerPack = itemVarinatsTextArr[upcIndex + 3]; /* quantityPerInnerPack */
                // itemVariantsObj.ratio = itemVarinatsTextArr[upcIndex - 1];
                itemVariantsObj.retailPrice = itemVarinatsTextArr[upcIndex + 4] /* po retail price */
                itemVariantsObj.quantity = itemVarinatsTextArr[upcIndex + 6].replace(/,/g, "") /* item quantity */
                itemVariantsObj.unit = itemVarinatsTextArr[upcIndex + 7] /* unit */
                itemVariantsObj.unitCost = itemVarinatsTextArr[upcIndex + 8] /* unit price */
                itemVariantsObj.cost = itemVarinatsTextArr[upcIndex + 9] /* cost  */
            }
            // const labelWithAlphabets = itemVarinatsTextArr[(count * l) + 2];
            // if (/[a-zA-Z]/.test(labelWithAlphabets)) {
            //     itemVariantsObj.label = labelWithAlphabets;
            // } else {
            //     itemVariantsObj.label = "-";
            // }
            // itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + count - 8]
            // itemVariantsObj.unitPrice = itemVarinatsTextArr[(count * l) + count - 6]
            // itemVariantsObj.exFactory = itemVarinatsTextArr[(count * l) + count - 4]
            // itemVariantsObj.exPort = itemVarinatsTextArr[(count * l) + count - 3]
            // itemVariantsObj.deliveryDate = itemVarinatsTextArr[(count * l) + count - 2]
            // const retailPriceData = itemVarinatsTextArr[(count * l) + count - 1];
            // if ((/^\d+(\.\d+)?$/ || /^\d?$/).test(retailPriceData)) {
            //     itemVariantsObj.retialPrice = retailPriceData;
            // } else {
            //     itemVariantsObj.retialPrice = "-";
            // }
            // itemVariantsObj.comptMaterial = "-";
            // itemVariantsObj.ratio = "-";


            // itemVariantsObj.amount = itemVarinatsTextArr[(count * l) + count - 1]
            console.log(itemVariantsObj)
            itemVariantsArr.push(itemVariantsObj)
        }
        itemDetailsObj.EddiepoItemVariantDetails = itemVariantsArr
        itemDetailsArr.push(itemDetailsObj)
    }

    poData.EddiepoItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}

