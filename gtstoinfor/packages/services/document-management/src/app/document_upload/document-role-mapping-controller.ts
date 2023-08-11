import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteDto } from './dto/delete-dto';
import { RoleDto } from './dto/document-role-dto';
import { RoleEntity } from './entities/document-role-entity';
import { DocumentRoleMappingResponseModel,} from "@project-management-system/shared-models";
import { RoleService } from './document_role_mapping.service';

@Controller('roledata')
@ApiTags('roledata')
export class RoleController {
  roleService: any;
  constructor(private readonly service: RoleService) {}

  @Post('createRole')
  async create(@Body() createDto: RoleDto, entity: RoleEntity): Promise<any> {
    console.log(createDto,"controlllllllllllllll")
    return await this.service.create(createDto,entity)
  }

  @Post('getAllRoleNames')
  async getAllRoleNames(): Promise<any> {
    try {
      return await this.service.getAllRoleNames();
    } catch (error) {
      return error;
    }
  }


  @Post('/activateOrDeactivaterole')
  async activateOrDeactivateRole(@Body() req:DeleteDto): Promise<DocumentRoleMappingResponseModel>{
    return await this.service.activateOrDeactivateRole(req);
  }
}
