import H1 from "@/components/common/H1";
import { SearchField } from "@/components/ui/search-field";

export default async function SearchPage() {
  return (
    <>
      <H1>Search</H1>
      <SearchField aria-label="Search" placeholder="Search" />
    </>
  );
}
