#!/usr/bin/env node
/**
 * Valida as classes usadas em `className` / `cva` contra o tailwind.config.js.
 *
 * NativeWind não avisa quando uma classe não existe: `bg-brand-mainn` não quebra
 * o typecheck nem o Biome, só não pinta nada. Este script fecha esse buraco
 * gerando o CSS do Tailwind com as classes encontradas e apontando as que não
 * produziram nenhuma regra.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

/** Resolvido a partir do script, não do cwd — roda de qualquer pasta. */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const escapeClassName = require('tailwindcss/lib/util/escapeClassName').default;
const baseConfig = require(join(ROOT, 'tailwind.config.js'));

/** Strings dentro de `className`/`cva` que não são classes. */
const IGNORED = new Set(['pt-BR', 'en-US']);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;

    const full = join(dir, entry);

    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(t|j)sx?$/.test(entry)) files.push(full);
  }

  return files;
}

/** Captura a região balanceada que começa em `start` (um `{` ou `(`). */
function readBalanced(source, start, open, close) {
  let depth = 0;

  for (let i = start; i < source.length; i++) {
    if (source[i] === open) depth++;
    else if (source[i] === close) {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  return source.slice(start);
}

/** Regiões onde toda string literal é (ou contém) classe. */
function extractRegions(source) {
  const regions = [];
  const pattern = /className\s*=\s*|cva\s*\(|cn\s*\(/g;
  let match;

  while ((match = pattern.exec(source))) {
    const at = match.index + match[0].length;
    const char = source[at];

    if (match[0].startsWith('className')) {
      if (char === '{') regions.push({ text: readBalanced(source, at, '{', '}'), at });
      else if (char === "'" || char === '"') {
        const end = source.indexOf(char, at + 1);
        regions.push({ text: source.slice(at, end + 1), at });
      }
    } else {
      regions.push({ text: readBalanced(source, at - 1, '(', ')'), at });
    }
  }

  return regions;
}

const STRING_LITERAL = /'([^'\\]*)'|"([^"\\]*)"|`([^`\\$]*)`/g;

/** Só validamos tokens que se parecem com utilitário — `ios`, `handled` etc. saem. */
function looksLikeClass(token) {
  if (!token || IGNORED.has(token)) return false;
  if (token.includes('${') || token.includes('}')) return false;

  return /[-:[]/.test(token);
}

const files = walk(join(ROOT, 'src'));
files.push(join(ROOT, 'App.tsx'));

/** classe -> Set de "arquivo:linha" */
const usages = new Map();

for (const file of files) {
  let source;

  try {
    source = readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  for (const region of extractRegions(source)) {
    let literal;

    while ((literal = STRING_LITERAL.exec(region.text))) {
      const value = literal[1] ?? literal[2] ?? literal[3] ?? '';

      for (const token of value.split(/\s+/)) {
        if (!looksLikeClass(token)) continue;

        const line = source.slice(0, region.at).split('\n').length;
        const where = `${relative(ROOT, file)}:${line}`;

        if (!usages.has(token)) usages.set(token, new Set());
        usages.get(token).add(where);
      }
    }
  }
}

const candidates = [...usages.keys()];

const css = await postcss([
  tailwindcss({
    ...baseConfig,
    content: [{ raw: candidates.join(' '), extension: 'html' }]
  })
]).process('@tailwind utilities;', { from: undefined });

const generated = css.css;

const invalid = candidates.filter((candidate) => {
  const escaped = escapeClassName(candidate).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return !new RegExp(`\\.${escaped}(?![\\w-])`).test(generated);
});

if (invalid.length === 0) {
  console.log(`OK — ${candidates.length} classes validadas em ${files.length} arquivos.`);
  process.exit(0);
}

console.error(`${invalid.length} classe(s) inválida(s):\n`);

for (const token of invalid.sort()) {
  console.error(`  ${token}`);
  for (const where of usages.get(token)) console.error(`      ${where}`);
}

console.error('\nClasse inexistente no NativeWind não pinta nada e não quebra o build.');
process.exit(1);
