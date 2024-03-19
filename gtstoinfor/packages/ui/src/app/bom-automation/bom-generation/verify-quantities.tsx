import { bomGenerationColumnsMapping } from '@project-management-system/shared-models'
import { Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    selectedData: any[],
    updatedData: any[],
    setDistinctValues : (values :{distinctStyles : string[],distinctItems : string[]})  => void
}

export default function VerifyQuantities(props: Props) {
    const { selectedData, updatedData } = props
    const [clubbedData, setClubbedData] = useState<any>([])

    useEffect(() => {
        clubQuantities()
    },[])

    function clubQuantities() {
        const clubbedData = [...selectedData].reduce((result, currentItem) => {
            // Generate a key based on item, styleNumber, and geoCode
            const key = `${currentItem.item.substring(0, 4)}_${currentItem.styleNumber}_${currentItem.geoCode}`;

            // Initialize the group if it doesn't exist yet
            if (!result[key]) {
                result[key] = {
                    item: currentItem.item.substring(0, 4),
                    styleNumber: currentItem.styleNumber,
                    geoCode: currentItem.geoCode,
                    Total: 0,  // Total sum of all sizes
                };
            }
            // result[key].total++;

            // Loop through each size key and add it to the grouped data if it doesn't exist
            Object.keys(currentItem).forEach(sizeKey => {
                if (!['id','poNumber', 'poLineItemNumber', 'poLine', 'item', 'styleNumber', 'planningSeasonCode', 'planningSeasonYear', 'geoCode', 'destinationCountryCode', 'genderAgeDesc', 'destinationCountry', 'plant','productCode','colorDesc'].includes(sizeKey)) {
                    // If the size key doesn't exist in the grouped data, initialize it to 0
                    if (!result[key].hasOwnProperty(sizeKey)) {
                        result[key][sizeKey] = 0;
                    }
                    // Increment the quantity for the current size
                    result[key][sizeKey] += parseInt(currentItem[sizeKey] || 0, 10);
                    result[key].Total += parseInt(currentItem[sizeKey] || 0, 10);
                }
            });

            return result;
        }, {});
        setClubbedData(Object.values(clubbedData))
        const distinctStyles = [...new Set(selectedData.map(item => item.styleNumber))]
        const distinctItems =  [...new Set(selectedData.map(item => item.item))]
        props.setDistinctValues({
            distinctStyles: distinctStyles,
            distinctItems: distinctItems,
        });

    }
    // console.log(clubbedData,selectedData)

    function renderColumns(): any {

        if (clubbedData.length)
            return Object.keys(clubbedData[0]).map((key) => {
                return {
                    title: bomGenerationColumnsMapping[key] ? bomGenerationColumnsMapping[key] : key,
                    dataIndex: key,
                    width: '100px',
                    key,
                }
            }
            );

        return undefined
    }
    return (
        <Card title={'Quantities break up'} >
            <Table  scroll={{ x: 'max-content', y: 450 }} pagination={false} columns={renderColumns()} dataSource={clubbedData} />
        </Card>
    )
}
