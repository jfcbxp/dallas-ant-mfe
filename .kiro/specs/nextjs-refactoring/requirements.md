# Requirements Document

## Introduction

Este documento define os requisitos para a refatoração do projeto Next.js `dallas-ant-mfe`, um micro-frontend de monitoramento de atletas em tempo real. O projeto utiliza Next.js 16 com App Router, styled-components, TanStack Query e PrimeReact.

A refatoração tem como objetivo melhorar a organização do código, padronizar convenções, introduzir testes unitários e eliminar inconsistências estruturais — **sem quebrar nenhuma funcionalidade ou layout existente**.

## Glossary

- **Refactoring_Tool**: O conjunto de scripts, configurações e processos responsável por executar as transformações de código.
- **Project**: O projeto Next.js `dallas-ant-mfe` sendo refatorado.
- **Page_Component**: Componente React localizado em `src/app/{route}/page.tsx` que representa uma rota do App Router.
- **Feature_Component**: Componente React colocado junto à página que o utiliza, dentro de `src/app/{route}/components/`.
- **Shared_Component**: Componente React reutilizável em múltiplas rotas, localizado em `src/components/`.
- **Custom_Hook**: Função React com prefixo `use` localizada em `src/hooks/`.
- **Service**: Função assíncrona de chamada HTTP localizada em `src/services/`.
- **Type_Definition**: Interface ou tipo TypeScript localizado em `src/types/`.
- **Style_File**: Arquivo de estilos styled-components com extensão `.styles.tsx` ou `.styles.ts`.
- **Test_File**: Arquivo de teste unitário com extensão `.test.tsx` ou `.test.ts`.
- **Barrel_File**: Arquivo `index.ts` ou `index.tsx` que re-exporta membros de um módulo.
- **Theme**: Objeto de design tokens definido em `src/styles/theme.ts`.
- **GlobalStyle**: Estilos CSS globais definidos em `src/styles/global.ts`.
- **AuthContext**: Contexto React de autenticação localizado em `src/contexts/AuthContext/`.
- **QueryClient**: Instância do TanStack Query responsável pelo cache de dados remotos.

---

## Requirements

### Requirement 1: Organização de Tipos TypeScript

**User Story:** Como desenvolvedor, quero que todos os tipos e interfaces TypeScript estejam centralizados e sem duplicação, para que eu possa encontrar e reutilizar definições sem ambiguidade.

#### Acceptance Criteria

1. THE Project SHALL conter todos os tipos de domínio em `src/types/`, sem duplicação de interfaces entre arquivos de serviço e arquivos de tipo.
2. WHEN um tipo é definido em um arquivo de serviço (como `UserInfo` em `fetchAvailableDevices/index.ts`), THE Refactoring_Tool SHALL mover essa definição para o arquivo de tipo correspondente em `src/types/`.
3. THE Project SHALL manter um arquivo `src/types/index.ts` que re-exporta todos os tipos públicos de domínio.
4. WHEN um arquivo de serviço necessita de um tipo de domínio, THE Service SHALL importar esse tipo de `src/types/` em vez de defini-lo localmente.

---

### Requirement 2: Padronização de Nomenclatura de Arquivos de Estilo

**User Story:** Como desenvolvedor, quero que todos os arquivos de estilo sigam uma convenção de nomenclatura consistente, para que eu possa localizar estilos de forma previsível.

#### Acceptance Criteria

1. THE Project SHALL nomear todos os arquivos de estilo de componentes como `{ComponentName}.styles.tsx` (para styled-components com JSX) ou `{ComponentName}.styles.ts` (para styled-components sem JSX).
2. WHEN um arquivo de estilo é nomeado apenas como `styles.tsx` ou `styles.ts` dentro de uma pasta de rota (ex: `src/app/dashboard/styles.tsx`), THE Refactoring_Tool SHALL renomeá-lo para `{RouteName}.styles.tsx`.
3. THE Project SHALL manter a extensão `.tsx` apenas em arquivos de estilo que contenham JSX; arquivos de estilo sem JSX SHALL usar extensão `.ts`.
4. WHEN um arquivo de estilo é renomeado, THE Refactoring_Tool SHALL atualizar todos os imports que referenciam o arquivo renomeado.

---

### Requirement 3: Separação de Responsabilidades nas Pages

**User Story:** Como desenvolvedor, quero que as páginas (`page.tsx`) sejam componentes finos de orquestração, para que a lógica de negócio e a apresentação estejam separadas e sejam testáveis individualmente.

#### Acceptance Criteria

