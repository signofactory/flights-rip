import {atom, selector} from 'recoil'

export const currentUser = atom({
  key: 'user',
  default: null,
});

export const searchHistoryState = atom({
  key: 'searchHistory',
  default: [],
});