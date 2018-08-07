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
			howMuch: "wpisów",
			slide: "wsuń / wysuń"
		},
		en: {
			title: "Information board",
			content: "points",
			howMuch: "entires",
			slide: "slide"
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

	slide = () => {
		this.setState({listOn: this.state.listOn? false: true})
	}

	render(){
		return(
			this.state.points.length > 0? (
				<div className="infoBoard">
					<p className="title">
						{ this.lang[this.state.lang] === undefined? this.lang['en'].title : this.lang[this.state.lang].title }
					</p>
					<div className="infoCounts">
						{ this.lang[this.state.lang] === undefined? this.lang['en'].howMuch : this.lang[this.state.lang].howMuch }
						:
						{this.state.points.length}
					</div>
					{this.state.listOn?(
						<ul>
							{this.state.points.map((el, nr) => (
								<li key={nr}>
									{nr + 1}# {this.lang[this.state.lang] === undefined?this.lang['en'].content: this.lang[this.state.lang].content} - {el}
								</li>
								))}
						</ul>
					):null}
					<button 
						className="slideButton"
						onClick={this.slide}>
						{ this.lang[this.state.lang] === undefined? this.lang['en'].slide : this.lang[this.state.lang].slide }
					</button>
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