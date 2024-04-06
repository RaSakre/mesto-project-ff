//------------ API FUNCTIONS ------------//

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "be098c14-0a5a-4955-8891-76d13cd6a64f",
    "Content-Type": "application/json",
  },
};

function checkServerState(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

function request(url, options) {
  return fetch(url, options).then(checkServerState);
}

function getProfileRequest() {
  return request(config["baseUrl"] + "/users/me", {
    headers: config["headers"],
  });
}

function getCardsRequest() {
  return request(config["baseUrl"] + "/cards", {
    headers: config["headers"],
  });
}

function profilePatchRequest(inputNameValue, inputJobValue) {
  return request(config["baseUrl"] + "/users/me", {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      name: inputNameValue.value,
      about: inputJobValue.value,
    }),
  });
}

function avatarPatchRequest(inputLinkValue) {
  return request(config["baseUrl"] + "/users/me/avatar", {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      avatar: inputLinkValue,
    }),
  });
}

function postCardRequest(obj) {
  return request(config["baseUrl"] + "/cards", {
    method: "POST",
    headers: config["headers"],
    body: JSON.stringify({
      name: obj.name,
      link: obj.link,
    }),
  });
}

function deleteCardRequest(cardId) {
  return request(config["baseUrl"] + `/cards/${cardId}`, {
    method: "DELETE",
    headers: config["headers"],
  });
}

function putLikeRequest(cardId) {
  return request(config["baseUrl"] + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config["headers"],
  });
}

function deleteLikeRequest(cardId) {
  return request(config["baseUrl"] + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config["headers"],
  });
}

export {
  getProfileRequest,
  getCardsRequest,
  profilePatchRequest,
  avatarPatchRequest,
  postCardRequest,
  deleteCardRequest,
  putLikeRequest,
  deleteLikeRequest,
};
