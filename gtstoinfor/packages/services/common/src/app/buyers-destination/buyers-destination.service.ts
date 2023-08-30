import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Style } from "../style/dto/style-entity";
import { GarmentCategory } from "../garment-category/garment-category.entity";
import { Garments } from "../garments/garments.entity";
import { Components } from "../components/components.entity";
import { BuyersDestionations } from "./buyers-destination.entity";
import { BuyersDestinationDTO } from "./dto/buyers-destination.dto";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { Buyers } from "../buyers/buyers.entity";
import { BuyersController } from "../buyers/buyers.controller";
import {
  BuyersDestinationResponseModel,
} from "@project-management-system/shared-models";
import { buyersDestionationMappingRepository } from "./buyers-destination.repo";
import { BuyersDestinationRequest } from "./dto/byers-destination.request";
import { MappingDetailsDto } from "./dto/mapping-details.dto";
import { SizeInfoDto } from "./dto/size-info-dto";
import { DestinationInfoDto } from "./dto/destination-info-dto";
import { ColourInfoDto } from "./dto/colour-info-dto";
import { BuyersSize } from "./buyers-sizes.entity";
import { BuyersColor } from "./byers-colors.entity";

@Injectable()
export class BuyersDestinationService {
  constructor(
    @InjectRepository(BuyersDestionations)
    private buyersDesRepo: Repository<BuyersDestionations>,
    private repo: buyersDestionationMappingRepository,

    @InjectRepository(BuyersSize)
        private buyerSizeRepo: Repository<BuyersSize>,

    @InjectRepository(BuyersColor)
     private buyerColorRepo: Repository<BuyersColor>

  ) {}


async createBuyersDestination(
    dto: BuyersDestinationDTO,
  ): Promise<BuyersDestinationResponseModel> {
    try{
    const data = await this.buyersDesRepo.find(
    //   {where:{buyerInfo:{buyerId:dto.buyerId}}}
    );
    if(data.length > 0){
        return new BuyersDestinationResponseModel(false,0,' already exists')
      } else {
        const entity = new BuyersDestionations()
        entity.BsId = dto.BsId
        entity.createdUser = dto.createdUser
        entity.versionFlag = dto.versionFlag
        entity.isActive =dto.isActive
        entity.buyerInfo = new Buyers()
        entity.buyerInfo.buyerId = dto.buyerId
        
        for(const rec of dto.mappingDetails){
            // console.log(rec,'----------rec')
          let mappedData = [];

        if (rec.mappingAgainst = "Size") {
          for (const mappedItem of rec.mappedData) {
                    
        //     for(const res of mappedItem.size){
        //         // console.log(res,'--------res')
        //         const sizesInfo = new BuyersSize();
        //         const size = new Size();
        //         size.sizeId = res.sizeId
        //         size.size = res.size
        //         sizesInfo.sizeInfo = size  
        //         sizesInfo.buyerInfo = new Buyers();
        //         sizesInfo.buyerInfo.buyerId = dto.buyerId
        //         const saveSize = await this.buyerSizeRepo.save(sizesInfo);
        //         // Create a new object with savedSize data and push it into mappedData
        //         mappedData.push({
        //             size: { sizeId: saveSize.sizeInfo.sizeId, size: saveSize.sizeInfo.size },
        //         });
        //         console.log(saveSize, 'size');
        //     }
        // }
        // const mappedSizeData = mappedItem.size.map((res) => ({
        //     sizeId: res.sizeId,
        //     size: res.size,
        // }));

        // for (const sizeData of mappedSizeData) {
        //     const sizesInfo = new BuyersSize();
        //     sizesInfo.sizeInfo = new Size();
        //     sizesInfo.sizeInfo.sizeId = sizeData.sizeId;
        //     sizesInfo.sizeInfo.size = sizeData.size;
        //     sizesInfo.buyerInfo = new Buyers();
        //     sizesInfo.buyerInfo.buyerId = dto.buyerId;
        //     const saveSize = await this.buyerSizeRepo.save(sizesInfo);
        //     console.log(saveSize, 'size');
        // }
    }

            }
            console.log(rec,'=========')
             if(rec.mappingAgainst === "Destination") {
                console.log(rec,'.............')
                // for (const mappedItem of rec.mappedData) {
                //     const mappedDestData = mappedItem.destination.map((res) => ({
                //         destinationId: res.destinationId,
                //         destination: res.destination,
                //     }));
        
                //     for (const destData of mappedDestData) {
                //         const destinationInfo = new BuyersDestionations();
                //         destinationInfo.buyerDesInfo = new Destination();
                //         destinationInfo.buyerDesInfo.destinationId = destData.destinationId;
                //         destinationInfo.buyerDesInfo.destination = destData.destination;
                //         destinationInfo.buyerInfo = new Buyers();
                //         destinationInfo.buyerInfo.buyerId = dto.buyerId;
                //         const saveDest = await this.buyersDesRepo.save(destinationInfo);
                //         console.log(saveDest, 'destination');
                //     }
                // }
            }
        
        // else if (rec.mappingAgainst = 'Color') {
        //   for (const mappedItem of rec.mappedData) {
        //     for(const res of mappedItem.colour){  
        //     const colorInfo = new BuyersColor();
        //     colorInfo.colorInfo= new Colors()
        //     colorInfo.colourId = res.colourId;
        //     colorInfo.colourName = res.colour;
//              colorInfo.buyerInfo = new Buyers()
//              colorInfo.buyerInfo.buyerId = dto.buyerId
        //     mappedData.push(colorInfo);}
        // const saveColor = await this.buyerColorRepo.save(colorInfo)

        //   }
        // }

         rec.mappedData = mappedData;
        }
    
    // const save = await this.buyersDesRepo.save(dto)

    return new BuyersDestinationResponseModel(true,0,'mappedsuccesfully');
    }
} catch(err){
    throw err
}
}
  async getAll(
    // req: BuyersDestinationRequest
  ): Promise<any> {
    try {
        const data = await this.buyersDesRepo.find({
            relations:['buyerInfo','buyerInfo.buyerSizesInfo']
        })
        console.log(data,'data')
        return data
    //   const data = await this.buyersDesRepo.find({
    //     // where:{styleInfo:{styleId:req.styleId},garmentcategoryInfo:{garmentCategoryId:req.garmentCategoryId},garmentInfo:{garmentId:req.garmentId}},
    //     relations: ["sizeInfo", "buyerInfo", "buyerDesInfo"],
    //   });

    //   if (data) {
    //     const groupedData: Record<string, BuyersDestinationModel> = {};

    //     for (const rec of data) {
    //       const key = `${rec.sizeInfo.size}-${rec.buyerDesInfo.destination}`;
    //       if (!groupedData[key]) {
    //         groupedData[key] = {
    //           BsId: rec.BsId,
    //           buyerDetails: [],
    //           createdUser: rec.createdUser,
    //           updatedUser: rec.updatedUser,
    //           isActive: rec.isActive,
    //           versionFlag: rec.versionFlag,
    //           sizeDetails: [],
    //           colourDetails: [],
    //           destinationDetails: [],
    //           //   sizeDetails: rec.sizeInfo.size,
    //           //   destination: rec.buyerDesInfo.destination,
    //           //   colour: 'rec.colourInfo.colour',
    //         };
    //       }
    //       groupedData[key].buyerDetails.push({
    //         buyerId: rec.buyerInfo.buyerId,
    //         buyerName: rec.buyerInfo.buyerName,
    //       });
    //       groupedData[key].sizeDetails.push({
    //         sizeId: rec.sizeInfo.sizeId,
    //         size: rec.sizeInfo.size,
    //       });
    //       groupedData[key].destinationDetails.push({
    //         destinationId: rec.buyerDesInfo.destinationId,
    //         destination: rec.buyerDesInfo.destination,
    //       });
    //       groupedData[key].colourDetails.push({
    //         colourId: 1, // rec.colourInfo.colourId,
    //         colour: " rec.colourInfo.colour",
    //       });
    //     }

    //     const info = Object.values(groupedData);

    //     return new BuyersDestinationResponseModel(
    //       true,
    //       1,
    //       "Data retrieved",
    //       info
    //     );
    //   } else 
    // {
    //     return new BuyersDestinationResponseModel(
    //       false,
    //       1,
    //       "Data retrieved",
    //       []
    //     );
    //   }
    } catch (err) {
      throw err;
    }
  }
  //   async getBuyersDestinations(req:BuyersDestinationRequest): Promise<BuyersDestinationResponseModel> {
  //     try {
  //       const data = await this.buyersDesRepo.find({where:{sizeInfo:{sizeId:req.sizeId},destinationInfo:{destinationId:req.destinationId}
  //                     // ,colourInfo:{colourId:req.colourId}
  //                 },
  //         relations: ['sizeInfo', 'colourInfo', 'destinationInfo', 'buyerInfo'],
  //       });

