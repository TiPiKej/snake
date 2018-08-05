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
		let snakeLength = 100;
		let snakeSpeed = .5;
		let currentLocation = {
				left: 10,
				top: 10
			}
		let changeDirections = [
				{
					previousDirection: null, 
					currentDirection: 'down', 
					left: 10, 
					top: 0
				}
			];
		let direction = 'down';
		let allLocations = [
			{
				left: currentLocation.left, 
				top: currentLocation.top,
				direction: direction
			}
		];


		/*****************/
		/* Game function */
		/*****************/

		const canvasAnimation = () => {
			Array.from(canvasAll).forEach(canvas => {
				const width = canvas.offsetWidth,
							height = canvas.offsetHeight;

				const ctx = canvas.getContext('2d');

				ctx.clearRect(0, 0, Number(width), Number(height));
				ctx.beginPath();
				ctx.lineWidth = 2;

				switch(this.state.keys.keyCode){
					case 37:// Arrow Left
						direction = direction !== 'right'? 'left': direction;
						break;
					case 38:// Arrow Up
						direction = direction !== 'down'? 'up': direction;
						break;
					case 39:// Arrow Right
						direction = direction !== 'left'? 'right': direction;
						break;
					case 40:// Arrow Down
						direction = direction !== 'up'? 'down': direction;
						break;
				}
				switch(direction){
					case "up":
						currentLocation.top -= snakeSpeed;
						break;
					case "down":
						currentLocation.top += snakeSpeed;
						break;
					case "left":
						currentLocation.left -= snakeSpeed;
						break;
					case "right":
						currentLocation.left += snakeSpeed;
						break;
				}

				allLocations.push({
					left: currentLocation.left,
					top: currentLocation.top,
					direction
				});

				ctx.moveTo(currentLocation.left, currentLocation.top);
				
				let leftLength = snakeLength,
						i = 1;

				while(leftLength > 0){
					if(allLocations[allLocations.length - i] === undefined) break;
					const {left, top, direction} = allLocations[allLocations.length - i];

					ctx.lineTo(left, top);

					leftLength--;
					i++;
				}

				ctx.stroke();
			});
			setTimeout(canvasAnimation, 1000/this.state.frameRate);
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