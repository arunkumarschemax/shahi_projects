import { DocumentsListRequest } from "@project-management-system/shared-models";
import { DocumentsList } from "../entities/upload-document-entity";

export class UploadDocumentListAdapter{
    public convertDtoToEntity(dto:DocumentsListRequest):DocumentsList[]{
        console.log(dto.file,'dtooooooo')
        const conItems: DocumentsList[]  = []; 
        for(const doc of dto.file){
            console.log('@@@@@@')
            const entity = new DocumentsList();
            entity.documentsListId = 0;
            entity.documentCategoryId=dto.documentCategoryId
            entity.roleId=dto.roleId
            entity.customerPo=dto.customerPo
            entity.orderId=dto.orderId
            entity.fileName = "dto.";
            entity.filePath = '/upload-files/post-sailing-upload-files/'+"dto.";
            entity.isUploaded = false;
            entity.isActive = true;
            entity.createdAt = new Date();
            entity.createdUser = "";
            entity.updatedAt = new Date();
            entity.updatedUser = "";
            entity.versionFlag = 1;
            conItems.push(entity)
        }
        return conItems;
    }
}