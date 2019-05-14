import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/strategyCall/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/strategyCall/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/strategyCall/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/strategyCall/delete',
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
