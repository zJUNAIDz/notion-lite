import Image from "next/image";
const Heroes = () => {
  return (
    <div className="flex flex-col max-w-5xl items-center justify-center">
      <div className="flex items-center space-x-10 mt-4">
        <div className=" relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px md:w-[400px] md:h-[400px]">
          <Image
            src="/documents.png"
            fill
            alt="Document"
            className="object=contain"
          />
        </div>
        <div className=" relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/reading.png"
            alt="Reading"
            fill
            className=" object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
