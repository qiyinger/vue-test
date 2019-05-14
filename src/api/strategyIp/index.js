import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/strategyIp/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/strategyIp/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/strategyIp/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/strategyIp/delete',
    method: 'post',
    data
  })
}

export default {
  page,
  save,
  update,
  deletes,
}
