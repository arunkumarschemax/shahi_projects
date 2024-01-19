import { Injectable } from "@nestjs/common";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";
import { SanmarOrdersRepository } from "./repositories/sanmar-orders.repo";

@Injectable()
export class SanmarService {


  constructor(
    private dataSource: DataSource,
    private SanOrdersRepo: SanmarOrdersRepository,


  ) { }



}