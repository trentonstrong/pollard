import React, { Component } from 'react';
import classNames from 'classnames';

import mergeStyles from '../lib/mergeStyles';

import MarkPlayedBtn from './MarkPlayedBtn';
import DeleteSongBtn from './DeleteSongBtn';


export default class Song extends Component {
	handleClick(event) {
		this.props.onSelectSong(this.props.idx);
	}


  render() {
		let songStyle= mergeStyles({
			backgroundColor: '#F6EBFA'
		});

		const inputNameFilter = (nameToFind) => {
			return (input) => {
				return input.name == nameToFind;
			};
		};

		const songTitle = this.props.song.inputs.filter(inputNameFilter("title")).pop().value;
		const artistName = this.props.song.inputs.filter(inputNameFilter("artist")).pop().value;

    return (
			<li className="list-group-item clearfix" style={ songStyle }>
					<div
						onClick={ (e) => this.handleClick(e) }
						style={ {marginTop: 5, cursor:'pointer'} }
						className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0">
						{ songTitle } - { artistName }
					</div>
					<div className="visible-xs-block col-xs-12" style={{ marginTop: 5 }} />
					<div className="col-xs-3" />
					<MarkPlayedBtn
						idx={ this.props.idx }
						isSongPlayed={ this.props.song.played }
						onMarkSongPlayed={ this.props.onMarkSongPlayed } />
			</li>
    );
  }

}
