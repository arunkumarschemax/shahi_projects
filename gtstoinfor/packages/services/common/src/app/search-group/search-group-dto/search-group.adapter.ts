import { Injectable } from '@nestjs/common';
import { searchGroupDto } from '@project-management-system/shared-models';
import { SearchGroupEnitty } from '../search-group.entity';

@Injectable()
export class SearchGroupAdapter {
  
  public convertDtoToEntity(  Dto: searchGroupDto,  isUpdate: boolean = false ): SearchGroupEnitty {
    const searchGrp = new SearchGroupEnitty();
    searchGrp.id=Dto.id;
    searchGrp.searchGrpCode=Dto.searchGrpCode;
    searchGrp.searchGrpName=Dto.searchGrpName;

    searchGrp.isActive=Dto.isActive==undefined?true:Dto.isActive;
    if (isUpdate) {
        searchGrp.updatedUser = Dto.updatedUser;
    } else {
        searchGrp.isActive = true;
        searchGrp.createdUser = Dto.createdUser;
    }
   return searchGrp;
  }
  public convertEntityToDto(object: SearchGroupEnitty): searchGroupDto {
    const searchGrp= new searchGroupDto;
    searchGrp.id = object.id;
    searchGrp.searchGrpCode = object.searchGrpCode;
    searchGrp.searchGrpName = object.searchGrpName;
    searchGrp.isActive = object.isActive;
    searchGrp.createdAt = object.createdAt;
    searchGrp.updatedAt = object.updatedAt;
    searchGrp.createdUser = object.createdUser;
    searchGrp.updatedUser = object.updatedUser;
    searchGrp.versionFlag = object.versionFlag;
    return searchGrp;
  }
}
