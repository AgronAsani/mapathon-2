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
            Name:{" "}
            <input
              id="name"
              type="text"
              onChange={this.inputFieldValueChanged}
            />
            <br />
            Description:{" "}
            <input
              id="description"
              type="text"
              onChange={this.inputFieldValueChanged}
            />
            <br />
            Group:{" "}
            <input
              id="group"
              type="number"
              onChange={this.inputFieldValueChanged}
            />
            Image:{" "}
            <input
              id="image"
              type="text"
              onChange={this.inputFieldValueChanged}
            />
            <br />
            <input
              className="btn btn-success "
              type="submit"
              onClick={this.addPOIButtonClicked}
              value="Add POI"
            />
          </form>
          <p>{this.props.locationToAdd.lat}</p>
          <p>{this.props.locationToAdd.lng}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default AddForm;
