import { SampleRequest } from "../entities/sample-dev-request.entity";
import { SampleDevReqDto } from "./sample-dev-dto";


// export class SampleDevAdapter {

//     public convertEntityToDto(entityObj: SampleRequest): SampleDevReqDto {
//         const dtoData= new SampleDevReqDto;
//         dtoData.SampleRequestId = entityObj.SampleRequestId;
//         dtoData.requestNo = entityObj.requestNo;
//         dtoData.locationId = (entityObj.location)?.locationId;
//         dtoData.locationName = (entityObj.location)?.locationName;
//         dtoData.styleId = (entityObj.style)?.styleId;
//         dtoData.style = (entityObj.style)?.style;
//         dtoData.pchId = (entityObj.pch)?.profitControlHeadId;
//         dtoData.profitControlHead = (entityObj.pch)?.profitControlHead;
//         dtoData.buyerId = (entityObj.buyer)?.buyerId;
//         dtoData.buyerName = (entityObj.buyer)?.buyerName;
//         dtoData.sampleTypeId = (entityObj.sampleType)?.sampleTypeId;
//         dtoData.sampleType = (entityObj.sampleType)?.sampleType;
//         dtoData.sampleSubTypeId = (entityObj.sampleSubType)?.sampleSubTypeId;
//         dtoData.sampleSubType = (entityObj.sampleSubType)?.sampleSubType;
//         dtoData.brandId = (entityObj.brand)?.brandId;
//         dtoData.brandName = (entityObj.brand)?.brandName;
//         dtoData.costRef = entityObj.costRef;
//         dtoData.m3StyleNo = entityObj.m3StyleNo;
//         dtoData.contact = entityObj.contact;
//         dtoData.extension = entityObj.extension;
//         dtoData.samValue = entityObj.samValue;
//         dtoData.dmmId = (entityObj.dmm)?.employeeId;
//         dtoData.dmmEmployee = (entityObj.dmm)?.firstName;
//         dtoData.technicianId = (entityObj.technician)?.employeeId;
//         dtoData.techEmployee = (entityObj.technician)?.firstName;
//         dtoData.product = entityObj.product;
//         dtoData.type = entityObj.type;
//         dtoData.conversion = entityObj.conversion;
//         dtoData.madeIn = entityObj.madeIn;
//         dtoData.facilityId = entityObj.facilityId;
//         dtoData.status = entityObj.status;
//         return dtoData;
//       }
// }