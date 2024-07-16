import "./App.css";
import Navbar from "./components/Navbar";
import Line from "./components/Line";
import Main from "./routes/Main";
import Category from "./components/Category";

function App() {
  return (
    <div className="App">
      {/* <Advert /> */}
      <Navbar />
      <Category />
      <Line />
      <Main />
    </div>
  );
}

export default App;
