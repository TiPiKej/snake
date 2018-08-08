import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeLang } from './actions/'

export class ChangeLanguageClass extends Component{
	constructor(props){
		super(props);


		// getting language from browser -- if it was set
		if(localStorage.getItem('lang') !== null) this.props.changeLang(localStorage.getItem('lang'));

		this.state = {
			lang: localStorage.getItem('lang') === null? props.lang: localStorage.getItem('lang'),
			text: {
				pl: "Zmień język",
				en: "Change language"
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang})
	}

	change = ({currentTarget}) => {
		this.props.changeLang(currentTarget.value);
		localStorage.setItem('lang', currentTarget.value);
	}

	languages = [
		{
			codeName: "pl",
			fullName: "Polski"
		},
		{
			codeName: "en",
			fullName: "English"
		}
	]

	showHide = ({currentTarget}) => {
		const {parentNode} = currentTarget;
		let {classList} = parentNode;
		let isInside = false;

		Array.from(classList).forEach(el => isInside = (el === 'hide')? true: isInside)

		localStorage.setItem('showLanguages', isInside);

		if(isInside) classList.remove('hide')
		else classList.add('hide')
	}

	render(){
		return( // localStorage.getItem('showLanguages')
			<div className={`changeLanguageWrapper${
					localStorage.getItem('showLanguages') === 'false'? ' hide': ''
				}`}>
				<div
					className={`changeLanguage`}>
					{this.state.text[this.state.lang] === undefined? this.state.text['en']: this.state.text[this.state.lang]}
					:
					<select 
						onChange={this.change} 
						defaultValue={this.state.lang}>
						{this.languages.map(el => (
							<option 
								key={el.codeName} 
								value={el.codeName}>
								{el.fullName}
							</option>
						))}
					</select>
				</div>
				
				<p
					className="changeLanguageTriangle"
					onClick={this.showHide}>
					&#9664;
				</p>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
  return {
  	lang: state.lang
  }
};
const mapDispatchToProps = { changeLang };

export const ChangeLanguage = connect(mapStateToProps, mapDispatchToProps)(ChangeLanguageClass);