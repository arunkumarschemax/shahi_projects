import { FobDto } from "../dto/fob.dto";
import { FobEntity } from "../fob.entity";

export class FobAdapter {
  public convertDtoToEntity(dto: FobDto, isUpdate: boolean = false): FobEntity {
    const entity = new FobEntity()
    entity.planningSeasonCode = dto.planningSeasonCode;
    entity.planningSeasonYear = dto.planningSeasonYear;
    entity.styleNumber = dto.styleNumber;
    entity.colorCode = dto.colorCode;
    entity.sizeDescription = dto.sizeDescription;
    entity.shahiConfirmedGrossPrice = dto.shahiConfirmedGrossPrice;
    entity.shahiConfirmedGrossPriceCurrencyCode = dto.shahiConfirmedGrossPriceCurrencyCode
    if (isUpdate) {
      // if ur update the rowdata give against id data
      entity.id = dto.id
      entity.updatedUser = dto.updatedUser;
    } else {
      entity.isActive = true;
      entity.createdUser = dto.createdUser
    }
    // Map any other fields as needed
    return entity;
  }


  public convertEntityToDto(entity: FobEntity): FobDto {

    const dto = new FobDto()
    dto.id = entity.id;
    dto.planningSeasonCode = entity.planningSeasonCode;
    dto.planningSeasonYear = entity.planningSeasonYear;
    dto.styleNumber = entity.styleNumber;
    dto.colorCode  = entity.colorCode;
    dto.sizeDescription = entity.sizeDescription;
    dto.shahiConfirmedGrossPrice = entity.shahiConfirmedGrossPrice;
    dto.shahiConfirmedGrossPriceCurrencyCode =entity.shahiConfirmedGrossPriceCurrencyCode
    dto.isActive = entity.isActive;
    dto.versionFlag = entity.versionFlag;

    return dto
  }

}