import { PostForm } from "./_components/form";

export default async function NewPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold my-4">New work</h1>
      <PostForm />
    </div>
  );
}
