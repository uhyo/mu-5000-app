import { CSSProperties, useEffect, useRef } from "react";
import { LinksFunction } from "remix";
import { Twemoji } from "~/components/utils/Twemoji";
import { useClientOnly } from "~/utils/useClientOnly";
import { KeyType, useInputContext } from "../InputContext";
import styles from "./ControlPad.css";

const padSize = "128px";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const ControlPad: React.VFC = () => {
  const { inputDown, inputUp } = useInputContext();
  const pointerIsDown = useRef<number | null>(null);
  const pointerPosition = useRef<KeyType | null>(null);
  function handlePointerState(
    prevIsDown: number | null,
    prevPosition: KeyType | null
  ) {
    if (prevIsDown === null && pointerIsDown.current !== null) {
      if (pointerPosition.current !== null) {
        inputDown(pointerPosition.current);
      }
    } else if (prevIsDown !== null && pointerIsDown.current === null) {
      if (prevPosition !== null) {
        inputUp(prevPosition);
      }
    } else if (prevPosition === null && pointerPosition.current !== null) {
      if (pointerIsDown.current !== null) {
        inputDown(pointerPosition.current);
      }
    } else if (prevPosition !== null && pointerPosition.current === null) {
      if (pointerIsDown.current !== null) {
        inputUp(prevPosition);
      }
    }
  }
  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    const prev = pointerIsDown.current;
    pointerIsDown.current = e.pointerId;
    handlePointerState(prev, pointerPosition.current);
  }
  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      if (pointerIsDown.current === e.pointerId) {
        e.preventDefault();
      }
    }
    function handlePointerUp(e: PointerEvent) {
      if (pointerIsDown.current === e.pointerId) {
        pointerIsDown.current = null;
        handlePointerState(e.pointerId, pointerPosition.current);
      }
    }
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [inputUp]);
  function handlePointerEnter(e: React.PointerEvent, key: KeyType) {
    const prev = pointerPosition.current;
    pointerPosition.current = key;
    handlePointerState(pointerIsDown.current, prev);
  }
  function handlePointerOut(e: React.PointerEvent, key: KeyType) {
    if (pointerPosition.current === key) {
      pointerPosition.current = null;
      handlePointerState(pointerIsDown.current, key);
    }
  }
  const pad = useClientOnly(
    <Twemoji wrapper="div">
      <div
        onPointerDown={handlePointerDown}
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        className="control-pad"
        style={
          {
            "--pad-size": padSize,
          } as CSSProperties
        }
      >
        <button
          onPointerOver={(e) => handlePointerEnter(e, "ArrowUp")}
          onPointerLeave={(e) => handlePointerOut(e, "ArrowUp")}
          className="control-pad-button"
          style={{
            gridArea: "1 / 2",
          }}
        >
          ⬆️
        </button>
        <button
          onPointerOver={(e) => handlePointerEnter(e, "ArrowRight")}
          onPointerLeave={(e) => handlePointerOut(e, "ArrowRight")}
          className="control-pad-button"
          style={{
            gridArea: "2 / 3",
          }}
        >
          ➡️
        </button>
        <button
          onPointerOver={(e) => handlePointerEnter(e, "ArrowDown")}
          onPointerLeave={(e) => handlePointerOut(e, "ArrowDown")}
          className="control-pad-button"
          style={{
            gridArea: "3 / 2",
          }}
        >
          ⬇️
        </button>
        <button
          onPointerOver={(e) => handlePointerEnter(e, "ArrowLeft")}
          onPointerLeave={(e) => handlePointerOut(e, "ArrowLeft")}
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
