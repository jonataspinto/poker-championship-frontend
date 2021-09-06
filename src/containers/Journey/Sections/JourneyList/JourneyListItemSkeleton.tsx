import React from "react";
import { Skeleton } from "@material-ui/lab";
import {
  Accordion,
  AccordionSummary
} from "@material-ui/core";

export const JourneyListItemSkeleton = () => {
  const skeletonCount = new Array(5).fill(1);

  return (
    <>{
      skeletonCount.map((_, index) => {
        const key = `journeySkeleton#${index}`;

        return (
          <Accordion key={key}>
            <AccordionSummary>
              <Skeleton variant="text" width="100%" height="28px"/>
            </AccordionSummary>
          </Accordion>
        );
      })}
    </>
  )
};
