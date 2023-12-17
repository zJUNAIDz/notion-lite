import Image from "next/image";
const Heroes = () => {
  return (
    <div className="h-full flex flex-col max-w-5xl items-center justify-center">
      <div className=" relative w-[400px] h-[300px] sm:w-[350px] sm:h-[200px] md:w-[500px] md:h-[400px]">
        <Image
          src="/notion-home.webp"
          fill
          alt="Document"
          className="object-contain dark:hidden"
        />
      </div>
    </div>
  );
};

export default Heroes;
