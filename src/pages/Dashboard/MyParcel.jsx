import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // const { data: parcels = [] } = useQuery({
  //   queryKey: ["myParcels", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
  //     return res.data;
  //   },
  // });

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2>All of my parcels : {parcels.length}</h2>
    </div>
  );
};
export default MyParcel;
