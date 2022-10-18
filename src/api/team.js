import request from '@/utils/request'

export function listteam(data) {
  return request({
    url: '/private/team/list',
    method: 'get',
    data
  })
}

export function createteam(data) {
  return request({
    url: '/private/team/save',
    method: 'post',
    data
  })
}

export function dellteam(data) {
  return request({
    url: '/private/team/dell',
    method: 'post',
    data
  })
}

export function updateUserTeam(data) {
  return request({
    url: "/private/user/updateUserTeam",
    method: "post",
    data
  })
}