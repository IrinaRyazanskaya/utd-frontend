import { getApiToken } from "./auth-token";

type ApplyRequestPayload = {
  name: string;
  email: string;
  phone: string;
  comment?: string;
};

const applyRequest = (
  buyerName: string,
  buyerEmail: string,
  buyerPhone: string,
  comment: string,
  file: File | null,
): Promise<Response> => {
  const headers = new Headers();
  headers.append("X-Auth-Token", getApiToken());
  headers.append("Content-Type", "multipart/form-data");

  const formData = new FormData();

  const payload: ApplyRequestPayload = {
    name: buyerName,
    email: buyerEmail,
    phone: buyerPhone,
  };

  if (comment.length > 0) {
    payload.comment = comment;
  }

  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  if (file) {
    formData.append("order", file);
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: formData,
    redirect: "follow",
  };

  return fetch("/api/requests", requestOptions);
};

export { applyRequest };
