import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { z } from "zod";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 400 });
    }

    const { id: idToDeny } = z.object({ id: z.string() }).parse(body);

    console.log("ID to deny", idToDeny);
    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny);

    return new Response("OK");
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response("Invalid request payload.", { status: 422 });
    }
    return new Response("Invalid request.", { status: 400 });
  }
}
