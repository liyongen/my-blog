"use client"
import React, { createContext, ReactElement, useContext } from 'react';
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite';
import createStore, { IStore } from './rootStore';

interface IProps {
  initialValue: Record<any, any>;//Record<any, any>：是 TypeScript 中的一个泛型类型，表示一个对象,第一个 any 表示对象的键（key）可以是任意类型（通常是字符串、数字或符号）。第二个 any 表示对象的值可以是任意类型，const data3: Record<any, any> = { user: { id: 1 }, roles: ['admin'] };
  children: ReactElement;// 表示当前组件的 children 属性必须是一个 React 元素（比如一段 JSX），且只能传入一个，不能是字符串、数字或多个元素。
}// children: ReactNode; // 支持任意类型子节点,这样就可以支持字符串、数字、数组、Fragment 等各种形式的子元素

enableStaticRendering(!process.browser);//如果是浏览器环境就设置为false,否则为true,这个是mobx的一个配置项，设置为false就可以在服务端渲染时使用mobx了
// 这个函数的作用是告诉 MobX 是否在服务器端渲染（SSR）中运行。enableStaticRendering(true) 表示在 SSR 中运行，enableStaticRendering(false) 表示在客户端运行。

const StoreContext = createContext({});

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue));//观察这种响应式的数据，监听
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore;//上下文获取数据<StoreContext.Provider value={store}>拿到这个value的数据
  if (!store) {
    throw new Error('数据不存在');
  }
  return store;
}
