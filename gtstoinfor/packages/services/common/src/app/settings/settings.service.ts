import { Injectable } from "@nestjs/common";
import { SettingsRepository } from "./settings.repository";
import { BuyersResponseModel, CommonResponseModel, SettingsIdReq, SettingsModel, SettingsRequest, SettingsResponseModel } from "@project-management-system/shared-models";
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
import { ProfitControlHead } from "../profit-control-head/profit-control-head-entity";
import { CoTypes } from "../co-type/co-type.entity";

@Injectable()
export class SettingsService{
    constructor(
        private settingsRepo: SettingsRepository,
    ){}

    async createSettings(req:SettingsRequest,isUpdate:boolean):Promise<SettingsResponseModel>{
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
            const pch = new ProfitControlHead();
            pch.profitControlHeadId = req.pchId;
            settingsEntity.pchInfo = pch;
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
            const coType = new CoTypes()
            coType.coTypeId = req.coTypeId
            settingsEntity.coTypeInfo = coType
            settingsEntity.externalRefNumber = req.externalRefNo
            if(isUpdate){
                settingsEntity.settingsId = req.settingsId
                settingsEntity.updatedUser = req.updatedUser
            } else{
                settingsEntity.createdUser = req.createdUser
            }
            const settingsSave = await this.settingsRepo.save(settingsEntity)
            if(settingsSave){
                const info = new SettingsModel(settingsSave.settingsId,settingsSave.accountControlId,null,settingsSave.companyInfo.companyId,settingsSave.factoryInfo.id,settingsSave.divisionInfo.divisionId,settingsSave.wareHouseInfo.warehouseId,null,settingsSave.currencyInfo.currencyId,settingsSave.licenseTypeInfo.liscenceTypeId,settingsSave.discount,settingsSave.salesPersonId,settingsSave.fabricResponsibleId,settingsSave.itemResponsibleId,settingsSave.trimResponsibleId,settingsSave.addressInfo.addressId,settingsSave.buyerGroup,settingsSave.agent,settingsSave.packageTermsInfo.packageTermsId,settingsSave.paymentMethodInfo.paymentMethodId,settingsSave.paymentTermsInfo.paymentTermsId,settingsSave.deliveryMethodInfo.deliveryMethodId,settingsSave.deliveryTermsInfo.deliveryTermsId,settingsSave.isActive,settingsSave.versionFlag)
                return new SettingsResponseModel(true,0,isUpdate ? 'Updated successfully' : 'Created successfully',[info])
            } else {
                return new SettingsResponseModel(false,1,'Something went wring in settings creation')
            }

        }catch(err){
            throw err
        }
    }

    async getAllSettingsInfo(req:SettingsIdReq):Promise<SettingsResponseModel>{
        try{
            let data: SettingsModel[] =[];
            const info = await this.settingsRepo.getAllSettingsInfo(req)
            if(info){
                for(const rec of info){
                    data.push(new SettingsModel(rec.settings_id,rec.account_control_id,rec.pch_id,rec.company_id,rec.factory_id,rec.division_id,rec.warehouse_id,rec.co_type_id,rec.currency_id,rec.license_type_id,rec.discount,rec.sales_person_id,rec.fabric_responsible_id,rec.item_responsible_id,rec.trim_responsible_id,rec.buyer_address_id,rec.buyer_group,rec.agentId,rec.package_terms_id,rec.payment_method_id,rec.payment_terms_id,rec.delivery_method_id,rec.delivery_terms_id,null,null,rec.accountControlName,rec.profit_control_head,rec.companyName,rec.name,rec.division_name,rec.warehouse_name,rec.currency_name,rec.liscence_type,rec.salesPerson,rec.fabricResponsible,rec.itemResponsible,rec.trimRespondsible,rec.address,rec.buyerName,rec.agentName,rec.package_terms_name,rec.payment_method,rec.payment_terms_name,rec.delivery_method,rec.delivery_terms_name,rec.co_type,rec.landmark,rec.city,rec.state))
                }
                return new SettingsResponseModel(true,1,'Data retrieved',data)
            } else{
                return new SettingsResponseModel(false,0,'No data found')
            }

        }catch(err){
            throw err
        }
    }
}