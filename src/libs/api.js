import { fetch } from './fetch'

const apiPrefix = '/api'

export function getAuthorizedMenus () {
  return fetch({
    url: apiPrefix + '/w/authorizations/myAuthorizedMenus',
    method: 'get'
  })
}

export function getListData (params) {
  return fetch({
    url: apiPrefix + '/w/table',
    params: params,
    method: 'get'
  })
}

export function getDetail (id) {
  return fetch({
    url: apiPrefix + '/w/table/' + id,
    method: 'get'
  })
}

export function saveData (model) {
  let flag = model.id ? ('/' + model.id) : ''
  return fetch({
    url: apiPrefix + '/w/table' + flag,
    method: model.id ? 'put' : 'post',
    data: model
  })
}
