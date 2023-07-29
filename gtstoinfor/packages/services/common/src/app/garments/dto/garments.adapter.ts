import { Injectable } from '@nestjs/common';
import { GarmentsDTO } from './garments.dto';
import { Garments } from '../garments.entity';

@Injectable()
export class GarmentsAdapter {
  /**
   * 
   * @param GarmentsDTO 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  garmentsDto: GarmentsDTO,  isUpdate: boolean = false ): Garments {
    const garments = new Garments();
    garments.garmentId=garmentsDto.garmentId;
    garments.garmentName=garmentsDto.garmentName;
    garments.isActive=garmentsDto.isActive==undefined?true:garmentsDto.isActive;
    if (isUpdate) {
        garments.updatedUser = garmentsDto.updatedUser;
    } else {
        garments.isActive = true;
        garments.createdUser = garmentsDto.createdUser;
    }
   return garments;
  }
  public convertEntityToDto(garments: Garments): GarmentsDTO {
    const garmentsDto= new GarmentsDTO;
    garmentsDto.garmentId=garments.garmentId;
    garmentsDto.garmentName=garments.garmentName;
    garmentsDto.isActive = garments.isActive;
    garmentsDto.createdAt = garments.createdAt;
    garmentsDto.updatedAt = garments.updatedAt;
    garmentsDto.createdUser = garments.createdUser;
    garmentsDto.updatedUser = garments.updatedUser;
    garmentsDto.versionFlag = garments.versionFlag;
    return garmentsDto;
  }
}
