'use client'; // 👈 声明这是一个客户端组件'use client' 的作用是告诉 Next.js 这个组件需要在浏览器中运行，并允许使用 React Hooks 和交互逻辑
import type { NextPage } from 'next';
import { navs } from './config';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Avatar, Dropdown, Menu, message } from 'antd';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';//图标依赖要单独引入
import { useState } from 'react';
import Login from 'components/Login';
import { useStore } from 'store/index';
import request from 'service/fetch';
const Navbar: NextPage = () => {
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;
  const { pathname, push } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleGotoEditorPage = () => {
    if (userId) {
      push('/editor/new');//自带的路由api，跳转到具体的那个页面
    } else {
      message.warning('请先登录');
    }
  };

  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => {
    setIsShowLogin(false);
  };

  const handleGotoPersonalPage = () => {
    push(`/user/${userId}`);//动态的userid，所以页面也是需要动态的[id].tsx
  };

  const handleLogout = () => {
    request.post('/api/user/logout').then((res: any) => {
      if (res?.code === 0) {
        store.user.setUserInfo({});//清除用户信息
      }
    });
  };
  const renderDropDownMenu = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleGotoPersonalPage}>
          <HomeOutlined />
          &nbsp; 个人主页
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          <LoginOutlined />
          &nbsp; 退出系统
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav?.label} href={nav?.value} >

            <span className={pathname === nav?.value ? styles.active : ''}>
              {nav?.label}
            </span>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>

        {userId ? (
          <>
            <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
              <Avatar src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default observer(Navbar)//组件响应式，一旦组件的数据与变化，立刻渲染组件
