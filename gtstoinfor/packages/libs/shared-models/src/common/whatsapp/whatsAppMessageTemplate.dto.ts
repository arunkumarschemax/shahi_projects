import { ComponentsDto } from "../components";


export class WhatsAppMessageTemplateDto{
    name : string;
    language : {code : string}
    components : ComponentsDto
}