import { Body, Controller, Post,UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DocumentsListService } from "./upload_document.service";
import { DocumentsListRequest } from "./requests/document-list.request";
import { UploadDocumentListResponseModel } from "packages/libs/shared-models/src/document-management/upload-document-list-response-model";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DocumentFileUploadResponse } from "packages/libs/shared-models/src/document-management/document-file-upload-response";
import { DocumentUploadDto } from "./requests/document-upload-dto";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document.dto';
import { DeleteDto } from './dto/delete-dto';
import { Entity } from 'typeorm';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentRoleMapping } from "./models/document-role-mapping.dto";
import { AllDocumentRoleMappingsResponseModel, DocumentRoleMappingResponseModel } from "@project-management-system/shared-models";
import { DocumentRoleMappingService } from "./document_role_mapping.service";
@Controller('documents-list')
@ApiTags('Document List ')
export class DocumentsListController {
    constructor(private uploadDocservice:DocumentsListService,
      private readonly service: DocumentService,
      private readonly mapService: DocumentRoleMappingService,
         private readonly applicationExceptionHandler: ApplicationExceptionHandler
         ){}

  @Post('/createDocumentsList')
    async createDocumentsList(@Body() createDto:DocumentsListRequest): Promise<UploadDocumentListResponseModel>{
      console.log(createDto);
        try {
            return await this.uploadDocservice.createDocumentsList(createDto, false);
          } catch (error) {
            return this.applicationExceptionHandler.returnException(UploadDocumentListResponseModel, error);
          }
    }


    @Post('/DocumentFileUpload')
    @UseInterceptors(FilesInterceptor('file', null, {
      storage: diskStorage({
        // destination: '/upload-files/post-sailing-upload-files',
        destination: 'dist/apps/services/logistics/upload-files/post-sailing-upload-files',
        filename: (req, file, callback) => {
          // console.log(file);
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(xls|pdf|jpg|png|jpeg|doc)$/)) {
          return callback(new Error('Only xls,pdf, jpg, png, doc, jpeg files are allowed!'), false);
        }
        callback(null, true);
      },
    }))
    async DocumentFileUpload(@UploadedFiles() file, @Body() uploadData: DocumentUploadDto): Promise<DocumentFileUploadResponse> {
      try {
        return await this.uploadDocservice.updatePath(file,'upload-files/post-sailing-upload-files/',uploadData.documentCategoryId,uploadData.roleId,uploadData.customerPo,uploadData.orderId,uploadData.documentsListId);
      } catch (error) {
        // return this.applicationExceptionHandler.returnException(DocumentFileUploadResponse, error);
      }
    }

    @Post('createDocument')
    async create(@Body() createDto: DocumentDto, entity: DocumentEntity): Promise<any> {
      console.log(createDto,"controlllllllllllllll")
      return await this.service.create(createDto,entity)
    }
  
    @Post('getAllDocuments')
    async getAllDocuments(): Promise<any> {
      try {
        return await this.service.getAllDocuments();
      } catch (error) {
        return error;
      }
    }
  
    // @Post('/activateOrDeactivateDepartment')
    // async activateOrDeactivateDepartment(@Body() req:DeleteDto): Promise<DocumentUploadResponseModel>{
    //   return await this.service.activateOrDeactivateDepartment(req);
    // }

    @Post('/createDocMapping')
    async createDocMapping(@Body() documentRoleMapping: DocumentRoleMapping): Promise<DocumentRoleMappingResponseModel> {
      return await this.mapService.createDocMapping(documentRoleMapping);
    }

    @Post('./getAllDocMappings')
    async getAllDocMappings(): Promise<AllDocumentRoleMappingsResponseModel> {
      return await this.mapService.getAllDocMappings();
    }

}
