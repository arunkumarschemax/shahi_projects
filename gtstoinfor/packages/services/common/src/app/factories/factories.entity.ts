import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity } from "typeorm";

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
}
