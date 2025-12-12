"use client"; // This is necessary to use client-side hooks like useState and useEffect

import React, { useState } from "react";

// The local API endpoint you want to interact with
const API_ENDPOINT = "http://localhost:8000/ask";

export default function Home() {
  // State for the text input value
  const [inputText, setInputText] = useState("");
  // State for the response received from the API
  const [responseText, setResponseText] = useState(
    "Your API response will appear here..."
  );
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);
  // State for any error messages
  const [error, setError] = useState<string | null>(null);

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    // Clear previous states
    setIsLoading(true);
    setError(null);
    setResponseText("Loading...");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          // Tell the server we are sending JSON
          "Content-Type": "application/json",
        },
        // Convert the object {text: inputText} into a JSON string
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response body
      const data = await response.json();

      // The backend should return {response: ...}, so we access data.response
      if (data && data.response) {
        setResponseText(data.response);
      } else {
        // Handle unexpected response format
        setResponseText("Received data in an unexpected format.");
        console.error("Unexpected API response data:", data);
      }
    } catch (err) {
      // Handle network errors, JSON parsing errors, etc.
      console.error("Fetch error:", err);
      setError(
        "Failed to connect to the API or an error occurred during fetch. Check your console for details."
      );
      setResponseText("Error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 py-16 px-6 sm:px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
          Next.js API Interactor
        </h1>

        {/* --- Input Form --- */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-lg flex-col gap-4"
        >
          <label
            htmlFor="text-input"
            className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
          >
            Enter Text to Send to API:
          </label>
          <textarea
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-zinc-300 p-3 text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your prompt here..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || inputText.trim() === ""}
            className={`
              w-full h-12 rounded-lg font-semibold transition-colors
              ${
                isLoading || inputText.trim() === ""
                  ? "bg-zinc-400 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }
            `}
          >
            {isLoading ? "Sending..." : "Submit to localhost:8000"}
          </button>
        </form>

        {/* --- Response Display --- */}
        <div className="w-full max-w-lg mt-8 p-6 border rounded-lg shadow-md bg-zinc-100 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
            API Response
          </h2>
          {error && (
            <p className="text-red-500 font-medium mb-2">Error: {error}</p>
          )}
          <div className="p-3 bg-white rounded-md whitespace-pre-wrap text-black dark:bg-zinc-800 dark:text-zinc-200">
            {responseText}
          </div>
        </div>
      </main>
    </div>
  );
}
