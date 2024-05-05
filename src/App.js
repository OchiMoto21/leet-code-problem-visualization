import "./App.css";

import {Component} from "react";
import DynamicProgramming from "./components/DynamicProgramming";
import Footer from "./components/Footer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <main style={{marginTop: "3rem"}}>
          <h1>Visualization of Longest Palindrome Substring</h1>
        </main>
        <DynamicProgramming />
        <Footer />
      </div>
    );
  }
}

export default App;
