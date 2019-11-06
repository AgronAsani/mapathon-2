export class requestPOI {
  //Update some Information for a POI
  static async updatePOI(id, updatePOI, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      // console.log(JSON.stringify(updatePOI));
      let response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
          {
            method: "PATCH",
            body: JSON.stringify(updatePOI),
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`
            }
          }
      );

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      //await loginWithRedirect();
      return null;
    }
  }

  static async updatePOICategory(id, category, getTokenSilently, loginWithRedirect) {
    try {
      let token = await getTokenSilently();
      console.log(JSON.stringify(`${process.env.REACT_APP_SERVER_URL}/poi/` + id + `/category`));
      console.log(JSON.stringify(category));
      // console.log(JSON.stringify(updatePOI));
      let response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/poi/` + id + `/category`,
          {
            method: "PATCH",
            body: JSON.stringify(category),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
      );

      return await response.json();
    } catch (e) {
      console.error(e);
      await loginWithRedirect;
      return null;
    }
  }

  //Create a new POI in the Database
  static async addNewPOI(newPOI, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      // console.log(JSON.stringify(newPOI));
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi`, {
        method: "POST",
        body: JSON.stringify(newPOI),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return await response.json();
    } catch (e) {
      console.error(e);
      await loginWithPopup();
      return null;
    }
  }

  //Return all POIs from the Database
  static async getAllPOI(getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  }
  //Get some Information from a POI with the Id as paratmeter
  static async getPOI(id, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      return await response.json();
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  }
  //Delete a POI in the Database
  static async deletePOI(id, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  }
}
export default requestPOI;
