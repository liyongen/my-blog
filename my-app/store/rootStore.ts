import userStore, { IUserStore } from './userStore';

export interface IStore {
  user: IUserStore;
}

export default function createStore(initialValue: any): () => IStore {//这个函数的返回值是IStore
  return () => {
    return {
      user: { ...userStore(), ...initialValue?.user },//这个是userStore()的初始化，然后和initialValue?.user覆盖前面的值
    };
  };
}
