import { RmCreationDto } from "./rm-item.dto";
import { RmCreationEntity } from "../rm-items.entity";

export class RmCreationAdapter{
    convertDtoToEntity(dtoObj:RmCreationDto,isUpdate:boolean=false):RmCreationEntity{
        try{
            const entityObj= new RmCreationEntity();
            entityObj.itemCode=dtoObj.itemCode;
            entityObj.pchId=dtoObj.pchId;
            entityObj.structure=dtoObj.structure;
            entityObj.quality=dtoObj.quality;
            entityObj.itemName=dtoObj.itemName;
            entityObj.itemIypeId=dtoObj.itemIypeId;
            entityObj.placement=dtoObj.placement;
            entityObj.responsibleId=dtoObj.responsibleId;
            entityObj.devResponsible=dtoObj.devResponsible;
            entityObj.basicUomId=dtoObj.basicUomId;
            entityObj.altUomId=dtoObj.altUomId;
            entityObj.multiplicationFactor=dtoObj.multiplicationFactor;
            entityObj.currencyId=dtoObj.currencyId;
            entityObj.price=dtoObj.price;
            entityObj.tax=dtoObj.tax;
            entityObj.isImportedItem=dtoObj.isImportedItem
            entityObj.attachedWareHouse=dtoObj.attachedWareHouse;
            entityObj.planner=dtoObj.planner;
            entityObj.businessArea=dtoObj.businessArea;
            entityObj.procurementGroupId=dtoObj.procurementGroupId
            entityObj.productGroupId=dtoObj.productGroupId
            entityObj.hierarchyLevelId=dtoObj.hierarchyLevelId
            entityObj.supplyLeadTime=dtoObj.supplyLeadTime;
            entityObj.supplier=dtoObj.supplier;
            entityObj.consumption=dtoObj.consumption;
            entityObj.total=dtoObj.total;
            entityObj.deliveryTerms=dtoObj.deliveryTerms;
            entityObj.deliveryMethod=dtoObj.deliveryMethod;
            entityObj.purchasePriceQty=dtoObj.purchasePriceQty;
            entityObj.saleTax=dtoObj.saleTax;
            entityObj.exciseDuty=dtoObj.exciseDuty;
            entityObj.property=dtoObj.property;
            entityObj.wastage=dtoObj.wastage;
            entityObj.costGroup=dtoObj.costGroup;
            entityObj.remarks=dtoObj.remarks;
            entityObj.itemGroupId=dtoObj.itemGroupId;

            entityObj.useInOperation=dtoObj.useInOperation
            entityObj.itemCategoriesId=dtoObj.itemCategoriesId
            entityObj.licenseId=dtoObj.licenseId;
            entityObj.facilityID=dtoObj.facilityID;
            entityObj.genericCode=dtoObj.genericCode;
            entityObj.fabricFinishId=dtoObj.fabricFinishId;
            entityObj.saleItem=dtoObj.saleItem;

          if(isUpdate){
    entityObj.updatedUser=dtoObj.createdUser;
        }else{
    entityObj.isActive=true;
    entityObj.createdUser = dtoObj.createdUser;
      }
return entityObj;

        }catch(Error){
            throw Error
        }
    }

    public convertEntityToDto(rmcreation:RmCreationEntity):RmCreationDto{
        const rmcreationDto= new  RmCreationDto;
            rmcreationDto.itemCode=rmcreation.itemCode;
            rmcreationDto.pchId=rmcreation.pchId;
            rmcreationDto.structure=rmcreation.structure;
            rmcreationDto.quality=rmcreation.quality;
            rmcreationDto.itemName=rmcreation.itemName;
            rmcreationDto.itemIypeId=rmcreation.itemIypeId;
            rmcreationDto.placement=rmcreation.placement;
            rmcreationDto.responsibleId=rmcreation.responsibleId;
            rmcreationDto.devResponsible=rmcreation.devResponsible;
            rmcreationDto.basicUomId=rmcreation.basicUomId;
            rmcreationDto.altUomId=rmcreation.altUomId;
            rmcreationDto.multiplicationFactor=rmcreation.multiplicationFactor;
            rmcreationDto.currencyId=rmcreation.currencyId;
            rmcreationDto.price=rmcreation.price;
            rmcreationDto.tax=rmcreation.tax;
            rmcreationDto.isImportedItem=rmcreation.isImportedItem;
           rmcreationDto.attachedWareHouse= rmcreation.attachedWareHouse;
            rmcreationDto.planner=rmcreation.planner;
            rmcreationDto.businessArea=rmcreation.businessArea;
            rmcreationDto.procurementGroupId=rmcreation.procurementGroupId
            rmcreationDto.productGroupId=rmcreation.productGroupId
            rmcreationDto.hierarchyLevelId=rmcreation.hierarchyLevelId
            rmcreationDto.supplyLeadTime=rmcreation.supplyLeadTime;
            rmcreationDto.supplier=rmcreation.supplier;
            rmcreationDto.consumption=rmcreation.consumption;
            rmcreationDto.total=rmcreation.total;
            rmcreationDto.deliveryTerms=rmcreation.deliveryTerms;
            rmcreationDto.deliveryMethod=rmcreation.deliveryMethod;
            rmcreationDto.purchasePriceQty=rmcreation.purchasePriceQty;
            rmcreationDto.saleTax=rmcreation.saleTax;
            rmcreationDto.wastage=rmcreation.wastage;
            rmcreationDto.costGroup=rmcreation.costGroup;
            rmcreationDto.remarks=rmcreation.remarks;
            rmcreationDto.itemGroupId=rmcreation.itemGroupId;

            rmcreationDto.fabricFinishId=rmcreation.fabricFinishId;
            rmcreationDto.genericCode=rmcreation.genericCode;
            rmcreationDto.facilityID=rmcreation.facilityID;
           rmcreationDto.licenseId=rmcreation.licenseId
            rmcreationDto.useInOperation=rmcreation.useInOperation;
            rmcreationDto.itemCategoriesId=rmcreation.itemCategoriesId;
             rmcreationDto.saleItem=rmcreation.saleItem;

            rmcreationDto.updatedUser = rmcreation.updatedUser
            rmcreationDto.versionFlag = rmcreation.versionFlag
            return rmcreationDto;
            }
}