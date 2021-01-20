import { PrismaClient } from '@prisma/client';
import auth0 from './utils/auth0';

const prisma = new PrismaClient();

export default auth0.requireAuthentication(async function handler(req, res) {
  switch (req.method) {
    case 'PATCH': {
      const updateTodo = req.body;
      const result = await prisma.todos.updateMany({
        where: { ProjectId: updateTodo.Id },
        data: {
          Project: updateTodo.Project,
        },
      });
      return res.json(result);
    }
    case 'DELETE': {
      const Id = req.body;
      const result = await prisma.todos.deleteMany({ where: { ProjectId: Id.Id } });
      return res.json(result);
    }

    default: {
      return;
    }
  }
});
