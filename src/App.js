import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme } from "./shared/theme";
import reset from "./shared/reset.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { carrotLoginStatus, getCarrotUserInfo } from "./redux/modules/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) { // 토큰이 있는지 체크
      dispatch(carrotLoginStatus(true));
      dispatch(getCarrotUserInfo());
    } else {
      dispatch(carrotLoginStatus(false));
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
${reset}; // Reset CSS

body, button, input, textarea {
  color: #444444;
  font-family: ${(props) => props.theme.fontFamily.default}, sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}
`;

export default App;
