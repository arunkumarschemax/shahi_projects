
import { Injectable } from '@nestjs/common';
import { DocumentRoleMappingRepository } from './repository/document-role-repository';
import { AllDocumentRoleMappingsResponseModel, DocumentRoleMappingInfoDto, DocumentRoleMappingResponseModel, RoleActivateDeactivateDto } from '@project-management-system/shared-models';
import { DocumentRoleMapping, DocumentRoleMappingMulti } from './models/document-role-mapping.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { DocumentRoleMappingEntity } from './entities/document-role-entity';

@Injectable()
export class DocumentRoleMappingService {
    constructor(
        private mappingRepo : DocumentRoleMappingRepository
    ) { }

    async createDocMappingg(documentRoleMapping: DocumentRoleMapping): Promise<DocumentRoleMappingResponseModel> {
        console.log(documentRoleMapping,'documentRoleMapping')
        try {
            const docMapCheck = await this.mappingRepo.findOne({where: {documentId: documentRoleMapping.documentId,roleId:documentRoleMapping.roleId}});
            if(docMapCheck){
                return new DocumentRoleMappingResponseModel(false, 0, 'Mapping already exist. ',)
            }
            else{
                const documentRoleMappingEntity = new DocumentRoleMappingEntity();
                documentRoleMappingEntity.id = documentRoleMapping.docMappingId;
                documentRoleMappingEntity.roleName = documentRoleMapping.roleName;
                documentRoleMappingEntity.documentName =documentRoleMapping.documentName;
                documentRoleMappingEntity.roleId=documentRoleMapping.roleId;
                documentRoleMappingEntity.documentId = documentRoleMapping.documentId;
                documentRoleMappingEntity.createdUser = documentRoleMapping.username;
                const savedResult = await this.mappingRepo.save(documentRoleMappingEntity);
                const docRoleMapInfo = new DocumentRoleMappingInfoDto(savedResult.id,savedResult.documentId,savedResult.roleName,savedResult.documentName,savedResult.createdUser);
                return new DocumentRoleMappingResponseModel(true, 0, 'Document Mapped successfully', docRoleMapInfo)
            }
        } catch(err) {
            throw err;
        }
    }

    async getAllDocMappings(): Promise<AllDocumentRoleMappingsResponseModel> {
        try {
            const docMaps = await this.mappingRepo.find();
            if(docMaps.length){
                let documentRoleMappingInfoDto:DocumentRoleMappingInfoDto[] = [];
                for(const doc of docMaps){
                    const docRoleMapInfo = new DocumentRoleMappingInfoDto(doc.id,doc.documentId,doc.roleName,doc.documentName,doc.createdUser,doc.isActive,doc.versionFlag);
                    documentRoleMappingInfoDto.push(docRoleMapInfo);
                }
                return new AllDocumentRoleMappingsResponseModel(true, 0, 'Document Mapped successfully', documentRoleMappingInfoDto)
            }
            else{
                return new AllDocumentRoleMappingsResponseModel(false, 0, "Document Maps doesn't exist.",)
            }
        } catch(err) {
            throw err;
        }
    }


      async activateOrDeactivate(req: RoleActivateDeactivateDto): 
      Promise<AllDocumentRoleMappingsResponseModel> {
        const routedetails = await this.mappingRepo.findOne({ where: { id: req.id } })
        if (routedetails) {

            if (req.versionFlag != routedetails.versionFlag) {

                throw new AllDocumentRoleMappingsResponseModel(false, 1, 'SomeOne updated. Referesh and try again', [])
            } else {
                const routesupdate = await this.mappingRepo.update({ id: req.id }, { isActive: req.isActive, updatedUser: req.updatedUser, })
                if (routedetails.isActive) {
                    if (routesupdate.affected) {
                        return new AllDocumentRoleMappingsResponseModel(true, 0, ' de-activated successfully', [])
                    } else {
                        throw new AllDocumentRoleMappingsResponseModel(false, 1, 'already deactivated', [])
                    }
                } else {
                    if (routesupdate.affected) {
                        return new AllDocumentRoleMappingsResponseModel(true, 0, 'activated successfully', [])
                    } else {
                        throw new AllDocumentRoleMappingsResponseModel(false, 1, 'already activated', [])
                    }
                }
            }
        }
        else {
            throw new AllDocumentRoleMappingsResponseModel(false, 1, 'No record found', [])

        }

    }




    // async createDocMapping(documentRoleMapping: DocumentRoleMappingMulti): Promise<DocumentRoleMappingResponseModel> {
    //     console.log(documentRoleMapping,'documentRoleMapping')
    //     try {
    //         // const docMapCheck = await this.mappingRepo.findOne({where: {documentId: documentRoleMapping.documentId,roleId:documentRoleMapping.roleId}});
    //         let docMapCheck

    //         if(docMapCheck){
    //             return new DocumentRoleMappingResponseModel(false, 0, 'Mapping already exist. ',)
    //         }
    //         else{
    //             for(const req of documentRoleMapping.documentId){
                    
    //             }
    //             const documentRoleMappingEntity = new DocumentRoleMappingEntity();
    //             documentRoleMappingEntity.id = documentRoleMapping.docMappingId;
    //             documentRoleMappingEntity.roleName = documentRoleMapping.roleName;
    //             documentRoleMappingEntity.documentName =documentRoleMapping.documentName;
    //             documentRoleMappingEntity.roleId=documentRoleMapping.roleId;
    //             documentRoleMappingEntity.documentId = documentRoleMapping.documentId;
    //             documentRoleMappingEntity.createdUser = documentRoleMapping.username;
    //             const savedResult = await this.mappingRepo.save(documentRoleMappingEntity);
    //             const docRoleMapInfo = new DocumentRoleMappingInfoDto(savedResult.id,savedResult.documentId,savedResult.roleName,savedResult.documentName,savedResult.createdUser);
    //             return new DocumentRoleMappingResponseModel(true, 0, 'Document Mapped successfully', docRoleMapInfo)
    //         }
    //     } catch(err) {
    //         throw err;
    //     }
    // }

}

