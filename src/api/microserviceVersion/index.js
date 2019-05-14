import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/microserviceVersion/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/microserviceVersion/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/microserviceVersion/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/microserviceVersion/delete',
    method: 'post',
    data
  })
};

const selectList = function (data) {
  return request({
    url: '/microserviceVersion/selectList',
    method: 'post',
    data
  })
}

export default {
  page,
  save,
  update,
  deletes,
  selectList,
}
