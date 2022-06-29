import React, { useContext } from "react";
import { Context } from "../context/contextProvider";
import FundraiserCard from "./fundraiserCard";
import Loader from "./Loader";

const CardContainer = ({ top }) => {
  const { funds, loading } = useContext(Context);

  const ClassStyle = `${
    top ? "mt-0" : "mt-8"
  } flex bg-[#F5F5F5] w-[103vw] md:w-full md:px-10 px-0 min-h-[30vh] py-2`;

  return (
    <div className={ClassStyle}>
      <div className="w-full md:p-4 p-2">
        <h1 className="font-bold text-3xl w-[300px]">
          Some urgent donation programs
        </h1>
        <div className="Apps md:p-1 md:ml-0 p-2 Apps items-center justify-center">
          {!loading ? (
            funds?.slice(0, 4).map((fundraiser) => {
              return (
                <FundraiserCard fundraiser={fundraiser} key={fundraiser} />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
