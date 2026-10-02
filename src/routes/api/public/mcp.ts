import { createFileRoute } from "@tanstack/react-router";
import {
  about,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/lib/portfolio";

/**
 * Public read-only MCP (Model Context Protocol) server for the portfolio.
 * Implements the streamable-HTTP transport subset over JSON-RPC 2.0 at
 * /api/public/mcp — AI clients (Claude, ChatGPT, Cursor, etc.) can connect
 * and read structured portfolio data. No authentication: all data is
 * intentionally public and strictly read-only.
 */

const PROTOCOL_VERSION = "2025-06-18";

const TOOLS = [
  {
    name: "get_profile",
    description:
      "Rezaan Achmat Fredericks' professional profile: title, location, summary, story, current work, beliefs and availability.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
  },
  {
    name: "get_skills",
    description: "Rezaan's skills grouped into Frontend, Backend, Tools and Other.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
  },
  {
    name: "list_projects",
    description:
      "All portfolio projects with name, description, technology, GitHub link and live demo where available.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
  },
  {
    name: "get_experience_and_education",
    description: "Professional experience and education history.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
  },
  {
    name: "get_contact_info",
    description:
      "Contact information: email, GitHub, LinkedIn, location, portfolio URL and opportunities sought.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
  },
];

function toolResult(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function handleToolCall(name: string) {
  switch (name) {
    case "get_profile":
      return toolResult({
        title: profile.title,
        location: profile.location,
        summary: [about.summary, about.summary2, about.summary3, about.summary4, about.summary5].join(" "),
        story: about.story.join(" "),
        currentWork:
          "Founder / Full-Stack Developer at Ubuntu Mzansi Tech (UM Tech CG): building scalable platforms, developer tools, and data-driven systems including UM-Tech-BizActivate, Watt Wallet Buddy, and TrackSuite.",
        beliefs: [...about.beliefs, about.beliefsClosing],
        builds: about.building.map((b) => b.name),
        availability: profile.opportunities,
      });
    case "get_skills":
      return toolResult({
        frontend: skills.frontend,
        backend: skills.backend,
        tools: skills.tools,
        other: skills.other,
      });
    case "list_projects":
      return toolResult({
        projects: projects.map((p) => ({
          name: p.name,
          description: p.description,
          technology: p.technology,
          github: p.github ?? null,
          liveDemo: p.demo ?? null,
        })),
      });
    case "get_experience_and_education":
      return toolResult({ experience, education });
    case "get_contact_info":
      return toolResult({
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin,
        location: profile.location,
        portfolioUrl: profile.portfolioUrl,
        opportunitiesSought: profile.opportunities,
      });
    default:
      return null;
  }
}

export const Route = createFileRoute("/api/public/mcp")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: {
          jsonrpc?: string;
          id?: unknown;
          method?: string;
          params?: { name?: string; arguments?: unknown };
        };
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
            { status: 400 }
          );
        }

        const { id, method } = body;
        const ok = (result: unknown) => Response.json({ jsonrpc: "2.0", id: id ?? null, result });

        switch (method) {
          case "initialize":
            return ok({
              protocolVersion: PROTOCOL_VERSION,
              capabilities: { tools: {} },
              serverInfo: {
                name: "rezaan-achmat-portfolio",
                title: "Rezaan Achmat Fredericks — Portfolio",
                version: "1.0.0",
              },
              instructions:
                "Read-only access to Rezaan Achmat Fredericks' portfolio: profile, skills, projects, experience, education and contact info.",
            });
          case "notifications/initialized":
            return new Response(null, { status: 202 });
          case "ping":
            return ok({});
          case "tools/list":
            return ok({ tools: TOOLS });
          case "tools/call": {
            const name = body.params?.name ?? "";
            const result = handleToolCall(name);
            if (!result) {
              return Response.json(
                {
                  jsonrpc: "2.0",
                  id: id ?? null,
                  error: { code: -32602, message: `Unknown tool: ${name}` },
                },
                { status: 200 }
              );
            }
            return ok(result);
          }
          default:
            return Response.json(
              {
                jsonrpc: "2.0",
                id: id ?? null,
                error: { code: -32601, message: `Method not supported: ${method ?? ""}` },
              },
              { status: 200 }
            );
        }
      },
      GET: async () => {
        return new Response(
          JSON.stringify({
            name: "rezaan-achmat-portfolio",
            transport: "streamable-http",
            endpoint: "/api/public/mcp",
            note: "POST JSON-RPC 2.0 messages here. Tools: get_profile, get_skills, list_projects, get_experience_and_education, get_contact_info. Read-only.",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      },
    },
  },
});
