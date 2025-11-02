function orderCall(buyerName, buyerPhone) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: buyerName,
    phone: buyerPhone,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("https://utd-backend.vercel.app/api/calls", requestOptions);
}

export { orderCall };
