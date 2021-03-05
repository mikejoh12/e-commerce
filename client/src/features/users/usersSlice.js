import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios')

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
    try {
        const response = await axios.get('/api/users/self')
        return response.data
    } catch (error) {
        console.log(error)
    }
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
                    currentUserUpdated } = usersSlice.actions
export const selectCurrentUser = state => state.users.currentUser
export const selectIsLoggedIn = state => state.users.isLoggedIn
export default usersSlice.reducer