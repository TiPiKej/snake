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
		let snakeSpeed = .5;
		let currentLocation = {
				left: 10,
				top: 12
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

				if(direction !== changeDirections[changeDirections.length - 1].currentDirection){
					changeDirections.push({
						previousDirection: changeDirections[changeDirections.length - 1].currentDirection, 
						currentDirection: direction, 
						left: currentLocation.left, 
						top: currentLocation.top
					});
					// console.log(changeDirections)
					// console.log(currentLocation)
				}

				let leftLength = snakeLength, 
						i = 1,
						last;


				// console.log(last)
				ctx.moveTo(currentLocation.left, currentLocation.top);
				while(leftLength > 0){
					last = changeDirections[changeDirections.length - i];
					console.log(last)
					// if(last === undefined) break;

					if(last.currentDirection === 'down'){

						// if(leftLength < currentLocation.top - last.top)
						ctx.lineTo(
							currentLocation.left, 
							leftLength < currentLocation.top - last.top?(
								currentLocation.top - leftLength
							):(
								last.top
							)
						);

						leftLength = leftLength - currentLocation.top - last.top;
						currentLocation.top += snakeSpeed;

					}else if(last.currentDirection === 'right'){

						ctx.lineTo( 
							leftLength < currentLocation.left - last.left?(
								currentLocation.left - leftLength
							):(
								last.left
							),
							currentLocation.top
						);

						leftLength = leftLength - currentLocation.left - last.left;

						currentLocation.left += snakeSpeed;

					}else if(last.currentDirection === 'up'){

						ctx.lineTo(
							currentLocation.left, 
							leftLength < last.top - currentLocation.top?(
								currentLocation.top + leftLength
							):(
								last.top
							)
						);

						leftLength = leftLength - last.top - currentLocation.top;

						currentLocation.top -= snakeSpeed;
					}else if(last.currentDirection === 'left'){

						ctx.lineTo(
							leftLength < last.left - currentLocation.left?(
								currentLocation.left + leftLength
							):(
								last.left
							),
							currentLocation.top
						);

						leftLength = leftLength - last.left - currentLocation.left;

						currentLocation.left -= snakeSpeed;

					}
					console.log(last)
					console.log(leftLength)
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