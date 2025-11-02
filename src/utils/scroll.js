function freezeScroll() {
  document.body.style.overflow = "hidden";
}

function unfreezeScroll() {
  document.body.style.overflow = "";
}

export { freezeScroll, unfreezeScroll };
