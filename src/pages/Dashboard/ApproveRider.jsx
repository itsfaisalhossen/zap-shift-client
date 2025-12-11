import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye, FaTrashCan, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRIderStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider?.email,
    };
    axiosSecure.patch(`/riders/${rider?._id}`, updateInfo).then((res) => {
      // console.log(res.data);
      refetch();
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRIderStatus(rider, "approved");
  };

  const handleRejection = (rider) => [updateRIderStatus(rider, "rejected")];

  return (
    <div>
      <h2 className="text-5xl">Riders pending Approval: {riders.length}</h2>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>District</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, idx) => (
            <tr className="bg-base-200" key={idx}>
              <th>{idx + 1}</th>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>
                <p
                  className={`${
                    rider.status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {rider.status}
                </p>
              </td>
              <td>{rider.district}</td>
              <td className="flex gap-2">
                <button
                  // onClick={() => {
                  //   handleApproval(rider);
                  // }}
                  className="btn btn-sm"
                >
                  <FaEye size={15} />
                </button>
                <button
                  onClick={() => {
                    handleApproval(rider);
                  }}
                  className="btn btn-sm"
                >
                  <FaUserCheck size={15} />
                </button>
                <button
                  onClick={() => handleRejection(rider)}
                  className="btn btn-sm"
                >
                  <IoPersonRemoveSharp size={15} />
                </button>
                <button className="btn btn-sm">
                  <FaTrashCan size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ApproveRider;
