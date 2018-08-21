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

export function getHebeiData () {
  return fetch({
    url: apiPrefix + '/w/hebei',
    method: 'get'
  })
}

export function getOrganization () {
  return fetch({
    url: apiPrefix + '/w/organization',
    method: 'get'
  })
}

export function getTreeTableList () {
  return fetch({
    url: apiPrefix + '/w/table',
    method: 'get'
  })
}

export function getTreeTableDetail (id) {
  return fetch({
    url: apiPrefix + '/w/table/' + id,
    method: 'get'
  })
}

export function createTreeTableDetail () {
  return fetch({
    url: apiPrefix + '/w/table',
    method: 'post'
  })
}

export function saveTreeTableDetail (id) {
  return fetch({
    url: apiPrefix + '/w/table/' + id,
    method: 'put'
  })
}
