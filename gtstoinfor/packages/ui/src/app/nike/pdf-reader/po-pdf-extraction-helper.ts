import { LegalPoDetails, PoItemDetailsDto, PoItemVariantDto } from "@project-management-system/shared-models";
import { CURR_INDEX, DIVISIONBUYGROUP_INDEX, EMP_STR_EXP, FACTORYLOCATION_INDEX, INCOTERMS_INDEX, ITEM_ACCEPTANCEDATE_INDEX, ITEM_DELIVERYDATE_INDEX, ITEM_DESCRIPTION_INDEX, ITEM_MATERIAL_INDEX, ITEM_MODE_INDEX, ITEM_NO_EXP, ITEM_NO_INDEX, ITEM_SHIP_TO_INDEX, ITEM_SHIP_TO_INDEXES, ITEM_SHIP_TO_TEXT, ITEM_TEXT_END_TEXT, ITEM_TEXT_END_TEXT2, ITEM_TEXT_INDEX, ITEM_TEXT_START_INDEX, PO_DOC_DATE_INDEX, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_TEXT, SEASONYEAR_INDEX, SELLER_ADDRESS_END_TEXT, SELLER_ADDRESS_START_TEXT, UNWANTED_TEXT_1, UNWANTED_TEXT_10, UNWANTED_TEXT_2, UNWANTED_TEXT_3, UNWANTED_TEXT_4, UNWANTED_TEXT_5, UNWANTED_TEXT_6, UNWANTED_TEXT_7, UNWANTED_TEXT_8, UNWANTED_TEXT_9 } from "./popdf-regex-expressions";


