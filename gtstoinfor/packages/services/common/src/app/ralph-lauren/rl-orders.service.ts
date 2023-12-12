
import { Injectable } from "@nestjs/common";
import { RLOrdersRepository } from "./repositories/rl-orders.repo";
import { CoLineModel, Color, Colors, CommonResponseModel, Destination, Destinations, FactoryReportModel, FactoryReportSizeModel, OrderDataModel, OrderSizeWiseModel, PoOrderFilter, Size } from "@project-management-system/shared-models";
import { DataSource } from "typeorm";
import { PdfFileUploadRepository } from "./repositories/pdf-file.repo";
import { OrderDetailsReq } from "./dto/order-details-req";
import { RLOrdersEntity } from "./entities/rl-orders.entity";

@Injectable()
export class RLOrdersService {
    constructor(
        private repo: RLOrdersRepository,
        private pdfrepo:PdfFileUploadRepository,
        private dataSource: DataSource,
       
    ) {}


    async getPdfFileInfo() : Promise<CommonResponseModel> {
        try{
          const data = await this.pdfrepo.find()
         
          if(data){
            return new CommonResponseModel(true, 1,'data retrived Successfully',data)
          } else {
            return new CommonResponseModel(false,0 ,'No Data Found',[])
          }
        } catch(err){
          throw err
        }
      }


      async getorderData(req?:PoOrderFilter): Promise<CommonResponseModel> {
        try {
          // console.log(req,"sev")
            const details = await this.repo.getorderData(req);
            // console.log(details,"88888888")

          
            if (details.length === 0) {
                return new CommonResponseModel(false, 0, 'data not found');
            }
            const sizeDateMap = new Map<string, OrderDataModel>();   
            for (const rec of details) {
                if (!sizeDateMap.has(rec.po_number)) {
                    sizeDateMap.set(
                      rec.po_number,
                        new OrderDataModel(rec.id,rec.po_number,rec.po_item,rec.ship_to_address,rec.agent,rec.purchase_group,rec.supplier,rec.revision_no,rec.po_upload_date,rec.status,rec.division,rec.ship_to,rec.season_code,rec.board_code,rec.style,rec.material_no,rec.rl_style_no,rec.color,rec.size,rec.total_qty,rec.ship_date,rec.ship_mode,rec.msrp_price,rec.msrp_currency,rec.c_s_price,rec.c_s_currency,rec.amount,rec.total_amount,rec.price,rec.currency,rec.quantity,rec.upc_ean,[])
                    );
                }
                const sizeWiseData = sizeDateMap.get(rec.po_number).sizeWiseData;
                if (rec.size !== null) {
                    sizeWiseData.push(new OrderSizeWiseModel(rec.size,rec.total_qty,rec.msrp_price,rec.msrp_currency,rec.c_s_price,rec.c_s_currency,rec.amount,rec.total_amount,rec.price,rec.currency,rec.quantity,rec.upc_ean));
                }
            }
            const dataModelArray: OrderDataModel[] = Array.from(sizeDateMap.values());
            return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
        } catch (e) {
            return new CommonResponseModel(false, 0, 'failed', e);
        }
    }


    async getorderDataByPoNumber(req:PoOrderFilter) : Promise<CommonResponseModel> {
      try{
          //  console.log(req,"sev")

        const data = await this.repo.getorderDataByPoNumber(req)
       
        if(data){
          return new CommonResponseModel(true, 1,'data retrived Successfully',data)
        } else {
          return new CommonResponseModel(false,0 ,'No Data Found',[])
        }
      } catch(err){
        throw err
      }
    }

  async getOrderDetails(req:OrderDetailsReq): Promise<CommonResponseModel> {
      try {

        const data = await this.repo.find({ where: { poNumber: req.poNumber } })
        //  const data = await this.repo.find()

        
           let destinationMap = new Map<string, Destination>();

           // po -> destination -> color -> sizes
           const destinationColSizesMap = new Map<string, Map<string, Map<string, {size:string,quantity:number,price:string}[] >>>();
            const poMap = new Map <string, RLOrdersEntity>();

          data.forEach(rec=> {
            poMap.set(rec.poNumber,rec)

            const dest = rec.shipToAddress.slice(-4).trim();
            if(!destinationColSizesMap.has(rec.poNumber)) {
              destinationColSizesMap.set(rec.poNumber, new Map<string, Map<string, [] >>());
            }
            if(!destinationColSizesMap.get(rec.poNumber).has(dest)) {
              destinationColSizesMap.get(rec.poNumber).set(dest, new Map<string, []>());
            }
            if(!destinationColSizesMap.get(rec.poNumber).get(dest).has(rec.color)) {
              destinationColSizesMap.get(rec.poNumber).get(dest).set(rec.color, []);
            }
            destinationColSizesMap.get(rec.poNumber).get(dest).get(rec.color).push({size:rec.size,quantity:rec.quantity,price:rec.price});
          });
           const coData = []
          destinationColSizesMap.forEach((destColorSize, poNumber) => {
  
            const desArray = []
            destColorSize.forEach((colorSizes, dest) => {
              const ColArray = []
              colorSizes.forEach((sizes,color) =>{
                const sizeArray = []
                sizes.forEach((size)=>{
                  const sizeObj = new Size(size.size,size.quantity,size.price);
                  sizeArray.push(sizeObj)
                }) 
              const col = new Color(color, sizeArray);
              ColArray.push(col)
              });
              const des = new Destination(dest, ColArray);
              desArray.push(des)
            });
            const  poInfo = poMap.get(poNumber)

            const co = new CoLineModel(poInfo.poNumber, poInfo.poItem, poInfo.price,poInfo.currency, poInfo.shipDate,desArray);
            coData.push(co)
          });
          console.log(coData,"pppppppppppppp")
          console.log(destinationColSizesMap,"reeeeeeeeee");
           if (coData){
            return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully',coData);
           } else {
          return new CommonResponseModel(false, 0, 'No data found');
             
           }
      } catch (err) {
          throw err
      }
  }

 }
        

    





