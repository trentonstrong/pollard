import config from '../env.js';
import * as actionTypes from '../constants/ActionTypes';

// Middleware that pushes state back to server anytime songs get fuxxed wif

let pushToServer = store => next => action => {
  const result = next(action);
	const socket = require('socket.io-client')(config.SOCKET_URL);
	
	// LOG EVERYTHING
	console.log(action.type);
	console.log(JSON.stringify(store.getState().state.toJSON(),null, 2));

	if (action.type != actionTypes.LOAD_SETLIST_STATE) {
		// Don't push state if ya just loaded it
		console.log("Pushin 2 da server!");
		socket.emit('pushState', store.getState().state.toJSON());
	}

  return result;
};

export default pushToServer;
