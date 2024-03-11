import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');
import * as puppeteer from 'puppeteer';
import { Cron } from "@nestjs/schedule";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { PVHOrdersRepository } from "./repositories/pvh-orders.repo";


@Injectable()
export class PVHService {
  constructor(
    private dataSource: DataSource,
    private PvhOrdersRepo: PVHOrdersRepository,
   

  ) { }

 
}