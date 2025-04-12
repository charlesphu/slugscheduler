"use client";

import React, { useState, useRef } from "react";
import { sendPrompt } from "./hooks/aiPrompt";
import { usePDFToText } from "./hooks/usePDFToText";

export default function Home() {
  const [fileName, setFileName] = React.useState("No transcript selected");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      const pdfURL = URL.createObjectURL(file);
      const pdfText = usePDFToText(pdfURL);
      console.log("PDF Text: ", pdfText);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleButtonClick}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Choose PDF File
      </button>

      <p>{fileName}</p>

      <button
        onClick={() => {
          sendPrompt("Hello");
        }}>
        Test AI
      </button>
    </div>
  );
}
