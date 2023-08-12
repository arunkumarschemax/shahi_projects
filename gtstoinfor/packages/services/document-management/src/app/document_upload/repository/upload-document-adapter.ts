import { DocumentsList } from "../entities/upload-document-entity";

export class UploadDocumentListAdapter{
    public convertDtoToEntity(dto:any):DocumentsList[]{
        console.log(dto,'dtooooooo')
        const conItems: DocumentsList[]  = []; 
        for(const doc of dto.file){
            console.log(dto,'dtooooooo')
            const entity = new DocumentsList();
            entity.documentsListId = 0;
            entity.documentCategoryId=dto.documentCategoryId
            entity.roleId=dto.roleId
            entity.customerPo=dto.customerPo
            entity.orderId=dto.orderId
            entity.fileName = doc.name;
            entity.filePath = '/upload-files/'+doc.name;
            entity.isUploaded = true;
            entity.isActive = true;
            conItems.push(entity)
        }
        return conItems;
    }
}