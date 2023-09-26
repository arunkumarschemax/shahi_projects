import { priceListExcelDto } from "../../price-list/dto/price-list-excel-dto"
import { PriceListEntity } from "../../price-list/entities/pricelist.entity"


export class PriceListExcelAdapter {

    public convertDtoToEntity(dto: priceListExcelDto): PriceListEntity {
        console.log(dto,'llllll')
        const entity = new PriceListEntity()
        entity.year = dto.year
        entity.seasonCode = dto.seasonCode
        entity.item =dto.item
        entity.style =dto.style
        entity.destination =dto.destination
        entity.price =dto.price
        entity.currency =dto.currency
        entity.createdUser =dto.createdUser
        entity.updatedUser =dto.updatedUser
        entity.createdAt =dto.createdAt
        entity.updatedAt =dto.updatedAt
        entity.version =dto.version
        return entity
    }
}