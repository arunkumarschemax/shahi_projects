import { MaterialStatusEnum } from "@project-management-system/shared-models";
import { ApiProperty } from "@nestjs/swagger";
import { MaterialAllocationItemsDTO } from "./material-allocation-items-dto";


export class MaterialAllocationDTO {
     @ApiProperty()
     materialAllocationId: number;

     @ApiProperty()
     itemType: string;

     @ApiProperty()
     sampleOrderId: number

     @ApiProperty()
     sampleItemId: number

     @ApiProperty()
      m3ItemId: number

     @ApiProperty()
     status: MaterialStatusEnum;

     @ApiProperty()
     createdUser: string | null;

     @ApiProperty()
     quantity: number;
     
     @ApiProperty()
     issuedQty:number;

     @ApiProperty()
      stockId: number

     @ApiProperty()
     LocationId: number
     
     @ApiProperty()  
     buyerId:number

     @ApiProperty()
     allocatioQuantity: number

     @ApiProperty()
     checkedStatus:number
     @ApiProperty()
     allocatedItems:MaterialAllocationItemsDTO[]
     @ApiProperty()
     samplingBomId?:number

     @ApiProperty()
     toBeProcured?:number

}