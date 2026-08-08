Projeto Poupar App
Stack: React Native, TypeScript, React Query, NativeWind

Estrutura
src/ ├── presentation/ # componentes, páginas, templates ├── data/ # contexts, modules, services, config └── shared/ # utils, hooks, constants

Regras e padrões
Sempre carregados (.claude/rules/): núcleo que vale para toda tarefa. - core.md — arquitetura de dependências, nomenclatura de arquivos/tipos, exports/imports, estilo. - components.md — estrutura de componentes e primitivos de UI (shadcn/cva).

Sob demanda (.claude/skills/): padrões situacionais, carregados só quando a tarefa casa com a description do skill (progressive disclosure). Não precisa invocar manualmente. - data-module — services, mappers, useCases, keys, wrappers de cache. - page-template — criar páginas/templates. - react-hooks — criar hooks de negócio. - shared-utils — utils, constants, config/env. - context — estado global de UI (modais, sessão). - testing — testes unitários (Vitest + RTL) e de feature (+ MSW); infra em src/test/.

Playbooks acionáveis (.claude/skills/): fluxos de criação. - endpoint-creator — cria a camada de dados de um endpoint (método + URL → arquivos). - component-from-print — monta a árvore de componentes a partir de uma imagem. - shadcn-primitive — reformata primitivo cru do shadcn para o padrão do projeto.

Orquestrador ponta a ponta (.claude/skills/): roda no loop principal. - feature-builder — cria uma feature inteira (dados + componentização + lógica + testes) em 7 fases, integrando os skills e subagents abaixo. Use quando pedir "implemente a feature X" com contexto de endpoint, componentização e integração de lógica.

Subagents (.claude/agents/): - atlassian-endpoint-creator — busca a spec no Jira/Confluence (MCP) e delega ao endpoint-creator. - component-builder-from-print — monta a árvore de componentes a partir de um print anexado. - feature-scout — reconhecimento read-only da codebase antes de implementar (fase 1 do feature-builder). - feature-reviewer — revisor (modelo forte) parametrizado por escopo (implementação/testes/geral). - test-author — escreve os testes da feature seguindo o skill testing.