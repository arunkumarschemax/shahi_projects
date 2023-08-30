// import { Injectable } from "@nestjs/common";
// import { OperationGroups } from "../../operation-groups/operation-groups.entity";
// import { BuyersDestinationDTO } from "./buyers-destination.dto";
// import { BuyersDestionations } from "../buyers-destination.entity";
// import { Size } from "../../sizes/sizes-entity";
// import { Destination } from "../../destination/destination.entity";

// @Injectable()
// export class BuyersDestinationAdapter {
//     /**
//    * 
//    * @param currenciesDto 
//    * @param isUpdate 
//    * @returns 
//    */
//   public convertDtoToEntity( Dto: BuyersDestinationDTO, isUpdate: boolean = false): BuyersDestionations {
//     const buyersDestination = new BuyersDestionations();
//     const size = new Size()
//     // const colour = new Colour()
//     const destination = new Destination()
//     // buyersDestination.BsId = buyersDestination.BsId;
//     size.sizeId = Dto.sizeId
//     size.size= Dto.size
//     // colour.colourId = Dto.colourId
//     // colour.colour= Dto.colour  
//     destination.destinationId = Dto.destinationId
//     destination.destination= Dto.destinationName
//     buyersDestination.isActive = Dto.isActive == undefined?true:Dto.isActive;
//     if(isUpdate){
//       buyersDestination.BsId = Dto.BsId;
//         buyersDestination.updatedUser = Dto.updatedUser;
//     } else {
//         buyersDestination.isActive = true;
//         buyersDestination.createdUser = Dto.createdUser;
//     }
//     return buyersDestination;
//   }
//   public convertEntityToDto(buyersDestinationObject: BuyersDestionations): BuyersDestinationDTO {
//     const Dto = new BuyersDestinationDTO();
//     Dto.BsId = buyersDestinationObject.BsId;
//     Dto.sizeId = (buyersDestinationObject.sizeInfo)?.sizeId;
//     Dto.size = (buyersDestinationObject.sizeInfo)?.size;
//     Dto.destinationId = (buyersDestinationObject.buyerDesInfo)?.destinationId;
//     Dto.destinationName = (buyersDestinationObject.buyerDesInfo)?.destination;
//     Dto.buyerId = (buyersDestinationObject.buyerInfo)?.buyerId;
//     Dto.buyerName = (buyersDestinationObject.buyerInfo)?.buyerName;
//     // Dto.colourId = (buyersDestinationObject.colourInfo)?.colourId;
//     // Dto.colour = (buyersDestinationObject.colourInfo)?.colour;
//     Dto.isActive = buyersDestinationObject.isActive;
//     Dto.createdAt = buyersDestinationObject.createdAt;
//     Dto.createdUser = buyersDestinationObject.createdUser;
//     Dto.updatedAt = buyersDestinationObject.updatedAt;
//     Dto.updatedUser = buyersDestinationObject.updatedUser;
//     Dto.versionFlag = buyersDestinationObject.versionFlag;
//     return Dto;
//   }
// }