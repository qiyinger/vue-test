import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/apiApply/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/apiApply/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/apiApply/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/apiApply/delete',
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
