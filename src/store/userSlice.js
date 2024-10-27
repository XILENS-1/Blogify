const { createSlice } = require("@reduxjs/toolkit");

const store = configureStore({

    name: "user",
    initialState: {
        user: null,

    },
    reducers: {
        addUser: (state, action) => {
            const { id, name, token } = action.playload
            state.user = (id, name, token)
            localStorage.setItem("auth-user", JSON.stringify(state.user))
        },
        removeUser: (state, action) => {
            state.user = null
            localStorage.removeItem("auth-user")
        },

    }

})

export const { addUser, removeUser } = userSlice.actions
export const userReducer = userSlice.reducers