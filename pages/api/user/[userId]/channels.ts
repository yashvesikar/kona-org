// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface IResponse {
  channels: { name: string; channel_id: string }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const userId = req.query?.userId as string;

  const prisma = new PrismaClient();

  const teams = await prisma.teams.findMany({
    where: {
      OR: [
        {
          directs: {
            contains: userId,
          },
        },
        {
          manager_id: {
            equals: userId,
          },
        },
      ],
    },
  });

  const channels = new Set<{ name: string; channel_id: string }>();
  teams.forEach(
    (team) =>
      team.channel_id &&
      channels.add({ name: team.name, channel_id: team.channel_id })
  );
  const response = {
    // @ts-ignore
    channels: [...channels],
  };
  res.status(200).json(response);
}
