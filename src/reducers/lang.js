export const lang = (state = 'en', {type, lang}) => {
	switch(type){
		case "CHANGE_LANGUAGE":
			return lang
		default: 
			return state
	}
}