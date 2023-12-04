import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { AddressColumns, AddressReq, AddressResponseModel } from "@project-management-system/shared-models";
import { DataSource } from "typeorm";
import { AddressEntity } from "./address.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { AddressRepository } from "./address.repo";

@Injectable()
export class AddressService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,
        private repo: AddressRepository
    ) { }

    async saveAddressInfo(formData: any): Promise<AddressResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
            await transactionManager.startTransaction()
            const flag = new Set<boolean>()
            const columnArray = []
            const updatedArray = formData.map((obj) => {
                const updatedObj = {}
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '_').replace(/[\(\)\.]/g, '').replace(/-/g, '_');
                    if (newKey != '') {
                        columnArray.push(newKey);
                        updatedObj[newKey] = obj[key];
                    }
                }
                return updatedObj;
            })
            const difference = columnArray.filter((element) => !AddressColumns.includes(element));
            console.log(difference, '----')
            if (difference.length > 0) {
                await transactionManager.releaseTransaction();
                return new AddressResponseModel(false, 1110, `Excel columns doesn't match. Please attach the correct file.`);
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
                return new AddressResponseModel(false, 0, 'Something wwent wrong in data deletion')
            }
            for (const data of convertedData) {
                // let dtoData
                if (data.Country != null) {
                    // dtoData = new AddressReq(data.Country,data.delivary_address,data.Buyeraddress,'admin')
                    const addObj = new AddressEntity()
                    addObj.country = data.Country
                    addObj.deliveryAddress = data.Delivary_address
                    addObj.buyerAddress = data.Buyeradderss
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
                return new AddressResponseModel(true, 1, 'Data saved successfully');
            } else {
                await transactionManager.releaseTransaction();
                return new AddressResponseModel(false, 0, 'Something went wrong');
            }
        } catch (err) {
            await transactionManager.releaseTransaction();
            return new AddressResponseModel(false, 0, 'Something went wrong');
        }
    }

    async getAddressInfo(): Promise<AddressResponseModel> {
        try {
            const info = await this.repo.find()
            if (info) {
                return new AddressResponseModel(true, 1, 'Data retrieved', info)
            } else {
                return new AddressResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            return new AddressResponseModel(false, 0, 'Something went wrong', err)
        }
    }

    async getAddressInfoByCountry(req: any): Promise<AddressResponseModel> {
        try {
            const info = await this.repo.findOne({ where: { country: req.country } })
            if (info) {
                return new AddressResponseModel(true, 1, 'Data retrieved', [info])
            } else {
                return new AddressResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            return new AddressResponseModel(false, 0, 'Something went wrong', err)
        }
    }
}























































































































































































































































































































































































































































































































































































































