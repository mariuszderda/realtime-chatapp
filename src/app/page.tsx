import { db } from "@/lib/db";

export default async function Home() {
  await db.set("foo", "foo");

  return <main className="text-red-500">Hello World</main>;
}
