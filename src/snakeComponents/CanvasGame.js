import React, { Component } from 'react';

export class CanvasGame extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			keys: {
				key: '',
				keyCode: 0
			},
			width: 500,
			height: 300,
			settings: [],
			gameCounter: 0
		}

		this.backTitle = {
			pl: "Twoja przeglądarka nie obsługuje technologi: Canvas",
			en: "Canvas is not supported on your browser"
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.lang !== this.props.lang) this.setState({lang: this.props.lang});
		
		if(prevState.keys !== this.props.keys) this.setState({keys: this.props.keys});

		if(prevProps.gameCounter !== this.props.gameCounter) {
			this.setState({gameCounter: this.props.gameCounter})
			this.canvas();
		}

		if(prevProps.settings !== this.props.settings) {
			const {width, height} = this.toNumber(this.props.settings);
			this.setState({
				settings: this.props.settings,
				width,
				height
			});
		}
	}

	toNumber = (arr) => {
		let ret = {};
		Object.keys(arr).map(el => {
			if(isNaN(Number(arr[el]))) return ret[el] = arr[el]
			else return ret[el] = Number(arr[el])
		});
		return ret
	}

	canvas = () => {

		/*
		 *
		 *	Initial variables
		 *
		 */


		 /*----------  changeable variables  ----------*/
		 
		const {
			width, 
			height,
			lengthOfOneSegmentBeforeEdited,
			snakeSpeed,
			snakeWidth,
			appleRepeatSpeed,
			frameRate,
			startLocationLeft,
			startLocationTop
		} = this.toNumber(this.state.settings);

		const {
			startDirection,
			showFps
		} = this.state.settings;

		const startLocation = {
			left: startLocationLeft,
			top: startLocationTop
		}

		/*----------  variables which cannot be changed  ----------*/
		

		const canvasAll = document.querySelectorAll('.canvasSnake');
		let appleLocations = [];
		const appleContent = "*",
					appleFont = '32px serif';
		let snakeLength = 1;
		let currentLocation = {...startLocation}
		let direction;
		let allLocations = [
			{
				left: startLocation.left, 
				top: startLocation.top,
				direction: startDirection
			}
		];
		let loose = false;
		let applesLoop = null;
		const snakeSpeedCalculated = snakeSpeed * (60 / frameRate);
		const lengthOfOneSegment = lengthOfOneSegmentBeforeEdited * (frameRate / 60);
		let fpsCalc = 0;
		let fpsLoop = null;


		// reset keys clicked
		// i must to do this like that 'cause setState is async function
		this.state = {
			keys: {key: '', keyCode: null}
		}

		/*****************/
		/* Game function */
		/*****************/

		const canvasAnimation = () => {
			Array.from(canvasAll).forEach(canvas => {
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
					default: // We're using previous action or if it's the first time - we using user settings
						direction = allLocations[allLocations.length - 1].direction;
						break;
				}


				/*----------  moving snake  ----------*/

				switch(direction){
					case "up":
						currentLocation.top -= snakeSpeedCalculated;
						break;
					case "down":
						currentLocation.top += snakeSpeedCalculated;
						break;
					case "left":
						currentLocation.left -= snakeSpeedCalculated;
						break;
					case "right":
						currentLocation.left += snakeSpeedCalculated;
						break;
					default:
						// do nothing
						// i add this to eliminate warning
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
					left: currentLocation.left,
					top: currentLocation.top,
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
					let {left, top/*, direction*/} = allLocations[allLocations.length - i];


				
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

				/*----------  checking for possibly loose from hitting to border  ----------*/
				
				if(!loose){
					const {left, top} = allLocations[allLocations.length - 1];

					if(
						left <= 0 ||
						top <= 0 ||
						left >= width ||
						top >= height
					) loose = true;
				}

				if(loose) this.props.onLoose(canvas);

			});

			/*----------  game loop  ----------*/
			

			if(!loose) setTimeout(canvasAnimation, 1000/frameRate);
			else {
				// this is induce when player loose game
				this.props.endGamePoints(snakeLength - 1);
				
				// stop adding apples
				clearInterval(applesLoop)

				// stop fps counter
				clearTimeout(fpsLoop)
			}

			// increment value of fps counter

			fpsCalc++;
		}

		/*=====================================
		=            adding apples            =
		=====================================*/
		

		applesLoop = setInterval(() => {
			if(!loose){
				appleLocations.push({
					left: width === undefined?(
							Math.random() * 450
						):(
							Math.random() * (width - 20)
						),
					top: width === undefined?(
							Math.random() * 280
						):(
							Math.random() * (height - 20)
						),
					grabbed: false
				})
				// console.log(appleLocations[appleLocations.length - 1])
			}
		}, appleRepeatSpeed * 1000);


		
		/*================================================
		=            fps calculating function            =
		================================================*/
		
		const fpsFunction = () => {
			this.props.fps(fpsCalc)
			fpsCalc = 0;

			fpsLoop = setTimeout(fpsFunction,1000);
		}

		/*============================================
		=            first time induction            =
		============================================*/
		
		
		
		if(!loose) canvasAnimation();
		if(showFps) fpsFunction();
	}

	render(){
		return(
			<canvas
				width={this.state.width}
				height={this.state.height}
				className="canvasSnake loose">
				{this.backTitle[this.state.lang] === undefined? this.backTitle['en']: this.backTitle[this.state.lang]}
			</canvas>
		);
	}
}