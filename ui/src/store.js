import { configureStore } from '@reduxjs/toolkit';
import registryReducer from './registrySlice';

export default configureStore({
	reducer: {
		registry: registryReducer
	}
});
