import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Home />
      </BrowserRouter>      
    </div>
  );
}

export default App;
