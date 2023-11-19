import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const hasRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    // To run only once on the second time (because of react strict mode)
    if (hasRun.current) {
      const getUsers = async () => {
        try {
          const res = await axiosPrivate.get("/users", {
            signal: controller.signal,
          });

          isMounted && setUsers(res.data);
        } catch (err) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      };

      getUsers();
    }

    return () => {
      isMounted = false;
      hasRun.current = true;
      controller.abort();
    };
  }, []);

  return (
    <section className="users">
      <div>
        <h2>Users List</h2>
        {users?.length ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user?.name}</li>
            ))}
          </ul>
        ) : (
          <p>No users to show</p>
        )}
      </div>

      <Link to={"/home"}>Home</Link>
    </section>
  );
};

export default Users;
