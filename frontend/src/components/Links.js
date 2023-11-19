import { Link } from "react-router-dom";

const Links = () => {
  return (
    <section>
      <div className="links">
        <div>
          <h1>Links</h1>
        </div>

        <div className="public-links">
          <h1>Public</h1>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </div>

        <div className="private-links">
          <h1>Private</h1>
          <Link to={"/home"}>Home</Link>
          <Link to={"/users"}>All Users</Link>
          <Link to={"/repo"}>Github Repo</Link>
        </div>
      </div>
    </section>
  );
};

export default Links;
