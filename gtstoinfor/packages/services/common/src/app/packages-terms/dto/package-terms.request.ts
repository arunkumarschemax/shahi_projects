import { ApiProperty } from '@nestjs/swagger';

export class PackageTermsRequest {
    @ApiProperty()
    packageTermsId: number;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;

    @ApiProperty()
    isActive: boolean;
}