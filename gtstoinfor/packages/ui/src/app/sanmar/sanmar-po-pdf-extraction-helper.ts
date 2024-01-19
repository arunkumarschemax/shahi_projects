import { CentricPoDetails, CentricPoItemDetails, CentricPoItemVariant, SanmarPoDetails,  SanmarPoItemDetails, SanmarPoItemVariant } from "@project-management-system/shared-models";
import { EMP_STR_EXP, FORMAT_SEPARATION_KEYWORD, FRIEGHT_PAY_METHOD, ITEM_NO_EXP,  ITEM_TEXT_END_TEXT, ITEM_TEXT_END_TEXT1, ITEM_VARIANT_START_TEXT,  MANUFACTURE_1, MANUFACTURE_2, PAYMENT_TERM_DESCRIPTION, PO_DOC_DATE_TXT, PO_NUMBER_INDEX, PO_NUMBER_TEXT, REFRENCE, SPECIAL_INSTRUCTIONS } from "./sanmar-popdf-regex-expressions";


/** 
 * @description this function takes @param pdf as parameter which will have all the raw text from the pdf that is extrcated by pdfjs lib. 
 * pdf data should be structured into a nested format which will have Po details >> PO Item details >> Po Item variant details. 
 * step 1 : Filter all the empty strings and unwanted texts from the raw data 
 * step 2 : PO data will present in the first page.so extract text only from the first page and pick the Po details data 
 * step 3 : Find all the items in the pdf using a regex expression ,match the item no text ex: (00010 ) using .then push 
 *   all the matched texts into an array.Now this array will contains all the items of the pdf 
 * ste 4 : Find the no of item variant lines and push them into item variant details. 
 * @param pdf  
 * @returns {SanmarPoDetails} 
 */
export const extractDataFromPoPdf = async (pdf) => {
    const poData = new SanmarPoDetails()
    const itemsArr: { itemIndex: number, amountIndex: number }[] = []
    const filteredData = []
    const itemDetailsArr: SanmarPoItemDetails[] = []
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
            poData.buyerPo = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX].str
            poData.poDate = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 1 ].str
            poData.buyerAddress = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 44].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 45].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 46].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 47].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 48].str;
            poData.buyerAddress = firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 44].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 45].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 46].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 47].str+" "+firstPageContent[poNumberTextIndex + PO_NUMBER_INDEX + 48].str;
    
            // let foundExitFactory = false;
            // let foundShipVia = false;
            // let shipToAddressIndex = '';
            // for (const ele of firstPageContent) {
            //     if (foundExitFactory && !foundShipVia) {
            //         if (ele.str.trim() === 'Ship Via:') {
            //             foundShipVia = true;
            //             break;
            //         }
            //         shipToAddressIndex += ele.str + '\n';
            //     }
            //     if (ele.str.trim() === 'Exit Factory By') {
            //         foundExitFactory = true;
            //     }
            // }
            // const shipToAdd = shipToAddressIndex.trim();
            // poData.shipToAdd = shipToAdd;

        }

        // po details parsing ends here  
        //------------------------------------------------------------------------------------------- 
        // data filtering satrts here 
        // filtering the pdf data i.e remove unnecessary data which is  not required for data parsing 
        let startFlag = false; // Initialize startFlag to false  
        let endFlag = false;   // Initialize endFlag to false 
        const pageContent = textContent.items.filter((val, index) => {
            if (val.str == 'Parent Partner ID') { startFlag = true; }
            if (endFlag) {
                startFlag = false;
                endFlag = false;
            }
            if (val.str == "Product Description") { endFlag = true; }
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
        const itemDetailsObj = new SanmarPoItemDetails();
        console.log(rec.itemIndex, "iiiiiiiiiiiiii");

        // itemDetailsObj.style = filteredData[rec.itemIndex - 4].str;
        itemDetailsObj.poStyle = filteredData[rec.itemIndex + 2].str;
        itemDetailsObj.deliveryDate = filteredData[rec.itemIndex + 9].str.replace(/\d+-\d+-\d+\s+\//g,"");

        itemTextEndIndex = rec.amountIndex;
        itemVariantStartIndex = itemTextEndIndex + 1;


        const itemVarinatsTextArr = [];
        let k = itemVariantStartIndex;
        
        while (!filteredData[k].str.includes(ITEM_TEXT_END_TEXT)) {
            itemVarinatsTextArr.push(filteredData[k].str);
            k++;
        }
        
        console.log(itemVarinatsTextArr, 'VVVVVVVv');
        
        const stringsWithLength13 = itemVarinatsTextArr.filter(value => value.includes('Ship Window Start Date'));
        const sizes = stringsWithLength13.length;
        const count = itemVarinatsTextArr.length / sizes;
        
        const itemVariantsArr = [];
        
        for (let l = 0; l < Math.floor(itemVarinatsTextArr.length / count); l++) {
            const itemVariantsObj = new SanmarPoItemVariant();
            const index = count * l;
        
            itemVariantsObj.size = itemVarinatsTextArr[index + count - 1];
            itemVariantsObj.color = itemVarinatsTextArr[index + count - 3];
            itemVariantsObj.unitPrice = itemVarinatsTextArr[index + count - 12];
            itemVariantsObj.quantity = itemVarinatsTextArr[index + count - 13];
       
        
            console.log(itemVariantsObj);
            itemVariantsArr.push(itemVariantsObj);
        }
        
        itemDetailsObj.SanmarpoItemVariantDetails = itemVariantsArr;
        itemDetailsArr.push(itemDetailsObj);
    }

    poData.SanmarpoItemDetails = itemDetailsArr
    console.log(poData)
    return poData
}

