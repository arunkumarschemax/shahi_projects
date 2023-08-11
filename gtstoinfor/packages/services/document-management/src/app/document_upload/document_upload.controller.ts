import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document.dto';
import { DeleteDto } from './dto/delete-dto';
import { Entity } from 'typeorm';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentUploadResponseModel } from 'packages/libs/shared-models/src/document-management/document-upload-response.model';

@Controller('documentdata')
@ApiTags('documentdata')
export class DocumentController {
  documentService: any;
  constructor(private readonly service: DocumentService) {}

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


  @Post('/activateOrDeactivateDepartment')
  async activateOrDeactivateDepartment(@Body() req:DeleteDto): Promise<DocumentUploadResponseModel>{
    return await this.service.activateOrDeactivateDepartment(req);
  }
}
