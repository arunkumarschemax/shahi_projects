import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { M3TrimsEntity } from "./m3-trims.entity";
import { CategoryMappingEntity } from "./m3-trims-category-mapping.entity";
import { CommonResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class M3TrimsCategoryMappingRepo extends Repository<CategoryMappingEntity> {

    constructor(@InjectRepository(CategoryMappingEntity) 
        private categoryMappingEntity: Repository<CategoryMappingEntity>,
        public dataSource: DataSource
    ) {
        super(categoryMappingEntity.target, categoryMappingEntity.manager, categoryMappingEntity.queryRunner);
    }

    async getAllHolesByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.hole_id AS holeId, h.hole AS hole from category_mapping cm left join hole h on h.hole_id = cm.hole_id where trim_category =`+req+` and cm.hole_id IS NOT NULL order by h.hole ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

    async getAllCategoriesByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.category_id AS categoryId, c.category AS category from category_mapping cm left join category c on c.category_id = cm.category_id where trim_category =`+req+` and cm.category_id IS NOT NULL order by c.category ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

    async getAllColorsByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.color_id AS colorId, c.colour AS colour from category_mapping cm left join colour c on c.colour_id = cm.color_id where trim_category =`+req+` and cm.color_id IS NOT NULL order by c.colour ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

    async getAllContentByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.content_id AS contentId, c.content AS content from category_mapping cm left join content c on c.content_id = cm.content_id where trim_category =`+req+` and cm.content_id IS NOT NULL order by c.content ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

    async getAllFinishByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.finish_id AS finishId, f.finish AS finish from category_mapping cm left join finish f on f.finish_id = cm.finish_id where trim_category =`+req+` and cm.finish_id IS NOT NULL order by f.finish ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

    async getAllQualitiesByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.quality_id AS qualityId, f.quality AS quality from category_mapping cm left join quality f on f.quality_Id = cm.quality_id where trim_category =`+req+` and cm.quality_id IS NOT NULL order by f.quality ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

    async getAllStructureByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.structure_id AS structureId, f.structure AS structure from category_mapping cm left join structure f on f.structure_id = cm.structure_id where trim_category =`+req+` and cm.structure_id IS NOT NULL order by f.structure ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

    async getAllThicknessByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.thickness_id AS thicknessId, f.thickness AS thickness from category_mapping cm left join thickness f on f.thickness_id = cm.thickness_id where trim_category =`+req+` and cm.thickness_id IS NOT NULL order by f.thickness ASC`;
            console.log(query);

            const data = await this.dataSource.query(query)
            console.log(data);
            if(data.length > 0){
                return new CommonResponseModel(true,1001,"Data retrived successfully. ",data);
            }
            else{
                return new CommonResponseModel(false,1010,"No data found. ",);
            }
        }   
        catch (err) {
            return err;
          }
    }

}