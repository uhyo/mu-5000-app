import { CSSProperties } from "react";
import { LinksFunction } from "remix";
import { Twemoji } from "~/components/utils/Twemoji";
import { useClientOnly } from "~/utils/useClientOnly";
import styles from "./ControlPad.css";

const padSize = "128px";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const ControlPad: React.VFC = () => {
  const pad = useClientOnly(
    <Twemoji wrapper="div">
      <div
        className="control-pad"
        style={
          {
            "--pad-size": padSize,
          } as CSSProperties
        }
      >
        <button
          className="control-pad-button"
          style={{
            gridArea: "1 / 2",
          }}
        >
          ⬆️
        </button>
        <button
          className="control-pad-button"
          style={{
            gridArea: "2 / 3",
          }}
        >
          ➡️
        </button>
        <button
          className="control-pad-button"
          style={{
            gridArea: "3 / 2",
          }}
        >
          ⬇️
        </button>
        <button
          className="control-pad-button"
          style={{
            gridArea: "2 / 1",
          }}
        >
          ⬅️
        </button>
      </div>
    </Twemoji>
  );
  return <>{pad}</>;
};
