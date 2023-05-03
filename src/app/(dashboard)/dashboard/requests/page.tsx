import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/helpers/redis";
import FriendRequest from "@/components/FriendRequest";

interface PageProps {}

const Page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendsRequest = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParse = JSON.parse(sender) as User;
      return {
        senderId,
        senderEmail: senderParse.email,
      };
    })
  );

  return (
    <main className="pt-8">
      <h2 className="font-bold text-5xl mb-8">Add a friend</h2>
      <div className="flex flex-col gap-4">
        <FriendRequest
          incomingFriendsRequest={incomingFriendsRequest}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default Page;
