import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";

const TestPage = () => {
  return (
    <div className="h-full flex flex-col mt-28">
      <div
        className="h-full flex flex-col items-center justify-center md:justify-start md:gap-y-5 flex-1 text-center"
      >
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
