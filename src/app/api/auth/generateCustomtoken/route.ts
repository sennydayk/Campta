import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/firebase.admin";

export async function POST(request: Request) {
  console.log("generateCustomtoken request");
  try {
    const { uid } = await request.json();

    // Log UID to verify it's being received correctly
    console.log("UID received in API:", uid);

    // Validate UID
    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    console.log("customtoken 생성 시도");

    // Generate a custom token using the UID
    const customToken = await adminAuth.createCustomToken(uid);

    console.log("Custom token created successfully");
    console.log("Token length:", customToken.length);
    console.log("Token preview:", customToken.substring(0, 20) + "...");

    // Send the custom token to the client
    return NextResponse.json({ customToken });
  } catch (error) {
    console.error("Error generating custom token:", error);
    return NextResponse.json(
      { error: "Failed to generate custom token" },
      { status: 500 }
    );
  }
}
