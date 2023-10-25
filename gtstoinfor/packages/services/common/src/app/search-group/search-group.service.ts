import { Injectable } from '@nestjs/common';
import {  SearchGrpResponse } from '@project-management-system/shared-models';
import { SearchGroupRepository } from './search-grp-repo/search-group.repo';
import { SearchGroupAdapter } from './search-group-dto/search-group.adapter';
import { SearchGroupDTO } from './search-group-dto/search-group.dto';
import { SearchGroupEnitty } from './search-group.entity';


@Injectable()
export class SearchGrpService {
  
      constructor(
         private adaptor: SearchGroupAdapter,
        private repository: SearchGroupRepository,
        
      ) { }
    
    
    async getSearchGroupData(): Promise<SearchGrpResponse> {
        const data = await this.repository.find()
        if (data.length > 0){

            return new SearchGrpResponse(true, 1111, 'Data retreived',data )
        }
        return new SearchGrpResponse(false, 0, 'Data Not retreived',[])

      }
      async createSearchGroup(Dto: SearchGroupDTO, isUpdate: boolean): Promise<SearchGrpResponse> {
        try {
            if (!Dto || (Object.keys(Dto).length === 0 && Dto.constructor === Object)) {
                throw new SearchGrpResponse(false, 11107, 'Search Group data is empty. At least one value is required.');
            }
    
            const existingEntity: SearchGroupEnitty | undefined = await this.repository.findOne({
                where: {
                    searchGrpCode: Dto.searchGrpCode,
                }
            });
    
            if (existingEntity && (!isUpdate || existingEntity.id !== Dto.id)) {
                throw new SearchGrpResponse(false, 11108, 'Search Group code must be unique.');
            }
    
            const convertedEntity: SearchGroupEnitty = this.adaptor.convertDtoToEntity(Dto, isUpdate);
            const savedEntity: SearchGroupEnitty = await this.repository.save(convertedEntity);
            const savedDto: SearchGroupDTO = this.adaptor.convertEntityToDto(savedEntity);
    
            if (savedDto) {
                const name = isUpdate ? 'updated' : 'created';
                const displayValue = isUpdate ? 'Search Group Updated Successfully' : 'Search Group Created Successfully';
                const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
                const response = new SearchGrpResponse(true, 1, displayValue);
                return response;
            } else {
                throw new SearchGrpResponse(false, 11106, 'Search Group saved but issue while transforming into DTO');
            }
        } catch (error) {
            return error;
        }
    }
    
    
    async getSearchGrpById(id: number): Promise<SearchGroupEnitty> {
        const Response = await this.repository.findOne({ where: { id: id }, });
        if (Response) {
          return Response;
        } else {
          return null;
        }
      }
      async ActivateOrDeactivate(req: SearchGroupDTO): Promise<SearchGrpResponse> {
        try {
          const roleExists = await this.getSearchGrpById(req.id);
          if (roleExists) {
            const roleStatus = await this.repository.update(
              { id: req.id },
              {
                isActive: !roleExists.isActive,
                updatedUser: req.searchGrpCode,
              }
            );
            const internalMessage: string = !roleExists.isActive
              ? "Search Group Activated Successfully"
              : "Search Group Daectivated Successfully";
            return new SearchGrpResponse(true, 54654, internalMessage);
          } else {
            return new SearchGrpResponse(false, 654695, "Data Not Found");
          }
        } catch (err) {
          return err;
        }
      }
      async getActiveSearchGroup(): Promise<SearchGrpResponse> {
        const data = await this.repository.find({ where: { isActive: true } })
        const activeData: SearchGroupDTO[] = []
        for (const record of data) {
          const adapterData = this.adaptor.convertEntityToDto(record)
          activeData.push(adapterData)
        }
        return new SearchGrpResponse(true, 1111, 'Data retreived', activeData)
      }
}

