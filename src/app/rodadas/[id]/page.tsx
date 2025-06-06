import { FinalResult } from "../_components/FinalResult";

export default async function Page(pageProps: PageProps) {
  const { id } = await pageProps.params;

  return (
    <>
      <FinalResult journeyId={id} />
    </>
  );
}
