import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const initialState = {
	authChecked: false,
	loggedIn: false,
	currentUser: {}
}

const authorizationSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		setAuthenticated(state, action) {
			state.authChecked = true;
			state.loggedIn = true;
			state.currentUser = action.payload;
		},
		setNonAuthenticated(state, action) {
			state.authChecked = true;
		},
		updateCurrentUser(state, action) {
			state.currentUser = {
				...state.currentUser,
				...action.payload
			};
		}
	},
});

export function setAuthenticationStatus(dispatch, getState) {
	const cookies = new Cookies();
	const token = cookies.get('token');
	if (token) {
		dispatch(setAuthenticated(jwt_decode(token)));
	} else {
		dispatch(setNonAuthenticated());
	}
}

export const selectCurrentUser = state => state.authorization.currentUser
export const selectIsStravaConnected = state => {
	const res = state.authorization.currentUser.hasOwnProperty('activity_platform') && state.authorization.currentUser.activity_platform === 'strava';
	return res;
}

export const { setAuthenticated, setNonAuthenticated, updateCurrentUser } = authorizationSlice.actions;
export default authorizationSlice.reducer;