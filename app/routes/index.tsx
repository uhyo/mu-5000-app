import { LinksFunction } from "remix";
import styles from "~/styles/routes/index.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
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
        <a className="start-button" href="/area/0000">
          START
        </a>
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
    </div>
  );
}
