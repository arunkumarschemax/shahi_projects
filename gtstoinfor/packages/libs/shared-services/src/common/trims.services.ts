import { CommonResponseModel, DestinationreqModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class trimService extends CommonAxiosService{
    URL='/trims';

    async getAllTrims():Promise<any>{
        const trims=[
         {trim:'Backing Paper',
         trimId:1,
         format:[
            {
                formatId:'Backing Paper 1',
                printId:1,
            },


         ]
        },
        {
            trim:'Button',
            trimId:2,
            format:[
                {
                    formatId:'A0710085',
                    printId:2,
                },
                {
                    formatId:'A0715961',
                    printId:3,
                },
                {
                    formatId:'A0726468',
                    printId:4,
                },
            ]
        },
        {
            trim:'Country Inserts',
            trimId:2,
            format:[
                {formatId:'-'}
            ]
        },
        {
            trim:'Chennille SwooshLabel',
            trimId:2,
            format:[
                {
                    formatId:'Chennille SwooshLabel 1',
                    printId:5,

                   
                },
               
             
            ]
        },
        {
            trim:'Country Specific Sticker',
            trimId:2,
            format:[
                {
                    formatId:'Country Specific 1',
                   
                },
                {
                    formatId:'Country Specific 2',

                },
             
            ]
        }, {
            trim:'Country Stickers',
            trimId:2,
            format:[
                {
                    formatId:'-',
                   
                },
                
            ]
        }, 
        {
            trim:'Draw Cord',
            trimId:2,
            format:[
                {
                    formatId:'Draw Cord 1',
                   
                },
               
            ]
        },
        {
            trim:'Elastic',
            trimId:2,
            format:[
                {
                    formatId:'Elastic 1',
                   
                },
                {
                    formatId:'Elastic 2',

                },
                
            ]
        },
        {
            trim:'Gsl/Ucc Sticker',
            trimId:2,
            format:[
                {
                    formatId:'-',
                   
                },
                
            ]
        },
        {
            trim:'Hang Tag',
            trimId:2,
            format:[
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
        {
            trim:'Heat Transfer Label',
            trimId:2,
            format:[
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
        {
            trim:'Hm Sheet',
            trimId:2,
            format:[
                {
                    formatId:'F2',
                   
                },
                {
                    formatId:'F3',

                },
                {
                    formatId:'F4',

                },
            ],

        },
        {
            trim:'Jocktage',
            trimId:2,
            format:[
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
        {
            trim:'Jockertag',
            trimId:2,
            format:[
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
        {
            trim:'Kimble',
            trimId:2,
            format:[
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
        {
            trim:'Loose Fit Insert',
            trimId:2,
            format:[
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
        {
            trim:'Poid Labels',
            trimId:2,
            format:[
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
        {
            trim:'Shoulder Tape/ Twill Tape',
            trimId:2,
            format:[
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
        {
            trim:' Size Insert',
            trimId:2,
            format:[
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
        {
            trim:'Size Strip',
            trimId:2,
            format:[
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
        {
            trim:'Snaps',
            trimId:2,
            format:[
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
        }, {
            trim:'Swoosh HT',
            trimId:2,
            format:[
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
        {
            trim:'Size Strip',
            trimId:2,
            format:[
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
        {
            trim:'Threads',
            trimId:2,
            format:[
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
        {
            trim:'Tissue Paper',
            trimId:2,
            format:[
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
        {
            trim:'WashCare Label',
            trimId:2,
            format:[
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