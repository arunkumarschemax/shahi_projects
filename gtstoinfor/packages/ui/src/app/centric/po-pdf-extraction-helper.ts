import { CentricPoDetails, CentricPoItemDetails, CentricPoItemVariant } from "@project-management-system/shared-models";
import { EMP_STR_EXP, ITEM_NO_EXP, ITEM_TEXT_END_TEXT, ITEM_VARIANT_START_TEXT, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_TEXT, UNWANTED_TEXT_1, UNWANTED_TEXT_10, UNWANTED_TEXT_11, UNWANTED_TEXT_12, UNWANTED_TEXT_13, UNWANTED_TEXT_2, UNWANTED_TEXT_3, UNWANTED_TEXT_4, UNWANTED_TEXT_5, UNWANTED_TEXT_6, UNWANTED_TEXT_7, UNWANTED_TEXT_8, UNWANTED_TEXT_9 } from "./popdf-regex-expressions";


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

            }
            poData.poNumber = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX].str
            poData.poDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX+1].str
            poData.shipment = firstPageContent[dateSentIndex + 4].str
            poData.season = firstPageContent[dateSentIndex + 13].str
            poData.portOfExport = firstPageContent[dateSentIndex + 2].str
            poData.portOfEntry = firstPageContent[dateSentIndex + 3].str
            poData.Refrence = firstPageContent[dateSentIndex + 10].str
            poData.poPrint = firstPageContent[dateSentIndex + 7].str
            poData.paymentTermDescription = firstPageContent[dateSentIndex + 25].str
            poData.specialInstructions = firstPageContent[dateSentIndex + 27].str
            poData.division = firstPageContent[dateSentIndex + 5].str
            poData.incoterm = firstPageContent[dateSentIndex - 8].str+firstPageContent[dateSentIndex - 7].str+" "+firstPageContent[dateSentIndex - 6].str+firstPageContent[dateSentIndex - 5].str.replace(/\d+/g,"")
            poData.shipToAdd = firstPageContent[dateSentIndex + 5].str
            poData.manufacture = firstPageContent[dateSentIndex + 5].str
            poData.comptMaterial = firstPageContent[dateSentIndex + 5].str

            // poData.revisionNo = firstPageContent[poNumberTextIndex - 10].str
            // poData.agent = firstPageContent[shipToAddEndIndex + 2].str
            // poData.dateSent = firstPageContent[dateSentIndex + 10].str

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
    console.log(filteredData, "filteredData")
    let prevItemIndex = 0
    let prevColorIndex = 0;
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
        }
        let foundMens = false;
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
        // itemDetailsObj.shortDescription = filteredData[rec.itemIndex + 20].str;
        itemDetailsObj.shortDescription = filteredData[rec.itemIndex + 20].str.replace(/Short Description:/g, '');
        itemDetailsObj.vendorBookingFlag = filteredData[rec.itemIndex + 23].str.replace(/Vendor Booking Flag =/g, '');
        itemDetailsObj.packMethod = filteredData[rec.itemIndex + 24].str.replace(/Pack Method:/g, '');

        // itemDetailsObj.contractualDeliveryDate = filteredData[rec.itemIndex + 12].str
        // itemDetailsObj.inboundPkg = filteredData[rec.itemIndex + 15].str
        // itemDetailsObj.incotermsPlace = filteredData[rec.itemIndex + 18].str
        // itemDetailsObj.handoverDate = filteredData[rec.itemIndex + 21].str
        // itemDetailsObj.mfgProcess = filteredData[rec.itemIndex + 24].str
        // itemDetailsObj.harbor = filteredData[rec.itemIndex + 27].str
        // itemDetailsObj.shipMode = filteredData[rec.itemIndex + 34].str
        // itemDetailsObj.model = filteredData[rec.itemIndex + 43].str
        // itemDetailsObj.productType = filteredData[rec.itemIndex + 46].str
        // itemDetailsObj.merchDivision = filteredData[rec.itemIndex + 49].str
        // itemDetailsObj.colorDescription = filteredData[rec.colorIndex + 2].str
        // itemDetailsObj.class = filteredData[rec.itemIndex + 56].str
        // itemDetailsObj.conceptShortDesc = filteredData[rec.itemIndex + 59].str
        // itemDetailsObj.fabricContent = filteredData[rec.itemIndex + 62].str
        // itemDetailsObj.board = filteredData[rec.itemIndex + 65].str
        // itemDetailsObj.fishWildlifeInd = filteredData[rec.itemIndex + 68].str
        // itemDetailsObj.gender = filteredData[rec.itemIndex + 73].str
        // itemDetailsObj.downFeatherInd = filteredData[rec.itemIndex + 76].str
        // itemDetailsObj.fabrication = filteredData[rec.itemIndex + 79].str

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
            itemVariantsObj.label = itemVarinatsTextArr[(count * l) + 1]
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
    poData.CentricpoItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}

