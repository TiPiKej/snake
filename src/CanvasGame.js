import React, { Component } from 'react';
import './css/canvas.css';

export class CanvasGame extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			frameRate: props.frameRate === undefined? 60: props.frameRate,
			snakeLength: 10,
			currentLocation: {
				left: 2,
				top: 11
			},
			keys: {
				key: '',
				keyCode: 0
			},
			changeDirections: [
				{currentDirection: 'down', left: 2, top: 0}
			],
			direction: 'down'
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
		const canvasAll = document.querySelectorAll('.canvasSnake');

		Array.from(canvasAll).forEach(canvas => {
			const ctx = canvas.getContext('2d');
			const width = canvas.offsetWidth,
						height = canvas.offsetHeight;
			// const lengthOfOneSegment = 5;
			let snakeLength = this.state.snakeLength;
			let left = this.state.currentLocation.left,
					top = this.state.currentLocation.top;
			const snakeSpeed = .5;
			let direction = this.state.direction;
			let changeDirections = this.state.changeDirections.slice();

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

			if(direction !== this.state.direction){
				changeDirections.push({
					left,
					top,
					currentDirection: direction,
					previousDirection: this.state.direction
				});
				// console.table(changeDirections)
				// console.table(changeDirections[changeDirections.length - 1])
				this.setState({changeDirections});
			}

			ctx.clearRect(0, 0, Number(width), Number(height));
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.moveTo(left, top);
			let lineToLeft = left, 
					lineToTop = top, 
					i = 1, curDir;

			while(snakeLength > 0){
				curDir = changeDirections[changeDirections.length - i];
				console.log(top)

				switch(curDir.currentDirection){
					case "down":
						top += snakeSpeed;
						snakeLength -= top - curDir.top;
						lineToTop = top - curDir.top;
						break;
					case "up":
						top -= snakeSpeed;
						snakeLength -= curDir.top - top;
						lineToTop = curDir.top - top;
						break;
					case "left":
						left -= snakeSpeed;
						snakeLength -= curDir.left - left;
						lineToLeft = curDir.left - left;
						break;
					case "right":
						left += snakeSpeed;
						snakeLength -= left - curDir.left;
						lineToLeft = left - curDir.left;
						break;
				}


				ctx.lineTo(
					lineToLeft,
					lineToTop
				);

				i++;
			}

			ctx.stroke();

			const power = (value) => {
				if(String(snakeSpeed).split('.')[1] !== undefined){
					const p = String(snakeSpeed).split('.')[1].length;

					return Math.floor(value * Math.pow(10, p)) / Math.pow(10, p);
				}else{
					return value;
				}
			}

			left = power(left);
			top = power(top);

			const currentLocation = {left, top};

			this.setState({currentLocation, direction});

		});


		setTimeout(this.canvasAnimation, 1000/this.state.frameRate);
	}

	componentDidMount(){
		this.canvasAnimation();
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