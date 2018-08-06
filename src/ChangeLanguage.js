import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeLang } from './actions/'

export class ChangeLanguageClass extends Component{
	constructor(props){
		super(props);

		if(localStorage.getItem('lang') !== undefined) this.props.changeLang(localStorage.getItem('lang'));

		this.state = {
			lang: localStorage.getItem('lang') === undefined? props.lang: localStorage.getItem('lang'),
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

	render(){
		return(
			<div className="changeLanguage">
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