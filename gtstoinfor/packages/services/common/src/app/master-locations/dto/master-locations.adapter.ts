import { Injectable } from "@nestjs/common";
import { LocationDTO } from "../../locations/dto/location.dto";
import { LocationsDTO } from "./master-locations.dto";
import { LocationsEntity } from "../master-locations.entity";

@Injectable()
export class MasterLocationsAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( locationsDto: LocationsDTO, isUpdate: boolean = false): LocationsEntity {
    const locations = new LocationsEntity();
    locations.locationId = locationsDto.locationId;
    locations.locationName = locationsDto.locationName;
    locations.isActive = locationsDto.isActive == undefined?true:locationsDto.isActive;
    if(isUpdate){
        locations.updatedUser = locations.updatedUser;
    } else {
        locations.isActive = true;
        locations.createdUser = locationsDto.createdUser;
    }
    return locations;
  }
  public convertEntityToDto(locationsObject: LocationsEntity): LocationsDTO {
    const locationsDto = new LocationsDTO;
    locationsDto.locationId = locationsObject.locationId;
    locationsDto.locationName = locationsObject.locationName;
    locationsDto.isActive = locationsObject.isActive;
    locationsDto.createdAt = locationsObject.createdAt;
    locationsDto.createdUser = locationsObject.createdUser;
    locationsDto.updatedAt = locationsObject.updatedAt;
    locationsDto.updatedUser = locationsObject.updatedUser;
    locationsDto.versionFlag = locationsObject.versionFlag;
    return locationsDto;
  }
}