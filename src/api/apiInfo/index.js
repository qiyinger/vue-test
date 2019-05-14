import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/apiInfo/page',
    method: 'post',
    data
  })
};

const save = function (data) {
  return request({
    url: '/apiInfo/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/apiInfo/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/apiInfo/delete',
    method: 'post',
    data
  })
}

const imports = function (data) {
  return request({
    url: '/apiInfo/import',
    method: 'post',
    data
  })
}

const url = function (data) {
  return request({
    url: '/apiInfo/url',
    method: 'post',
    data
  })
}

export default {
  page,
  save,
  update,
  deletes,
  url,
}
