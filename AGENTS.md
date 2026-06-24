# typepairing — Agentic Workflow

Multi-agent DAG workflow for designing and building websites.

## Commands
| Command | Description |
|---------|-------------|
| `node orchestrator.js --status` | Show workflow state |
| `node orchestrator.js --reset` | Reset workflow |
| `node orchestrator.js --init-folders` | Create Frontend/Backend project folders |
| `node orchestrator.js --agent <id>` | Get agent context |
| `node orchestrator.js --complete <id>` | Mark agent complete |
| `node orchestrator.js --generate-htmls` | Generate HTML docs |
| `node orchestrator.js --review <stage>` | Review stage output |

## Agents
| Agent | Description |
|-------|-------------|
| researcher | Market research and UI/UX trends |
| pm | Product requirements and feature specs |
| designer | Design system (3-option evaluation) |
| content_writer | SEO-optimized website copy |
| architect | Technical architecture |
| art_director | Image and graphic asset generation |
| fe_engineer | Frontend implementation |
| be_engineer | Backend API implementation |
| qa | Functionality and usability validation |

## Workflow
```
Researcher -> [Review] -> PM -> [Review] -> Designer -> [Review] ->
Content Writer -> [Review] -> Architect -> Art Director -> [Review] ->
FE Engineer + BE Engineer -> QA
```

## Review Stages
- `research` — Review market analysis
- `prd` — Review product requirements
- `design` — Review design system
- `content` — Review website copy
- `imagery` — Review image assets

Commands during review: `approve`, `feedback <text>`, `quit`
