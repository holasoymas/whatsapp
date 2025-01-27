const Config = { BASE_API_URL: "http://localhost:8000" };

export async function fetchFromServer(endpoint, method, body = null) {
  try {
    const response = await fetch(`${Config.BASE_API_URL}/${endpoint}`, buildOptions(method, body));

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      const resStatus = response.status;
      return { status: resStatus, error: errorData };
    }
    const result = await response.json();
    // console.log(result);
    return { status: response.status, result };
  } catch (error) {
    // console.error("Fetch error:", error);
    throw error;
  }
}

function buildOptions(method, body) {
  const options = {};

  options.method = method;

  if (body) {
    options.body = JSON.stringify(body);
  }

  options.headers = {
    "Content-Type": "application/json; charset=UTF-8",
  };

  return options;
}
