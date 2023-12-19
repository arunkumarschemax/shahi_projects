import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AddressRepository } from "./address.repo";
import { GenericTransactionManager } from "../../../typeorm-transactions";
import { AddressColumns, CommonResponseModel } from "@project-management-system/shared-models";
import { AddressEntity } from "./address-entity";

@Injectable()
export class AddressService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,
        private repo: AddressRepository
    ) { }

    async saveAddressInfo(formData: any): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
            console.log(formData,"ffffff")
            await transactionManager.startTransaction()
            const flag = new Set<boolean>()
            const columnArray = []
            const updatedArray = formData.map((obj) => {
                const updatedObj = {}
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '').replace(/[\(\)\.]/g, '').replace(/-/g, '');
                    if (newKey != '') {
                        columnArray.push(newKey);
                        updatedObj[newKey] = obj[key];
                    }
                }
                return updatedObj;
            })
         
            console.log(updatedArray,"iiiii")
            const difference = columnArray.filter((element) => !AddressColumns.includes(element));
            console.log(difference, '----')
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
            const deleteData = await transactionManager.getRepository(AddressEntity).delete({})
            if (deleteData) {
                flag.add(true)
            } else {
                flag.add(false)
                return new CommonResponseModel(false, 0, 'Something went wrong in data deletion')
            }
            for (const data of convertedData) {
                const match = data.BUYERADDCRM.match(/^\d+/);
                const match1 = data.DELIVERYADDCRM.match(/^\d+/);
                const result = match ? parseInt(match[0], 10) : null;
                const result1 = match1 ? parseInt(match1[0], 10) : null;

                if (data.BILLTO != null) {
                    const addObj = new AddressEntity()
                    addObj.billTo = data.BILLTO
                    addObj.shipTo= data.SHIPTO
                    addObj.buyerAddress = data.BUYERADDCRM
                    addObj.deliveryAddress = data.DELIVERYADDCRM
                    addObj.buyerCode = result
                    addObj.deliveryCode = result1
                    const addSave = await transactionManager.getRepository(AddressEntity).save(addObj)
                    if (addSave) {
                        flag.add(true)
                    } else {
                        flag.add(false)
                        await transactionManager.releaseTransaction();
                        break;
                    }
                } else {
                    break
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

    async getAddressInfo(): Promise<CommonResponseModel> {
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

    // async getAddressInfoByCountry(req: any): Promise<AddressResponseModel> {
    //     try {
    //         const info = await this.repo.findOne({ where: { country: req.country } })
    //         if (info) {
    //             return new AddressResponseModel(true, 1, 'Data retrieved', [info])
    //         } else {
    //             return new AddressResponseModel(false, 0, 'No data found')
    //         }
    //     } catch (err) {
    //         return new AddressResponseModel(false, 0, 'Something went wrong', err)
    //     }
    // }
}