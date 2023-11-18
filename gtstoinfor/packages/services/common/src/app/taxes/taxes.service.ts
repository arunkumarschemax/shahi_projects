import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { TaxesAdapter } from './dto/taxes.adapter';
import { TaxesDTO } from './dto/taxes.dto';
import { TaxesRequest } from './dto/taxes.request';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { Taxes } from './dto/taxes.entity';
import {AllTaxesResponseModel, TaxDropDownDto, TaxDropDownResponse, TaxesResponseModel}   from '@project-management-system/shared-models' 
@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Taxes)
    private taxesRepository: Repository<Taxes>,
    private taxesAdapter: TaxesAdapter
  ) { }
  /**
   * create or update Taxes
   * @param taxesDTO
   * @param isUpdate
   * @param request
   */
  async createTax(
    taxesDTO: TaxesDTO,
    isUpdate: boolean,
    request: Request
  ): Promise<TaxesResponseModel> {
    try {
      let previousValue
      // to check whether Tax exists with the passed  Tax  or not. if isUpdate is false, a check will be done whether a record with the passed Tax is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed Tax  then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
      if (!isUpdate) {
        const TaxEntity = await this.getTaxDetailsWithoutRelations(
          // taxesDTO.taxPercentage,
          taxesDTO.taxName
        );
        if (TaxEntity) {
          
          throw new TaxesResponseModel(false,11104, 'Tax already exists');
        }
        var notificationStatus = 'Created';

      }

      if (isUpdate) {
        
        const TaxEntity = await this.getTaxDetailsWithoutRelations(
          // taxesDTO.taxPercentage,
          taxesDTO.taxName
        );
        if (TaxEntity) {
          if (TaxEntity.taxId != taxesDTO.taxId) {
            throw new TaxesResponseModel(false,11104, 'Tax already exists');
          }

        }
        const certificatePrevious = await this.taxesRepository.findOne({where:{taxId:taxesDTO.taxId}})
          previousValue = certificatePrevious.taxName+","+certificatePrevious.taxPercentage+","+certificatePrevious.taxcategory;

        // var notificationStatus = 'Created';
      } 
      // else {
      //   var notificationStatus = 'Updated';
      // }

      const convertedTaxEntity: Taxes = this.taxesAdapter.convertDtoToEntity(
        taxesDTO,
        isUpdate
      );
      const savedTaxEntity: Taxes = await this.taxesRepository.save(
        convertedTaxEntity
      );
      const savedTaxDto: TaxesDTO = this.taxesAdapter.convertEntityToDto(
        savedTaxEntity
      );
      if (savedTaxDto) {
        const certificatePresent = savedTaxDto.taxName+","+savedTaxDto.taxPercentage+","+savedTaxDto.taxCategory
        // generating resposnse
        const response = new TaxesResponseModel(
          true,
          isUpdate ? 11101 : 11100,
          isUpdate
            ? 'Taxes Updated Successfully'
            : 'Taxes Created Successfully',
          savedTaxDto
        );
        return response;
      } else {
        throw new TaxesResponseModel(false,
          11106,
          'Tax saved but issue while transforming into DTO'
        );
      }
    } catch (error) {
      // when error occures while saving the data , the execution will come to catch block.
      // tslint:disable-next-line: typedef
      return error;
    }
  }
  /**
   * get tax details by taxPercentage and taxName
   * @param taxPercentage
   * @param taxName
   */
  // @LogActions({isAsync: true})
  async getTaxDetailsWithoutRelations(
    // taxPercentage: number,
    taxName: string
  ): Promise<Taxes> {
    // tslint:disable-next-line: typedef
    const TaxResponse = await this.taxesRepository.findOne({
      where: {
        taxName: Raw((alias) => `tax_name = '${taxName}'`),
        // taxPercentage: Raw((alias) => `tax_percentage = '${taxPercentage}'`),
      },
    });
    if (TaxResponse) {
      return TaxResponse;
    } else {
      return null;
    }
  }
  /**
   * get all taxes details
   */
  async getAllTaxes(req?:UserRequestDto): Promise<AllTaxesResponseModel> {
    // const page: number = 1;
    try {
      const taxesDTO: TaxesDTO[] = [];
      //retrieves all companies
      const taxesEntities: Taxes[] = await this.taxesRepository.find({
        order: { taxName: 'ASC' },
      });
      //console.log(taxesEntities);
      if (taxesEntities) {
        // converts the data fetched from the database which of type companies array to type TaxesDto array.
        taxesEntities.forEach((taxEntity) => {
          const convertedtaxDto: TaxesDTO = this.taxesAdapter.convertEntityToDto(
            taxEntity
          );
          taxesDTO.push(convertedtaxDto);
        });
        const response = new AllTaxesResponseModel(
          true,
          11108,
          'Taxes retrieved successfully',
          taxesDTO
        );
        return response;
        //generated response
      } else {
        throw new TaxesResponseModel(false,99998, 'Data not found');
      }
    } catch (err) {
      return err;
    }
  }
  async getAllActiveTaxes(): Promise<AllTaxesResponseModel> {
    // const page: number = 1;
    try {
      const taxesEntities: TaxesDTO[] = [];
      //retrieves all companies
      const TaxesEntities: Taxes[] = await this.taxesRepository.find({
        order: { taxName: 'ASC' },
        where: { isActive: true }
      });
      console.log(TaxesEntities);
      if (TaxesEntities) {
        // converts the data fetched from the database which of type companies array to type StateDto array.
        TaxesEntities.forEach((taxEntity) => {
          const convertedtaxesEntities: TaxesDTO = this.taxesAdapter.convertEntityToDto(
            taxEntity
          );
          taxesEntities.push(convertedtaxesEntities);
        });
        const response = new AllTaxesResponseModel(
          true,
          11108,
          'Taxes retrieved successfully',
          taxesEntities
        );
        return response;
      } else {
        throw new TaxesResponseModel(false,99998, 'Data not found');
        taxesEntities;
      }
    } catch (err) {
      return err;
    }
  }

  /**
   * It deactivates Tax
   * @returns true or false
   */
  // @LogActions({isAsync: true})
  async activateOrDeactivateTax(
    taxReq: TaxesRequest
  ): Promise<TaxesResponseModel> {
    try {
      const taxExists = await this.getTaxById(taxReq.taxId);
      if (taxExists) {
        if (taxReq.versionFlag !== taxExists.versionFlag) {
          throw new TaxesResponseModel(false,
            10113,
            'Someone updated the current Tax information.Refresh and try again'
          );
        } else {
          const taxStatus = await this.taxesRepository.update(
            { taxId: taxReq.taxId },
            { isActive: taxReq.isActive, updatedUser: taxReq.updatedUser }
          );

          if (taxExists.isActive) {
            if (taxStatus.affected) {
              const taxResponse: TaxesResponseModel = new TaxesResponseModel(
                true,
                10115,
                'Tax is Deactivated successfully'
              );
              return taxResponse;
            } else {
              throw new TaxesResponseModel(false,10111, 'Tax is already Deactivated');
            }
          } else {
            if (taxStatus.affected) {
              const taxResponse: TaxesResponseModel = new TaxesResponseModel(
                true,
                10114,
                'Tax is Activated successfully'
              );
              return taxResponse;
            } else {
              throw new TaxesResponseModel(false,10112, 'Tax is already Activated');
            }
          }
          // }
        }
      } else {
        throw new TaxesResponseModel(false,99998, 'No Records Found');
      }
    } catch (err) {
      return err;
    }
  }
  /**
   * get tax while passing id
   * @param taxId
   */
  async getTaxById(taxId: number): Promise<Taxes> {
    const Response = await this.taxesRepository.findOne({
      where: { taxId: taxId },
    });
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

  /**
   *
   * @param taxId
   * @returns
   */
  async getTaxForId(taxId: number): Promise<TaxDropDownDto> {
    const Response = await this.taxesRepository.findOne({
      where: { taxId: taxId },
    });
    if (Response) {
      const tax = new TaxDropDownDto(
        Response.taxId,
        Response.taxName,
        Response.taxPercentage,
        Response.taxcategory,
      );
      return tax;
    } else {
      return null;
    }
  }

  async getTaxForNoTax(): Promise<TaxDropDownDto> {
    const Response = await this.taxesRepository.findOne({
      where: { taxName: 'No Tax(%)' },
    });
    if (Response) {
      const tax = new TaxDropDownDto(
        Response.taxId,
        Response.taxName,
        Response.taxPercentage
      );
      return tax;
    } else {
      return null;
    }
  }
  async getDefaultTaxForPO(): Promise<TaxDropDownDto> {
    const Response = await this.taxesRepository.findOne({
      where: { taxName: 'CGST-SGST 18' },
    });
    if (Response) {
      const tax = new TaxDropDownDto(
        Response.taxId,
        Response.taxName,
        Response.taxPercentage
      );
      return tax;
    } else {
      return null;
    }
  }

  async getActiveTaxDropDown(): Promise<TaxDropDownResponse> {
    const taxes: TaxDropDownDto[] = await this.taxesRepository
      .createQueryBuilder('item_sub_categories')
      .select('tax_id as taxId, tax_name as taxName, tax_percentage as taxPercentage')
      .where(`is_active=1`)
      .orderBy('tax_name')
      .getRawMany();

    if (taxes && taxes.length > 0) {
      const response = new TaxDropDownResponse(true, 11108, "Item sub categories retrieved successfully", taxes);
      return response;
    } else {
      throw new TaxesResponseModel(false,99998, 'Data not found');
    }

  }
}
