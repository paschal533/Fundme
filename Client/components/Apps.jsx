import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Phone from "../assets/phone.png";

const Apps = () => {
  return (
    <div className="md:bg-white app-container md:w-full bg-[#337EFE]">
      <div className="bg-[#337EFE]  w-[103.5vw] md:w-[100vw]">
        <div className=" Apps text-center justify-center mt-10 ml-0 mr-0 md:mt-20 md:ml-20 md:mr-20 mb-0 text-white">
          <div className="md:mt-8 mt-8">
            <div className="text-lg font-semibold mb-4">Apps</div>
            <h1 className="font-bold md:text-6xl xs:text-5xl mb-8">
              Donating is easier just by using a smartphone
            </h1>
            <p className="mb-4 text-lg">
              Donating can be done anywhere, anytime and very easily just by
              using a smartphone, download now for free
            </p>
            <Button className="text-[#337EFE] pb-2">Download Now</Button>
          </div>
          <div className="md:mt-[-60px] phone md:mb-[-6px] mt-8">
            <Image src={Phone} alt="phone" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
