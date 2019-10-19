import React, { Component } from "react";
import { Form } from "react-bootstrap";
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
        URL: "",
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
    console.log(this.state);
  };

  addPOIButtonClicked = event => {
    event.preventDefault();
    console.log(this.state);
    this.setState(
      prevState => ({
        newPOI: {
          name: this.state.newPOI.name,
          description: this.state.newPOI.description,
          group: this.state.newPOI.group,
          image: this.state.newPOI.image,
          URL: this.state.newPOI.URL,
          lat: this.props.locationToAdd.lat,
          lng: this.props.locationToAdd.lng
        }
      }),
      () => this.props.handleForm(this.state.newPOI)
    );
    this.refs.form.reset();
    // this.setState(
    //   {
    //     newPOI: {
    //       name: "",
    //       description: "",
    //       group: 0,
    //       image: "",
    //       lat:
    //         this.props.locationToAdd == null ? 0 : this.props.locationToAdd.lat,
    //       lng:
    //         this.props.locationToAdd == null ? 0 : this.props.locationToAdd.lng
    //     }
    //   },
    //   () => this.refs.form.reset()
    // );
    this.props.changeMode(MENU_MODES.DEFAULT);
    this.props.handleMenu();
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form ref="form">
            <p className="h4 text-center mb-4"> Add a point </p>
            <p>Latitude : {this.props.locationToAdd.lat}</p>
            <p>Longitude : {this.props.locationToAdd.lng}</p>
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
              id="URL"
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
              value="submit"
              style={{ display: "block", margin: "0 auto" }}
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddForm;
