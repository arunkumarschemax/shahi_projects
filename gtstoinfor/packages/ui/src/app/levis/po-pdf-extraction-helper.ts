import { LevisPoDetails, LevisPoItemDetails, LevisPoItemVariant } from "@project-management-system/shared-models";
import { CURRENCY_INDEX, DELIVERY_ADDRESS, DELIVERY_ADDRESS_BR, DELIVERY_ADDRESS_MX, EMP_STR_EXP, FORMAT1, FORMAT2, FORMAT3, FORMAT_SEPARATION_KEYWORD, FORMAT_SEPARATION_KEYWORD1, ITEM_NO_EXP, ITEM_NO_EXP1, ITEM_NO_EXP2, ITEM_TEXT_END_TEXT, ITEM_TEXT_END_TEXT1, ITEM_TEXT_END_TEXT2, ITEM_TEXT_END_TEXT22, ITEM_VARIANT_START_TEXT, ITEM_VARIANT_START_TEXT1, ITEM_VARIANT_START_TEXT2, LSE_FORMAT_KEY, MX_FORMAT_KEY, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_INDEXING, PO_NUMBER_INDEXING_LSE, PO_NUMBER_TEXT, PO_NUMBER_TEXT1, PO_NUMBER_TEXT_LSE, TOTAL_QUANTITY_BR, TOTAL_QUANTITY_LSE, TOTAL_QUANTITY_MX, TRANSMODE_INDEX, TRANSMODE_INDEX_LSE, UNWANTED_TEXT_1, UNWANTED_TEXT_10, UNWANTED_TEXT_11, UNWANTED_TEXT_12, UNWANTED_TEXT_13, UNWANTED_TEXT_2, UNWANTED_TEXT_3, UNWANTED_TEXT_4, UNWANTED_TEXT_5, UNWANTED_TEXT_6, UNWANTED_TEXT_7, UNWANTED_TEXT_8, UNWANTED_TEXT_9 } from "./popdf-regex-expressions";
import moment from "moment";


