import request from '@/utils/request'

export function addTask(data) {
  return request({
    url: '/private/task/save',
    method: 'post',
    data
  })
}

export function removeTask(data) {
  return request({
    url: '/private/task/dell',
    method: 'post',
    data
  })
}

export function updateTaskStatus(data) {
  return request({
    url: '/private/task/status',
    method: 'post',
    data
  })
}

export function scoreDetail() {
  return request({
    url: '/private/task/score',
    method: 'post'
  })
}

export function userScore() {
  return request({
    url: '/private/task/userScore',
    method: 'post'
  })
}

export function listTasks(query) {
  return request({
    url: '/private/task/mylist',
    method: 'get',
    params: query
  })
}
