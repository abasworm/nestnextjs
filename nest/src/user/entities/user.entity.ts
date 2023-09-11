import { Exclude } from 'class-transformer';
import { BasicEntity } from 'src/config/basic.entity';
import { IsActive } from 'src/config/constansts';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { hash } from 'bcryptjs';

@Entity()
export class User extends BasicEntity {
  @Column({ nullable: false, length: 100 }) email: string;
  @Exclude()
  @Column({ nullable: false, length: 200 })
  password: string;
  @Column({ nullable: false, length: 100 }) fullname: string;
  @Column({ nullable: true, type: 'text' }) login_info: string;
  @Column({ nullable: true, type: 'int', default: 0 }) login_try: number;
  @Column({ length: 2, default: 'N', enum: IsActive }) isActive: string;

  @BeforeInsert() async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @BeforeUpdate() async hashPasswordUpdate() {
    console.log(this.password);
    if (this.password && this.password !== '')
      this.password = await hash(this.password, 10);
  }
}
