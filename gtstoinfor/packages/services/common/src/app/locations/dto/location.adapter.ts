import { Injectable } from '@nestjs/common';
import { LocationDTO } from './location.dto';
import { Location } from '../location.entity';

@Injectable()
export class LocationAdapter {
  /**
   *
   * @param DeliveryTermsDto
   * @returns DeliveryTerms entity
   */
  public convertDtoToEntity(  locationDTO: LocationDTO,  isUpdate: boolean = false ): Location {
    const location = new Location();
    location.locationId=locationDTO.locationId;
    location.locationName=locationDTO.locationName;
    location.locationCode=locationDTO.locationCode;

    location.isActive=locationDTO.isActive==undefined?true:locationDTO.isActive;
    if (isUpdate) {
      location.updatedUser = locationDTO.updatedUser;
    } else {
      location.isActive = true;
      location.createdUser = locationDTO.createdUser;
    }
   return location;
  }
  public convertEntityToDto(locationObject: Location): LocationDTO {
    const locationDTO= new LocationDTO;
    locationDTO.locationId = locationObject.locationId;
    locationDTO.locationName = locationObject.locationName;
    locationDTO.locationCode = locationObject.locationCode;
    locationDTO.isActive = locationObject.isActive;
    locationDTO.createdAt = locationObject.createdAt;
    locationDTO.updatedAt = locationObject.updatedAt;
    locationDTO.createdUser = locationObject.createdUser;
    locationDTO.updatedUser = locationObject.updatedUser;
    locationDTO.versionFlag = locationObject.versionFlag;
    return locationDTO;
  }
}
