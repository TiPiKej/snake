import React, {Component} from 'react';

export class Settings extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? 'en': props.lang,
			inputs: [
				{
					what: "width",
					type: "number",
					toolTip: {
						pl: "Szerokość gry",
						en: "Game width"
					},
					value: "500"
				},
				{
					what: "height",
					type: "number",
					toolTip: {
						pl: "Wysokość gry",
						en: "Game height"
					},
					value: "300"
				},
				{
					what: "lengthOfOneSegmentBeforeEdited",
					type: "number",
					toolTip: {
						pl: "Dlugość jednego 'ogniwa' węża",
						en: "Length of one link snake"
					},
					value: "20"
				},
				{
					what: "snakeSpeed",
					type: "number",
					toolTip: {
						pl: "Prędkość węża",
						en: "Snake speed"
					},
					value: "1"
				},
				{
					what: "snakeWidth",
					type: "number",
					toolTip: {
						pl: "Szerokość węża",
						en: "Snake width"
					},
					value: "3"
				},
				{
					what: "startLocationLeft",
					type: "number",
					toolTip: {
						pl: "Punkt startowy - lewy",
						en: "Start point - left"
					},
					value: "10"
				},
				{
					what: "startLocationTop",
					type: "number",
					toolTip: {
						pl: "Punkt startowy - góra",
						en: "Start point - top"
					},
					value: "10"
				},
				{
					what: "startDirection",
					type: "select",
					toolTip: {
						pl: "Kierunek startowy",
						en: "Start direction"
					},
					value: 'down',
					values: [
						{value: "up"},
						{value: "right"},
						{value: "down"},
						{value: "left"}
					]
				},
				{
					what: "appleRepeatSpeed",
					type: "number",
					toolTip: {
						pl: "Okres pomiedzy pojawianiem się jabłek",
						en: "Time lapse before appears futher apples"
					},
					value: "3",
					unit: "sec"
				},
				{
					what: "frameRate",
					type: "number",
					toolTip: {
						pl: "Klatki na sekunde",
						en: "Frames per second"
					},
					value: "60"
				}
			]
		}
	}

	componentDidMount(){
		this.sendArray(null, true);
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang})
	}

	showHide = ({currentTarget}, ifClickButton = false) => {
		let toChange;
		if(ifClickButton) toChange = currentTarget.parentNode;
		else toChange = currentTarget.previousSibling;
		
		toChange.className = toChange.className.split(' ').length > 1?(
			toChange.className.split(' ')[0]
		):(
			toChange.className + ' active'
		);
	}

	changeSettingsValues = ({currentTarget}, {what}, nr) => {
		let inputs = this.state.inputs.slice();
		inputs[nr]['value'] = currentTarget.value;
		this.setState({inputs})
	}

	sendArray = (element, startUp = false) => {
		let setArray = {};
		this.state.inputs.map(el => {
			setArray[el.what] = el.value
		})
		this.props.settingsArray(setArray)
		if(!startUp) this.showHide(element, true);
	}

	render(){
		return(
			<div className="settingsWrapper">
				<div className="settingsContent">
					{this.state.inputs.map((el, nr) => (
						<div key={`${el.what}${nr}`}>
							{el.toolTip[this.state.lang] === undefined? el.toolTip['en']: el.toolTip[this.state.lang]}
							{el.type === 'select'?(
									<select 
										defaultValue={el.value}
										onChange={ev => this.changeSettingsValues(ev, el, nr)}>
										{el.values.map((val, nbr) => (
											<option
												key={`${val.value}${nbr}`}
												value={val.value}>
												{val.value}
											</option>
										))}
									</select>
								):(
									<p>
										<input
										type={el.type}
										placeholder={el.toolTip[this.state.lang] === undefined? el.toolTip['en']: el.toolTip[this.state.lang]}
										title={el.toolTip[this.state.lang] === undefined? el.toolTip['en']: el.toolTip[this.state.lang]}
										onChange={ev => this.changeSettingsValues(ev, el, nr)}
										value={el.value} />
										{el.unit !== undefined? el.unit: null}
									</p>
								)
							}
						</div>
					))}
					<button onClick={this.sendArray}>
						Wyślij
					</button>
				</div>
				<div 
					className="settingsIcon"
					onClick={this.showHide}></div>
			</div>
		);
	}
}