  //       if (data) {
  //         const groupedData: Record<string, BuyersDestinationResponseModel> = {};

  //         for (const rec of data) {
  //           const key = `${rec.sizeInfo.size}-${rec.destinationInfo.destination}`;
  //           if (!groupedData[key]) {
  //             groupedData[key] = {
  //                 BsId: rec.BsId,
  //                 sizeId: rec.sizeInfo.sizeId,
  //               destinationId: rec.destinationInfo.destinationId,
  //               colourId: 'rec.colourInfo.colourId',
  //               buyerDetails: [],
  //               createdUser: rec.createdUser,
  //               updatedUser : rec.updatedUser,
  //               isActive : rec.isActive,
  //               versionFlag: rec.versionFlag,
  //               size: rec.sizeInfo.size,
  //               destination: rec.destinationInfo.destination,
  //               colour: 'rec.colourInfo.colour',
  //             };
  //           }
  //           groupedData[key].buyerDetails.push({
  //             buyerId: rec.buyerInfo.buyerId,
  //             buyer: rec.buyerInfo.buyerName,
  //           });
  //         }

  //         const info = Object.values(groupedData);

  //        return new BuyersDestinationResponseModel(true,1,'Data retrieved',info)

  //       } else {
  //         return new BuyersDestinationResponseModel(false,1,'Data retrieved',[])

