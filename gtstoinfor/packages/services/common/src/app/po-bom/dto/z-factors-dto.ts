import { ApiProperty } from "@nestjs/swagger";

export class zFactorsDto {
    @ApiProperty()
    id:number

    @ApiProperty()
    itemName:string
    
    @ApiProperty()
    imCode:string

    @ApiProperty()
    action:string

    @ApiProperty()
    geoCode:string

    @ApiProperty()
    destination:string

    @ApiProperty()
    size:string

    @ApiProperty()
    gender:string

    @ApiProperty()
    plant:string

    @ApiProperty()
    style:string

    @ApiProperty()
    sequence:number

    @ApiProperty()
    createdUser: string | null;
    
    Zfactordto: any;

    constructor(
        id:number,
        itemName:string,
        action:string,
        imCode:string,
        geoCode:string,
        destination:string,
        size:string,
        gender:string,
        plant:string,
        style:string,
        sequence:number,
        createdUser?: string | null
    ){
        this.id=id
        this.itemName=itemName
        this.imCode=imCode
        this.action=action
        this.geoCode=geoCode
        this.destination=destination
        this.size=size
        this.gender=gender
        this.style=style
        this.plant=plant
        this.sequence=sequence
        this.createdUser=createdUser
    }


}