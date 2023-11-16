import { Body, Controller, Post } from "@nestjs/common";
import { LocationMappingService } from "./location-mapping.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LocationMappingReq, MaterialIssueIdreq, RackLocationStatusReq } from "@project-management-system/shared-models";

@ApiTags("locationMapping")
@Controller("/locationMapping")
export class LocationMappingController {

    constructor(
        private readonly service: LocationMappingService
    ) { }

    @Post("/getAllFabrics")
    async getAllFabrics(): Promise<any> {
        try {
            return this.service.getAllFabrics();
        } catch (error) {
            return error;
        }
    }

    @Post("/getAllActiveRackPositions")
    async getAllActiveRackPositions(): Promise<any> {
        try {
            return this.service.getAllActiveRackPositions();
        } catch (err) {
            return err;
        }
    }

    @Post("/getOneItemAllocateDetails")
    @ApiBody({ type: MaterialIssueIdreq })
    async getOneItemAllocateDetails(@Body() req: any): Promise<any> {
        try {
            return this.service.getOneItemAllocateDetails(req)
        } catch (err) {
            return err;
        }
    }

    @Post("/postToStockLogs")
    @ApiBody({ type: LocationMappingReq })
    async postToStockLogs(@Body() req: any) {
        try {
            return this.service.postToStockLogs(req)
        } catch (err) {
            return err;
        }
    }

    @Post("/updateRackLocationStatus")
    @ApiBody({ type: RackLocationStatusReq })
    async updateRackLocationStatus(@Body() req: any) {
        try {
            return this.service.updateRackLocationStatus(req)
        } catch (err) {
            return err;
        }
    }



}