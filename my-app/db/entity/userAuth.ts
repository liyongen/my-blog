import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user'

@Entity({name: 'user_auths'})//跟表名称要一致的
export class UserAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  identity_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;

  @ManyToOne(() => User, {
    cascade: true
  })
  @JoinColumn({name: 'user_id'})//外健的名称自己定一个
  user!: User
}