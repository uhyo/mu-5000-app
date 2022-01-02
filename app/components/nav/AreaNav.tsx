import { Link } from "remix";

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
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        Top Page
      </Link>
    </p>
  );
};
