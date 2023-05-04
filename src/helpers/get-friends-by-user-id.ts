import { fetchRedis } from "@/helpers/redis";

export const getFriendsByUserId = async (userId: string) => {
  // retrieve friends for current user

  const friendsIds = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];

  return await Promise.all(
    friendsIds.map(async (friendId) => {
      const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
      return JSON.parse(friend) as User;
    })
  );
};
