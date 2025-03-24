"use client";

import { useEffect, useState } from "react";

export const Home = () => {
  const [serverVersion, setServerVersion] = useState();

  const getServerVersion = async () => {
    const res = await fetch(`/api/version`);
    const data = await res.json();
    setServerVersion(data.server_version);
  };

  useEffect(() => {
    getServerVersion();
  }, []);

  return (
    <div>
      <h2>To Test Deploy GCP with docker</h2>
      <p>client version: {process.env.NEXT_PUBLIC_CLIENT_VERSION}</p>
      <p>server version: {serverVersion}</p>
    </div>
  );
};
