import { Injectable } from '@nestjs/common';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { Not } from 'typeorm';
import { AllFactoriesResponseModel, FactoryActivateDeactivateDto, FactoryDto as NewFactoriesDto, PriceListDto, PriceListModel, PriceListResponseModel } from '@project-management-system/shared-models';
import { PriceListAdapter } from './adapters/pricelist.adapter';
import { pricListRepository } from './repository/pricelist.repositiry';
import { PriceListEntity } from './entities/pricelist.entity';
import { priceListDto } from './dto/pricelist.dto';

@Injectable()
export class priceListService {
    constructor(
        private adaptor: PriceListAdapter,
        private priceRepository: pricListRepository,
    ) { }

    // async createPriceList(req: priceListDto,isUpdate: boolean): Promise<PriceListResponseModel> {
    //     try {
            
    //         let previousValue
    //         if (!isUpdate) {
    //             const data = await this.priceRepository.findOne({
    //                 where:{style : req.style}})
    //                 if (data) {
    //                     throw new PriceListResponseModel(false,11104, 'details already exists');
    //                   }
    //         }
    //         else{
    //             const previous = await this.priceRepository.findOne({where:{style:req.style}})
    //             previousValue = previous.style
    //              console.log(previousValue,"new dataa")
    //             if(!previous){
    //                 throw new ErrorResponse(0,'Given data not exist')
    //             }
    //         }
    //         const converteddata : PriceListEntity = this.adaptor.convertDtoToEntity(req,isUpdate)
    //         const saveStyle :PriceListEntity = await this.priceRepository.save(converteddata)
    //         const savepricedto: priceListDto = this.adaptor.convertEntityToDto(converteddata)

    //         if (savepricedto){
    //             const presentvalue = savepricedto.style;
    //             const response = new PriceListResponseModel(true,1,isUpdate? 'Price List Updated Successfully': 'Price List Created Successfully');
    //             const name = isUpdate?'updated':'created'
    //             const displayValue = isUpdate? 'Price List Updated Successfully': 'Price List Created Successfully'
    //             const userName = isUpdate?savepricedto.updatedUser:savepricedto.createdUser;
    //             return response
    //         }else {
    //             throw new PriceListResponseModel(false,11106,'Price List saved but issue while transforming into DTO');
    //           }
    //     } catch (error) {
    //         console.error(error);
    //         throw new ErrorResponse(500, 'An error occurred');
    //     }
    // }
    
    // async createPriceList(req: priceListDto, isUpdate: boolean): Promise<PriceListResponseModel> {
    //     try {
    //         let previousValue;
    
    //         if (!isUpdate) {
    //             const data = await this.priceRepository.findOne({
    //                 where: { style: req.style, destination: req.destination }
    //             });
    
    //             if (data) {
    //                 throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
    //             }
    //         } else {
    //             const previous = await this.priceRepository.findOne({ where: { style: req.style } });
    //             previousValue = previous.style;
    
    //             if (!previous) {
    //                 throw new ErrorResponse(0, 'Given data does not exist');
    //             }
    //         }
    
    //         const converteddata: PriceListEntity = this.adaptor.convertDtoToEntity(req, isUpdate);
    //         const saveStyle: PriceListEntity = await this.priceRepository.save(converteddata);
    //         const savepricedto: priceListDto = this.adaptor.convertEntityToDto(converteddata);
    
    //         if (savepricedto) {
    //             const presentvalue = savepricedto.style;
    //             const response = new PriceListResponseModel(true, 1, isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully');
    //             const name = isUpdate ? 'updated' : 'created';
    //             const displayValue = isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully';
    //             const userName = isUpdate ? savepricedto.updatedUser : savepricedto.createdUser;
    //             return response;
    //         } else {
    //             throw new PriceListResponseModel(false, 11106, 'Price List saved but there was an issue while transforming it into DTO');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         throw new ErrorResponse(500, 'An error occurred');
    //     }
    // }

