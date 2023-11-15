import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarmentsAdapter } from './dto/garments.adapter';
import { GarmentDto } from './dto/garments.dto';
import { Garments } from './garments.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllGarmentsResponse, GarmentRequest, GarmentResponse } from '@project-management-system/shared-models';
import { GarmentsRequest } from './dto/garments.request';
import { GarmentsCategoryRequest } from './dto/garment-category.request';

@Injectable()
export class GarmentsService {
    constructor(
        @InjectRepository(Garments) private garmentsRepository: Repository<Garments>,
        private garmentsAdapter: GarmentsAdapter,
    ) { }

    async createGarment(garmentDto: GarmentDto, isUpdate: boolean): Promise<GarmentResponse> {
        try {
          if (!isUpdate) {
            const existingGarment = await this.garmentsRepository.findOne({ where: { garmentName: garmentDto.garmentName } });
            if (existingGarment) {
              throw new GarmentResponse(false, 11104, 'Garment already exists');
            }
          } else {
            const existingGarmentByName = await this.garmentsRepository.findOne({ where: { garmentName: garmentDto.garmentName } });
            const existingGarmentById = await this.garmentsRepository.findOne({ where: { garmentId: garmentDto.garmentId } });
            
            if (existingGarmentByName && existingGarmentByName.garmentId !== garmentDto.garmentId) {
              throw new GarmentResponse(false, 11104, 'Garment name already exists');
            }
            
            if (!garmentDto || !existingGarmentById) {
              throw new ErrorResponse(11104, 'Given garment does not exist');
            }
          }
          
          const convertedGarment: Garments = this.garmentsAdapter.convertDtoToEntity(garmentDto, isUpdate);
          const savedGarmentEntity: Garments = await this.garmentsRepository.save(convertedGarment);
          const savedGarmentDto: GarmentDto = this.garmentsAdapter.convertEntityToDto(savedGarmentEntity);
          
          if (savedGarmentDto) {
            const response = new GarmentResponse(true, 1, isUpdate ? 'Garment Updated Successfully' : 'Garment Created Successfully');
            return response;
          } else {
            throw new GarmentResponse(false, 11106, 'Garment saved but issue while transforming into DTO');
          }
        } catch (error) {
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
                                const garmentResponse: GarmentResponse = new GarmentResponse(true, 10115, 'Garment is Deactivated successfully');
                                return garmentResponse;
                            } else {
                                throw new ErrorResponse(10111, 'Garment is already deactivated');
                            }
                        } else {
                            if (garmentStatus.affected) {
                                const garmentResponse: GarmentResponse = new GarmentResponse(true, 10114, 'Garment is Activated successfully');
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


        async getAllActiveGarments(): Promise<AllGarmentsResponse> {
            try {
              const garmentDto: GarmentDto[] = [];
              //retrieves all companies
              const garmentsEntity: Garments[] = await this.garmentsRepository.find({where:{"isActive":true},order :{garmentName:'ASC'}});
              //console.log(statesEntities);
              
              if (garmentsEntity) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                garmentsEntity.forEach(garmentsEntity => {
                  const convertedGarmentsDto: GarmentDto = this.garmentsAdapter.convertEntityToDto(
                    garmentsEntity
                  );
                  garmentDto.push(convertedGarmentsDto);
                });
        
                //generated response
      
                const response = new AllGarmentsResponse(true,1,'Garments retrieved successfully',garmentDto);
                return response;
              } else {
                throw new ErrorResponse(99998, 'Data not found');
              }
              // return response;
            } catch (err) {
              return err;
            }
          }

          async getByGarmentCategory(req: GarmentsCategoryRequest): Promise<AllGarmentsResponse> {
            const Response = await this.garmentsRepository.find({
                where: {
                    garmentCategory: { garmentCategoryId: req.garmentCategoryId },
                    isActive: req.isActive
                }
            });
        
            if (Response.length > 0) {
                const res = new AllGarmentsResponse(true, 1, 'Attributes retrieved successfully', Response);
                return res;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        }
        

}
