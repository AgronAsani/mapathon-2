import React, { Component } from "react";
import POI from "./POI";
class POIDisplay extends Component {
  state = {};
  render() {
    const POIDisplayList = this.props.markers.map(poi => (
      <POI content={poi.content.poi} />
    ));
    return (
      <div> {this.props.markers == 0 ? "Click Get POIs" : POIDisplayList} </div>
    );
  }
}

export default POIDisplay;
