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
import { AllDocumentRoleMappingsResponseModel, CommonResponseModel, DocumentRoleMappingResponseModel, PoRoleRequest, RoleActivateDeactivateDto } from "@project-management-system/shared-models";
import { DocumentRoleMappingService } from "./document_role_mapping.service";
import { PoReq, docreq,req } from "./requests/importedPoReq";
import * as fs from 'fs';
@ApiTags('doc-upload')
@Controller('doc-upload')
export class DocumentUploadController {
    constructor(private uploadDocservice:DocumentsListService,
      private readonly service: DocumentService,
      private readonly mapService: DocumentRoleMappingService,
         private readonly applicationExceptionHandler: ApplicationExceptionHandler
         ){}

  @Post('/createDocumentsList')
    async createDocumentsList(@Body() createDto:DocumentsListRequest): Promise<UploadDocumentListResponseModel>{
        try {
            return await this.uploadDocservice.createDocumentsList(createDto, false);
          } catch (error) {
            return this.applicationExceptionHandler.returnException(UploadDocumentListResponseModel, error);
          }
    }

    

    @Post('/DocumentFileUpload')
    @UseInterceptors(FilesInterceptor('file', null, {
      storage: diskStorage({
        // destination: './upload-files/manisha-123',
        // destination: `./upload-files/PO-${req}`,
        destination: (req, file, callback) => {
          const destinationPath = `./upload-files/PO-${req.body.customerPo}`;
          console.log('Destination Path:', destinationPath);
          try {
            // Attempt to create the directory if it doesn't exist
            fs.mkdirSync(destinationPath, { recursive: true });
            callback(null, destinationPath);
          } catch (error) {
            console.error('Error creating directory:', error);
            callback(error, null);
          }
        },
        // destination: (req, file, callback) => {
        //   callback(null, `./upload-files/PO-${req.body.customerPo}`);
        // },
        filename: (req, file, callback) => {
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
        return await this.uploadDocservice.updatePath(file,'upload-files/',uploadData.documentCategoryId,uploadData.roleId,uploadData.customerPo,uploadData.orderId,uploadData.documentsListId);
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

    @Post('/getAllDocMappings')
    async getAllDocMappings(): Promise<AllDocumentRoleMappingsResponseModel> {
      return await this.mapService.getAllDocMappings();
    }

    @Post('/activateOrDeactivate')
    async activateOrDeactivate(@Body() req: any): Promise<AllDocumentRoleMappingsResponseModel> {
      return await this.mapService.activateOrDeactivate(req);
    }
    // @Post('/getPoNumberDropdown')
    // async getPoNumberDropdown(): Promise<UploadDocumentListResponseModel> {
    //   console.log('dtaaaaaa')
    //   return await this.uploadDocservice.getPoNumberDropdown();
    // }


    @Post('/getPoNumberDropdown')
    async getPoNumberDropdown(): Promise<UploadDocumentListResponseModel> {
        try {
            return await this.uploadDocservice.getPoNumberDropdown();
        } catch (error) {
            return (this.applicationExceptionHandler.returnException(UploadDocumentListResponseModel, error));
        }
    }
    @Post('/getDocumentDetailsByPO')
    async getDocumentDetailsByPO(@Body() req:PoRoleRequest): Promise<UploadDocumentListResponseModel> {
        try {
            return await this.uploadDocservice.getDocumentDetailsByPO(req);
        } catch (error) {
            return (this.applicationExceptionHandler.returnException(UploadDocumentListResponseModel, error));
        }
    }
    @Post('/getDocumentDetails')
    async getDocumentDetails(): Promise<CommonResponseModel> {
        try {
            return await this.service.getAllDocuments();
        } catch (error) {
            return (this.applicationExceptionHandler.returnException(UploadDocumentListResponseModel, error));
        }
    }

    @Post('/createDocListr')
    async createDocList(@Body() req?:req[]):Promise<UploadDocumentListResponseModel>{
      try{
        return await this.uploadDocservice.createDocList(req);
      }catch(error){
        return (this.applicationExceptionHandler.returnException(UploadDocumentListResponseModel, error));
      }

    }

    @Post('/getDocumentOrderIds')
    async getDocumentOrderIds():Promise<UploadDocumentListResponseModel>{
      try{
        return await this.uploadDocservice.getDocumentOrderIds();
      }catch(error){
        return (this.applicationExceptionHandler.returnException(UploadDocumentListResponseModel, error));
      }

    }
}
