import { readFile } from "node:fs/promises";

const required = [
  ["index.html", ["lang=\"zh-CN\"", "taskForm", "taskList", "app.js"]],
  ["app.js", ["STORAGE_KEY", "function escapeHtml", "function render()", "localStorage"]],
  ["styles.css", ["--accent", "@media (max-width: 520px)"]],
];

let failed = false;
for (const [file, markers] of required) {
  const content = await readFile(file, "utf8");
  for (const marker of markers) {
    if (!content.includes(marker)) {
      console.error(`缺少必要内容: ${file} -> ${marker}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log("静态项目基础检查通过。");
