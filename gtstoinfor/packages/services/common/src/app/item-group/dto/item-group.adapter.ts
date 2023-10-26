import { Injectable } from "@nestjs/common";
import { ItemGroup } from "../item-group.entity";
import { ItemGroupDto } from "./item-group.dto";

@Injectable()
export class ItemGroupAdapter{

    /**
     * 
     * @param  ItemGroupDto
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity (itemgroupDtos :ItemGroupDto, isUpdate:boolean=false):ItemGroup {
        const item = new ItemGroup();
        item.itemGroupId=itemgroupDtos.itemGroupId;
        item.itemGroup=itemgroupDtos.itemGroup;

        item.isActive=itemgroupDtos.isActive==undefined?true:itemgroupDtos.isActive;
        if(isUpdate){
            item.updatedUser=itemgroupDtos.updatedUser;

        }else{
            item.isActive=true;
            item.createdUser=itemgroupDtos.createdUser;
        
        }
        return item;
    }


    public convertEntityToDto (item:ItemGroup):ItemGroupDto{
        const Itemvariable= new ItemGroupDto();
        Itemvariable.itemGroupId=item.itemGroupId;
        Itemvariable.itemGroup=item.itemGroup;
        Itemvariable.isActive=item.isActive;
        Itemvariable.createdAt=item.createdAt;
        Itemvariable.updatedAt=item.updatedAt;
        Itemvariable.updatedUser=item.updatedUser;
        Itemvariable.versionFlag=item.versionFlag;
        return  Itemvariable;

    }
}