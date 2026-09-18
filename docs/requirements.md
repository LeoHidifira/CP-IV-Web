# Requirements — Filmes Online

## 1. Visão do Produto

### Nome
Filmes Online

### Problema
Com o fim do TV Time, quem tinha o hábito de registrar os filmes e séries que
já assistiu perdeu a ferramenta (e o histórico) usado para isso. Sem um lugar
centralizado, é fácil esquecer o que já foi visto, assistir ao mesmo conteúdo
de novo por engano, ou perder a noção do que falta rever numa série.

### Público
Pessoas que assistem filmes e séries com frequência e querem manter um
registro pessoal e organizado do que já assistiram, sem depender de memória
ou de anotações soltas.

### Proposta de solução
Uma plataforma web onde o usuário busca um filme ou série (via API do TMDB),
marca como assistido com um clique, e visualiza sua lista organizada por tipo
de conteúdo (filme ou série), podendo consultar os detalhes de cada item
assistido a qualquer momento.

## 2. Objetivo do MVP

Ao final do projeto, o usuário deve conseguir: buscar um título, marcar como
assistido, ver sua lista de assistidos organizada e filtrável por tipo, remover
um item da lista, e abrir os detalhes de um item assistido em uma página
própria.

## 3. Funcionalidades

### F01 — Buscar filmes e séries

**Descrição:** Campo de busca que consulta a API do TMDB (`/search/multi`) e
lista filmes e séries que correspondem ao termo digitado.

**Critérios de aceitação:**
- [x] O usuário digita um termo e submete a busca (botão ou Enter)
- [x] Resultados exibem pôster (quando disponível), título, tipo e ano
- [x] Buscas sem resultado exibem uma mensagem de lista vazia

**Estados:**
- [x] Inicial (nenhuma busca feita ainda)
- [x] Carregando (aguardando resposta da API)
- [x] Sucesso (resultados encontrados)
- [x] Vazio (busca feita, sem resultados)
- [x] Erro (falha na chamada à API, ex.: API key ausente/ inválida)

### F02 — Marcar como assistido

**Descrição:** A partir de um resultado de busca, o usuário adiciona o título
à sua lista pessoal de assistidos, que fica salva no navegador
(`localStorage`) com a data em que foi adicionado.

**Critérios de aceitação:**
- [x] Clicar em "Marcar como assistido" adiciona o item à lista
- [x] Um item não pode ser adicionado duas vezes à lista
- [x] A lista permanece salva após recarregar a página

**Estados:**
- [x] Inicial (lista vazia)
- [x] Sucesso (item adicionado)

### F03 — Organizar e filtrar a lista de assistidos

**Descrição:** A lista de assistidos é exibida em um grid, com filtros por tipo
de conteúdo (Todos / Filmes / Séries) e contagem total de itens.

**Critérios de aceitação:**
- [x] A lista mostra todos os itens assistidos por padrão
- [x] Os filtros "Filmes" e "Séries" restringem a lista ao tipo escolhido
- [x] A contagem de itens exibida reflete o filtro atual
- [x] É possível remover um item da lista

**Estados:**
- [x] Vazio (nenhum item assistido ainda, ou nenhum item para o filtro atual)
- [x] Sucesso (itens listados)

### F04 — Ver detalhes de um item assistido

**Descrição:** Ao clicar em um item da lista de assistidos, o usuário acessa
uma página de detalhes (rota dinâmica) com sinopse, gêneros, nota do TMDB e a
data em que foi marcado como assistido.

**Critérios de aceitação:**
- [x] A rota `/assistidos/:mediaType/:id` carrega os dados do título via API
- [x] A página exibe a data de "assistido em" salva localmente
- [x] Um link permite voltar para a lista de assistidos

**Estados:**
- [x] Carregando
- [x] Sucesso
- [x] Erro (falha ao carregar os detalhes)

## 4. Fora do Escopo

- Login/autenticação de usuários (a lista é local, por navegador)
- Lista de "quero assistir" (watchlist) — o foco é somente o que já foi assistido
- Avaliação/nota pessoal do usuário para cada título
- Recursos sociais (seguir pessoas, comentários, comunidade)
- Estatísticas agregadas (total por gênero, tempo assistido, etc.)
