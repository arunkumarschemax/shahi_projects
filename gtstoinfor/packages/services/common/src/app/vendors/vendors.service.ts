import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection, DataSource } from 'typeorm';
import {Vendors} from './vendors.entity';
import {VendorsDTO} from './dto/vendors.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {VendorsAdapter} from './dto/vendors.adapter';
import { AllVendorsResponseModel, VendorDropDownDto, VendorsDropDownResponseModel, VendorsDto, VendorsResponseModel } from '@project-management-system/shared-models';
import { VendorRequest } from './dto/vendors.request';
import { VendorFilterRequest } from './dto/vendor-filter.req';
import { group } from 'console';


@Injectable()
export class VendorsService {

    constructor(
        @InjectRepository(Vendors)
        private vendorsRepository: Repository<Vendors>,
        private vendorsAdapter: VendorsAdapter,
        private readonly dataSource: DataSource,

    ){}

    async getVendorDetailsWithoutRelations(vendorId: number): Promise<Vendors> {
        // tslint:disable-next-line: typedef
        const vendorResponse = await this.vendorsRepository.findOne({
          where: {vendorId: Raw(alias => `vendor_id = '${vendorId}'`)},
        });
        if (vendorResponse) {
          return vendorResponse;
        } else {
          return null;
        }
      }

