import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Matches, MaxLength } from "class-validator";

export class BomTrimDto {
    @ApiProperty()
    bomTrimId:number;

    @ApiProperty()
    trimCode :string;

    @ApiProperty()
    trim :string;

    @ApiProperty()
    genericCode: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    group:string;

    @ApiProperty()
    useInOperation :string;

    @ApiProperty()
    description : string;

    @ApiProperty()
    responsible : string;

    @ApiProperty()
    developmentResponsible:string;

    @ApiProperty()
    basicUom: string;

    @ApiProperty()
    alternateUom: string;

    @ApiProperty()
    factor : string;

    @ApiProperty()
    orderMultipleBuom: string;

    @ApiProperty()
    moq: string;

    @ApiProperty()
    orderMultipleAuom: string;

    @ApiProperty()
    currency : string;

    @ApiProperty()
    price : string;

    @ApiProperty()
    purchasePriceQuantity : string;
    
    @ApiProperty()
    salesTax : string;
     
    @ApiProperty()
    exciseDuty : string;

    @ApiProperty()
    licence : string;

    @ApiProperty()
    property : string;

    @ApiProperty()
    isSaleItem : string;

    @ApiProperty()
    consumption : string;

    @ApiProperty()
    wastagePercentage : string;

    @ApiProperty()
    costGroup : string;

    @ApiProperty()
    usageRemarks: string;

    @ApiProperty()
    isActive: boolean;

    createdAt : Date;

  @ApiProperty()
  @IsOptional()
  @MaxLength(40, { message: "Created User allows maximum 40 characters" })
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "created user should be only numbers" })
  createdUser : string;

  updatedAt : Date;
  @ApiProperty()
  @IsOptional()
  @MaxLength(40, { message: "Updated User allows maximum 40 characters"})
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "updated user should be only numbers" })
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;


}
