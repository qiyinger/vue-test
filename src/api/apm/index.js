import request from '@/plugin/axios'

const dashBoardUrl = function (data) {
  return request({
    url: '/apm/dashboard/url',
    method: 'post',
    data
  })
};
const traceUrl = function (data) {
  return request({
    url: '/apm/trace/url',
    method: 'post',
    data
  })
};


export default {
  dashBoardUrl,
  traceUrl,
}
