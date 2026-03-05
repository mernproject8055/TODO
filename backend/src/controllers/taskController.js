import Task from "../models/taskModel.js";

export async function createTask(req, res) {
  try {
    const { taskTitle, taskDescription, priority, dueDate, isCompleted } = req.body;

    if (!taskTitle) {
      return res.status(400).json({ message: "Task title required" });
    }

    const task = new Task({
      taskTitle,
      taskDescription,
      priority,
      dueDate,
      isCompleted,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);

  } catch (error) {
    console.error("createTask error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function getAllTasks(req, res) {
  try {
    const { search, priority, status } = req.query;

    let query = {};

    if (search) {
      query.taskTitle = { $regex: search, $options: "i" };
    }

    if (priority) {
      query.priority = priority;
    }

    
    if (status === "completed") query.isCompleted = true;
    if (status === "pending") query.isCompleted = false;

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {
    console.error("getAllTasks error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);

  } catch (error) {
    console.error("getTaskById error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function updateTask(req, res) {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updated);

  } catch (error) {
    console.error("updateTask error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function deleteTask(req, res) {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error("deleteTask error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function taskStats(req, res) {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: ["$isCompleted", 1, 0] }
          },
          pendingTasks: {
            $sum: { $cond: ["$isCompleted", 0, 1] }
          }
        }
      }
    ]);

    res.status(200).json(stats[0]);

  } catch (error) {
    console.error("taskStats error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
