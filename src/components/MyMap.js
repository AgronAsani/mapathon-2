import React, { Component, createRef, Fragment, useState } from "react";
import MENU_MODES from "../MenuModes";
import {Map, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import { Button } from "react-bootstrap";
import MenuSlide from "./MenuSlide";
import Control from "@skyeer/react-leaflet-custom-control";
import { IoMdLocate } from "react-icons/io";
import { latLngBounds } from "leaflet";
import POI from "./POI";
import POICard from "./POICard";
import POIDetail from "./POIDetail";
import POIEdit from "./POIEdit";
import L from 'leaflet'

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
// const MyPopupMarker = ({ content, position }: Props) => (
//   <Marker
//     position={position}
//     riseOnHover
//     onMouseOver={e => {
//       e.target.openPopup();
//       (e.target);
//     }}
//   >
//     <Popup>
//       <POI content={content.poi} />
//     </Popup>
//   </Marker>
// );
//all the pin of the bdd (make a loop).
// const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
//   const items = markers
//     ? markers.map(({ key, ...props }) => <MyPopupMarker key={key} {...props} />)
//     : null;
//   return <Fragment>{items}</Fragment>;
// };

type State = {
  markers: Array<>
};
const MarkerList = props => {
  const items = props
    ? props.markers.map(marker =>(
        <Marker
          key={marker.key}
          icon={marker.content.icon || null}
          position={marker.position}
          riseOnHover
          onMouseOver={e => {
            e.target.openPopup();
          }}
        >
          {" "}
          <Popup>
            <POI
              key={marker.key}
              content={marker.content.poi}
              canDeletePOI={props.canDeletePOI}
              handleDeletePOI={props.handleDeletePOI}
              handleModalClose={props.handleModalClose}
              handleModalShow={props.handleModalShow}
              handleEditModalClose={props.handleEditModalClose}
              handleEditModalShow={props.handleEditModalShow}
              user={props.user}
            />
          </Popup>
        </Marker>
      ))
    : null;
  return <Fragment>{items}</Fragment>;
};
export default class MyMap extends Component<{}, State> {
  state = {
    hasLocation: false,
    currentLocation: null,
    currentPointer: null,
    myLocation: null,
    center: DEFAULT_VIEWPORT,
    zoom: 13,
    locationToAdd: null,
    modalState: false,
    modalPOI: null,
    modalEditState: false,
    modalEditPOI: null,
    mapRef: createRef()
  };

  handleMenuChange = isOpen => {
    this.props.handleMenuChange(isOpen);
  };
  // clicking on any point in map
  handleClick = e => {
    if (this.props.isAuthenticated) {
      this.setState(prevState => ({
        currentPointer: e.latlng
      }));
      this.handleAddLocation();
    }
  };
  handleSelfLocate = () => {
    const map = this.state.mapRef.current;
    if (map != null) {
      if (this.state.myLocation != null) {
        this.setState({
          center: { center: this.state.myLocation, zoom: 18 }
        });
      } else {
        const map = this.state.mapRef.current;
        if (map != null) {
          map.leafletElement.locate();
        }
      }
    }
  };
  handleShowOnMap = (lat, lng) => {
    const map = this.state.mapRef.current;
    if (map != null) {
      this.setState({
        center: { center: { lat, lng }, zoom: 18 }
      });
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

  handleModalClose = () => {
    this.setState({ modalState: false });
  };

  handleModalShow = poi => {
    this.setState({ modalPOI: poi }, () => {
      this.setState({ modalState: true });
    });
  };
  handleEditModalClose = () => {
    this.setState({ modalEditState: false });
  };
  handleEditModalShow = poi => {
    this.setState({ modalEditPOI: poi }, () => {
      this.setState({ modalEditState: true });
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
    this.props.setMenu(true);
  };

  //pass newPOI to App.js and unmount current marker
  handleForm = newPOI => {
    this.props.handleForm(newPOI);
    this.setState(prevState => ({ currentPointer: null }));
  };

  // discard Add Form, returns to DEFAULT menu view
  handleBackClick = () => {
    // this.props.toggleMenu();
    this.props.handleChangeMode(MENU_MODES.DEFAULT);
    this.setState(prevState => ({ currentPointer: null }));
  };

  render() {
    let currentLocationMarker = this.state.currentLocation ? (
      <Marker
        position={this.state.currentLocation}
        onMouseOver={e => {
          e.target.openPopup();
        }}
        onMouseOut={e => {
          e.target.closePopup();
        }}
      >
        <Popup>{"You are here"}</Popup>
      </Marker>
    ) : null;
    let currentPointerMarker =
      this.state.currentPointer != null ? (
        <Marker
          position={this.state.currentPointer}
          draggable={true}
          autoPan={true}
          onMouseOver={e => {
            e.target.openPopup();
          }}
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
          toggleMenu={this.props.toggleMenu}
          handleMenuChange={this.handleMenuChange}
          locationToAdd={this.state.locationToAdd}
          categories={this.props.categories}
          handleForm={this.handleForm}
          changeMode={this.props.handleChangeMode}
          handleBackClick={this.handleBackClick}
          markers={this.props.markers}
          handleFilterGroup={this.props.handleFilterGroup}
          handleFilterUser={this.props.handleFilterUser}
          canDeletePOI={this.props.canDeletePOI}
          handleDeletePOI={this.props.handleDeletePOI}
          handleShowOnMap={this.handleShowOnMap}
          handleModalClose={this.handleModalClose}
          handleModalShow={this.handleModalShow}
          handleEditModalClose={this.handleEditModalClose}
          handleEditModalShow={this.handleEditModalShow}
        />
        <Map
          viewport={this.state.center}
          onViewportChanged={this.onViewportChanged}
          onLocationfound={this.handleLocationFound}
          zoom={this.state.zoom}
          ref={this.state.mapRef}
          onClick={this.handleClick}
          doubleClickZoom={false}
          zoomControl={true}
        >
          <TileLayer
              maxZoom={19 /* we need both to work*/ }
              minZoom={1}
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topleft">
            <Button variant="primary" onClick={this.handleSelfLocate}>
              <div style={{ color: "white" }}>
                <IoMdLocate size={24} />
              </div>
            </Button>
          </Control>
          {currentLocationMarker}
          {currentPointerMarker}
          <MarkerList
            markers={this.props.markers}
            canDeletePOI={this.props.canDeletePOI}
            handleDeletePOI={this.props.handleDeletePOI}
            handleShowOnMap={this.handleShowOnMap}
            handleModalClose={this.handleModalClose}
            handleModalShow={this.handleModalShow}
            handleEditModalClose={this.handleEditModalClose}
            handleEditModalShow={this.handleEditModalShow}
            user={this.props.user}
          />
          {this.state.modalPOI ? (
            <POIDetail
              modalState={this.state.modalState}
              modalPOI={this.state.modalPOI}
              handleModalClose={this.handleModalClose}
              handleModalShow={this.handleModalShow}
            />
          ) : null}
          {this.state.modalEditPOI ? (
            <POIEdit
              modalEditState={this.state.modalEditState}
              modalEditPOI={this.state.modalEditPOI}
              handleEditModalClose={this.handleEditModalClose}
              handleEditModalShow={this.handleEditModalShow}
            />
          ) : null}
        </Map>
      </div>
    );
  }
}
