import { Injectable } from "@nestjs/common";
import { HbOrdersRepository } from "./repositories/hb-orders.repo";
import { HbPdfRepo } from "./repositories/hb-pdf.repo";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { HbOrdersEntity } from "./entity/hb-orders.entity";
import { HbPdfFileInfoEntity } from "./entity/hb-pdf.entity";

@Injectable()
export class HbService {

  constructor(
    private HbOrdersRepo: HbOrdersRepository,
    private HbPdfRepo: HbPdfRepo,

  ) { }

  
  async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqqqqqqq")
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.HbpoItemDetails) {
        const match = item.style.match(/\d+/);
        console.log(match, "match");
        // Check if a match is found and convert it to an integer
        // const style = match ? parseInt(match[0], 10) : null;
        const style = match

        console.log(style, "style")
        for (const variant of item.HbpoItemVariantDetails) {
          const orderData = await this.HbOrdersRepo.findOne({ where: { custPo: req.custPo, style: style, size: variant.size } })
          console.log(orderData, "orderData")
          const entity = new HbOrdersEntity();
          entity.custPo = req.custPo
          entity.exitFactoryDate = req.exitFactoryDate
          entity.shipToAdd = req.shipToAdd


          entity.style = item.style
          entity.color = item.color

          entity.size = variant.size
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice


        //   const fileData = {
        //     poNumber: entity.poNumber,
        //     poDate: entity.poDate,
        //     shipment: entity.shipment,
        //     season: entity.season,
        //     portOfExport: entity.portOfExport,
        //     portOfEntry: entity.portOfEntry,
        //     Refrence: entity.Refrence,
        //     paymentTermDescription: entity.paymentTermDescription,
        //     specialInstructions: entity.specialInstructions,
        //     division: entity.division,
        //     incoterm: entity.incoterm,
        //     shipToAdd: entity.shipToAdd,
        //     manufacture: entity.manufacture,
        //     buyerAddress: entity.buyerAddress,
        
        //     CentricpoItemDetails: [{
        //         poLine: item.poLine,
        //         material: item.material,
        //         color: item.color,
        //         gender: item.gender,
        //         shortDescription: item.shortDescription,
        //         packMethod: item.packMethod,
        //         vendorBookingFlag: item.vendorBookingFlag,
        //         currency: item.currency,
        //         totalQuantity: item.totalQuantity,
        //         CentricpoItemVariantDetails: item.CentricpoItemVariantDetails.map(variant => ({
        //             size: variant.size,
        //             upc: variant.upc,
        //             label: variant.label,
        //             unitPrice: variant.unitPrice,
        //             quantity: variant.quantity,
        //             exFactory: variant.exFactory,
        //             exPort: variant.exPort,
        //             deliveryDate: variant.deliveryDate,
        //             retialPrice: variant.retialPrice,
        //         }))
        //     }]
        // };
        
        // entity.fileData = JSON.stringify(fileData);
        // console.log(entity.fileData, "dfdfdfdfdfdfffffff");

          if (orderData) {
            const update = await this.HbOrdersRepo.update({ custPo: req.custPo, style: style, size: variant.size }, {})
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.HbOrdersRepo.save(entity)
            // const savedChild = await transactionManager.getRepository(RLOrdersEntity).save(entity)
            if (!saved) {
              throw new Error('Save failed')
            }
          }
        }
      }
      // await transactionManager.completeTransaction()
      return new CommonResponseModel(true, 1, 'Data saved successfully', saved)
    } catch (err) {
      return new CommonResponseModel(false, 0, 'Failed', err)
    }
  }

  async updatePath(req: any, poNumber: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    console.log(poNumber, "pppppioooooo");
    console.log(req, "reqqqqqqqqq");

    // const poNumberFromFileName = filename.replace(/\D/g, "");
    const poNumberFromFileName = filename.replace(/\(+.+/g, "").replace(/\D/g, "");
    const entity = new HbPdfFileInfoEntity();
    entity.custPo = poNumberFromFileName;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;
    console.log(entity.fileData, "fileData")

    const file = await this.HbPdfRepo.findOne({ where: { pdfFileName: filePath } });
    if (file) {
      return new CommonResponseModel(false, 0, 'File with the same name already uploaded');
    } else {
      const save = await this.HbPdfRepo.save(entity);
      if (save) {
        return new CommonResponseModel(true, 1, 'Uploaded successfully', save);
      } else {
        return new CommonResponseModel(false, 0, 'Uploaded failed');
      }
    }
  }

  async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
      const data = await this.HbPdfRepo.find()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }





}