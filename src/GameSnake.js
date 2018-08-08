import React, { Component } from 'react';
import { connect } from "react-redux";
import { keyDown, addPoints } from './actions/';
import './css/canvasWrapper.css';

import { CanvasGame }  from './snakeComponents/CanvasGame';
import { ShowFps    }  from './snakeComponents/ShowFps';
import { TitleSnake }  from './snakeComponents/TitleSnake';
import { StartGame  }  from './snakeComponents/StartGame';
import { Settings   }  from './snakeComponents/Settings';
import { InfoTab    }  from './snakeComponents/InfoTab';

export class Snake extends Component{
	constructor(props){
		super(props);

		this.state = {
			keys: {
				key: '',
				keyCode: null
			},
			gameCounter: 0,
			fps: null,
			settings: {},
			points: [],
			setArray: {},
			looseCounter: 0
		}

		document.addEventListener("keydown", el => this.props.keyDown(el))
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
		// toggle className of play again button
		const canvasList = Array.from(currentTarget.parentNode.children).filter(el => el.tagName.toLowerCase() === 'canvas')
		canvasList.forEach(el => {
			el.className = el.className.split(' loose')[0];
		});
		// call out canvas game to start
		this.setState({gameCounter: this.state.gameCounter + 1})
		// reset keys clicked
		this.props.keyDown({key: '', keyCode: null})
	}

	fps = fps => {
		// catch frames variable from canvas component
		this.setState({fps})
	}

	settingsChange = (settings) => {
		this.setState({settings});
	}

	onLoose = (canvas) => {
		// increment counter value to init other functions
		this.setState({looseCounter: this.state.looseCounter + 1});

		canvas.className += ' loose';
	}

	render(){
		return(
			<div className="gameCanvasWrapper">
      	<InfoTab />
				<TitleSnake lang={this.props.lang} />
				<CanvasGame 
					lang={this.props.lang}
					frameRate={this.state.settings.frameRate}
					keys={this.state.keys}
					endGamePoints={this.props.addPoints}
					gameCounter={this.state.gameCounter}
					fps={this.fps}
					settings={this.state.settings}
					onLoose={this.onLoose} />
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
const mapDispatchToProps = { keyDown, addPoints };

export const GameSnake = connect(mapStateToProps, mapDispatchToProps)(Snake);