import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import AddForm from "./AddForm";
import MENU_MODES from "../MenuModes";
class MenuSlide extends Component {
  state = {};
  handleMenuChange = state => {
    this.props.handleMenuChange(state.isOpen);
  };
  handleForm = newPOI => {
    this.props.handleForm(newPOI);
  };
  render() {
    return (
      <Menu
        styles={burgerStyles}
        right
        isOpen={this.props.isOpen}
        onStateChange={this.handleMenuChange}
      >
        <div>
          {this.props.menuMode == MENU_MODES.DEFAULT ? (
            "Default"
          ) : (
            <div>
              {/*<p>{this.props.locationToAdd.lat}</p>
              <p>{this.props.locationToAdd.lng}</p> */}
              <AddForm
                locationToAdd={this.props.locationToAdd}
                handleForm={this.handleForm}
                changeMode={this.props.changeMode}
                handleMenu={this.props.handleMenu}
              />
            </div>
          )}
        </div>
      </Menu>
    );
  }
}

export default MenuSlide;

var burgerStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "100px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47",
    visibility: "hidden"
  },
  bmBurgerBarsHover: {
    background: "#a90000"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenuWrap: {
    position: "fixed",
    width: "30%",
    height: "100%"
  },
  bmMenu: {
    background: "#FFFFFF",
    padding: "2.5em 1em 0",
    fontSize: "15px",
    fontWeight: "bold"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#373a47",
    padding: "0.8em"
  },
  bmItem: {
    outline: "none",
    display: "block",
    textAlign: "left"
  },
  bmOverlay: {
    background: "none"
  }
};
