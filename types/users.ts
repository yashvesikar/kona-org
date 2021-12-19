interface IUser {
  id: string;
  user_id: string;
  name: string;
  manager: string[];
  is_manager: boolean;
}

interface IManager extends IUser {
  s_manager: string[];
  teams: ITeam[];
}

interface ITeam {
  id: number;
  team_id: string;
  name: string;
  manager: string;
  manager_id: string;
  directs: string[];
  channel_id: string;
  consolidated_primary_team: string;
  consolidated_teams: string[];
}

interface IConsolidatedTeam extends ITeam {
  settings: {
    consolidatedPrimaryTeam: string;
    consolidatedTeams: ITeam["id"][];
    channelId: string;
  };
}

export type { IUser, IManager, ITeam, IConsolidatedTeam };
