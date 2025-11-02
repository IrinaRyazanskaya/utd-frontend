function applyRequest(buyerName, buyerEmail, buyerPhone, comment, file) {
  const formdata = new FormData();
  formdata.append("name", buyerName);
  formdata.append("email", buyerEmail);
  formdata.append("phone", buyerPhone);

  if (comment.length > 0) {
    formdata.append("comment", comment);
  }
  if (file !== null) {
    formdata.append("order", file);
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch("https://utd-backend.vercel.app/api/requests", requestOptions);
}

export { applyRequest };
