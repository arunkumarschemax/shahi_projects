import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Settings } from "../settings/settings.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { PatternEntity } from "../pattern/pattern.entity";

@Entity('factory')
export class FactoriesEntity extends CommonColumns {
  @Column({
    name: "name",
    length: 100,
  })
  name: string;

  @Column({
    name: "address",
    length: 100,
  })
  address: string;

  @OneToMany(type => Settings, settings => settings.factoryInfo,{cascade: true})
  settingsInfo : Settings

  @OneToMany(type=>StyleOrder, factory=>factory.factoryInfo,{cascade: true})
  styleOrderInfo:StyleOrder;

  @OneToMany(type=> PatternEntity, pattern=> pattern.factoryInfo,{cascade: true})
  patternInfo: PatternEntity
}
