export const points = (state = 0, {type, points}) => {
	switch(type){
		case "ADD_POINTS":
			return points
		default: 
			return state
	}
}