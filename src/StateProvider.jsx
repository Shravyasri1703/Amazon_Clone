import React, { createContext, useContext, useReducer } from 'react'


//making the data layer
export const StateContext = createContext()


// wrapping our app and providing tha data layer to every component of our app
export const StateProvider = ({ Reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(Reducer, initialState)}>
        {children}
    </StateContext.Provider>
)


//pull info from datalayer
export const useStateValue = () => useContext(StateContext)
 