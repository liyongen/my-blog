export const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME as string,//有可能是undenified,所以强制转化成字符串
  password: process.env.SESSION_PASSWORD as string,//有可能是undenified,所以强制转化成字符串
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000,//一天的时间过期
    secure: process.env.NODE_ENV === 'production',
  },
};
