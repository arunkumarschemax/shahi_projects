
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Settings } from './settings.entity';
import { Company } from '../company/company.entity';
import { FactoriesEntity } from '../factories/factories.entity';
import { Division } from '../division/division.entity';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Currencies } from '../currencies/currencies.entity';
import { LiscenceType } from '../liscence-type/liscence-type.entity';
import { PackageTerms } from '../packages-terms/package-terms.entity';
import { PaymentMethod } from '../payment-methods/payment-method-entity';
import { PaymentTerms } from '../payment-terms/payment-terms.entity';
import { DeliveryMethod } from '../delivery-method/delivery-method.entity';
import { DeliveryTerms } from '../delivery-terms/delivery-terms.entity';
import { Address } from '../buyers/address.entity';
import { EmplyeeDetails } from '../employee-details/dto/employee-details-entity';

@Injectable()
export class SettingsRepository extends Repository<Settings> {

    constructor(@InjectRepository(Settings) private settingsRepo: Repository<Settings>
    ) {
        super(settingsRepo.target, settingsRepo.manager, settingsRepo.queryRunner);
    }

    async getAllSettingsInfo():Promise<any>{
        const data = await this.createQueryBuilder('s')
        .select(`s.settings_id,s.buyer_group,s.discount,com.company_name,fac.name,div.division_name,wh.warehouse_name,c.currency_name,lic.liscence_type,pact.package_terms_name,paym.payment_method,payt.payment_terms_name,devm.delivery_method,devt.delivery_terms_name,acc.first_name as accountControlName,sal.first_name as salesPerson,fab.first_name as fabricResponsible,item.first_name as itemResponsible,trim.first_name as trimRespondsible,agent.first_name as agent`)
        .leftJoin(Company,'com',`com.company_id = s.company_id`)
        .leftJoin(FactoriesEntity,'fac',`fac.id = s.factory_id`)
        .leftJoin(Division,'div',`div.division_id = s.division_id`)
        .leftJoin(Warehouse,'wh',`wh.warehouse_id = s.warehouse_id`)
        .leftJoin(Currencies,'c',`c.currency_id = s.currency_id`)
        .leftJoin(LiscenceType,'lic','lic.liscence_type_id = s.license_type_id')
        .leftJoin(PackageTerms,'pact','pact.package_terms_id = s.package_terms_id')
        .leftJoin(PaymentMethod,'paym','paym.payment_method_id = s.payment_method_id')
        .leftJoin(PaymentTerms,'payt','payt.payment_terms_id = s.payment_terms_id')
        .leftJoin(DeliveryMethod,'devm','devm.delivery_method_id = s.delivery_method_id')
        .leftJoin(DeliveryTerms,'devt','devt.delivery_terms_id = s.delivery_terms_id')
        .leftJoin(Address,'add','add.address_id = s.buyer_address_id')
        .leftJoin(EmplyeeDetails,'acc','acc.employee_id = s.account_control_id')
        .leftJoin(EmplyeeDetails,'sal','sal.employee_id = s.sales_person_id')
        .leftJoin(EmplyeeDetails,'fab','fab.employee_id = s.fabric_responsible_id')
        .leftJoin(EmplyeeDetails,'item','item.employee_id = s.item_responsible_id')
        .leftJoin(EmplyeeDetails,'trim','trim.employee_id = s.trim_responsible_id')
        .leftJoin(EmplyeeDetails,'agent','agent.employee_id = s.agent')
        .orderBy(`s.settings_id`)
        return data.getRawMany()

        
    }

}