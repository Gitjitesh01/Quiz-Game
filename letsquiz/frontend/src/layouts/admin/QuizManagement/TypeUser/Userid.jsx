// UserDetailsPage.js
import React from "react";
import swal from "sweetalert";

("react");
import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
  const { userId } = useParams(); // This hooks allows you to access the URL parameters

  // Fetch user details using userId or perform other actions

  return (
    <div>
      <h2>User Details Page</h2>
      <p>User ID: {userId}</p>
      {/* Display user details */}
    </div>
  );
};

export default UserDetailsPage;
