import { red } from "@material-ui/core/colors"
import { createTheme } from "@material-ui/core/styles"

const config = {
  palette: {
    type: "light", // dark
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
}

// material-ui 主题配置

const theme = createTheme(config)

const themeDark = createTheme({
  ...config,
  palette: {
    type: 'dark'
  }
})

export { theme, themeDark }
