"use client"
import React from 'react'
import {Provider} from "react-redux"
import store from "@/app/Redux/Store"

const CustomProvider =  ({Children}) => {
  return (
    <Provider store={store}>
        {Children}
    </Provider>
  )
}

export default CustomProvider