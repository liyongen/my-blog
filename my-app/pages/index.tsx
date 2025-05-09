import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Divider } from 'antd';
import classnames from 'classnames';
import { prepareConnection } from 'db/index';

import { Article, Tag } from 'db/entity';
// import ListItem from 'components/ListItem';
import { IArticle } from 'pages/api/index';
import request from 'service/fetch';
import styles from './index.module.scss';

const DynamicComponent = dynamic(() => import('components/ListItem'));//异步动态加载组件

interface ITag {
  id: number;
  title: string;
}

interface IProps {
  articles: IArticle[];
  tags: ITag[];
}

export async function getServerSideProps() {//首页用ssr服务器渲染，适合nextjs框架
  const db = await prepareConnection();
  const articles = await db.getRepository(Article).find({
    relations: ['user', 'comments', 'comments.user', 'tags'],//关联查询
    // relations: ['user', 'tags'],
  });
  console.log(articles, '首页获取的文章列表2222222');//这里的数据才打印本地服务器上
  const tags = await db.getRepository(Tag).find({
    relations: ['users'],
  });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)) || [],//数据一定要经过处理
      tags: JSON.parse(JSON.stringify(tags)) || [],
    },
  };
}

const Home = (props: IProps) => {
  const { articles, tags } = props;//会拿到上面的props
  console.log(articles, '首页获取的文章列表11111');//这里的数据才打印在·浏览器上
  const [selectTag, setSelectTag] = useState(0);
  const [showAricles, setShowAricles] = useState([...articles]);

  const handleSelectTag = (event: any) => {
    const { tagid } = event?.target?.dataset || {};
    setSelectTag(Number(tagid));
  };

  useEffect(() => {
    selectTag &&
      request.get(`/api/article/get?tag_id=${selectTag}`).then((res: any) => {
        if (res?.code === 0) {
          setShowAricles(res?.data);
        }
      });
  }, [selectTag]);

  return (
    <div>
      <div className={styles.tags} onClick={handleSelectTag}>
        {tags?.map((tag) => (
          <div
            key={tag?.id}
            data-tagid={tag?.id}
            className={classnames(
              styles.tag,
              selectTag === tag?.id ? styles['active'] : ''
            )}
          >
            {tag?.title}
          </div>
        ))}
      </div>
      <div className="content-layout">
        {showAricles?.map((article) => (
          <>
            {/* <ListItem article={article} /> */}
            <DynamicComponent article={article} />
            <Divider />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
