import { IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ItemsDTO {
  @ApiProperty()
  @IsNotEmpty({message:"itemId should not be empty"})
  @IsOptional()
  itemId: number;

  @ApiProperty()
  @IsNotEmpty({message:"item should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  item: string;

  @ApiProperty()
  @IsNotEmpty({message:"consumptionrequired should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  consumptionrequired: string;

  @ApiProperty()
  @IsNotEmpty({message:"consumption should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  consumption: string;

  @ApiProperty()
  @IsNotEmpty({message:"wastage should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  wastage: string;

  @ApiProperty()
  @IsNotEmpty({message:"moq should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  moq: string;

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

