import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs, Button, message } from 'antd';
import * as ANTD_ICONS from '@ant-design/icons';
import { useStore } from 'store/index';
import request from 'service/fetch';
import styles from './index.module.scss';

const { TabPane } = Tabs;

interface IUser {
  id: number;
  nickname: string;
  avatar: string;
}

interface ITag {
  id: number;
  title: string;
  icon: string;
  follow_count: number;
  article_count: number;
  users: IUser[];
}
/**
 * 标签组件
 * 该组件展示了用户已关注和所有的标签，并提供了关注和取消关注的功能
 */
const Tag = () => {
  // 使用useStore钩子来访问状态管理中的数据
  const store = useStore();
  // followTags用于存储用户已关注的标签，allTags用于存储所有标签
  const [followTags, setFollowTags] = useState<ITag[]>();//这句代码声明了一个名为 followTags 的状态变量，它预期保存的是一个由 ITag 对象组成的数组。初始值为 undefined，之后可以通过 setFollowTags 更新其内容。
  const [allTags, setAllTags] = useState<ITag[]>();
  // needRefresh用于触发数据的重新获取
  const [needRefresh, setNeedRefresh] = useState(false);
  // 从store中获取当前用户的ID
  const { userId } = store?.user?.userInfo || {};
  // 使用useEffect钩子来获取标签数据
  useEffect(() => {
    request.get('/api/tag/get').then((res: any) => {
      if (res?.code === 0) {
        const { followTags = [], allTags = [] } = res?.data || {};
        setFollowTags(followTags);
        setAllTags(allTags);
      }
    })
  }, [needRefresh]);// 这里的needRefresh作为依赖项，当它变化时，useEffect会重新执行，从而触发数据的重新获取

  const handleUnFollow = (tagId: number) => {
    request.post('/api/tag/follow', {
      type: 'unfollow',
      tagId
    }).then((res: any) => {
      if (res?.code === 0) {
        message.success('取关成功');
        setNeedRefresh(!needRefresh);
      } else {
        message.error(res?.msg || '取关失败');
      }
    })
  }

  const handleFollow = (tagId: number) => {
    request.post('/api/tag/follow', {
      type: 'follow',
      tagId
    }).then((res: any) => {
      if (res?.code === 0) {
        message.success('关注成功');
        setNeedRefresh(!needRefresh);
      } else {
        message.error(res?.msg || '关注失败');
      }
    })
  }

  return (
    <div className='content-layout'>
      <Tabs defaultActiveKey="2">
        <TabPane tab="已关注标签" key="1">
          <div className={styles.tags}>
            {
              followTags?.map(tag => (
                <div key={tag?.title} className={styles.tagWrapper}>
                  {/* 这里使用了动态渲染的方式来展示图标 */}
                  {/* 通过ANTD_ICONS对象来获取对应的图标组件 */}
                  {/* 这里的render()方法是一个自定义的方法，用于渲染图标 */}
                  {/* 你可以根据实际需要来实现这个方法 */}
                  <div>{(ANTD_ICONS as any)[tag?.icon]?.render()}</div>
                  <div className={styles.title}>{tag?.title}</div>
                  <div>{tag?.follow_count} 关注 {tag?.article_count} 文章</div>
                  {/* 判断当前用户是否已关注该标签 ，找出用户出来，这用户就是自己*/}
                  {
                    tag?.users?.find((user) => Number(user?.id) === Number(userId)) ? (
                      <Button type='primary' onClick={() => handleUnFollow(tag?.id)}>已关注</Button>
                    ) : (
                      <Button onClick={() => handleFollow(tag?.id)}>关注</Button>
                    )
                  }
                </div>
              ))
            }
          </div>
        </TabPane>
        <TabPane tab="全部标签" key="2">
          <div className={styles.tags}>
            {
              allTags?.map(tag => (
                <div key={tag?.title} className={styles.tagWrapper}>
                  <div>{(ANTD_ICONS as any)[tag?.icon]?.render()}</div>
                  <div className={styles.title}>{tag?.title}</div>
                  <div>{tag?.follow_count} 关注 {tag?.article_count} 文章</div>
                  {
                    tag?.users?.find((user) => Number(user?.id) === Number(userId)) ? (
                      <Button type='primary' onClick={() => handleUnFollow(tag?.id)}>已关注</Button>
                    ) : (
                      <Button onClick={() => handleFollow(tag?.id)}>关注</Button>
                    )
                  }
                </div>
              ))
            }
          </div>
        </TabPane>

      </Tabs>

    </div>
  );
};

export default observer(Tag);

// 页面中使用了 getServerSideProps、getStaticProps 等方法，才可能是 SSR。
// 当前文件为 index.tsx，且没有这些方法的定义，则不是 Next.js 的 SSR 页面。
// 当前代码中通过 useEffect 在组件挂载时请求 /api/tag/get 获取标签数据。
// 数据获取和更新都在浏览器端完成，这是典型的 CSR 行为。
// SSR 框架如 Next.js 会要求你导出默认函数组件以外的内容，例如：
// ts
// export async function getServerSideProps() { ... }
// 当前只导出了一个被 observer 包裹的 React 组件：
// ts
// export default observer(Tag);
// 没有 SSR 相关的数据预加载函数，进一步说明这是一个 CSR 页面。
// 最终结论：
// 这个页面是一个 CSR（客户端渲染）页面，理由如下：

// 使用 useEffect 发起 API 请求获取数据；
// 没有 SSR 框架特有的生命周期或数据预取方法；
// 导出的是普通 React 组件；
// 数据展示完全依赖浏览器端交互与网络请求。
