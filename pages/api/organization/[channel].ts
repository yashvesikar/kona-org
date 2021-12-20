// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "~/types/users";
import { PrismaClient } from "@prisma/client";

interface IResponse {
  channelId: string;
  users?: Array<IUser[]>;
  primaryTeam: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse | { error: string }>
) {
  const prisma = new PrismaClient();
  const channelId = req.query.channel as string; // Forcing the type as we are guaranteed to have this param
  console.log(`Fetching channel ${channelId}`);

  const primaryTeam = await prisma.teams.findFirst({
    where: {
      channel_id: channelId,
    },
  });
  try {
    const primaryTeamId = primaryTeam?.team_id;
    if (!primaryTeamId) {
      res.status(204).json({ error: "No primary team found" });
    }
    const consolidatedTeams = await prisma.teams.findMany({
      where: {
        consolidated_primary_team: {
          equals: primaryTeamId,
        },
      },
    });

    const processedConsolidatedTeams = [
      // @ts-ignore
      ...new Map(
        [primaryTeam, ...consolidatedTeams].map((team) => [team?.["id"], team])
      ).values(),
    ];

    const response = {
      channelId: channelId as string,
      primaryTeam: primaryTeam,
      consolidatedTeams: processedConsolidatedTeams,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      // @ts-ignore
      error: err.message,
    });
  }
}
