import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Button, message, Select } from 'antd';
import { useRouter } from 'next/router';
import { useStore } from 'store/index';
import request from 'service/fetch';
import styles from './index.module.scss';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const NewEditor = () => {
  const store = useStore();
  const { push } = useRouter();
  const { userId } = store.user.userInfo;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagIds, setTagIds] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    request.get('/api/tag/get').then((res: any) => {
      if (res?.code === 0) {
        setAllTags(res?.data?.allTags || [])
      }
    })
  }, []);// 这里的空数组作为依赖项，表示这个副作用只在组件挂载时执行一次，类似于 componentDidMount

  const handlePublish = () => {
    if (!title) {
      message.warning('请输入文章标题');
      return;
    }
    request.post('/api/article/publish', {
      title,
      content,
      tagIds
    }).then((res: any) => {
      if (res?.code === 0) {
        userId ? push(`/user/${userId}`) : push('/');
        message.success('发布成功');
      } else {
        message.error(res?.msg || '发布失败');
      }
    })
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target?.value);
  };

  const handleContentChange = (content: any) => {
    setContent(content);
  };

  const handleSelectTag = (value: []) => {
    setTagIds(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          className={styles.title}
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        />
        <Select
          className={styles.tag}
          mode="multiple"
          allowClear
          placeholder="请选择标签"
          onChange={handleSelectTag}
        >{allTags?.map((tag: any) => (
          <Select.Option key={tag?.id} value={tag?.id}>{tag?.title}</Select.Option>
        ))}</Select>
        <Button
          className={styles.button}
          type="primary"
          onClick={handlePublish}
        >
          发布
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handleContentChange} />
    </div>
  );
};
//这个很重要，可以告诉最外层的_app.tsx不需要渲染layout
// 这个是nextjs的一个约定，layout是一个函数，返回一个组件
// 这个函数会在每个页面渲染之前执行，可以用来做一些全局的操作，比如设置标题、meta等
//as是强制转换类型
(NewEditor as any).layout = null;

export default observer(NewEditor);
