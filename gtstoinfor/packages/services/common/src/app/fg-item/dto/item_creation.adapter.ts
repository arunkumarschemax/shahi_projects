import { ItemCreation } from "../item_creation.entity";
import { ItemCreationDto } from "./item-creation.dto";

export class ItemCreationAdapter {
    convertDtoToEntity(dtoObj: ItemCreationDto,  isUpdate: boolean = false ): ItemCreation{
        try {
            const entityObj = new ItemCreation();
            entityObj.altUom = dtoObj.altUom
            entityObj.approver = dtoObj.approver
            entityObj.brandId = dtoObj.brandId
            entityObj.buyingHouseCommision = dtoObj.buyingHouseCommision
            entityObj.categoryId = dtoObj.categoryId
            entityObj.conversionFactorId = dtoObj.conversionFactorId
            entityObj.currency = dtoObj.currency
            entityObj.customGroupId = dtoObj.customGroupId
            entityObj.description = dtoObj.description
            entityObj.facilityId = dtoObj.facilityId
            entityObj.factoryMerchant = dtoObj.factoryMerchant
            entityObj.fgitemId = dtoObj.fgitemId
            entityObj.firstExFactoryDate = dtoObj.firstExFactoryDate
            entityObj.internalStyleId = dtoObj.internalStyleId
            entityObj.isSubContract = dtoObj.isSubContract
            entityObj.itemCode = dtoObj.itemCode
            entityObj.itemName = dtoObj.itemName
            entityObj.itemTypeId = dtoObj.itemTypeId
            entityObj.licenseId = dtoObj.licenseId
            entityObj.moq = dtoObj.moq
            entityObj.nationalDbk = dtoObj.nationalDbk
            entityObj.orderCloseDate = dtoObj.orderCloseDate
            entityObj.orderConfirmedDate = dtoObj.orderConfirmedDate
            entityObj.orderQty = dtoObj.orderQty
            entityObj.pdMerchant = dtoObj.pdMerchant
            entityObj.productDesignerId = dtoObj.productDesignerId
            entityObj.productionMerchant = dtoObj.productionMerchant
            entityObj.projectionOrderId = dtoObj.projectionOrderId
            entityObj.responsiblePersonId = dtoObj.responsiblePersonId
            entityObj.roslGroup = dtoObj.roslGroup
            entityObj.salePersonId = dtoObj.salePersonId
            entityObj.salePrice = dtoObj.salePrice
            entityObj.salePriceQty = dtoObj.salePriceQty
            entityObj.seasonId = dtoObj.seasonId
            entityObj.styleNo = dtoObj.styleNo
            entityObj.subCategoryId = dtoObj.subCategoryId
            entityObj.targetCurrency = dtoObj.targetCurrency
            entityObj.uom = dtoObj.uom
            entityObj.composition = dtoObj.composition
            entityObj.basicUom = dtoObj.basicUom
            entityObj.groupTechClass = dtoObj.groupTechClass
            entityObj.productGroup = dtoObj.productGroup
            entityObj.range = dtoObj.range
            entityObj.searchGroup = dtoObj.searchGroup
            entityObj.referenceId = dtoObj.referenceId
            entityObj.itemGroup = dtoObj.itemGroup
            entityObj.businessArea = dtoObj.businessArea
            entityObj.groupTechClass = dtoObj.groupTechClass
            entityObj.noOfLacePanel = dtoObj.noOfLacePanel
            entityObj.versionFlag = dtoObj.versionFlag
            if (isUpdate) {
                entityObj.updatedUser = dtoObj.createdUser;
              } else {
                entityObj.isActive = true;
                entityObj.createdUser = dtoObj.createdUser;
              }
            return entityObj;
        } catch (Error) {
            throw Error;
        }
    }

    public convertEntityToDto(itemCreation : ItemCreation): ItemCreationDto {
        const itemCreationDto = new ItemCreationDto;
        itemCreationDto.altUom = itemCreation.altUom
        itemCreationDto.approver = itemCreation.approver
        itemCreationDto.brandId = itemCreation.brandId
        itemCreationDto.buyingHouseCommision = itemCreation.buyingHouseCommision
        itemCreationDto.categoryId = itemCreation.categoryId
        itemCreationDto.conversionFactorId = itemCreation.conversionFactorId
        itemCreationDto.createdUser = itemCreation.createdUser
        itemCreationDto.currency = itemCreation.currency
        itemCreationDto.customGroupId = itemCreation.customGroupId
        itemCreationDto.description = itemCreation.description
        itemCreationDto.facilityId = itemCreation.facilityId
        itemCreationDto.factoryMerchant = itemCreation.factoryMerchant
        itemCreationDto.fgitemId = itemCreation.fgitemId
        itemCreationDto.firstExFactoryDate = itemCreation.firstExFactoryDate
        itemCreationDto.internalStyleId = itemCreation.internalStyleId
        itemCreationDto.isActive = itemCreation.isActive
        itemCreationDto.isSubContract = itemCreation.isSubContract
        itemCreationDto.itemCode = itemCreation.itemCode
        itemCreationDto.itemName = itemCreation.itemName
        itemCreationDto.itemTypeId = itemCreation.itemTypeId
        itemCreationDto.licenseId = itemCreation.licenseId
        itemCreationDto.moq = itemCreation.moq
        itemCreationDto.nationalDbk = itemCreation.nationalDbk
        itemCreationDto.orderCloseDate = itemCreation.orderCloseDate
        itemCreationDto.orderConfirmedDate = itemCreation.orderConfirmedDate
        itemCreationDto.orderQty = itemCreation.orderQty
        itemCreationDto.pdMerchant = itemCreation.pdMerchant
        itemCreationDto.productDesignerId = itemCreation.productDesignerId
        itemCreationDto.productionMerchant = itemCreation.productionMerchant
        itemCreationDto.projectionOrderId = itemCreation.projectionOrderId
        itemCreationDto.responsiblePersonId = itemCreation.responsiblePersonId
        itemCreationDto.roslGroup = itemCreation.roslGroup
        itemCreationDto.salePersonId = itemCreation.salePersonId
        itemCreationDto.salePrice = itemCreation.salePrice
        itemCreationDto.salePriceQty = itemCreation.salePriceQty
        itemCreationDto.seasonId = itemCreation.seasonId
        itemCreationDto.styleNo = itemCreation.styleNo
        itemCreationDto.subCategoryId = itemCreation.subCategoryId
        itemCreationDto.targetCurrency = itemCreation.targetCurrency
        itemCreationDto.uom = itemCreation.uom
        itemCreationDto.composition = itemCreation.composition
        itemCreationDto.basicUom = itemCreation.basicUom
        itemCreationDto.groupTechClass = itemCreation.groupTechClass
        itemCreationDto.productGroup = itemCreation.productGroup
        itemCreationDto.range = itemCreation.range
        itemCreationDto.searchGroup = itemCreation.searchGroup
        itemCreationDto.referenceId = itemCreation.referenceId
        itemCreationDto.itemGroup = itemCreation.itemGroup
        itemCreationDto.businessArea = itemCreation.businessArea
        itemCreationDto.groupTechClass = itemCreation.groupTechClass
        itemCreationDto.noOfLacePanel = itemCreation.noOfLacePanel
        itemCreationDto.updatedUser = itemCreation.updatedUser
        itemCreationDto.versionFlag = itemCreation.versionFlag
        return itemCreationDto;
      }
}