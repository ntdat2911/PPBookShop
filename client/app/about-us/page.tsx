import { getAboutUs } from "@/services/about-us/services";

export default async function Page({ searchParams }: any) {
  const content = await getAboutUs();
  return (
    <div className="container pt-12">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
