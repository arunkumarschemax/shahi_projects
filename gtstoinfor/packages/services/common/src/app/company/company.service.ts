import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { CompanyDTO } from '../company/dto/company.dto';
import { Company } from '../company/company.entity';
import { CompanyAdapter } from '../company/dto/company.adapter';
import { AllCompanyResponseModel, CompanyResponseModel } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRequest } from './dto/company.request';
import { UserRequestDto } from './dto/userlog';

import {construnctDataFromM3Result,M3toCustomObj} from 'packages/libs/backend-utils/src/m3-utils/index'
import {M3GenericService} from '@project-management-system/shared-services';
import axios from 'axios'
const https = require('https');

const m3Connection = { USER_NAME: 'planmnb', PASSWORD: 'planmnb7' };

@Injectable()
export class CompanyService {

  constructor(

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private companyAdapter: CompanyAdapter,
    private m3GenericService : M3GenericService
  ) { }


  async getCompanyDetailsWithoutRelations(companyName: string): Promise<Company> {
    // tslint:disable-next-line: typedef
    const companyResponse = await this.companyRepository.findOne({
      where: { companyId: Raw(alias => `company_name = '${companyName}'`) },
    });
    if (companyResponse) {
      return companyResponse;
    } else {
      return null;
    }
  }

      async createCompany(companyDto: CompanyDTO, isUpdate: boolean): Promise<CompanyResponseModel> {
        console.log(companyDto,'nnnnnh');
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const companyEntity = await this.getCompanyDetailsWithoutRelations(companyDto.companyName);
            if (companyEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new CompanyResponseModel(false,11104, 'Company already exists');
            }
          }
          else{
            const certificatePrevious = await this.companyRepository.findOne({where:{companyId:companyDto.companyId}})
            previousValue = certificatePrevious.companyName
            const companyEntity = await this.getCompanyDetailsWithoutRelations(companyDto.companyName);
            if (companyEntity) {
              if(companyEntity.companyId!=companyDto.companyId) {
                throw new CompanyResponseModel(false,11104, 'Company already exists');      
              }
            }
          }
          const convertedCompanyEntity: Company = this.companyAdapter.convertDtoToEntity(companyDto,isUpdate);
          const savedCompanyEntity: Company = await this.companyRepository.save(
            convertedCompanyEntity
          );
          const savedCompanyDto: CompanyDTO = this.companyAdapter.convertEntityToDto(convertedCompanyEntity);
            // console.log(savedStateDto);
          if (savedCompanyDto) {
            const presentValue = savedCompanyDto.companyName;
           // generating resposnse
           const response = new CompanyResponseModel(true,1,isUpdate? 'Company Updated Successfully': 'Company Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Company Updated Successfully': 'Company Created Successfully'
           const userName = isUpdate? savedCompanyDto.updatedUser :savedCompanyDto.createdUser;
         
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new CompanyResponseModel(false,11106,'Company saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  

      async getAllCompany(req?:UserRequestDto): Promise<AllCompanyResponseModel> {
        // const page: number = 1;
        try {
          const CompanyDtos: CompanyDTO[] = [];
          //retrieves all companies
          const CompanyEntities: Company[] = await this.companyRepository.find({order :{'companyName':'ASC'}});
          //console.log(statesEntities);
          if (CompanyEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            CompanyEntities.forEach(CompanyEntity => {
              const convertedCompanyDto: CompanyDTO = this.companyAdapter.convertEntityToDto(
                CompanyEntity
              );
              CompanyDtos.push(convertedCompanyDto);
            });
            const response = new AllCompanyResponseModel(true,1,'Company retrieved successfully',CompanyDtos);
           
            return response;
          } else {
            throw new CompanyResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }
      async getAllActiveCompany(): Promise<AllCompanyResponseModel> {
        // const page: number = 1;
        try {
            const CompanyDtos: CompanyDTO[] = [];
            //retrieves all companies
            const CompanyEntities: Company[] = await this.companyRepository.find({ order: { 'companyName': 'ASC' },where:{isActive:true}
           });
         console.log(CompanyEntities)
            if (CompanyEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                CompanyEntities.forEach(countriesEntity => {
                    const convertedCompanyDtos: CompanyDTO = this.companyAdapter.convertEntityToDto(
                      countriesEntity
                    );
                    CompanyDtos.push(convertedCompanyDtos);
                });
                const response = new AllCompanyResponseModel(true, 11108, "Company retrieved successfully", CompanyDtos);
                return response;
            } else {
                throw new CompanyResponseModel(false,99998, 'Data not found'); CompanyDtos
            }
        } catch (err) {
            return err;
        }
    }
      async activateOrDeactivateCompany(companyReq: CompanyRequest): Promise<CompanyResponseModel> {
        try {
            const companyExists = await this.getCompanyById(companyReq.companyId);
            if (companyExists) {
                if (companyReq.versionFlag !== companyExists.versionFlag) {
                    throw new CompanyResponseModel(false,10113, 'Someone updated the current company information.Refresh and try again');
                } else {
                    
                        const companyStatus =  await this.companyRepository.update(
                            { companyId: companyReq.companyId },
                            { isActive: companyReq.isActive,updatedUser: companyReq.updatedUser });
                       
                        if (companyExists.isActive) {
                            if (companyStatus.affected) {
                                const companyResponse: CompanyResponseModel = new CompanyResponseModel(true, 10115, 'Company is de-activated successfully');
                                return companyResponse;
                            } else {
                                throw new CompanyResponseModel(false,10111, 'company is already deactivated');
                            }
                        } else {
                            if (companyStatus.affected) {
                                const CompanyResponse: CompanyResponseModel = new CompanyResponseModel(true, 10114, 'Company is activated successfully');
                                return CompanyResponse;
                            } else {
                                throw new CompanyResponseModel(false,10112, 'Company is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new CompanyResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
      async getActiveCompanyById(companyReq: CompanyRequest): Promise<CompanyResponseModel> {
        try {
            //retrieves all companies
            const companyEntities: Company = await this.companyRepository.findOne({
              where:{companyId:companyReq.companyId}
              });
              
              const companyData: CompanyDTO = this.companyAdapter.convertEntityToDto(companyEntities);
              if (companyData) {
                  const response = new CompanyResponseModel(true, 11101 , 'Company retrived Successfully',companyData);
                  return response;
              }
              else{
                  throw new CompanyResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

  async getCompanyById(companyId: number): Promise<Company> {
    //  console.log(employeeId);
    const Response = await this.companyRepository.findOne({
      where: { companyId: companyId },
    });
    // console.log(employeeResponse);
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

  async getCompanyDataFromM3() {
    try {
      const auth =
        'Basic ' +
        Buffer.from(
          `${m3Connection.USER_NAME}:${m3Connection.PASSWORD}`
        ).toString('base64');
      const headersRequest = {
        Authorization: `${auth}`,
      };
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const url = 'https://172.17.3.115:23005/m3api-rest/execute/MNS100MI/LstDivisions?CONO=111'
        const args = [{key :'CONO',value:'111'}]
      // const response = await this.m3GenericService.callM3Api('MNS100MI','LstDivisions',args)
    
      const response = await axios.get(url, { headers: headersRequest, httpsAgent: agent  })
      if (response) {
        if (response.data) {
          const options:M3toCustomObj[] = [{m3Key :'FACN' , yourKey :'companyName'},{m3Key:'TX15' , yourKey:'companyCode'}]
          const saveData = await construnctDataFromM3Result(options,response.data.MIRecord)
          const entityArr: Company[] = [];
          for(const data of saveData){
            const entityObj = new Company();
            entityObj.companyName = data.companyName
            entityObj.companyCode = data.companyCode
            entityArr.push(entityObj)
          } 
          
          const save = await this.companyRepository.save(entityArr)
          console.log('-------------------',save)
          return saveData;
        } else {
          return 'No response Data';
        }
      } else {
        ('No response');
      }   
    } catch (error) {
      console.log(error, '////////////////////');
      throw error;
    }
  }


}
