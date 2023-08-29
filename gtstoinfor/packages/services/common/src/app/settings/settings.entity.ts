import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfitControlHead } from "../profit-control-head/profit-control-head-entity";
import { Company } from "../company/company.entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { Division } from "../division/division.entity";

@Entity('settings')
export class Settings {
    @PrimaryGeneratedColumn('increment',{
        name:'settings_id'
    })
    settingsId:number

    @Column('int',{
        name:'account_control_id'
    })
    accountControlId : number

    @Column('int',{
        name:'sales_person_id'
    })
    salesPersonId : number

    @Column('int',{
        name:'fabric_responsible_id'
    })
    fabricResponsibleId : number

    @Column('int',{
        name:'item_responsible_id'
    })
    itemResponsibleId : number

    @Column('int',{
        name:'trim_responsible_id'
    })
    trimResponsibleId : number

    @Column('varchar',{
        name:'buyer_group'
    })
    buyerGroup : string

    @Column('int',{
        name:'agent'
    })
    agent : number

    @Column('int',{
        name:'discount'
    })
    discount : number

    // @ManyToOne(type => ProfitControlHead,pch => pch.settingsInfo,{nullable:true})
    // @JoinColumn({name:'pch_id'})
    // pchInfo: ProfitControlHead

    // @ManyToOne(type => Company,com => com.settingsInfo,{nullable:true})
    // @JoinColumn({name:'company_id'})
    // companyInfo: Company

    // @ManyToOne(type => FactoriesEntity,fac => fac.settingsInfo,{nullable:true})
    // @JoinColumn({name:'factory_id'})
    // factoryInfo: FactoriesEntity

    // @ManyToOne(type => Division,div => div.settingsInfo,{nullable:true})
    // @JoinColumn({name:'division_id'})
    // divisionInfo: Division

    // @ManyToOne(type => ProfitControlHead,pch => pch.settingsInfo,{nullable:true})
    // @JoinColumn({name:'pch_id'})
    // pchInfo: ProfitControlHead

    // @ManyToOne(type => ProfitControlHead,pch => pch.settingsInfo,{nullable:true})
    // @JoinColumn({name:'pch_id'})
    // pchInfo: ProfitControlHead

}