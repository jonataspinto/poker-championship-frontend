import { FinalResult } from "../_components/FinalResult";

export default function Page(pageProps: PageProps<"id">) {
  const { id } = pageProps.params;

  return (
    <>
      <FinalResult journeyId={id} />
    </>
  );
}
