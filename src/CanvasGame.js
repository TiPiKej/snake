import React, { Component } from 'react';

export class CanvasGame extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			frameRate: props.frameRate === undefined? 30: props.frameRate,
			keys: {
				key: '',
				keyCode: 0
			}
		}

		this.backTitle = {
			pl: "Twoja przeglądarka nie obsługuje technologi: Canvas",
			en: "Canvas is not supported on your browser"
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.lang !== this.props.lang) this.setState({lang: this.props.lang})
		
		if(prevState.keys !== this.props.keys) this.setState({keys: this.props.keys})

		if(prevState.again !== this.props.again && this.props.again) this.canvas()
	}

	canvas = el => {

		/*
		 *
		 *	Initial variables
		 *
		 */

		const canvasAll = document.querySelectorAll('.canvasSnake');
		let width, height;
		let appleLocations = [];
		const appleContent = "*",
					appleFont = '32px serif';
		const lengthOfOneSegment = 20;
		let snakeLength = 3;
		let snakeSpeed = 1;
		let snakeWidth = 3;
		let currentLocation = {
				left: 100,
				top: 100
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
				width = canvas.offsetWidth,
				height = canvas.offsetHeight;

				const ctx = canvas.getContext('2d');

				ctx.clearRect(0, 0, Number(width), Number(height));
				ctx.beginPath();


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


				/*----------------  drawing apples  ----------------*/
				/*----------  and checking for eat apple  ----------*/

				Array.from(appleLocations).forEach(({left, top, grabbed}, nr) => {
					if(!grabbed) {

						if(
							currentLocation.top > top &&
							currentLocation.top < top + 16 &&
							currentLocation.left > left &&
							currentLocation.left < left + 16
							) {
								appleLocations[nr].grabbed = true
								snakeLength++;
							}

						ctx.font = appleFont;
						ctx.textBaseline = 'top';
						ctx.fillText(
								appleContent, 
								left, 
								top
							);
					} 
					/*
					 * text jest na polu 16px x 16px
					 */
				});


				/*----------   adding snake current location to array  ----------*/
				
				allLocations.push({
					left: this.power(currentLocation.left, snakeSpeed),
					top: this.power(currentLocation.top, snakeSpeed),
					direction
				});


				/*----------  starting drawing and moving snake head to current location  ----------*/
				
				ctx.moveTo(currentLocation.left, currentLocation.top);
				

				/*----------  declarate local variable  ----------*/
								
				let leftLength = snakeLength * lengthOfOneSegment,
						i = 1;
				
				ctx.lineWidth = snakeWidth;

				
				/*----------  drawing all segments  ----------*/

				while(leftLength > 0){
					if(allLocations[allLocations.length - i] === undefined) break;
					let {left, top, direction} = allLocations[allLocations.length - i];


				
					/*----------  checking for eat himself  ----------*/
					
					if(
						left === currentLocation.left &&
						top === currentLocation.top &&
						i !== 1
					) loose = true
				

					ctx.lineTo(left, top);
					leftLength--;
					i++;
				}


				/*----------  coloring snake trace  ----------*/
				
				ctx.stroke();

				/*----------  checking for possibly loose  ----------*/
				
				loose = loose? true: checkIfLoose(allLocations, width, height, snakeLength * lengthOfOneSegment);

				if(loose) canvas.className += ' loose';

			});

			/*----------  game loop  ----------*/
			

			if(!loose) setTimeout(canvasAnimation, 1000/this.state.frameRate);
			else {
				this.props.endGamePoints(snakeLength - 1);
				clearInterval(this.applesInt)
			}
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

		this.applesInt = setInterval(() => {
			if(!loose){
				appleLocations.push({
					left: width === undefined?(
							Math.random() * 450
						):(
							Math.random() * width
						),
					top: width === undefined?(
							Math.random() * 280
						):(
							Math.random() * height
						),
					grabbed: false
				})
			}
		},3000);

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