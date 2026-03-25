import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers().then((data) => {
      const found = data.find((u) => u.id === parseInt(id));
      setUser(found);
    });
  }, [id]);

  if (!user) return <h2>Loading user...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      
      <button 
        onClick={() => navigate("/")}
        style={{
          padding: "8px 12px",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        ← Back to Dashboard
      </button>

      <h2>{user.name}</h2>

      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p>
        <b>Website:</b>{" "}
        <a href={`https://${user.website}`} target="_blank">
          {user.website}
        </a>
      </p>

      <h3>Address</h3>
      <p><b>Street:</b> {user.address.street}</p>
      <p><b>Suite:</b> {user.address.suite}</p>
      <p><b>City:</b> {user.address.city}</p>
      <p><b>Zipcode:</b> {user.address.zipcode}</p>

      <h4>Geo Location</h4>
      <p><b>Lat:</b> {user.address.geo.lat}</p>
      <p><b>Lng:</b> {user.address.geo.lng}</p>

      <h3>Company</h3>
      <p><b>Name:</b> {user.company.name}</p>
      <p><b>Catch Phrase:</b> {user.company.catchPhrase}</p>
      <p><b>BS:</b> {user.company.bs}</p>

    </div>
  );
};

export default UserDetail;