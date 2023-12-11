import { MaterialStatusEnum } from "@project-management-system/shared-models";
import { ApiProperty } from "@nestjs/swagger";


export class AllLocationRequest {
     @ApiProperty()
     sampleRequestItemId?: number;
     
}