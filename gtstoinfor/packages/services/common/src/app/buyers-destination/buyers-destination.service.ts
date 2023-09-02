import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BuyersDestionations } from "./buyers-destination.entity";
import { BuyersDestinationDTO } from "./dto/buyers-destination.dto";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { Buyers } from "../buyers/buyers.entity";
import {
  BuyersDestinationResponseModel, BuyersMappingResponseModel, ColourInfoModel, CommonResponseModel, DestinationInfoModel, MappingModel, MappingResponseModel, SizeInfoModel,
} from "@project-management-system/shared-models";

import { BuyersSize } from "./buyers-sizes.entity";
import { BuyersColor } from "./byers-colors.entity";
import { Colour } from "../colours/colour.entity";
import { BuyerRepository } from "../buyers/buyers.repository";
import { buyerColorsMappingRepository } from "./buyer-colors-repo";
import { buyersSizesMappingRepository } from "./buyer-size-repo";
import { buyersDestionationMappingRepository } from "./buyers-destination.repo";
import { BuyersDestinationRequest } from "./dto/byers-destination.request";

@Injectable()
export class BuyersDestinationService {
  constructor(
    private buyersDesRepo:buyersDestionationMappingRepository,

    private repo:BuyerRepository,

     private buyerColorRepo: buyerColorsMappingRepository,

     private buyerSizeRepo: buyersSizesMappingRepository

  ) {}


async createBuyersDestination(
    dto: BuyersDestinationDTO,
  ): Promise<BuyersDestinationResponseModel> {
    try{
    
   
        const entity = new BuyersDestionations()
        entity.BsId = dto.BsId
        entity.createdUser = dto.createdUser
        entity.versionFlag = dto.versionFlag
        entity.isActive =dto.isActive
        entity.buyerInfo = new Buyers()
        entity.buyerInfo.buyerId = dto.buyerId
        
        for(const rec of dto.mappingDetails){
            if(rec.mappedAgainst === "Size"){
              for(const res of rec.mappedData){
                // console.log(rec.mappedAgainst,'----------rec')
                const existingSize = await this.buyerSizeRepo.findOne({
                  where: { buyerInfo: { buyerId: dto.buyerId }, sizeInfo: { sizeId: res.id } },
                });
      
                if (!existingSize) {
                const size = new Size()
                const sizesInfo = new BuyersSize();
                size.sizeId = res.id
                console.log(res.id,'----------res   ')
                size.size = res.name
                sizesInfo.sizeInfo = size
                sizesInfo.buyerInfo = new Buyers();
                sizesInfo.buyerInfo.buyerId = dto.buyerId
                const saveSize = await this.buyerSizeRepo.save(sizesInfo);
                console.log(sizesInfo,'----------rec')

                console.log(saveSize,'size')
                }
                else{
                  return new BuyersDestinationResponseModel(false,0,`Buyer Size  "${res.name}" Already exists`);

                }
              }
            }
            if(rec.mappedAgainst === 'Destination'){
              for(const res of rec.mappedData){
                const existingDes = await this.buyersDesRepo.findOne({
                  where: { buyerInfo: { buyerId: dto.buyerId }, buyerDesInfo: { destinationId: res.id } },
                });
      
                if (!existingDes) {
                const des = new Destination()
                const desInfo = new BuyersDestionations()
                des.destinationId = res.id
                des.destination = res.name
                desInfo.buyerDesInfo = des
                desInfo.buyerInfo = new Buyers()
                desInfo.buyerInfo.buyerId = dto.buyerId
                const saveDest = await this.buyersDesRepo.save(desInfo);
                console.log(saveDest,'saveDest')
              }
              else{
                return new BuyersDestinationResponseModel(false,0,`Buyer Destination  "${res.name}" Already exists`);

              }
            }
            }
            if(rec.mappedAgainst === 'Color'){
              for(const res of rec.mappedData){
                const existingDes = await this.buyerColorRepo.findOne({
                  where: { buyerInfo: { buyerId: dto.buyerId }, colorInfo: { colourId: res.id } },
                });
      
                if(!existingDes) 
                {
                const color = new Colour()
                const colorInfo = new BuyersColor()
                colorInfo.buyerInfo = new Buyers()
                 colorInfo.colorInfo = color
                color.colourId = res.id
                color.colour = res.name
                colorInfo.buyerInfo.buyerId = dto.buyerId
                const saveColor = await this.buyerColorRepo.save(colorInfo);
                console.log(saveColor,'saveColor')
              }
              else{
                return new BuyersDestinationResponseModel(false,0,`Buyer Colour ${res.name} Already exists`);
              }
            }
          }
          }
          return new BuyersDestinationResponseModel(true,0,'mappedsuccesfully');

      }
       catch(err){
          throw err
      }
    }

