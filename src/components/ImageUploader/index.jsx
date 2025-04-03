import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <input
        className="bg-amber-100 border border-amber-400 cursor-pointer"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      <button
        className="px-2 py-1 bg-gray-600 rounded-lg text-white font-medium shadow-2xl text-md cursor-pointer"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {imageUrl && <img src={imageUrl} />}
    </div>
  );
};

export default ImageUploader;
