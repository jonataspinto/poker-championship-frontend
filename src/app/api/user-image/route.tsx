import { ImageResponse } from "next/og";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "Poker Stars";
  const [firstName, secondName] = name.split(" ");

  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "150px",
            fontWeight: "bold",
            width: "100%",
            height: "100%"
          }}
        >
          <span>{firstName?.charAt(0).toUpperCase()}</span>
          <span>{secondName?.charAt(0).toUpperCase()}</span>
        </div>
      ),
      {
        width: 300,
        height: 300
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
}