1. THE Page_Component SHALL conter apenas lógica de orquestração: composição de hooks, passagem de props e renderização condicional de alto nível.
2. WHEN uma Page_Component contém lógica de negócio inline (ex: cálculo de `zoneStats` em `dashboard/page.tsx`), THE Refactoring_Tool SHALL extrair essa lógica para um Custom_Hook dedicado.
3. WHEN uma Page_Component contém blocos de JSX com mais de 30 linhas que representam uma seção visual distinta (ex: o modal em `device/page.tsx`), THE Refactoring_Tool SHALL extrair esse bloco para um Feature_Component.
4. THE Page_Component SHALL ter no máximo 100 linhas de código após a refatoração.
5. IF uma Page_Component exceder 100 linhas após extração de componentes, THEN THE Refactoring_Tool SHALL registrar um aviso indicando quais seções ainda podem ser extraídas.

---

### Requirement 4: Extração de Lógica de Negócio para Custom Hooks

**User Story:** Como desenvolvedor, quero que a lógica de negócio complexa esteja encapsulada em custom hooks, para que seja reutilizável e testável de forma isolada.

#### Acceptance Criteria

1. THE Custom_Hook SHALL encapsular toda a lógica de estado e efeitos colaterais relacionados a uma funcionalidade específica.
2. WHEN uma Page_Component gerencia múltiplos estados relacionados a uma mesma funcionalidade (ex: `isStarting`, `isEnding`, `selectedDeviceId`, `selectedUserId` em `device/page.tsx`), THE Refactoring_Tool SHALL extrair esses estados para um Custom_Hook dedicado (ex: `useDevicePage`).
3. THE Custom_Hook SHALL retornar um objeto tipado com todas as propriedades e handlers necessários para o componente consumidor.
4. WHEN um Custom_Hook é criado, THE Refactoring_Tool SHALL criar o arquivo em `src/hooks/{hookName}/index.ts` seguindo o padrão existente do projeto.
5. THE Custom_Hook SHALL ser independente de componentes de UI e não importar nenhum componente React.

---

### Requirement 5: Cobertura de Testes Unitários para Custom Hooks

**User Story:** Como desenvolvedor, quero que todos os custom hooks possuam testes unitários, para que eu possa refatorar com confiança e detectar regressões automaticamente.

#### Acceptance Criteria

1. THE Project SHALL conter um arquivo Test_File para cada Custom_Hook existente em `src/hooks/`.
2. THE Test_File SHALL ser localizado em `src/hooks/{hookName}/{hookName}.test.ts`.
3. WHEN um Custom_Hook realiza chamadas HTTP via Service, THE Test_File SHALL mockar o Service correspondente usando `jest.mock()`.
4. WHEN um Custom_Hook utiliza TanStack Query, THE Test_File SHALL envolver o hook em um `QueryClientProvider` de teste com um `QueryClient` configurado sem retries (`retry: false`).
5. THE Test_File SHALL cobrir os seguintes cenários para cada hook de query: estado de loading, estado de sucesso com dados válidos e estado de erro.
6. THE Test_File SHALL cobrir os seguintes cenários para cada hook de mutation: chamada da mutation com payload válido e tratamento de erro.
7. WHEN todos os testes são executados com `jest --ci`, THE Project SHALL apresentar cobertura de linha igual ou superior a 80% para os arquivos em `src/hooks/`.

---

### Requirement 6: Cobertura de Testes Unitários para Utilitários e Serviços

**User Story:** Como desenvolvedor, quero que utilitários e funções de serviço possuam testes unitários, para que transformações de dados e chamadas HTTP sejam verificáveis de forma isolada.

#### Acceptance Criteria

1. THE Project SHALL conter um Test_File para cada arquivo em `src/utils/`.
2. THE Test_File para utilitários SHALL ser localizado em `src/utils/{utilName}.test.ts`.
3. WHEN a função utilitária `toBRL` recebe um número válido, THE Test_File SHALL verificar que o retorno é uma string formatada como moeda brasileira (ex: `R$ 1.234,56`).
4. WHEN a função utilitária `toBRL` recebe o valor `0`, THE Test_File SHALL verificar que o retorno é `R$ 0,00`.
5. THE Project SHALL conter um Test_File para cada Service em `src/services/`, localizado em `src/services/{serviceName}/{serviceName}.test.ts`.
6. WHEN um Service é testado, THE Test_File SHALL usar `jest.spyOn(global, 'fetch')` ou equivalente para mockar chamadas HTTP.
7. WHEN um Service recebe uma resposta HTTP com status diferente de 2xx, THE Test_File SHALL verificar que o Service lança um `Error` com mensagem descritiva.

