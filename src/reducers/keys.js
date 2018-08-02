export const keys = (state = {key: '', keyCode: null}, {type, key, keyCode}) => {
	switch(type){
		case "KEY_DOWN":
			return {key, keyCode}
		default: 
			return state
	}
}