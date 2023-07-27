import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ItemsService } from "./item.service";

@ApiTags('items')
@Controller('items')
export class ItemsController{
    constructor(
        private readonly itemsService :ItemsService
    ){}
    
}