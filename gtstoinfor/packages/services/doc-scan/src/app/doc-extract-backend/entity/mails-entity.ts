import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('email_attachment')
export class EmailAttachments {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
      })
      Id: number;

      @Column('varchar', {
        length: 50,
        name: 'file_type',
      })
      fileType: string;
    

      @Column('varchar', {
        length: 50,
        name: 'file_name',
      })
      fileName: string;

      @Column('varchar', {
        length: 50,
        name: 'unique_id',
      })
      uniqueId: string;

      @Column('varchar', {
        length: 50,
        name: 'file_path',
      })
      filePath: string;
      @Column('varchar', {
        length: 50,
        name: 'schemax_processed',
      })
      schemaxProcessed: string;
      @Column('varchar', {
        length: 50,
        name: 'ibm_processed',
      })
      ibmProcessed: string;

      @CreateDateColumn({
        name: "created_at",
        type: "datetime"
      })
      createdAt: Date;
    
    
  
}
