import { Colors } from "./colors";

export class Destinations {

    name?: string;
    colors?: Colors[];

    constructor(
        name?: string, colors?: Colors[]
    ) {
        this.name = name;
        this.colors = colors;
    }

}
