import mqRequest from '@/service'

export function postUserListData(queryInfo: any) {
  return mqRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return mqRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return mqRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return mqRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 针对页面的网络请求
export function postPageListData(pageName: string, queryInfo: any) {
  return mqRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return mqRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return mqRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return mqRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
