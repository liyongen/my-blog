import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user'
import { Article } from './article'

@Entity({name: 'tags'})
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  title!: string;

  @Column()
  icon!: string;

  @Column()
  follow_count!: number;

  @Column()
  article_count!: number;

  @ManyToMany(() => User, {//多对多关系，一个用户可以关注多个标签，一个标签也可以被多个用户关注，
    // 这里的关系是多对多关系，所以需要使用ManyToMany装饰器
    cascade: true
  })
  @JoinTable({
    name: 'tags_users_rel',
    joinColumn: {
      name: 'tag_id'
    },
    inverseJoinColumn: {
      name: 'user_id'
    }
  })
  users!: User[]

  @ManyToMany(() => Article, (article) => article.tags)//多对多关系，一个标签可以被多个文章使用，一个文章也可以有多个标签，
  @JoinTable({
    name: 'articles_tags_rel',
    joinColumn: {
      name: 'tag_id'
    },
    inverseJoinColumn: {
      name: 'article_id'
    }
  })
  articles!: Article[]
}