import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/firebase.admin";

export async function GET(request: NextRequest) {
  console.log("Verifyuser API called");

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }
  const token = authHeader.split("Bearer ")[1];

  try {
    console.log("Verifying token");
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;
    console.log("Token verified for user:", uid);
    return NextResponse.json({ uid });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
