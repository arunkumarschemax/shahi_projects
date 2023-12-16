
export class FabricContentDto {
    fabricContentId: number;
    contentId: string;
    percentage: number;
    createdUser: string | null;
    updatedUser: string | null;
    createdAt: string;
    updatedAt: string;
    versionFlag: number;

    constructor(
        fabricContentId: number,
        contentId: string,
        percentage: number,
        createdUser: string | null,
        updatedUser: string | null,
        createdAt: string,
        updatedAt: string,
        versionFlag: number,
    ){
        this.fabricContentId = fabricContentId
        this.contentId = contentId
        this.percentage = percentage
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.versionFlag = versionFlag
    }


}

