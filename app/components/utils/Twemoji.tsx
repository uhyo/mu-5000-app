import twemoji from "twemoji";
import { useLayoutEffect, useRef } from "react";

export const Twemoji: React.VFC<{
  children: React.ReactNode;
  wrapper: "div" | "span";
}> = ({ children, wrapper: Wrapper }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      twemoji.parse(wrapperRef.current);
    }
  }, [children]);

  return <Wrapper ref={wrapperRef}>{children}</Wrapper>;
};
