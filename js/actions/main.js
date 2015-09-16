import Reflux from 'reflux'
import {
  login,
  fetchRepoInfo
} from '../services/connect-gitlab.js'

const actions = Reflux.createActions({
  toggle: {},

  login: { asyncResult: true },
  fetchRepoInfo: { asyncResult: true },
  fetchTreeInfo: { asyncResult: true }
});

actions.login.listenAndPromise(login);
actions.fetchRepoInfo.listenAndPromise(fetchRepoInfo);

export default actions