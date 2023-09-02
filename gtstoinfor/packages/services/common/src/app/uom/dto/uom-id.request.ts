
// this is the request from the source

import { ApiProperty } from "@nestjs/swagger";
import { CommonRequestAttrs } from "@project-management-system/shared-models";
// import { CommonRequestAttrs } from "../../common/common-request-attr.model";

// WARNING: THIS CLASS SHOULD EXACTLY BE THE SAME AS IN THE MODELS FOLDER OF THE BACKEND.

export class UomIdRequest extends CommonRequestAttrs {
    @ApiProperty()
    uomId: number;
    @ApiProperty()
    versionFlag?: number;

    constructor(username: string,  uomId: number,  versionFlag?: number) {
        super(username);
        this.uomId = uomId;
        this.versionFlag = versionFlag;

    }
}