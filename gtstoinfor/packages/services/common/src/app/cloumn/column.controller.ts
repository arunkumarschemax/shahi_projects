import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ColumnService } from "./column.service";
import { ColumnResponseModel, CommonResponseModel } from "@project-management-system/shared-models";

@ApiTags('columns')
@Controller('columns')
export class ColumnController {
    constructor(
        private columnService: ColumnService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createColumn')
    async createcolumn(@Body() req:any): Promise<ColumnResponseModel> {
        try {
            return await this.columnService.createColumn(req,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ColumnResponseModel, error)
        }
    }

    @Post('/updateColumn')
    async updatecolumn(@Body() req:any): Promise<ColumnResponseModel> {
        try {
            return await this.columnService.createColumn(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ColumnResponseModel, error)
        }
    }

    @Post('/getAllColumnInfo')
    async getAllcolumnInfo(): Promise<ColumnResponseModel> {
        try {
            return await this.columnService.getAllColumnInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ColumnResponseModel, error)
        }
    }

    @Post('/activateOrDeactivateColumn')
    async activateOrDeactivatecolumn(@Body() req:any): Promise<ColumnResponseModel> {
        try {
            return await this.columnService.activateOrDeactivateColumn(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ColumnResponseModel, error)
        }
    }

    @Post('/getAllActiveColumnInfo')
    async getAllActivecolumnInfo(): Promise<ColumnResponseModel> {
        try {
            return await this.columnService.getAllActiveColumnInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ColumnResponseModel, error)
        }
    }

}