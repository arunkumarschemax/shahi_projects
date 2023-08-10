import { DocumentsList } from "../entities/upload-document-entity";

export class UploadDocumentListAdapter{
    public convertDtoToEntity(dto:any):DocumentsList[]{
        const conItems: DocumentsList[]  = []; 
        for(const doc of dto.file){
            const entity = new DocumentsList();
            entity.documentsListId = 0;
            entity.documentCategoryId=doc.documentCategoryId
            entity.roleId=doc.roleId
            entity.customerPo=doc.customerPo
            entity.orderId=doc.orderId
            entity.fileName = doc.name;
            entity.filePath = '/upload-files/post-sailing-upload-files/'+doc.name;
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