function showPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupWithEsc);
  document.addEventListener("click", closePopupWithOverlay);
  document.addEventListener("click", closePopupWithButton);
};

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithEsc);
  document.removeEventListener("click", closePopupWithOverlay);
  document.removeEventListener("click", closePopupWithButton);
};

function closePopupWithEsc(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};

function closePopupWithOverlay(evt) {
  const popup = document.querySelector(".popup_is-opened");
	if (popup === evt.target) {
    closePopup(popup);
}
};

function closePopupWithButton(evt) {
	const closeButton = evt.target.closest(".popup__close");
  if (evt.target === closeButton) {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
};

export {showPopup, closePopup, closePopupWithEsc, closePopupWithOverlay, closePopupWithButton}