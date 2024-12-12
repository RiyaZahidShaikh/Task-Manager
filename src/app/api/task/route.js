import { NextResponse } from "next/server";
import connectMongoDB from "../../../../db/mongodb";
import Task from "../../../../model/task";

export async function POST(request) {
  try {
    // Attempt to parse JSON
    let data;
    try {
      data = await request.json();
      console.log("Received data:", data);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format in request body" },
        { status: 400 }
      );
    }

    // Destructure and validate fields
    const { title, description, priority, duedate } = data;
    if (!title || !duedate) {
      return NextResponse.json(
        { error: "Title and Due Date are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB and create the task
    await connectMongoDB();
    const task = await Task.create({ title, priority, description, duedate });

    return NextResponse.json(
      { message: "Task Created", task },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const tasks = await Task.find();
    // console.log(tasks)

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
