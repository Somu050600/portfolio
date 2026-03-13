export { neonDashboard } from "./neon-dashboard";
export { glassWellness } from "./glass-wellness";
export { cleanLogistics } from "./clean-logistics";
export { corporateCrm } from "./corporate-crm";
export {
  monochrome,
  monochromeLight,
  monochromeDark,
} from "./monochrome";

import type { ThemeSpec } from "../schema/theme-spec";
import { neonDashboard } from "./neon-dashboard";
import { glassWellness } from "./glass-wellness";
import { cleanLogistics } from "./clean-logistics";
import { corporateCrm } from "./corporate-crm";
import { monochrome } from "./monochrome";

/** All 5 preset themes (plan Phase 1) */
export const presets: ThemeSpec[] = [
  neonDashboard,
  glassWellness,
  cleanLogistics,
  corporateCrm,
  monochrome,
];
