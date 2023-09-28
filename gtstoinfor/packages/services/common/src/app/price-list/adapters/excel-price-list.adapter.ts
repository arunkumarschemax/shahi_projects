import { priceListExcelDto } from "../../price-list/dto/price-list-excel-dto"
import { PriceListEntity } from "../../price-list/entities/pricelist.entity"


export class PriceListExcelAdapter {

    public convertDtoToEntity(dto: priceListExcelDto,id:number): PriceListEntity {
        const entity = new PriceListEntity()
        entity.year = dto.year
        entity.seasonCode = dto.seasonCode
        entity.item =dto.item
        entity.sampleCode =dto.sampleCode
        entity.business =dto.business
        entity.fobLocalCurrency =dto.fobLocalCurrency
        entity.currency =dto.currency
        entity.createdUser =dto.createdUser
        entity.updatedUser =dto.updatedUser
        // entity.createdAt =dto.createdAt
        // entity.updatedAt =dto.updatedAt
        entity.version =dto.version
        // entity.versionFlag = dto.versionFlag
        entity.fileId = id
        return entity
    }
}