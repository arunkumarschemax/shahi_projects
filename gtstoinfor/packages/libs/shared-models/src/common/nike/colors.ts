import { Sizes } from "./sizes";

export class Colors {

    name?: string;
    sizes?: Sizes[];

    constructor(
        name?: string, sizes?: Sizes[]
    ) {
        this.name = name;
        this.sizes = sizes;
    }
}
