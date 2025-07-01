import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const country = searchParams.get("ctry") || "DEU"
  const a1 = searchParams.get("a1") || ""
  const a2 = searchParams.get("a2") || ""
  const postal = searchParams.get("postal") || ""

  const apiUrl = `https://global-address.p.rapidapi.com/V3/WEB/GlobalAddress/doGlobalAddress?format=json&ctry=${country}&a1=${encodeURIComponent(a1)}&a2=${encodeURIComponent(a2)}&postal=${postal}&DeliveryLines=Off`

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-host": "global-address.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      },
    })

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
  } catch {
    return new Response(JSON.stringify({ error: "API call failed" }), { status: 500 })
  }
}
