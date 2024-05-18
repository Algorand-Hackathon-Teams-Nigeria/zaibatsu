import Lendheader from "@/components/molecules/m-lend/m-lend-header";
const LendPage = () => {
  return (
    <div id="lend page" className="flex flex-col w-full  ml-[30px]  pr-[47px]">
      <Lendheader />
      <div className={`mt-[62px]`}>
        {/*table section */}

        <LoanForm />
      </div>
    </div>
  );
};

export default LendPage;

const LoanForm = () => {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Left column - Loan Form */}
      <div className="flex flex-col  items-start flex-grow p-6">
        <div className="mb-6 w-full">
          <label className="font-Aeonik font-regular text-[16px] leading-[160%]  text-white">Asset to lend</label>
          <select className="w-full h-12 rounded-lg mt-2 bg-secondaryPool-foreground"></select>
        </div>
        <div className="mb-6 w-full">
          <label className="font-Aeonik font-regular text-[16px] leading-[160%] mt-6 text-white">Lend capacity</label>
          <input type="text" className="w-full h-12 border border-white rounded-lg mt-2 bg-secondaryPool-foreground" />
        </div>
        <div className="mb-6 w-full">
          <label className="font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white">Select Pool</label>
          <select className="w-full h-12 rounded-lg bg-secondaryPool-foreground mt-4 mb-[86px]"></select>
        </div>
        <button className="w-full h-12 bg-primary text-white rounded-lg ">Lend Loan</button>
      </div>
      {/* Right column - Message */}
      <div className="flex flex-col w-full lg:w-[38.94%] h-full  ">
        <label className="font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white">Pending Loan</label>
        <div className="flex flex-col justify-center items-center w-full  bg-[#0b300c] rounded-lg h-full mb-[39px] mt-2">
          <div className="font-Aeonik font-regular text-16 leading-[160%] text-grey-5  ">You are yet to lend.</div>
        </div>
      </div>
    </div>
  );
};
