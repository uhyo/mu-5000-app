import { memo, useMemo } from "react";
import { Link } from "remix";
import { appOrigin } from "~/logic/env";
import { getOrElse } from "~/utils/getOrElse";
import { useItemsStore } from "../items/ItemsStoreContext";

export const AreaNav: React.VFC = () => {
  return (
    <p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          textDecoration: "none",
          color: "black",
          backgroundColor: "#eeeeee",
          margin: "4px",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        Top Page
      </Link>
    </p>
  );
};

export const ShareButton: React.VFC = memo(() => {
  const { items } = useItemsStore();
  const mu = getOrElse(items, "mu", 0);
  const url = useMemo(() => {
    const text =
      mu > 0
        ? `I collected ${mu} 🈚️s in the 🈚️ dungeon!`
        : "The 🈚️ Dungeon\n";
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(appOrigin)}&hashtags=${encodeURIComponent(
      "無5000"
    )}&via=uhyo_`;
  }, [mu]);
  return (
    <p>
      <a
        href={url}
        target="_blank"
        rel="external noopener"
        style={{
          display: "inline-block",
          textDecoration: "none",
          backgroundColor: "#1e9bf0",
          color: "#ffffff",
          margin: "4px",
          padding: "8px",
          borderRadius: "8px",
          font: "inherit",
        }}
      >
        Share
      </a>
    </p>
  );
});
