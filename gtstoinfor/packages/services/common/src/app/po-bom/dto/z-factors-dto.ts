import { ApiProperty } from "@nestjs/swagger";

export class ZFactorsBomDto {
    @ApiProperty()
    id:number

    @ApiProperty()
    itemName:string
    
    @ApiProperty()
    imCode:string


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
    isActive: boolean;
  
    @ApiProperty()
    createdAt : string;
  
    @ApiProperty()
    createdUser : string;
    
      @ApiProperty()
    updatedAt : string;
    @ApiProperty()
    updatedUser : string;
  
    @ApiProperty()
    versionFlag : number;
    
    Zfactordto: any;

    // constructor(
    //     id:number,
    //     itemName:string,
    //     imCode:string,
    //     geoCode:string,
    //     destination:string,
    //     size:string,
    //     gender:string,
    //     plant:string,
    //     style:string,
    //     sequence:number,
    //     createdUser?: string | null
    // ){
    //     this.id=id
    //     this.itemName=itemName
    //     this.imCode=imCode
    //     this.geoCode=geoCode
    //     this.destination=destination
    //     this.size=size
    //     this.gender=gender
    //     this.style=style
    //     this.plant=plant
    //     this.sequence=sequence
    //     this.createdUser=createdUser
    // }


}