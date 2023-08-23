import { Exclude, Type } from 'class-transformer';
import { Column, Generated, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BasicEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true, nullable: false, length: 36 })
  @Generated('uuid')
  uuid: string;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Type(() => Date)
  createdAt: Date;

  @Column({ nullable: false, length: 100 })
  createdBy: string;

  @Column({
    nullable: true,
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  @Type(() => Date)
  modifiedAt: Date;

  @Column({ nullable: true, length: 100 })
  modifiedBy: string;

  @Column({ nullable: true, type: 'timestamp' })
  @Type(() => Date)
  deleteAt: Date;

  @Column({ nullable: true, length: 100 })
  deletedBy: string;
}
