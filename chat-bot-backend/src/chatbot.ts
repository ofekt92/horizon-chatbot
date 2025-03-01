

import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";
import { getLlama, LlamaChatSession, LlamaContext, resolveModelFile } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsDirectory = path.join(__dirname, "..", "models");

const llama = await getLlama();

console.log(chalk.yellow("Resolving model file..."));

const modelPath = await resolveModelFile(
    "hf:mradermacher/Llama-3.2-3B-Instruct-GGUF:Q8_0",
    modelsDirectory
);

console.log(chalk.yellow("Loading model..."));

export const model = await llama.loadModel({ modelPath });

console.log(chalk.yellow("Creating context..."));

export const context = await model.createContext({ sequences: +(process.env.MAX_SEQUENCES ?? 3) }); // my machine can't handle more than 3.

export const initSession = (context: LlamaContext) => new LlamaChatSession({ contextSequence: context.getSequence() });
