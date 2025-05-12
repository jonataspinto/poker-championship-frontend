import { ReactNode } from 'react';

type ConditionalRenderProps = {
  condition?: boolean;
  children?: ReactNode;
  fallback?: ReactNode;
};

export function ConditionalRender({
  condition = true,
  fallback = null,
  children
}: ConditionalRenderProps) {
  return condition ? children : fallback;
}
