import { ComponentInfoDto } from "./component-info.dto";

export class ComponentMappingDto{
    componentMappingId: number;

    styleId: number;
    style?:string;

    garmentCategoryId: number;
    garmentCategory ?: string;

    garmentId: number;
    garment?: string;

    componentDeatils: ComponentInfoDto[];
}