/**
 * @description This function requires two parameters 
 */


interface M3toCustomObj {
    m3Key: string;
    yourKey: string;
}

interface MIRecord {
    RowIndex: number;
    NameValue: ({ Name: string; Value: number; } | { Name: string; Value: string; })[];
}


const construnctDataFromM3Result = (options: M3toCustomObj[], data: MIRecord[]) => {
    const resultArr = []
    for (const rec of data) {
        const resultObj: any = {}
        for (const opt of options) {
            const value: any = rec.NameValue.filter((val) => val.Name == opt.m3Key)
            resultObj[`${opt.yourKey}`] = value[0]?.Value
            resultArr.push(resultObj)
        }
    }
    return resultArr
}

export { construnctDataFromM3Result,MIRecord,M3toCustomObj }