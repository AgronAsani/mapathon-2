import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar bg="" expand="lg">
          <Navbar.Brand>Mapathon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/roger-schaer/mapathon">
                Source Repository
              </Nav.Link>
            </Nav>
            {this.props.isAuthenticated ? (
              <div>
                <Button
                  variant="warning"
                  className="mr-sm-2"
                  onClick={this.props.handleGetPOI}
                >
                  Get POIs
                </Button>

                <Button
                  variant="info"
                  className="mr-sm-2"
                  onClick={this.props.handleMenu}
                >
                  Menu
                </Button>

                <Button
                  variant="danger"
                  className="mr-sm-2"
                  onClick={this.props.handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="success"
                  className="mr-sm-2"
                  onClick={this.props.handleLogin}
                >
                  Login
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Navbar>{" "}
      </React.Fragment>
    );
  }
}

export default NavigationBar;
