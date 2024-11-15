import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      console.log("Sending request:", requestConfig); // Debugging log

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const responseData = await response.json();
      applyData(responseData);
      console.log("Response data:", responseData); // Debugging log
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Error:", err.message); // Debugging log
    }
  }, []);

  return { error, sendRequest };
};

export default useHttp;
