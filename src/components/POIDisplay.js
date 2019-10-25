import React, { Component } from "react";
import POI from "./POI";
class POIDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const POIDisplayList = this.props.markers
      .filter(poi => poi.content.poi.group == this.props.group)
      .map(poi => <POI content={poi.content.poi} fromDisplay={"hey"} />);
    return (
      <div> {this.props.markers == 0 ? "Click Get POIs" : POIDisplayList} </div>
    );
  }
}

export default POIDisplay;
