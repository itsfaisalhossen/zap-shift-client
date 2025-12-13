import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  console.log(parcel);

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel?.cost,
      parcelId: parcel?._id,
      senderEmail: parcel?.senderEmail,
      senderName: parcel?.senderName,
      // trackingId: parcel?.trackingId,
      parcelName: parcel?.parcelName,
    };

    console.log(paymentInfo);
  };

  if (isLoading) {
    <p>Loading......</p>;
  }

  return (
    <div>
      <h2>
        Please Pay : ${parcel?.cost} for : {parcel?.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-white">
        Pay
      </button>
    </div>
  );
};
export default Payment;
