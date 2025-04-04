"use client";

import ImageUploader from "@/components/ImageUploader";
import { useEffect, useState } from "react";

export const Home = () => {
  const [serverVersion, setServerVersion] = useState();
  const clientVersion = process.env.NEXT_PUBLIC_CLIENT_VERSION;

  const getServerVersion = async () => {
    const res = await fetch(`/api/version`);
    const data = await res.json();
    setServerVersion(data.server_version);
  };

  useEffect(() => {
    getServerVersion();
    console.log("clientVersion: ", clientVersion);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-cyan-800">
      <div className="flex flex-col items-center justify-center p-14 bg-cyan-200 rounded-2xl">
        <h2 className="text-xl font-bold">To Test Deploy GCP with docker</h2>
        <hr className="my-4 h-[1px] bg-black w-full" />
        <p>client version: {clientVersion}</p>
        <p>server version: {serverVersion}</p>
        <ImageUploader />
      </div>
    </div>
  );
};
