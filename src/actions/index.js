export const keyDown = ({key, keyCode}) => ({
	type: "KEY_DOWN",
	key,
	keyCode
});

export const keyUp = ({key, keyCode}) => ({
	type: "KEY_UP",
	key,
	keyCode
});

export const changeLang = (lang) => ({
	type: "CHANGE_LANGUAGE",
	lang
});

export const addPoints = (points) => ({
	type: "ADD_POINTS",
	points
});