  //       }
  //     } catch (err) {
  //       throw err;
  //     }
  //   }

  // async getSizeDropDown():Promise<BuyersDestinationResponseModel>{
  //   try{
  //     // const data = await this.buyersDesRepo.find({select:['styleInfo'],
  //     //   relations: ['garmentInfo', 'garmentcategoryInfo', 'styleInfo', 'componentInfo'],
  //     // });
  //     const data = await this.repo.getSizesDropDown()
  //     let info = [];
  //     if(data.length > 0){
  //       for(const rec of data){
  //         // info.push(new BuyersDestinationModel(null,rec.sizeId,null,null,[],null,null,null,null,rec.size,null,null))

  //       }
  //       return new BuyersDestinationResponseModel(true,1,'Data retrieved',info)
  //     } else{
  //       return new BuyersDestinationResponseModel(false,0,'No data found')
  //     }

  //   } catch(err){
  //     throw err
  //   }
  // }

  // async getDestinationDropDown():Promise<BuyersDestinationResponseModel>{
  //   try{
  //     // const data = await this.buyersDesRepo.find({select:['garmentcategoryInfo'],
  //     //   relations: ['garmentInfo', 'garmentcategoryInfo', 'styleInfo', 'componentInfo'],
  //     // });
  //     const data = await this.repo.getDestinationDropDown()
  //     let info = [];
  //     if(data.length > 0){
  //       for(const rec of data){
  //         // info.push(new BuyersDestinationModel(null,null,rec.destinationId,null,[],null,null,null,null,null,rec.destination))

  //       }
  //       return new BuyersDestinationResponseModel(true,1,'Data retrieved',info)
  //     } else{
  //       return new BuyersDestinationResponseModel(false,0,'No data found')
  //     }

  //   } catch(err){
  //     throw err
  //   }
  // }

  // async getColourDropDown():Promise<BuyersDestinationResponseModel>{
  //   try{
  //     // const data = await this.buyersDesRepo.find({select:['garmentInfo'],
  //     //   relations: ['garmentInfo', 'garmentcategoryInfo', 'styleInfo', 'componentInfo'],
  //     // });
  //     const data = await this.repo.get()
  //     let info = [];
  //     if(data.length > 0){
  //       for(const rec of data){
  //         info.push(new BuyersDestinationModel(null,null,null,rec.garment_id,[],null,null,null,null,null,null,rec.garment_name))

  //       }
  //       return new buyersDesResponseModel(true,1,'Data retrieved',info)
  //     } else{
  //       return new buyersDesResponseModel(false,0,'No data found')
  //     }

  //   } catch(err){
  //     throw err
  //   }
  // }
}
