import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import Users from "./components/Users";
import { UserContext } from "./contexts/users";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Reviews />} />
        <Route path="/reviews/:review_id" element={<SingleReview />} />
        <Route path="/login" element={<Users />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
