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
		let appleLocations = [];
		const appleObj = new Image();
					appleObj.src = "https://openclipart.org/download/183893/simple-apple.svg";
					appleObj.onload = () => {
						appleLocations = [
							{
								left: 200,
								top: 200,
								grabbed: false
							}
						];
					}
		const lengthOfOneSegment = 20;
		let snakeLength = 3;
		let snakeSpeed = 1;
		let snakeWidth = 3;
		let currentLocation = {
				left: 10,
				top: 10
			}
		let direction = 'down';
		let allLocations = [
			{
				left: currentLocation.left, 
				top: currentLocation.top,
				direction: direction
			}
		];
		let loose = false;


		/*****************/
		/* Game function */
		/*****************/

		const canvasAnimation = () => {
			Array.from(canvasAll).forEach(canvas => {
				const width = canvas.offsetWidth,
							height = canvas.offsetHeight;

				const ctx = canvas.getContext('2d');

				ctx.clearRect(0, 0, Number(width), Number(height));

				/*----------  drawing apples  ----------*/

				Array.from(appleLocations).forEach(apple => {
					// console.log(apple)
					if(!apple.grabbed) ctx.drawImage(appleObj, apple.left, apple.top, 20, 20)
				});


				/*----------  detecting change direction from arrows keys  ----------*/
				
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


				/*----------  moving snake  ----------*/

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


				/*----------   adding snake current location to array  ----------*/
				
				allLocations.push({
					left: this.power(currentLocation.left, snakeSpeed),
					top: this.power(currentLocation.top, snakeSpeed),
					direction
				});


				/*----------  starting drawing and moving snake head to current location  ----------*/
				
				ctx.beginPath();
				ctx.moveTo(currentLocation.left, currentLocation.top);
				

				/*----------  declarate local variable  ----------*/
								
				let leftLength = snakeLength * lengthOfOneSegment,
						i = 1;
				
				ctx.lineWidth = snakeWidth;

				
				/*----------  drawing all segments  ----------*/

				while(leftLength > 0){
					if(allLocations[allLocations.length - i] === undefined) break;
					let {left, top, direction} = allLocations[allLocations.length - i];

					ctx.lineTo(left, top);
					leftLength--;
					i++;
				}


				/*----------  coloring snake trace  ----------*/
				
				ctx.stroke();

				/*----------  checking for possibly loose  ----------*/
				
				loose = checkIfLoose(allLocations, width, height, snakeLength * lengthOfOneSegment);

			});
			if(!loose) setTimeout(canvasAnimation, 1000/this.state.frameRate);
		}


		/*===========================================
		=            game loose function            =
		===========================================*/
		

		const checkIfLoose = (allLocations, width, height, snakeLength) => {
			const {left, top} = allLocations[allLocations.length - 1];
			if(
				left <= 0 ||
				top <= 0 ||
				left >= width ||
				top >= height
				)return true;
			else return false;
		}

		canvasAnimation();
	}

	power = (value, snakeSpeed) => {
		if(String(snakeSpeed).split('.')[1] !== undefined){
			const p = String(snakeSpeed).split('.')[1].length;
			return Math.floor(value * Math.pow(10, p)) / Math.pow(10, p);
		}else{
			return value;
		}
	}

	componentDidMount(){
		this.canvas();
	}

	render(){
		return(
			<canvas
				width="500"
				height="300"
				className="canvasSnake">
				{this.backTitle[this.state.lang] === undefined? this.backTitle['en']: this.backTitle[this.state.lang]}
			</canvas>
		);
	}
}