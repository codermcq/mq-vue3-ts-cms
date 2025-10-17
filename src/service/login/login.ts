import mqRequest from "..";

export function accountLoginRequest(account: any) {
  return mqRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return mqRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenuByRoleId(id: number) {
  return mqRequest.get({
    url: `/role/${id}/menu`
  })
}

