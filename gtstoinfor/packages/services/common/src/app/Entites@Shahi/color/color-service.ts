import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Like } from "typeorm";
import { ColorRepository } from "./color.repo";
import { GenericTransactionManager } from "../../../typeorm-transactions";
import {  ColorColumns, CommonResponseModel } from "@project-management-system/shared-models";
import { ColorEntity } from "./color-entity";

@Injectable()
export class ColorService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,
        private repo: ColorRepository
    ) { }

    async saveColorInfo(formData: any): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
            await transactionManager.startTransaction()
            const flag = new Set<boolean>()
            const columnArray = []
            const updatedArray = formData.map((obj) => {
                const updatedObj = {}
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '').replace(/[\(\)\.]/g, '').replace(/-/g, '').replace(/#/g, '');
                    if (newKey != '') {
                        columnArray.push(newKey);
                        updatedObj[newKey] = obj[key];
                    }
                }
                return updatedObj;
            })
            const difference = columnArray.filter((element) => !ColorColumns.includes(element));
            console.log(difference,"diff")
            if (difference.length > 0) {
                await transactionManager.releaseTransaction();
                return new CommonResponseModel(false, 1110, "Excel columns doesn't match. Please attach the correct file.");
            }

            const convertedData = updatedArray.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    const value = obj[key];
                    if (value === "") {
                        updatedObj[key] = null;
                    } else {
                        updatedObj[key] = value;
                    }
                }
                return updatedObj;
            });
            const deleteData = await transactionManager.getRepository(ColorEntity).delete({})
            if (deleteData) {
                flag.add(true)
            } else {
                flag.add(false)
                return new CommonResponseModel(false, 0, 'Something went wrong in data deletion')
            }
            for (const data of convertedData) {
                  console.log(data,"iiiiii")
                if (data) {
                    const addObj = new ColorEntity()
                    addObj.poNumber = data.PONumber
                    addObj.style = data.Style
                    addObj.rlField= data.RLField
                    addObj.crmField = data.CRMField
    
                    const addSave = await transactionManager.getRepository(ColorEntity).save(addObj)
                    if (addSave) {
                        flag.add(true)
                    } else {
                        flag.add(false)
                        await transactionManager.releaseTransaction();
                        break;
                    }
                } 
            }
            if (!flag.has(false)) {
                await transactionManager.completeTransaction();
                return new CommonResponseModel(true, 1, 'Data saved successfully');
            } else {
                await transactionManager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong');
            }
        } catch (err) {
            await transactionManager.releaseTransaction();
            return new CommonResponseModel(false, 0, 'Something went wrong');
        }
    }

    async getColorInfo(): Promise<CommonResponseModel> {
        try {
            const info = await this.repo.find()
            if (info) {
                return new CommonResponseModel(true, 1, 'Data retrieved', info)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            return new CommonResponseModel(false, 0, 'Something went wrong', err)
        }
    }


}