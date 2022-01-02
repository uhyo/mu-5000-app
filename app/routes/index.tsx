import { Link, LinksFunction } from "remix";
import { floorChars } from "~/components/area/Map";
import { Twemoji } from "~/components/utils/Twemoji";
import { landChars } from "~/logic/area/landDef";
import { itemNames } from "~/logic/item/itemDef";
import styles from "~/styles/routes/index.css";
import { useClientOnly } from "~/utils/useClientOnly";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
  const emojiPrerendering = useClientOnly(
    <div hidden style={{ display: "none" }}>
      <Twemoji wrapper="span">
        {[
          ...Object.values(floorChars),
          ...Object.values(landChars),
          ...Object.values(itemNames),
        ].join("")}
      </Twemoji>
    </div>
  );
  return (
    <div className="index-container">
      <h1>The 無 Dungeon</h1>
      <p>
        Celebrate{" "}
        <a href="https://twitter.com/uhyo_" rel="external noopener">
          @uhyo_
        </a>{" "}
        having reached 5,000 followers by collecting 5,000 🈚️s in a
        random-generated dungeon!
      </p>
      <h2>How to play</h2>
      <p>
        Use either keyboard's arrow keys or on-display arrow pads to move 🏃.
      </p>
      <p>
        Touch an item to consume it. Some of items are only effective on certain
        condition.
      </p>
      <h2>Goal</h2>
      <p>
        Collect 5,000 🈚️s to reach the ending. You will also need to collect
        ✨s to unlock new areas and new items.
      </p>
      <h2>Save Data</h2>
      <p>Data is saved in Indexed Database in your browser.</p>
      <nav>
        <Link prefetch="intent" className="start-button" to="/area/0000">
          START
        </Link>
      </nav>
      <footer>
        <p>
          <small>
            This application uses{" "}
            <a href="https://twemoji.twitter.com/" rel="external noopener">
              Twemoji
            </a>{" "}
            licensed under CC-BY 4.0.
          </small>
        </p>
      </footer>
      {/* prerendering of Twemojis */}
      {emojiPrerendering}
    </div>
  );
}
