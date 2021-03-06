import React, { Component } from 'react';

export default class AddFoundSong extends Component {
	handleClick(event) {
		this.props.onAddSong({
			inputs: [{
				name: "title",
				value: this.props.song.title ? this.props.song.title : '',
			},{
				name: "artist",
				value: this.props.song.artist ? this.props.song.artist : '',
			},{
				name: "album",
				value: this.props.song.album? this.props.song.album : '',
			},{
				name: "label",
				value: this.props.song.label ? this.props.song.label : '',
			},{
				name: "year",
				value: this.props.song.date ? this.props.song.date : '',
			},{
				name: "notes",
				value: ''
			}],
			img64px: this.props.song.img64px ? this.props.song.img64px : '',
			img300px: this.props.song.img300px ? this.props.song.img300px : '',
			played: false
		});
		this.props.onClearSongs();
	}


  render() {
    return (
			<button
				type="button"
				className="btn btn-primary col-xs-12 col-sm-3 col-sm-offset-3"
				onClick={ (e) => this.handleClick(e) } >
				<span
					className="glyphicon glyphicon-plus"
					aria-hidden="true"></span> Add To Setlist
			</button>
    );
  }

}
