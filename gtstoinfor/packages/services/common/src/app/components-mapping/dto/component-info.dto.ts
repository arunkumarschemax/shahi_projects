import { ApiProperty } from "@nestjs/swagger";

export class ComponentInfoDto{
    @ApiProperty()
    componentId: number;

    @ApiProperty()
    componentName: string;
}