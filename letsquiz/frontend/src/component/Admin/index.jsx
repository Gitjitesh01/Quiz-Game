import React from "react";
import swal from "sweetalert";

("react");
import StatsCard from "./StatsCard";

function Dashboard() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
      <StatsCard
        bg="white"
        img="https://th.bing.com/th/id/R.9e95a61416388e16ece5184066a79735?rik=0ndYT6oLW94Nrw&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fcustom-icon-design%2fpretty-office-13%2f512%2fUsers-icon.png&ehk=BQm5j79QG0CdBJCRO63zq7587GPHDgdN36kxLnSmsx4%3d&risl=&pid=ImgRaw&r=0"
        title="Total Users"
        number={1200}
      />
      <StatsCard
        bg="white"
        img="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png"
        title="Students"
        number={1200}
      />
      <StatsCard
        bg="white"
        img="https://th.bing.com/th/id/R.9e95a61416388e16ece5184066a79735?rik=0ndYT6oLW94Nrw&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fcustom-icon-design%2fpretty-office-13%2f512%2fUsers-icon.png&ehk=BQm5j79QG0CdBJCRO63zq7587GPHDgdN36kxLnSmsx4%3d&risl=&pid=ImgRaw&r=0"
        title="Teachers"
        number={1200}
      />
      <StatsCard
        bg="white"
        img="https://th.bing.com/th/id/R.99508d52b1c6bc83477355c4490af4e7?rik=gjlGVt7bjrgnmg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_35690.png&ehk=4z4P9ViChFZA1MHKLM5qti5BxG19RKTEfU7raKRNhU0%3d&risl=&pid=ImgRaw&r=0"
        title="Quizes"
        number={1200}
      />
      <StatsCard
        bg="white"
        img="https://th.bing.com/th/id/R.99508d52b1c6bc83477355c4490af4e7?rik=gjlGVt7bjrgnmg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_35690.png&ehk=4z4P9ViChFZA1MHKLM5qti5BxG19RKTEfU7raKRNhU0%3d&risl=&pid=ImgRaw&r=0"
        title="Reports Generated"
        number={1200}
      />
      <StatsCard
        bg="white"
        img="https://th.bing.com/th/id/R.67c7c9ab729f2b84a671959ff6059181?rik=viorhJUaMXDXLg&riu=http%3a%2f%2fsanfrancisconotarynow.com%2fwp-content%2fuploads%2f2016%2f04%2fSF-notary-logo.png&ehk=EFEM%2bLzx8I2Nb3Q3w18IccQuJeE4tTI41%2fPzwmtDXj4%3d&risl=&pid=ImgRaw&r=0"
        title="Quizes Attended in Total"
        number={1200}
      />
      <StatsCard
        bg="white"
        img="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png"
        title="Teachers"
        number={1200}
      />
      <div></div>

      <StatsCard bg="green-500" title="Total No. of Quizes" number={1200} />
      <StatsCard bg="blue-400" title="Total No. of Questions" number={1200} />
      <StatsCard bg="gray-300" title="Total Revenue" number={1200} />
      <StatsCard bg="amber-500" title="Revenue Current Month" number={1200} />
    </div>
  );
}

export default Dashboard;
