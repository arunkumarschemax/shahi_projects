import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BomService } from "./bom-service";

@ApiTags('bom')
@Controller('bom')
export class BomController{
    constructor(
    private readonly bomService: BomService,      
    ){}
    
}