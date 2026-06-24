"use client";

import { useQuery } from "@tanstack/react-query";
import { getFonts, loadFontStylesheet, type FontItem } from "@/lib/fonts";
import { useCallback } from "react";

export function useFonts() {
  const { data, isLoading, error } = useQuery<FontItem[]>({
    queryKey: ["google-fonts"],
    queryFn: getFonts,
    staleTime: 86_400_000,
    retry: 2,
  });

  const loadFont = useCallback((family: string, weights: number[] = [400]) => {
    loadFontStylesheet(family, weights);
  }, []);

  return {
    fonts: data ?? [],
    isLoading,
    error: error ? (error as Error).message : null,
    loadFont,
  };
}

export function useFontSearch(query: string) {
  const { fonts, isLoading, loadFont } = useFonts();

  const filtered = query
    ? fonts.filter((f) => f.family.toLowerCase().includes(query.toLowerCase()))
    : fonts.slice(0, 50);

  return { fonts: filtered, isLoading, loadFont };
}
