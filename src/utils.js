// const domain = "http://localhost:8080";
const domain = "";
// using a utils.js to fetch data from backend 
// can make our code clean in component


export const login = (credential, asHost) => {
    // credential: an object contains username & password
    //  asHost: boolean
    const loginUrl = `${domain}/authenticate/${asHost ? "host" : "guest"}`;
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            // tell server, the type of info is json
            "Content-Type": "application/json",
        },
        // turn an object to a string
        body: JSON.stringify(credential),
    })
        // call then will also return a promise
        // we have return value, so this promise object will contain our return value
        // which can be parsed into the input value in next then.
        .then((response) => {
            if (response.status !== 200) {
                throw Error("Fail to log in");
            }
            // parse the response into json
            // after login, frontend get the token from backend.
            // register do not need token, so there is return in register
            return response.json();
        });
};

export const register = (credential, asHost) => {
    const registerUrl = `${domain}/register/${asHost ? "host" : "guest"}`;
    return fetch(registerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to register");
        }
    });
};

export const getReservations = () => {
    const authToken = localStorage.getItem("authToken");
    const listReservationsUrl = `${domain}/reservations`;

    return fetch(listReservationsUrl, {
        // default method: GET
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get reservation list");
        }

        return response.json();
    });
};

export const getStaysByHost = () => {
    const authToken = localStorage.getItem("authToken");
    const listStaysUrl = `${domain}/stays/`;
   
    return fetch(listStaysUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get stay list");
      }
   
      return response.json();
    });
  };


  export const searchStays = (query) => {
    const authToken = localStorage.getItem("authToken");
    // compose URL use new URL() and append
    // searchStays: query info of stay in URL
    const searchStaysUrl = new URL(`${domain}/search/`);
    searchStaysUrl.searchParams.append("guest_number", query.guest_number);
    searchStaysUrl.searchParams.append(
      "checkin_date",
      query.checkin_date.format("YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append(
      "checkout_date",
      query.checkout_date.format("YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append("lat", 37);
    searchStaysUrl.searchParams.append("lon", -122);
   
    return fetch(searchStaysUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to search stays");
      }
   
      return response.json();
    });
  };

  export const deleteStay = (stayId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteStayUrl = `${domain}/stays/${stayId}`;
   
    return fetch(deleteStayUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to delete stay");
      }
    });
  };
  
  export const bookStay = (data) => {
    const authToken = localStorage.getItem("authToken");
    const bookStayUrl = `${domain}/reservations`;
   
    return fetch(bookStayUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to book reservation");
      }
    });
  };

  export const cancelReservation = (reservationId) => {
    const authToken = localStorage.getItem("authToken");
    const cancelReservationUrl = `${domain}/reservations/${reservationId}`;
   
    return fetch(cancelReservationUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to cancel reservation");
      }
    });
  };

  export const getReservationsByStay = (stayId) => {
    const authToken = localStorage.getItem("authToken");
    const getReservationByStayUrl = `${domain}/stays/reservations/${stayId}`;
   
    return fetch(getReservationByStayUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get reservations by stay");
      }
   
      return response.json();
    });
  };

  export const uploadStay = (data) => {
    const authToken = localStorage.getItem("authToken");
    const uploadStayUrl = `${domain}/stays`;
   
    return fetch(uploadStayUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to upload stay");
      }
    });
  };
  
  
  
  







