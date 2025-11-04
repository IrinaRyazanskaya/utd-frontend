type OrderCallPayload = {
  name: string;
  phone: string;
};

const orderCall = (buyerName: string, buyerPhone: string): Promise<Response> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const payload: OrderCallPayload = {
    name: buyerName,
    phone: buyerPhone,
  };

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    redirect: "follow",
  };

  return fetch("/api/calls", requestOptions);
};

export { orderCall };
