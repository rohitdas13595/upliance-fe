import DefaultLayout from "@/layouts/default";
import { RichTextEditor } from "@/components/rte/rte";
import { Counter } from "@/components/counter/Counter";
import { useState } from "react";
import "../components/rte/styles.css";
import { cn } from "@/utils/cn";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { UserForm } from "@/components/home/userFrom";
import { DataView } from "@/components/home/data";
import Cards from "@/components/home/cards";

export default function IndexPage() {
  const [count, setCount] = useState(0);
  const [content, setContent] = useState("");

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.email) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <DefaultLayout>
      <div className="flex flex w-full flex-col items-center max-w-[1280px] justify-center gap-32 py-8 md:py-10 overflow-hidden">
        <div className="w-full flex flex-col gap-4 lg:flex-row  ">
          <div className="w-full flex">
            <Counter count={count} setCount={setCount} />
          </div>
          <div className="w-full flex flex-col gap-4">
            <RichTextEditor
              setContent={setContent}
              content={content}
              limit={5000}
            />
            <div className="border rounded overflow-hidden">
              <h2 className="bg-gray-800  p-2">Content</h2>
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className={cn("ProseMirror", "w-full p-4 ")}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 lg:flex-row">
          <div className="w-full border rounded overflow-hidden  p-4">
            <DataView />
          </div>
          <div className="w-full border rounded p-4">
            <UserForm />
          </div>
        </div>
        <div className="mb-12">Photos</div>
        <div className="w-full flex overflow-hidden w-full justify-center items center ">
          <Cards />
        </div>
        <div className="mt-12">
          <div className="w-full flex flex-col gap-4 lg:flex-row">End</div>
        </div>
      </div>
    </DefaultLayout>
  );
}
