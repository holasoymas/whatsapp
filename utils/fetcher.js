import Config from "./config.js";

export async function fetchFromServer(endpoint, method, body = null, authToken = null) {
  try {
    const response = await fetch(
      `${Config.BASE_API_URL}/${endpoint}`,
      buildOptions(method, body, authToken),
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      const resStatus = response.status;
      return { status: resStatus, error: errorData };
    }
    const result = await response.json();
    console.log(result);
    return { status: 200, result };
  } catch (error) {
    // console.error("Fetch error:", error);
    throw error;
  }
}

function buildOptions(method, body, authToken) {
  const options = {};

  options.method = method;

  if (body) {
    options.body = JSON.stringify(body);
  }

  options.headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${authToken}`,
  };

  return options;
}