    async createPriceList(req: priceListDto, isUpdate: boolean): Promise<PriceListResponseModel> {
        try {
            let previousValue;
            console.log(isUpdate,"eee")

    
            if (!isUpdate) {
                const data = await this.priceRepository.findOne({
                    where: { style: req.style, destination: req.destination }
                });
                console.log(data,"reseee")
                if (data) {
                    throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
                }
            } else {
                const existingRecord = await this.priceRepository.findOne({ where: { id: req.id } });
    
                if (!existingRecord) {
                    throw new ErrorResponse(0, 'Given data does not exist');
                }
    
                existingRecord.destination = req.destination;
                existingRecord.year = req.year;
                existingRecord.seasonCode = req.seasonCode;
                existingRecord.currency = req.currency;
    
                await this.priceRepository.save(existingRecord);
            }
    
    
            const converteddata: PriceListEntity = this.adaptor.convertDtoToEntity(req, isUpdate);
            const saveStyle: PriceListEntity = await this.priceRepository.save(converteddata);
            const savepricedto: priceListDto = this.adaptor.convertEntityToDto(converteddata);
    
            if (savepricedto) {
                const presentvalue = savepricedto.style;
                const response = new PriceListResponseModel(true, 1, isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully');
                const name = isUpdate ? 'updated' : 'created';
                const displayValue = isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully';
                const userName = isUpdate ? savepricedto.updatedUser : savepricedto.createdUser;
                return response;
            } else {
                throw new PriceListResponseModel(false, 11106, 'Price List saved but there was an issue while transforming it into DTO');
            }
        } catch (error) {
            console.error(error);
            throw new ErrorResponse(500, 'An error occurred');
        }
    }
    
    
    

    async getAllPriceList(): Promise<PriceListResponseModel> {
        const details = await this.priceRepository.find();
        let info =[];
        if (details.length > 0) {
            for(const rec of details){
                info.push(new PriceListModel(rec.id,rec.style,rec.year,rec.destination,rec.seasonCode,rec.currency,rec.createdUser,rec.isActive,rec.versionFlag,rec.updatedUser))
            }
            return new PriceListResponseModel(true, 1, 'data retrived', info)
        } else {
            return new PriceListResponseModel(false, 0, 'data not found')
        }
    }
    

    async ActivateOrDeactivatePriceList(req: priceListDto): Promise<PriceListResponseModel> {
        try {
          console.log(req.isActive,'service-----------')
            const operationExists = await this.getPriceListById(req.id);
            if (operationExists) {
                if (!operationExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current PriceList information.Refresh and try again');
                } else {
    
                    const operationStatus = await this.priceRepository.update(
                        { id: req.id },
                        { isActive: req.isActive, updatedUser: req.updatedUser });
                    if (operationExists.isActive) {
                        if (operationStatus.affected) {
                            const operationResponse: PriceListResponseModel = new PriceListResponseModel(true, 10115, 'PriceList is de-activated successfully');
                            return operationResponse;
                        } else {
                            throw new PriceListResponseModel(false,10111, 'PriceList is already deactivated');
                        }
                    } else {
                        if (operationStatus.affected) {
                            const brandResponse: PriceListResponseModel = new PriceListResponseModel(true, 10114, 'PriceList is activated successfully');
                            return brandResponse;
                        } else {
                            throw new PriceListResponseModel(false,10112, 'PriceList is already  activated');
                        }
                    }
                    // }
                }
            } else {
                throw new PriceListResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
s




async getActivePriceListId(req: priceListDto): Promise<PriceListResponseModel> {
    try {
        const PriceEntities: PriceListEntity = await this.priceRepository.findOne({
          where:{id:req.id}
          });
          
          const Data: priceListDto = this.adaptor.convertEntityToDto(PriceEntities);
          if (Data) {
              const response = new PriceListResponseModel(true, 11101 , 'Brands retrived Successfully',);
              return response;
          }
          else{
              throw new PriceListResponseModel(false,11106,'Something went wrong');
          }
          
    } catch (err) {
        return err;
    }
}
   


async getAllActivePriceList(): Promise<PriceListResponseModel> {
   
    try {
        const PriceListDto: PriceListModel[] = [];
        const PriceEntities: PriceListEntity[] = await this.priceRepository.find({ order: { 'style': 'ASC' },where:{isActive:true}
       });
        if (PriceEntities) {
          
            PriceEntities.forEach((Entity) => {
              
                const convertedBrandsDtos: priceListDto = this.adaptor.convertEntityToDto(
                  Entity
                );
                PriceListDto.push(convertedBrandsDtos);
            });
            const response = new PriceListResponseModel(true, 11108, "Brands retrieved successfully",PriceListDto);
            return response;
        } else {
            throw new PriceListResponseModel(false,99998, 'Data not found'); 
        }
    } catch (err) {
        return err;
    }
}

   

    async getPriceListById(id: number): Promise<PriceListEntity> {
            const Response = await this.priceRepository.findOne({
            where: {id: id},
            });
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
