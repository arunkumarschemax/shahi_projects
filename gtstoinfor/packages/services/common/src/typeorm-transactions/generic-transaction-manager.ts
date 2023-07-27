import { Connection, EntityManager, getConnection, QueryRunner, Repository, Entity } from 'typeorm';
import { ITransactionHelper } from './itransaction-helper';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { DataSource } from 'typeorm';

export default class GenericTransactionManager implements ITransactionHelper  {
    private queryRunner: QueryRunner;
    private dataSource: DataSource;
    private transactionManager: EntityManager;

    async startTransaction(isolationLevel?: IsolationLevel) {
      // getting a connection from the connection pool;
     
      this.queryRunner = getConnection().createQueryRunner();
      await this.queryRunner.startTransaction(isolationLevel ? isolationLevel : 'READ COMMITTED');
      this.transactionManager = this.queryRunner.manager;
    }

    getRepository<T>(RandomEntity: new (transactionManager: EntityManager) => T): Repository<T> {
      if (!this.transactionManager) {
        throw new Error('Requesting repository in a transaction scope without starting the transaction');
      }
      return this.transactionManager.getRepository(RandomEntity);
    }

    getCustomRepository<T>(RandomEntity: new (transactionManager: EntityManager) => T): T {
      if (!this.transactionManager) {
        throw new Error('Requesting custom repository in a transaction scope without starting the transaction');
      }
      return this.dataSource.getCustomRepository(RandomEntity);
    }

    // getCustomRepository<T extends Repository<any>>(RandomEntity: new (transactionManager: typeof Entity) => T): T {
    //     if (!this.transactionManager) {
    //       throw new Error('Requesting custom repository in a transaction scope without starting the transaction');
    //     }
    //     return this.dataSource.getCustomRepository(RandomEntity);
    //     return this.transactionManager.getCustomRepository(RandomEntity);
    // }

    async completeTransaction() {
      try {
        await this.queryRunner.commitTransaction();
      } catch (error) {
        await this.queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await this.queryRunner.release();
      }
    }

    async releaseTransaction() {
      try {
        if(this.queryRunner?.isTransactionActive) {
          await this.queryRunner.rollbackTransaction();
        }
      } finally {
        if(this.queryRunner) {
          if (!this.queryRunner.isReleased) {
            await this.queryRunner.release();
          }
        }
      }
    }
  }