import React from 'react'

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    text:'light btn'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    text:'dark'
  }
}

export const ThemeContext = React.createContext(
  themes.dark // 默认值
)

//   // 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
// export const ThemeContext = React.createContext({
//   theme: themes.dark,
//   toggleTheme: () => {},
// });
window.ThemeContext = ThemeContext
