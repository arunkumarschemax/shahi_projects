import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersEntity } from "../users.entity";


@Injectable()
export class UsersRepository extends Repository<UsersEntity>{}