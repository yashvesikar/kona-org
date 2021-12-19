import argparse
import os
import sqlite3
import json
'''
This script is used to process the data from json into the database.
I chose sqlite because it is easy to use and it is easy to understand and don't need extra libraries.
Ideally would use something like postgres for array support + speed and extensions.
''' 

if __name__ == '__main__':
  print("Processing data...")
  parser = argparse.ArgumentParser(description='Process data')
  parser.add_argument('--file', type=str, required=False, default='data_small.json')
  parser.add_argument('--database', type=str, required=False, default='../prisma/kona.db')
  args = parser.parse_args()
  DB_NAME = args.database
  # Read the file 
  with open(args.file, 'r') as fp:
    data = json.loads(fp.read())
  
  CREATE_DB = not os.path.isfile(DB_NAME)
  con = sqlite3.connect(DB_NAME)
  cur = con.cursor()

  if (True or CREATE_DB): 
    print('Creating database...')
    # Create teams table
    cur.execute('''CREATE TABLE IF NOT EXISTS teams
                (
                  id integer PRIMARY KEY,
                  team_id text,
                  name text NOT NULL,
                  manager text NOT NULL,
                  manager_id text NOT NULL,
                  directs text, 
                  channel_id text, 
                  consolidated_primary_team text, 
                  consolidated_teams text
                )''')
    # Create users table
    cur.execute('''CREATE TABLE IF NOT EXISTS users
                (
                  id integer PRIMARY KEY,
                  user_id text,
                  name text NOT NULL,
                  manager text NOT NULL,
                  is_manager boolean
                )
    ''')

    pk_id = 0 # Not really used, only to make the primary key valid and to get prisma to work
    # Populate teams table
    for user_id, user_data in data.items():
      has_team = user_data.get('teams', False)
      if has_team:
        for team_id, team_data in user_data['teams'].items():
          id = f"{user_id}&{team_id}"
          name = team_data['name']
          manager = user_data['realName']
          manager_id = user_id
          directs = json.dumps(team_data['directs'])
          settings = team_data.get('settings', None)
          channel_id = settings.get('channel_id', None)
          consolidated_primary_team = settings.get('consolidatedPrimaryTeam', None)
          consolidated_teams = json.dumps(settings.get('consolidatedTeams', None))
          cur.execute(f"INSERT INTO teams VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?)", (pk_id, id, name, manager, manager_id, directs, channel_id, consolidated_primary_team, consolidated_teams))  
          pk_id += 1
      
      is_manager = bool(user_data.get('teams', False))
      cur.execute(f"INSERT INTO users VALUES (?, ?, ?, ?, ?)", (pk_id, user_id, user_data['realName'], json.dumps(user_data['manager']), is_manager))
      pk_id += 1

    # Save (commit) the changes
    con.commit()
    print(f"Successfully created {DB_NAME}")

  for row in cur.execute('SELECT * FROM teams'):
    print(row)

  for row in cur.execute('SELECT * FROM users'):
    print(row)
