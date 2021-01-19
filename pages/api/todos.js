import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const todo = req.body;
      const result = await prisma.todos.create({
        data: {
          Todo: todo.Todo,
          Like: todo.Like,
          Project: todo.Project,
          Date: null,
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
        },
      });
      return res.json(result);
    }
    default: {
      const result = await prisma.todos.findMany({
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
}
