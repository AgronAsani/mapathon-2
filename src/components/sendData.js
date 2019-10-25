import React, { Component } from "react";
import { render } from "react-dom";

export class SendDataTest extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.addNewData();
  }

  addNewData() {
    //test

    var customXMLHttpRequest = (function(jwtoken) {
      function getXMLHttpRequest(method, url, async) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open(method, url, async);
        xmlHttpRequest.setRequestHeader("Authorization", "Bearer " + jwtoken);
        return xmlHttpRequest;
      }
      return getXMLHttpRequest;
    })("Tjruh72pOzbIHjYFah3xvuLEMawoXahC");

    var xhr = customXMLHttpRequest(
      "post",
      "https://backend.mapathon.ehealth.hevs.ch/poi",
      true
    );

    //fin test

    // create a new XMLHttpRequest
    // var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      console.log(xhr.responseText);
    });
    // open the request with the verb and the url
    //xhr.open("GET", "https://dog.ceo/api/breeds/list/all");
    //xhr.open("POST", "https://backend.mapathon.ehealth.hevs.ch/poi");
    // send the request
    //xhr.send();
    xhr.send({
      name: "Chateau de tourbillon",
      description: "Super chateau tout cassé",
      lat: 46.2357018,
      lng: 7.3644755,
      image:
        "http://www.swisscastles.ch/valais/tourbillon/tourbillon_031015_07.jpg",
      url:
        "http://www.swisscastles.ch/valais/tourbillon/tourbillon_031015_07.jpg",
      group: 2
    });

    console.log("Troubillon ok");
  }

  render() {
    return (
      <div>
        <p>Troubillon ok !</p>
      </div>
    );
  }
}

export default SendDataTest;
