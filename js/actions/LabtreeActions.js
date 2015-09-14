import Reflux from 'reflux'

let LabtreeActions = Reflux.createActions([
    'toggleSidebar',
    'login',
    'fetchRepoInfo',
    'fetchTreeInfo'
]);

module.exports = LabtreeActions;