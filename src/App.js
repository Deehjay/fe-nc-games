import { Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Nav from "./components/Nav";
import PostReview from "./components/PostReview";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import User from "./components/User";
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
        <Route path="/post-review" element={<PostReview />} />
        <Route path="/my-profile" element={<User />} />
        <Route path="*" element={<ErrorPage message={"404 Not Found"} />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
