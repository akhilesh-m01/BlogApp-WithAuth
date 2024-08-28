import "./App.css";
import { BrowserRouter as Router,Routes,Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Quotes from "./components/Quotes";
import MyForm from "./components/MyForm";
import Navbar from "./components/Navbar";
import store from './store/store';
import {Provider} from 'react-redux'
import Footer from "./components/Footer";

function App() {

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Navbar/>

          {/* routes */}
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/quotes" element={<Quotes/>}/>
            <Route path="/myquotes" element={<MyForm/>}/>
          </Routes>
        </Router>

        <Footer/>
      </div>
    </Provider>
  );
}

export default App;
