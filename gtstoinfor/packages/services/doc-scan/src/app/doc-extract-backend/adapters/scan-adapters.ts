import { Injectable } from "@nestjs/common";
import { ScanDto } from "../dtos/typeo.dto";
import { ScanEntity } from "../entity/typeo-entity";
import { HsnDto } from "../dtos/hsn.dto";
import { HSNEntity } from "../entity/hsn-entity";

@Injectable()
export class ScanAdapter {
    convertEntityToDto(entity: ScanEntity): ScanDto {
        const dto = new ScanDto();
        dto.GST = entity.GST;
        dto.Vendor = entity.Vendor;
        dto.invoiceDate = entity.invoiceDate;
        dto.Cgst = entity.Cgst;
        dto.IGST = entity.IGST;
        dto.Sgst = entity.Sgst;
        dto.InnvoiceNumber = entity.InnvoiceNumber;
        dto.InnvoiceAmount = entity.InnvoiceAmount;
        dto.InnvoiceCurrency = entity.InnvoiceCurrency;
        dto.Routing=entity.Routing;
        dto. Comment=entity.Comment;
        dto. Financialyear=entity.Financialyear;
        dto. Timecreated=entity.Timecreated;
        dto. buyerName=entity.buyerName;
        dto.createdUser=entity.createdUser;

        
        
        return dto;
    }

    convertDtoToEntity(dto: ScanDto): ScanEntity {
        console.log(dto,'----')
        const entity = new ScanEntity();
        entity.GST = dto.GST;
        entity.Vendor = dto.Vendor;
        entity.invoiceDate = dto.invoiceDate;
        entity.Cgst = dto.Cgst;
        entity.IGST = dto.IGST;
        entity.Sgst = dto.Sgst;
        entity.InnvoiceNumber = dto.InnvoiceNumber;
        entity.InnvoiceAmount = dto.InnvoiceAmount;
        entity.InnvoiceCurrency = dto.InnvoiceCurrency;
        entity.Routing=dto.Routing;
        entity.Comment=dto.Comment;
        entity. Financialyear=dto.Financialyear;
        entity. Timecreated=dto.Timecreated;
        entity. buyerName=dto.buyerName;
        entity.createdUser=dto.createdUser;
        const hsnDetails: HSNEntity[] = []
        for (const record of dto.Hsninfo  ){
                const entity2 = new HSNEntity()
                entity2.Charge = record.charge
                entity2.Taxamount = record.Taxamount
                entity2.Taxpercentage = record.Taxpercentage
                entity2.Taxtype = record.Taxtype
                entity2.HSN = record.HSN
                entity2.variance = record.variance
                entity2.quotation = record.quotation
                entity2.unitquantity = record.unitquantity;
                entity2.createdUser = dto.createdUser;
                hsnDetails.push(entity2)
            }
        
        entity.scanentity = hsnDetails



        return entity;
    }
}