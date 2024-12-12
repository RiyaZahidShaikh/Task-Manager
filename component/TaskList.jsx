"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Fetch topics from API
const getTasks = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/task", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading topics", error);
    return { task: [] }; // Return an empty array on error
  }
};

export default function TaskList() {
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  const [checkedState, setCheckedState] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const removeTask = async (task) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/task/${task._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
      }
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);


  if (loading) return <p>Loading tasks...</p>; // Display loading state
  if (error) return <p>Error loading tasks: {error}</p>; // Display error state

  return (
    <div className="flex flex-col gap-2 w-full">
      {tasks.map((t) => (
        <Card
          key={t._id}
          className="hover:shadow-2xl hover:scale-105 w-[100%] gap-2"
        >
          <CardHeader>
            <div className="flex w-full space-x-2">
              <CardTitle
                className={
                  checkedState[t._id] ? "line-through text-gray-400" : ""
                }
              >
               Task Title: {t.title}
              </CardTitle>
            </div>
            <CardDescription
              className={
                checkedState[t._id] ? "line-through text-gray-400" : ""
              }
            >
             Task Description: {t.description}
            </CardDescription>
            <CardDescription
              className={
                checkedState[t._id] ? "line-through text-gray-400" : ""
              }
            >
             Task Status: {t.priority}
            </CardDescription>
            <CardDescription
              className={
                checkedState[t._id] ? "line-through text-gray-400" : ""
              }
            >
             Due Date: {t.duedate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end gap-2">
              <Button onClick={() => removeTask(t)}>Delete</Button>
              {/* <Link href={`/editTopic/${t._id}`}>
                Edit
              </Link> */}
            </div>
          </CardContent>
          <CardFooter>
            <p>
            Last Modified Date:
              {!t.updatedAt
                ? new Date(t.createdAt).toLocaleDateString()
                : new Date(t.updatedAt).toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
