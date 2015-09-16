import $ from 'jquery'
import {
  STORAGE_KEY
} from '../config.js'

export function login(login, password) {
  return $.ajax({
    url: '/api/v3/session',
    type: 'POST',
    data: {login, password}
  });
}

export function fetchRepoInfo(id) {
  let key = localStorage.getItem(STORAGE_KEY);
  return $.ajax({
    url: `/api/v3/projects/${id}`,
    headers: {'PRIVATE-TOKEN': key}
  });
}

export function fetchTreeInfo() {

}