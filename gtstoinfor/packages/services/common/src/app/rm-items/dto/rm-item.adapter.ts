import { RmCreationDto } from "./rm-item.dto";
import { RmCreationEntity } from "../rm-items.entity";

export class RmCreationAdapter{
    convertDtoToEntity(dtoObj:RmCreationDto,isUpdate:boolean=false):RmCreationEntity{
        try{
            const entityObj= new RmCreationEntity();
            entityObj. rmitemId  =dtoObj.rmitemId;
            entityObj.itemCode=dtoObj.itemCode;
            entityObj.itemCategoryId=dtoObj.itemCategoryId;
            entityObj.pchId=dtoObj.pchId;
            entityObj.facilityID=dtoObj.facilityID;
            entityObj.genericCode=dtoObj.genericCode;
            entityObj.structure=dtoObj.structure;
            entityObj.quality=dtoObj.quality;
            entityObj.description=dtoObj.description;
            entityObj.itemIypeId=dtoObj.itemIypeId;
            entityObj.placement=dtoObj.placement;
            entityObj.fabricFinishId=dtoObj.fabricFinishId;
            entityObj.responsible=dtoObj.responsible;
            entityObj.devResponsible=dtoObj.devResponsible;
            entityObj.basicUomId=dtoObj.basicUomId;
            entityObj.altUomId=dtoObj.altUomId;
            entityObj.multiplicationFactor=dtoObj.multiplicationFactor;
            entityObj.currencyId=dtoObj.currencyId;
            entityObj.price=dtoObj.price;
            entityObj.tax=dtoObj.tax;
            entityObj.purchasePriceQty=dtoObj.purchasePriceQty;
            entityObj.saleTax=dtoObj.saleTax;
            entityObj.exciseDuty=dtoObj.exciseDuty;
            entityObj.licenseId=dtoObj.licenseId;
            entityObj.property=dtoObj.property;
            entityObj.SaleItem=dtoObj.SaleItem;
            entityObj.wastage=dtoObj.wastage;
            entityObj.costGroup=dtoObj.costGroup;
            entityObj.remarks=dtoObj.remarks;
            entityObj.itemGroupId=dtoObj.itemGroupId;
            entityObj.useInOperation=dtoObj.useInOperation;
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
            rmcreationDto.rmitemId = rmcreation.rmitemId;
            rmcreationDto.itemCode=rmcreation.itemCode;
            rmcreationDto.itemCategoryId=rmcreation.itemCategoryId;
            rmcreationDto.pchId=rmcreation.pchId;
            rmcreationDto.facilityID=rmcreation.facilityID;
            rmcreationDto.genericCode=rmcreation.genericCode;
            rmcreationDto.structure=rmcreation.structure;
            rmcreationDto.quality=rmcreation.quality;
            rmcreationDto.description=rmcreation.description;
            rmcreationDto.itemIypeId=rmcreation.itemIypeId;
            rmcreationDto.placement=rmcreation.placement;
            rmcreationDto.facilityID=rmcreation.facilityID;
            rmcreationDto.fabricFinishId=rmcreation.fabricFinishId;
            rmcreationDto.responsible=rmcreation.responsible;
            rmcreationDto.devResponsible=rmcreation.responsible;
            rmcreationDto.basicUomId=rmcreation.basicUomId;
            rmcreationDto.altUomId=rmcreation.altUomId;
            rmcreationDto.multiplicationFactor=rmcreation.multiplicationFactor;
            rmcreationDto.currencyId=rmcreation.currencyId;
            rmcreationDto.price=rmcreation.price;
            rmcreationDto.tax=rmcreation.tax;
            rmcreationDto.purchasePriceQty=rmcreation.purchasePriceQty;
            rmcreationDto.saleTax=rmcreation.saleTax;
            rmcreationDto.wastage=rmcreation.wastage;
            rmcreationDto.costGroup=rmcreation.costGroup;
            rmcreationDto.remarks=rmcreation.remarks;
            rmcreationDto.itemGroupId=rmcreation.itemGroupId;
            rmcreationDto.useInOperation=rmcreation.useInOperation;
            rmcreationDto.updatedUser = rmcreation.updatedUser
            rmcreationDto.versionFlag = rmcreation.versionFlag
            return rmcreationDto;
            }
}