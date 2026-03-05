import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Clock, Edit2, Trash2, AlertCircle } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const TaskCard = ({ task, setTasks }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const isActive = location.pathname === `/task/${task._id}`;

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${task._id}`);
            setTasks((prev) => prev.filter((t) => t._id !== task._id));
            toast.success("Task Deleted Successfully");
        } catch {
            toast.error("Failed to delete task");
        } finally {
            setShowModal(false);
        }
    };

    return (
        <>
            {/* CARD */}
            <Link
                to={`/task/${task._id}`}
                className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 
                ${isActive ? "border-primary shadow-lg" : "border-base-300"} 
                hover:border-primary shadow-xl`}
            >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                    <p className="text-xs text-base-content/60 truncate">{task._id}</p>
                    <span className="badge badge-secondary capitalize">
                        {task.priority}
                    </span>
                </div>

                {/* Task Title */}
                <div className="flex items-center gap-2">
                    <AlertCircle className="size-4 text-primary" />
                    <p className="font-medium text-base-content line-clamp-1">
                        {task.taskTitle}
                    </p>
                </div>

                {/* Task Description */}
                <div className="flex items-center gap-2 text-base-content/70">
                    <Clock className="size-4 text-primary" />
                    <p className="text-sm line-clamp-1">
                        {task.taskDescription}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs text-base-content/60">
                        {formatDate(task.createdAt)}
                    </span>

                    {/* Status */}
                    <span className={`badge ${task.isCompleted ? "badge-success" : "badge-warning"}`}>
                        {task.isCompleted ? (
                            <CheckCircle className="size-3 mr-1" />
                        ) : (
                            <Clock className="size-3 mr-1" />
                        )}
                        {task.isCompleted ? "Completed" : "Pending"}
                    </span>

                    {/* Action Icons */}
                    <div className="flex items-center gap-4">
                        {/* EDIT */}
                        <div className="tooltip tooltip-warning" data-tip="Edit task">
                            <Edit2 className="size-4 text-warning hover:scale-110 transition" />
                        </div>

                        {/* DELETE */}
                        <div className="tooltip tooltip-error" data-tip="Delete task">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowModal(true);
                                }}
                                className="text-error hover:scale-110 transition"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>

            {/* DELETE CONFIRMATION MODAL */}
            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-error flex items-center gap-2">
                            <Trash2 className="size-5" />
                            Delete Task
                        </h3>
                        <p className="py-4 text-base-content/70">
                            Are you sure you want to delete
                            <span className="font-semibold text-base-content">
                                {" "} "{task.taskTitle}"
                            </span>?
                            <br />
                            This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error flex items-center gap-2"
                                onClick={handleDelete}
                            >
                                <Trash2 className="size-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default TaskCard;