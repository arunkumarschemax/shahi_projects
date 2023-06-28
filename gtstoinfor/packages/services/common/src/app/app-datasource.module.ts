import { Module } from "@nestjs/common";
import { AppDataSource } from "./app-datasource";

@Module({
    providers : [...AppDataSource],
    exports : [...AppDataSource]
})

export class AppDataSourceModule {}