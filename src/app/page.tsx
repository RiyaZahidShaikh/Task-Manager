import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import TaskList from "../../component/TaskList";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex bg-black w-full rounded-lg p-2 justify-between items-center">
        <Link href={"/"} className="text-white">
          Task Manager
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/AddCard"}
        >
          Add Task
        </Link>
      </div>
      <main className="flex flex-col w-full row-start-2 justify-center items-center">
        <TaskList></TaskList>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/RiyaZahidShaikh/Task-Manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to my github →
        </a>
      </footer>
    </div>
  );
}
