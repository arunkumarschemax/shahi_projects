import { ApiProperty } from "@nestjs/swagger";

export class UserRequestDto {
    @ApiProperty()
    createdUser: string;
}