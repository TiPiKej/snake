import React, { Component } from 'react';
import { connect } from "react-redux";
import { keyDown, keyUp, addPoints } from './actions/';
import { CanvasGame } from './CanvasGame';
import { ShowFps } from './ShowFps';
import { TitleSnake } from './TitleSnake';
import { StartGame } from './StartGame';
import { Settings } from './Settings';
import './css/canvasWrapper.css';

export class Snake extends Component{
	constructor(props){
		super(props);

		this.state = {
			keys: {
				key: '',
				keyCode: null
			},
			again: false,
			fps: null,
			settings: {
				frameRate: 60,
				showFps: true
			},
			points: [],
			setArray: []
		}

		document.addEventListener("keydown", el => this.props.keyDown(el))
		document.addEventListener("keyup", el => this.props.keyUp(el))
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.keys !== this.props.keys) this.setState({keys: this.props.keys})

		if(prevProps.points !== this.props.points){
			let points = this.state.points.slice();
					points.push(this.props.points.split(',').pop())
			this.setState({points});
		}
	}
	
	playAgain = ({currentTarget}) => {
		const canvasList = Array.from(currentTarget.parentNode.children).filter(el => el.tagName.toLowerCase() === 'canvas')
		canvasList.forEach(el => {
			el.className = el.className.split(' loose')[0];
		});
		this.setState({again: true})
		this.props.keyDown({key: '', keyCode: null})
		setTimeout(() => this.setState({
			again: false
		}),10)
	}

	fps = fps => {
		this.setState({fps})
	}

	settingsChange = (setArray) => {
		this.setState({setArray});
	}

	render(){
		return(
			<div className="gameCanvasWrapper">
				<TitleSnake lang={this.props.lang} />
				<CanvasGame 
					lang={this.props.lang}
					frameRate={this.state.settings.frameRate}
					keys={this.state.keys}
					endGamePoints={this.props.addPoints}
					again={this.state.again}
					fps={this.fps}
					settings={this.state.setArray} />
				<StartGame 
					lang={this.props.lang}
					onPlayAgain={this.playAgain}
					points={this.state.points} />
				{this.state.settings.showFps?(
					<ShowFps
						fps={this.state.fps} />
					):null}
				<Settings 
					lang={this.props.lang}
					settingsArray={this.settingsChange} />
			</div>
		);
	}
}


const mapStateToProps = (state) => {
  return {
  	keys: state.keys,
  	lang: state.lang,
  	points: state.points,
  }
};
const mapDispatchToProps = { keyDown, keyUp, addPoints };

export const GameSnake = connect(mapStateToProps, mapDispatchToProps)(Snake);