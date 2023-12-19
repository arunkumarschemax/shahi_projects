
export class FabricContentDto {
    fabricContentId: number;
    content: string;
    percentage: number;
    createdUser?: string | null;
    updatedUser?: string | null;
    createdAt?: string;
    updatedAt?: string;
    versionFlag?: number;

    constructor(
        fabricContentId: number,
        content: string,
        percentage: number,
        createdUser?: string | null,
        updatedUser?: string | null,
        createdAt?: string,
        updatedAt?: string,
        versionFlag?: number,
    ){
        this.fabricContentId = fabricContentId
        this.content = content
        this.percentage = percentage
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.versionFlag = versionFlag
    }


}