/**
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib.
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details.
 * step 1 : Filter all the empty strings and unwanted texts from the raw data
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push
 *   all the matched texts into an array.Now this array will contains all the items of the pdf
 * ste 4 : Find the no of item variant lines and push them into item variant details.
 * @param pdf 
 * @returns {LegalPoDetails}
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new LegalPoDetails()
    const itemsArr: { itemNo: string, itemIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: PoItemDetailsDto[] = []
    for (let i = 1; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent: any = await page.getTextContent();


        //parsing  po data 
        // po details exists only in first data of pdf ,so using only first page for extracting po details
        if (i == 1) {
            const firstPageContent: any[] = textContent.items.filter((v) => {
                return !EMP_STR_EXP.test(v.str)
            })
            // find indexes of all the po data fields
            let poDocDateIndex
            let poNumberTextIndex
            let sellerStartIndex
            let sellerEndIndex
            let buyerAddStartIndex
            let buyerAddEndIndex
            let shipToAddStartIndex;
            let shipToAddEndIndex;
            let shipToCount = 0
            let firstShipToFlag = false

            console.log(firstPageContent)
            for (const [ind, ele] of firstPageContent.entries()) {
                if (ele.str.includes(PO_DOC_DATE_TXT)) {
                    poDocDateIndex = ind
                }
                if (ele.str == PO_NUMBER_TEXT) {
                    poNumberTextIndex = ind
                }
                if (ele.str == SELLER_ADDRESS_START_TEXT) {
                    sellerStartIndex = ind
                }
                if (ele.str == SELLER_ADDRESS_END_TEXT) {
                    sellerEndIndex = ind
                    buyerAddStartIndex = ind
                }
                if (ele.str === "SHIP TO:") {
                    if (shipToCount === 0) {
                        console.log(ind,'IiIiIiIi')
                        // Found the first "ship to"
                        shipToAddStartIndex = ind;
                        buyerAddEndIndex = ind
                        shipToCount++;
                    } else if (shipToCount === 1) {
                        // Found the second "ship to"
                        shipToAddStartIndex = ind;
                        buyerAddEndIndex = ind
                    }
                }
                if (ele.str == ITEM_SHIP_TO_TEXT) {
                    firstShipToFlag = true
                }
                if (ele.str.includes(UNWANTED_TEXT_1)) {
                    shipToAddEndIndex = ind
                }
                if(shipToAddEndIndex< shipToAddStartIndex){
                    if (ele.str.includes("BUYER:")) {
                        shipToAddEndIndex = ind
                    }  
                }
                console.log(shipToAddEndIndex,'EEEEEEEEEEEEE')
            }
            let poNumber;
            poData.poDocDate = firstPageContent[poDocDateIndex + PO_DOC_DATE_INDEX].str
            poData.seasonYear = firstPageContent[poDocDateIndex + SEASONYEAR_INDEX].str
            poData.divisionBuyGroup = firstPageContent[poDocDateIndex + DIVISIONBUYGROUP_INDEX[0]].str + ' ' + firstPageContent[poDocDateIndex + DIVISIONBUYGROUP_INDEX[1]].str
            poData.currency = firstPageContent[poDocDateIndex + CURR_INDEX].str
            poData.incoterms = firstPageContent[poDocDateIndex + INCOTERMS_INDEX[0]].str + ' ' + firstPageContent[poDocDateIndex + INCOTERMS_INDEX[1]].str
            poData.factoryLocation = firstPageContent[poDocDateIndex + FACTORYLOCATION_INDEX].str
            if (firstPageContent[poNumberTextIndex + 2].str.match(/^\d{10}$/) || firstPageContent[poNumberTextIndex + 2].str.match(/^\d{10}\s*\/\s*\d{10}$/)) {
                poNumber = firstPageContent[poNumberTextIndex + 2].str
            } else {
                poNumber = firstPageContent[poNumberTextIndex + 3].str
            }
            poData.poNumber = poNumber
            // console.log(poData.poNumber)
            if (poData.poNumber.includes('/')) {
                poData.poNumber = poData.poNumber.split("/")[1]
            }
            let selleraddress = '';
            for (let a = sellerStartIndex + 1; a < sellerEndIndex; a++) {
                selleraddress += firstPageContent[a].str + ','
            }
            poData.sellerAddress = selleraddress
            let buyerAddress = '';
            for (let b = buyerAddStartIndex + 1; b < buyerAddEndIndex; b++) {
                buyerAddress += firstPageContent[b].str + ','
            }
            poData.buyerAddress = buyerAddress;
            console.log(shipToAddStartIndex,'SHHHHHHHHHH')
            let shipToAddress = ''
            for (let c = shipToAddStartIndex + 1; c < shipToAddEndIndex; c++) {
                shipToAddress += firstPageContent[c].str + ','
            }
            console.log(shipToAddress,'SSSSSSSSSSSSSSSS')
            poData.shipToAddress = shipToAddress;

        }
        // po details parsing ends here

        //-------------------------------------------------------------------------------------------
        // data filtering satrts here
        // filtering the pdf data i.e remove unnecessary data which is not required for data parsing
        let startFlag = false; // Initialize startFlag to false
        let endFlag = false;   // Initialize endFlag to false
        const pageContent = textContent.items.filter((val, index) => {

            if (val.str == 'PURCHASE ORDER' || val.str == "ITEM#") { startFlag = true; }
            if (endFlag) {
                startFlag = false;
                endFlag = false;
            }
            if (val.str == 'AMOUNT') { endFlag = true; }
            if (val.str == "SELLER:") { startFlag = true }
            if (val.str.includes("__________________________________________")) { endFlag == true }
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
                || val.str.includes(UNWANTED_TEXT_8)
                || val.str.includes(UNWANTED_TEXT_9)
                || val.str.includes(UNWANTED_TEXT_10)
                || startFlag
            )
        })

        filteredData.push(...pageContent)
    }
    //------------------------------------------------------------------------------
    // console.log(filteredData)

    console.log(filteredData)
    for (const [index, rec] of filteredData.entries()) {
        // chech the item No pattern  using regex and push all matched items
        if (rec.str.match(ITEM_NO_EXP) && (rec.str.length === 5)) {
            itemsArr.push({ itemNo: rec.str, itemIndex: index })
        }
    }
    
    for (const rec of itemsArr) {
        let shipToEndIndex = 0;
        let itemTextEndIndex = 0;
        let itemDetailsEndIndex = 0
        let itemVariantStartIndex
        const itemDetailsObj = new PoItemDetailsDto();
        itemDetailsObj.itemNo = filteredData[rec.itemIndex + ITEM_NO_INDEX].str
        itemDetailsObj.matrial = filteredData[rec.itemIndex + ITEM_MATERIAL_INDEX].str
        itemDetailsObj.description = filteredData[rec.itemIndex + ITEM_DESCRIPTION_INDEX].str
        itemDetailsObj.deliveryDate = filteredData[rec.itemIndex + ITEM_DELIVERYDATE_INDEX].str
        itemDetailsObj.mode = filteredData[rec.itemIndex + ITEM_MODE_INDEX].str
        itemDetailsObj.acceptanceDate = filteredData[rec.itemIndex + ITEM_ACCEPTANCEDATE_INDEX].str
        itemDetailsEndIndex = rec.itemIndex + ITEM_ACCEPTANCEDATE_INDEX + 1

        const deliveryDate = itemDetailsObj.deliveryDate;
        if (deliveryDate === '00.00.0000') {
            continue; 
        }
        //-------------------------------------------------------------
        // check if ship to data exists
        let isShipToTextExist = false
        let isItemTextExist = false
        let itemTextIndex

        if (filteredData[rec.itemIndex + ITEM_SHIP_TO_INDEX].str == ITEM_SHIP_TO_TEXT) {
            let shipToText = ''
            console.log(rec.itemIndex + ITEM_SHIP_TO_INDEX + 1, 'GGGGGGGGG')
            for (let i = (rec.itemIndex + ITEM_SHIP_TO_INDEX + 1); i < i + 10; i++) {
                console.log(filteredData[i].str)
                if (filteredData[i].str.includes('ITEM TEXT')) {
                    shipToEndIndex = i - 1
                    isItemTextExist = true
                    break;
                } else if (filteredData[i].str == ITEM_TEXT_END_TEXT) {
                    shipToEndIndex = i - 1
                    break;
                } else {
                    shipToText = shipToText + filteredData[i].str + ','
                }
            }
            itemDetailsObj.shipToAddress = shipToText
            // shipToEndIndex = rec.itemIndex + ITEM_SHIP_TO_INDEXES[ITEM_SHIP_TO_INDEXES.length - 1]
            isShipToTextExist = true
        }
        //------------------------------------------------------------------
        // check if item text exists
        console.log(shipToEndIndex, 'IIIIIIIII')
        if (isShipToTextExist) {
            itemTextIndex = shipToEndIndex + 1
        } else {
            itemTextIndex = rec.itemIndex + ITEM_SHIP_TO_INDEX
        }
        console.log(itemTextIndex)
        if (filteredData[itemTextIndex].str == 'ITEM TEXT' || filteredData[itemTextIndex].str.includes('SALES ORDER')) {
            // console.log('item text exists')
            let itemText = ''
            let itemTextSatrtIndex;
            if(filteredData[itemTextIndex + 1].str == ITEM_TEXT_END_TEXT){
                itemTextSatrtIndex = itemTextIndex
            } else if (filteredData[itemTextIndex + 2].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 3
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else if (filteredData[itemTextIndex + 3].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 4
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else if (filteredData[itemTextIndex + 4].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 5
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else if (filteredData[itemTextIndex + 5].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 6
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else if (filteredData[itemTextIndex + 6].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 7
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else if (filteredData[itemTextIndex + 7].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 8
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else if (filteredData[itemTextIndex + 8].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 9
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else if (filteredData[itemTextIndex + 9].str.includes('SALES ORDER')) {
                itemTextSatrtIndex = itemTextIndex + 10
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = itemText
            } else {
                itemTextSatrtIndex = itemTextIndex + 1
                let j = itemTextSatrtIndex;
                while (!(filteredData[j].str == (ITEM_TEXT_END_TEXT))) {
                    itemText += filteredData[j].str + ',';
                    itemTextEndIndex = j;
                    j++;
                }
                itemDetailsObj.itemVasText = null;
            }
            // console.log(itemTextIndex, 'itemTextIndex')
            // console.log(itemTextSatrtIndex, 'itemTextSatrtIndex')
            // Find the index where the str is "__________________" and stop the loop there ,item text ends there

            // if (itemText.includes('Supply') || itemText.includes('EA diverted') || itemText.includes('OGAC/GAC') || itemText.includes('ITEM TEXT,') || itemText.includes('Item Text,')){
            //     itemDetailsObj.itemVasText = null;
            // } else {
            // }
        }

        //    --------------------------------------------------
        // check if vas text exists

        //     vas text logic comes here
        //    --------------------------------------------------
        if (itemTextEndIndex) {
            itemVariantStartIndex = itemTextEndIndex + 1
        } else if (shipToEndIndex) {
            itemVariantStartIndex = shipToEndIndex + 1
        } else {
            itemVariantStartIndex = itemDetailsEndIndex
        }


        //-------------------------------------------------------------------------
        // item varinat details parsing starts here
        const itemVarinatsTextArr = []
        let k = itemVariantStartIndex
        console.log(k, 'KKKKKKKKK')
        while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT2)) {
            itemVarinatsTextArr.push(filteredData[k].str)
            k++
        }
        const itemVariantsArr: PoItemVariantDto[] = []
      

        for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / 6); l++) {
            const itemVariantsObj = new PoItemVariantDto();
            itemVariantsObj.uom = itemVarinatsTextArr[(6 * l) + 0];
        
            const unitPriceWithCurrency = itemVarinatsTextArr[(6 * l) + 1] + ' ' + itemVarinatsTextArr[(6 * l) + 2];
            const usdIndex = unitPriceWithCurrency.indexOf('USD');
        
            if (usdIndex !== -1) {
                const afterUsd = unitPriceWithCurrency.substring(usdIndex + 3).trim();
                if (afterUsd !== '') {
                    itemVariantsObj.unitPrice = unitPriceWithCurrency.substring(0, usdIndex + 3);
                    itemVariantsObj.size = afterUsd;
                } else {
                    itemVariantsObj.uom = itemVarinatsTextArr[(6 * l) + 0];
                    itemVariantsObj.unitPrice = itemVarinatsTextArr[(6 * l) + 1] + ' ' + itemVarinatsTextArr[(6 * l) + 2];
                    itemVariantsObj.size = itemVarinatsTextArr[(6 * l) + 3];
                    const numberWithComma = itemVarinatsTextArr[(6 * l) + 4];
                    let numberWithoutComma;
        
                    if (numberWithComma.includes(',')) {
                        numberWithoutComma = numberWithComma.replace(/,/g, '');
                    } else {
                        numberWithoutComma = numberWithComma;
                    }
        
                    itemVariantsObj.qunatity = numberWithoutComma;
                    itemVariantsObj.amount = itemVarinatsTextArr[(6 * l) + 5];
                    console.log(itemVariantsObj);
                    itemVariantsArr.push(itemVariantsObj);
                    continue;
                }
            } else {
                itemVariantsObj.unitPrice = unitPriceWithCurrency;
                itemVariantsObj.size = '';
            }
        
            const numberWithComma = itemVarinatsTextArr[(6 * l) + 3];
            let numberWithoutComma;
        
            if (numberWithComma.includes(',')) {
                numberWithoutComma = numberWithComma.replace(/,/g, '');
            } else {
                numberWithoutComma = numberWithComma;
            }
        
            itemVariantsObj.qunatity = numberWithoutComma;
            itemVariantsObj.amount = itemVarinatsTextArr[(6 * l) + 5];
            console.log(itemVariantsObj);
            itemVariantsArr.push(itemVariantsObj);
        }
        
        itemDetailsObj.poItemVariantDetails = itemVariantsArr
        itemDetailsArr.push(itemDetailsObj)
    }
    poData.poItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}


  /* working pdf format */
        // for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / 6); l++) {
        //     const itemVariantsObj = new PoItemVariantDto();
        //     itemVariantsObj.uom = itemVarinatsTextArr[(6 * l) + 0]
        //     itemVariantsObj.unitPrice = itemVarinatsTextArr[(6 * l) + 1] + ' ' + itemVarinatsTextArr[(6 * l) + 2]
        //     itemVariantsObj.size = itemVarinatsTextArr[(6 * l) + 3]
        //     const numberWithComma = itemVarinatsTextArr[(6 * l) + 4]
        //     let numberWithoutComma;
        //     if (numberWithComma.includes(','))
        //         numberWithoutComma = numberWithComma.replace(/,/g, '')
        //     else
        //         numberWithoutComma = numberWithComma
        //     itemVariantsObj.qunatity = numberWithoutComma
        //     itemVariantsObj.amount = itemVarinatsTextArr[(6 * l) + 5]
        //     console.log(itemVariantsObj)
        //     itemVariantsArr.push(itemVariantsObj)
        // }


  /* no value format */
        // for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / 6); l++) {
        //     const itemVariantsObj = new PoItemVariantDto();
        //     itemVariantsObj.uom = itemVarinatsTextArr[(6 * l) + 0];
        
        //     const unitPriceWithCurrency = itemVarinatsTextArr[(6 * l) + 1] + ' ' + itemVarinatsTextArr[(6 * l) + 2];
        //     const usdIndex = unitPriceWithCurrency.indexOf('USD');
            
        //     if (usdIndex !== -1) {
        //         itemVariantsObj.unitPrice = unitPriceWithCurrency.substring(0, usdIndex + 3); // Including 'USD'
        //         itemVariantsObj.size = unitPriceWithCurrency.substring(usdIndex + 4).trim(); // Extracting data after 'USD' as size
        //     } else {
        //         itemVariantsObj.unitPrice = unitPriceWithCurrency;
        //         itemVariantsObj.size = '';
        //     }
        
        //     const numberWithComma = itemVarinatsTextArr[(6 * l) + 3];
        //     let numberWithoutComma;
        
        //     if (numberWithComma.includes(',')) {
        //         numberWithoutComma = numberWithComma.replace(/,/g, '');
        //     } else {
        //         numberWithoutComma = numberWithComma;
        //     }
        
        //     itemVariantsObj.qunatity = numberWithoutComma;
        //     itemVariantsObj.amount = itemVarinatsTextArr[(6 * l) + 5];
        
        //     console.log(itemVariantsObj);
        //     itemVariantsArr.push(itemVariantsObj);
        // }