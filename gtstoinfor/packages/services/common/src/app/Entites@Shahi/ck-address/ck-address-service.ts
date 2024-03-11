import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Like } from "typeorm";
import { GenericTransactionManager } from "../../../typeorm-transactions";
import { AddressColumns, CommonResponseModel } from "@project-management-system/shared-models";
import { CkAddressRepository } from "./ck-address.repo";
import { CkAddressEntity } from "./ck-address-entity";

@Injectable()
export class CkAddressService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,
        private repo: CkAddressRepository
    ) { }

    async ckSaveAddressInfo(formData: any): Promise<CommonResponseModel> {
        console.log(formData,"ooppp")
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
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
            const difference = columnArray.filter((element) => !AddressColumns.includes(element));
            console.log(difference,"difference")
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
            const deleteData = await transactionManager.getRepository(CkAddressEntity).delete({})
            if (deleteData) {
                flag.add(true)
            } else {
                flag.add(false)
                return new CommonResponseModel(false, 0, 'Something went wrong in data deletion')
            }
            for (const data of convertedData) {
                if (data.Destination != null) {

                    const addObj = new CkAddressEntity()
                    addObj.buyerAddress = data.Buyeraddress
                    addObj.deliveryAddress = data.Deliveryaddress
                    addObj.buyerAddressCode = data.Buyeraddresscode
                    addObj.deliveryAddressCode = data.Deliveryaddresscode
                    addObj.destination = data.Destination
                    const addSave = await transactionManager.getRepository(CkAddressEntity).save(addObj)
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

   
    async getCkAddressInfo(): Promise<CommonResponseModel> {
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

    async getCkAddressInfoByCountry(req: any): Promise<CommonResponseModel> {
        try {
            const info = await this.repo.findOne({
                where: {
                    deliveryAddress: Like(`%${req.country}%`) // Assuming you want to find records where address includes the given string
                }
            })
            if (info) {
                return new CommonResponseModel(true, 1, 'Data retrieved', [info])
            } else {
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
            return new CommonResponseModel(false, 0, 'Something went wrong', err)
        }
    }
}