// Serverless function (Vercel) — generates on-brand replies to Google reviews
// for Restaurant Rio using the Anthropic API. The API key stays server-side.
//
// Required environment variables (set them in Vercel → Settings → Environment
// Variables, then redeploy):
//   ANTHROPIC_API_KEY   your Anthropic API key (console.anthropic.com)
//   REVIEW_TOOL_TOKEN   a password you invent; the /respostes page asks for it
// Optional:
//   RIO_MODEL           model id (default: claude-haiku-4-5-20251001)

const SYSTEM_PROMPT = `Ets l'assistent de respostes a ressenyes del Restaurant Rio, un restaurant familiar d'Encamp (Andorra): cuina marroquina i àrab, pizzeria artesana i carns a la brasa, 100% halal. Telèfon +376 732 223.

La teva feina: redactar respostes a ressenyes de Google, per publicar en nom del restaurant.

Regles:
- Respon SEMPRE en el mateix idioma en què està escrita la ressenya (català, castellà, francès, anglès, àrab…).
- To càlid, proper, humà i professional. Res de respostes robòtiques ni genèriques.
- Dona les gràcies pel nom de la persona si el tens.
- Si esmenten un plat o un detall concret, fes-hi referència específica.
- Longitud: 2 a 4 frases. Concís.
- Ressenya positiva (4-5★): agraeix de cor, mostra alegria i convida a tornar.
- Ressenya neutra (3★): agraeix, reconeix el comentari, digues que seguireu millorant i convida a tornar.
- Ressenya negativa (1-2★): disculpa sincera, SENSE excuses ni to defensiu, assumeix la responsabilitat, i convida a contactar per telèfon (+376 732 223) per solucionar-ho. Mai discuteixis ni culpis el client. Mai neguis el que diu.
- Esmenta halal / cuina familiar / productes honestos només si encaixa de manera natural.
- Com a màxim una emoji, i opcional.
- Signa amb el nom de l'equip en l'idioma de la ressenya: ca "L'equip del Rio", es "El equipo del Rio", fr "L'équipe du Rio", en "The Rio team", ar "فريق ريو".

Dona EXACTAMENT 3 opcions diferents (varia el to i la llargada).

Respon NOMÉS amb JSON vàlid, sense cap altre text ni marcadors de codi, amb aquesta forma:
{"lang":"<codi iso de l'idioma>","replies":["opció 1","opció 2","opció 3"]}`;

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === "object") return resolve(req.body);
    if (typeof req.body === "string") {
      try { return resolve(JSON.parse(req.body)); } catch { return resolve({}); }
    }
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try { resolve(JSON.parse(data || "{}")); } catch { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const expected = process.env.REVIEW_TOOL_TOKEN;
  const token = req.headers["x-rio-token"] || "";
  if (!expected || token !== expected) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ error: "missing_api_key" });
    return;
  }

  const body = await readBody(req);
  const review = String(body.review || "").slice(0, 2000).trim();
  const rating = Math.max(0, Math.min(5, Number(body.rating) || 0));
  const name = String(body.name || "").slice(0, 80).trim();
  const context = String(body.context || "").slice(0, 400).trim();

  if (!review) {
    res.status(400).json({ error: "empty_review" });
    return;
  }

  const userMsg = [
    `Ressenya del client:`,
    `"""${review}"""`,
    ``,
    `Valoració: ${rating ? rating + " estrelles" : "no indicada"}`,
    name ? `Nom del client: ${name}` : `Nom del client: (no indicat)`,
    context ? `Context intern (no el copiïs literalment, només per orientar-te): ${context}` : ``,
  ].filter(Boolean).join("\n");

  let apiRes;
  try {
    apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.RIO_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
  } catch (e) {
    res.status(502).json({ error: "network_error", detail: String(e).slice(0, 200) });
    return;
  }

  if (!apiRes.ok) {
    const detail = (await apiRes.text().catch(() => "")).slice(0, 300);
    res.status(502).json({ error: "anthropic_error", status: apiRes.status, detail });
    return;
  }

  const data = await apiRes.json().catch(() => null);
  const text = data && Array.isArray(data.content)
    ? data.content.map((c) => c.text || "").join("").trim()
    : "";

  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) { try { parsed = JSON.parse(m[0]); } catch { /* ignore */ } }
  }

  if (!parsed || !Array.isArray(parsed.replies) || parsed.replies.length === 0) {
    // Fallback: hand back the raw text as a single reply so the tool still works.
    res.status(200).json({ lang: "", replies: text ? [text] : [], raw: !parsed });
    return;
  }

  res.status(200).json({
    lang: String(parsed.lang || ""),
    replies: parsed.replies.map((r) => String(r).trim()).filter(Boolean).slice(0, 3),
  });
}
