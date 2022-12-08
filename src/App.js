import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Reviews />} />
        <Route path="/categories/:category_slug" element={<Reviews />} />
        <Route path="/reviews/:review_id" element={<SingleReview />} />
        <Route path="/login" element={<Users />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
