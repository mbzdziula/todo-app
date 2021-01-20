import { PrismaClient } from '@prisma/client';
import auth0 from './utils/auth0';

const prisma = new PrismaClient();

export default auth0.requireAuthentication(async function handler(req, res) {
  const { user } = await auth0.getSession(req);
  switch (req.method) {
    case 'POST': {
      const todo = req.body;
      const result = await prisma.todos.create({
        data: {
          Todo: todo.Todo,
          Like: todo.Like,
          Project: todo.Project,
          Date: null,
          User: user.sub,
        },
      });
      return res.json(result);
    }
    case 'DELETE': {
      const Id = req.body;
      const result = await prisma.todos.delete({ where: { Id: Id.Id } });
      return res.json(result);
    }
    case 'PATCH': {
      const updateTodo = req.body;
      const result = await prisma.todos.update({
        where: { Id: updateTodo.Id },
        data: {
          Todo: updateTodo.Todo,
          IsDone: updateTodo.IsDone,
          Like: updateTodo.Like,
          Comment: updateTodo.Comment,
          Date: updateTodo.Date,
          Project: updateTodo.Project,
          ProjectId: updateTodo.ProjectId,
        },
      });
      return res.json(result);
    }
    default: {
      const result = await prisma.todos.findMany({
        where: {
          User: user.sub,
        },
        orderBy: [
          {
            IsDone: 'asc',
          },
          {
            Like: 'desc',
          },
          {
            Id: 'asc',
          },
        ],
      });
      return res.json(result);
    }
  }
});
