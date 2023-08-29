import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Settings } from "../settings/settings.entity";

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
}
