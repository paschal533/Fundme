import Link from "next/link";
import Image from "next/image";
import LeftHand from "../assets/left-hand.png";
import RightHand from "../assets/right-hand.png";
import Slack from "../assets/slack.png";

const Banner = () => {
  return (
    <div className="bg-[#f8f4e9] w-[103vw] md:w-full text-center">
      <div className="md:pt-20 md:pb-0 md:pl-20 md:pr-20 pt-10 pl-2 pr-2">
        <h1 className="md:text-6xl text-4xl font-bold mb-8 text-[#337EFE]">
          The slightest help from you, will mean a lot to us
        </h1>
        <p className="text-xl">
          Help others by using sharing platform that is safe, transparent, and
          trusted, and have 10+ years of experience
        </p>
      </div>
      <div className="flex mt-4 text-center justify-center">
        <div className="md:block hidden">
          <Image src={LeftHand} alt="left-hand" />
        </div>
        <div className="md:mb-0 mb-8">
          <Link href="/donate">
            <button className="bg-[#337EFE] h-12 md:mt-0 md:w-[200px] w-[250px] rounded-full text-[#fff]">
              Get Started
            </button>
          </Link>
        </div>
        <div className="md:block hidden">
          <Image src={RightHand} alt="right-hand" />
        </div>
      </div>
      <Image src={Slack} alt="slack" />
    </div>
  );
};

export default Banner;
