// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TypethreeEntity } from '../entity/typethree-entity';

// interface User {
//   typeId: number;
//   CustomerNo: string;
//   Acknumber: string;
//   Pannumber: string;
//   Amountdue: string;
// }

// @Injectable()
// export class TypethreeService {
//   constructor(
//     @InjectRepository(TypethreeEntity)
//     private TypethreeRepo: Repository<TypethreeEntity>,
//   ) {}

//   async userdata(user: User): Promise<TypethreeEntity | boolean> {
//     console.log(user, 'user');
//     const data = await this.TypethreeRepo.findOne({
//       where: {
//         typeId: user.typeId,
//       },
//     });
//     console.log(data, 'data');
//     if (data) {
//       return false;
//     } else {
//       const newUser = await this.TypethreeRepo.save({
//         typeId: user.typeId,
//         CustomerNo: user.CustomerNo,
//         Acknumber: user.Acknumber,
//         Pannumber: user.Pannumber,
//         Amountdue: user.Acknumber,
//       });
//       console.log(newUser, 'type3');
//       return newUser;
//     }
//   }

//   getdata(): Promise<TypethreeEntity[]> {
//     return this.TypethreeRepo.find();
//   }

//   async remove(typeId: number): Promise<void> {
//     await this.TypethreeRepo.delete(typeId);
//   }

//   async editData(
//     data: TypethreeEntity,
//     typeId: number,
//   ): Promise<TypethreeEntity> {
//     const editedData = await this.TypethreeRepo.findOne({
//       where: {
//         typeId: typeId,
//       },
//     });
//     console.log(editedData, 'editeddata');
//     if (!editedData) {
//       throw new NotFoundException('Data is not found');
//     }
//     editedData.typeId = data.typeId;
//     editedData.CustomerNo = data.CustomerNo;
//     editedData.Acknumber = data.Acknumber;
//     editedData.Pannumber = data.Pannumber;
//     editedData.Amountdue = data.Amountdue;

//     await this.TypethreeRepo.save(editedData);
//     return editedData;
//   }
// }
