import { ApiProperty } from "@nestjs/swagger";


export class MaterialIssueRequest {
    @ApiProperty()
     sampleRequestId: number;
     @ApiProperty()
     GRNItemNumber: string;
     @ApiProperty()
     locationCode?: string;
}