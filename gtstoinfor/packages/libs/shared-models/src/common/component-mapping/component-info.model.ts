export class ComponentInfoModel{
    componentId: number;
    componentName?: string;

    constructor(componentId: number,componentName?: string){
        this.componentId = componentId;
        this.componentName = componentName;
    }

}