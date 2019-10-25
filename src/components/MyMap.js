import React, { Component, createRef, Fragment, useState } from "react";
import MENU_MODES from "../MenuModes";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "react-bootstrap";
import MenuSlide from "./MenuSlide";
import Control from "@skyeer/react-leaflet-custom-control";
import { IoMdLocate } from "react-icons/io";
import { latLngBounds } from "leaflet";
import POI from "./POI";
type Position = [number, number];
type Props = {|
  content: string,
  position: Position
|};

const DEFAULT_VIEWPORT = {
  center: [46.310473, 7.6397229],
  zoom: 13
};

type MarkerData = {| ...Props, key: string |};

//what we must have to have a marker
const MyPopupMarker = ({ content, position }: Props) => (
  <Marker position={position}>
    <Popup>
      <POI content={content.poi} />
    </Popup>
  </Marker>
);
//all the pin of the bdd (make a loop).
const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers
    ? markers.map(({ key, ...props }) => <MyPopupMarker key={key} {...props} />)
    : null;
  return <Fragment>{items}</Fragment>;
};

type State = {
  markers: Array<MarkerData>
};

export default class MyMap extends Component<{}, State> {
  state = {
    hasLocation: false,
    currentLocation: null,
    currentPointer: null,
    myLocation: null,
    center: DEFAULT_VIEWPORT,
    zoom: 13,
    locationToAdd: null
  };

  mapRef = createRef();
  handleMenuChange = isOpen => {
    this.props.handleMenuChange(isOpen);
  };
  // clicking on any point in map
  handleClick = e => {
    if (this.props.isAuthenticated) {
      this.setState(prevState => ({
        currentPointer: e.latlng
      }));
    }
  };
  handleSelfLocate = () => {
    const map = this.mapRef.current;
    if (map != null) {
      if (this.state.myLocation != null) {
        this.setState({
          center: { center: this.state.myLocation, zoom: 18 }
        });
      } else {
        const map = this.mapRef.current;
        if (map != null) {
          map.leafletElement.locate();
        }
      }
    }
  };
  handleLocationFound = (e: Object) => {
    let myVP = {};
    this.setState({
      hasLocation: true,
      myLocation: e.latlng,
      currentLocation: e.latlng,
      center: {
        center: e.latlng,
        zoom: 18
      }
    });
  };
  //Fires when moving map around
  onViewportChanged = (viewport: Viewport) => {
    this.setState({ center: viewport });
  };

  handleAddLocation = () => {
    this.setState(
      prevState => ({ locationToAdd: this.state.currentPointer }),
      () => this.props.handleChangeMode(MENU_MODES.ADD_POI)
    );
    this.props.handleMenu();
  };
  //pass newPOI to App.js and unmount current marker
  handleForm = newPOI => {
    this.props.handleForm(newPOI);
    this.setState(prevState => ({ currentPointer: null }));
  };
  // discard Add Form, returns to DEFAULT menu view
  handleBackClick = () => {
    this.props.handleMenu();
    this.props.handleChangeMode(MENU_MODES.DEFAULT);
    this.setState(prevState => ({ currentPointer: null }));
  };

  render() {
    let currentLocationMarker = this.state.currentLocation ? (
      <Marker position={this.state.currentLocation}>
        <Popup>{this.props.meText || "You are here"}</Popup>
      </Marker>
    ) : null;
    let currentPointerMarker =
      this.state.currentPointer != null ? (
        <Marker
          position={this.state.currentPointer}
          draggable={true}
          autoPan={true}
        >
          <Popup>
            <Button variant="primary" onClick={this.handleAddLocation}>
              Add location
            </Button>
          </Popup>
        </Marker>
      ) : null;

    return (
      <div>
        <MenuSlide
          isOpen={this.props.menuState}
          menuMode={this.props.menuMode}
          handleMenu={this.props.handleMenu}
          handleMenuChange={this.handleMenuChange}
          locationToAdd={this.state.locationToAdd}
          handleForm={this.handleForm}
          changeMode={this.props.handleChangeMode}
          handleBackClick={this.handleBackClick}
          markers={this.props.markers}
          handleFilterGroup={this.props.handleFilterGroup}
          handleFilterUser={this.props.handleFilterUser}
        />
        <Map
          viewport={this.state.center}
          onViewportChanged={this.onViewportChanged}
          onLocationfound={this.handleLocationFound}
          zoom={this.state.zoom}
          ref={this.mapRef}
          onClick={this.handleClick}
          doubleClickZoom={false}
          // onMouseUp={this.recenter}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topleft">
            <Button variant="danger" onClick={this.handleSelfLocate}>
              <div style={{ color: "white" }}>
                <IoMdLocate size={24} />
              </div>
            </Button>
          </Control>
          {currentLocationMarker}
          {currentPointerMarker}
          <MyMarkersList markers={this.props.markers} />
        </Map>
      </div>
    );
  }
}
