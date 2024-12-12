import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../db/mongodb";
import Task from "../../../../../model/task";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const Task = await Task.findOne({ _id: id });
  return NextResponse.json({ Task }, { status: 200 });
}

export async function DELETE(request, {params}){
  const {id} = params;
  await connectMongoDB();
  await Task.findByIdAndDelete({_id:id});
  return NextResponse.json({message: "Task Deleted"}, {status: 200});
}