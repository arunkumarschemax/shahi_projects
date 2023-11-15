import { Module } from "@nestjs/common";
import { LocationMappingController } from "./location-mapping.controller";
import { LocationMappingService } from "./location-mapping.service";

@Module({
    providers: [LocationMappingService],
    controllers: [LocationMappingController],
    imports: []
})
export class LocationMappingModule { }