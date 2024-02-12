import { CentricPoDetails, CentricPoItemDetails, CentricPoItemVariant, HbPoDetails, HbPoItemDetails } from "@project-management-system/shared-models";
import { EMP_STR_EXP, FORMAT_SEPARATION_KEYWORD, FRIEGHT_PAY_METHOD, ITEM_NO_EXP, ITEM_NO_EXP1, ITEM_NO_EXP2, ITEM_TEXT_END_TEXT, ITEM_TEXT_END_TEXT1, ITEM_VARIANT_START_TEXT, ITEM_VARIANT_START_TEXT1, ITEM_VARIANT_START_TEXT2, MANUFACTURE_1, MANUFACTURE_2, PAGE_DATE, PAGE_DATE_INDEX, PAYMENT_TERM_DESCRIPTION, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_TEXT, REFRENCE, SPECIAL_INSTRUCTIONS } from "./hb-popdf-regex-expressions";


/** 
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib. 
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details. 
 * step 1 : Filter all the empty strings and unwanted texts from the raw data 
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data 
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push 
 *   all the matched texts into an array.Now this array will contains all the items of the pdf 
 * ste 4 : Find the no of item variant lines and push them into item variant details. 
 * @param pdf  
 * @returns {HbPoDetails} 
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new HbPoDetails()
    const itemsArr: { itemIndex: number, amountIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: HbPoItemDetails[] = []
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
            let pageDateIndex;
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
                // if (ele.str == PAGE_DATE) {
                //     pageDateIndex = ind
                // }

                const currencySymbolToText = {
                    '$': 'USD',
                    '₹': 'INR',
                };
                const match = /([$₹])\d+(,|\.|\d)\d+(\.|,|\d)\d+/.exec(ele.str);
                if (match) {
                    const currencySymbol = match[0][0] || '-';
                    poData.currency = match[0].replace(currencySymbol, currencySymbolToText[currencySymbol]).replace(/\d+(,|\.|\d)\d+(\.|,|\d)\d+/g, "") || '-';
                    break;
                }
            }
            poData.custPo = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX].str;
            const regexDateIndex = /\d{1,2}\/\d{1,2}\/\d{2}/;
            if (regexDateIndex.test(firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX - 6].str)) {
                const originalDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX - 6].str;
                const dateComponents = originalDate.split('/');
                poData.exitFactoryDate = `${dateComponents[1]}-${dateComponents[0]}-20${dateComponents[2]}`;
            } else {
                const pageOneDataIndex = firstPageContent.findIndex(item => item.str === "Page 1");
                if (pageOneDataIndex !== -1) {
                    const nextIdIndex = pageOneDataIndex + 1;
                    if (nextIdIndex < firstPageContent.length) {
                        // Original date in MM/DD/YY format
                        const originalDate = firstPageContent[nextIdIndex].str;
                        const dateComponents = originalDate.split('/');
                        poData.exitFactoryDate = `${dateComponents[1]}-${dateComponents[0]}-20${dateComponents[2]}`;
                    } else {
                        console.log("Data associated with nextId not found.");
                    }
                }
            }

            // const exitFactoryDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX - 6]?.str;
            // if (exitFactoryDate) {
            //     const [month, day, twoDigitYear] = exitFactoryDate.split('/');
            //     if (month && day && twoDigitYear) {
            //         const currentYear = new Date().getFullYear();
            //         const centuryPrefix = Math.floor(currentYear / 100) * 100;
            //         const fourDigitYear = centuryPrefix + parseInt(twoDigitYear);
            //         const paddedDay = day.padStart(2, '0');
            //         const paddedMonth = month.padStart(2, '0');
            //         const formattedDate = `${paddedDay}-${paddedMonth}-${fourDigitYear}`;
            //         poData.exitFactoryDate = formattedDate;
            //     } else {
            //         console.error("Invalid date format:", exitFactoryDate);
            //     }
            // } else {
            //     console.error("exitFactoryDate is undefined.");
            // }


            let foundExitFactory = false;
            let foundShipVia = false;
            let shipToAddressIndex = '';
            for (const ele of firstPageContent) {
                if (foundExitFactory && !foundShipVia) {
                    if (ele.str.trim() === 'Ship Via:') {
                        foundShipVia = true;
                        break;
                    }
                    shipToAddressIndex += ele.str + '\n';
                }
                if (ele.str.trim() === 'Exit Factory By') {
                    foundExitFactory = true;
                }
            }
            const shipToAdd = shipToAddressIndex.trim();
            poData.shipToAdd = shipToAdd;

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
                // || val.str.includes(UNWANTED_TEXT_1)
                // || val.str.includes(UNWANTED_TEXT_2)
                // || val.str.includes(UNWANTED_TEXT_3)
                // || val.str.includes(UNWANTED_TEXT_4)
                // || val.str.includes(UNWANTED_TEXT_5)
                // || val.str.includes(UNWANTED_TEXT_6)
                // || val.str.includes(UNWANTED_TEXT_7)
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

        if (rec.str.match(ITEM_NO_EXP) || rec.str.match(ITEM_NO_EXP1) || rec.str.match(ITEM_NO_EXP2)) {
            prevItemIndex = index
        }
        if (rec.str.includes(ITEM_VARIANT_START_TEXT) || rec.str.includes(ITEM_VARIANT_START_TEXT1) || rec.str.includes(ITEM_VARIANT_START_TEXT2)) {
            itemsArr.push({ itemIndex: prevItemIndex, amountIndex: index })
        }

    }

    console.log(itemsArr, 'AAAAAAAAA')

    for (const rec of itemsArr) {
        let shipToEndIndex = 0;
        let itemTextEndIndex = 0;
        let itemDetailsEndIndex = 0;
        let itemVariantStartIndex;
        const itemDetailsObj = new HbPoItemDetails();
        console.log(rec.itemIndex, "iiiiiiiiiiiiii");

        const styleRegex = /[0-9]{6}/;
        const styleStr = filteredData[rec.itemIndex - 4].str;

        if (styleRegex.test(styleStr)) {
            itemDetailsObj.style = styleStr;
        } else {
            itemDetailsObj.style = filteredData[rec.itemIndex - 5].str;
        }

        itemDetailsObj.color = filteredData[rec.itemIndex + 2].str.replace(/\d+\s+/g,"").replace(/\d+-/g,"").trim();

        itemTextEndIndex = rec.amountIndex;
        itemVariantStartIndex = itemTextEndIndex + 1;


        const itemVarinatsTextArr = [];
        let k = itemVariantStartIndex;
        while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT1)) {
            itemVarinatsTextArr.push(filteredData[k].str);
            k++;
        }
        console.log(itemVarinatsTextArr, 'VVVVVVVv');

        const allSizesData = [...new Set(itemVarinatsTextArr.filter(size => ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2X', 'XXL', 'XXXL', 'LT', 'XLT', '2XLT', '3XLT', '4XLT', '5XLT', 'ST', 'XST', '2XST', '3XST', '4XST', '5XST', 'XS-Slim', 'S-Slim', 'M-Slim', 'L-Slim', 'XL-Slim', 'XXL-Slim', 'XS-Regular', 'S-Regular', 'M-Regular', 'L-Regular', 'XL-Regular', 'XXL-Regular', '3X', '4X', '5X', '6X'].includes(size)))];
        const itemVariantsArr: CentricPoItemVariant[] = [];

        for (const size of allSizesData) {
            const itemVariantsObj = new CentricPoItemVariant();
            itemVariantsObj.size = size;

            const sizeIndex = itemVarinatsTextArr.indexOf(size);

            if (sizeIndex > 0) {
                itemVariantsObj.unitPrice = itemVarinatsTextArr[sizeIndex - 1];
            }
            if (sizeIndex > 0) {
                itemVariantsObj.quantity = itemVarinatsTextArr[sizeIndex - 2];
            }
            console.log(itemVariantsObj);
            itemVariantsArr.push(itemVariantsObj);
        }

        itemDetailsObj.HbpoItemVariantDetails = itemVariantsArr;
        itemDetailsArr.push(itemDetailsObj);
    }


    //     const itemVarinatsTextArr = []
    //     let k = itemVariantStartIndex
    //     while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT)) {
    //         itemVarinatsTextArr.push(filteredData[k].str)
    //         k++
    //     }
    //     console.log(itemVarinatsTextArr, 'VVVVVVVv')
    //     const stringsWithLength13 = itemVarinatsTextArr.filter(value => typeof value === 'string' && value.length === 13 || value.length === 12);
    //     console.log("stringsWithLength13", stringsWithLength13)
    //     const regexPattern = /[0-9]{2}[A-Z]{5}\w+-\d+/;
    //     const CompMaterialData = itemVarinatsTextArr.filter(value => regexPattern.test(value));
    //     console.log("CompMaterialData", CompMaterialData);
    //     const sizes = stringsWithLength13.length;
    //     const count = itemVarinatsTextArr.length / sizes;
    //     const itemVariantsArr: CentricPoItemVariant[] = []
    //     for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
    //         const itemVariantsObj = new CentricPoItemVariant();

    //         itemVariantsObj.size = itemVarinatsTextArr[(count * l) + 0]
    //         itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + count - 2]
    //         itemVariantsObj.unitPrice = itemVarinatsTextArr[(count * l) + count - 1]
    //         console.log(itemVariantsObj)

    //         itemVariantsArr.push(itemVariantsObj)
    //     }
    //     itemDetailsObj.HbpoItemVariantDetails = itemVariantsArr
    //     itemDetailsArr.push(itemDetailsObj)
    // }


    /* 1st format */
    // else if (ITEM_TEXT_END_TEXT === "Total Eaches") {
    //     for (const rec of itemsArr) {
    //         let shipToEndIndex = 0;
    //         let itemTextEndIndex = 0;
    //         let itemDetailsEndIndex = 0
    //         let itemVariantStartIndex
    //         const itemDetailsObj = new CentricPoItemDetails();
    //         console.log(rec.itemIndex, "iiiiiiiiiiiiii")
    //         itemDetailsObj.poLine = filteredData[rec.itemIndex + 10].str
    //         itemDetailsObj.material = filteredData[rec.itemIndex + 11].str.replace(/^\d{2}|-.*$/g, '')
    //         itemDetailsObj.color = filteredData[rec.itemIndex + 12].str;

    //         // let shortDescriptionIndex;
    //         // for (let i = 0; i < filteredData.length; i++) {
    //         //     if (filteredData[i].str.includes('Short Description')) {
    //         //         shortDescriptionIndex = i;
    //         //         break;
    //         //     }
    //         // }
    //         // if (shortDescriptionIndex> 0) {
    //         //     itemDetailsObj.totalQuantity = filteredData[shortDescriptionIndex - 1].str;
    //         // }

    //         const poLineIndex = filteredData.findIndex((item, index) => index >= rec.itemIndex + 10);
    //         if (poLineIndex !== -1) {
    //             itemDetailsObj.currency = filteredData[poLineIndex - 1].str.replace(/Cost\(/g, '').replace(/\)/g, '');
    //         }

    //         for (let i = rec.itemIndex + 13; i < filteredData.length; i++) {
    //             if (filteredData[i].str.includes("Mens")) {
    //                 itemDetailsObj.color = itemDetailsObj.color.split("Mens")[0];
    //                 break;
    //             } else if (filteredData[i].str.includes("Womens")) {
    //                 itemDetailsObj.color = itemDetailsObj.color.split("Womens")[0];
    //                 break;
    //             } else {
    //                 itemDetailsObj.color += filteredData[i].str;
    //             }
    //         } let foundMens = false;
    //         for (let i = rec.itemIndex + 13; i < filteredData.length; i++) {
    //             const currentInfo = filteredData[i].str;
    //             if (currentInfo.includes("Mens" || "Womens")) {
    //                 itemDetailsObj.gender = currentInfo;
    //                 foundMens = true;
    //                 break;
    //             }
    //         }
    //         if (!foundMens) {
    //             for (let i = rec.itemIndex; i < filteredData.length; i++) {
    //                 const currentInfo = filteredData[i].str;

    //                 if (currentInfo.includes("Mens" || "Womens")) {
    //                     itemDetailsObj.gender = currentInfo;
    //                     break;
    //                 }
    //             }
    //         }

    //         let totalQuantityIndex;
    //         for (let i = rec.itemIndex + 13; i < filteredData.length; i++) {
    //             const currentInfo = filteredData[i].str;

    //             if (currentInfo.includes("Mens") || currentInfo.includes("Womens")) {
    //                 totalQuantityIndex = i + 3;
    //                 break;
    //             }
    //         }
    //         if (totalQuantityIndex !== -1 && totalQuantityIndex < filteredData.length) {
    //             itemDetailsObj.totalQuantity = filteredData[totalQuantityIndex].str;
    //         }

    //         let shortDescriptionMatching;
    //         let vendorBookingFlagMatching;
    //         let packMethodMatching;

    //         filteredData.forEach(item => {
    //             if (/Short/.test(item.str)) {
    //                 shortDescriptionMatching = item;
    //                 return;
    //             }
    //         });

    //         if (shortDescriptionMatching) {
    //             itemDetailsObj.shortDescription = shortDescriptionMatching.str.replace(/Short Description: /g, "");
    //         }

    //         // const totalCostIndex = filteredData.findIndex(item => /Total Eaches/.test(item.str));
    //         // if (totalCostIndex) {
    //         //     itemDetailsObj.totalQuantity = filteredData[totalCostIndex + 1].str;
    //         // }


    //         // for (let i = 1; i < filteredData.length; i++) {
    //         //     if (/Short/.test(filteredData[i].str)) {
    //         //         shortDescriptionMatching = filteredData[i];
    //         //         const totalQuantityIndex = i - 1;
    //         //         if (totalQuantityIndex >= 0) {
    //         //             itemDetailsObj.shortDescription = shortDescriptionMatching.str.replace(/Short Description: /g, "");
    //         //             itemDetailsObj.totalQuantity = filteredData[totalQuantityIndex].str;
    //         //             break;
    //         //         }
    //         //     }
    //         // }

    //         // let shortDescriptionIndex = -1;
    //         // for (let i = 0; i < filteredData.length; i++) {
    //         //     if (filteredData[i].str.includes('Short Description')) {
    //         //         shortDescriptionIndex = i;
    //         //         break;
    //         //     }
    //         // }

    //         // if (shortDescriptionIndex !== -1) {
    //         //     const totalQuantityIndex = shortDescriptionIndex - 1;
    //         //     if (totalQuantityIndex >= 0 && totalQuantityIndex < filteredData.length) {
    //         //         itemDetailsObj.totalQuantity = filteredData[totalQuantityIndex].str;
    //         //     }
    //         // }

    //         filteredData.forEach(item => {
    //             if (/Vendor Booking Flag =/.test(item.str)) {
    //                 vendorBookingFlagMatching = item;
    //                 return;
    //             }
    //         });

    //         if (vendorBookingFlagMatching) {
    //             itemDetailsObj.vendorBookingFlag = vendorBookingFlagMatching.str.replace(/Vendor Booking Flag =/g, "");
    //         }


    //         filteredData.forEach(item => {
    //             if (/Pack Method: /.test(item.str)) {
    //                 packMethodMatching = item;
    //                 return;
    //             }
    //         });

    //         if (packMethodMatching) {
    //             itemDetailsObj.packMethod = packMethodMatching.str.replace(/Pack Method: /g, "");
    //         }

    //         itemTextEndIndex = rec.amountIndex
    //         itemVariantStartIndex = itemTextEndIndex + 1

    //         //-------------------------------------------------------------------------
    //         // item varinat details parsing starts here
    //         const itemVarinatsTextArr = []
    //         let k = itemVariantStartIndex
    //         while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT)) {
    //             itemVarinatsTextArr.push(filteredData[k].str)
    //             k++
    //         }
    //         console.log(itemVarinatsTextArr, 'VVVVVVVv')
    //         const stringsWithLength13 = itemVarinatsTextArr.filter(value => typeof value === 'string' && value.length === 13 || value.length === 12);
    //         const sizes = stringsWithLength13.length;
    //         const count = itemVarinatsTextArr.length / sizes;
    //         const itemVariantsArr: CentricPoItemVariant[] = []
    //         for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
    //             const itemVariantsObj = new CentricPoItemVariant();
    //             itemVariantsObj.size = itemVarinatsTextArr[(count * l) + 0]
    //             itemVariantsObj.upc = itemVarinatsTextArr[(count * l) + 1]
    //             const labelWithAlphabets = itemVarinatsTextArr[(count * l) + 2];
    //             if (/[a-zA-Z]/.test(labelWithAlphabets)) {
    //                 itemVariantsObj.label = labelWithAlphabets;
    //             } else {
    //                 itemVariantsObj.label = "-";
    //             }
    //             itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + count - 8]
    //             itemVariantsObj.unitPrice = itemVarinatsTextArr[(count * l) + count - 6]
    //             itemVariantsObj.exFactory = itemVarinatsTextArr[(count * l) + count - 4]
    //             itemVariantsObj.exPort = itemVarinatsTextArr[(count * l) + count - 3]
    //             itemVariantsObj.deliveryDate = itemVarinatsTextArr[(count * l) + count - 2]
    //             itemVariantsObj.retialPrice = itemVarinatsTextArr[(count * l) + count - 1]

    //             itemVariantsObj.amount = itemVarinatsTextArr[(count * l) + count - 1]
    //             console.log(itemVariantsObj)
    //             itemVariantsArr.push(itemVariantsObj)
    //         }
    //         itemDetailsObj.CentricpoItemVariantDetails = itemVariantsArr
    //         itemDetailsArr.push(itemDetailsObj)
    //     }
    // }

    poData.HbpoItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}

