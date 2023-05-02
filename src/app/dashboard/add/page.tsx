import { FC } from "react";
import AddFriendButton from "@/components/AddFriendButton";
import { addFriendValidator } from "@/lib/validator/add-friend";
import toast from "react-hot-toast";

const Page: FC = () => {


  return (
    <main className="pt-8">
      <h2 className="font-bold text-5xl mb-8">Add a friend</h2>
      <AddFriendButton />
    </main>
  );
};

export default Page;
