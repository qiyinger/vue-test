import request from '@/plugin/axios'

const page = function (data) {
  return request({
    url: '/route/page',
    method: 'post',
    data
  })
};
const queryById = function (id) {
  return request({
    url: '/route/' + id,
    method: 'post',
  })
};
const save = function (data) {
  return request({
    url: '/route/save',
    method: 'post',
    data
  })
};

const update = function (data) {
  return request({
    url: '/route/update',
    method: 'post',
    data
  })
};

const deletes = function (data) {
  return request({
    url: '/route/delete',
    method: 'post',
    data
  })
};

const updateFilters = function (data) {
  return request({
    url: '/route/filters/update',
    method: 'post',
    data
  })
};

const updatePredicates = function (data) {
  return request({
    url: '/route/predicates/update',
    method: 'post',
    data
  })
};
export default {
  page,
  save,
  update,
  deletes,
  updateFilters,
  updatePredicates,
  queryById,
}
