import { Divider } from "@/components/ui";
import {
  BestHandAndEliminator,
  FinalResult,
  JourneyActions
} from "../_components";
import { getJourneyById } from "@/services/actions";

export default async function Page(pageProps: PageProps) {
  const { id } = await pageProps.params;
  const journey = await getJourneyById(id);

  return (
    <>
      <FinalResult journeyId={id} />
      <Divider className="my-4" />
      <BestHandAndEliminator journey={journey} />
      <JourneyActions journey={journey} />
    </>
  );
}
