import { Injectable } from "@nestjs/common";
import { AppDataSource } from "./app-datasource";

@Injectable()
export class AppService {
  constructor() {}
  getData(): { message: string } {
    return { message: "Welcome to services/common!" };
  }

  async testData() {
    const query = `SELECT * FROM dbo.M_User`;
    const result = await AppDataSource.query(query);
    return result;
  }

  async testInsert() {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      const query = `INSERT INTO dbo.Hourly_Op_Data (ItemId, SchNum, Color, Dest, ExFact, PostedIntoM3) VALUES ($1, $2, $3,$4,$5,$6)`;
      // you can use its methods only after you call connect
      // which performs real database connection
      await queryRunner.connect();
      await queryRunner.startTransaction();
      // .. now you can work with query runner and call its methods
      const result = await queryRunner.query(
        query,
        ["1", "123", "red", "unit-7", "unit-1", 1],
        true
      );
      // very important - don't forget to release query runner once you finished working with it
      console.log(result);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return result;
    } catch (err) {
      await queryRunner.release();
      return err;
    }
  }
}
