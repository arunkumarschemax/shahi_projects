import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricEntity } from "../entity/centric.entity";
import { CentricPOTypeEnum, PoOrderFilter } from "@project-management-system/shared-models";


@Injectable()
export class CentricRepository extends Repository<CentricEntity> {

    constructor(@InjectRepository(CentricEntity) private CentricRepo: Repository<CentricEntity>
    ) {
        super(CentricRepo.target, CentricRepo.manager, CentricRepo.queryRunner);
    }

    async getorderData(req?: PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
        if (req.poNumber !== undefined) {
            query.andWhere(`o.po_number ='${req.poNumber}'`)
        }
        if (req.externalRefNo != undefined) {
            query.andWhere(` o.buyer = "${req.externalRefNo}"`)
        }
        if (req.poDateStartDate !== undefined) {
            query.andWhere(`Date(o.po_date) BETWEEN '${req.poDateStartDate}' AND '${req.poDateEndDate}'`)
        }
        if (req.deliveryDateStartDate !== undefined) {
            query.andWhere(`Date(o.delivery_date) BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
        }
        if (req.season !== undefined) {
            query.andWhere(`o.season ='${req.season}'`)
        }
        if (req.exfactoryDateStartDate !== undefined) {
            query.andWhere(`Date(o.exfactory) BETWEEN '${req.exfactoryDateStartDate}' AND '${req.exfactoryDateEndDate}'`)
        }
        if (req.exportDateStartDate !== undefined) {
            query.andWhere(`Date(o.export) BETWEEN '${req.exportDateStartDate}' AND '${req.exportDateEndDate}'`)
        }


        return await query.getRawMany()
    }


    async getDistinctPoNumbers(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT po_number`)

        return await query.getRawMany()
    }


    async getCentricorderData(req?: PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
        if (req.poNumber !== undefined) {
            query.andWhere(`o.po_number ='${req.poNumber}'`)
        }
        if (req.externalRefNo != undefined) {
            query.andWhere(` o.buyer = "${req.externalRefNo}"`)
        }
        query.andWhere(`o.status != 'ACCEPTED'`);
        return await query.getRawMany()
    }

    async getDistinctSeasons(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT season`)

        return await query.getRawMany()
    }

    async getCentricOrderDataByPoFilter(req?: PoOrderFilter, centricPoType?: CentricPOTypeEnum): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
        if (req.poNumber !== undefined) {
            query.andWhere(`o.po_number ='${req.poNumber}'`)
        }
        if (req.externalRefNo != undefined) {
            query.andWhere(` o.buyer = "${req.externalRefNo}"`)
        }
        if (req.poDateStartDate !== undefined) {
            query.andWhere(`Date(o.po_date) BETWEEN '${req.poDateStartDate}' AND '${req.poDateEndDate}'`)
        }
        if (req.deliveryDateStartDate !== undefined) {
            query.andWhere(`Date(o.delivery_date) BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
        }
        if (req.season !== undefined) {
            query.andWhere(`o.season LIKE :season`, { season: `%${req.season}%` });
        }
        if (req.exfactoryDateStartDate !== undefined) {
            query.andWhere(`Date(o.exfactory) BETWEEN '${req.exfactoryDateStartDate}' AND '${req.exfactoryDateEndDate}'`)
        }
        if (req.exportDateStartDate !== undefined) {
            query.andWhere(`Date(o.export) BETWEEN '${req.exportDateStartDate}' AND '${req.exportDateEndDate}'`)
        }
        if (req.color !== undefined) {
            query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
        }
        if (centricPoType && centricPoType === CentricPOTypeEnum.PPK)
            query.andWhere(`o.po_type = 'PPK'`);
        else if (centricPoType && centricPoType === CentricPOTypeEnum.SOLID)
            query.andWhere(`o.po_type = 'SOLID'`);

        return await query.getRawMany()
    }

    async getCentricOrderDataForPPK(req?: PoOrderFilter): Promise<any[]> {
        return this.getCentricOrderDataByPoFilter(req, CentricPOTypeEnum.PPK);
    }

    async getCentricOrderDataForSolidPO(req?: PoOrderFilter): Promise<any[]> {
        return this.getCentricOrderDataByPoFilter(req, CentricPOTypeEnum.SOLID);
    }

    async getCentricorderDataForScanAndPack(req?: PoOrderFilter): Promise<any[]> {
        return this.getCentricOrderDataByPoFilter(req, CentricPOTypeEnum.BOTH);
    }

    async getPoNumberforPPKReport(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT po_number`)
            .where(`o.po_type = 'PPK'`)

        return await query.getRawMany()
    }

    async getPoNumberforSolidReport(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT po_number`)
            .where(`o.po_type = 'SOLID'`)

        return await query.getRawMany()
    }

    async getordercomparationData(req?: PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
        if (req.poNumber !== undefined) {
            query.andWhere(`o.po_number ='${req.poNumber}'`)
        }

        return await query.getRawMany()
    }

}