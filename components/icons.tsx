import { createElement } from "react";
import {
  Zap,
  House,
  Shield,
  Wrench,
  Store,
  HardHat,
  PlugZap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/** Maps content-layer icon keys to lucide icon components. */
export const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  home: House,
  shield: Shield,
  wrench: Wrench,
  store: Store,
  "hard-hat": HardHat,
  "plug-zap": PlugZap,
};

export function getIcon(key: string): LucideIcon {
  return iconMap[key] ?? Zap;
}

/**
 * Renders an icon by key as a React element. Using `createElement` (rather than
 * binding to a capitalized variable in render) keeps the lookup compatible with
 * the React Compiler's static-component lint rules.
 */
export function renderIcon(key: string, props?: LucideProps) {
  return createElement(iconMap[key] ?? Zap, props);
}
