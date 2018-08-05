import React, { Component } from 'react';
import { connect } from "react-redux";

export class InfoTabClass extends Component{
	constructor(props){
		super(props);

		this.state = {
			points: [],
			lang: props.lang
		}
	}

	lang = {
		pl: {
			title: "Tablica informacyjna",
			content: "punkty"
		},
		en: {
			title: "Information board",
			content: "points"
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.points !== this.props.points){
			let points = this.state.points.slice();
					points.push(this.props.points)
			this.setState({points});
		}

		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang});
	}

	render(){
		return(
			this.state.points.length > 0? (
				<div>
					<p className="title">
						{this.lang[this.state.lang] === undefined?this.lang['en'].title: this.lang[this.state.lang].title}
					</p>
					<ul>
						{this.state.points.map((el, nr) => <li key={nr}>{nr + 1}# {this.lang[this.state.lang] === undefined?this.lang['en'].content: this.lang[this.state.lang].content} - {el}</li>)}
					</ul>
				</div>
			) : null
		);
	}
}


const mapStateToProps = (state) => {
  return {
  	points: state.points,
  	lang: state.lang
  }
};

export const InfoTab = connect(mapStateToProps)(InfoTabClass);