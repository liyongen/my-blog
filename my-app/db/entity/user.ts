import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'users'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()//"experimentalDecorators": true,装饰器配置
  readonly id!: number;//非空断言‌：当你确信一个变量不会为null或undefined时，可以使用感叹号来告诉编译器这个变量是非空的。

  @Column()
  nickname!: string;

  @Column()
  avatar!: string;

  @Column()
  job!: string;

  @Column()
  introduce!: string;
}