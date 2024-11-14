import { adminAuth } from "../firebase/firebase.admin";
import { DecodedIdToken } from "firebase-admin/auth";

export async function verifyIdToken(token: string): Promise<DecodedIdToken> {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
}
