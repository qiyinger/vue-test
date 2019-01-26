import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/systemInfo/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/systemInfo/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/systemInfo/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/systemInfo/delete',
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
