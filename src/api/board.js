import request from '@/utils/request'

export function listboard(data) {
  return request({
    url: '/private/board/list',
    method: 'get',
    data
  })
}

export function askQuestion(data) {
  return request({
    url: '/private/board/save',
    method: 'post',
    data
  })
}
