import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Article } from './article'
import { User } from './user'

@Entity({name: 'comments'})//数据库对应的表名称
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  content!: string;

  @Column()
  create_time!: Date;

  @Column()
  update_time!: Date;

  @ManyToOne(() => User)//一个用户可以发表多条评论，所以这个1是用户
  @JoinColumn({name: 'user_id'})//通过这个来连表的接外键
  user!: User;

  @ManyToOne(() => Article)//一篇文章可以有多条评论，所以这个1是文章
  @JoinColumn({name: 'article_id'})//通过这个来连表的接外键
  article!: Article;
}