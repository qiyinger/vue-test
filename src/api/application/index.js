import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/application/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/application/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/application/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/application/delete',
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
