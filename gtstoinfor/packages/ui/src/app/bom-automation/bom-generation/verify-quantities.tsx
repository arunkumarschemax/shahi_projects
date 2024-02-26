import { bomGenerationColumnsMapping } from '@project-management-system/shared-models'
import { Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    selectedData: any[],
    updatedData: any[]
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
            const key = `${currentItem.item}_${currentItem.styleNumber}_${currentItem.geoCode}`;

            // Initialize the group if it doesn't exist yet
            if (!result[key]) {
                result[key] = {
                    item: currentItem.item,
                    styleNumber: currentItem.styleNumber,
                    geoCode: currentItem.geoCode,
                    total: 0,  // Total sum of all sizes
                };
            }
            // result[key].total++;

            // Loop through each size key and add it to the grouped data if it doesn't exist
            Object.keys(currentItem).forEach(sizeKey => {
                if (!['poNumber', 'poLineItemNumber', 'poLine', 'item', 'styleNumber', 'planningSeasonCode', 'planningSeasonYear', 'geoCode', 'destinationCountryCode', 'genderAgeDesc', 'destinationCountry', 'plant'].includes(sizeKey)) {
                    // If the size key doesn't exist in the grouped data, initialize it to 0
                    if (!result[key].hasOwnProperty(sizeKey)) {
                        result[key][sizeKey] = 0;
                    }
                    // Increment the quantity for the current size
                    result[key][sizeKey] += parseInt(currentItem[sizeKey] || 0, 10);
                    result[key].total += parseInt(currentItem[sizeKey] || 0, 10);
                }
            });

            return result;
        }, {});
        setClubbedData(Object.values(clubbedData))
    }

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
            <Table pagination={false} columns={renderColumns()} dataSource={clubbedData} />
        </Card>
    )
}
