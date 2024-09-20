import {createSlice} from '@reduxjs/toolkit'


const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuthenticated: false,
        user:null
    },
    reducers:{
        login(state,action){
            state.isAuthenticated = true,
            state.user = action.payload.username
            console.log(state.user)
        },
        logout(state) {
            return {
              isAuthenticated: false,
              user: null,
            };
          }
    }
})

export const { login,logout } = authSlice.actions;
export default authSlice.reducer;