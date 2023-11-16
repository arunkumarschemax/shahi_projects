import { Injectable } from '@nestjs/common';
import { UomRepository } from './dto/uom.repository';
import { UomRequest } from './dto/uom.request';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { UomEntity } from './uom-entity';
import { UomCategoryRequest } from './dto/uom-category-request';
import { UomIdRequest, UomInfoModel, UomResponse } from '@project-management-system/shared-models';


@Injectable()
export class UomService {
    constructor(
        private uomRepo : UomRepository
    ) {

    }

    /**
     * Service to create Uom into the system
     * @param UomRequest request model to create Uom
     * @returns Uom details which are saved , Throws error in case of exception
    */
    async createUom(uomRequest: UomRequest): Promise<UomResponse> {
        try {

            // all the pre required validations should coded at the function starting to avoid duplications etc..
            // validate here like uom already exists or not
            const uom = await this.uomRepo.findOne({select: ['id'], where: {uom: uomRequest.uom}});
            if(uom){
                throw new ErrorResponse(0,'UOM already exists!!!');
            }
            const uomEntity = new UomEntity();
            uomEntity.id = uomRequest.uomId;
            uomEntity.uom = uomRequest.uom;
            uomEntity.uomCategory =uomRequest.uomCategory;
            uomEntity.description = uomRequest.description;
            uomEntity.createdUser = uomRequest.username;
            uomEntity.units = uomRequest.units
            const savedResult = await this.uomRepo.save(uomEntity);
            const uomInfo = new UomInfoModel(savedResult.id,savedResult.uom,savedResult.uomCategory,savedResult.description,savedResult.createdUser);
            return new UomResponse(true, 0, 'Uom created successfully', [uomInfo])
        } catch(err) {
            throw err;
        }
    }

    /**
     * Service to get Uoms into the system
     * @returns All Uoms
     */

    async getAllUoms(): Promise<UomResponse> {
        try{
            const UomDetails = await this.uomRepo.find({order: { uomCategory: 'ASC' }})
            // console.log(UomDetails,'---------------s')
            if(UomDetails.length > 0){
                let uomInfo = [];
                for(const uom of UomDetails){
                    uomInfo.push(new UomInfoModel(uom.id,uom.uom,uom.uomCategory,uom.description,'',uom.units))
                }
                return new UomResponse(true,0,'All locations retrieved successfully',uomInfo)
            } else {
                return new UomResponse(false,1,'No data found',[])
            }
        } catch(err) {
            throw err
        }
    }

    async getAllActiveUoms(): Promise<UomResponse>{
        try{
            //get all Uoms
            const uoms = await this.uomRepo.find({where : {isActive:true}})
            let uomdetails =[]
            if(uoms){
                for (const uom of uoms){
                uomdetails.push(new UomInfoModel(uom.id, uom.uom, uom.uomCategory, uom.description, uom.createdUser,uom.units))
                }
            }
            return new UomResponse(true, 0, 'Uoms retrived successfully',uomdetails )
        }catch(err) {
            throw err;
        }
    }

    async getUomById(req:UomIdRequest): Promise<UomResponse>{
        try{
            //get all Uoms
            const uomDetails = await this.uomRepo.findOne({ where: { id: req.uomId, isActive: true } })
            if (uomDetails) {
                const uomInfo = new UomInfoModel(uomDetails.id, uomDetails.uom, uomDetails.uomCategory,uomDetails.description, uomDetails.createdUser,uomDetails.units)
                return new UomResponse(true, 0, 'UOM details retrieved successfully', [uomInfo])
            } else {
                return new UomResponse(false, 1, 'No data found',[])
            }

        } catch (err) {
            throw err;
        }
    }

    async getUomByCategory(req: UomCategoryRequest): Promise<UomResponse> {
        try {
            const uomDetails = await this.uomRepo.find({ where: { uomCategory: req.uomCategory, isActive: true } });
            if (uomDetails.length > 0) {
                const uomInfoArray = uomDetails.map(uom => new UomInfoModel(uom.id, uom.uom, uom.uomCategory, uom.description, uom.createdUser));
                return new UomResponse(true, 0, 'UOM Category retrieved successfully', uomInfoArray);
            } else {
                return new UomResponse(false, 1, 'No data found', []);
            }
        } catch (err) {
            throw err;
        }
    }
    



}
