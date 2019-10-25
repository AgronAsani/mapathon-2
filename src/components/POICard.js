import React from "react";
import { Button, Card, Col } from "react-bootstrap";

export default function POICard(props) {
  const { name, description, lat, lng, image, url } = props.content;
  const { Categories, Creator, Status } = props.content;
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
  console.log(props.content);
  return (
    <Col>
      <Card style={{ width: "22rem" }}>
        <Card.Img className="img-fluid" src={image} />
        <Card.Body>
          <Card.Title>
            <a href={url}>{name}</a>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{Creator.email}</Card.Text>
        </Card.Body>
      </Card>
      <br />
    </Col>
  );
}
