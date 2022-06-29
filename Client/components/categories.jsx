import Image from "next/image";
import Human from "../assets/human.svg";
import Medicine from "../assets/medicine.svg";
import Study from "../assets/study.svg";
import Food from "../assets/food.svg";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="md:px-20 pb-0 pt-10 px-3 cat md:flex">
      <div className="grid md:grid-rows-2 grid-rows-4 grid-flow-col gap-4">
        <div className="drop-shadow-xl px-4 py-4 bg-[#f8f4e9] rounded-lg md:w-[200px] w-[100vw]">
          <Image height={70} width={70} src={Human} alt="human" />
          <h1 className="font-bold mt-3 mb-3 text-md">Human</h1>
          <p className="text-md">Help those who are in need or in trouble</p>
        </div>
        <div className="drop-shadow-xl px-4 py-4 bg-[#f8f4e9] rounded-lg md:w-[200px] w-[100vw]">
          <Image height={70} width={70} src={Medicine} alt="human" />
          <h1 className="font-bold mt-3 mb-3 text-md">Medicine</h1>
          <p className="text-md">Help them with supply of medicine</p>
        </div>
        <div className="drop-shadow-xl px-4 py-4 bg-[#f8f4e9] rounded-lg  md:w-[200px] w-[100vw]">
          <Image height={70} width={70} src={Study} alt="human" />
          <h1 className="font-bold mt-3 mb-3 text-md">Study</h1>
          <p className="text-md">Help them with supplies regarding learning</p>
        </div>
        <div className="drop-shadow-xl px-4 py-4 bg-[#f8f4e9] rounded-lg md:w-[200px] w-[100vw]">
          <Image height={90} width={90} src={Food} alt="human" />
          <h1 className="font-bold mt-3 mb-3 text-md">Food</h1>
          <p className="text-md">
            Help them with food or neccessities to survive
          </p>
        </div>
      </div>
      <div className="w-[20vw]" />
      <div className="md:w-[500px] w-[100vw] cat-text md:mt-0 mt-8">
        <p className="text-[#337EFE] font-bold text-2xl md:mb-4 mb-8">
          Categories
        </p>
        <h1 className="font-bold text-4xl md:mb-3 mb-8">
          Several donation programs that can make it easier for you{" "}
        </h1>
        <p className="text-xl">
          You can donate according to the Categories provided, this makes it
          very easy for you and us to manage the donations.
        </p>
        <div className="md:mt-4 mt-8">
          <Link href="/donate">
            <button className="bg-[#337EFE] h-12 md:mt-0 md:w-[200px] w-[250px] rounded-full text-[#fff]">
              Donate now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
