import { Injectable } from "@nestjs/common";
import { RmSKusRepository } from "./rm-sku.repo";

@Injectable()
export class RmSkusService {
    constructor(
        private repo : RmSKusRepository
    ) { }
}