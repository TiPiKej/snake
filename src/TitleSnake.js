import React, { Component } from 'react';


export class TitleSnake extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			title: {
				pl: "Gra w snake'a",
				en: "Snake game"
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang});
	}


	render(){
		return(
			<div
				className="title">
				{this.state.title[this.state.lang] === undefined? this.state.title['en']: this.state.title[this.state.lang]}
			</div>
		);
	}
}