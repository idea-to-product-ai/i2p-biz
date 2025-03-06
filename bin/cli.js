#!/usr/bin/env node
import { program } from "commander";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

// 获取当前 CLI 脚本所在目录
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// 组件存放目录
const COMPONENTS_DIR = path.join(__dirname, "../packages");

// 解析 CLI 命令
program
  .command("add <module>")
  .description("Add a module to your project")
  .action(async (module) => {
    const srcPath = path.join(COMPONENTS_DIR, `${module}.js`);
    const destPath = path.join(process.cwd(), "components", `${module}.js`);

    if (!fs.existsSync(srcPath)) {
      console.log(chalk.red(`Module "${module}" not found.`));
      process.exit(1);
    }

    await fs.copy(srcPath, destPath);
    console.log(chalk.green(`✅ Module "${module}" added to your project!`));
  });

program.parse(process.argv);
