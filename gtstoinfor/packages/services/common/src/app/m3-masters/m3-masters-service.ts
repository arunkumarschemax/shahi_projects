import { Injectable } from "@nestjs/common";
import { M3MastersRepository } from "./m3-masters.repo";
import { DataSource } from "typeorm";
import { M3MastersCategoryReq, M3MastersModel, M3MastersReq, M3MastersResponseModel } from "@project-management-system/shared-models";
import { M3MastersEntity } from "./m3-masters.entity";

@Injectable()
export class M3MastersService{
    constructor(
        private repo: M3MastersRepository,
        private readonly dataSource: DataSource,
        
    ){}

    async create(req:M3MastersReq,isUpdate:boolean):Promise<M3MastersResponseModel>{
        try{
            const entity = new M3MastersEntity()
            entity.category = req.category;
            entity.m3Code = req.m3Code;
            if(isUpdate){
                entity.m3Id = req.m3Id
            }
            const save = await this.repo.save(entity)
            if(save){
                const info = new M3MastersModel(save.m3Id,save.category,save.m3Code,save.isActive,save.versionFlag)
                return new M3MastersResponseModel(true,1,'Created Successfully',[info])
            } else{
                return new M3MastersResponseModel(false,0,'Something went wrong')
            }
        }catch(err){
            throw err
        }
    }

    async getAll():Promise<M3MastersResponseModel>{
        try{
            const data = await this.repo.find();
            let info = [];
            if(data.length > 0){
                for(const rec of data){
                    info.push(new M3MastersModel(rec.m3Id,rec.category,rec.m3Code,rec.isActive,rec.versionFlag))
                }
                return new M3MastersResponseModel(true,1,'Data retrieved',info)
            } else{
                return new M3MastersResponseModel(false,1,'No Data Found')
            }

        }catch(err){
            throw err
        }
    }

    async getByCategory(req:M3MastersCategoryReq):Promise<M3MastersResponseModel>{
        try{
            const data = await this.repo.find({where:{category:req.category}});
            let info = [];
            if(data.length > 0){
                for(const rec of data){
                    info.push(new M3MastersModel(rec.m3Id,rec.category,rec.m3Code,rec.isActive,rec.versionFlag))
                }
                return new M3MastersResponseModel(true,1,'Data retrieved',info)
            } else{
                return new M3MastersResponseModel(false,1,'No Data Found')
            }

        }catch(err){
            throw err
        }
    }
}