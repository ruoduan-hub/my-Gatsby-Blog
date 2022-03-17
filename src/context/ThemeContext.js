import React from 'react'

const defaultState = {
  dark: true,
  toggleDark: () => {},
}
const ThemeContext = React.createContext(defaultState)
// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)')?.matches

class ThemeProvider extends React.Component {
  state = {
    dark: true,
  }
  toggleDark = () => {
    let dark = !this.state.dark
    localStorage.setItem('dark', JSON.stringify(dark))
    this.setState({ dark })
  }
  componentDidMount() {
    console.log('当前系统是否为深色模式', supportsDarkMode())
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem('dark'))
    if (lsDark) {
      this.setState({ dark: lsDark })
    } else if (supportsDarkMode()) {
      this.setState({ dark: true })
    }
  }
  render() {
    const { children } = this.props
    const { dark } = this.state
    return (
      <ThemeContext.Provider
        value={{
          dark,
          toggleDark: this.toggleDark,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}
export default ThemeContext
export { ThemeProvider }
