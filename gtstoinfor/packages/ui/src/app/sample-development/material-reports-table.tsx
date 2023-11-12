import { MaterialIssueReportsDto } from '@project-management-system/shared-models'
import moment from 'moment';
import React from 'react'





const MaterialReportstable = (props: { data: MaterialIssueReportsDto[] }) => {

    const { data } = props;


    // Call the function to generate the table


    return <>

        <table className='custom-tbl th,.custom-tbl td '>
            <thead >
                <tr  >
                    <th>SL NO</th>
                    <th>Consumption Code</th>
                    <th>M3 Style No</th>
                    <th>Sample Type</th>
                    <th>Pch</th>
                    <th>Location</th>
                    <th>Style</th>
                    <th>Buyer</th>
                    <th>Issued Date</th>
                    <th>Material Type</th>
                    <th>Material Code</th>
                    <th>Color</th>
                    <th>Consumption</th>
                    <th>Material Status</th>
                    {/* <th>ID</th> */}
                </tr>
                {data.map((rec, index) => {
                    return <tr>
                        <td>{index + 1}</td>
                        <td>
                            {rec.consumptionCode}
                        </td>
                        <td>
                            {rec.m3StyleNo}
                        </td>
                        <td>
                            {rec.sampleType}
                        </td>
                        <td>
                            {rec.pch}
                        </td>
                        <td>
                            {rec.location}
                        </td>
                        <td>
                            {rec.style}
                        </td>
                        <td>
                            {rec.buyer}
                        </td>

                        <td>
                            {moment(rec.issuedDate).format('YYYY-MM-DD')}
                        </td>
                        <td colSpan={rec.fabricData.length} >
                            {rec.fabricData.map((tr) => {
                                return <tr>
                                    <td>
                                        {tr?.productName ? tr?.productName : "-"
                                        }
                                    </td>

                                </tr>
                            })}

                            <td colSpan={rec.trimData.length}>
                                {rec.trimData.map((tr) => {
                                    return <tr>
                                        <td>
                                            {tr?.productName ? tr?.productName : "-"
                                            }
                                        </td>

                                    </tr>
                                })}


                            </td>

                        </td>
                        <td colSpan={rec.fabricData.length} >
                            {rec.fabricData.map((tr) => {
                                return <tr>
                                    <td>
                                        {tr?.itemCode ? tr?.itemCode : "-"
                                        }
                                    </td>

                                </tr>
                            })}

                            <td colSpan={rec.trimData.length}>
                                {rec.trimData.map((tr) => {
                                    return <tr>
                                        <td>
                                            {tr?.itemCode ? tr?.itemCode : "-"
                                            }
                                        </td>

                                    </tr>
                                })}


                            </td>
                        </td>
                        <td colSpan={rec.fabricData.length} >
                            {rec.fabricData.map((tr) => {
                                return <tr>
                                    <td>
                                        {tr?.color ? tr?.color : "-"
                                        }
                                    </td>

                                </tr>
                            })}

                            <td colSpan={rec.trimData.length}>
                                {rec.trimData.map((tr) => {
                                    return <tr>
                                        <td>
                                            {tr?.color ? tr?.color : "-"
                                            }
                                        </td>

                                    </tr>
                                })}


                            </td>
                        </td>
                        <td colSpan={rec.fabricData.length} >
                            {rec.fabricData.map((tr) => {
                                return <tr>
                                    <td>
                                        {tr?.consumption ? tr?.consumption : "-"
                                        }
                                    </td>

                                </tr>
                            })}


                            <td colSpan={rec.trimData.length}>
                                {rec.trimData.map((tr) => {
                                    return <tr>
                                        <td>
                                            {tr?.color ? tr?.color : "-"
                                            }
                                        </td>

                                    </tr>
                                })}


                            </td>


                        </td>
                        {/* <td>
                            {rec.}
                        </td> */}
                    </tr>
                })}
            </thead>

        </table>





    </>


}

export default MaterialReportstable