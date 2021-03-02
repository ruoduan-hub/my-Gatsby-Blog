// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import React from "react"

import { ThemeProvider } from "./src/context/ThemeContext"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)