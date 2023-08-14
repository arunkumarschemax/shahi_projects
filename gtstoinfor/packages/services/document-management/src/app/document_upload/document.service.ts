
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentDto } from './dto/document.dto';
import { DeleteDto } from './dto/delete-dto';
import {DocumentResponseModel} from '../../../../../libs/shared-models/src/document-management/document-response.model'
import { DocumentRepository } from './repository/documents.repository';
import { CommonResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private repository:DocumentRepository ,
    ) { }

    async create(createDto: DocumentDto, entity: DocumentEntity): Promise<DocumentDto> {
        createDto.documentName = entity.documentName;

        const updatedDocument = await this.repository.save(createDto);

        return updatedDocument;
    }


    // async getAllDocuments(): Promise<DocumentResponseModel> {
    //     const data = await this.repository.find();
    //     let info = []
    //     if (data.length === 0) {
    //         console.log('oooo');
    //         for(const rec of data){
    //             info.push(new DocumentDto(rec.id,rec.documentName,rec.createdUser,rec.isActive,rec.updatedAt,rec.updatedUser,rec.updatedAt,rec.createdAt,rec.versionFlag))
    //         }
    //     }
    //     return new DocumentResponseModel(
    //         true,23333,`data retrieved successfully`
    //     )
    // }

    async getAllDocuments(): Promise<CommonResponseModel> {
        const data = await this.repository.find();
        if (data.length > 0) {
          return new CommonResponseModel(true,1,"data retrived successfully", data);
        }
        else{
          return new CommonResponseModel(false,0,"No Data found",);

        }
      }

      // async activateOrDeactivateModules(modulesReq: DocumentDto): Promise<CommonResponseModel> {
      //   const record = await this.repository.findOne({ where: { moduleId: modulesReq.moduleId } });
    
      //   await this.repository.update({ moduleId: modulesReq.moduleId }, { isActive: !record.isActive });
      //   const internalMessage: string = !record.isActive ? "Activated Sucessfully" : "Deactivated Successfully"
      //   return new CommonResponseModel(true, 6876, internalMessage)
      // }
      // async getModulesById(moduleId: number): Promise<ModulesEntity> {
      //   const Response = await this.repository.findOne({
      //     where: { moduleId: moduleId },
      //   });
      //   if (Response) {
      //     return Response;
      //   } else {
      //     return null;
      //   }
      // }
   
    }
