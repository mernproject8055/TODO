import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const TaskDetailPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (error) {
        console.error("Error fetching task", error);
        toast.error("Failed to fetch the task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting task", error);
      toast.error("Failed to delete task");
    }
  };

  const handleSave = async () => {
    if (!task.taskTitle.trim()) {
      toast.error("Please add task title");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/tasks/${id}`, {
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        priority: task.priority,
        isCompleted: task.isCompleted,
      });

      toast.success("Task updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating task", error);
      toast.error("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Tasks
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Task
            </button>
          </div>

          {/* FORM CARD */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              {/* TASK TITLE */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Task title"
                  className="input input-bordered"
                  value={task.taskTitle}
                  onChange={(e) =>
                    setTask({ ...task, taskTitle: e.target.value })
                  }
                />
              </div>

              {/* DESCRIPTION */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Task description"
                  className="input input-bordered"
                  value={task.taskDescription || ""}
                  onChange={(e) =>
                    setTask({ ...task, taskDescription: e.target.value })
                  }
                />
              </div>

              {/* PRIORITY */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <select
                  className="select select-bordered"
                  value={task.priority}
                  onChange={(e) =>
                    setTask({ ...task, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* COMPLETION STATUS */}
              <div className="form-control mb-6">
                <label className="cursor-pointer label">
                  <span className="label-text">Mark as Completed</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={task.isCompleted}
                    onChange={(e) =>
                      setTask({ ...task, isCompleted: e.target.checked })
                    }
                  />
                </label>
              </div>

              {/* ACTION */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;