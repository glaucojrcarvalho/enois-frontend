import type { SearchResult } from "@/types/application/search/search-result";

export const COMMUNITY_SEARCH_MIN_LENGTH = 2;
export const COMMUNITY_SEARCH_LIMIT = 30;

/** Normaliza a consulta para que espacos extras nao virem buscas diferentes. */
export function normalizeCommunitySearch(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function canSearchCommunities(value: string): boolean {
  return normalizeCommunitySearch(value).length >= COMMUNITY_SEARCH_MIN_LENGTH;
}

/** Os resultados são da API global, mas esta tela exibe apenas comunidades. */
export function communityResults(items: SearchResult[]): SearchResult[] {
  return items.filter((item) => item.type === "communities");
}
