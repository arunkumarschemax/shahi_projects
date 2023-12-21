import { CustomColumn } from "../../../components";
const { diff_match_patch: DiffMatchPatch } = require('diff-match-patch');

export const summaryColumns: CustomColumn<any>[] = [
    { title: 'Po+Line ', dataIndex: 'poAndLine', key: 'poAndLine', isDefaultSelect: true },
    { title: 'Last Modified Date', dataIndex: 'lastModifiedDate', key: 'lastModifiedDate', isDefaultSelect: true },
    { title: 'Item', dataIndex: 'item', key: 'item', isDefaultSelect: true },
    { title: 'Factory', dataIndex: 'Factory', key: 'Factory', isDefaultSelect: true },
    { title: 'PCD', dataIndex: 'PCD', key: 'PCD', isDefaultSelect: true },
    { title: 'Document Date', dataIndex: 'documentDate', key: 'documentDate', isDefaultSelect: true },
    { title: 'Purchase Order Number', dataIndex: 'purchase Order Number', key: 'Purchase Order Number', isDefaultSelect: true },
    { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber', key: 'poLineItemNumber', isDefaultSelect: true },
    { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus', key: 'DPOMLineItemStatus', isDefaultSelect: true },
    { title: 'DocType', dataIndex: 'docTypeCode', key: 'deocTypeCode', isDefaultSelect: true },
    { title: 'DocType Description', dataIndex: 'docTypeDesc', key: 'deocTypeDesc', isDefaultSelect: true },
    { title: 'Style Number', dataIndex: 'styleNumber', key: 'styleNumber', isDefaultSelect: true },
    { title: 'Product Code', dataIndex: 'productCode', key: 'productCode', isDefaultSelect: true },
    { title: 'Colour Description', dataIndex: 'colorDesc', key: 'colorDesc', isDefaultSelect: true },
    { title: 'Description With Fabric Content', dataIndex: 'fabricContent', key: 'fabricContent', isDefaultSelect: true },
    { title: 'Fabric Content as Per Washcare Label', dataIndex: '', key: 'fabricContentAsPer', isDefaultSelect: true },
    { title: 'Planning Season Code', dataIndex: 'planningSeasonCode', key: 'planningSeasonCode', isDefaultSelect: true },
    { title: 'Planning Season Year', dataIndex: 'planningSeasonYear', key: 'planningSeasonYear', isDefaultSelect: true },
    { title: 'Co', dataIndex: 'customerOrder', key: 'customerOrder', isDefaultSelect: true },
    { title: 'CO Final Approval Date', dataIndex: 'coFinalApprovalDate', key: 'coFinalApprovalDate', isDefaultSelect: true },
    { title: 'Plan No', dataIndex: 'planNo', key: 'planNo', isDefaultSelect: true },
    { title: 'Lead Time', dataIndex: 'leadTime', key: 'leadTime', isDefaultSelect: true },
    { title: 'Category', dataIndex: 'categoryCode', key: 'categoryCode', isDefaultSelect: true },
    { title: 'Category Description', dataIndex: 'categoryDesc', key: 'categoryDesc', isDefaultSelect: true },
    { title: 'Vendor Code', dataIndex: 'vendorCode', key: 'vendorCode', isDefaultSelect: true },
    { title: 'Global Category Core Focus', dataIndex: 'gccFocusCode', key: 'gccFocusCode', isDefaultSelect: true },
    { title: 'Global Category Core Focus Description', dataIndex: 'gccFocusDesc', key: 'gccFocusDesc', isDefaultSelect: true },
    { title: 'Gender Age', dataIndex: 'genderAgeCode', key: 'genderAgeCode', isDefaultSelect: true },
    { title: 'Gender Age Description', dataIndex: 'genderAgeDesc', key: 'genderAgeDesc', isDefaultSelect: true },
    { title: 'Destination Country Code', dataIndex: 'destinationCountryCode', key: 'destinationCountryCode', isDefaultSelect: true },
    { title: 'Destination Country Name', dataIndex: 'destinationCountry', key: 'destinationCountry', isDefaultSelect: true },
    { title: 'Geo Code', dataIndex: 'geoCode', key: 'geoCode', isDefaultSelect: true },
    { title: 'Plant Code', dataIndex: 'plant', key: 'plant', isDefaultSelect: true },
    { title: 'plant Name', dataIndex: 'plantName', key: 'plantName', isDefaultSelect: true },
    { title: 'UPC', dataIndex: 'UPC', key: 'UPC', isDefaultSelect: true },
    { title: 'Sales Order Number', dataIndex: 'directShipSONumber', key: 'directShipSONumber', isDefaultSelect: true },
    { title: 'Sales Order Item Number', dataIndex: 'directShipSOItemNumber', key: 'directShipSOItemNumber', isDefaultSelect: true },
    { title: 'Customer PO', dataIndex: 'customerPO', key: 'customerPO', isDefaultSelect: true },
    { title: 'Ship To Customer Number', dataIndex: 'shipToCustomerNumber', key: 'shipToCustomerNumber', isDefaultSelect: true },
    { title: 'Ship To Customer Name', dataIndex: 'shipToCustomerName', key: 'shipToCustomerName', isDefaultSelect: true },
    { title: 'Ship to Address Legal PO', dataIndex: 'shipToAddressLegalPO', key: 'shipToAddressLegalPO', isDefaultSelect: true },
    { title: 'Ship to Address DIA', dataIndex: 'shipToAddressDIA', key: 'shipToAddressDIA', isDefaultSelect: true },
    {
        title: 'Diff of Ship to Address', dataIndex: '', key: 'diffOfShipToAddress', isDefaultSelect: true,
        render: (text, record) => {
            const lines1 = (record.shipToAddressLegalPO)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            const text1 = lines1?.join('');

            const lines2 = (record.shipToAddressDIA)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            const text2 = lines2?.join('');
            if (text1 == null && text2 == null) {
                return '-'
            } else {
                const dmp = new DiffMatchPatch();
                const diff = dmp.diff_main(text1, text2);
                dmp.diff_cleanupSemantic(diff);

                let output = '';
                for (const [op, text] of diff) {
                    if (op === DiffMatchPatch.DIFF_INSERT) {
                        if (text.trim() !== '') {
                            output += `${text} `;
                        }
                    } else if (op === DiffMatchPatch.DIFF_DELETE) {
                        if (text.trim() !== '') {
                            output += `${text} `;
                        }
                    }
                }
                return output.trim()
            }
        },
    },
    { title: 'CAB Code', dataIndex: 'CABCode', key: 'CABCode', isDefaultSelect: true },
    { title: 'Final Destination', dataIndex: '', key: 'FinalDestination', isDefaultSelect: true },
    { title: 'MRGAC', dataIndex: 'MRGAC', key: 'MRGAC', isDefaultSelect: true },
    { title: 'OGAC', dataIndex: 'OGAC', key: 'OGAC', isDefaultSelect: true },
    { title: 'GAC', dataIndex: 'GAC', key: 'GAC', isDefaultSelect: true },
    { title: 'GAC Reason Code', dataIndex: 'GACReasonCode', key: 'GACReasonCode', isDefaultSelect: true },
    { title: 'GAC Reason Description', dataIndex: 'GACReasonDesc', key: 'GACReasonDescription', isDefaultSelect: true },
    { title: 'Truck Out Date', dataIndex: 'truckOutDate', key: 'truckOutDate', isDefaultSelect: true },
    { title: 'Origin Receipt Date', dataIndex: 'originReceiptDate', key: 'originReceiptDate', isDefaultSelect: true },
    { title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate', key: 'factoryDeliveryActDate', isDefaultSelect: true },
    { title: 'Shipping Type', dataIndex: 'shippingType', key: 'shippingType', isDefaultSelect: true },
    { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode', key: 'planningPriorityCode', isDefaultSelect: true },
    { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc', key: 'planningPriorityDescription', isDefaultSelect: true },
    { title: 'Launch Code', dataIndex: '"launchCode', key: 'launchCode', isDefaultSelect: true },
    { title: 'Mode of Transportation', dataIndex: 'modeOfTransportationCode', key: 'modeOfTransportationCode', isDefaultSelect: true },
    { title: 'In Co Terms', dataIndex: 'inCoTerms', key: 'inCoTerms', isDefaultSelect: true },
    { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode', key: 'inventorySegmentCode', isDefaultSelect: true },
    { title: 'Purchase Group', dataIndex: 'purchaseGroupCode', key: 'purchaseGroupCode', isDefaultSelect: true },
    { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName', key: 'purchaseGroupName', isDefaultSelect: true },
    { title: 'Total Item Quantity', dataIndex: 'totalItemQty', key: 'totalItemQty', isDefaultSelect: true },
]

// sizeHeaders?.forEach(version => {
//     summaryColumns.push({
//         title: version,
//         dataIndex: '',
//         width: 130,
//         align: 'center',
//         children: [
//             {
//                 title: 'Quantity',
//                 dataIndex: '',
//                 align: 'right',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             const formattedQty = Number(sizeData.sizeQty).toLocaleString('en-IN', { maximumFractionDigits: 0 });
//                             return (
//                                 formattedQty
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Gross/FOB Price',
//                 dataIndex: 'grossFobPrice',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.grossFobPrice
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Gross/FOB currency ',
//                 dataIndex: 'grossFobCurrencyCode',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.grossFobCurrencyCode
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Buyer Confirmed Gross/FOB Price',
//                 dataIndex: 'buyerGrossFobPrice',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.buyerGrossFobPrice
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Buyer Confirmed Gross/FOB Currency',
//                 dataIndex: 'buyerGrossFobCurrencyCode',

//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.buyerGrossFobCurrencyCode
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Diff of Price',
//                 dataIndex: '',
//             },
//             {
//                 title: 'Diff of Price Currency',
//                 dataIndex: '',
//             },
//             {
//                 title: 'Net including discounts',
//                 dataIndex: 'netIncludingDisc',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.netIncludingDisc
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Net including discounts Currency ',
//                 dataIndex: 'netIncludingDiscCurrencyCode',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.netIncludingDiscCurrencyCode
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Trading Co Net including discounts',
//                 dataIndex: 'trConetIncludingDisc',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.trConetIncludingDisc
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Trading Co Net including discounts currency',
//                 dataIndex: 'trConetIncludingDiscCurrencyCode',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.trConetIncludingDiscCurrencyCode
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Legal PO Price',
//                 dataIndex: 'legalPoPrice',
//                 width: 60,
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.legalPoPrice
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Legal PO currency',
//                 dataIndex: 'legalPoCurrencyCode',
//                 width: 60,
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.legalPoCurrencyCode
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'CO Price',
//                 dataIndex: 'coPrice',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.coPrice
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'CO Price currency',
//                 dataIndex: 'coPriceCurrencyCode',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.coPriceCurrencyCode
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Diff of Price',
//                 dataIndex: '',
//             },
//             {
//                 title: 'Diff of Price currency',
//                 dataIndex: '',
//             },
//             {
//                 title: 'CRM CO QTY',
//                 dataIndex: 'CRMCoQty',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.CRMCoQty
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Legal PO QTY',
//                 dataIndex: 'legalPoQty',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.legalPoQty
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Diff of Quantity',
//                 dataIndex: '',
//             },
//             {
//                 title: 'Allowed Excess Ship Qty',
//                 dataIndex: '',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             if (record.shippingType === 'DIRECT') {
//                                 return (
//                                     '0'
//                                 );
//                             } else {
//                                 const sizeQty = sizeData.sizeQty;
//                                 const result = 0.03 * sizeQty;
//                                 return (
//                                     result.toFixed(3)
//                                 );
//                             }
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Actual Shipped Qty',
//                 dataIndex: 'actualShippedQty',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.actualShippedQty
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//             {
//                 title: 'Actual Ship %',
//                 dataIndex: '',
//                 render: (text, record) => {
//                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

//                     if (sizeData) {
//                         if (sizeData.sizeQty !== null) {
//                             return (
//                                 sizeData.grossFobPrice
//                             );
//                         } else {
//                             return (
//                                 '-'
//                             );
//                         }
//                     } else {
//                         return '-';
//                     }
//                 }
//             },
//         ],
//     });
// })

// summaryColumns.push(
//   {
//     title: 'Trading Co PO Number',
//     dataIndex: 'tradingCoPoNumber',
//     render: (text, record) => {
//       if (!text || text.trim() === '') {
//         return '-';
//       } else {
//         return text;
//       }
//     },
//   },
//   {
//     title: 'VAS - Size',
//     dataIndex: 'VASSize',
//     render: (text, record) => {
//       if (!text || text.trim() === '') {
//         return '-';
//       } else {
//         return text;
//       }
//     },
//   },
//   {
//     title: 'Item Vas Text',
//     dataIndex: 'itemVasText',
//     render: (text, record) => {
//       if (!text || text.trim() === '') {
//         return '-';
//       } else {
//         return text;
//       }
//     },
//   },
//   {
//     title: 'Item Vas Text in PDF PO',
//     dataIndex: 'itemVasTextPDF',
//     render: (text, record) => {
//       if (!text || text.trim() === '') {
//         return '-';
//       } else {
//         return text;
//       }
//     },
//   },
//   {
//     title: 'Diff of Item Vas Text',
//     dataIndex: '',
//     render: (text, record) => {
//       const lines1 = (record.itemVasText)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
//       const text1 = lines1?.join('');

//       const lines2 = (record.itemVasTextPDF)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
//       const text2 = lines2?.join('');
//       if (text1 == null && text2 == null) {
//         return '-'
//       } else if (text1 == null) {
//         return text2;
//       } else if (text2 == null) {
//         return text1;
//       } else {
//         const dmp = new DiffMatchPatch();
//         const diff = dmp.diff_main(text1, text2);
//         dmp.diff_cleanupSemantic(diff);

//         let output = '';
//         for (const [op, text] of diff) {
//           if (op === DiffMatchPatch.DIFF_INSERT) {
//             if (text.trim() !== '') {
//               output += `${text} `;
//             }
//           } else if (op === DiffMatchPatch.DIFF_DELETE) {
//             if (text.trim() !== '') {
//               output += `${text} `;
//             }
//           }
//         }
//         return output.trim()
//       }
//     },
//   },
//   {
//     title: 'Item Text',
//     dataIndex: 'itemText',
//     render: (text, record) => {
//       if (!text || text.trim() === '') {
//         return '-';
//       } else {
//         return text;
//       }
//     },
//   },
//   {
//     title: 'Hanger PO',
//     dataIndex: 'hanger',
//     render: (text, record) => {
//       if (!text || text.trim() === '') {
//         return '-';
//       } else {
//         return text;
//       }
//     },
//   },
//   {
//     title: 'Change Register',
//     dataIndex: 'displayName',
//     align: 'center',
//     render: (text, record) => {
//       if (!text || text.trim() === '') {
//         return '-';
//       } else {
//         return text;
//       }
//     },
//   },
// )