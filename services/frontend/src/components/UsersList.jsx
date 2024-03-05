import React from "react";
import PropTypes from "prop-types";
import Users from "./Users";
import Devices from "./Devices";
import Scans from "./Scans";

const UsersList = (props) => {
  return (
    <div>
      <Users users={props.users}/>
      <Devices devices={props.devices}/>
      <Scans scans={props.scans}/>
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UsersList;
