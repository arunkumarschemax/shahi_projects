import { MaterialStatusEnum } from "@project-management-system/shared-models";
import { ApiProperty } from "@nestjs/swagger";


export class AllocatedLocationRequest {
     @ApiProperty()
     sampleRequestItemId: number;
     @ApiProperty()
     action: string;
     @ApiProperty()
     type?: string;
}