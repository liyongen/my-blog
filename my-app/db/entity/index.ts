//把所有的数据库的表的实体都导出
export { User } from './user';
export { UserAuth } from './userAuth';
export { Comment } from './comment';//article数据库的表有用到comment的表，所以导出的先后顺序这里不能乱
export { Article } from './article';
export { Tag } from './tag';
