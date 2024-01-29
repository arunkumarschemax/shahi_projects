import { Injectable } from "@nestjs/common";
import { IndentDto } from "./indent-dto";
import { Indent } from "../indent-entity";
import { IndentFabricEntity } from "../indent-fabric-entity";
import { IndentTrimsEntity } from "../indent-trims-entity";
import { IndentFabricDto } from "./indent-fabric-dto";
import { IndentTrimDto } from "./indent-trim-dto";
import { SampleRequest } from "../../sample-dev-request/entities/sample-dev-request.entity";

@Injectable()

export class IndentAdapter
{
    public convertDtoToEntity(indentDto:IndentDto, isUpdate: boolean = false ):Indent{
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(indentDto)

        const indententity = new Indent();
        indententity.indentId=indentDto.indentId;
        indententity.indentDate=indentDto.indentDate;
        indententity.style=indentDto.style;
        indententity.expectedDate=indentDto.expectedDate;
        indententity.indentCloseDate=indentDto.indentCloseDate;
        indententity.remarks=indentDto.remarks;
        indententity.createdAt=indentDto.createdAt;
        indententity.createdUser=indentDto.createdUser;
        indententity.updatedAt=indentDto.updatedAt;
        indententity.versionFlag=indentDto.versionFlag;
        indententity.status=indentDto.status;
        indententity.buyerId=indentDto.buyerId;

        // let sampleId = new SampleRequest();
        // sampleId.SampleRequestId=indentDto.sampleRequestId;
        // indententity.sampleReq = sampleId;
        if (isUpdate) {
          indententity.updatedUser = indentDto.updatedUser;
        } else {
            indententity.requestNo=indentDto.requestNo;
            indententity.isActive = true;
            indententity.createdUser = indentDto.createdUser;
          }
          const fabricDetails: IndentFabricEntity[]  = []; 
          for (const indentitems of indentDto.indentFabricDetails) {
              const fabEntity: IndentFabricEntity = new IndentFabricEntity();
              if(!isUpdate){
                indententity.createdUser = indentDto.createdUser;
              }else{
                  fabEntity.ifabricId =indentitems.ifabricId;
                  indententity.updatedUser = indentDto.updatedUser; 
              }
              // fabEntity.buyerId =indentitems.buyerId;
              fabEntity.color =indentitems.color;
              // fabEntity.construction =indentitems.construction;
              // fabEntity.content=indentitems.content;
              // fabEntity.fabricType=indentitems.fabricType;
              fabEntity.filePath=indentitems.filePath;
              fabEntity.fileName=indentitems.fileName;

              // fabEntity.finish=indentitems.finish;
              // fabEntity.grnDate=indentitems.grnDate;
              fabEntity.isUploaded=indentitems.isUploaded;
              fabEntity.m3FabricCode=indentitems.m3FabricCode;
              // fabEntity.moq=indentitems.moq;
              // fabEntity.moqPrice=indentitems.moqPrice;
              // fabEntity.moqPriceUnit=indentitems.moqPriceUnit;
              // fabEntity.moqUnit=indentitems.moqUnit;
              // fabEntity.pch=indentitems.pch;
              fabEntity.quantity=indentitems.quantity;
              fabEntity.quantityUnit=indentitems.quantityUnit;
              fabEntity.remarks=indentitems.remarks;
              fabEntity.season=indentitems.season;
              // fabEntity.shrinkage=indentitems.shrinkage;
              // fabEntity.supplierId=indentitems.supplierId;
              // fabEntity.yarnUnit=indentitems.yarnUnit;
              // fabEntity.yarnCount=indentitems.yarnCount;
              fabEntity.xlNo=indentitems.xlNo;
              // fabEntity.weight=indentitems.weight;
              // fabEntity.width=indentitems.width;
              // fabEntity.weaveId=indentitems.weaveId;
              // fabEntity.weightUnit = indentitems.weightUnit;
              fabricDetails.push(fabEntity);
          }
          indententity.iFabricInfo = fabricDetails;
          const trimDetails: IndentTrimsEntity[]  = []; 
          for (const indentitems of indentDto.indentTrimDetails) {
              const trimEntity: IndentTrimsEntity = new IndentTrimsEntity();
              if(!isUpdate){
                indententity.createdUser = indentDto.createdUser;
              }else{
                  trimEntity.itrimsId =indentitems.itrimsId;
                  indententity.updatedUser = indentDto.updatedUser; 
              }
              // trimEntity.color =indentitems.color;
              // trimEntity.description =indentitems.description;
              trimEntity.filePath =indentitems.filePath;
              trimEntity.isUploaded=indentitems.isUploaded;
              // trimEntity.m3TrimCode=indentitems.m3TrimCode;
              trimEntity.quantity=indentitems.quantity;
              trimEntity.trimType=indentitems.trimType;
              // trimEntity.size=indentitems.size;
              trimEntity.trimCode=indentitems.trimCode;
              trimEntity.quantityUnit=indentitems.quantityUnit;
              trimEntity.versionFlag=indentitems.versionFlag;
              trimEntity.createdUser=indentitems.createdUser;
              trimEntity.isActive=indentitems.isActive;
              trimEntity.remarks = indentitems.remarks;
              trimDetails.push(trimEntity);
          }
          indententity.iTrimsInfo = trimDetails;
          console.log("*******************************")
          console.log(indententity)
         return indententity;
    }
    public convertEntityToDto(indentObject: Indent): IndentDto {

        const fabDto:IndentFabricDto[] = [];
        for (const fabItem of indentObject.iFabricInfo) {
            const fabricdata= new IndentFabricDto(fabItem.ifabricId
              // fabItem.content,fabItem.fabricType,fabItem.weaveId,fabItem.weight,fabItem.width,fabItem.yarnCount,fabItem.yarnCount,fabItem.weightUnit,fabItem.construction,fabItem.finish,fabItem.shrinkage
              ,fabItem.m3FabricCode,fabItem.color,"",0,0,new Date(),"",
              // fabItem.pch,fabItem.moq,fabItem.moqUnit,fabItem.moqPrice,fabItem.moqPriceUnit,
              fabItem.quantity,fabItem.quantityUnit,fabItem.filePath,fabItem.fileName,fabItem.isUploaded,fabItem.remarks,fabItem.isActive,fabItem.createdAt,fabItem.createdUser,fabItem.updatedAt,fabItem.updatedUser);
            fabDto.push(fabricdata);
        }

        const trimDto:IndentTrimDto[] = [];
        for (const trimItem of indentObject.iTrimsInfo) {
            const trimData= new IndentTrimDto(trimItem.itrimsId,trimItem.trimType,trimItem.trimCode,trimItem.quantity,trimItem.remarks,trimItem.filePath,trimItem.fileName,trimItem.isUploaded,trimItem.isActive,trimItem.createdAt,trimItem.createdUser,trimItem.updatedAt,trimItem.updatedUser,trimItem.versionFlag);
            trimDto.push(trimData);
        }

        const indentDto= new IndentDto(indentObject.indentId,indentObject.requestNo,indentObject.indentDate,indentObject.expectedDate,indentObject.indentCloseDate,indentObject.status,fabDto,trimDto,0,indentObject.remarks,indentObject.isActive,indentObject.createdAt,indentObject.createdUser,indentObject.updatedAt,indentObject.updatedUser,indentObject.versionFlag);
        return indentDto;
      }
}
