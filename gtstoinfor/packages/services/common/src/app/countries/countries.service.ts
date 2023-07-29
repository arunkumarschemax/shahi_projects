import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Countries} from './countries.entity';
import {CountriesDTO} from './dto/countries.dto';
import {CountriesAdapter} from './dto/countries.adapter';
import { CountryRequest } from './dto/countries.request';
import { UserRequestDto } from './dto/user-request-dto';
import { AllCountriesResponseModel, CountriesResponseModel } from '@project-management-system/shared-models';


@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Countries)
        private countriesRepository: Repository<Countries>,
        private countriesAdapter: CountriesAdapter,
    ){}
    /**
     * get country details
     * @param countryName 
     */
    // @LogActions({isAsync: true})
    async getCountryDetailsWithoutRelations(countryName: string): Promise<Countries> {
        // tslint:disable-next-line: typedef
        const countriesResponse = await this.countriesRepository.findOne({
          where: {countryName: Raw(alias => `country_name = '${countryName}'`)},
        });
        if (countriesResponse) {
          return countriesResponse;
        } else {
          return null;
        }
      }

      async createCountry(countriesDto: CountriesDTO, isUpdate: boolean): Promise<CountriesResponseModel> {
        // console.log(statesDto);
        try {
          let previousValue
          // const newLogDto = new LogsDto(1,'create', 'Certificates', countriesDto.countryId, true, '',countriesDto.createdUser)
          //   let res = await this.logService.createLog(newLogDto);
          //   console.log(res);
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const countriesEntity = await this.getCountryDetailsWithoutRelations(countriesDto.countryName);
            if (countriesEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new CountriesResponseModel(false,11104, 'Country already exists');
            }
          }
          else{
            const certificatePrevious = await this.countriesRepository.findOne({where:{countryId:countriesDto.countryId}})
            previousValue = certificatePrevious.countryName
            const countriesEntity = await this.getCountryDetailsWithoutRelations(countriesDto.countryName);
            if (countriesEntity) {
              if(countriesEntity.countryId!=countriesDto.countryId) {
                throw new CountriesResponseModel(false,11104, 'Country already exists');      
            }
              //return new InformationMessageError(11104, "State already exists");
            }
          }
          const convertedCountryEntity: Countries = this.countriesAdapter.convertDtoToEntity(countriesDto,isUpdate);
          const savedCountryEntity: Countries = await this.countriesRepository.save(
            convertedCountryEntity
          );
          const savedCurrencyDto: CountriesDTO = this.countriesAdapter.convertEntityToDto(convertedCountryEntity);
            // console.log(savedStateDto);
          if (savedCurrencyDto) {
            const presentValue = savedCurrencyDto.countryName;
            // generating resposnse
            const response = new CountriesResponseModel(true,1,isUpdate? 'Country Updated Successfully': 'Country Created Successfully')
           
            const name=isUpdate?'updated':'created'
            const displayValue = isUpdate? 'Country Updated Successfully': 'Country Created Successfully'
            const userName = isUpdate? savedCurrencyDto.updatedUser :savedCurrencyDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Countries', savedCurrencyDto.countryId, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            // console.log
            // (newLogDto,'newLogDto')
            // console.log(res,'123');
            return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new CountriesResponseModel(false,11106,'Country saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  

      async getAllCountries(req?:UserRequestDto): Promise<AllCountriesResponseModel> {
        // const page: number = 1;
        
        try {
          const CountriesDtos: CountriesDTO[] = [];
          //retrieves all companies
          const CountriesEntities: Countries[] = await this.countriesRepository.find({order :{'countryName':'ASC'}});
          //console.log(statesEntities);
          if (CountriesEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            CountriesEntities.forEach(CountryEntity => {
              const convertedCountriesDto: CountriesDTO = this.countriesAdapter.convertEntityToDto(
                CountryEntity
              );
              CountriesDtos.push(convertedCountriesDto);
            });
            const response = new AllCountriesResponseModel(true,1,'Country retrieved successfully',CountriesDtos);
            //generated response
          // if (req?.createdUser){
          //   const newLogDto = new LogsDto(0,'view', 'Countries', 0, true, 'Country retrieved successfully',req.createdUser,'','')
          //   let res = await this.logService.createLog(newLogDto);
          //   console.log(res);
          // }
            return response
          } else {
            throw new CountriesResponseModel(false,99998, 'Data not found');
          }
        
        } catch (err) {
          return err;
        }
      }
      async getAllActiveCountries(): Promise<AllCountriesResponseModel> {
        // const page: number = 1;
        try {
            const countriesDto: CountriesDTO[] = [];
            //retrieves all companies
            const CountriesEntities: Countries[] = await this.countriesRepository.find({ order: { 'countryName': 'ASC' },where:{isActive:true},
           });
         console.log(CountriesEntities)
            if (CountriesEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                CountriesEntities.forEach(countriesEntity => {
                    const convertedcountriesDto: CountriesDTO = this.countriesAdapter.convertEntityToDto(
                      countriesEntity
                      
                    );
                    countriesDto.push(convertedcountriesDto);
                });
                const response = new AllCountriesResponseModel(true, 11108, "Countries retrieved successfully", countriesDto);
                return response;
            } else {
                throw new CountriesResponseModel(false,99998, 'Data not found'); countriesDto
            }
        } catch (err) {
            return err;
        }
    }
      async activateOrDeactivateCountry(countryReq: CountryRequest): Promise<CountriesResponseModel> {
        try {
            const countryExists = await this.getCountryById(countryReq.countryId);
            if (countryExists) {
                if (countryReq.versionFlag !== countryExists.versionFlag) {
                    throw new CountriesResponseModel(false,10113, 'Someone updated the current country information.Refresh and try again');
                } else {
                    
                        const countryStatus =  await this.countriesRepository.update(
                            { countryId: countryReq.countryId },
                            { isActive: countryReq.isActive,updatedUser: countryReq.updatedUser });
                       
                        if (countryExists.isActive) {
                            if (countryStatus.affected) {
                                const countryResponse: CountriesResponseModel = new CountriesResponseModel(true, 10115, 'Country is de-activated successfully');
                                return countryResponse;
                            } else {
                                throw new CountriesResponseModel(false,10111, 'Country is already deactivated');
                            }
                        } else {
                            if (countryStatus.affected) {
                                const CountryResponse: CountriesResponseModel = new CountriesResponseModel(true, 10114, 'Country is activated successfully');
                                return CountryResponse;
                            } else {
                                throw new CountriesResponseModel(false,10112, 'Country is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new CountriesResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
      async getActiveCountryById(countryReq: CountryRequest): Promise<CountriesResponseModel> {
        try {
          //retrieves all companies
          const CountryEntities: Countries = await this.countriesRepository.findOne({
              where:{countryId:countryReq.countryId}
              });
              
              const countriesData: CountriesDTO = this.countriesAdapter.convertEntityToDto(CountryEntities);
              if (countriesData) {
                  const response = new CountriesResponseModel(true, 11101 , 'Country retrived Successfully',countriesData);
                  return response;
              }
              else{
                  throw new CountriesResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
      } catch (err) {
          return err;
      }
    }

    async getCountryById(countryId: number): Promise<Countries> {
        //  console.log(employeeId);
            const Response = await this.countriesRepository.findOne({
            where: {countryId: countryId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }
}
