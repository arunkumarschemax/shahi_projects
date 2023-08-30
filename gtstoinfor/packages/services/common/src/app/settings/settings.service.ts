import { Injectable } from "@nestjs/common";
import { SettingsRepository } from "./settings.repository";
import { CommonResponseModel, SettingsModel, SettingsRequest, SettingsResponseModel } from "@project-management-system/shared-models";
import { Settings } from "./settings.entity";
import { Company } from "../company/company.entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { Division } from "../division/division.entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { Currencies } from "../currencies/currencies.entity";
import { LiscenceType } from "../liscence-type/liscence-type.entity";
import { PackageTerms } from "../packages-terms/package-terms.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { DeliveryMethod } from "../delivery-method/delivery-method.entity";
import { DeliveryTerms } from "../delivery-terms/delivery-terms.entity";
import { Address } from "../buyers/address.entity";

@Injectable()
export class SettingsService{
    constructor(
        private settingsRepo: SettingsRepository,
    ){}

    async createSettings(req:SettingsRequest):Promise<SettingsResponseModel>{
        try{
            const settingsEntity = new Settings()
            settingsEntity.accountControlId = req.accountControlId;
            settingsEntity.salesPersonId = req.salesPersonId;
            settingsEntity.fabricResponsibleId = req.fabricResponsibleId;
            settingsEntity.itemResponsibleId = req.itemResponsibleId;
            settingsEntity.trimResponsibleId = req.trimResponsibleId;
            settingsEntity.buyerGroup = req.buyerGroup;
            settingsEntity.agent = req.agent;
            settingsEntity.discount = req.discount;
            const company = new Company();
            company.companyId = req.companyId;
            settingsEntity.companyInfo = company;
            const factory = new FactoriesEntity();
            factory.id = req.facilityId;
            settingsEntity.factoryInfo = factory;
            const division = new Division();
            division.divisionId = req.divisionId;
            settingsEntity.divisionInfo = division;
            const warehouse = new Warehouse();
            warehouse.warehouseId = req.warehouseId;
            settingsEntity.wareHouseInfo = warehouse;
            const currency = new Currencies();
            currency.currencyId = req.currencyId;
            settingsEntity.currencyInfo = currency;
            const license = new LiscenceType();
            license.liscenceTypeId = req.licencetypeId;
            settingsEntity.licenseTypeInfo = license;
            const packageTerms = new PackageTerms();
            packageTerms.packageTermsId = req.packageTerms;
            settingsEntity.packageTermsInfo = packageTerms;
            const paymentMethod = new PaymentMethod()
            paymentMethod.paymentMethodId = req.paymentMethod
            settingsEntity.paymentMethodInfo = paymentMethod;
            const paymentTerms = new PaymentTerms()
            paymentTerms.paymentTermsId = req.paymentTerms
            settingsEntity.paymentTermsInfo = paymentTerms;
            const deliveryMethod = new DeliveryMethod()
            deliveryMethod.deliveryMethodId = req.deliveryMethod;
            settingsEntity.deliveryMethodInfo = deliveryMethod;
            const deliveryTerms = new DeliveryTerms()
            deliveryTerms.deliveryTermsId = req.deliveryTerms;
            settingsEntity.deliveryTermsInfo = deliveryTerms;
            const address = new Address()
            address.addressId = req.buyerAddress;
            settingsEntity.addressInfo = address;
            const settingsSave = await this.settingsRepo.save(settingsEntity)
            if(settingsSave){
                const info = new SettingsModel(settingsSave.settingsId,settingsSave.accountControlId,null,settingsSave.companyInfo.companyId,settingsSave.factoryInfo.id,settingsSave.divisionInfo.divisionId,settingsSave.wareHouseInfo.warehouseId,null,settingsSave.currencyInfo.currencyId,settingsSave.licenseTypeInfo.liscenceTypeId,settingsSave.discount,settingsSave.salesPersonId,settingsSave.fabricResponsibleId,settingsSave.itemResponsibleId,settingsSave.trimResponsibleId,settingsSave.addressInfo.addressId,settingsSave.buyerGroup,settingsSave.agent,settingsSave.packageTermsInfo.packageTermsId,settingsSave.paymentMethodInfo.paymentMethodId,settingsSave.paymentTermsInfo.paymentTermsId,settingsSave.deliveryMethodInfo.deliveryMethodId,settingsSave.deliveryTermsInfo.deliveryTermsId,settingsSave.isActive,settingsSave.versionFlag)
                return new SettingsResponseModel(true,0,'Created successfully',info)
            } else {
                return new SettingsResponseModel(false,1,'Something went wring in settings creation')
            }

        }catch(err){
            throw err
        }
    }

    async getAllSettingsInfo():Promise<CommonResponseModel>{
        try{
            const info = await this.settingsRepo.getAllSettingsInfo()
            if(info){
                return new CommonResponseModel(true,1,'Data retrieved',info)
            } else{
                return new CommonResponseModel(false,0,'No data found')
            }

        }catch(err){
            throw err
        }
    }
}