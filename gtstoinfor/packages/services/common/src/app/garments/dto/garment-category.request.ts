import { ApiProperty } from '@nestjs/swagger';

export class GarmentsCategoryRequest {
    @ApiProperty()
    garmentCategoryId: number;
    
    @ApiProperty()
    garmentCategory: string;

    @ApiProperty()
    isActive?: boolean;
}