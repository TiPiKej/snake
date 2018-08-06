export const points = (state = '', {type, points}) => {
	switch(type){
		case "ADD_POINTS":
			if(state.length > 0) return String(`${state},${points}`)
			else return String(`${points}`)
		default: 
			return state
	}
}