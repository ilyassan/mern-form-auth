import { Link } from "react-router-dom";

const Repo = () => {
  return (
    <section className="repo">
      <div>
        <h1>Github Repo</h1>
        <a
          href="https://github.com/ilyassan/mern-form-auth"
          rel="noreferrer"
          target="_blank"
        >
          See
        </a>
      </div>
      <Link to={"/home"}>Home</Link>
    </section>
  );
};

export default Repo;
