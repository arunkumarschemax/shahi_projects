import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity } from "typeorm";

@Entity("user")
export class UserEntity extends CommonColumns {
  @Column({
    name: "username",
    length: 100,
  })
  username: string;

  @Column({
    name: "password",
    length: 100,
  })
  password: string;

  @Column({
    name: "factory",
    length: 100,
  })
  factory: string;

  @Column({
    name: "role",
    length: 100,
  })
  role: string;
}
