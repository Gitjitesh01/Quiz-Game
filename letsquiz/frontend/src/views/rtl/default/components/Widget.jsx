import Card from "../../../../component/card";

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="mr-4 flex h-[90px] w-auto flex-row items-center">
        <div className="bg-lightPrimary dark:bg-navy-700 rounded-full p-3">
          <span className="text-brand-500 flex items-center dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 mr-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
        <h4 className="text-navy-700 text-xl font-bold dark:text-white">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;
