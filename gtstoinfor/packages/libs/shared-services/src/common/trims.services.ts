import { CommonResponseModel, DestinationreqModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class trimService extends CommonAxiosService{
    URL='/trims';

    async getAllTrims():Promise<any>{
        const trims=[
         {trim:'Backing Paper',
         trimId:1,
         foramt:[
            {
                formatId:'F1',
                // print:''
            },

         ]
        },
        {
            trim:'Button',
            trimId:2,
            foramt:[
                {
                    formatId:'F2',

                },
                {
                    formatId:'F3',

                },
                {
                    formatId:'F4',

                },
            ]
        },
        ]
        return trims;
    }

   
}