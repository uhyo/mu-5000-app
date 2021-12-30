import React, { useEffect, useState } from "react";

/**
 * Hook to render children client-only due to use of useLayoutEffect.
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */
export function useClientOnly(children: React.ReactNode) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  return isClient ? children : null;
}
