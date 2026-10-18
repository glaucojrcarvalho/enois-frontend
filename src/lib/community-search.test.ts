import { describe, expect, it } from "vitest";

import {
  COMMUNITY_SEARCH_LIMIT,
  canSearchCommunities,
  communityResults,
  normalizeCommunitySearch,
} from "./community-search";

describe("busca de comunidades", () => {
  it("limpa espaços extras e preserva a consulta digitada", () => {
    expect(normalizeCommunitySearch("  Python   e   IA  ")).toBe("Python e IA");
  });

  it("não envia consultas vazias ou de apenas um caractere", () => {
    expect(canSearchCommunities("")).toBe(false);
    expect(canSearchCommunities("  p  ")).toBe(false);
    expect(canSearchCommunities(" py ")).toBe(true);
  });

  it("mostra somente comunidades, mesmo se a API incluir outro tipo", () => {
    const items = [
      {
        id: "c1",
        type: "communities" as const,
        title: "Pythonic",
        subtitle: "",
        image: null,
        href: "/api/communities/c1",
      },
      {
        id: "u1",
        type: "users" as const,
        title: "Pessoa",
        subtitle: "",
        image: null,
        href: "/api/users/u1",
      },
    ];
    expect(communityResults(items).map((item) => item.id)).toEqual(["c1"]);
  });

  it("limita os resultados de busca para evitar uma lista muito grande", () => {
    expect(COMMUNITY_SEARCH_LIMIT).toBe(30);
  });
});
