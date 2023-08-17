import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";
import { FileIdReq } from "../../orders/models/file-id.req";

@Injectable()
export class DpomDifferenceRepository extends Repository<DpomDifferenceEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomDifferenceEntity) private dpomDifferenceRepository: Repository<DpomDifferenceEntity>
    ) {
        super(dpomDifferenceRepository.target, dpomDifferenceRepository.manager, dpomDifferenceRepository.queryRunner);
    }

    async deleteDiffData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('oc');
        queryBuilder.where(`file_id = '${req.fileId}'`);
        await queryBuilder.delete().execute();
    }

}