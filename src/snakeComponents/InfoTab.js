import React, { Component } from 'react';
import { connect } from "react-redux";

export class InfoTabClass extends Component{
	constructor(props){
		super(props);

		this.state = {
			points: [],
			lang: props.lang,
			listOn: true
		}
	}

	lang = {
		pl: {
			title: "Tablica informacyjna",
			content: "punkty",
			howMuch: "wpisów"
		},
		en: {
			title: "Information board",
			content: "points",
			howMuch: "entires"
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.points !== this.props.points){
			let points = this.state.points.slice();
					points.push(this.props.points.split(',').pop())
			this.setState({points});
		}

		if(prevProps.lang !== this.props.lang) this.setState({lang: this.props.lang});
	}

	slide = ({currentTarget}) => {
		const {parentNode} = currentTarget;
		let {classList} = parentNode;
		let isInside = false;

		Array.from(classList).forEach(el => isInside = (el === 'hide')? true: isInside)

		localStorage.setItem('showInfoBoard', isInside);

		if(isInside) classList.remove('hide')
		else classList.add('hide')
		// this.setState({listOn: this.state.listOn? false: true})
	}

	render(){
		return(
			<div className={`infoBoardWrapper${
					localStorage.getItem('showInfoBoard') === 'false'? ' hide': ''
				}${
					this.state.points.length === 0? ' notVisibility' : ''
				}`}>
				<div className="infoBoard">

					<p className="title">
						{ this.lang[this.state.lang] === undefined? this.lang['en'].title : this.lang[this.state.lang].title }
					</p>

					<ul>
						{this.state.points.map((el, nr) => (
							<li key={nr}>
								{nr + 1}# {this.lang[this.state.lang] === undefined?this.lang['en'].content: this.lang[this.state.lang].content} - {el}
							</li>
							))}
					</ul>

				</div>

				<p
					className="infoBoardTriangle"
					onClick={this.slide}>
					&#9664;
				</p>
			</div>
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