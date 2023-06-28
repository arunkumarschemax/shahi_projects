import { Repository } from "typeorm";
import { FactoriesEntity } from "../factories.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FactoryRepository extends Repository<FactoriesEntity> {}