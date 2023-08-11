import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { DocumentsListService } from './upload_document.service';
import { DocumentsListController } from './document_upload.controller';
import { DocumentsList } from './entities/upload-document-entity';
import { UploadDocumentListAdapter } from './repository/upload-document-adapter';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentService } from './document.service';
import { DocumentRepository } from './repository/documents.repository';
import { DocumentRoleMapping } from './models/document-role-mapping.dto';
import { DocumentRoleMappingEntity } from './entities/document-role-entity';
import { DocumentRoleMappingRepository } from './repository/document-role-repository';
import { DocumentRoleMappingService } from './document_role_mapping.service';
import { OrdersRepository } from 'packages/services/common/src/app/orders/repository/orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        DocumentsList,
        DocumentEntity,
        DocumentRoleMappingEntity
    ])],
  controllers: [DocumentsListController],
  providers: [DocumentsListService,DocumentService,UploadDocumentListAdapter, ApplicationExceptionHandler,DocumentRepository,DocumentRoleMappingRepository,DocumentRoleMappingService,OrdersRepository]
})
export class DocumentListModule { }

