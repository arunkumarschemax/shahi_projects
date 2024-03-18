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

    async getAllTypeByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.type_id AS typeId, f.type AS type from category_mapping cm left join type f on f.type_id = cm.type_id where trim_category =`+req+` and cm.type_id IS NOT NULL order by f.type ASC`;
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

    async getAllUomByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.uom_id AS uomId, f.uom AS uom from category_mapping cm left join uom f on f.id = cm.uom_id where trim_category =`+req+` and cm.uom_id IS NOT NULL order by f.uom ASC`;
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

    async getAllVarietyByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.variety_id AS uomId, f.variety AS variety from category_mapping cm left join variety f on f.variety_id = cm.variety_id where trim_category =`+req+` and cm.variety_id IS NOT NULL order by f.variety ASC`;
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

    async getAllLogoByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.logo_id AS uomId, f.logo AS logo from category_mapping cm left join logo f on f.logo_id = cm.logo_id where trim_category =`+req+` and cm.logo_id IS NOT NULL order by f.logo ASC`;
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

    async getAllTrimBuyersByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.buyer_id AS buyerId, f.trim_buyer AS buyer from category_mapping cm left join trim_buyer f on f.trim_buyer_id = cm.buyer_id where trim_category =`+req+` and cm.buyer_id IS NOT NULL order by f.trim_buyer ASC`;
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

    async getAllTrimSizeByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.size_id AS sizeId, f.trim_size AS size from category_mapping cm left join trim_size f on f.trim_size_id = cm.size_id where trim_category =`+req+` and cm.size_id IS NOT NULL order by f.trim_size ASC`;
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

    async getAllTrimLengthByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.length_id AS lengthId, f.length AS length from category_mapping cm left join length f on f.length_id = cm.length_id where trim_category =`+req+` and cm.length_id IS NOT NULL order by f.length ASC`;
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

    async getAllTrimLineByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.line_id AS lineId, f.line AS line from category_mapping cm left join line f on f.line_id = cm.line_id where trim_category =`+req+` and cm.line_id IS NOT NULL order by f.line ASC`;
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
    async getAllPartsByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.parts_id AS partsId, f.parts AS parts from category_mapping cm left join parts f on f.parts_id = cm.parts_id where trim_category =`+req+` and cm.parts_id IS NOT NULL order by f.parts ASC`;
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

    async getAllPlyByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.ply_id AS plyId, f.ply AS ply from category_mapping cm left join ply f on f.ply_id = cm.ply_id where trim_category =`+req+` and cm.ply_id IS NOT NULL order by f.ply ASC`;
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

    async getAllShapeByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.shape_id AS shapeId, f.shape AS shape from category_mapping cm left join shape f on f.shape_id = cm.shape_id where trim_category =`+req+` and cm.shape_id IS NOT NULL order by f.shape ASC`;
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

    async getAllSlidersByCategory(req:number): Promise<CommonResponseModel> {
        try{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

            let query = `Select cm.slider_id AS sliderId, f.slider AS slider from category_mapping cm left join slider f on f.slider_id = cm.slider_id where trim_category =`+req+` and cm.slider_id IS NOT NULL order by f.slider ASC`;
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