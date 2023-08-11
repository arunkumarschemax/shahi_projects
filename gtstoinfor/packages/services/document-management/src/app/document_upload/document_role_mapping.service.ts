
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteDto } from './dto/delete-dto';
import { RoleEntity } from './entities/document-role-entity';
import { RoleDto } from './dto/document-role-dto';
import { RoleRepository } from './repository/document-role-repository';
import { DocumentRoleMappingResponseModel,} from "@project-management-system/shared-models";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private repository:RoleRepository ,
    ) { }

    async create(createDto: RoleDto, entity: RoleEntity): Promise<RoleDto> {
        createDto.documentName = entity.documentName;

        const updatedDocument = await this.repository.save(createDto);

        return updatedDocument;
    }


    // async getAllRoleNames(): Promise<DocumentResponseModel> {
    //     const data = await this.repository.find();
    //     let info = []
    //     if (data.length === 0) {
    //         console.log('oooo');
    //         for(const rec of data){
    //             info.push(new RoleDto(rec.id,rec.documentName,rec.createdUser,rec.isActive,rec.updatedAt,rec.updatedUser,rec.updatedAt,rec.createdAt,rec.versionFlag))
    //         }
    //     }
    //     return new DocumentResponseModel(
    //         true,23333,`data retrieved successfully`
    //     )
    // }

    async getAllRoleNames(): Promise<any> {
        const data = await this.repository.find();
        if (data.length === 0) {
          console.log('oooo');
        }
        return data;
      }

    async activateOrDeactivateRole(id: DeleteDto): Promise<DocumentRoleMappingResponseModel> {
        const finding = await this.repository.findOne({ where: { id: id.id }, });
        await this.repository.update(
            { id: id.id },
            { isActive: !finding.isActive }
        );
        return new DocumentRoleMappingResponseModel(
            true,
            6787,
            `${finding.isActive === true ? 'Deactivated' : 'Activated'} succesfully`,

        )
    }
}

