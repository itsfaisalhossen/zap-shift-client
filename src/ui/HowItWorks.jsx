import img1 from "../assets/bookingIcon.png";

const HowItWorks = () => {
  const data = [
    {
      img: img1,
      title: "Booking Pick & Drop",
      note: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: img1,
      title: "Cash On Delivery",
      note: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: img1,
      title: "Delivery Hub",
      note: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: img1,
      title: "Booking SME & Corporate",
      note: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="m-12 md:my-18">
      <h3 className="font-bold text-xl md:text-4xl">How It Works</h3>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {data.map((d, idx) => (
          <div
            className="w-full flex flex-col justify-between bg-gray-100 p-5 rounded-xl "
            key={idx}
          >
            <div>
              <img className="mb-5" src={img1} alt="" />
              <h3 className="text-xl font-bold">{d.title}</h3>
            </div>
            <p>{d.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HowItWorks;
