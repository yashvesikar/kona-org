## Getting Started

[Figma Link](https://www.figma.com/file/ACOu2yP0Hs7PnI5T4ev3U6/Kona-take-home?node-id=5%3A3)

[Loom Link](https://www.loom.com/share/cbcae85123e1445187aa0bd80710babc)
### Pre-requisites

Please have the following software installed to run this project:

- python 3.8+
- node 14+
- npm 7.2+

### Setting up the DB and API

> NOTE: This probably doesn't need to be done since I committed the repo with the db and prisma client already setup - mostly for future reference.

- Navigate from the project root in to `scripts/` and run the following command

```bash
python process_data.py
```

This should create a `kona.db` sqlite3 database in the `prisma/` directory

- `npx prisma db pull` - Creates the prisma db schema
- `npx prisma generate` - Creates the prisma client

### Running the application

Navigate back to the root of the application and run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You should see on the left hand side bar some links to consolidated channels - go ahead and click on one of the links and it should take you to `http://localhost:3000/channels/[id]` and show you the consolidated channels dashboard.

# Considerations:

- What kind of data do we want to display?

  > It's important to display information that the user can relate to and understand. In the case of consolidated teams this means names of teams and managers that other admins/users will quickly recognize and have the option to view in greater detail should they choose to.
  > Made an intentional decision to exclude subTeams relationships to parent teams - time based constraint.

- What's the best way to visualize this kind of data in a way that will make structure clear with a quick glance?

  > I dabbled with a few ideas, and finally settled on a "safe" structured/interactive dashboard/chart approach. Given the constraints of time, data, and size of these consolidated teams I felt the standard dashboard made the most sense. Would have loved to play around with an idea like this though: https://observablehq.com/@sandravizmad/force-directed-layout where the user gets zoomed in and out of subnetworks and they interact with it.

- How important is it to optimize for speed, especially for complicated team structures?

  > The structure of the data currently is non-ideal hence why I chose to put it in a db. Ideally I would have liked to spin up Postgres or MySql but it was overkill for a project of this size. Speed of the structure will only really start mattering if the system remains on REST as overfetching with complex structures becomes an issue quickly. Graphql is the ideal solution for a problem like this as you minimize queries + many of these the queries can be cached. Not concered about speed in this case because the number of concurrent users on an application like this is quite managable.

- What do admin users care about? Is this level of visualization enough, or do they need the ability to also modify each individual team/channel? What's the value of a view like this?
  > For the sake of this exercise I assumed admins only cared about seeing the data. The consolidated teams/channel page seems like the natural place to edit the teams and eventually we would want to build that functionality into this page itself.

# Closing notes

- Used Prisma because I have wanted to try it for a while and this felt like a good time to try some new stuff.

- Lots of code cleanup necessary + typing is all over the place but tried to keep it relatively neat as I worked.
