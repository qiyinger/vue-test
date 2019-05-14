import request from '@/plugin/axios'

const list = function (data) {
  return request({
    url: '/service/instance/list',
    method: 'post',
    data
  })
};

const shutdown = function (data) {
  return request({
    url: '/service/instance/shutdown',
    method: 'post',
    data
  })
};

export default {
  list,
  shutdown,
}
