export type IUserInfo = {
  userId?: number | null,//我们可以把某个属性声明为可选的：
  nickname?: string,
  avatar?: string,
  id?: number,
};

export interface IUserStore {
  userInfo: IUserInfo;
  // eslint-disable-next-line no-unused-vars
  setUserInfo: (value: IUserInfo) => void;//这个是接口中的一个属性，是一个函数，不返回任何值
}

const userStore = (): IUserStore => {//这个函数的返回类型是IUserStore
  return {
    userInfo: {},//一个取值
    setUserInfo: function (value) {
      this.userInfo = value;//一个设值
    },
  };
};

export default userStore;
