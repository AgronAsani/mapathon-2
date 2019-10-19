import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import MENU_MODES from "../MenuModes";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPOI: {
        name: "",
        description: "",
        group: 0,
        image: "",
        url: "",
        lat:
          this.props.locationToAdd == null ? 0 : this.props.locationToAdd.lat,
        lng: this.props.locationToAdd == null ? 0 : this.props.locationToAdd.lng
      }
    };
  }

  inputFieldValueChanged = event => {
    this.setState({
      newPOI: {
        ...this.state.newPOI,
        [event.target.id]: event.target.value
      }
    });
  };

  addPOIButtonClicked = event => {
    event.preventDefault();
    this.setState(
      prevState => ({
        newPOI: {
          name: this.state.newPOI.name,
          description: this.state.newPOI.description,
          group: this.state.newPOI.group,
          image: this.state.newPOI.image,
          url: this.state.newPOI.url,
          lat: this.props.locationToAdd.lat,
          lng: this.props.locationToAdd.lng
        }
      }),
      () => this.props.handleForm(this.state.newPOI)
    );
    this.refs.form.reset();
  };
  backButtonClicked = event => {
    event.preventDefault();
    this.props.handleBackClick();
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <form ref="form">
            <p className="h4 text-center mb-4"> Add a point </p>
            Name:{" "}
            <input
              id="name"
              type="text"
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            Group:{" "}
            <input
              id="group"
              type="number"
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            Image:
            <input
              id="image"
              type="URL"
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            URL:{" "}
            <input
              id="url"
              type="URL"
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            Description:{" "}
            <textarea
              id="description"
              type="text"
              onChange={this.inputFieldValueChanged}
              rows="3"
              className="form-control"
            />
            <br />
            <p></p>
            <input
              className="btn btn-info"
              type="submit"
              onClick={this.addPOIButtonClicked}
              value="Submit"
              style={{ display: "block", margin: "0 auto" }}
            />
            <br />
            <Button
              onClick={this.backButtonClicked}
              variant="danger"
              style={{ display: "block", margin: "0 auto" }}
            >
              Go back
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddForm;
