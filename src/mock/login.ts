import { MockMethod, Recordable } from 'vite-plugin-mock';
import pkg from 'mockjs';

const { Random } = pkg;

interface response {
  body: Recordable;
  query: Recordable;
}

export default [
  {
    url: '/api/skins/list',
    method: 'get',
    response: ({ body, query }: response) => {
      const { page, nums: limit = 10 } = query;
      const total = 121;
      let listLength = total / limit > page ? 10 : Math.ceil(total / limit) == page ? total % limit : 0;
      const list = new Array(listLength).fill({}).map(() => {
        return {
          id: Random.id(),
          user_id: 141,
          apply_id: Random.id(),
          nickname: Random.first(),
          gender: 1,
          avatar_url: Random.image(200),
          name: Random.first(),
          phone: Random.natural(10000000000, 99999999999),
          status: Random.natural(0, 2),
          created_at: '2021-12-01 13:52:49'
        };
      });
      return {
        code: 0,
        message: 'ok',
        data: { data: list, total, last_page: Math.ceil(total / limit) },
      };
    },
  },

] as MockMethod[];
