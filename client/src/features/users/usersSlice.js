import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
        }
    }
})

export default usersSlice.reducer