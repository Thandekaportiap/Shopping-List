
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    accessGranted: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

    verfiyUser: (state) => {
    
        if(state.accessGranted === true){
            alert("access granted")
        }else {
            alert("access denied")
        }
      },
      decrement: (state) => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      },
    },
  })
  


export const {verfiyUser  } = loginSlice.actions

export default loginSlice.reducer