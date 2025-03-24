import { NextResponse } from "next/server";

export const GET = () => {
  const response = {
    server_version: process.env.SERVER_VERSION,
  };
  return NextResponse.json(response);
};
