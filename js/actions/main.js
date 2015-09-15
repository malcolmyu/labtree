import Reflux from 'reflux'
import {login} from '../services/connect-gitlab.js'

const actions = Reflux.createActions({
  toggle: {},

  login: { asyncResult: true },
  fetchRepoInfo: { asyncResult: true },
  fetchTreeInfo: { asyncResult: true }
});

actions.login.listenAndPromise(login);

export default actions