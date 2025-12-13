import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../ui/Container";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState({});

  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "avaiable"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=avaiable`
      );
      return res.data;
    },
  });

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider?._id,
      riderEmail: rider?.email,
      riderName: rider?.name,
      parcelId: selectedParcel?._id,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel?._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Rider has been assigned.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <div>
      <Container>
        <h2 className="text-4xl">Assign Riders {parcels?.length}</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Cost</th>
                <th>Created At</th>
                <th>Pickup District</th>
                <th>Actions</th>
                {/* <th>Delivery Status</th> */}
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, idx) => (
                <tr key={parcel._id}>
                  <th>{idx + 1}</th>
                  <td>{parcel?.parcelName}</td>
                  <td>{parcel?.cost}</td>
                  <td>{parcel?.createdAt}</td>
                  <td>{parcel?.senderDistrict}</td>
                  <td>
                    <button
                      onClick={() => openAssignRiderModal(parcel)}
                      className="btn btn-sm bg-green-300"
                    >
                      Find Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dialog
          ref={riderModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Riders: {riders.length}</h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <tbody>
                  {riders.map((rider, idx) => (
                    <tr key={rider?._id}>
                      <th>{idx + 1}</th>
                      <td>{rider?.name}</td>
                      <td>{rider?.email}</td>
                      <td>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-sm text-red-400"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm ">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </Container>
    </div>
  );
};
export default AssignRiders;
