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

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      
      <button 
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Dashboard
      </button>

      {/* HEADER */}
      <div className="user-header">
        <div className="avatar">👤</div>
        <div>
          <h2>{user.name}</h2>
          <div className="username">@{user.username}</div>
        </div>
      </div>

      <div className="grid">

        {/* CONTACT */}
        <div className="card">
          <h3>Contact Information</h3>

          <div className="info-row">
            <div className="label">Email</div>
            <div className="value">{user.email}</div>
          </div>

          <div className="info-row">
            <div className="label">Phone</div>
            <div className="value">{user.phone}</div>
          </div>

          <div className="info-row">
            <div className="label">Website</div>
            <div className="value">
              <a href={`https://${user.website}`} target="_blank">
                {user.website}
              </a>
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="card">
          <h3>Address</h3>

          <div className="value">
            {user.address.street}<br/>
            {user.address.suite}<br/>
            {user.address.city}, {user.address.zipcode}
          </div>

          <br/>

          <div className="label">Coordinates</div>
          <div className="value">
            Lat: {user.address.geo.lat}, 
            Lng: {user.address.geo.lng}
          </div>
        </div>

      </div>

      {/* COMPANY */}
      <div className="card company-card">
        <h3>Company Information</h3>

        <h4>{user.company.name}</h4>

        <p>"{user.company.catchPhrase}"</p>

        <div className="card">
          <div className="label">Business</div>
          <div className="value">{user.company.bs}</div>
        </div>

      </div>

    </div>
  );
};

export default UserDetail;