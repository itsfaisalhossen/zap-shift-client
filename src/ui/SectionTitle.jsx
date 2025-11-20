import Container from "./Container";

const SectionTitle = ({ title, subTitle, className }) => {
  return (
    <Container>
      <div
        className={`w-full mx-auto text-center md:w-[570px] mb-8 md:mb-12 ${className}`}
      >
        <h3 className="text-xl md:text-3xl font-bold mb-2">{title}</h3>
        <p className="font-medium md:text-lg">{subTitle}</p>
      </div>
    </Container>
  );
};
export default SectionTitle;
