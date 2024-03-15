import { UOMEnum } from "@project-management-system/shared-models";


export function convertDimensions(fromUOM: UOMEnum, toUOM: UOMEnum, value: number): number {
    if (fromUOM === toUOM) {
        return value;
    }

    // Convert value to meters as an intermediate step
    let valueInMeters: number;
    switch (fromUOM) {
        case UOMEnum.METER:
            valueInMeters = value;
            break;
        case UOMEnum.CM:
            valueInMeters = value / 100;
            break;
        case UOMEnum.MM:
            valueInMeters = value / 1000;
            break;
        case UOMEnum.INCH:
            valueInMeters = value * 0.0254;
            break;
        case UOMEnum.YARD:
            valueInMeters = value * 0.9144;
            break;
        default:
            throw new Error('Unsupported unit of measure');
    }

    // Convert from meters to the target unit
    switch (toUOM) {
        case UOMEnum.METER:
            return parseFloat(valueInMeters.toFixed(2));
        case UOMEnum.CM:
            return parseFloat((valueInMeters * 100).toFixed(2));
        case UOMEnum.MM:
            return parseFloat((valueInMeters * 1000).toFixed(2));
        case UOMEnum.INCH:
            return parseFloat((valueInMeters / 0.0254).toFixed(2));
        case UOMEnum.YARD:
            return parseFloat((valueInMeters / 0.9144).toFixed(2));
        default:
            throw new Error('Unsupported unit of measure');
    }
}
