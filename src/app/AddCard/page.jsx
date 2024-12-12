"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Make sure you import this correctly

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";

export default function AddCard() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(""); // Corrected typo: 'setpriority' to 'setPriority'
  const [description, setDescription] = useState("");
  const [duedate, setDueDate] = useState("");

  const router = useRouter(); // Router initialization

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on submit
    console.log("Form submitted");
    console.log("Due Date:", duedate);
    if (!title || !duedate) {
      alert("Title and Due Date are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, priority, description, duedate }), // Data being sent
      });

      const data = await res.json(); // Ensure correct variable is used here

      if (res.ok) {
        console.log(data); // Log the response data
        router.push("/"); // Redirect to home page after task creation
      } else {
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors
    }
  };

  return (
    <div className="p-20 justify-center">
      <div className="flex bg-black w-full rounded-lg p-2 mb-8 justify-between items-center">
        <Link href={'/'} className="text-white">Task Manager</Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/AddCard"}
        >
          Add Task
        </Link>
      </div>
      <Card className="m-10 justify-center items-center">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create Task</CardTitle>
            <CardDescription>Write details of your task.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of your task"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="priority">Status</Label>
                <Select onValueChange={(value) => setPriority(value)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In_Progress">In Progress</SelectItem>
                    <SelectItem value="Not_Started">Not Started</SelectItem>
                    <SelectItem value="Archieved">Archieved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Task Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description of your task"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duedate">Task Due Date</Label>
                <Input
                  id="duedate"
                  value={duedate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="Due Date of your task"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Cancel
            </Button>
            {/* The submit button is now inside the form */}
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
