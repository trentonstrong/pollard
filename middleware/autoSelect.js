import { selectSong } from '../actions/Actions.js';
import * as actionTypes from '../constants/ActionTypes';

// Middleware that autoselects newest song anytime one is added

let autoSelect = store => next => action => {
  const result = next(action);
	if (action.type == actionTypes.ADD_SONG) {
		const state = store.getState().state;
		store.dispatch(selectSong(0));
	}
  return result;
};

export default autoSelect;
