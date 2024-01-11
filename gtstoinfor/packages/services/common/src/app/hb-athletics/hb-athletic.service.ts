import { Injectable } from "@nestjs/common";
import { HbOrdersRepository } from "./repositories/hb-orders.repo";
import { HbPdfRepo } from "./repositories/hb-pdf.repo";
import { CoLinereqModel, Color, CommonResponseModel, DestinationModel, HBCoLinereqModels, HBDestinationModel, HBSizeModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SizeModel } from "@project-management-system/shared-models";
import { HbOrdersEntity } from "./entity/hb-orders.entity";
import { HbPdfFileInfoEntity } from "./entity/hb-pdf.entity";
import { HbCOLineEntity } from "./entity/hb-co-line.entity";
import { HbCOLineRepository } from "./repositories/hb-co-line.repository";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";

@Injectable()
export class HbService {

  constructor(
    private HbOrdersRepo: HbOrdersRepository,
    private HbPdfRepo: HbPdfRepo,
    private hbCoLineRepo:HbCOLineRepository,

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


 async getHborderData(req?: HbPoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.HbOrdersRepo.getHborderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, HbOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.style},${rec.cust_po},${rec.color},${rec.exit_factory_date}`)) {
          sizeDateMap.set(
            `${rec.style},${rec.cust_po},${rec.color},${rec.exit_factory_date}`,
            new HbOrderDataModel(rec.id, rec.cust_po,rec.style,rec.color,rec.size,rec.exit_factory_date,rec.ship_to_add,[],rec.quantity,rec.unit_price)
          );

          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.cust_po},${rec.color},${rec.exit_factory_date}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new HbSizeWiseModel(rec.size, rec.unit_price, rec.quantity,rec.color));
        }
      }
      const dataModelArray: HbOrderDataModel[] = Array.from(sizeDateMap.values());
      // console.log(dataModelArray,"kkkk")
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
      // return new CommonResponseModel(true, 1, 'data retrieved', details);


    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }
 

  async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
    try {
      const data = await this.HbOrdersRepo.find({ where: { custPo: req.poNumber } })
      let destinationMap = new Map<string, HBDestinationModel>();
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, HbOrdersEntity>();
      data.forEach(rec => {
        poMap.set(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`, rec)
        const dest = rec.shipToAdd
        // console.log(destCountry,"hirrrrrrrrrrrrrrrrrr")

        // const parts = rec.shipToAdd.split(',')
        // const destAdd = parts[2].trim();
        // const dest = destAdd;

        // const destCountry = rec.shipToAddress.slice(-2).trim();
        // const parts = rec.shipToAddress.split(',')
        // const destAdd = parts[0].trim();
        // const dest = destAdd + ',' + destCountry;

        if (!destinationColSizesMap.has(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`)) {
          destinationColSizesMap.set(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).has(dest)) {
          destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).get(dest).has(rec.color)) {
          destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).get(dest).set(rec.color, []);
        }
        destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
      });
      const coData = []
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = []
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = []
          colorSizes.forEach((sizes, color) => {
            const sizeArray = []
            sizes.forEach((size) => {
              const sizeObj = new HBSizeModel(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj)
            })
            const col = new Color(color, sizeArray);
            ColArray.push(col)
          });
          const des = new HBDestinationModel(dest, ColArray);
          desArray.push(des)
        });
        const poInfo = poMap.get(poNumber)
        const co = new HBCoLinereqModels(poInfo.custPo, poInfo.style, poInfo.unitPrice, poInfo.exitFactoryDate, desArray);
        coData.push(co)
      });
      if (coData) {
        return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', coData);
      } else {
        return new CommonResponseModel(false, 0, 'No data found');
      }
    } catch (err) {
      throw err
    }
  }


  async getHbPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.HbOrdersRepo.getDistinctHBPoNumbers()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async hbCoLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.HbOrdersRepo.find({ where: { custPo: req.custPo,exitFactoryDate:req.exitFactoryDate } });
      const empty = [];
      for (const rec of records) {
        const entity = new HbCOLineEntity()
        entity.buyer = req.buyer
        entity.custPo = req.custPo;
        entity.style = rec.style;
        entity.itemNo =  req?.itemNo;
        entity.status = 'Open';
        entity.exitFactoryDate=rec.exitFactoryDate;
        entity.createdUser = req.createdUser;
        empty.push(entity)
      }
      const save = await this.hbCoLineRepo.save(empty);


      if (save) {
        // const update = await this.Repo.update(
        //   { poNumber: req.poNumber, deliveryDate:req.deliveryDate,material:req.material }, // Conditions for updating
        //   { status: StatusEnum.ACCEPTED } // Data to update
        // );
        return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }


 


}