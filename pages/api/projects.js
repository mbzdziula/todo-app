import { PrismaClient } from '@prisma/client';
import auth0 from './utils/auth0';

const prisma = new PrismaClient();

export default auth0.requireAuthentication(async function handler(req, res) {
  const { user } = await auth0.getSession(req);

  switch (req.method) {
    case 'POST': {
      const { Project } = req.body;
      const result = await prisma.projects.create({
        data: {
          Project: Project,
          User: user.sub,
        },
      });
      return res.json(result);
    }
    case 'DELETE': {
      const Id = req.body;
      const result = await prisma.projects.delete({ where: { Id: Id.Id } });
      return res.json(result);
    }
    case 'PATCH': {
      const updateProject = req.body;
      const result = await prisma.projects.update({
        where: { Id: updateProject.Id },
        data: {
          Project: updateProject.Project,
        },
      });
      return res.json(result);
    }
    default: {
      const result = await prisma.projects.findMany({
        where: {
          User: user.sub,
        },
      });
      return res.json(result);
    }
  }
});
