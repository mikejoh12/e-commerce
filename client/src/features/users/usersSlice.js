import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: {
            id: 6,
            email: 'mikejoh12@gmail.com',
            first_name: 'Mike',
            last_name: 'Johansson',
            address1: '7726 La Sobrina Dr',
            address2: '',
            postcode: '75248',
            city: 'Dallas',
            country: 'USA',
            cart_id: 7
        },
        isLoggedIn: false
    },
    reducers: {
        isLoggedInUpdated(state, action) {
            state.isLoggedIn = action.payload
        }
    }
})

export const { isLoggedInUpdated } = usersSlice.actions
export const selectcurrentUser = state => state.users.currentUser
export const selectIsLoggedIn = state => state.users.isLoggedIn
export default usersSlice.reducer