import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiSizeMatrix } from "../entittes/apa-size-matrix-entitys";
import { StyleNumReq } from "@project-management-system/shared-models";

@Injectable()
export class ApiSizeMatrixRepo extends Repository<ApiSizeMatrix> {
    constructor(@InjectRepository(ApiSizeMatrix) private ApiSizeMatrix: Repository<ApiSizeMatrix>
    ) {
        super(ApiSizeMatrix.target, ApiSizeMatrix.manager, ApiSizeMatrix.queryRunner);
    }

    
    async getApaSizeMatrixData(req:StyleNumReq): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('s')
            .select(`id,fd_of as fdOf,buy_month AS buyMonth,style_number AS styleNumber,style_type AS styleType,usa_size AS usaSize,china_size_matrixtype AS chinaSizeMatrixType,   china_top_size AS chinaTopSize,china_top_bodysize AS chinaTopBodySize,china_bottom_size AS chinaBottomSize,china_bottom_bodysize AS chinabottomBodySize,           korea_size_matrixtype AS koreaSizeMatrixType,korea_top_generic AS koreaTopGeneric,korea_top_chest AS koreaTopChest,            korea_top_height AS koreaTopHeight,korea_bottom_generic AS koreaBottomGeneric,korea_bottom_waist AS koreaBottomWaist,korea_bottom_hip AS koreaBottomHip`)
            .where(`style_number IN (:...poLine)`, { poLine: req.styleNumber })
        return await queryBuilder.getRawMany()
    }
}
