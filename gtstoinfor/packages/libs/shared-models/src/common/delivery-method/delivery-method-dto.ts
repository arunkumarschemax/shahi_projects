export class DeliveryMethodDto {
    deliveryMethodId?: number;
    deliveryMethod: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const DeliveryMethodDtoDefault : DeliveryMethodDto = {
    deliveryMethodId: 0,
    deliveryMethod: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};

