import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";

export default function POICard(props) {
  const { name, description, lat, lng, image, url } = props.content;
  const { Categories, Tags, User, Status } = props.content;
  const very = props.fromDisplay;
  console.log(very);
  let statusColor;
  if (Status) {
    switch (Status.id) {
      case 1:
        statusColor = "red";
        break;
      case 2:
        statusColor = "orange";
        break;
      case 3:
        statusColor = "green";
        break;
    }
  }

  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src={image} waves />
        <MDBCardBody>
          <MDBCardTitle>{name}</MDBCardTitle>
          <MDBCardText>{description}</MDBCardText>
          <MDBCardText>{Categories[0] ? Categories[0].name : null}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <br />
    </MDBCol>
  );
}
