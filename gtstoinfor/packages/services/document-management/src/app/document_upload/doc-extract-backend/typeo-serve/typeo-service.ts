import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeoEntity } from '../entity/typeo-entity';

interface User {
  typeId: number;
  GST: string;
  IFSC: string;
  Innvoice: string;
  Customer: string;
  Packages: string;
  Volume: string;
  Weight: string;
  Chargeable: string;
  Date: string;
  Cartons: string;
  Console: string;
  PO: string;
  Payref: string;
}

@Injectable()
export class TypeoService {
  constructor(
    @InjectRepository(TypeoEntity)
    private TypeoRepo: Repository<TypeoEntity>,
  ) {}

  async userdata(user: User): Promise<TypeoEntity | boolean> {
    console.log(user, 'user');
    const data = await this.TypeoRepo.findOne({
      where: {
        typeId: user.typeId,
      },
    });
    console.log(data, 'data');
    if (data) {
      return false;
    } else {
      const newUser = await this.TypeoRepo.save({
        typeId: user.typeId,
        GST: user.GST,
        IFSC: user.IFSC,
        Innvoice: user.Innvoice,
        Customer: user.Customer,
        Packages: user.Packages,
        Volume: user.Volume,
        Weight: user.Weight,
        Chargeable: user.Chargeable,
        Date: user.Date,
        Cartons: user.Cartons,
        Console: user.Console,
        PO: user.PO,
        Payref: user.Payref,
      });
      console.log(newUser, 'type1');
      return newUser;
    }
  }

  async getdata(): Promise<any> {
    const records = await this.TypeoRepo.find();
    if(!records.length){
      return records;
    }
    return records;
  }

  async remove(typeId: number): Promise<void> {
    await this.TypeoRepo.delete(typeId);
  }

  async editData(data: TypeoEntity, typeId: number): Promise<TypeoEntity> {
    const editedData = await this.TypeoRepo.findOne({
      where: {
        typeId: typeId,
      },
    });
    console.log(editedData, 'editeddata');
    if (!editedData) {
      throw new NotFoundException('Data is not found');
    }
    editedData.typeId = data.typeId;
    editedData.GST = data.GST;
    editedData.IFSC = data.IFSC;
    editedData.Innvoice = data.Innvoice;
    editedData.Customer = data.Customer;
    editedData.Packages = data.Packages;
    editedData.Volume = data.Volume;
    editedData.Weight = data.Weight;
    editedData.Chargeable = data.Chargeable;
    editedData.Date = data.Date;
    editedData.Cartons = data.Cartons;
    editedData.Console = data.Console;
    editedData.PO = data.PO;
    editedData.Payref = data.Payref;

    await this.TypeoRepo.save(editedData);
    return editedData;
  }
}
