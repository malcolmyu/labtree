import Reflux from 'reflux'
import {
  login,
  fetchRepoInfo,
  fetchTreeInfo
} from '../services/connect-gitlab.js'

const actions = Reflux.createActions({
  toggle: {},
  toggleTreeBranch: {},
  setTreeBranchLoading: {},

  login: { asyncResult: true },
  fetchRepoInfo: { asyncResult: true },
  fetchTreeInfo: { asyncResult: true }
});

actions.login.listenAndPromise(login);
actions.fetchRepoInfo.listenAndPromise(fetchRepoInfo);
actions.fetchTreeInfo.listenAndPromise(fetchTreeInfo);

export default actions