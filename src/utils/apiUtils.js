import "isomorphic-fetch";
import jwt_decode from "jwt-decode";
import {enNames} from "./enNames";

export function checkStatus(response) {
  if (!response.ok) {
    // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callApi(
  url,
  config,
  request,
  onRequestSuccess,
  onRequestFailure
) {
  return dispatch => {
    dispatch(request);

    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(onRequestSuccess(json));
      })
      .catch(error => {
        const response = error.response;
        if (response === undefined) {
          dispatch(onRequestFailure(error));
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then(text => {
            try {
              const json = JSON.parse(text);
              error.message = json.message;
            } catch (ex) {
              error.message = text;
            }
            dispatch(onRequestFailure(error));
          });
        }
      });
  };
}

function call(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

    return fetch(url, {
        headers,
        ...options
    })
        .then(_checkStatus)
        .then((response) => response.json());
}

function _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 400) { // Success status lies between 200 to 300
        return response;
    } else {
        console.log(response);
        let error = new Error(response.statusText);
        // error.response = response
        throw error;
    }
}

let address = "http://localhost:8080";

export function getPC() {
    return call(`${address}/pc`, {
        method: "GET",
    }).then((res) => {
        return Promise.resolve(res);
    });
}

export function getBoxes(idPC) {
    return call(`${address}/pc/${idPC}/box`, {
        method: "GET",
    }).then((res) => {
        return Promise.resolve(res);
    });
}

export function getSlots(idPC, idBox) {
    return call(`${address}/pc/${idPC}/box/${idBox}`, {
        method: "GET",
    }).then((res) => {
        return Promise.resolve(res);
    });
}

let addressNames = "https://github.com/sindresorhus/pokemon/blob/master/data";

export function getNames(lang) {
    return call(`${addressNames}/${lang}.json`, {
        method: "GET",
    }).then((res) => {
        return Promise.resolve(res);
    });
}

const generations = [
  "green",
  "silver",
  "emerald",
  "diamond-pearl",
  "black-white",
  "xy"
];

// http://www.pokestadium.com/sprites/silver/shiny/charizard.png
let addressSprites = "http://www.pokestadium.com/sprites";

export function getSprite(pokemon) {
    let uriShiny = "";
    if (pokemon.shiny) {
        if (pokemon.generation === 1) {
            uriShiny = "/gray";
        } else {
            uriShiny = "/shiny";
        }
    }
    let name = enNames[pokemon.id - 1].toLowerCase();
    return `${addressSprites}/${generations[pokemon.generation - 1]}${uriShiny}/${name}.png`;

}

export const ID_TOKEN = "id_token";

export function setIdToken(idToken) {
    localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
    localStorage.removeItem(ID_TOKEN);
}

export function loadIdToken() {
    return localStorage.getItem(ID_TOKEN);
}

export function decodeUserProfile(idToken) {
    try {
        return jwt_decode(idToken);
    } catch (err) {
        return null;
    }
}

export function loadUserProfile() {
    try {
        const idToken = localStorage.getItem(ID_TOKEN);
        const userProfile = jwt_decode(idToken);
        const now = new Date().getTime() / 1000; // Date().getTime() returns milliseconds.
        // So divide by 1000 to get seconds
        if (now > userProfile.exp) {
            // user profile has expired.
            removeIdToken();
            return null;
        }
        return userProfile;
    } catch (err) {
        return null;
    }
}
