const freezeScroll = (): void => {
  if (document.body) {
    document.body.style.overflow = "hidden";
  }
};

const unfreezeScroll = (): void => {
  if (document.body) {
    document.body.style.overflow = "";
  }
};

export { freezeScroll, unfreezeScroll };
