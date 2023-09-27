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
        dto. Financialyear=entity.Financialyear;
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
        entity. Financialyear=dto.Financialyear;
        entity.createdUser=dto.createdUser;
        const hsnDetails: HSNEntity[] = []
        for (const record of dto.Hsninfo  ){
                const entity2 = new HSNEntity()
                entity2.Charge = record. Charge
                entity2.Taxamount = record.Taxamount
                entity2.Taxpercentage = record.Taxpercentage
                entity2.Taxtype = record.Taxtype
                entity2.HSN = record.HSN
                entity2.variance = record.variance
                entity2.unitPrice = record.unitPrice
                entity2.quotation = record.quotation
                entity2.status = record.status;
                entity2.unitquantity = record.unitquantity;
                entity2.description = record.description;
                entity2.createdUser = dto.createdUser;
                hsnDetails.push(entity2)
            }
        
        entity.scanentity = hsnDetails

        return entity;
    }
}