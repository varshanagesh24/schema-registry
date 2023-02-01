import { createSlice } from '@reduxjs/toolkit';

export const registrySlice = createSlice({
	name: 'Registry',
	initialState: {
		user: null,
		schemas: [],
		currentSchema: null
	},
	reducers: {
		setUser: (state, action) => {
			return { ...state, user: action.payload };
		},
		setSchemas: (state, action) => {
			return { ...state, schemas: action.payload };
		},
		setCurrentSchema: (state, action) => {
			return { ...state, currentSchema: action.payload };
		}
	}
});

export const { setUser, setSchemas, setCurrentSchema } = registrySlice.actions;

export default registrySlice.reducer;
