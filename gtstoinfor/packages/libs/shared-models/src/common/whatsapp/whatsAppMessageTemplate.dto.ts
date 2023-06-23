import { ComponentsDto } from "../components.dto";

export class WhatsAppMessageTemplateDto{
    name : string;
    language : {code : string}
    components : ComponentsDto
}