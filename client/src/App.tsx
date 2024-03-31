import { Provider } from "react-redux";
import "./App.css";
import store from "./app/store/store";
import Home from "./pages/Home";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      localStorage.setItem(
        "token",
        (Date.now() + Math.round(Math.random() * 10000))
          .toString(36)
          .substring(10)
      );
    }
  }, []);
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
