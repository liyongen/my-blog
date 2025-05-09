import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { Cookie } from 'next-cookie';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import request from 'service/fetch';
import { setCookie } from 'utils/index';
import { prepareConnection } from 'db/index';
import { User, UserAuth } from 'db/entity/index';

export default withIronSessionApiRoute(redirect, ironOptions);

// client-id：Ov23liuf8bTkqy4ZZilE
  // client-secret：8afcb265a4a6acf212cb2cb0ce4ad85263a2b49f

async function redirect(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  //用户同意授权， GitHub 就会跳转到redirect_uri指定的跳转网址，并且带上授权码，跳转回来的 URL 就是下面的样子。，这个code是github返回的的
  // http://localhost:3000/api/oauth/redirect?code=xxxxx
  const { code } = req?.query || {};
  console.log(111111);
  console.log(code);
  const githubClientID = 'Ov23liuf8bTkqy4ZZilE';
  const githubSecrect = '8afcb265a4a6acf212cb2cb0ce4ad85263a2b49f';
 
  const url = `https://github.com/login/oauth/access_token?client_id=${githubClientID}&client_secret=${githubSecrect}&code=${code}`;
  //项目后端再请求github网站获取token令牌
  const result = await request.post(
    url,
    {},
    {
      headers: {
        accept: 'application/json',//返回的数据设置成json格式
      },
    }
  );

  console.log(22222)
  console.log(result)

  const { access_token } = result as any;

  console.log(33333)
  console.log(access_token)
//项目后端拿着token令牌再请求github网站获取用户信息
  const githubUserInfo = await request.get('https://api.github.com/user', {
    headers: {//nodejs没有跨域
      accept: 'application/json',
      Authorization: `token ${access_token}`
    }
  })
  
  console.log(44444)
  console.log(githubUserInfo)

  const cookies = Cookie.fromApiRoute(req, res);//获取cookie
  const db = await prepareConnection();//数据库链接
  const userAuth = await db.getRepository(UserAuth).findOne({//看看UserAuth表有没有登陆过
    identity_type: 'github',
    identifier: githubClientID
  }, {
    relations: ['user']//关联查询，连这个表的信息都可以一起查回来
  });

  console.log(55555)
  console.log(userAuth)

  if (userAuth) {
    // 之前登录过的用户，直接从 user 里面获取用户信息，并且更新 credential
    const user = userAuth.user;
    const { id, nickname, avatar } = user;

    console.log(6666666)
    console.log(user)

    userAuth.credential = access_token;//更新令牌

    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;

    await session.save();

    setCookie(cookies, { id, nickname, avatar });

    res.writeHead(302, {//重定向到页面首页，有时候github会报错，防止多次访问授权
      Location: '/'
    });
    // window.location.href = "http://localhost:3000/";//很有争议
   
  } else {
    // 创建一个新用户，包括 user 和 user_auth
    const { login = '', avatar_url = '' } = githubUserInfo as any;
    const user = new User();
    user.nickname = login;
    user.avatar = avatar_url;

    const userAuth = new UserAuth();
    userAuth.identity_type = 'github';
    userAuth.identifier = githubClientID;
    userAuth.credential = access_token;
    userAuth.user = user;//插入数据库

    const userAuthRepo = db.getRepository(UserAuth);
    const resUserAuth = await userAuthRepo.save(userAuth);

    console.log(77777)
    console.log(resUserAuth)

    const { id, nickname, avatar } = resUserAuth?.user || {};
    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;

    await session.save();

    setCookie(cookies, { id, nickname, avatar });

    res.writeHead(302, {
      Location: '/'
    });
  }
}
