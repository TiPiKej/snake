import React, {Component} from 'react';

export class ShowFps extends Component{
	constructor(props){
		super(props);

		this.state = {
			fps: props.fps
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.fps !== this.props.fps) this.setState({fps: this.props.fps})
	}

	render(){
		return(
			<div className="fps">
				{this.state.fps}
			</div>
		);
	}
}