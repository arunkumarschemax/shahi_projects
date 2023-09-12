// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TypetwoEntity } from '../entity/typetwo-entity';

// interface User {
//   typeId: number;
//   Quantity: string;
//   InnvoiceNumber: string;
//   Currency: string;
//   Origin: string;
//   Destination: string;
// }

// @Injectable()
// export class TypetwoService {
//   constructor(
//     @InjectRepository(TypetwoEntity)
//     private TypetwoRepo: Repository<TypetwoEntity>,
//   ) {}

//   async userdata(user: User): Promise<TypetwoEntity | boolean> {
//     console.log(user, 'user');
//     const data = await this.TypetwoRepo.findOne({
//       where: {
//         typeId: user.typeId,
//       },
//     });
//     console.log(data, 'data');
//     if (data) {
//       return false;
//     } else {
//       const newUser = await this.TypetwoRepo.save({
//         typeId: user.typeId,
//         Quantity: user.Quantity,
//         InnvoiceNumber: user.InnvoiceNumber,
//         Currency: user.Currency,
//         Origin: user.Origin,
//         Destination: user.Destination,
//       });
//       console.log(newUser, 'type2');
//       return newUser;
//     }
//   }

//   getdata(): Promise<TypetwoEntity[]> {
//     return this.TypetwoRepo.find();
//   }

//   async remove(typeId: number): Promise<void> {
//     await this.TypetwoRepo.delete(typeId);
//   }

//   async editData(data: TypetwoEntity, typeId: number): Promise<TypetwoEntity> {
//     const editedData = await this.TypetwoRepo.findOne({
//       where: {
//         typeId: typeId,
//       },
//     });
//     console.log(editedData, 'editeddata');
//     if (!editedData) {
//       throw new NotFoundException('Data is not found');
//     }
//     editedData.typeId = data.typeId;
//     editedData.Quantity = data.Quantity;
//     editedData.InnvoiceNumber = data.InnvoiceNumber;
//     editedData.Currency = data.Currency;
//     editedData.Origin = data.Origin;
//     editedData.Destination = data.Destination;

//     await this.TypetwoRepo.save(editedData);
//     return editedData;
//   }
// }
