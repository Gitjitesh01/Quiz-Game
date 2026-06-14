import React, { useState } from "react";
import swal from "sweetalert";

import FlashMessage from "react-flash-message";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import StandardUsers from "./UsersData/StandardUsers";
import FreeUsers from "./UsersData/FreeUsers";
import PremiumUsers from "./UsersData/PremiumUsers";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserManag() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Placeholder component for your user data

  // const PremiumUsers = () => <div>Premium Users Data...</div>;
  // const StandardUsers = () => <div>Standard Users Data...</div>;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Free Users" {...a11yProps(0)} />
          <Tab label="Premium Users" {...a11yProps(1)} />
          <Tab label="Standard Users" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FreeUsers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PremiumUsers />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StandardUsers />
      </TabPanel>
    </Box>
  );
}

// <div className='mt-3'>
//   <div className='flex flex-row'>
//     <div className='bg-orange w-[full] h-[50px] text-2xl rounded-xl'>
//       Free Users
//     </div>

//     <div className='bg-white w-[full] h-[50px]  text-2xl ml-16 rounded-2xl'>
//       Free Users
//     </div>

//     <div className='bg-white w-[full]  text-2xl  ml-32 h-[50px]'>
//       Free Users
//     </div>
//   </div>
// </div>