---

### Requirement 7: Eliminação de Inline Styles

**User Story:** Como desenvolvedor, quero que não haja estilos inline (`style={{...}}`) nos componentes, para que toda a estilização seja gerenciada pelo sistema de styled-components e o Theme.

#### Acceptance Criteria

1. THE Project SHALL conter zero ocorrências de atributo `style={{...}}` em componentes JSX após a refatoração.
2. WHEN um componente contém um atributo `style={{...}}` (ex: em `device/page.tsx` e `dashboard/page.tsx`), THE Refactoring_Tool SHALL substituir esse estilo por um styled-component correspondente ou por uma prop transiente em um styled-component existente.
3. WHEN um novo styled-component é criado para substituir um inline style, THE Refactoring_Tool SHALL adicioná-lo ao arquivo Style_File correspondente ao componente.
4. WHERE o valor do inline style é estático, THE Refactoring_Tool SHALL usar valores do Theme quando existir um token equivalente.

---

### Requirement 8: Configuração de Testes e Setup

**User Story:** Como desenvolvedor, quero que o ambiente de testes esteja configurado corretamente com suporte a styled-components e TanStack Query, para que os testes possam ser executados sem configuração manual adicional.

#### Acceptance Criteria

1. THE Project SHALL conter um arquivo `jest.config.js` ou `jest.config.ts` na raiz do projeto com configuração para ambiente `jsdom`.
2. THE Project SHALL conter um arquivo `jest.setup.ts` que importa `@testing-library/jest-dom` para disponibilizar matchers customizados.
3. WHEN o comando `yarn test` é executado, THE Project SHALL executar todos os Test_Files sem erros de configuração.
4. THE Project SHALL configurar o alias de path `@/*` no Jest para corresponder ao alias definido em `tsconfig.json`.
5. WHERE styled-components é utilizado nos testes, THE Project SHALL configurar o `babel-plugin-styled-components` no ambiente de teste para evitar erros de hidratação.

---

### Requirement 9: Limpeza de Código Morto e Inconsistências

**User Story:** Como desenvolvedor, quero que o projeto não contenha código morto, imports não utilizados ou inconsistências estruturais, para que a base de código seja limpa e fácil de navegar.

#### Acceptance Criteria

1. THE Project SHALL remover o arquivo `src/types/index.ts` atual (que contém tipos de `Order`, `Payment` não utilizados no projeto) e substituí-lo por um barrel file que re-exporta apenas os tipos de domínio ativos.
2. THE Project SHALL remover os arquivos `src/app/globals.css` e `src/app/page.module.css` se não forem referenciados por nenhum componente após a migração completa para styled-components.
3. WHEN o arquivo `src/app/layout.tsx` é marcado como `'use client'` mas contém lógica que poderia ser Server Component, THE Refactoring_Tool SHALL avaliar se a diretiva pode ser removida ou se o QueryClient deve ser movido para um Provider separado.
4. THE Project SHALL garantir que o `tsconfig.json` tenha `"strict": true` habilitado, e todos os erros de tipo resultantes SHALL ser corrigidos.
5. IF a habilitação de `"strict": true` introduzir mais de 20 erros de tipo, THEN THE Refactoring_Tool SHALL criar um plano incremental de correção documentado em `src/types/strict-migration.md`.

---

### Requirement 10: Preservação de Funcionalidade Existente

**User Story:** Como desenvolvedor, quero ter garantia de que nenhuma funcionalidade ou layout existente seja quebrado durante a refatoração, para que os usuários finais não sejam impactados.

#### Acceptance Criteria

1. THE Project SHALL manter todas as rotas existentes (`/dashboard`, `/device`, `/register`) funcionando após cada etapa de refatoração.
2. WHEN qualquer arquivo é movido ou renomeado, THE Refactoring_Tool SHALL atualizar todos os imports que referenciam esse arquivo antes de remover o arquivo original.
3. THE Project SHALL compilar sem erros (`next build`) após cada requisito ser implementado individualmente.
4. WHEN um componente é extraído de uma Page_Component, THE Refactoring_Tool SHALL garantir que o comportamento visual e funcional do componente extraído seja idêntico ao original.
5. THE Project SHALL manter a configuração de `basePath`, `styledComponents compiler`, `output: standalone` e `distDir: dist` no `next.config.ts` sem alterações.
6. WHEN testes unitários são adicionados, THE Project SHALL executar `yarn test --ci` sem falhas antes de considerar um requisito como concluído.
