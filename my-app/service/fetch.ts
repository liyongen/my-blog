import axios from 'axios';

const requestInstance = axios.create({
  baseURL: '/',
});

requestInstance.interceptors.request.use(//对https请求的拦截
  (config) => config,
  (error) => Promise.reject(error)
);

requestInstance.interceptors.response.use(//对https返回的拦截
  (response) => {
    if (response?.status === 200) {
      return response?.data;
    } else {
      return {
        code: -1,
        msg: '未知错误',
        data: null,
      };
    }
  },
  (error) => Promise.reject(error)//如果有内存溢出时候
);

export default requestInstance;
