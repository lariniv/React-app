import { Provider } from "react-redux";
import "./App.css";
import store from "./processes/store/store";
import { Home } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
