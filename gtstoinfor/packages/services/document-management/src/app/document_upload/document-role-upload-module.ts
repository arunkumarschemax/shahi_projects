import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentService } from './document.service';
import { DocumentEntity } from './entities/documents.entity';
// import { DocumentController } from './document_upload.controller';
import { RoleEntity } from './entities/document-role-entity';
import { RoleController } from './document-role-mapping-controller';
import { RoleService } from './document_role_mapping.service';
@Module({

  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService,],
})
export class RoleModule {}