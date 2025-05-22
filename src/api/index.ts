import request from '@/utils/useAxiosApi';

/**
 * @Descripttion: 首页接口
 * @param {*}
 * @return {*}
 */
export const queryIndex = (data):  Promise<any> => {
  return request({
    url: '/api/skins/list',
    method: 'get',
    params: data
  })
}

