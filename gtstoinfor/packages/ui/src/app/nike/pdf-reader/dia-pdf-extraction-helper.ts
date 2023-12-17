import { DiaPDFModel } from "@project-management-system/shared-models";
import { EMP_STR_EXP } from "./popdf-regex-expressions";

export const DiaPdfDataExtractor = async (pdf) => {
    const itemsArr: { itemNo: string, itemIndex: number }[] = []
    const filteredData = []
    const diaPDF: DiaPDFModel = new DiaPDFModel()

    for (let i = 1; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent: any = await page.getTextContent();
        //parsing  dia data 
        const pageContent = textContent.items.filter((val, index) => {
            return !(
                EMP_STR_EXP.test(val.str)
            )
        })
        filteredData.push(...pageContent)
    }

    let poNumberIndex;
    let cabCodeIndex;
    let shipToStartIndex;
    let shipToEndIndex
    for (const [index, rec] of filteredData.entries()) {
        if (rec.str.includes("Delivery Instructions:")) {
            poNumberIndex = index
        }
        if (rec.str.includes("CAB Code:")) {
            cabCodeIndex = index
        }
        if (rec.str.includes("Ship To Address:")) {
            shipToStartIndex = index
        }
        if (rec.str.includes("Notify Parties:")) {
            shipToEndIndex = index
        }
    }

    diaPDF.cabCode = filteredData[cabCodeIndex + 1].str
    const deliveryInstructionsStr = filteredData[poNumberIndex].str.split(":")[1];
    diaPDF.poNumber = deliveryInstructionsStr.split("-")[0].replace(/ /g, '')
    diaPDF.lineNo = deliveryInstructionsStr.split("-")[1].replace(/ /g, '')
    const addarr = filteredData.slice(shipToStartIndex, shipToEndIndex)
    diaPDF.shipToAddress = filteredData.slice(shipToStartIndex + 1, shipToEndIndex).map((a) => a.str).join(",")

    return diaPDF
}