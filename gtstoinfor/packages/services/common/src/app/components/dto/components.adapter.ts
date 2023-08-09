import {Injectable} from '@nestjs/common';
import { ComponentsDTO } from './components.dto';
import { Components } from '../components.entity';

@Injectable()
export class ComponentsAdapter {
    /**
     * 
     * @param DeliveryMethodDTO 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(  componentsDto: ComponentsDTO,  isUpdate: boolean = false ): Components {
        const components = new Components();
        components.componentName = componentsDto.componentName;
        components.isActive = componentsDto.isActive == undefined?true:componentsDto.isActive;
        if (isUpdate) {
            components.componentId = componentsDto.componentId;
            components.updatedUser = componentsDto.updatedUser;
        } else {
            components.isActive = true;
            components.createdUser = componentsDto.createdUser;
        }
       return components;
      }
      
      public convertEntityToDto(componentData: Components): ComponentsDTO {
        const componentsDto = new ComponentsDTO;
        componentsDto.componentId = componentData.componentId;
        componentsDto.componentName = componentData.componentName;
        componentsDto.isActive = componentData.isActive;
        componentsDto.createdAt = componentData.createdAt;
        componentsDto.updatedAt = componentData.updatedAt;
        componentsDto.createdUser = componentData.createdUser;
        componentsDto.updatedUser = componentData.updatedUser;
        componentsDto.versionFlag = componentData.versionFlag;
        return componentsDto;
      }
}