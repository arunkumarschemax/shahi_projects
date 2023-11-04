import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { ItemCreFilterRequest, RMCreFilterRequest } from "@project-management-system/shared-models";
import { RmCreationEntity } from "./rm-items.entity";



@Injectable()
export class RmCreationRepository extends Repository<RmCreationEntity> {
    constructor(@InjectRepository(RmCreationEntity) private repo: Repository<RmCreationEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllRmCrted(req: RMCreFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('rm_item')
        .select(`*`).where('1=1'); 
      
        if (req.itemGroup !== undefined) {
          query.andWhere(`item_group_id = :itemGP`, { itemGP: req.itemGroup }); 
        }
        if (req.Currency !== undefined) {
            query.andWhere(`currency_id = Currency`, {Currency: req.Currency }); 
          }
          if (req.itemType !== undefined) {
            query.andWhere(`brand_id = :brandId`, { brandId: req.itemType }); 
          }
          if (req.productGroup !== undefined) {
            query.andWhere(`product_group_id = :brandId`, { brandId: req.productGroup }); 
          }
          if (req.procurementGroup !== undefined) {
            query.andWhere(`procurement_gorup_id = :brandId`, { brandId: req.procurementGroup }); 
          }
          
      
        let data:RmCreationEntity[] = await query.getRawMany();
        return data;
      }


      
}
