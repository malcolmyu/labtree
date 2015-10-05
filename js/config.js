'use strict';

export const STORAGE_KEY = 'labtree_private_key';

export const GLOBAL = {
  TREE_INFO_FETCHED: false,
  PROJECT: null,
  BRANCH: null,
  REPO_INFO_Q: Promise.defer(),
  SCROLL_TOP: 0
};