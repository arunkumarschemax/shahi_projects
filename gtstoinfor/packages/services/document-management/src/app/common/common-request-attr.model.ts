import { ApiProperty } from "@nestjs/swagger";

export class CommonRequestAttrs {
    
    @ApiProperty()
    username: string;

    constructor(username: string) {
        this.username = username;
    }
}