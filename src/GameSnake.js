import React, { Component } from 'react';
import { connect } from "react-redux";
import { keyDown, keyUp } from './actions/';
import { CanvasGame } from './CanvasGame';

class TitleSnake extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			title: {
				pl: "Gra w snake'a",
				en: "Snake game",
				noData: "No data"
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang});
	}


	render(){
		return(
			<div>
				{this.state.title[this.state.lang] === undefined? this.state.title['noData']: this.state.title[this.state.lang]}
			</div>
		);
	}
}

export class Snake extends Component{
	constructor(props){
		super(props);

		this.state = {
			keys: {
				key: '',
				keyCode: null
			},
			frameRate: 10
		}

		document.addEventListener("keydown", el => this.props.keyDown(el))
		document.addEventListener("keyup", el => this.props.keyUp(el))
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.keys !== this.props.keys) this.setState({keys: this.props.keys})
	}

	render(){
		return(
			<div>
				<TitleSnake lang={this.props.lang} />
				<CanvasGame 
					lang={this.props.lang}
					frameRate={this.state.frameRate}
					keys={this.state.keys} />
				Naciśnięte przyciski: 
				{this.state.keys.key},
				{this.state.keys.keyCode}
			</div>
		);
	}
}


const mapStateToProps = (state) => {
  return {
  	keys: state.keys,
  	lang: state.lang
  }
};
const mapDispatchToProps = { keyDown, keyUp };

export const GameSnake = connect(mapStateToProps, mapDispatchToProps)(Snake);