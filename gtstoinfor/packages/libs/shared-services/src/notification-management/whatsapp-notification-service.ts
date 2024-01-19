import connection from "./whatsapp-connection";
import axios from 'axios';
import { config } from "packages/libs/shared-services/config";
import WhatsAppInfo from "../whatsapp-info";
import { MessageParameters, MessageResponse, WhatsAppLogDto, GlobalResponseObject } from "@project-management-system/shared-models";

export class WhatsAppNotificationService {
    URL = connection.DEPLOY_URL;
   whatsappbiMessageURL = config.whatsapp_broadcast_url+'/bi-message';


    async sendMessageThroughFbApi(message: MessageParameters): Promise<MessageResponse> {
        return await axios.post(`https://graph.facebook.com/${WhatsAppInfo.VERSION}/${WhatsAppInfo.PHONE_NUMBER_ID}/messages`, {
            "messaging_product": "whatsapp",
            "to": message.recepient,
            "type": "template",
            "template": {
                "name": message.template,
                "language": {
                    "code": message.languageCode ? message.languageCode : "en_us"
                },
                "components": [
                    // {
                    //     "type": "header",
                    //     "parameters": [{ "type": "text", "text": "Sandhya Aqua" }]
                    // },
                    {
                        "type": "body",
                        "parameters": message.parameters,

                    }
                    
                ]
            }
        }, {
            "headers": {
                'Authorization': `Bearer ${WhatsAppInfo.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            return new MessageResponse(true,'success');
        }).catch(err => { 
            
            return new MessageResponse(false,err) });
    }

    async createWhatappLog(req: WhatsAppLogDto): Promise<GlobalResponseObject> {

        // console.log(this.whatsAppBroadCatURL)
          return await axios.post(this.whatsappbiMessageURL + '/createWhatappLog', req)
              .then(res => {
                console.log(res)
                  return res.data
              })
      }


    
}