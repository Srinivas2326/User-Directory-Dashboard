import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;

      let valueA =
        sortField === "company" ? a.company.name : a[sortField];

      let valueB =
        sortField === "company" ? b.company.name : b[sortField];

      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

  return (
    <div>
      <h1>User Directory</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <SortControls
        setSortField={setSortField}
        setOrder={setOrder}
      />

      <UserTable users={filteredUsers} />
    </div>
  );
};

export default Dashboard;