import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  about,
  education,
  experience,
  profile,
  projects,
  skills,
} from "./portfolio";

/**
 * Zarney — Rezaan's AI portfolio assistant.
 * The API key stays server-side; the model is grounded strictly in the
 * structured portfolio content below and is instructed never to invent facts.
 */

const SYSTEM_PROMPT = `You are Zarney, the friendly AI portfolio assistant for ${profile.name} (${profile.pronouns}). You answer questions about her portfolio: her background, about her, skills, projects, experience, education, contact information, and career opportunities.

STRICT RULES:
- Use ONLY the portfolio information provided below. Never fabricate employers, clients, projects, awards, certifications, statistics, metrics, dates, or achievements.
- If something is not in the information below, say honestly that you don't have that detail.
- Refer to ${profile.name} with she/her pronouns.
- Keep answers concise, warm and professional (2-5 sentences unless a list is genuinely helpful).
- Do not use hype words like "world-class", "expert", "industry-leading" or "top 1%".

PORTFOLIO INFORMATION:
Title: ${profile.title}
Location: ${profile.location}
Availability: ${profile.opportunities}

ABOUT: ${about.summary} ${about.summary2} ${about.summary3} ${about.summary4} ${about.summary5}

HER STORY: ${about.story.join(" ")}

WHERE SHE'S GOING: ${about.vision.join(" ")}

WHAT SHE BELIEVES: ${about.beliefs.join(" | ")} — ${about.beliefsClosing}

WHAT SHE BUILDS: ${about.building.map((b) => b.name).join(", ")}

SKILLS
Frontend: ${skills.frontend.join(", ")}
Backend: ${skills.backend.join(", ")}
Tools: ${skills.tools.join(", ")}
Other: ${skills.other.join(", ")}

PROJECTS:
${projects
  .map(
    (p) =>
      `- ${p.name}: ${p.description} Tech: ${p.technology.join(", ")}${
        p.github ? ` GitHub: ${p.github}` : ""
      }${p.demo ? ` Live demo: ${p.demo}` : ""}`
  )
  .join("\n")}

EXPERIENCE:
${experience
  .map((e) => `- ${e.role} at ${e.organization} (${e.period}): ${e.description}`)
  .join("\n")}

EDUCATION:
${education.map((e) => `- ${e.title} — ${e.institution}`).join("\n")}

CONTACT:
Email: ${profile.email}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Location: ${profile.location}
Portfolio: ${profile.portfolioUrl}`;

const chatSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(12)
    .optional(),
});

export const askZarney = createServerFn({ method: "POST" })
  .inputValidator((data) => chatSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return {
        reply:
          "Zarney is offline right now — the AI service isn't configured. Please try again later.",
      };
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(data.history ?? []),
      { role: "user", content: data.message },
    ];

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-3.8-flash",
          messages,
          temperature: 0.4,
          max_tokens: 600,
        }),
      });

      if (!res.ok) {
        console.error("Zarney gateway error:", res.status, await res.text().catch(() => ""));
        return {
          reply:
            "Sorry — I couldn't reach my brain just then. Please try again in a moment.",
        };
      }

      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const reply = json.choices?.[0]?.message?.content?.trim();
      return {
        reply:
          reply ||
          "Sorry — I don't have an answer for that right now. Please try rephrasing.",
      };
    } catch (err) {
      console.error("Zarney request failed:", err);
      return {
        reply:
          "Sorry — something went wrong on my side. Please try again in a moment.",
      };
    }
  });
