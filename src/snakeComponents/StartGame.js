import React, { Component } from 'react';


export class StartGame extends Component{
	constructor(props){
		super(props);

		this.state = {
			lang: props.lang === undefined? "en": props.lang,
			title: {
				pl: {
					again: "Zagraj jeszcze raz",
					first: "Kliknij żeby zagrać"
				},
				en: {
					again: "Play again",
					first: "Click this to play"
				}
			},
			points: []
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang});

		if(prevProps.points !== this.props.points) this.setState({points: this.props.points});
	}


	render(){
		return(
			<button 
				className="playAgain"
				onClick={this.props.onPlayAgain}>
				{this.state.title[this.state.lang] === undefined? (
						this.state.points.length > 0? this.state.title['en']['again']: this.state.title['en']['first']
					):(
						this.state.points.length > 0? this.state.title[this.state.lang]['again']: this.state.title[this.state.lang]['first']
					)}
			</button>
		);
	}
}