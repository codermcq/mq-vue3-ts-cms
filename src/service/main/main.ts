import mqRequest from "..";

export function postEntrieRoles() {
  return mqRequest.post({
    url: '/role/list',
  })
}

export function postEntrieDepartments() {
  return mqRequest.post({
    url: '/department/list'
  })
}

export function postEntrieMenus() {
  return mqRequest.post({
    url: '/menu/list'
  })
}
