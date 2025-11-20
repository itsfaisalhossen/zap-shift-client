import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review || {};

  return (
    <div className="max-w-sm bg-white shadow-md rounded-xl p-6 space-y-4">
      <FaQuoteLeft className="text-3xl text-teal-100" />
      {/* Review Text */}
      <p className="text-gray-600 leading-relaxed">{testimonial}</p>
      {/* Dashed Divider */}
      <div className="border-t border-dashed border-gray-300 pt-4"></div>
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-teal-700 rounded-full">
          <img src={user_photoURL} alt="" />
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">{userName}</h4>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
