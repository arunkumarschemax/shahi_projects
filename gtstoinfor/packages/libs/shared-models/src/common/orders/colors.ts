import { COLineSizes } from "./sizes";

export class COLineColors {

    name?: string;
    sizes?: COLineSizes[];

    constructor(
        name?: string, sizes?: COLineSizes[]
    ) {
        this.name = name;
        this.sizes = sizes;
    }
}
