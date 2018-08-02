import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeLang } from './actions/'

export class ChangeLanguageClass extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang,
			text: {
				pl: "Zmień język",
				en: "Change language",
				noData: "No data"
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang})
	}

	change = ({currentTarget}) => {
		this.props.changeLang(currentTarget.value)
	}

	languages = [
		{
			codeName: "pl",
			fullName: "Polski"
		},
		{
			codeName: "en",
			fullName: "English"
		},
		{
			codeName: "dsa",
			fullName: "dsadsadsa"
		}
	]

	render(){
		return(
			<div>
				{this.state.text[this.state.lang] === undefined? this.state.text['noData']: this.state.text[this.state.lang]}
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