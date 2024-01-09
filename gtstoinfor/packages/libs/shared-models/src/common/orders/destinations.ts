import { COLineColors } from "./colors";

export class COLineDestinations {

    name?: string;
    colors?: COLineColors[];

    constructor(
        name?: string, colors?: COLineColors[]
    ) {
        this.name = name;
        this.colors = colors;
    }

}
