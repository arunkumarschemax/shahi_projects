import { ItemEnum } from "../../enum";

export class ContentDtos {
    contentId?: number;
    content: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
    itemType?: any
}

export const ContentDtoDefault : ContentDtos = {
    contentId: 0,
    content: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1,
    itemType: ''
};