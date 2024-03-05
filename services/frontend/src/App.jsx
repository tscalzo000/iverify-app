// import "./App.css";
// import { useEffect, useState } from "react";
// import Users from "./components/Users";
// import Devices from "./components/Devices";
// import Scans from "./components/Scans";
//
//
// function App() {
//   const [scans, setScans] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [devices, setDevices] = useState([]);
//
//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/users`)
//       .then((response) => response.json())
//       .then((responseData) => {
//         setUsers(responseData);
//       });
//   }, []);
//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/devices`)
//       .then((response) => response.json())
//       .then((responseData) => {
//         setDevices(responseData);
//       });
//   }, []);
//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/scans`)
//       .then((response) => response.json())
//       .then((responseData) => {
//         setScans(responseData);
//       });
//   }, []);
//   return (
//     <div className="App">
//       <Users users={users}/>
//       <Devices devices={devices}/>
//       <Scans scans={scans}/>
//     </div>
//   );
// }
//
// export default App;

import React, { Component } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Modal from "react-modal";

import UsersList from "./components/UsersList";
import NavBar from "./components/NavBar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";

const modalStyles = {
  content: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    border: 0,
    background: "transparent",
  },
};

Modal.setAppElement(document.getElementById("root"));

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      devices: [],
      scans: [],
      title: "iVerify",
      accessToken: null,
      messageType: null,
      messageText: null,
      showModal: false,
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getDevices();
    this.getScans();
  }

  getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/users`)
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDevices = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/devices`)
      .then((res) => {
        this.setState({
          devices: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getScans = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/scans`)
      .then((res) => {
        this.setState({
          scans: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRegisterFormSubmit = (data) => {
    const url = `${process.env.REACT_APP_BACKEND_SERVICE_URL}/auth/register`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        this.createMessage("success", "You have registered successfully.");
      })
      .catch((err) => {
        console.log(err);
        this.createMessage("danger", "That user already exists.");
      });
  };

  handleLoginFormSubmit = (data) => {
    const url = `${process.env.REACT_APP_BACKEND_SERVICE_URL}/auth/login`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          accessToken: res.data.access_token,
        });
        this.getUsers();
        window.localStorage.setItem("refreshToken", res.data.refresh_token);
        this.createMessage("success", "You have logged in successfully.");
      })
      .catch((err) => {
        console.log(err);
        this.createMessage("danger", "Incorrect email and/or password.");
      });
  };

  isAuthenticated = () => {
    if (this.state.accessToken || this.validRefresh()) {
      return true;
    }
    return false;
  };

  validRefresh = () => {
    const token = window.localStorage.getItem("refreshToken");
    if (token) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/auth/refresh`, {
          refresh_token: token,
        })
        .then((res) => {
          this.setState({
            accessToken: res.data.access_token,
          });
          this.getUsers();
          window.localStorage.setItem("refresh token", res.data.refresh_token);
          return true;
        })
        .catch((err) => {
          return false;
        });
    }
    return false;
  };

  logoutUser = () => {
    window.localStorage.removeItem("refreshToken");
    this.setState({
      accessToken: null,
    });
    this.createMessage("success", "You have logged out.");
  };

  createMessage = (type, text) => {
    this.setState({
      messageType: type,
      messageText: text,
    });
    setTimeout(() => {
      this.removeMessage();
    }, 3000);
  };

  removeMessage = () => {
    this.setState({
      messageType: null,
      messageText: null,
    });
  };

  handleOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <div>
        <NavBar
          title={this.state.title}
          logoutUser={this.logoutUser}
          isAuthenticated={this.isAuthenticated}
        />
        <section className="section">
          <div className="container">
            {this.state.messageType && this.state.messageText && (
              <Message
                messageType={this.state.messageType}
                messageText={this.state.messageText}
                removeMessage={this.removeMessage}
              />
            )}
            <div className="columns">
              <div className="column is-one-half">
                <br />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <div>
                        {this.isAuthenticated() &&
                          <div>
                            <h1 className="title is-1 is-1">Users</h1>
                            <hr />
                            <br />
                            <Modal
                              isOpen={this.state.showModal}
                              style={modalStyles}
                            >
                              <div className="modal is-active">
                                <div className="modal-background" />
                                <div className="modal-card">
                                  <header className="modal-card-head">
                                    <button
                                      className="delete"
                                      aria-label="close"
                                      onClick={this.handleCloseModal}
                                    />
                                  </header>
                                </div>
                              </div>
                            </Modal>
                            <UsersList
                              users={this.state.users}
                              devices={this.state.devices}
                              scans={this.state.scans}
                              removeUser={this.removeUser}
                              isAuthenticated={this.isAuthenticated}
                            />
                          </div>
                          }
                      </div>
                    }
                  />
                  <Route
                    exact
                    path="/register"
                    element={
                      <RegisterForm
                        handleRegisterFormSubmit={this.handleRegisterFormSubmit}
                        isAuthenticated={this.isAuthenticated}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/login"
                    element={
                      <LoginForm
                        handleLoginFormSubmit={this.handleLoginFormSubmit}
                        isAuthenticated={this.isAuthenticated}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
