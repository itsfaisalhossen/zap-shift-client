import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../ui/Container";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { MdOutlinePreview } from "react-icons/md";
import Swal from "sweetalert2";
// import { Link } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            //  refresh the data in the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel?.cost,
      parcelId: parcel?._id,
      senderEmail: parcel?.senderEmail,
      trackingId: parcel?.trackingId,
      parcelName: parcel?.parcelName,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

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
                <th>Tracking id</th>
                <th>Payment</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, idx) => (
                <tr key={parcel._id}>
                  <th>{idx + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>{parcel.trackingId}</td>
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="bg-green-50 py-2 px-2.5 text-green-600 rounded-xl">
                        {parcel.paymentStatus}
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn bg-gray-50 text-black btn-sm"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td>{parcel.deliveryStatus}</td>
                  <td>
                    <button className="btn btn-square hover:bg-green-500 hover:text-white">
                      <MdOutlinePreview size={20} />
                    </button>
                    <button className="mx-2 btn btn-square hover:bg-secondary">
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleParcelDelete(parcel?._id)}
                      className="btn btn-square hover:bg-red-500 hover:text-white"
                    >
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