  async getAll(req:BuyersDestinationRequest): Promise<BuyersMappingResponseModel> {
    try {
        const size = await this.buyerSizeRepo.getAll(req)
        const des = await this.buyersDesRepo.getAll(req)
        const color = await this.buyerColorRepo.getAll(req)
        console.log(size,'size-------')
        console.log(des,'des-------')
       let mappDetails : MappingModel[] =[]
       let sizeInfo:SizeInfoModel[] =[]
       let colorInfo=[]
       let desInfo = []
       let buyerId:number;
       let buyerName:string;
       const buyersInfo: { [key: number]: MappingModel } = {};

       for (const res of color) {
           const buyerId = res.buyer_id;
           const buyerName = res.buyer_name;
       
           if (!buyersInfo[buyerId]) {
               buyersInfo[buyerId] = {
                   buyerId,
                   buyerName,
                   size: [],
                   destination: [],
                   color: [],
               };
           }
       
           buyersInfo[buyerId].color.push({ colourId: res.colour_id, colour: res.colour });
           console.log(buyersInfo,'buyerscolor')
       }
       
       for (const sizeRes of size) {
           const buyerId = sizeRes.buyer_id;
           const buyerName = sizeRes.buyer_name;
       
           if (!buyersInfo[buyerId]) {
               buyersInfo[buyerId] = {
                   buyerId,
                   buyerName,
                   size: [],
                   destination: [],
                   color: [],
               };
           }
       
           buyersInfo[buyerId].size.push({ sizeId: sizeRes.size_id, size: sizeRes.sizes });
           console.log(buyersInfo,'buyerssize')

       }
       
       for (const desRes of des) {
           const buyerId = desRes.buyer_id;
           const buyerName = desRes.buyer_name;
       
           if (!buyersInfo[buyerId]) {
               buyersInfo[buyerId] = {
                   buyerId,
                   buyerName,
                   size: [],
                   destination: [],
                   color: [],
               };
           }
       
           buyersInfo[buyerId].destination.push({ destinationId: desRes.destination_id, destination: desRes.destination });
           console.log(buyersInfo,'buyersdes')

       }
       
       // Convert the buyersInfo object to an array of MappingModel objects
       for (const buyerId in buyersInfo) {
               mappDetails.push(buyersInfo[buyerId]);
           
       }
     
    //    for(const res of color){
    //     colorInfo.push({colorId:res.colour_id,color:res.colour})
    //     buyerId= res.buyer_id;
    //     buyerName = res.buyer_name
    //     console.log(buyerId,'buyercolor')
    //    }
    //    for (const sizeRes of size) {
    //             sizeInfo.push({ sizeId: sizeRes.size_id, size: sizeRes.sizes })
    //        buyerId = sizeRes.buyer_id
    //        buyerName = sizeRes.buyer_name
    //        console.log(buyerId,'buyersize')

    //       }
    //         for (const desRes of des) {

    //            desInfo.push({ destinationId: desRes.destination_id, destination: desRes.destination })
    //            buyerName = desRes.buyer_name
    //            buyerId = desRes.buyer_id
    //            console.log(buyerId,'buyerdes')
          
        
    // }
  //   mappDetails.push({
  //     buyerId:buyerId,
  //     buyerName:buyerName , // Replace with actual value
  //     size: sizeInfo,
  //     destination: desInfo,
  //     color: colorInfo
  // });
     
        return new BuyersMappingResponseModel(true, 0, 'Data retrieved', mappDetails);

    } catch (err) {
        throw err;
    }
}




}
