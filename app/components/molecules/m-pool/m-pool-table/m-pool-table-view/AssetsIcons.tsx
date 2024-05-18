const AssetsIcons = ({ assets }: { assets: any[] }) => {
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {assets.map((item: any, index: number) => (
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 transition-transform duration-300 hover:-translate-x-3"
          src={item.icon}
          alt={item.name}
        />
      ))}{" "}
      <a
        className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
        href="#"
      >
        +99
      </a>
    </div>
  );
};

export default AssetsIcons;
