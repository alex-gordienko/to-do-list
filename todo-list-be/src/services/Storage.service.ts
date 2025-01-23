import prisma from './Prisma';


class StorageService {
  constructor() { }

  public async getTasks() { 
    try {
      const result = await prisma.tasks.findMany();

      return result;
    } catch (error) {
      console.error("Error getting tasks", error);
    }
  }

  public async createTask(title: string, color: string) { 
    try {
      const result = await prisma.tasks.create({
        data: {
          title,
          color,
        },
      });

      return result;
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  public async updateTaskStatus(id: number, status: "inProgress" | "done") { 
    try {
      const result = await prisma.tasks.update({
        where: { id },
        data: {
          status,
        },
      });

      return result;
    } catch (error) {
      console.error("Error updating task status", error);
    }
  }

  public async editTask(id: number, title: string, color: string) { 
    try {
      const result = await prisma.tasks.update({
        where: { id },
        data: {
          title,
          color,
        },
      });

      return result;
    } catch (error) {
      console.error("Error updating task", error);
    }
  }

  public async deleteTask(id: number) { 
    try {
      const result = await prisma.tasks.delete({
        where: { id },
      });

      return result;
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }
}

export default StorageService;