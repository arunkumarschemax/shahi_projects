
import { Injectable } from '@nestjs/common';
import { DocumentRoleMappingRepository } from './repository/document-role-repository';
import { AllDocumentRoleMappingsResponseModel, DocumentRoleMappingInfoDto, DocumentRoleMappingResponseModel } from '@project-management-system/shared-models';
import { DocumentRoleMapping } from './models/document-role-mapping.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { DocumentRoleMappingEntity } from './entities/document-role-entity';

@Injectable()
export class DocumentRoleMappingService {
    constructor(
        private mappingRepo : DocumentRoleMappingRepository
    ) { }

    async createDocMapping(documentRoleMapping: DocumentRoleMapping): Promise<DocumentRoleMappingResponseModel> {
        try {
            const docMapCheck = await this.mappingRepo.findOne({where: {documentId: documentRoleMapping.documentId}});
            if(docMapCheck){
                return new DocumentRoleMappingResponseModel(false, 0, 'Mapping already exist. ',)
            }
            else{
                const documentRoleMappingEntity = new DocumentRoleMappingEntity();
                documentRoleMappingEntity.id = documentRoleMapping.docMappingId;
                documentRoleMappingEntity.roleName = documentRoleMapping.roleName;
                documentRoleMappingEntity.documentName =documentRoleMapping.documentName;
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
                    const docRoleMapInfo = new DocumentRoleMappingInfoDto(doc.id,doc.documentId,doc.roleName,doc.documentName,doc.createdUser);
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

}

