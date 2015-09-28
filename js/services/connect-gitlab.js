import $ from 'jquery'

import cm from './connect-mainpage.js'
import {
  REPO_INFO_Q,
  STORAGE_KEY
} from '../config.js'

let api = '/api/v3/';

export function login(login, password) {
  return $.ajax({
    url: `${api}session`,
    type: 'POST',
    data: {login, password}
  });
}

export function fetchRepoInfo(id) {
  let key = localStorage.getItem(STORAGE_KEY);
  return $.ajax({
    url: `${api}projects/${id}`,
    headers: {'PRIVATE-TOKEN': key}
  });
}

export function fetchTreeInfo({id = null, path = ''}) {
  let key = localStorage.getItem(STORAGE_KEY);
  let pid = cm.getProjectId();


  return REPO_INFO_Q.promise.then(res => {
    let branch = res.branch;
    let query = `?path=${path}&ref:${branch}`;
    let url = `${api}projects/${pid}/repository/tree${query}`;

    return $.ajax({
      url, headers: {'PRIVATE-TOKEN': key}
    });
  }).then(res => [res, id, path]);
}