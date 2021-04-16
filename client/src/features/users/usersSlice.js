import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiAxios from '../../config/axiosConfig'

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
        const response = await apiAxios.get('/users/self')
        return response.data
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: {},
        currentUserStatus: 'idle',
        isLoggedIn: false
    },
    reducers: {
        isLoggedInUpdated(state, action) {
            state.isLoggedIn = action.payload
        },
        //Clear user info when logging out
        currentUserUpdated(state, action) {
            state.currentUser = action.payload
        },
        //Used to reset user status on logout
        currentUserStatusUpdated(state, action) {
            state.currentUserStatus = action.payload
        }     
    },
    extraReducers: {
        //Reducers for fetching user
        [fetchCurrentUser.pending]: (state, action) => {
            state.currentUserStatus = 'loading'
          },
          [fetchCurrentUser.fulfilled]: (state, action) => {
            state.currentUserStatus = 'succeeded'
            state.currentUser = action.payload
          },
          [fetchCurrentUser.rejected]: (state, action) => {
            state.currentUserStatus = 'failed'
          },
    }
})

export const    {   isLoggedInUpdated,
                    currentUserUpdated,
                    currentUserStatusUpdated
                } = usersSlice.actions
export const selectCurrentUserStatus = state => state.users.currentUserStatus
export const selectCurrentUser = state => state.users.currentUser
export const selectIsLoggedIn = state => state.users.isLoggedIn
export default usersSlice.reducer