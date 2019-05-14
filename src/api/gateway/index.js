import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/gateway/page',
    method: 'post',
    data
  })
};
const queryById = function (id) {
  return request({
    url: '/gateway/' + id,
    method: 'post',
  })
};
const save = function (data) {
  return request({
    url: '/gateway/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/gateway/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/gateway/delete',
    method: 'post',
    data
  })
}

export default {
  page,
  save,
  update,
  deletes,
  queryById,
}
