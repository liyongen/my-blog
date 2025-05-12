/* eslint-disable @next/next/link-passhref */
import React from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { Button, Avatar, Divider } from 'antd';
import {
  CodeOutlined,
  FireOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
import ListItem from 'components/ListItem';
import { prepareConnection } from 'db/index';
import { User, Article } from 'db/entity';
import styles from './index.module.scss';

//改造成ssg页面，最明显的就是getStaticPaths
export async function getStaticPaths() {
  // user/[id]
  const db = await prepareConnection();
  const users = await db.getRepository(User).find();
  // 生成类似 [{params: 1}, {params: 2}, {params: 3}]的数组结构。
  const userIds = users?.map((user) => ({ params: { id: String(user?.id) } }));

  // [{params: 1}, {params: 2}, {params: 3}]
  return {
    paths: userIds,
    fallback: 'blocking',//如果地false就是path找不到就会返回404页面   true的话就是后台找不到页面就要你自己提供一个具体的页面，当后台返回结果时候，你就显示自己写的页面。不是默认返回404页面，blocking就是一直在等你后台构造好页面时候才展现出来
  };
}

// 这里的params是一个对象，里面有一个id属性，代表的是用户的id与这里的params是一致的---------------------const userIds = users?.map((user) => ({ params: { id: String(user?.id) } }));
export async function getStaticProps({ params }: { params: any }) {
  const userId = params?.id;
  const db = await prepareConnection();
  console.log('userId----------', userId);
  const user = await db.getRepository(User).findOne({
    where: {
      id: Number(userId),
    },
  });
  const articles = await db.getRepository(Article).find({
    where: {
      user: {
        id: Number(userId),
      },
    },
    relations: ['user', 'tags', 'comments'],
  });
  console.log('user----------', user);
  console.log('articles----------', articles);
  return {
    props: {
      userInfo: JSON.parse(JSON.stringify(user)),
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
}

//本来是ssr的渲染页面
// export async function getServerSideProps({ params }: { params: any }) {
//   const userId = params?.id;
//   const db = await prepareConnection();
//   const user = await db.getRepository(User).findOne({
//     where: {
//       id: Number(userId),
//     },
//   });
//   const articles = await db.getRepository(Article).find({
//     where: {
//       user: {
//         id: Number(userId),
//       },
//     },
//     relations: ['user', 'tags'],
//   });

//   return {
//     props: {
//       userInfo: JSON.parse(JSON.stringify(user)),
//       articles: JSON.parse(JSON.stringify(articles)),
//     },
//   };
// }

const UserDetail = (props: any) => {
  const { userInfo = {}, articles = [] } = props;
  console.log('从数据库里查回来的userInfo与articles----------', userInfo, articles);
  const viewsCount = articles?.reduce(
    (prev: any, next: any) => prev + next?.views,
    0
  );

  return (
    <div className={styles.userDetail}>
      <div className={styles.left}>
        <div className={styles.userInfo}>
          <Avatar className={styles.avatar} src={userInfo?.avatar} size={90} />
          <div>
            <div className={styles.nickname}>{userInfo?.nickname}</div>
            <div className={styles.desc}>
              <CodeOutlined /> {userInfo?.job}
            </div>
            <div className={styles.desc}>
              <FireOutlined /> {userInfo?.introduce}
            </div>
          </div>
          <Link href="/user/profile">
            <Button>编辑个人资料</Button>
          </Link>
        </div>
        <Divider />
        <div className={styles.article}>
          {articles?.map((article: any) => (
            <div key={article?.id}>
              <ListItem article={article} />
              <Divider />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.achievement}>
          <div className={styles.header}>个人成就</div>
          <div className={styles.number}>
            <div className={styles.wrapper}>
              <FundViewOutlined />
              <span>共创作 {articles?.length} 篇文章</span>
            </div>
            <div className={styles.wrapper}>
              <FundViewOutlined />
              <span>文章被阅读 {viewsCount} 次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(UserDetail);
