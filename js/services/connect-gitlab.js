import $ from 'jquery'

export function login(login, password) {
  return $.ajax({
    url: '/api/v3/session',
    type: 'POST',
    data: {login, password}
  });
}

export function fetchRepoInfo() {

}