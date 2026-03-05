import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import TaskCard from "../components/TaskCard";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Tasks With Query Params
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: {
          search,
          priority,
          status,
        },
      });

      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const res = await api.get("/tasks/stats");
      setStats(res.data || {});
    } catch (error) {
      console.log("Stats error", error);
    }
  };

  // Run when filters change
  useEffect(() => {
    fetchTasks();
  }, [search, priority, status]);

  // Run once for stats
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">

        {/*  SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/*  FILTER SECTION */}
        <div className="flex gap-4 mb-6 flex-wrap">

          {/* Priority Filter */}
          <select
            className="select select-bordered"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Status Filter */}
          <select
            className="select select-bordered"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

        </div>

        {/*  STATS DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="stat-title">Total Tasks</div>
            <div className="stat-value text-primary">
              {stats.totalTasks || 0}
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">
              {stats.completedTasks || 0}
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-error">
              {stats.pendingTasks || 0}
            </div>
          </div>
        </div>

        {/*  TASK LIST */}
        {loading ? (
          <div className="text-center py-10">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500">
            No tasks found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                setTasks={setTasks}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;
