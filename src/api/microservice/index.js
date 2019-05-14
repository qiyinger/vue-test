import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/microservice/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/microservice/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/microservice/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/microservice/delete',
    method: 'post',
    data
  })
}
const selectList = function (data) {
  return request({
    url: '/microservice/selectList',
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
