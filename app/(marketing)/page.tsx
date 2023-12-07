import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";

const TestPage = () => {
  return (
    <div className="min-h-full flex flex-col ">
      <div
        className="flex flex-col items-center justify-center md:justify-start md:gap-y-8 flex-1 px-1 pb-10 text-center"
      >
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
