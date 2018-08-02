import React, { Component } from 'react';
import './css/canvas.css';

export class CanvasGame extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			frameRate: props.frameRate === undefined? 60: props.frameRate,
			keys: {
				key: '',
				keyCode: 0
			}
		}

		this.backTitle = {
			pl: "Twoja przeglądarka nie obsługuje technologi: Canvas",
			en: "Your browser is not supported"
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.lang !== this.props.lang) this.setState({lang: this.props.lang})
		
		if(prevState.keys !== this.props.keys) this.setState({keys: this.props.keys})
	}

	canvas = el => {

		/*
		 *
		 *	Initial variables
		 *
		 */

		const canvasAll = document.querySelectorAll('.canvasSnake');
		let snakeLength = 10;
		let currentLocation = {
				left: 2,
				top: 11
			}
		let changeDirections = [
				{
					previousDirection: null, 
					currentDirection: 'down', 
					left: null, 
					top: null
				}
			];


		/*****************/
		/* Game function */
		/*****************/

		const canvasAnimation = () => {
			Array.from(canvasAll).forEach(canvas => {

				const ctx = canvas.getContext('2d');

				// ctx.

				setTimeout(this.canvasAnimation, 1000/this.state.frameRate);
			});
		}


		canvasAnimation();
	}

	componentDidMount(){
		this.canvas();
	}

	render(){
		return(
			<canvas
				className="canvasSnake">
				{this.backTitle[this.state.lang] === undefined? this.backTitle['en']: this.backTitle[this.state.lang]}
			</canvas>
		);
	}
}