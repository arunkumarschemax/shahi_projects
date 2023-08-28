import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { BuyingHouse } from './buying-house.entity';
import { BuyingHouseAdapter } from './dto/buying-house.adapter';
import { BuyingHouseDTO } from './dto/buying-house.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { BuyingHouseRequest } from './dto/buying-house.request';
import { AllBuyingHouseResponseModel, BuyingHouseDto, BuyingHouseResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class BuyingHouseService {
  
  constructor(
    @InjectRepository(BuyingHouse)
    private buyingHouseRepository: Repository<BuyingHouse>,
    private buyingHouseAdapter: BuyingHouseAdapter,
    ){}
    
    
    async getBuyingHouseWithoutRelations( buyingHouse: string): Promise<BuyingHouse>{
      const buyingHouseResponse = await this.buyingHouseRepository.findOne({
        where: {buyingHouse: Raw(alias => `buying_house = '${buyingHouse}'`)},
      });
      if(buyingHouseResponse){
        return buyingHouseResponse;
      }else{
        return null;
      }
    }
    
    
    async createBuyingHouse(dto: BuyingHouseDTO, isUpdate: boolean): Promise<BuyingHouseResponseModel> {
      try {
        let previousValue;
        const buyingHouseEntity = await this.buyingHouseRepository.findOne({ where: { buyingHouse: dto.buyingHouse } });
        if (buyingHouseEntity) {
          throw new BuyingHouseResponseModel(false, 11104, 'Buying House already exists');
        }
        if(isUpdate){
          const certificatePrevious = await this.buyingHouseRepository.findOne({ where: { buyingHouseId: dto.buyingHouseId } });
          if (!certificatePrevious) {
            throw new ErrorResponse(0, 'Given Buying House does not exist');
          }
          previousValue = certificatePrevious.buyingHouse;
        }
        const convertedBuyingHouse: BuyingHouse = this.buyingHouseAdapter.convertDtoToEntity(dto, isUpdate);
        const savedBuyingHouseEntity: BuyingHouse = await this.buyingHouseRepository.save(convertedBuyingHouse);
        const savedBuyingHouseDto: BuyingHouseDTO = this.buyingHouseAdapter.convertEntityToDto(savedBuyingHouseEntity);

        if (savedBuyingHouseDto) {
          const response = new BuyingHouseResponseModel(true, 1, isUpdate ? 'Buying House Updated Successfully' : 'Buying House Created Successfully');
          return response;
        } else {
          throw new BuyingHouseResponseModel(false, 11106, 'Buying House saved but issue while transforming into DTO');
        }
      } catch (error) {
        return error;
      }
    }
      
      

    async getAllBuyingHouse(): Promise<AllBuyingHouseResponseModel> {
      try {
        const buyingHouse: BuyingHouseDto[] = [];
        const buyingHouseEntity: BuyingHouse[] = await this.buyingHouseRepository.find({ 
          order :{buyingHouse:'ASC'}});
          if (buyingHouseEntity) {
            buyingHouseEntity.forEach(buyingHouseEntity => {
              const convertedBuyingHouse: BuyingHouseDTO = this.buyingHouseAdapter.convertEntityToDto(
                buyingHouseEntity
                );
                buyingHouse.push(convertedBuyingHouse);
            });
            const response = new AllBuyingHouseResponseModel(true,1,'Buying Houses retrieved successfully',buyingHouse);
            return response;
          } else {
            throw new ErrorResponse(99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  

    async getAllActiveBuyingHouse(): Promise<AllBuyingHouseResponseModel> {
      try {
        const buyingHouse: BuyingHouseDTO[] = [];
        const buyingHouseEntity: BuyingHouse[] = await this.buyingHouseRepository.find({where:{"isActive":true},order :{buyingHouse:'ASC'}});
        if (buyingHouseEntity) {
          buyingHouseEntity.forEach(buyingHouseEntity => {
            const convertedBuyingHouse: BuyingHouseDTO = this.buyingHouseAdapter.convertEntityToDto(
              buyingHouseEntity
            );
            buyingHouse.push(convertedBuyingHouse);
          });
          const response = new AllBuyingHouseResponseModel(true,1,'Buying Houses retrieved successfully',buyingHouse);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateBuyingHouse(req: BuyingHouseRequest): Promise<BuyingHouseResponseModel> {
  try {
      const buyingHouseExists = await this.getBuyingHouseById(req.buyingHouseId);
      if (buyingHouseExists) {
          if (!buyingHouseExists) {
              throw new ErrorResponse(10113, 'Someone updated the current Buying House information. Refresh and try again');
          } else {
                  const buyingHouseStatus =  await this.buyingHouseRepository.update(
                      { buyingHouseId: req.buyingHouseId },
                      { isActive: req.isActive,updatedUser: req.updatedUser });
                 
                  if (buyingHouseExists.isActive) {
                      if (buyingHouseStatus.affected) {
                          const buyingHouseResponse: BuyingHouseResponseModel = new BuyingHouseResponseModel(true, 10115, 'Buying House is de-activated successfully');
                          return buyingHouseResponse;
                      } else {
                          throw new BuyingHouseResponseModel(false,10111, 'Buying House is already deactivated');
                      }
                  } else {
                      if (buyingHouseStatus.affected) {
                          const buyingHouseResponse: BuyingHouseResponseModel = new BuyingHouseResponseModel(true, 10114, 'Buying House is activated successfully');
                          return buyingHouseResponse;
                      } else {
                          throw new BuyingHouseResponseModel(false,10112, 'Buying House is already  activated');
                      }
                  }
          }
      } else {
          throw new BuyingHouseResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveBuyingHouseById( req: BuyingHouseRequest): Promise<BuyingHouseResponseModel> {
  try {
      const buyingHouseEntity: BuyingHouse = await this.buyingHouseRepository.findOne({
        where:{buyingHouseId: req.buyingHouseId}
        });
        
        const buyingHouseDto: BuyingHouseDTO = this.buyingHouseAdapter.convertEntityToDto(buyingHouseEntity);
        if (buyingHouseDto) {
            const response = new BuyingHouseResponseModel(true, 11101 , 'Buying House retrieved Successfully',[buyingHouseDto]);
            return response;
        }
        else{
            throw new BuyingHouseResponseModel(false,11106,'Something went wrong');
        }
  } catch (err) {
      return err;
  }
}

async getBuyingHouseById(buyingHouseId: number): Promise<BuyingHouse> {
      const Response = await this.buyingHouseRepository.findOne({
      where: {buyingHouseId: buyingHouseId},
      });
     if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}