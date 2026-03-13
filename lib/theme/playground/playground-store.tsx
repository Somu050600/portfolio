"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { generateTheme } from "../engine/theme-generator";
import { presets } from "../presets";
import type { ThemeSpec, VisualArchetype } from "../schema/theme-spec";

const MAX_HISTORY = 50;
const DEFAULT_THEME =
  presets.find((p) => p.meta.id === "neon-dashboard") ?? presets[0];

// ─── Deep merge for partial theme updates ─────────────────────

function deepMerge<T extends object>(
  target: T,
  source: Partial<T> | Record<string, unknown>
): T {
  const result = { ...target } as Record<string, unknown>;
  const src = source as Record<string, unknown>;
  for (const key of Object.keys(src)) {
    const srcVal = src[key];
    if (srcVal === undefined) continue;
    const tgtVal = (target as Record<string, unknown>)[key];
    if (
      srcVal !== null &&
      typeof srcVal === "object" &&
      !Array.isArray(srcVal) &&
      tgtVal !== null &&
      typeof tgtVal === "object" &&
      !Array.isArray(tgtVal)
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        tgtVal as object,
        srcVal as Record<string, unknown>
      );
    } else {
      (result as Record<string, unknown>)[key] = srcVal;
    }
  }
  return result as T;
}

// ─── State & Actions ─────────────────────────────────────────

export interface PlaygroundState {
  theme: ThemeSpec;
  history: ThemeSpec[];
  historyIndex: number;
}

type PlaygroundAction =
  | { type: "SET_THEME"; payload: ThemeSpec }
  | { type: "UPDATE_THEME"; payload: Partial<ThemeSpec> }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "GENERATE_RANDOM" }
  | { type: "GENERATE_FROM_ARCHETYPE"; payload: VisualArchetype };

function pushToHistory(history: ThemeSpec[], theme: ThemeSpec): ThemeSpec[] {
  const next = [...history, theme];
  return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
}

function playgroundReducer(
  state: PlaygroundState,
  action: PlaygroundAction
): PlaygroundState {
  switch (action.type) {
    case "SET_THEME": {
      const theme = action.payload;
      const history = pushToHistory(
        state.history.slice(0, state.historyIndex + 1),
        theme
      );
      return {
        theme,
        history,
        historyIndex: history.length - 1,
      };
    }
    case "UPDATE_THEME": {
      const theme = deepMerge(state.theme, action.payload);
      const history = pushToHistory(
        state.history.slice(0, state.historyIndex + 1),
        theme
      );
      return {
        theme,
        history,
        historyIndex: history.length - 1,
      };
    }
    case "UNDO": {
      if (state.historyIndex <= 0) return state;
      const idx = state.historyIndex - 1;
      return {
        ...state,
        theme: state.history[idx],
        historyIndex: idx,
      };
    }
    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state;
      const idx = state.historyIndex + 1;
      return {
        ...state,
        theme: state.history[idx],
        historyIndex: idx,
      };
    }
    case "GENERATE_RANDOM": {
      const archetypes: VisualArchetype[] = [
        "neon-dark",
        "clean-minimal",
        "glassmorphic",
        "corporate-sharp",
        "brutalist",
        "retro-warm",
        "cyberpunk",
        "pastel-soft",
        "monochrome",
        "editorial",
      ];
      const archetype =
        archetypes[Math.floor(Math.random() * archetypes.length)];
      const theme = generateTheme({
        archetype,
        baseHue: Math.floor(Math.random() * 360),
        seed: Math.random().toString(36).slice(2),
      });
      const history = pushToHistory(
        state.history.slice(0, state.historyIndex + 1),
        theme
      );
      return {
        theme,
        history,
        historyIndex: history.length - 1,
      };
    }
    case "GENERATE_FROM_ARCHETYPE": {
      const theme = generateTheme({
        archetype: action.payload,
        baseHue: Math.floor(Math.random() * 360),
        seed: Math.random().toString(36).slice(2),
      });
      const history = pushToHistory(
        state.history.slice(0, state.historyIndex + 1),
        theme
      );
      return {
        theme,
        history,
        historyIndex: history.length - 1,
      };
    }
    default:
      return state;
  }
}

// ─── Context & Provider ────────────────────────────────────────

interface PlaygroundContextValue extends PlaygroundState {
  setTheme: (theme: ThemeSpec) => void;
  updateTheme: (partial: Partial<ThemeSpec>) => void;
  undo: () => void;
  redo: () => void;
  generateRandom: () => void;
  generateFromArchetype: (archetype: VisualArchetype) => void;
  canUndo: boolean;
  canRedo: boolean;
}

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playgroundReducer, {
    theme: DEFAULT_THEME,
    history: [DEFAULT_THEME],
    historyIndex: 0,
  });

  const setTheme = useCallback((theme: ThemeSpec) => {
    dispatch({ type: "SET_THEME", payload: theme });
  }, []);

  const updateTheme = useCallback((partial: Partial<ThemeSpec>) => {
    dispatch({ type: "UPDATE_THEME", payload: partial });
  }, []);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  const generateRandom = useCallback(
    () => dispatch({ type: "GENERATE_RANDOM" }),
    []
  );

  const generateFromArchetype = useCallback(
    (archetype: VisualArchetype) =>
      dispatch({ type: "GENERATE_FROM_ARCHETYPE", payload: archetype }),
    []
  );

  const value = useMemo<PlaygroundContextValue>(
    () => ({
      ...state,
      setTheme,
      updateTheme,
      undo,
      redo,
      generateRandom,
      generateFromArchetype,
      canUndo: state.historyIndex > 0,
      canRedo: state.historyIndex < state.history.length - 1,
    }),
    [
      state,
      setTheme,
      updateTheme,
      undo,
      redo,
      generateRandom,
      generateFromArchetype,
    ]
  );

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): PlaygroundContextValue {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used within PlaygroundProvider");
  return ctx;
}
