import React from 'react'
import ReactDOM from 'react-dom'
import ThemeTogglerButton from './theme-button'
import ThemeButton from './theme-button-cls'
import { ThemeContext, themes } from './theme-context'

// 一个使用 ThemedButton 的中间组件
// function Toolbar(props) {
//   return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>
// }
class App extends React.Component {
  constructor(props) {
    super(props)

    this.toggleTheme = () => {
      console.warn('[app --> toggleTheme] tirgger this:',this)
      this.setState(state => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark
      }))
    }

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      tt: themes.text,
      toggleTheme: this.toggleTheme,
      huazi:'ok'
    }
  }

  render() {
    console.warn('32----> this:',this);
    // 整个 state 都被传递进 provider
    window.app = this.state;
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    )
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton> Change Theme</ThemeTogglerButton>
      <br></br>
      <ThemeButton> own  cls Theme</ThemeButton>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
