import { Injectable } from '@nestjs/common';
import { DestinationDTO } from './destination.dto';
import { Destination } from '../destination.entity';

@Injectable()
export class DestinationAdapter {
  /**
   * 
   * @param destinationDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(destinationDto: DestinationDTO, isUpdate: boolean = false): Destination {
    const destination = new Destination();
    destination.destinationId = destinationDto.destinationId;
    destination.destination = destinationDto.destination;
    // company.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
    destination.isActive = destinationDto.isActive == undefined ? true : destinationDto.isActive;
    if (isUpdate) {
      destination.updatedUser = destinationDto.updatedUser;
    } else {
      destination.isActive = true;
      destination.createdUser = destinationDto.createdUser;
    }
    return destination;
  }
  public convertEntityToDto(destinationObject: Destination): DestinationDTO {
    const destinationDto = new DestinationDTO;
    destinationDto.destinationId = destinationObject.destinationId;
    destinationDto.destination = destinationObject.destination;
    destinationDto.isActive = destinationObject.isActive;
    destinationDto.createdAt = destinationObject.createdAt;
    destinationDto.updatedAt = destinationObject.updatedAt;
    destinationDto.createdUser = destinationObject.createdUser;
    destinationDto.updatedUser = destinationObject.updatedUser;
    destinationDto.versionFlag = destinationObject.versionFlag;
    return destinationDto;
  }
}
