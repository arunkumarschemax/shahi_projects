import { Injectable } from "@nestjs/common";
import { ItemTypeEntity } from "../item-type.entity";
import { Division } from "../../division/division.entity";
import { ProductGroup } from "../../product group/product-group-entity";
import { ItemTypeDtos } from "./item-type.dto";
export class ItemTypeAdapter{

    /**
     * 
     * @param  ItemTypeDto
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity (itemtypeDtos :ItemTypeDtos, isUpdate:boolean=false):ItemTypeEntity {
        const item = new ItemTypeEntity();
        item.itemTypeId=itemtypeDtos.itemTypeId;
        item.itemType=itemtypeDtos.itemType;
        item.productGroup = new ProductGroup;
        item.productGroup.productGroupId=itemtypeDtos.productGroupId
        item.productGroup.productGroup=itemtypeDtos.productGroupName;
        item.division= new Division();
        item.division.divisionId=itemtypeDtos.divisionId;
        item.division.divisionName=itemtypeDtos.divisionName;
        item.isActive=itemtypeDtos.isActive==undefined?true:itemtypeDtos.isActive;
        if(isUpdate){
            item.updatedUser=itemtypeDtos.updatedUser;

        }else{
            item.isActive=true;
            item.createdUser=itemtypeDtos.createdUser;
        
        }
        return item;
    }


    public convertEntityToDto (item:ItemTypeEntity):ItemTypeDtos{
       // console.log(item,'**')
        const itemvariable= new ItemTypeDtos();
        itemvariable.itemTypeId=item.itemTypeId;
        itemvariable.itemType=item.itemType;
        itemvariable.productGroupId=item.productGroup.productGroupId;
        itemvariable.productGroupName=item.productGroup.productGroup;
        itemvariable.divisionId=(item.division)?.divisionId;
        itemvariable.divisionName=(item.division)?.divisionName;
        itemvariable.isActive=item.isActive;
        itemvariable.createdAt=item.createdAt;
        itemvariable.updatedAt=item.updatedAt;
        itemvariable.updatedUser=item.updatedUser;
        itemvariable.versionFlag=item.versionFlag;
     //   console.log(itemvariable,'-')
        return  itemvariable;

    }
}