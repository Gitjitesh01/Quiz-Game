import Banner from "./component/Banner";
import General from "./component/General";
import Notification from "./component/Notification";
import Project from "./component/Project";
import Storage from "./component/Storage";
import Upload from "./component/Upload";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div>
      </div>
      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="3xl:col-span-4 col-span-5 lg:col-span-6 lg:mb-0">
          <Project />
        </div>
        <div className="3xl:col-span-5 col-span-5 lg:col-span-6 lg:mb-0">
          <General />
        </div>

        <div className="3xl:!col-span-3 col-span-5 lg:col-span-12 lg:mb-0">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
