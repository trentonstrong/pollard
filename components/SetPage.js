import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	selectSong,
	updateSong,
	addSong,
	searchSong,
	markSongPlayed,
	moveSong,
	deleteSong,
	setSetlistId,
	loadSetlistState
} from '../actions/Actions.js';

import mergeStyles from '../lib/mergeStyles';
import config from '../env.js';

import Setlist from './Setlist.js';

class SetPage extends Component {
	socketIOevents() {
			const socket = require('socket.io-client')(config.SOCKET_URL);
			const urlSetlistId = this.props.params.id;
			if (typeof urlSetlistId == 'undefined') {
				if (!this.props.viewSetlist.get('id')) {
					socket.emit('loadNewSetlist');
					socket.on('newSetlistCreated', (setlist) => {
						this.props.actions.setSetlistId(setlist.id);
						this.props.history.pushState(null, '/setlist/' + setlist.id);
					});
				} else {
					console.log('trying to reload after initial load????');
				}
			} else {
				socket.emit('loadExistingSetlist', { id: this.props.params.id });
				socket.on('existingSetlistLoaded', ( {setlist} ) => {
					this.props.actions.loadSetlistState(setlist);
				});
			}
	}

	componentDidMount() {
		this.socketIOevents();
	}

	componentWillReceiveProps(nextProps) {
		const setlistId = nextProps.routeParams.id || nextProps.viewSetlist.get('id');

		if (setlistId && !nextProps.routeParams.id) {
			nextProps.history.pushState(null, '/setlist/' + setlistId);
		}
	}

  render() {

		const { songsList, viewSong, viewSetlist } = this.props;

		const songs = songsList.toJSON();
		const selectedSong = viewSong.get('selected');

		const setlistId = this.props.routeParams.id || viewSetlist.get('id');
		
		const setStyle = mergeStyles({
			maxWidth: 720
		});

    return (
      <div style={ setStyle }>
				<h1>Pollard Set Page</h1>
				<Setlist
					songs={ songs }
					selectedSong={ selectedSong }
					setlistId={ setlistId }
					onSelectSong={ (songId) => 
            this.props.actions.selectSong(songId)
					}
					onUpdateSong={ (song) => 
            this.props.actions.updateSong(song)
					}
					onAddSong={ (song) => 
            this.props.actions.addSong(song)
					}
					onMoveSong={ (fromIdx, toIdx) =>
						this.props.actions.moveSong(fromIdx, toIdx)
					}
					onSearchSong={ (song) => 
            this.props.actions.searchSong(song)
					}
					onMarkSongPlayed={ (songId) => 
            this.props.actions.markSongPlayed(songId)
					}
					onDeleteSong={ (songId) => 
            this.props.actions.deleteSong(songId)
					}
				/>
			</div>
    );
  }
}

function mapStateToProps({state}) {
  return {
    songsList: state.getIn(['data','setlist', 'songs']),
    viewSong: state.getIn(['view','song']),
    viewSetlist: state.getIn(['view','setlist'])
  };
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(
			{
				selectSong,
				updateSong,
				addSong,
				searchSong,
				markSongPlayed,
				moveSong,
				deleteSong,
				setSetlistId,
				loadSetlistState
			},
			dispatch
		)
	};
}

// Wrap the component to inject dispatch and state into it

export default connect(mapStateToProps, mapDispatchToProps)(SetPage);
