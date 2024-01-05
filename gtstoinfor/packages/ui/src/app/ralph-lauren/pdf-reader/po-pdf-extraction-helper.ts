import { PoItemDetails, PoItemVariant, RLPoDetails } from "@project-management-system/shared-models";
import {
    CURR_INDEX, COLOR_DESC, EMP_STR_EXP, ITEM_BILL_TO_START_TEXT, INCOTERMS_INDEX, ITEM_ACCEPTANCEDATE_INDEX, ITEM_DELIVERYDATE_INDEX, ITEM_DESCRIPTION_INDEX, ITEM_MATERIAL_INDEX, ITEM_MODE_INDEX, ITEM_NO_EXP, ITEM_NO_INDEX, ITEM_SHIP_TO_START_TEXT, ITEM_SHIP_TO_START_INDEX, ITEM_SHIP_TO_END_TEXT, ITEM_TEXT_END_TEXT, ITEM_SHIP_TO_END_INDEX, ITEM_VARIANT_START_TEXT, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_TEXT, SEASONYEAR_INDEX, SELLER_ADDRESS_END_TEXT, SELLER_ADDRESS_START_TEXT, UNWANTED_TEXT_1, UNWANTED_TEXT_2, UNWANTED_TEXT_3, UNWANTED_TEXT_4, UNWANTED_TEXT_5, UNWANTED_TEXT_6,
    UNWANTED_TEXT_7, UNWANTED_TEXT_8, UNWANTED_TEXT_9, UNWANTED_TEXT_10, UNWANTED_TEXT_11, UNWANTED_TEXT_12, UNWANTED_TEXT_13
} from "./popdf-regex-expressions";


/**
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib.
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details.
 * step 1 : Filter all the empty strings and unwanted texts from the raw data
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push
 *   all the matched texts into an array.Now this array will contains all the items of the pdf
 * ste 4 : Find the no of item variant lines and push them into item variant details.
 * @param pdf 
 * @returns {RLPoDetails}
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new RLPoDetails()
    const itemsArr: { itemIndex: number, colorIndex: number, amountIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: PoItemDetails[] = []
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
                    buyerAddStartIndex = ind + 2
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
            poData.poNumber = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX].str
            poData.revisionNo = firstPageContent[poNumberTextIndex + 5].str
            poData.agent = firstPageContent[shipToAddEndIndex + 2].str
            poData.purchaseGroup = firstPageContent[dateSentIndex + 2].str
            poData.orderType = firstPageContent[dateSentIndex + 3].str
            poData.paymentCategory = "USD";
            poData.plant = firstPageContent[dateSentIndex + 5].str
            poData.mfgOrigin = firstPageContent[dateSentIndex + 6].str
            poData.poPrint = firstPageContent[dateSentIndex + 7].str
            poData.poIssue = firstPageContent[dateSentIndex + 8].str
            poData.poContact = firstPageContent[dateSentIndex + 9].str
            poData.dateSent = firstPageContent[dateSentIndex + 10].str
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
        // filtering the pdf data i.e remove unnecessary data which is not required for data parsing
        let startFlag = false; // Initialize startFlag to false
        let endFlag = false;   // Initialize endFlag to false
        const pageContent = textContent.items.filter((val, index) => {
            if (val.str == 'Material Number') { startFlag = true; }
            if (endFlag) {
                startFlag = false;
                endFlag = false;
            }
            if (val.str == "PO Line Total") { endFlag = true; }
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
                || val.str.includes(UNWANTED_TEXT_11)
                || val.str.includes(UNWANTED_TEXT_12)
                || val.str.includes(UNWANTED_TEXT_13)
            )
        })
        filteredData.push(...pageContent)
    }
    //------------------------------------------------------------------------------
    console.log(filteredData)
    let prevItemIndex = 0
    let prevColorIndex = 0;
    for (const [index, rec] of filteredData.entries()) {
        // chech the item No pattern  using regex and push all matched items
        if (rec.str.match(ITEM_NO_EXP)) {
            prevItemIndex = index
        }
        if (rec.str.match(COLOR_DESC)) {
            prevColorIndex = index
        }
        if (rec.str.match(ITEM_VARIANT_START_TEXT)) {
            itemsArr.push({ itemIndex: prevItemIndex, colorIndex: prevColorIndex, amountIndex: index })
        }
    }

    console.log(itemsArr, 'AAAAAAAAA')
    for (const rec of itemsArr) {
        let shipToEndIndex = 0;
        let itemTextEndIndex = 0;
        let itemDetailsEndIndex = 0
        let itemVariantStartIndex
        const itemDetailsObj = new PoItemDetails();
        itemDetailsObj.materialNo = filteredData[rec.itemIndex + 2].str
        itemDetailsObj.poItem = filteredData[rec.itemIndex + 3].str.replace(/PO Item #/g,"");
        itemDetailsObj.season = filteredData[rec.itemIndex + 6].str
        itemDetailsObj.incoterms = filteredData[rec.itemIndex + 9].str
        itemDetailsObj.contractualDeliveryDate = filteredData[rec.itemIndex + 12].str
        itemDetailsObj.inboundPkg = filteredData[rec.itemIndex + 15].str
        itemDetailsObj.incotermsPlace = filteredData[rec.itemIndex + 18].str
        itemDetailsObj.handoverDate = filteredData[rec.itemIndex + 21].str
        itemDetailsObj.mfgProcess = filteredData[rec.itemIndex + 24].str
        itemDetailsObj.harbor = filteredData[rec.itemIndex + 27].str
        itemDetailsObj.shipMode = filteredData[rec.itemIndex + 34].str
        itemDetailsObj.model = filteredData[rec.itemIndex + 43].str
        itemDetailsObj.productType = filteredData[rec.itemIndex + 46].str
        itemDetailsObj.merchDivision = filteredData[rec.itemIndex + 49].str
        itemDetailsObj.colorDescription = filteredData[rec.colorIndex + 2].str
        itemDetailsObj.class = filteredData[rec.itemIndex + 58].str
        itemDetailsObj.conceptShortDesc = filteredData[rec.itemIndex + 59].str
        itemDetailsObj.fabricContent = filteredData[rec.itemIndex + 62].str
        itemDetailsObj.board = filteredData[rec.itemIndex + 65].str
        itemDetailsObj.fishWildlifeInd = filteredData[rec.itemIndex + 68].str
        itemDetailsObj.gender = filteredData[rec.itemIndex + 73].str
        itemDetailsObj.downFeatherInd = filteredData[rec.itemIndex + 76].str
        itemDetailsObj.fabrication = filteredData[rec.itemIndex + 79].str

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
        const itemVariantsArr: PoItemVariant[] = []
        for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
            const itemVariantsObj = new PoItemVariant();
            itemVariantsObj.size = itemVarinatsTextArr[(count * l) + 0]
            itemVariantsObj.upc = itemVarinatsTextArr[(count * l) + 1]
            itemVariantsObj.unitPrice = itemVarinatsTextArr[(count * l) + count - 5]
            itemVariantsObj.currency = itemVarinatsTextArr[(count * l) + count - 4]
            itemVariantsObj.quantity = itemVarinatsTextArr[(count * l) + count - 3]
            itemVariantsObj.amount = itemVarinatsTextArr[(count * l) + count - 1]
            console.log(itemVariantsObj)
            itemVariantsArr.push(itemVariantsObj)
        }
        itemDetailsObj.poItemVariantDetails = itemVariantsArr
        itemDetailsArr.push(itemDetailsObj)
    }
    poData.poItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}

