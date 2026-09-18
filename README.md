# Filmes Online

## Integrantes
- Leonardo Hidifira - RM569519
- Gabriel Do Santos Perine Tardelli - RM569751
- André Peixoto Cano - RM570429

## Problema
Com o encerramento do TV Time, milhões de pessoas perderam a ferramenta (e o
histórico) que usavam para registrar os filmes e séries já assistidos. Sem um
lugar centralizado, é fácil esquecer o que já foi visto ou perder a noção do
que falta acompanhar em uma série.

## Solução
O Filmes Online é uma plataforma web para **organizar o que você já assistiu**: você
busca um filme ou série, marca como assistido com um clique, e acompanha sua
lista organizada por tipo de conteúdo (filmes/séries), podendo consultar os
detalhes de qualquer item assistido a qualquer momento.

## Tecnologias
- React 19 + Vite
- React Router (rotas, layouts e rota dinâmica)
- react-icons
- CSS puro (sem framework de UI)
- `localStorage` para persistir a lista de assistidos no navegador

## API usada
[TMDB — The Movie Database](https://developer.themoviedb.org/docs/getting-started)
(`/search/multi` para busca e `/movie/{id}` ou `/tv/{id}` para detalhes).

## Funcionalidades
- Buscar filmes e séries pelo nome
- Marcar um título como assistido (salvo localmente no navegador)
- Ver a lista de assistidos organizada em grid, com filtro por tipo (Todos / Filmes / Séries)
- Remover um item da lista de assistidos
- Ver a página de detalhes de um item assistido (sinopse, gêneros, nota, data em que foi assistido)

## Uso de IA
Este projeto foi desenvolvido com apoio do Claude Code (Anthropic), seguindo a
metodologia de Spec Driven Development: a IA auxiliou na leitura do enunciado,
na escrita da documentação (`docs/requirements.md`, `docs/architecture.md`,
`docs/references/references.md`), na geração dos componentes/páginas React e
na validação visual da aplicação em execução. As decisões de escopo (qual
problema resolver, quais funcionalidades entram no MVP), de design (estrutura
das páginas, referências visuais escolhidas) e técnicas (bibliotecas,
organização das pastas) foram revisadas e aprovadas pelo integrante do grupo.

## Como executar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie uma conta gratuita em [themoviedb.org](https://www.themoviedb.org/signup)
   e gere uma API key em *Configurações > API*.
3. Copie o arquivo de exemplo de variáveis de ambiente e cole sua API key:
   ```bash
   cp .env.example .env
   ```
   e edite `.env`:
   ```
   VITE_TMDB_API_KEY=sua_api_key_aqui
   ```
4. Rode o projeto em modo desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:5173`.

> Sem a API key configurada, a busca e a página de detalhes exibem o estado de
> erro (a interface e a navegação continuam funcionando normalmente).
