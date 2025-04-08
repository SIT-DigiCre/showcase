import H1 from "@/components/common/H1";
import { SettingForm } from "./_components/form";
import { auth } from "@/auth";

export default async function SearchPage() {
  const session = await auth();
  if (!session || !session.user) {
    return (
      <div className="text-center my-10">Please login to see this page</div>
    );
  }

  return (
    <>
      <H1>Settings</H1>
      <SettingForm defaultValue={session.user} />
    </>
  );
}
