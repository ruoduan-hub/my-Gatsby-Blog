// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import React from "react"
// 注入自定义主题
import { ThemeProvider } from "./src/context/ThemeContext"
// 注入 material-ui 主题
import TopLayout from "./src/context/TopLayout"


export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <TopLayout>{element}</TopLayout>
  </ThemeProvider>
)