      async createVendor(vendorsDto: VendorsDTO, isUpdate: boolean): Promise<VendorsResponseModel> {
        // console.log(statesDto);
        try {
          let previousValue;
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const vendorsEntity = await this.vendorsRepository.find({where:{vendorCode:vendorsDto.vendorCode}});
            if (vendorsEntity) {
              //return new InformationMessageError(11104, "State already exists");
              return new VendorsResponseModel(false,11104, 'Vendor already exists');
            }
          }
          else{
            const previous = await this.vendorsRepository.findOne({where:{vendorId:vendorsDto.vendorId}})
            previousValue = previous.vendorCode+","+previous.vendorName;
            console.log(previousValue)
            const VendorEntity = await this.getVendorDetailsWithoutRelations(vendorsDto.vendorId);
            if (VendorEntity) {
              if(VendorEntity.vendorId!=vendorsDto.vendorId) {
                return new VendorsResponseModel(false,11104, 'Vendor already exists');      
              }
            }
          
          }
          // const getVendor = await this.vendorsRepository.find({where:{vendorName:vendorsDto.vendorName}})
          // if(getVendor){
          //   return new VendorsResponseModel(false,11106,'Vendor already exist');
          // } else {
          const convertedVendorEntity: Vendors = this.vendorsAdapter.convertDtoToEntity(vendorsDto,isUpdate);
          const savedVendorEntity: Vendors = await this.vendorsRepository.save(
            convertedVendorEntity
          );
          
          const savedHolidayDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(convertedVendorEntity);
            // console.log(savedStateDto);
          if (savedHolidayDto) {
            const present = savedHolidayDto.vendorCode+","+savedHolidayDto.vendorName;
            console.log(present)
            // generating resposnse
        const response = new VendorsResponseModel(true,1,isUpdate? 'Vendor Updated Successfully': 'Vendor Created Successfully',savedHolidayDto,);
        console.log(response,'-response')
        const name =isUpdate ? 'update':'create'
        const userName = isUpdate ? savedHolidayDto.updatedUser : savedHolidayDto.createdUser
        const displayValue = isUpdate? 'Vendor Updated Successfully': 'Vendor Created Successfully'
      //  const newLogDto = new LogsDto(1,name, 'Vendors', savedHolidayDto.vendorId, true, displayValue,userName,previousValue,present)
      //  let res = await this.logService.createLog(newLogDto);
      //  console.log(res);
        return response;

          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            return new VendorsResponseModel(false,11106,'Vendor saved but issue while transforming into DTO');
          }
        //}
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          throw error;
        }
      }  
      async getAllVendors(req: VendorFilterRequest): Promise<AllVendorsResponseModel> {
        // const page: number = 1;
        try {
          const vendorsDtos: VendorsDTO[] = [];
          //retrieves all companies
          let vendorsEntities: Vendors[] = [];
          console.log(req,'------------req')
          vendorsEntities = await this.vendorsRepository.find({order :{vendorName:'ASC'}, relations:['currencyInfo']});
          if(req){
          vendorsEntities = await this.vendorsRepository.find({where:{vendorCode:req.vendorCode,contactNumber:req.contactNumber,city:req.city,gstNumber:req.gstNumber},order :{vendorName:'ASC'}, relations:['currencyInfo']});
          }
          if (vendorsEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            vendorsEntities.forEach(VendorEntity => {
              const convertedvendorsDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(
                VendorEntity
              );  
              vendorsDtos.push(convertedvendorsDto);
            });
    
            //generated response
        const response = new AllVendorsResponseModel(true,1,'Vendors retrieved successfully',vendorsDtos);
        // const newLogDto = new LogsDto(1,'view', 'Vendors', 0, true, '','')
            // let res = await this.logService.createLog(newLogDto);
            // console.log(res);
        return response;
        
          } else {
            throw new VendorsResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          throw err;
        }
      }
      async getAllActiveVendors(): Promise<AllVendorsResponseModel> {
        // const page: number = 1;
        try {
            const vendorsDtos: VendorsDTO[] = [];
            //retrieves all companies
            const vendorsEntities: Vendors[] = await this.vendorsRepository.find({ order: { vendorName: 'ASC' }, relations:['currencyInfo', 'countryInfo']
           });
         console.log(vendorsEntities)
            if (vendorsEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                vendorsEntities.forEach(VendorEntity => {
                    const convertedvendorsDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(
                      VendorEntity
                    );
                    vendorsDtos.push(convertedvendorsDto);
                });
                const response = new AllVendorsResponseModel(true, 11108, "Vendors retrieved successfully", vendorsDtos);
                return response;
            } else {
                throw new VendorsResponseModel(false,99998, 'Data not found'); vendorsDtos
            }
        } catch (err) {
            throw err;
        }
    }
      async activateOrDeactivateVendor(vendorReq: VendorRequest): Promise<VendorsResponseModel> {
        try {
            const vendorExists = await this.getVendorById(vendorReq.vendorId);
            if (vendorExists) {
                if (vendorReq.versionFlag !== vendorExists.versionFlag) {
                    throw new VendorsResponseModel(false,10113, 'Someone updated the current vendor information.Refresh and try again');
                } else {
                    
                        const vendorStatus =  await this.vendorsRepository.update(
                            { vendorId: vendorReq.vendorId },
                            { isActive: vendorReq.isActive,updatedUser: vendorReq.updatedUser });
                       
                        if (vendorExists.isActive) {
                            if (vendorStatus.affected) {
                                const vendorResponse: VendorsResponseModel = new VendorsResponseModel(true, 10115, 'Vendor is de-activated successfully');
                                return vendorResponse;
                            } else {
                                throw new VendorsResponseModel(false,10111, 'Vendor is already deactivated');
                            }
                        } else {
                            if (vendorStatus.affected) {
                                const vendorResponse: VendorsResponseModel = new VendorsResponseModel(true, 10114, 'vendor is activated successfully');
                                return vendorResponse;
                            } else {
                                throw new VendorsResponseModel(false,10112, 'vendor is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new VendorsResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            throw err;
        }
    }

    async getVendorById(vendorId: number): Promise<Vendors> {
        //  console.log(employeeId);
            const Response = await this.vendorsRepository.findOne({
            where: {vendorId: vendorId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

        async getVendorDataById(vendorRequest:VendorRequest): Promise<VendorsResponseModel> {
          try {
              //retrieves all companies
              const vendorEntity: Vendors = await this.vendorsRepository.findOne({
                where:{vendorId:vendorRequest.vendorId}, relations:['currencyInfo', 'countryInfo']
                });
                
                const vendorData: VendorsDTO = this.vendorsAdapter.convertEntityToDto(vendorEntity);
                if (vendorData) {
                    const response = new VendorsResponseModel(true, 11101 , 'Vendor retrived Successfully',vendorData);
                    return response;
                }
                else{
                    throw new VendorsResponseModel(false,11106,'No Data');
                }
                // generating resposnse
          } catch (err) {
              throw err;
          }
      }




      async getVendorsDropDownData(): Promise<VendorsDropDownResponseModel> {
        try {
            //retrieves all active vendors for drop down
            const vendorsEntities= await this.vendorsRepository.find({select:['vendorId', 'vendorName'],where:{isActive:true}, order: { vendorName: 'ASC' },
           });
            if (vendorsEntities) {
              const vendorsDetails:VendorDropDownDto[]=[];
                for(const vendor of vendorsEntities){
                  const vendorData = new VendorDropDownDto(vendor.vendorId, vendor.vendorName);
                  vendorsDetails.push(vendorData);
                }
                const response = new VendorsDropDownResponseModel(true, 11108, "Vendors retrieved successfully", vendorsDetails);
                // const newLogDto = new LogsDto(1,'view all vendors', 'Vendors', 0, true, '','')
                // let res = await this.logService.createLog(newLogDto);
                // console.log(res);
                return response;
            } else {
                throw new VendorsResponseModel(false,99998, 'Data not found'); 
            }
        } catch (err) {
            throw err;
        }
    }

    async getCurrenciesByVendorId(vendorReq: VendorRequest): Promise<AllVendorsResponseModel> {
      // const page: number = 1;
      try {
          const vendorDTO: VendorsDTO[] = [];
          
          const vendorEntity: Vendors[] = await this.vendorsRepository.find({ order: { vendorName: 'ASC' },where:{vendorId:vendorReq.vendorId,isActive:true},
         });
       console.log(vendorEntity)
          if (vendorEntity) {
              // converts the data fetched from the database which of type companies array to type StateDto array.
              vendorEntity.forEach(vendorEntity => {
                  const convertedVendorDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(
                   vendorEntity
                    
                  );
                 vendorDTO.push(convertedVendorDto);
              });
              const response = new AllVendorsResponseModel(true, 11108, "Currency retrieved successfully",vendorDTO);
              return response;
          } else {
              throw new VendorsResponseModel(false,99998, 'Data not found');vendorDTO
          }
      } catch (err) {
          throw err;
      }
  }

  async getVendorCodeDropdown(): Promise<AllVendorsResponseModel>{
    try {
      const vendorsDtos: VendorsDTO[] = [];
      //retrieves all companies
      const vendorsEntities: Vendors[] = await this.vendorsRepository.find({select:{vendorCode:true,vendorName:true},order:{vendorCode:'ASC'},relations:['currencyInfo']});
   console.log(vendorsEntities)
      if (vendorsEntities) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          vendorsEntities.forEach(VendorEntity => {
              const convertedvendorsDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(
                VendorEntity
              );
              vendorsDtos.push(convertedvendorsDto);
          });
          const response = new AllVendorsResponseModel(true, 11108, "Vendors retrieved successfully", vendorsDtos);
          return response;
      } else {
          throw new VendorsResponseModel(false,99998, 'Data not found'); vendorsDtos
      }
  } catch (err) {
      throw err;
  }
  }
  // const vendorEntity = await this.vendorsRepository.find({select:{contactNumber:true},order:{vendorCode:'ASC'}})
  async getVendorContactDropdown(): Promise<AllVendorsResponseModel>{
    try {
      const vendorsDtos: VendorsDTO[] = [];
      //retrieves all companies
      const vendorsEntities: Vendors[] = await this.vendorsRepository.find({select:{contactNumber:true},order:{vendorCode:'ASC'}, relations:['currencyInfo']});
   console.log(vendorsEntities)
      if (vendorsEntities) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          vendorsEntities.forEach(VendorEntity => {
              const convertedvendorsDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(
                VendorEntity
              );
              vendorsDtos.push(convertedvendorsDto);
          });
          const response = new AllVendorsResponseModel(true, 11108, "Vendors retrieved successfully", vendorsDtos);
          return response;
      } else {
          throw new VendorsResponseModel(false,99998, 'Data not found'); vendorsDtos
      }
  } catch (err) {
      throw err;
  }
  }

  async getVendorCityDropdown(): Promise<AllVendorsResponseModel>{
    // try{
    //   let dataQuery = `SELECT city from vendors GROUP BY city`
    //   const response = await this.dataSource.query(dataQuery)
    //   let info: VendorsDTO[] =[];
    //   if(response){
    //     for(const rec of response){

    //       const convertedvendorsDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(rec)
    //       info.push(convertedvendorsDto)
    //     }
    //     return new AllVendorsResponseModel(true,1,'Data retrieved',info)
    //   } else{
    //     return new AllVendorsResponseModel(false,0,'No data found',[])
    //   }
    // } catch(err){
    //   return err
    // }
    try {
      const vendorsDtos: VendorsDTO[] = [];
      //retrieves all companies
      let dataQuery = `SELECT city from vendors GROUP BY city `
      const vendorsEntities: Vendors[] = await this.dataSource.query(dataQuery)
      // const vendorsEntities: Vendors[] = await this.vendorsRepository.find({select:{contactNumber:true},order:{vendorCode:'ASC'},relations:['currencyInfo']});
   console.log(vendorsEntities)
      if (vendorsEntities) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          vendorsEntities.forEach(VendorEntity => {
              const convertedvendorsDto: VendorsDTO = this.vendorsAdapter.convertEntityToDto(
                VendorEntity
              );
              vendorsDtos.push(convertedvendorsDto);
          });
          const response = new AllVendorsResponseModel(true, 11108, "Vendors retrieved successfully", vendorsDtos);
          return response;
      } else {
          throw new VendorsResponseModel(false,99998, 'Data not found'); vendorsDtos
      }
  } catch (err) {
      throw err;
  }
  }

  
}
