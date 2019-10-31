import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class POIEdit extends Component {
  state = {};
  handleDetailClick = state => {
    this.props.handleDetailClick(state);
  };
  render() {
    const {
      id,
      name,
      description,
      lat,
      lng,
      image,
      url,
      group,
      createAt,
      Categories,
      Creator,
      Status
    } = this.props.modalEditPOI;
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
      <Modal
        show={this.props.modalEditState}
        onHide={this.props.handleEditModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title> Edit {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>In progress. Come back later.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.props.handleEditModalClose()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default POIEdit;
