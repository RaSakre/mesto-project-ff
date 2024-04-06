function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEscape);
  document.addEventListener("click", closePopupOverlay);
  document.addEventListener("click", closeButtonPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEscape);
  document.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("click", closeButtonPopup);
}

function closeButtonPopup(evt) {
  const closeButton = evt.target.closest(".popup__close");
  if (evt.target === closeButton) {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function closePopupEscape(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function closePopupOverlay(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (evt.target.classList.contains("popup")) {
    closePopup(popup);
  }
}

export {
  openPopup,
  closePopup,
  closeButtonPopup,
  closePopupEscape,
  closePopupOverlay,
};