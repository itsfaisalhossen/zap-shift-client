import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../ui/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <p>Loading.........</p>;
  }

  if (role !== "admin") {
    return (
      <div>
        <Forbidden />
      </div>
    );
  }

  return children;
};
export default AdminRoute;
