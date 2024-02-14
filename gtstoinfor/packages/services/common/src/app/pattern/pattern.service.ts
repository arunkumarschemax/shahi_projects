import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PatternEntity } from "./pattern.entity";
import { PatternDto } from "./pattern.dto";
import { FactoriesEntity } from "../factories/factories.entity";

@Injectable()
export class PatternService{
    constructor(
        @InjectRepository(PatternEntity)
        private repo : Repository<PatternEntity>,
        private readonly dataSource: DataSource,

    ) {}

    async getAllActivePatterns():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{patternName:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }
    
    async getAllPatterns():Promise<CommonResponseModel>{
        try{
            let query = `SELECT p.*,f.name
            FROM pattern p
            LEFT JOIN factory f ON f.id = p.factory_location_id
            ORDER BY p.pattern_name`
            const data = await this.dataSource.query(query)

            // const data = await this.repo.find({order:{patternName:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createPattern(dto: PatternDto, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
            console.log(dto,'9999999999999999999999999999')
            if (!isUpdate) {
                const existing = await this.repo.findOne({ where: { patternName: dto.patternName } });
                if (existing) {
                    throw new Error('Pattern already exists');
                }
            }
            
            const entityData = new PatternEntity();
            entityData.patternName = dto.patternName
            entityData.email = dto.email
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            entityData.factoryLocationId = dto.factoryLocationId

            if (isUpdate) {
                entityData.patternId = dto.patternId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            console.log(entityData,'&&&&&&&&&&&&&&&&&&&&')
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Pattern updated successfully' : 'Pattern created successfully', data);
        } catch (err) {
            throw err;
        }
    }

    async activateDeactivatePattern(req: PatternDto): Promise<CommonResponseModel> {
        try {
            const finish = await this.repo.findOne({ where: { patternId: req.patternId } });
            if (!finish) throw new CommonResponseModel(false, 99998, 'No Records Found');
            
            const message = finish.isActive === req.isActive ? `already ${req.isActive ? 'activated' : 'deactivated'}` : `successfully ${req.isActive ? 'activated' : 'deactivated'}`;
            const responseCode = finish.isActive === req.isActive ? req.isActive ? 10112 : 10115 : req.isActive ? 10114 : 10115;
    
            await this.repo.update({ patternId: req.patternId }, { isActive: req.isActive, updatedUser: req.updatedUser });
    
            return new CommonResponseModel(true, responseCode, `Pattern is ${message}`);
        } catch (err) {
            return err;
        }
    }
    
    
    

}