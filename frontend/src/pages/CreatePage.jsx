import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/tasks", {
        taskTitle,
        taskDescription,
        priority,
        dueDate,
        isCompleted,
      });

      toast.success("Task created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error Creating Task", error);
      toast.error("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Tasks
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Create New Task
              </h2>

              <form onSubmit={handleSubmit}>

                {/* TASK TITLE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Task Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Task Title"
                    className="input input-bordered"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Task Description"
                    className="input input-bordered"
                    value={taskDescription}
                    onChange={(e) =>
                      setTaskDescription(e.target.value)
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
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* DUE DATE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Due Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                {/* COMPLETED */}
                <div className="form-control mb-6">
                  <label className="cursor-pointer label">
                    <span className="label-text">
                      Mark as Completed
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={isCompleted}
                      onChange={(e) =>
                        setIsCompleted(e.target.checked)
                      }
                    />
                  </label>
                </div>

                {/* SUBMIT */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Task"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;