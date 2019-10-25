import React, { Component } from "react";
import {
  IoMdLocate,
  IoMdDownload,
  IoIosLogOut,
  IoIosLogIn
} from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { Button, Row } from "react-bootstrap";
class UserGuide extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2 className="text-center">Quick Guide </h2>

        <br />
        <div as={Row}>
          <Button variant="success" className="mr-3">
            <div style={{ color: "white" }}>
              <IoIosLogIn size={24} />
            </div>
          </Button>
          Login to add/sort POIs.
        </div>
        <br />
        <br />
        <div as={Row}>
          <Button variant="primary" className="mr-3">
            <div style={{ color: "white" }}>
              <IoMdLocate size={24} />
            </div>
          </Button>
          Display current location/Recenter
        </div>
        <br />
        <br />
        <div as={Row}>
          <Button variant="warning" className="mr-3">
            <IoMdDownload size={24} />
          </Button>
          Retrieve/Refresh & Display POIs
        </div>
        <br />
        <br />
        <div as={Row}>
          <Button variant="danger" className="mr-3">
            <div style={{ color: "white" }}>
              <IoIosLogOut size={24} />
            </div>
          </Button>
          Logout.
        </div>
        <br />
        <br />
        <div as={Row}>
          <Button variant="outline-light" className="mr-3">
            <MdFilterList size={24} style={{ color: "green" }} />
          </Button>
          Filter POIs
        </div>
        <br />
        <div as={Row}>
          * Can only delete your own POIs. Filter for your POIs to delete them.
          Redirects to list of all POIs.
        </div>
        <br />
        <br />
        <div as={Row}>
          <Button variant="primary">Add location</Button>
        </div>
        <br />

        <div as={Row}>
          * To add a POI, click on the map, then on the marker.
        </div>
      </div>
    );
  }
}

export default UserGuide;
