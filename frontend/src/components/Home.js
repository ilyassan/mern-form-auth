import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    navigate("/");
  };

  return (
    <section className="home">
      <div>
        <h1>Home</h1>
        <p>You are logged in!</p>

        <Link to={"/"}>Go to the links page</Link>
        <Link to={"/users"}>See all the users</Link>
        <Link to={"/repo"}>Go to the github repo page</Link>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default Home;
