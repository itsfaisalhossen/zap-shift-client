import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../ui/Container";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { MdOutlinePreview } from "react-icons/md";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <Container>
        <h2>All of my parcels : {parcels.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Cost</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, idx) => (
                <tr key={parcel._id}>
                  <th>{idx + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>Blue</td>
                  <td>
                    <button className="btn btn-square hover:bg-green-500 hover:text-white">
                      <MdOutlinePreview size={20} />
                    </button>
                    <button className="mx-2 btn btn-square hover:bg-secondary">
                      <FiEdit size={18} />
                    </button>
                    <button className="btn btn-square hover:bg-red-500 hover:text-white">
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};
export default MyParcel;
