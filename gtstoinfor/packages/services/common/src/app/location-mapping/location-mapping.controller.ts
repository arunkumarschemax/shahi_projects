import { Controller, Post } from "@nestjs/common";
import { LocationMappingService } from "./location-mapping.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("/locationMapping")
@Controller("/locationMapping")
export class LocationMappingController {

    constructor(
        private readonly service: LocationMappingService
    ) { }

    @Post("/getAllActiveRackPositions")
    async getAllActiveRackPositions(): Promise<any> {
        try {
            return this.service.getAllActiveRackPositions();
        } catch (err) {
            return err;
        }
    }
}