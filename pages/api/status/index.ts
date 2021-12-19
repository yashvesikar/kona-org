// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, users } from "@prisma/client";

interface IResponse {
  user: users;
  status: "green" | "yellow" | "red";
  customStatus: string;
  text?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse[]>
) {
  const userIds = req.query?.userIds as string;

  const userIdsSplit = userIds.split(",");

  const prisma = new PrismaClient();

  const users = await prisma.users.findMany({
    where: {
      user_id: {
        in: userIdsSplit,
      },
    },
  });

  // Since we don't have data on what the user entered for their status just make something up
  const statusOptions: Omit<IResponse, "user">[] = [
    {
      status: "green",
      customStatus: ":green_heart:",
    },
    {
      status: "yellow",
      customStatus: ":yellow_heart:",
    },
    {
      status: "red",
      customStatus: ":red_heart:",
      text: ":broken_heart:",
    },
  ];

  const response = users.map((user) => {
    return {
      ...user,
      ...statusOptions[Math.floor(Math.random() * statusOptions.length)],
    };
  });

  res.status(200).json(response);
}
