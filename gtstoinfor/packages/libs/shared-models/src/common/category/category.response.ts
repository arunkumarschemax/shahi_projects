import { GlobalResponseObject } from "../global-response-object";
import { CategoryModel } from "./category-model";


export class CategoryResponseModel extends GlobalResponseObject {
    data?: CategoryModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CategoryModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

