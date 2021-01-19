import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { Project } = req.body;
      const result = await prisma.projects.create({
        data: {
          Project: Project,
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
      const result = await prisma.projects.findMany({});
      return res.json(result);
    }
  }
}
