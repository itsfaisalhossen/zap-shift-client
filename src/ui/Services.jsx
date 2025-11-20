import servicesImg from "../assets/service.png";
import SectionTitle from "./SectionTitle";

const Services = () => {
  const data = [
    {
      img: servicesImg,
      title: "Express  & Standard Delivery",
      note: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      img: servicesImg,
      title: "Nationwide Delivery",
      note: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 4872 hours.",
    },
    {
      img: servicesImg,
      title: "Fulfillment Solution",
      note: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      img: servicesImg,
      title: "Cash on Home Delivery",
      note: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      img: servicesImg,
      title: "Corporate Service / Contract In Logistics",
      note: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      img: servicesImg,
      title: "Parcel Return",
      note: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <div
      className="py-8 md:px-12 md:py-18 rounded-2xl px-8
     bg-[#03373D]"
    >
      <SectionTitle
        className="mb-20 text-white"
        title="Our Services"
        subTitle="Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`border ${
              index == 1 ? "bg-[#CAEB66]" : "bg-white"
            } border-gray-100 rounded-xl flex flex-col justify-between  p-5 shadow-sm hover:shadow-md transition`}
          >
            <div>
              <img
                src={item.img}
                alt={item.title}
                className="w-14 mx-auto mb-4"
              />

              <h3 className="text-xl md:text-2xl font-semibold text-center mb-2">
                {item.title}
              </h3>
            </div>

            <p className=" text-gray-600 text-center">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Services;
