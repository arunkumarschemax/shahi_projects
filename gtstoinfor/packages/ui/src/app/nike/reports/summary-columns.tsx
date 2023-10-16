import { CustomColumn } from "../../../components";

export const summaryColumns: CustomColumn<any>[] = [
    { title: 'Supplier Name', dataIndex: 'supplierName', key: 'supplierName', isDefaultSelect: true, },
    { title: 'Supplier Code', dataIndex: 'supplierCode', key: 'supplierCode', isDefaultSelect: true, },
    { title: 'Pack List Code', dataIndex: 'packingListCode', key: 'packingListCode', isDefaultSelect: true },
    {
        title: 'Pack List Date', dataIndex: 'packingListDate', key: 'packingListDate', isDefaultSelect: true
    }, {
        title: 'Expected Arrival', dataIndex: 'deliveryDate', key: 'expectedArrivalDate', isDefaultSelect: true,
    },
    { title: 'Pack List Quantity', dataIndex: 'totalQuantity', key: 'totalQuantity', isDefaultSelect: true, },
    { title: 'No of Lots', dataIndex: 'lotCount', key: 'lotCount', isDefaultSelect: true },
    { title: 'No of Rolls', dataIndex: 'rollCount', key: 'rollCount', isDefaultSelect: true },
    { title: 'Security Check In', dataIndex: 'securityCheckIn', key: 'securityCheckIn', isDefaultSelect: true, render: (value) => (value ? 'Yes' : 'No'), },
    {
        title: 'Security Check In At', dataIndex: 'securityCheckInAt', key: 'securityCheckInAt', isDefaultSelect: false,
    },
    {
        title: 'Security Check Out At', dataIndex: 'securityCheckOutAt', key: 'securityCheckOutAt', isDefaultSelect: false,
    },
    { title: 'Grn Status', dataIndex: 'grnStatus', key: 'grnStatus', isDefaultSelect: true },
    { title: 'Inspection Status', dataIndex: 'inspectionStatus', key: 'inspectionStatus', isDefaultSelect: false },
    { title: 'Vehicle Number', dataIndex: 'phVehicleNumber', key: 'phVehicleNumber', isDefaultSelect: true, },
    { title: 'Driver Name', dataIndex: 'driverName', key: 'driverName', isDefaultSelect: true, },
    { title: 'Driver Contact', dataIndex: 'driverContact', key: 'driverContact', isDefaultSelect: true, },
    { title: 'Vehicle Came In', dataIndex: 'vehicleCameIn', isDefaultSelect: true, key: 'vehicleCameIn', render: (value) => (value ? 'Yes' : 'No'), },
    {
        title: 'Unloading Start Time', dataIndex: 'unloadingStartTime', isDefaultSelect: false, key: 'unloadingStartTime',
    },
    {
        title: 'Unloading Completed Time', dataIndex: 'unloadingCompletedTime', isDefaultSelect: false, key: 'unloadingCompletedTime',
    },
]