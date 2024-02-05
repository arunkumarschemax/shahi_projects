import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ProductService } from './product.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProductDto } from './dto/product.dto';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { ProductReq } from './dto/product-req';


@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private service: ProductService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createProduct')
    @ApiBody({type:ProductDto})
    async createProduct(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.service.createProduct(req, false);
    } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
    }
  
    @Post('/updateProduct')
    @ApiBody({type: ProductDto})
    async updateProduct(@Body() dto: any): Promise<CommonResponseModel> {
      try {
        return await this.service.createProduct(dto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }


  @Post('/getAllProducts')
  async getAllProducts(): Promise<CommonResponseModel> {
    try {
      return await this.service.getAllProducts();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getAllActiveProducts')
  async getAllActiveProducts(): Promise<CommonResponseModel> {
    try {
      return await this.service.getAllActiveProducts();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateProduct')
  @ApiBody({type: ProductReq})
  async activateOrDeactivateProduct(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.service.activateOrDeactivateProduct(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
}
