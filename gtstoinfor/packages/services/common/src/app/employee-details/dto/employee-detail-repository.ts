import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmplyeeDetails } from './employee-details-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeDetailsRepo extends Repository<EmplyeeDetails> {

    constructor(@InjectRepository(EmplyeeDetails) private EmployeeDetailsRepo: Repository<EmplyeeDetails>
    ) {
        super(EmployeeDetailsRepo.target, EmployeeDetailsRepo.manager, EmployeeDetailsRepo.queryRunner);
    }
    async getemployeeId(): Promise<any> {
        const query = this.createQueryBuilder('ed')
            .select(` MAX(employee_id) as employeeId`)
            .orderBy(` created_at`, 'DESC')
        return await query.getRawOne();
    }
}