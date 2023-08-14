
import { Injectable, Query } from '@nestjs/common';
import { DocumentRoleMappingRepository } from './repository/document-role-repository';
import { AllDocumentRoleMappingsResponseModel, DocumentRoleMappingInfoDto, DocumentRoleMappingResponseModel, RoleActivateDeactivateDto } from '@project-management-system/shared-models';
import { DocumentRoleMapping, DocumentRoleMappingMulti } from './models/document-role-mapping.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { DocumentRoleMappingEntity } from './entities/document-role-entity';
import { In } from 'typeorm';

@Injectable()
export class DocumentRoleMappingService {
    constructor(
        private mappingRepo : DocumentRoleMappingRepository
    ) { }

    async getAllDocMappings(): Promise<AllDocumentRoleMappingsResponseModel> {
        try {

            const quuery = 'select drm.role_id as roleId, drm.id as docMappingId,drm.document_id as documentId,drm.role_name as roleName,drm.is_active as isActive,drm.version_flag as versionFlag,d.document_name as documentName from document_role_mapping drm left join document d on d.id=drm.document_id'
            const result = await this.mappingRepo.query(quuery)
            if(result){
                return new AllDocumentRoleMappingsResponseModel(true, 0, 'Document Mapped successfully', result)
            }else{
                return new AllDocumentRoleMappingsResponseModel(true, 0, 'not found', [])
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

    async createDocMapping(documentRoleMapping: DocumentRoleMappingMulti): Promise<DocumentRoleMappingResponseModel> {
        console.log(documentRoleMapping,'documentRoleMapping')
        try {
            const docMapCheck = await this.mappingRepo.findOne({where: {documentId :In([documentRoleMapping.documentId])}});
            console.log(docMapCheck);
            if(docMapCheck){
                return new DocumentRoleMappingResponseModel(false, 0, 'Mapping already exist. ',)
            }
            else{
                const documentRoleMappingEntityArr : DocumentRoleMappingEntity[] = []
                 
                for(const req of documentRoleMapping.documentId){            
                    const documentRoleMappingEntity = new DocumentRoleMappingEntity();
                    documentRoleMappingEntity.id = documentRoleMapping.docMappingId;
                    documentRoleMappingEntity.roleName = documentRoleMapping.roleName;
                    documentRoleMappingEntity.documentName =documentRoleMapping.documentName;
                    documentRoleMappingEntity.roleId=documentRoleMapping.roleId;
                    documentRoleMappingEntity.documentId = req;
                    documentRoleMappingEntity.createdUser = documentRoleMapping.username;
                    console.log(documentRoleMappingEntity)
                    documentRoleMappingEntityArr.push(documentRoleMappingEntity)
                }
                const savedResult = await this.mappingRepo.save(documentRoleMappingEntityArr);
               return new DocumentRoleMappingResponseModel(true, 0, 'Document Mapped successfully', undefined)
            }
        } catch(err) {
            throw err;
        }
    }

}

