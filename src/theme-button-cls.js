import React from 'react';
import { ThemeContext } from './theme-context';


// function ThemeTogglerButton() {
//   // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
//   return (
//     // <ThemeContext.Consumer>
//       {({ theme, toggleTheme }) => {
//         console.warn('theme, toggleTheme :',theme, toggleTheme )
//         return (
//           <button
//             onClick={toggleTheme}
//             style={{ backgroundColor: theme.background }}
//           >
//             Toggle Theme
//           </button>
//         )
//       }}
//     // </ThemeContext.Consumer>
//   )
// }

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    window.bb = theme;

    console.warn('[ThemedButton] this:',this,' theme:',theme)
    return (
      <button
        {...props}
        onClick={theme.toggleTheme}

        style={{backgroundColor: theme.theme.background}}
      >
        {theme.theme.text}
    </button>
    );
  }
}
//必须要的
ThemedButton.contextType = ThemeContext;

export default ThemedButton;

// export default ThemeTogglerButton
