import { FC } from "react";
import Button from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-[50vw]">
      <pre>Dashboard</pre>
    </div>
  );
};

export default Page;
