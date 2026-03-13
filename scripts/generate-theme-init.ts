/**
 * Generates public/theme-init.js for anti-flash. Run before build.
 * Usage: npx tsx scripts/generate-theme-init.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { presets } from "../lib/theme/presets";
import { themeToCSS } from "../lib/theme/resolver/css-resolver";

const root = join(process.cwd());

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "monochrome";

const cssMap: Record<string, string> = {};
for (const preset of presets) {
  cssMap[preset.meta.id] = themeToCSS(preset, ":root");
}

// Archetype -> isDark for script to set dark class
const darkThemes: Record<string, boolean> = {};
for (const p of presets) {
  darkThemes[p.meta.id] = p.meta.isDark;
}

const script = `(function(){
try{
var id=localStorage.getItem("${STORAGE_KEY}")||"${DEFAULT_THEME}";
var map=${JSON.stringify(cssMap)};
var dark=${JSON.stringify(darkThemes)};
var css=map[id];
if(css){
var s=document.createElement("style");
s.id="theme-inline";
s.textContent=css;
document.documentElement.appendChild(s);
}
document.documentElement.setAttribute("data-theme",id);
document.documentElement.classList.toggle("dark",!!dark[id]);
}catch(e){}
})();
`;

mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public/theme-init.js"), script);
console.log("Generated public/theme-init.js");
