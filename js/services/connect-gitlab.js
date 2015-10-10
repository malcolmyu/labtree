import sa from 'superagent'
import sap from 'superagent-promise'

import cm from './connect-mainpage.js'
import {
  GLOBAL,
  STORAGE_KEY,
  TREE_INFO_FETCHED
} from '../config.js'

let agent = sap(sa, Promise);
let api = '/api/v3/';

export function login(login, password) {
  if (login === '' || password === '') {
    return new Promise((reslove, reject) => {
      reject('请输入用户名和密码');
    });
  }
  return agent
    .post(`${api}session`)
    .query({login, password})
    .end()
}

export function fetchRepoInfo(id) {
  let key = localStorage.getItem(STORAGE_KEY);
  return agent
    .get(`${api}projects/${id}`)
    .set('PRIVATE-TOKEN', key)
    .end()
}

export function fetchTreeInfo({id = null, path = ''}) {
  let key = localStorage.getItem(STORAGE_KEY);
  let pid = cm.getProjectId();


  return GLOBAL.REPO_INFO_Q.promise.then(res => {
    let branch = res.branch;
    let query = `?path=${path}&ref:${branch}`;
    let uri = `${api}projects/${pid}/repository/tree${query}`;

    return agent
      .get(uri)
      .set('PRIVATE-TOKEN', key)
      .end()
  }).then(res => [res.body, id, path]);
}