import { combineReducers } from "redux";
import { keys } from './keys';
import { lang } from './lang';
import { points } from './points';

export default combineReducers({
	keys, lang, points
});
