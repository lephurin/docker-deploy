import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // First, check if all required environment variables exist
    if (
      !process.env.GCP_PROJECT_ID ||
      !process.env.GCP_CLIENT_EMAIL ||
      !process.env.GCP_PRIVATE_KEY ||
      !process.env.GCP_BUCKET_NAME
    ) {
      console.error("Missing GCP configuration:", {
        projectId: !!process.env.GCP_PROJECT_ID,
        clientEmail: !!process.env.GCP_CLIENT_EMAIL,
        privateKey: !!process.env.GCP_PRIVATE_KEY,
        bucketName: !!process.env.GCP_BUCKET_NAME,
      });
      return NextResponse.json(
        {
          error:
            "Server configuration error: GCP credentials not properly configured",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const mimeType = file.type;

    // Try using a safer way to initialize the Storage client
    let storage;
    try {
      storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
        credentials: {
          client_email: process.env.GCP_CLIENT_EMAIL,
          private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
      });
    } catch (error) {
      console.error("Failed to initialize GCP Storage:", error);
      return NextResponse.json(
        { error: "Failed to initialize Google Cloud Storage client" },
        { status: 500 }
      );
    }

    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
    const blob = bucket.file(fileName);

    // Upload the file
    await blob.save(buffer, {
      metadata: {
        contentType: mimeType,
      },
    });

    // Create a public URL
    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/${fileName}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
