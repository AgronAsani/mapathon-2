import React, { Component } from "react";
import POI from "./POI";
import POICard from "./POICard";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";
import CardExample from "./POICard";

class POIDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const POIDisplayList = this.props.markers.map(poi => (
      <POICard content={poi.content.poi} />
    ));
    return (
      <div> {this.props.markers == 0 ? "Click Get POIs" : POIDisplayList} </div>
    );
  }
}

export default POIDisplay;
