import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { CurrenciesDTO } from '../currencies/dto/currencies.dto';
import { Currencies} from '../currencies/currencies.entity';
import { CurrenciesAdapter } from '../currencies/dto/currencies.adapter';
import { AllCurrencyResponseModel, CurrencyResponseModel } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyRequest } from './dto/currencies.request';
import { UserRequestDto } from './dto/user-logs-dto';

@Injectable()
export class CurrenciesService {
  
    constructor(
      
        @InjectRepository(Currencies)
        private currenciesRepository: Repository<Currencies>,
        private currenciesAdapter: CurrenciesAdapter,
    ){}

    async getCurrencyDetailsWithoutRelations(currencyName: string): Promise<Currencies> {
        // tslint:disable-next-line: typedef
        const currenciesResponse = await this.currenciesRepository.findOne({
          where: {currencyId: Raw(alias => `currency_name = '${currencyName}'`)},
        });
        if (currenciesResponse) {
          return currenciesResponse;
        } else {
          return null;
        }
      }

      async createCurrency(currenciesDto: CurrenciesDTO, isUpdate: boolean): Promise<CurrencyResponseModel> {
        // console.log(currenciesDto,'nnnnnh');
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const currenciesEntity = await this.getCurrencyDetailsWithoutRelations(currenciesDto.currencyName);
            if (currenciesEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new CurrencyResponseModel(false,11104, 'Currency already exists');
            }
          }
          else{
            const certificatePrevious = await this.currenciesRepository.findOne({where:{currencyId:currenciesDto.currencyId}})
            previousValue = certificatePrevious.currencyName
            const currenciesEntity = await this.getCurrencyDetailsWithoutRelations(currenciesDto.currencyName);
            if (currenciesEntity) {
              if(currenciesEntity.currencyId!=currenciesDto.currencyId) {
                throw new CurrencyResponseModel(false,11104, 'Currency already exists');      
              }
            }
          }
          const convertedCurrencyEntity: Currencies = this.currenciesAdapter.convertDtoToEntity(currenciesDto,isUpdate);
          const savedCurrencyEntity: Currencies = await this.currenciesRepository.save( convertedCurrencyEntity);
          const savedCurrencyDto: CurrenciesDTO = this.currenciesAdapter.convertEntityToDto(savedCurrencyEntity);
            // console.log(savedStateDto);
          if (savedCurrencyDto) {
            const presentValue = savedCurrencyDto.currencyName;
           // generating resposnse
           const response = new CurrencyResponseModel(true,1,isUpdate? 'Currency Updated Successfully': 'Currency Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Currency Updated Successfully': 'Currency Created Successfully'
           const userName = isUpdate? savedCurrencyDto.updatedUser :savedCurrencyDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new CurrencyResponseModel(false,11106,'Currency saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  

      async getAllCurrencies(req?:UserRequestDto): Promise<AllCurrencyResponseModel> {
        // const page: number = 1;
        try {
          const CurrenciesDtos: CurrenciesDTO[] = [];
          //retrieves all companies
          const CurrenciesEntities: Currencies[] = await this.currenciesRepository.find({order :{'currencyName':'ASC'}});
          //console.log(statesEntities);
          if (CurrenciesEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            CurrenciesEntities.forEach(CurrencyEntity => {
              const convertedCurrenciesDto: CurrenciesDTO = this.currenciesAdapter.convertEntityToDto(
                CurrencyEntity
              );
              CurrenciesDtos.push(convertedCurrenciesDto);
            });
            const response = new AllCurrencyResponseModel(true,1,'Currencies retrieved successfully',CurrenciesDtos);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new CurrencyResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }
      async getAllActiveCurrencies(): Promise<AllCurrencyResponseModel> {
        // const page: number = 1;
        try {
            const CurrenciesDtos: CurrenciesDTO[] = [];
            //retrieves all companies
            const CurrenciesEntities: Currencies[] = await this.currenciesRepository.find({ order: { 'currencyName': 'ASC' },where:{isActive:true}
           });
        //  console.log(CurrenciesEntities)
            if (CurrenciesEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                CurrenciesEntities.forEach(countriesEntity => {
                    const convertedCurrenciesDtos: CurrenciesDTO = this.currenciesAdapter.convertEntityToDto(
                      countriesEntity
                    );
                    CurrenciesDtos.push(convertedCurrenciesDtos);
                });
                const response = new AllCurrencyResponseModel(true, 11108, "Currencies retrieved successfully", CurrenciesDtos);
                return response;
            } else {
                throw new CurrencyResponseModel(false,99998, 'Data not found'); CurrenciesDtos
            }
        } catch (err) {
            return err;
        }
    }
      async activateOrDeactivateCurrency(currencyReq: any): Promise<CurrencyResponseModel> {
        try {
            const currencyExists = await this.getCurrencyById(currencyReq.currencyId);
            if (currencyExists) {
                if (currencyReq.versionFlag !== currencyExists.versionFlag) {
                    throw new CurrencyResponseModel(false,10113, 'Someone updated the current currency information.Refresh and try again');
                } else {
                    
                        const currencyStatus =  await this.currenciesRepository.update(
                            { currencyId: currencyReq.currencyId },
                            { isActive: currencyReq.isActive,updatedUser: currencyReq.updatedUser });
                       
                        if (currencyExists.isActive) {
                            if (currencyStatus.affected) {
                                const currencyResponse: CurrencyResponseModel = new CurrencyResponseModel(true, 10115, 'Currency is Deactivated Successfully');
                                return currencyResponse;
                            } else {
                                throw new CurrencyResponseModel(false,10111, 'Currency is already deactivated');
                            }
                        } else {
                            if (currencyStatus.affected) {
                                const CurrencyResponse: CurrencyResponseModel = new CurrencyResponseModel(true, 10114, 'Currency is Activated Successfully');
                                return CurrencyResponse;
                            } else {
                                throw new CurrencyResponseModel(false,10112, 'Currency is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new CurrencyResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
      async getActiveCurrencyById(currencyReq: CurrencyRequest): Promise<CurrencyResponseModel> {
        try {
            //retrieves all companies
            const currencyEntities: Currencies = await this.currenciesRepository.findOne({
              where:{currencyId:currencyReq.currencyId}
              });
              
              const currencyData: CurrenciesDTO = this.currenciesAdapter.convertEntityToDto(currencyEntities);
              if (currencyData) {
                  const response = new CurrencyResponseModel(true, 11101 , 'Currency Retrived Successfully',currencyData);
                  return response;
              }
              else{
                  throw new CurrencyResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getCurrencyById(currencyId: number): Promise<Currencies> {
        //  console.log(employeeId);
            const Response = await this.currenciesRepository.findOne({
            where: {currencyId: currencyId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
