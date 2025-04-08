import { PostForm } from "./_components/form";

export default async function NewPage() {
  return (
    <div className="text-center my-10">
      <h1 className="text-4xl font-bold">New work</h1>
      <PostForm />
    </div>
  );
}
