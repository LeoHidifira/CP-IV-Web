# Architecture — Filmes Online

## 1. Visão Geral

A aplicação é uma SPA em React (Vite), com rotas gerenciadas pelo React Router.
Existe um layout principal (Header + Outlet + Footer) compartilhado por todas
as páginas. O estado da lista de assistidos vive na página `Assistidos` e é
persistido no `localStorage` do navegador — não há backend próprio; os dados
de filmes/séries vêm da API pública do TMDB.

## 2. Estrutura de Pastas

```text
src/
├── api/
│   └── tmdb.js            # funções de busca e detalhes na API do TMDB
├── components/
│   ├── Header.jsx / .css
│   ├── Hero.jsx / .css
│   ├── Footer.jsx / .css
│   ├── SearchBar.jsx / .css
│   └── MovieCard.jsx / .css
├── layouts/
│   └── MainLayout.jsx     # Header + <Outlet /> + Footer
├── pages/
│   ├── Home.jsx
│   ├── Assistidos.jsx / .css
│   └── AssistidoDetalhe.jsx / .css
├── App.jsx                # definição das rotas
├── App.css
├── main.jsx
└── index.css               # variáveis de tema e reset global
```

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| Home | `/` | Header + Hero, apresenta o produto e leva para a organização |
| Assistidos | `/assistidos` | Buscar títulos e organizar a lista de assistidos |
| AssistidoDetalhe | `/assistidos/:mediaType/:id` | Detalhes de um título assistido (rota dinâmica) |

Todas as rotas acima são filhas da rota `/`, que renderiza `MainLayout`
(layout compartilhado com Header e Footer).

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| Header | Logo e navegação entre páginas | — |
| Hero | Bloco de destaque da Home (título, texto, CTA) | `title`, `subtitle`, `ctaText`, `ctaTo` |
| Footer | Rodapé simples | — |
| SearchBar | Campo de busca controlado | `value`, `onChange`, `onSubmit` |
| MovieCard | Card de filme/série, reutilizado na busca e na lista | `item`, `variant` (`"search"` \| `"watched"`), `onAdd`, `onRemove`, `watchedAt` |
| MainLayout | Estrutura comum (Header + conteúdo da rota + Footer) | — |

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `query` (texto da busca) | `Assistidos` | Input controlado do formulário de busca |
| `searchStatus` (inicial/carregando/sucesso/vazio/erro) | `Assistidos` | Controlar o que é exibido durante a busca na API |
| `searchResults` | `Assistidos` | Guardar os resultados retornados pela API |
| `watchedList` | `Assistidos` | Lista de itens assistidos, inicializada a partir do `localStorage` |
| `filter` (all/movie/tv) | `Assistidos` | Filtrar a lista de assistidos exibida |
| `status` (carregando/sucesso/erro) | `AssistidoDetalhe` | Controlar a exibição durante o carregamento dos detalhes |
| `details` | `AssistidoDetalhe` | Guardar os dados retornados da API para o título |

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Persistir lista | Sempre que `watchedList` muda | Salva a lista atualizada no `localStorage` |
| Buscar detalhes | Ao montar `AssistidoDetalhe` ou trocar `mediaType`/`id` na URL | Chama `getTitleDetails` na API do TMDB e atualiza `details`/`status` |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| react-router-dom | Rotas, layouts e navegação (rota dinâmica de detalhes) | Requisito técnico do projeto |
| react-icons | Ícones (busca, adicionar, remover, tipo de mídia, voltar) | Requisito técnico do projeto |
