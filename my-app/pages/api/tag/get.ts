import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import { prepareConnection } from 'db/index';
import { Tag } from 'db/entity/index';

export default withIronSessionApiRoute(get, ironOptions);

async function get(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { userId = 0 } = session;
  const db = await prepareConnection();
  const tagRepo = db.getRepository(Tag);

  const followTags = await tagRepo.find({
    relations: ['users'],
    where: (qb: any) => {
      // 这里的qb是QueryBuilder的实例,意思是说你可以在这里使用QueryBuilder的所有方法
      
      // 设置查询的 WHERE 条件，即只选择满足 user_id = ? 的记录。
      // :id 是一个命名参数占位符，防止 SQL 注入并提高可读性。
      // { id: Number(userId) }

      // 这是传递给查询的参数对象，其中 id 对应 :id 占位符。
      // userId 从 session 中获取，并转换为 number 类型

      //       SELECT * FROM tag WHERE user_id = ?
      // 然后通过参数绑定将 ? 替换为具体的 userId 值。
      qb.where('user_id = :id', {
        id: Number(userId),
      });
    },
  });

  const allTags = await tagRepo.find({
    relations: ['users'],
  });

  res?.status(200)?.json({
    code: 0,
    msg: '',
    data: {
      followTags,
      allTags,
    },
  });
}
