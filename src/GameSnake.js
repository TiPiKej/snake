import React, { Component } from 'react';
import { connect } from "react-redux";
import { keyDown, keyUp, addPoints } from './actions/';
import { CanvasGame } from './CanvasGame';
import './css/canvasWrapper.css';

class TitleSnake extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			title: {
				pl: "Gra w snake'a",
				en: "Snake game"
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang});
	}


	render(){
		return(
			<div
				className="title">
				{this.state.title[this.state.lang] === undefined? this.state.title['en']: this.state.title[this.state.lang]}
			</div>
		);
	}
}

class StartGame extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			title: {
				pl: "Graj od nowa",
				en: "Play again"
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang});
	}


	render(){
		return(
			<button 
				className="playAgain"
				onClick={this.props.onPlayAgain}>
				{this.state.title[this.state.lang] === undefined? this.state.title['en']: this.state.title[this.state.lang]}
			</button>
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
			frameRate: 60,
			again: false
		}

		document.addEventListener("keydown", el => this.props.keyDown(el))
		document.addEventListener("keyup", el => this.props.keyUp(el))
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.keys !== this.props.keys) this.setState({keys: this.props.keys})
	}
	
	playAgain = ({currentTarget}) => {
		const canvasList = Array.from(currentTarget.parentNode.children).filter(el => el.tagName.toLowerCase() === 'canvas')
		canvasList.forEach(el => {
			el.className = el.className.split(' loose')[0];
		});
		this.setState({again: true})
		setTimeout(() => this.setState({again: false}),500)
	}

	render(){
		return(
			<div className="gameCanvasWrapper">
				<TitleSnake lang={this.props.lang} />
				<CanvasGame 
					lang={this.props.lang}
					frameRate={this.state.frameRate}
					keys={this.state.keys}
					endGamePoints={this.props.addPoints}
					again={this.state.again} />
				<StartGame 
					lang={this.props.lang}
					onPlayAgain={this.playAgain} />
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
const mapDispatchToProps = { keyDown, keyUp, addPoints };

export const GameSnake = connect(mapStateToProps, mapDispatchToProps)(Snake);