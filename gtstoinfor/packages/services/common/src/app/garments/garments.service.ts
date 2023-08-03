import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarmentsAdapter } from './dto/garments.adapter';
import { GarmentDto } from './dto/garments.dto';
import { Garments } from './garments.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllGarmentsResponse, GarmentRequest, GarmentResponse } from '@project-management-system/shared-models';
import { GarmentsRequest } from './dto/garments.request';

@Injectable()
export class GarmentsService {
    constructor(
        @InjectRepository(Garments) private garmentsRepository: Repository<Garments>,
        private garmentsAdapter: GarmentsAdapter,
    ) { }

    async createGarment(garmentDto: GarmentDto, isUpdate: boolean): Promise<GarmentResponse> {
        console.log('garmentDto',garmentDto)
        try {
          let previousValue
          if (!isUpdate) {
            const garmentEntity = await this.garmentsRepository.findOne({where:{garmentName:garmentDto.garmentName}})
                if (garmentEntity) {
                    throw new GarmentResponse(false,11104, 'Garment already exists');
                }
            }
            else {
                const garmentEntity = await this.garmentsRepository.findOne({where:{garmentId:garmentDto.garmentId}})
                if (garmentEntity) {
                    if (!garmentDto) {
                        throw new ErrorResponse(11104, 'Garment already exists');
                    }
                }
            }
          const convertedGarment: Garments = this.garmentsAdapter.convertDtoToEntity(garmentDto,isUpdate);
          console.log(convertedGarment,'----------------------------------------');
          const savedGarmentEntity: Garments = await this.garmentsRepository.save(convertedGarment);
          const savedGarmentDto: GarmentDto = this.garmentsAdapter.convertEntityToDto(convertedGarment);
            // console.log(savedStateDto);
          if (savedGarmentDto) {
            const presentValue = savedGarmentDto.garmentName;
           // generating resposnse
           const response = new GarmentResponse(true,1,isUpdate? 'Garment Updated Successfully': 'Garment Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Garment Updated Successfully': 'Garment Created Successfully'
           const userName = isUpdate? savedGarmentDto.updatedUser :savedGarmentDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new GarmentResponse(false,11106,'Garment saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }

    /**
    * gets all   Item categories details  
    * @returns all the  Item category details .
    */
    // @LogActions({ isAsync: true })
    
    async getAllGarments(): Promise<AllGarmentsResponse> {
        try {
            const garmentDto: GarmentDto[] = [];
            const garmentEntities: Garments[] = await this.garmentsRepository.find({
                order: { garmentName: "ASC" },
                relations: ['garmentCategory']
            });
            if (garmentEntities.length > 0) {
                garmentEntities.forEach(garmentEntity => {
                    const convertedGarmentDto: GarmentDto = this.garmentsAdapter.convertEntityToDto(garmentEntity);
                    garmentDto.push(convertedGarmentDto);
                });
                console.log(garmentDto);
                const response = new AllGarmentsResponse(true, 11208, "Garments retrieved successfully", garmentDto);
                return response;
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }


    async activateOrDeactivateGarment(garmentReq: GarmentsRequest): Promise<GarmentResponse> {
        try {
            const garmentExists = await this.getGarmentById(garmentReq.garmentId);
            if (garmentExists) {
                if (!garmentExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current garment information.Refresh and try again');
                } else {
                    
                        const garmentStatus =  await this.garmentsRepository.update(
                            { garmentId: garmentReq.garmentId },
                            { isActive: garmentReq.isActive,updatedUser: garmentReq.updatedUser });
                       
                        if (garmentExists.isActive) {
                            if (garmentStatus.affected) {
                                const garmentResponse: GarmentResponse = new GarmentResponse(true, 10115, 'Garment is de-activated successfully');
                                return garmentResponse;
                            } else {
                                throw new ErrorResponse(10111, 'Garment is already deactivated');
                            }
                        } else {
                            if (garmentStatus.affected) {
                                const garmentResponse: GarmentResponse = new GarmentResponse(true, 10114, 'Garment is activated successfully');
                                return garmentResponse;
                            } else {
                                throw new ErrorResponse(10112, 'Garment is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getGarmentById(garmentId: number): Promise<Garments> {
        //  console.log(employeeId);
            const response = await this.garmentsRepository.findOne({
            where: {garmentId: garmentId},
            });
            if (response) {
            return response;
            } else {
            return null;
            }
        }

}
