import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ComponentMappingEntity } from "./component-mapping.entity";
import { Repository } from "typeorm";
import { ComponentMappingDto } from "./dto/component-mapping.dto";
import { ComponentInfoModel, ComponentMappingModel, ComponentMappingResponseModel } from "@project-management-system/shared-models";
import { Style } from "../style/dto/style-entity";
import { GarmentCategory } from "../garment-category/garment-category.entity";
import { Garments } from "../garments/garments.entity";
import { Components } from "../components/components.entity";
import { ComponentMappingRepository } from "./component-mapping-repo";
import { ComponentMappingFilterReq } from "./dto/component-mapping-filter.req";

@Injectable()
export class ComponentMappingService{
    constructor(
        @InjectRepository(ComponentMappingEntity)
        private componentMappingRepo : Repository<ComponentMappingEntity>,
        private repo : ComponentMappingRepository,
        
    ){}

    async createComponentMapping(req:ComponentMappingDto,isUpdate:boolean): Promise<ComponentMappingResponseModel>{
        try{
            const checkStyle = await this.componentMappingRepo.find({where:{styleInfo:{styleId:req.styleId}}})
            if(checkStyle.length > 0){
              return new ComponentMappingResponseModel(false,0,'Style already exists')
            } else {
              for(const rec of req.componentDeatils){
                  const entity = new ComponentMappingEntity()
                  entity.componentMappingId = req.componentMappingId;
                  const styleEntity = new Style()
                  styleEntity.styleId = req.styleId;
                  entity.styleInfo =styleEntity;
                  const garmantCategoryEntity = new GarmentCategory()
                  garmantCategoryEntity.garmentCategoryId = req.garmentCategoryId;
                  entity.garmentcategoryInfo = garmantCategoryEntity;
                  const garmentEntity = new Garments()
                  garmentEntity.garmentId = req.garmentId;
                  entity.garmentInfo = garmentEntity;
                  const componentEntity = new Components()
                  componentEntity.componentId = rec.componentId;
                  entity.componentInfo = componentEntity;
                  if(isUpdate){
                      entity.componentMappingId = req.componentMappingId;
                      entity.updatedUser = req.updatedUser
                  } else {
                      entity.createdUser = req.createdUser
                  }
                  
                  const componentSave = await this.componentMappingRepo.save(entity)
              }
              return new ComponentMappingResponseModel(true,1,'Mapped Successfully')
            }
        } catch(err){
            throw err
        }
    }


  async getMappedComponents(req:ComponentMappingFilterReq): Promise<ComponentMappingResponseModel> {
    try {
      const data = await this.componentMappingRepo.find({where:{styleInfo:{styleId:req.styleId},garmentcategoryInfo:{garmentCategoryId:req.garmentCategoryId},garmentInfo:{garmentId:req.garmentId}},
        relations: ['garmentInfo', 'garmentcategoryInfo', 'styleInfo', 'componentInfo'],
      });
  
      if (data) {
        const groupedData: Record<string, ComponentMappingModel> = {};
  
        for (const rec of data) {
          const key = `${rec.styleInfo.style}-${rec.garmentcategoryInfo.garmentCategory}-${rec.garmentInfo.garmentName}`;
          if (!groupedData[key]) {
            groupedData[key] = {
              componentMappingId: rec.componentMappingId,
              styleId: rec.styleInfo.styleId,
              garmentCategoryId: rec.garmentcategoryInfo.garmentCategoryId,
              garmentId: rec.garmentInfo.garmentId,
              componentDeatils: [],
              createdUser: rec.createdUser,
              updatedUser : rec.updatedUser,
              isActive : rec.isActive,
              versionFlag: rec.versionFlag,
              style: rec.styleInfo.style,
              garmentCategory: rec.garmentcategoryInfo.garmentCategory,
              garment: rec.garmentInfo.garmentName,
            };
          }
          groupedData[key].componentDeatils.push({
            componentId: rec.componentInfo.componentId,
            componentName: rec.componentInfo.componentName,
          });
        }
  
        const info = Object.values(groupedData);
  
       return new ComponentMappingResponseModel(true,1,'Data retrieved',info)

      } else {
        return new ComponentMappingResponseModel(false,1,'Data retrieved',[])

      }
    } catch (err) {
      throw err;
    }
  }

    async getStyleDropDown():Promise<ComponentMappingResponseModel>{
      try{
        // const data = await this.componentMappingRepo.find({select:['styleInfo'],
        //   relations: ['garmentInfo', 'garmentcategoryInfo', 'styleInfo', 'componentInfo'],
        // });
        const data = await this.repo.getStylesDropDown()
        let info = [];
        if(data.length > 0){
          for(const rec of data){
            info.push(new ComponentMappingModel(null,rec.style_id,null,null,[],null,null,null,null,rec.style,null,null,rec.description))

          }
          return new ComponentMappingResponseModel(true,1,'Data retrieved',info)
        } else{
          return new ComponentMappingResponseModel(false,0,'No data found')
        }

      } catch(err){
        throw err
      }
    }

    async getGarmentCategoryDropDown():Promise<ComponentMappingResponseModel>{
      try{
        // const data = await this.componentMappingRepo.find({select:['garmentcategoryInfo'],
        //   relations: ['garmentInfo', 'garmentcategoryInfo', 'styleInfo', 'componentInfo'],
        // });
        const data = await this.repo.getGarmentCategoryDropDown()
        let info = [];
        if(data.length > 0){
          for(const rec of data){
            info.push(new ComponentMappingModel(null,null,rec.garment_category_id,null,[],null,null,null,null,null,rec.garment_category))
  
          }
          return new ComponentMappingResponseModel(true,1,'Data retrieved',info)
        } else{
          return new ComponentMappingResponseModel(false,0,'No data found')
        }
  
      } catch(err){
        throw err
      }
    }

    async getGarmentDropDown():Promise<ComponentMappingResponseModel>{
      try{
        // const data = await this.componentMappingRepo.find({select:['garmentInfo'],
        //   relations: ['garmentInfo', 'garmentcategoryInfo', 'styleInfo', 'componentInfo'],
        // });
        const data = await this.repo.getGarmnetDropDown()
        let info = [];
        if(data.length > 0){
          for(const rec of data){
            info.push(new ComponentMappingModel(null,null,null,rec.garment_id,[],null,null,null,null,null,null,rec.garment_name))
  
          }
          return new ComponentMappingResponseModel(true,1,'Data retrieved',info)
        } else{
          return new ComponentMappingResponseModel(false,0,'No data found')
        }
  
      } catch(err){
        throw err
      }
    }
  



}