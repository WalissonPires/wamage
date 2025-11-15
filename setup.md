# Configuração do Ambiente de Desenvolvimento

Este documento descreve os passos para configurar e executar o projeto localmente usando `pnpm` como gerenciador de pacotes em um ambiente monorepo.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/installation) (versão 8 ou superior)

## 1. Instalação das Dependências

Para instalar todas as dependências de todos os pacotes e serviços do workspace, execute o seguinte comando na raiz do projeto:

```bash
pnpm install
```

Este comando irá:
- Ler o arquivo `pnpm-workspace.yaml` para identificar todos os projetos.
- Instalar as dependências externas listadas em cada `package.json`.
- Criar links simbólicos (symlinks) entre os pacotes locais, permitindo que um serviço (`message-service`) importe outro (`@wamage/message-contracts-ts`) diretamente.

## 2. Build de Todos os Projetos

Para compilar todos os projetos TypeScript (ou executar qualquer script `build`) em todo o monorepo, use o comando `pnpm recursive` (ou `-r`):

```bash
pnpm -r build
```

Este comando executará o script `build` definido no `package.json` de cada projeto do workspace, respeitando a ordem de dependência. Por exemplo, ele irá compilar `@wamage/message-contracts-ts` antes de compilar `message-service`.

## 3. Executando em Modo de Desenvolvimento

Para executar o script `dev` (geralmente usado para `watch mode`) em todos os projetos simultaneamente e em paralelo, use a flag `--parallel`:

```bash
pnpm -r --parallel dev
```

Este comando irá encontrar e executar o script `dev` em todos os projetos que o possuírem, sem esperar que um processo termine para iniciar o próximo.

## Comandos Úteis

### Executar o Build de um Projeto e suas Dependências

Se você quiser fazer o build de um projeto específico e de todas as suas dependências internas, use o filtro `--filter` com `...`:

```bash
# Exemplo: Build do message-service e suas dependências
pnpm --filter message-service... build
```

### Executar um Comando em um Projeto Específico

Para executar um comando em um único projeto, use o filtro sem `...`:

```bash
# Exemplo: Executar o dev script apenas no message-service
pnpm --filter message-service dev
