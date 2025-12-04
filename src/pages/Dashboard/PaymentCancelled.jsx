import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2 className="text-4xl">Payment is cancelled. please try again</h2>
      <Link to={"/dashboard/my-parcels"}>
        <button className="btn btn-primary">Try Again</button>
      </Link>
    </div>
  );
};
export default PaymentCancelled;