/** 
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib. 
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details. 
 * step 1 : Filter all the empty strings and unwanted texts from the raw data 
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data 
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push 
 *   all the matched texts into an array.Now this array will contains all the items of the pdf 
 * ste 4 : Find the no of item variant lines and push them into item variant details. 
 * @param pdf  
 * @returns {LevisPoDetails} 
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new LevisPoDetails()
    const itemsArr: { itemIndex: number, amountIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: LevisPoItemDetails[] = []
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent: any = await page.getTextContent();
        // console.log(textContent) 
        //parsing  po data  
        // po details exists only in first data of pdf ,so using only first page for extracting po details
        let isPdfFormatSeparationFlag = false;
        let isPdfFormatSeparationFlag1 = false;
        const firstPageContent: any[] = textContent.items.filter((v) => {
            return !EMP_STR_EXP.test(v.str)
        })
        for (const [index, rec] of firstPageContent.entries()) {
            if (rec.str.includes(FORMAT_SEPARATION_KEYWORD)) {
                isPdfFormatSeparationFlag = true;
            }

            if (rec.str.includes(FORMAT_SEPARATION_KEYWORD1)) {
                isPdfFormatSeparationFlag1 = true;
            }
        }

        /* LSE */
        if (FORMAT2 === "Material Description" && isPdfFormatSeparationFlag) {
            if (i == 1) {
                const firstPageContent: any[] = textContent.items.filter((v) => {
                    return !EMP_STR_EXP.test(v.str)
                })
                console.log(firstPageContent)
                // find indexes of all the po data fields 
                let poNumberTextLseIndex
                let sellerStartIndex
                let sellerEndIndex
                let buyerAddStartIndex
                let buyerAddEndIndex
                let shipToAddStartIndex;
                let currencyLseIndex;
                let transModeLseIndex;
                let deliveryAddressIndexLse;
                let totalQuantityIndex;
                for (const [ind, ele] of firstPageContent.entries()) {
                    if (ele.str == PO_NUMBER_TEXT_LSE) {
                        poNumberTextLseIndex = ind
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
                    if (ele.str == PO_NUMBER_INDEXING_LSE) {
                        currencyLseIndex = ind
                    }
                    if (ele.str == TRANSMODE_INDEX_LSE) {
                        transModeLseIndex = ind
                    }
                    if (ele.str == DELIVERY_ADDRESS) {
                        deliveryAddressIndexLse = ind
                    }
                    if (ele.str == TOTAL_QUANTITY_LSE) {
                        totalQuantityIndex = ind
                    }

                }
                poData.poNumber = firstPageContent[poNumberTextLseIndex - 1].str;
                poData.currency = firstPageContent[currencyLseIndex + 1].str;
                let i = deliveryAddressIndexLse - 1;
                let deliveryAddress = "";
                const regex = /\d+\.\d+\.\d+/;
                while (i >= 0 && !regex.test(firstPageContent[i].str)) {
                    deliveryAddress = firstPageContent[i].str + " " + deliveryAddress;
                    i--;
                }
                poData.deliveryAddress = deliveryAddress.trim().replace(/^\d+\s*|\s*\d+$/g, "").replace(/\d+,/g, "");

                const poRemarksRegex = /PO REMARKS/;
                const poRemarksMatchIndex = firstPageContent.findIndex(item => poRemarksRegex.test(item.str));
                if (poRemarksMatchIndex !== -1) {
                    const prevItemIndex = poRemarksMatchIndex - 1;
                    const prevItem = firstPageContent[prevItemIndex];
                    if (prevItem && /Split to/.test(prevItem.str)) {
                        poData.poRemarks = prevItem.str;
                    } else {
                        poData.poRemarks = "-";
                    }
                } else {
                    poData.poRemarks = "-";
                }

                const splitPoAndPoRemarks = /PO REMARKS/;
                const SplitPoMatchIndex = firstPageContent.findIndex(item => splitPoAndPoRemarks.test(item.str));
                if (SplitPoMatchIndex !== -1) {
                    const prevItemIndex = SplitPoMatchIndex - 1;
                    const prevItem = firstPageContent[prevItemIndex];
                    if (prevItem && /Split to/.test(prevItem.str)) {
                        poData.splitPo = (prevItem.str.match(/\d{10}$/) || [""])[0];
                    } else {
                        poData.splitPo = "-";
                    }
                } else {
                    poData.splitPo = "-";
                }

                poData.totalQuantity = firstPageContent[totalQuantityIndex + 1].str.replace(/,/g,"");
                
                // poData.transMode =
                //     (firstPageContent[transModeLseIndex + 2].str + " " +
                //         firstPageContent[transModeLseIndex + 3].str).replace(/\s+\w+/g, "").trim();


                // poData.deliveryAddress =
                //     firstPageContent[deliveryAddressIndex - 5].str + " " +
                //     firstPageContent[deliveryAddressIndex - 4].str + " " +
                //     firstPageContent[deliveryAddressIndex - 3].str + " " +
                //     firstPageContent[deliveryAddressIndex - 1].str;

                // poData.poDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 1].str
                // poData.shipment = firstPageContent[frieghtPayMethodIndex - 1].str
                // poData.season = firstPageContent[dateSentIndex + 4].str
                // poData.portOfExport = firstPageContent[dateSentIndex + 2].str
                // poData.portOfEntry = firstPageContent[dateSentIndex + 3].str
                // if (firstPageContent.length > refrenceIndex + 1) {
                //     const referenceContentWithAlphabets = firstPageContent[refrenceIndex + 1].str;
                //     if (/[a-zA-Z]/.test(referenceContentWithAlphabets)) {
                //         poData.Refrence = referenceContentWithAlphabets;
                //     } else {
                //         poData.Refrence = "-";
                //     }
                // }
                // // poData.Refrence = firstPageContent[dateSentIndex + 10].str
                // poData.poPrint = firstPageContent[dateSentIndex + 7].str
                // poData.paymentTermDescription = firstPageContent[paymentTermDescriptionIndex + 2].str
                // // poData.specialInstructions = firstPageContent[specialInstructionsIndex + 1]?.str || '';
                // if (typeof poData.specialInstructions === 'undefined') {
                //     poData.specialInstructions = '';
                // }
                // for (let i = specialInstructionsIndex + 1; i < firstPageContent.length; i++) {
                //     if (firstPageContent[i]?.str.includes("PO History")) {
                //         poData.specialInstructions += firstPageContent[i]?.str.split("PO History")[0];
                //         break;
                //     } else {
                //         poData.specialInstructions += firstPageContent[i]?.str || '';
                //     }
                // }
                // poData.division = firstPageContent[dateSentIndex + 5].str
                // poData.incoterm = firstPageContent[dateSentIndex - 8].str + firstPageContent[dateSentIndex - 7].str + " " + firstPageContent[dateSentIndex - 6].str + firstPageContent[dateSentIndex - 5].str.replace(/\d+|\w+/g, "")

                // let buyerAddressStartingIndex = "";
                // let currentIndex = materialIndex;
                // while (currentIndex < firstPageContent.length) {
                //     const currentId = firstPageContent[currentIndex]?.str;
                //     if (currentId && currentId.trim() === 'C') {
                //         break;
                //     }
                //     buyerAddressStartingIndex += (currentId ? currentId + " " : "");
                //     currentIndex++;
                // }
                // poData.buyerAddress = buyerAddressStartingIndex.trim();


                // const shipToAddIndexHasNumber = /^\d+$/.test(firstPageContent[materialIndex + 48]?.str);
                // if (shipToAddIndexHasNumber) {
                //     poData.shipToAdd = firstPageContent[materialIndex + 49]?.str + " " +
                //         firstPageContent[materialIndex + 50]?.str + " " +
                //         firstPageContent[materialIndex + 51]?.str + " " +
                //         firstPageContent[materialIndex + 52]?.str;
                // } else {
                //     poData.shipToAdd = firstPageContent[materialIndex + 48]?.str + " " +
                //         firstPageContent[materialIndex + 49]?.str + " " +
                //         firstPageContent[materialIndex + 50]?.str + " " +
                //         firstPageContent[materialIndex + 51]?.str;
                // }

                // poData.manufacture = firstPageContent[materialIndex + 36].str + " " + firstPageContent[materialIndex + 37].str + " " +
                //     firstPageContent[materialIndex + 38].str + " " + firstPageContent[materialIndex + 39].str + " " + firstPageContent[materialIndex + 40].str

                // let selleraddress = '';
                // for (let a = sellerStartIndex + 1; a < sellerEndIndex; a++) {
                //     selleraddress += firstPageContent[a].str + ','
                // }
                // poData.sellerAddress = selleraddress

                // let shipToAddress = ''
                // for (let c = shipToAddStartIndex + 1; c < shipToAddEndIndex; c++) {
                //     if (c < shipToAddEndIndex - 1)
                //         shipToAddress += firstPageContent[c].str + ','
                //     else
                //         shipToAddress += firstPageContent[c].str
                // }
                // poData.shipToAddress = shipToAddress;
            }
        }

        /* BR */
        else if (FORMAT1 === "Product Description" && isPdfFormatSeparationFlag1) {
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
                let poNumberIndex;
                let transModeIndex;
                let deliveryAddressIndex;
                let totalQuantityIndexBr;
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
                    if (ele.str == PO_NUMBER_INDEXING) {
                        poNumberIndex = ind
                    }
                    if (ele.str == TRANSMODE_INDEX) {
                        transModeIndex = ind
                    }
                    if (ele.str == DELIVERY_ADDRESS_BR) {
                        deliveryAddressIndex = ind
                    }
                    if (ele.str == TOTAL_QUANTITY_BR) {
                        totalQuantityIndexBr = ind
                    }

                }
                poData.poNumber = firstPageContent[poNumberIndex - 20].str
                // poData.currency = firstPageContent[poNumberIndex - 7].str
                let currencyString = firstPageContent[poNumberIndex - 7].str;
                if (currencyString === 'US$') {
                    currencyString = 'USD';
                }
                poData.currency = currencyString;

                let i = deliveryAddressIndex - 3;
                let deliveryAddress = "";
                const lastFindRegex = /\w+\$/;
                while (i >= 0 && !lastFindRegex.test(firstPageContent[i].str)) {
                    deliveryAddress = firstPageContent[i].str + " " + deliveryAddress;
                    i--;
                }
                poData.deliveryAddress = deliveryAddress.trim().replace(/SHAHI EXPORTS PVT LTD… /g, "")

                poData.totalQuantity = firstPageContent[totalQuantityIndexBr - 2].str

                // poData.transMode = firstPageContent[transModeIndex + 2].str
                // poData.deliveryAddress =
                //     firstPageContent[deliveryAddressIndex - 5].str + " " +
                //     firstPageContent[deliveryAddressIndex - 4].str + " " +
                //     firstPageContent[deliveryAddressIndex - 3].str + " " +
                //     firstPageContent[deliveryAddressIndex - 1].str;

                // poData.poDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 1].str
                // poData.shipment = firstPageContent[frieghtPayMethodIndex - 1].str
                // poData.season = firstPageContent[dateSentIndex + 4].str
                // poData.portOfExport = firstPageContent[dateSentIndex + 2].str
                // poData.portOfEntry = firstPageContent[dateSentIndex + 3].str
                // if (firstPageContent.length > refrenceIndex + 1) {
                //     const referenceContentWithAlphabets = firstPageContent[refrenceIndex + 1].str;
                //     if (/[a-zA-Z]/.test(referenceContentWithAlphabets)) {
                //         poData.Refrence = referenceContentWithAlphabets;
                //     } else {
                //         poData.Refrence = "-";
                //     }
                // }
                // // poData.Refrence = firstPageContent[dateSentIndex + 10].str
                // poData.poPrint = firstPageContent[dateSentIndex + 7].str
                // poData.paymentTermDescription = firstPageContent[paymentTermDescriptionIndex + 2].str
                // // poData.specialInstructions = firstPageContent[specialInstructionsIndex + 1]?.str || '';
                // if (typeof poData.specialInstructions === 'undefined') {
                //     poData.specialInstructions = '';
                // }
                // for (let i = specialInstructionsIndex + 1; i < firstPageContent.length; i++) {
                //     if (firstPageContent[i]?.str.includes("PO History")) {
                //         poData.specialInstructions += firstPageContent[i]?.str.split("PO History")[0];
                //         break;
                //     } else {
                //         poData.specialInstructions += firstPageContent[i]?.str || '';
                //     }
                // }
                // poData.division = firstPageContent[dateSentIndex + 5].str
                // poData.incoterm = firstPageContent[dateSentIndex - 8].str + firstPageContent[dateSentIndex - 7].str + " " + firstPageContent[dateSentIndex - 6].str + firstPageContent[dateSentIndex - 5].str.replace(/\d+|\w+/g, "")

                // let buyerAddressStartingIndex = "";
                // let currentIndex = materialIndex;
                // while (currentIndex < firstPageContent.length) {
                //     const currentId = firstPageContent[currentIndex]?.str;
                //     if (currentId && currentId.trim() === 'C') {
                //         break;
                //     }
                //     buyerAddressStartingIndex += (currentId ? currentId + " " : "");
                //     currentIndex++;
                // }
                // poData.buyerAddress = buyerAddressStartingIndex.trim();


                // const shipToAddIndexHasNumber = /^\d+$/.test(firstPageContent[materialIndex + 48]?.str);
                // if (shipToAddIndexHasNumber) {
                //     poData.shipToAdd = firstPageContent[materialIndex + 49]?.str + " " +
                //         firstPageContent[materialIndex + 50]?.str + " " +
                //         firstPageContent[materialIndex + 51]?.str + " " +
                //         firstPageContent[materialIndex + 52]?.str;
                // } else {
                //     poData.shipToAdd = firstPageContent[materialIndex + 48]?.str + " " +
                //         firstPageContent[materialIndex + 49]?.str + " " +
                //         firstPageContent[materialIndex + 50]?.str + " " +
                //         firstPageContent[materialIndex + 51]?.str;
                // }

                // poData.manufacture = firstPageContent[materialIndex + 36].str + " " + firstPageContent[materialIndex + 37].str + " " +
                //     firstPageContent[materialIndex + 38].str + " " + firstPageContent[materialIndex + 39].str + " " + firstPageContent[materialIndex + 40].str

                // let selleraddress = '';
                // for (let a = sellerStartIndex + 1; a < sellerEndIndex; a++) {
                //     selleraddress += firstPageContent[a].str + ','
                // }
                // poData.sellerAddress = selleraddress

                // let shipToAddress = ''
                // for (let c = shipToAddStartIndex + 1; c < shipToAddEndIndex; c++) {
                //     if (c < shipToAddEndIndex - 1)
                //         shipToAddress += firstPageContent[c].str + ','
                //     else
                //         shipToAddress += firstPageContent[c].str
                // }
                // poData.shipToAddress = shipToAddress;
            }
        }

        /* MX */
        else if (FORMAT3 === "Variant Material") {
            if (i == 1) {
                const firstPageContent: any[] = textContent.items.filter((v) => {
                    return !EMP_STR_EXP.test(v.str)
                })
                console.log(firstPageContent)
                // find indexes of all the po data fields 
                let mxPoNumberTextIndex
                let sellerStartIndex
                let sellerEndIndex
                let buyerAddStartIndex
                let buyerAddEndIndex
                let shipToAddStartIndex;
                let currencyIndex;
                let transModeIndex;
                let deliveryAddressIndexMx;
                let totalQuantityIndexMx;
                for (const [ind, ele] of firstPageContent.entries()) {
                    // if (ele.str == PO_NUMBER_TEXT) {
                    //     poNumberTextIndex = ind
                    // }
                    if (ele.str == PO_NUMBER_TEXT1) {
                        mxPoNumberTextIndex = ind
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
                    if (ele.str == CURRENCY_INDEX) {
                        currencyIndex = ind
                    }
                    if (ele.str == TRANSMODE_INDEX) {
                        transModeIndex = ind
                    }
                    if (ele.str == DELIVERY_ADDRESS_MX) {
                        deliveryAddressIndexMx = ind
                    }
                    if (ele.str == TOTAL_QUANTITY_MX) {
                        totalQuantityIndexMx = ind
                    }

                }
                poData.poNumber = firstPageContent[mxPoNumberTextIndex + 1].str.replace(/#/g, "").trim();
                poData.currency = firstPageContent[currencyIndex + 1].str
                // poData.transMode = '-'


                let i = deliveryAddressIndexMx + 8;
                let deliveryAddress = "";
                const regex = /EA/;
                while (i < firstPageContent.length && !regex.test(firstPageContent[i].str)) {
                    deliveryAddress += firstPageContent[i].str + " ";
                    i++;
                }
                deliveryAddress = deliveryAddress.trim().replace(/(\d+|\d.\d+|,|\d+.)$/, '');
                poData.deliveryAddress = deliveryAddress.trim();

                poData.totalQuantity = firstPageContent[totalQuantityIndexMx - 1].str

                // poData.poDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 1].str
                // poData.shipment = firstPageContent[frieghtPayMethodIndex - 1].str
                // poData.season = firstPageContent[dateSentIndex + 4].str
                // poData.portOfExport = firstPageContent[dateSentIndex + 2].str
                // poData.portOfEntry = firstPageContent[dateSentIndex + 3].str
                // if (firstPageContent.length > refrenceIndex + 1) {
                //     const referenceContentWithAlphabets = firstPageContent[refrenceIndex + 1].str;
                //     if (/[a-zA-Z]/.test(referenceContentWithAlphabets)) {
                //         poData.Refrence = referenceContentWithAlphabets;
                //     } else {
                //         poData.Refrence = "-";
                //     }
                // }
                // // poData.Refrence = firstPageContent[dateSentIndex + 10].str
                // poData.poPrint = firstPageContent[dateSentIndex + 7].str
                // poData.paymentTermDescription = firstPageContent[paymentTermDescriptionIndex + 2].str
                // // poData.specialInstructions = firstPageContent[specialInstructionsIndex + 1]?.str || '';
                // if (typeof poData.specialInstructions === 'undefined') {
                //     poData.specialInstructions = '';
                // }
                // for (let i = specialInstructionsIndex + 1; i < firstPageContent.length; i++) {
                //     if (firstPageContent[i]?.str.includes("PO History")) {
                //         poData.specialInstructions += firstPageContent[i]?.str.split("PO History")[0];
                //         break;
                //     } else {
                //         poData.specialInstructions += firstPageContent[i]?.str || '';
                //     }
                // }
                // poData.division = firstPageContent[dateSentIndex + 5].str
                // poData.incoterm = firstPageContent[dateSentIndex - 8].str + firstPageContent[dateSentIndex - 7].str + " " + firstPageContent[dateSentIndex - 6].str + firstPageContent[dateSentIndex - 5].str.replace(/\d+|\w+/g, "")

                // let buyerAddressStartingIndex = "";
                // let currentIndex = materialIndex;
                // while (currentIndex < firstPageContent.length) {
                //     const currentId = firstPageContent[currentIndex]?.str;
                //     if (currentId && currentId.trim() === 'C') {
                //         break;
                //     }
                //     buyerAddressStartingIndex += (currentId ? currentId + " " : "");
                //     currentIndex++;
                // }
                // poData.buyerAddress = buyerAddressStartingIndex.trim();


                // const shipToAddIndexHasNumber = /^\d+$/.test(firstPageContent[materialIndex + 48]?.str);
                // if (shipToAddIndexHasNumber) {
                //     poData.shipToAdd = firstPageContent[materialIndex + 49]?.str + " " +
                //         firstPageContent[materialIndex + 50]?.str + " " +
                //         firstPageContent[materialIndex + 51]?.str + " " +
                //         firstPageContent[materialIndex + 52]?.str;
                // } else {
                //     poData.shipToAdd = firstPageContent[materialIndex + 48]?.str + " " +
                //         firstPageContent[materialIndex + 49]?.str + " " +
                //         firstPageContent[materialIndex + 50]?.str + " " +
                //         firstPageContent[materialIndex + 51]?.str;
                // }

                // poData.manufacture = firstPageContent[materialIndex + 36].str + " " + firstPageContent[materialIndex + 37].str + " " +
                //     firstPageContent[materialIndex + 38].str + " " + firstPageContent[materialIndex + 39].str + " " + firstPageContent[materialIndex + 40].str

                // let selleraddress = '';
                // for (let a = sellerStartIndex + 1; a < sellerEndIndex; a++) {
                //     selleraddress += firstPageContent[a].str + ','
                // }
                // poData.sellerAddress = selleraddress

                // let shipToAddress = ''
                // for (let c = shipToAddStartIndex + 1; c < shipToAddEndIndex; c++) {
                //     if (c < shipToAddEndIndex - 1)
                //         shipToAddress += firstPageContent[c].str + ','
                //     else
                //         shipToAddress += firstPageContent[c].str
                // }
                // poData.shipToAddress = shipToAddress;
            }
        }
        // const buyerAddressHasNumber = /C/.test(firstPageContent[materialIndex + 0]?.str);
        // if (buyerAddressHasNumber) {
        //     poData.buyerAddress =
        //         firstPageContent[materialIndex + 1]?.str + " " +
        //         firstPageContent[materialIndex + 2]?.str + " " +
        //         firstPageContent[materialIndex + 3]?.str + " " +
        //         firstPageContent[materialIndex + 4]?.str + " " +
        //         firstPageContent[materialIndex + 5]?.str;
        // } else {
        //     poData.buyerAddress = firstPageContent[materialIndex + 0]?.str + " " +
        //         firstPageContent[materialIndex + 1]?.str + " " +
        //         firstPageContent[materialIndex + 2]?.str + " " +
        //         firstPageContent[materialIndex + 3]?.str + " " +
        //         firstPageContent[materialIndex + 4]?.str;
        // }

        // po details parsing ends here  
        //------------------------------------------------------------------------------------------- 
        // data filtering satrts here 
        // filtering the pdf data i.e remove unnecessary data which is  not required for data parsing 
        let startFlag = false; // Initialize startFlag to false  
        let endFlag = false;   // Initialize endFlag to false 
        const pageContent = textContent.items.filter((val, index) => {
            if (val.str === 'PO Line') { startFlag = true; }
            if (endFlag) {
                startFlag = false;
                endFlag = false;
            }
            if (val.str === "Total Eaches") { endFlag = true; }
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
    let isSecondFormat1 = false;
    let isFirstBomSummary = true;
    let isSecondBomSummary = false;
    for (const [index, rec] of filteredData.entries()) {
        if (rec.str.match(ITEM_NO_EXP1)) {
            prevItemIndex = index
        }
        if (rec.str.includes(ITEM_VARIANT_START_TEXT1) && isFirstBomSummary) {
            itemsArr.push({ itemIndex: prevItemIndex, amountIndex: index })
            if (isFirstBomSummary) {
                isFirstBomSummary = false;
            }
            else if (isSecondBomSummary) {
                isSecondBomSummary = true;
            }

        }
        if (rec.str.includes(FORMAT_SEPARATION_KEYWORD)) {
            isSecondFormat = true;
        }
        if (rec.str.includes(FORMAT_SEPARATION_KEYWORD1)) {
            isSecondFormat1 = true;
        }

    }
    console.log(itemsArr, 'AAAAAAAAA')


    /* 2nd format LSE */
    if (LSE_FORMAT_KEY === "Material Description" && isSecondFormat) {

        for (const rec of itemsArr) {
            let shipToEndIndex = 0;
            let itemTextEndIndex = 0;
            let itemDetailsEndIndex = 0
            let itemVariantStartIndex
            const itemDetailsObj = new LevisPoItemDetails();
            console.log(rec.itemIndex, "iiiiiiiiiiiiii")

            itemDetailsObj.poLine = filteredData[rec.itemIndex + 1].str
            itemDetailsObj.material = filteredData[rec.itemIndex + 2].str

            let unitPriceIndex = -1;
            let foundFirstTransMode = false;
            filteredData.forEach((item, index) => {
                if (/Trans. Mode/.test(item.str)) {
                    if (!foundFirstTransMode) {
                        foundFirstTransMode = true;
                        unitPriceIndex = index - 3;
                        return;
                    }
                }
            });

            if (unitPriceIndex >= 0 && unitPriceIndex < filteredData.length) {
                itemDetailsObj.totalUnitPrice = filteredData[unitPriceIndex].str;
            }

            // let transModeIndex = -1;
            // filteredData.forEach((item, index) => {
            //     if (/([A-Z]{1}[0-9]{1}|[A-Z]+):[A-Z]+/.test(item.str)) {
            //         if (transModeIndex) {
            //             transModeIndex = index +0;
            //             return;
            //         }
            //     }
            // });

            // if (transModeIndex >= 0 && transModeIndex < filteredData.length) {
            //     itemDetailsObj.transMode = filteredData[transModeIndex].str;
            // }
            const first6Characters = poData.deliveryAddress.slice(0, 8);
            itemDetailsObj.plannedExFactoryDate = first6Characters;

            let first6CharactersIndex = filteredData.findIndex(item => item && item.str && item.str.startsWith(first6Characters));

            while (first6CharactersIndex !== -1) {
                const plannedExFactoryDateString = filteredData[first6CharactersIndex - 3]?.str;
                if (plannedExFactoryDateString) {
                    const [day, month, year] = plannedExFactoryDateString.split('.').map(Number);
                    const inputDate = new Date(year, month - 1, day);

                    const twentyOneDaysBefore = new Date(inputDate);
                    twentyOneDaysBefore.setDate(inputDate.getDate() - 21);

                    const formattedDay = twentyOneDaysBefore.getDate().toString().padStart(2, '0');
                    const formattedMonth = (twentyOneDaysBefore.getMonth() + 1).toString().padStart(2, '0');
                    const formattedYear = twentyOneDaysBefore.getFullYear();

                    const exFactoryDate = `${formattedDay}.${formattedMonth}.${formattedYear}`;
                    itemDetailsObj.exFactoryDate = exFactoryDate;
                    break;
                } else {
                    first6CharactersIndex = filteredData.findIndex((item, index) => index > first6CharactersIndex && item && item.str && item.str.startsWith(first6Characters));
                }
            }



            let transModeIndex = -1;
            filteredData.forEach((item, index) => {
                if (/([A-Z]{1}[0-9]{1}|[A-Z]+):[A-Z]+/.test(item.str)) {
                    transModeIndex = index + 0;
                    const transModeIndex2 = index + 1;
                    if (transModeIndex < filteredData.length && transModeIndex2 < filteredData.length) {
                        itemDetailsObj.transMode = (filteredData[transModeIndex].str + " " + filteredData[transModeIndex2].str).replace(/\s+\w+/g, "");
                    }
                    // console.log(transModeIndex2,"transModeIndex2")
                    return;
                }
            });

            // let plannedExFactoryDateIndex = -1;
            // filteredData.forEach((item, index) => {
            //     if (/Line Value/.test(item.str)) {
            //         plannedExFactoryDateIndex = index + 9;
            //         return;
            //     }
            // });


            // if (plannedExFactoryDateIndex >= 0 && plannedExFactoryDateIndex < filteredData.length) {
            //     itemDetailsObj.plannedExFactoryDate = filteredData[plannedExFactoryDateIndex].str;
            // }



            itemTextEndIndex = rec.amountIndex
            itemVariantStartIndex = itemTextEndIndex + 1

            //------------------------------------------------------------------------- 
            // item varinat details parsing starts here 
            const itemVarinatsTextArr = [];
            let k = itemVariantStartIndex;
            while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT1)) {
                itemVarinatsTextArr.push(filteredData[k].str);
                k++;
            }
            console.log(itemVarinatsTextArr, 'VVVVVVVv');
            const removedHyphenFromItemVariantsTextArr = itemVarinatsTextArr.map(size => size.replace(/\s+\-/g, ''));
            const stringsWithLength13 = removedHyphenFromItemVariantsTextArr.filter(value => /^\d{12}$/.test(value));
            console.log("stringsWithLength13", stringsWithLength13);
            const regexPattern = /\d+\.\d+\.\d+/;
            const CompMaterialData = removedHyphenFromItemVariantsTextArr.filter(value => regexPattern.test(value));
            console.log("CompMaterialData", CompMaterialData);
            const regexPatternXs = /XS -/;
            const xsHyphen = itemVarinatsTextArr.filter(value => regexPatternXs.test(value));
            console.log("xsHyphen", xsHyphen);

            const sizes = stringsWithLength13.length;
            const count = removedHyphenFromItemVariantsTextArr.length / sizes;
            const itemVariantsArr: LevisPoItemVariant[] = [];
            const allSizesArray = [...new Set(removedHyphenFromItemVariantsTextArr.filter(size => ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2X', 'XXL', 'XXXL', 'LT', 'XLT', '2XLT', '3XLT', '4XLT', '5XLT', 'ST', 'XST', '2XST', '3XST', '4XST', '5XST', 'XS-Slim', 'S-Slim', 'M-Slim', 'L-Slim', 'XL-Slim', 'XXL-Slim', 'XS-Regular', 'S-Regular', 'M-Regular', 'L-Regular', 'XL-Regular', 'XXL-Regular', '3X', '4X', '5X', '6X'].includes(size)))];

            const lineConnectRegex = /\w+\d+-\d+/;
            const lineRegex = /^\d{4,8}$/;
            let lineIndex = removedHyphenFromItemVariantsTextArr.findIndex(item => lineConnectRegex.test(item));
            if (lineIndex === -1) {
                console.log("No matching line found");
            }

            lineIndex++;

            let currentIndex = 0;
            for (let i = 0; i < allSizesArray.length; i++) {
                const size = allSizesArray[i];

                let itemNo = null;
                while (lineIndex < removedHyphenFromItemVariantsTextArr.length) {
                    if (lineRegex.test(removedHyphenFromItemVariantsTextArr[lineIndex])) {
                        itemNo = removedHyphenFromItemVariantsTextArr[lineIndex];
                        lineIndex++;
                        break;
                    }
                    lineIndex++;
                }
                if (!itemNo) {
                    break;
                }

                let scheduledDate = null;
                const regex = /\d+\.\d+\.\d+/g;
                const scheduledDateIndexingDataMatch = removedHyphenFromItemVariantsTextArr.slice(lineIndex).join(' ');
                const matches = scheduledDateIndexingDataMatch.match(regex);
                if (matches && matches.length > 0) {
                    const lastIndex = matches.length - 1;
                    scheduledDate = matches[lastIndex];
                }

                let quantity = null;
                const lastSizeIndexWithHyphen = itemVarinatsTextArr.findIndex(item => new RegExp(/[A-Z]+\s+-/).test(item));
                if (lastSizeIndexWithHyphen === -1) {
                    console.log(`Size not found`);
                } else {
                    const dateIndexAsDate = itemVarinatsTextArr.findIndex((item, index) => index > lastSizeIndexWithHyphen && /\d+\.\d+\.\d+/.test(item));
                    if (dateIndexAsDate === -1) {
                        console.log(`End date not found for size`);
                    } else {
                        quantity = itemVarinatsTextArr.slice(lastSizeIndexWithHyphen + 1, dateIndexAsDate)
                            .map(qty => parseFloat(qty.replace(/,/g, '')))
                            .filter(qty => !isNaN(qty));
                    }
                }

                const itemVariantsObj = new LevisPoItemVariant();
                itemVariantsObj.size = size;
                itemVariantsObj.upc = '-';
                itemVariantsObj.scheduledDate = scheduledDate;
                itemVariantsObj.itemNo = itemNo;
                itemVariantsObj.quantity = '';
                if (quantity !== null) {
                    if (currentIndex < quantity.length) {
                        itemVariantsObj.quantity = `${quantity[currentIndex]}`.trim();
                        currentIndex++;
                    }
                }
                itemVariantsObj.product = '-';
                itemVariantsObj.unitPrice = itemDetailsObj.totalUnitPrice;
                console.log(itemVariantsObj);
                itemVariantsArr.push(itemVariantsObj);

            }
            itemDetailsObj.LevispoItemVariantDetails = itemVariantsArr
            itemDetailsArr.push(itemDetailsObj)
            // }
        }
    }

    /* 1st format BR */
    else if (ITEM_TEXT_END_TEXT === "TRANS MODE" && isSecondFormat1) {
        for (const [index, rec] of filteredData.entries()) {
            if (rec.str.match(ITEM_NO_EXP)) {
                prevItemIndex = index
            }
            if (rec.str.includes(ITEM_VARIANT_START_TEXT)) {
                itemsArr.push({ itemIndex: prevItemIndex, amountIndex: index })
            }

        }
        for (const rec of itemsArr) {
            let shipToEndIndex = 0;
            let itemTextEndIndex = 0;
            let itemDetailsEndIndex = 0
            let itemVariantStartIndex
            const itemDetailsObj = new LevisPoItemDetails();
            console.log(rec.itemIndex, "iiiiiiiiiiiiii")
            itemDetailsObj.poLine = '-'
            // itemDetailsObj.material = '-'
            itemDetailsObj.totalUnitPrice = '-'
            itemDetailsObj.originalDate = '-'
            let tansModeIndex = -1;
            filteredData.forEach((item, index) => {
                if (/TRANS MODE/.test(item.str)) {
                    tansModeIndex = index + 2;
                    return;
                }
            });

            if (tansModeIndex >= 0 && tansModeIndex < filteredData.length) {
                itemDetailsObj.transMode = filteredData[tansModeIndex].str;
            }

            let plannedExFactoryDateIndex = -1;
            filteredData.forEach((item, index) => {
                if (/Tarif Code/.test(item.str)) {
                    plannedExFactoryDateIndex = index + 10;
                    return;
                }
            });

            if (plannedExFactoryDateIndex >= 0 && plannedExFactoryDateIndex < filteredData.length) {
                itemDetailsObj.plannedExFactoryDate = filteredData[plannedExFactoryDateIndex].str;
            }


            const inputDate = new Date(itemDetailsObj.plannedExFactoryDate);
            // Calculate the date 21 days before the plannedExFactoryDate
            const twentyOneDaysBefore = new Date(inputDate);
            twentyOneDaysBefore.setDate(inputDate.getDate() - 21);
            const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(twentyOneDaysBefore);
            itemDetailsObj.exFactoryDate = moment(twentyOneDaysBefore).format("DD.MM.YYYY");

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
            const stringsWithLength13 = itemVarinatsTextArr.filter(value => /^\d{12}$/.test(value));
            console.log("stringsWithLength13", stringsWithLength13);
            // const regexPattern = /[0-9]{2}[A-Z]{5}\w+-\d+/;
            // const CompMaterialData = itemVarinatsTextArr.filter(value => regexPattern.test(value));
            // console.log("CompMaterialData", CompMaterialData);
            const sizes = stringsWithLength13.length;
            const count = itemVarinatsTextArr.length / sizes;
            const itemVariantsArr: LevisPoItemVariant[] = []
            for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
                const itemVariantsObj = new LevisPoItemVariant();
                const upcIndex = itemVarinatsTextArr.indexOf(stringsWithLength13[l]);
                // itemVariantsObj.product = itemVarinatsTextArr[upcIndex + 1]
                let product = itemVarinatsTextArr[upcIndex + 1];
                if (/[A-Z]\d{8}/.test(product)) {
                    product = product.replace(/(.{5})/g, '$1-');
                    product = product.replace(/-$/, '');
                }
                itemVariantsObj.product = product;
                itemVariantsObj.upc = stringsWithLength13[l]
                itemVariantsObj.size = itemVarinatsTextArr[upcIndex + 4]
                // itemVariantsObj.plannedExFactoryDate = itemVarinatsTextArr[upcIndex + 5]
                itemVariantsObj.quantity = itemVarinatsTextArr[upcIndex - 3].replace(/,/g, "");
                itemVariantsObj.unitPrice = itemVarinatsTextArr[upcIndex - 2]
                itemVariantsObj.itemNo = '-';

                itemDetailsObj.material = product;
                // itemVariantsObj.exFactoryDate
                // itemVariantsObj.plannedExFactoryDate = itemVarinatsTextArr[upcIndex + 5];
                // const plannedExFactoryDate = new Date(itemVariantsObj.plannedExFactoryDate);
                // plannedExFactoryDate.setDate(plannedExFactoryDate.getDate() - 21);
                // const year = plannedExFactoryDate.getFullYear();
                // const month = String(plannedExFactoryDate.getMonth() + 1).padStart(2, '0');
                // const day = String(plannedExFactoryDate.getDate()).padStart(2, '0');
                // itemVariantsObj.exFactoryDate = `${year}.${month}.${day}`;
                // itemVariantsObj.plannedExFactoryDate = itemVarinatsTextArr[upcIndex + 5];
                // const inputDate = new Date(itemVariantsObj.plannedExFactoryDate);
                // // Calculate the date 21 days before the plannedExFactoryDate
                // const twentyOneDaysBefore = new Date(inputDate);
                // twentyOneDaysBefore.setDate(inputDate.getDate() - 21);
                // const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(twentyOneDaysBefore);
                // itemVariantsObj.exFactoryDate = moment(twentyOneDaysBefore).format("YYYY.MM.DD");
                // // const upcIndex = itemVarinatsTextArr.indexOf(stringsWithLength13[l]);
                // if (upcIndex !== -1 && upcIndex < itemVarinatsTextArr.length - 1) {
                //     const nextIndexValue = itemVarinatsTextArr[upcIndex + 1];

                //     itemVariantsObj.ratio = itemVarinatsTextArr[upcIndex - 1];
                //     itemVariantsObj.size = itemVarinatsTextArr[upcIndex - 2];

                //     if (!isNaN(parseInt(nextIndexValue))) {
                //         itemVariantsObj.quantity = nextIndexValue;
                //         itemVariantsObj.label = "-";

                //         itemVariantsObj.unitPrice = itemVarinatsTextArr[upcIndex + 3];
                //         itemVariantsObj.exFactory = itemVarinatsTextArr[upcIndex + 5];
                //         itemVariantsObj.exPort = itemVarinatsTextArr[upcIndex + 6];
                //         itemVariantsObj.deliveryDate = itemVarinatsTextArr[upcIndex + 7];
                //         itemVariantsObj.retialPrice = itemVarinatsTextArr[upcIndex + 8];
                //     } else {
                //         itemVariantsObj.label = nextIndexValue;
                //         const labelWithQuantity = itemVarinatsTextArr[upcIndex + 2];

                //         if (!isNaN(parseInt(labelWithQuantity))) {
                //             itemVariantsObj.quantity = labelWithQuantity;

                //             itemVariantsObj.unitPrice = itemVarinatsTextArr[upcIndex + 4];
                //             itemVariantsObj.exFactory = itemVarinatsTextArr[upcIndex + 6];
                //             itemVariantsObj.exPort = itemVarinatsTextArr[upcIndex + 7];
                //             itemVariantsObj.deliveryDate = itemVarinatsTextArr[upcIndex + 8];
                //             itemVariantsObj.retialPrice = itemVarinatsTextArr[upcIndex + 9];
                //         }
                //     }
                // }
                // itemVariantsObj.label = itemVarinatsTextArr[(count * l) + 1]
                // itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + 5]
                // itemVariantsObj.unitPrice = itemVarinatsTextArr[(count * l) +  7]
                // itemVariantsObj.exFactory = itemVarinatsTextArr[(count * l) + 9]
                // itemVariantsObj.exPort = itemVarinatsTextArr[(count * l) + 10]
                // itemVariantsObj.deliveryDate = itemVarinatsTextArr[(count * l) + 11]
                // itemVariantsObj.retialPrice = itemVarinatsTextArr[(count * l) + 12]

                console.log(itemVariantsObj)
                itemVariantsArr.push(itemVariantsObj)
            }
            itemDetailsObj.LevispoItemVariantDetails = itemVariantsArr
            itemDetailsArr.push(itemDetailsObj)
            // }
        }
    }

    /* 3rd format MX */
    else if (MX_FORMAT_KEY === "Variant Material") {

        for (const [index, rec] of filteredData.entries()) {
            if (rec.str.match(ITEM_NO_EXP2)) {
                prevItemIndex = index
            }
            if (rec.str.includes(ITEM_VARIANT_START_TEXT2)) {
                itemsArr.push({ itemIndex: prevItemIndex, amountIndex: index })
            }

        }

        for (const rec of itemsArr) {
            let shipToEndIndex = 0;
            let itemTextEndIndex = 0;
            let itemDetailsEndIndex = 0
            let itemVariantStartIndex
            const itemDetailsObj = new LevisPoItemDetails();
            console.log(rec.itemIndex, "iiiiiiiiiiiiii")

            itemDetailsObj.poLine = filteredData[rec.itemIndex + 1].str
            // itemDetailsObj.material = filteredData[rec.itemIndex + 2].str
            // let originalDateIndexPoLine = -1;
            // filteredData.forEach((item, index) => {
            //     if (/Item Total Value/.test(item.str)) {
            //         originalDateIndexPoLine = index + 5;
            //         return;
            //     }
            // });

            // if (originalDateIndexPoLine >= 0 && originalDateIndexPoLine < filteredData.length) {
            //     itemDetailsObj.originalDate = filteredData[originalDateIndexPoLine].str;
            // }

            // let tansModeIndex = -1;
            // filteredData.forEach((item, index) => {
            //     if (/([A-Za-z]{1}[0-9]{4}-[0-9]{4}[A-Za-z]{1})|[0-9]{5}-[0-9]{4}[A-Z]+/.test(item.str)) {
            //         tansModeIndex = index - 4;
            //         return;
            //     }
            // });

            // if (tansModeIndex >= 0 && tansModeIndex < filteredData.length) {
            //     itemDetailsObj.transMode = filteredData[tansModeIndex].str;
            // }

            // itemDetailsObj.transMode=label



            // let plannedExFactoryDateIndex = -1;
            // filteredData.forEach((item, index) => {
            //     if (/Item Total Value/.test(item.str)) {
            //         plannedExFactoryDateIndex = index + 5;
            //         return;
            //     }
            // });

            // if (plannedExFactoryDateIndex >= 0 && plannedExFactoryDateIndex < filteredData.length) {
            //     itemDetailsObj.plannedExFactoryDate = filteredData[plannedExFactoryDateIndex].str;
            // }


            // const inputDate = new Date(itemDetailsObj.plannedExFactoryDate);
            // // Calculate the date 21 days before the plannedExFactoryDate
            // const twentyOneDaysBefore = new Date(inputDate);
            // twentyOneDaysBefore.setDate(inputDate.getDate() - 21);
            // const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(twentyOneDaysBefore);
            // itemDetailsObj.exFactoryDate = moment(twentyOneDaysBefore).format("DD.MM.YYYY");


            // let originalDateIndexPoLine = -1;

            // filteredData.forEach((item, index) => {
            //     if (/Item Total Value/.test(item.str)) {
            //         originalDateIndexPoLine = index + 5;
            //         return;
            //     }
            // });

            // if (originalDateIndexPoLine >= 0 && originalDateIndexPoLine < filteredData.length) {
            //     const originalDateString = filteredData[originalDateIndexPoLine].str;
            //     const [day, month, year] = originalDateString.split('.');
            //     const originalDate = new Date(`${month}/${day}/${year}`);
            //     originalDate.setDate(originalDate.getDate() - 21);
            //     const formattedDate = `${originalDate.getDate()}.${originalDate.getMonth() + 1}.${originalDate.getFullYear()}`;
            //     itemDetailsObj.originalDate = formattedDate;
            // }

            let plannedExFactoryDateIndex = -1;
            filteredData.forEach((item, index) => {
                if (/Item Total Value/.test(item.str)) {
                    plannedExFactoryDateIndex = index + 5;
                    return;
                }
            });

            if (plannedExFactoryDateIndex >= 0 && plannedExFactoryDateIndex < filteredData.length) {
                itemDetailsObj.plannedExFactoryDate = filteredData[plannedExFactoryDateIndex].str;
            }


            if (plannedExFactoryDateIndex >= 0 && plannedExFactoryDateIndex < filteredData.length) {
                const plannedExFactoryDateString = filteredData[plannedExFactoryDateIndex].str;
                const [day, month, year] = plannedExFactoryDateString.split('.').map(Number);
                const inputDate = new Date(year, month - 1, day);
                const twentyOneDaysBefore = new Date(inputDate);
                twentyOneDaysBefore.setDate(inputDate.getDate() - 21);

                // Format the date as DD.MM.YYYY
                const formattedDay = twentyOneDaysBefore.getDate().toString().padStart(2, '0');
                const formattedMonth = (twentyOneDaysBefore.getMonth() + 1).toString().padStart(2, '0');
                const formattedYear = twentyOneDaysBefore.getFullYear();

                const exFactoryDate = `${formattedDay}.${formattedMonth}.${formattedYear}`;
                itemDetailsObj.exFactoryDate = exFactoryDate;
            }
            let materialIndex = -1;
            filteredData.forEach((item, index) => {
                if (/Item Total Value/.test(item.str)) {
                    materialIndex = index + 2;
                    return;
                }
            });

            if (materialIndex >= 0 && materialIndex < filteredData.length) {
                itemDetailsObj.material = filteredData[materialIndex].str;
            }

            let unitPriceIndexPoLine = -1;
            filteredData.forEach((item, index) => {
                if (/Line Item/.test(item.str)) {
                    unitPriceIndexPoLine = index - 4;
                    return;
                }
            });

            if (unitPriceIndexPoLine >= 0 && unitPriceIndexPoLine < filteredData.length) {
                itemDetailsObj.totalUnitPrice = filteredData[unitPriceIndexPoLine].str;
            }



            itemTextEndIndex = rec.amountIndex
            itemVariantStartIndex = itemTextEndIndex + 1

            //------------------------------------------------------------------------- 
            // item varinat details parsing starts here 
            const itemVarinatsTextArr = []
            let k = itemVariantStartIndex
            while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT22) && !filteredData[k].str.includes(ITEM_TEXT_END_TEXT2)) {
                itemVarinatsTextArr.push(filteredData[k].str);
                k++;
            }
            console.log(itemVarinatsTextArr, 'VVVVVVVv')
            const stringsWithLength13 = itemVarinatsTextArr.filter(value => /([A-Za-z]{1}[0-9]{4}-[0-9]{4}[A-Za-z]{1})|[0-9]{5}-[0-9]{4}[A-Z]+/.test(value));
            console.log("stringsWithLength13", stringsWithLength13);
            // const regexPattern = /[0-9]{2}[A-Z]{5}\w+-\d+/;
            // const CompMaterialData = itemVarinatsTextArr.filter(value => regexPattern.test(value));
            // console.log("CompMaterialData", CompMaterialData);
            const sizes = stringsWithLength13.length;
            const count = itemVarinatsTextArr.length / sizes;
            const itemVariantsArr: LevisPoItemVariant[] = []
            for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
                const itemVariantsObj = new LevisPoItemVariant();
                const upcIndex = itemVarinatsTextArr.indexOf(stringsWithLength13[l]);
                itemVariantsObj.product = stringsWithLength13[l]; // variant material
                let sizeIndex = upcIndex + 2; // Start looking for size from index +2
                let size = '';
                let quantity = '';
                let label = '';
                while (sizeIndex < itemVarinatsTextArr.length) {
                    size = itemVarinatsTextArr[sizeIndex];
                    if (['XXS', 'XS', 'S', 'M', 'L', 'XL', '2X', 'XXL', 'XXXL', 'LT', 'XLT', '2XLT', '3XLT', '4XLT', '5XLT', 'ST', 'XST', '2XST', '3XST', '4XST', '5XST', 'XS-Slim', 'S-Slim', 'M-Slim', 'L-Slim', 'XL-Slim', 'XXL-Slim', 'XS-Regular', 'S-Regular', 'M-Regular', 'L-Regular', 'XL-Regular', 'XXL-Regular', '3X', '4X', '5X', '6X', 'G', 'CH', 'ECH', 'EG', 'EEG',].includes(size)) {
                        quantity = itemVarinatsTextArr[sizeIndex + 1].replace(/,/g, '');
                        label = itemVarinatsTextArr[sizeIndex + 2];
                        break;
                    }
                    sizeIndex++;
                }
                itemVariantsObj.size = size;
                itemVariantsObj.quantity = quantity;
                itemVariantsObj.itemNo = itemVarinatsTextArr[upcIndex - 1];
                itemVariantsObj.upc = '-';
                itemVariantsObj.label = label;
                itemDetailsObj.transMode = label;
                // itemVariantsObj.label =  itemVarinatsTextArr[upcIndex + 4]; 
                // itemVariantsObj.exFactoryDate = itemVarinatsTextArr[upcIndex - 1]  //item#
                // itemVariantsObj.plannedExFactoryDate = itemVarinatsTextArr[upcIndex + 5]
                // itemVariantsObj.quantity = itemVarinatsTextArr[upcIndex - 3].replace(/,/g, "");
                // itemVariantsObj.unitPrice = itemVarinatsTextArr[upcIndex - 2]
                // const plannedExFactoryDate = new Date(itemVariantsObj.plannedExFactoryDate);
                // plannedExFactoryDate.setDate(plannedExFactoryDate.getDate() - 21);
                // itemVariantsObj.exFactoryDate = plannedExFactoryDate.toISOString().slice(0, 10);
                itemVariantsObj.unitPrice = itemDetailsObj.totalUnitPrice;

                console.log(itemVariantsObj)
                itemVariantsArr.push(itemVariantsObj)
            }
            itemDetailsObj.LevispoItemVariantDetails = itemVariantsArr
            itemDetailsArr.push(itemDetailsObj)
            // }
        }
    }

    poData.LevispoItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}

