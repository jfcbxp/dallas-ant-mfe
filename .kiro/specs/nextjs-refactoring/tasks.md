# Plano de Implementação: nextjs-refactoring

## Visão Geral

Refatoração não-destrutiva do micro-frontend `dallas-ant-mfe` (Next.js 16 + App Router). Cada tarefa deve ser seguida de `next build` para garantir que nenhuma rota seja quebrada. Testes devem ser executados com `yarn test --silent --bail` ou `npx jest --silent --passWithNoTests --bail`.

## Tarefas

- [x] 1. Configurar ambiente de testes (Jest)
  - Instalar dependência `fast-check` com `yarn add --dev fast-check`
  - Criar `jest.config.ts` na raiz com `testEnvironment: 'jsdom'`, alias `@/*` mapeado para `./src/*`, `setupFilesAfterFramework: ['<rootDir>/jest.setup.ts']` e `collectCoverageFrom` cobrindo `src/hooks/**`, `src/utils/**`, `src/services/**`
  - Criar `jest.setup.ts` na raiz importando `@testing-library/jest-dom`
  - Criar `.babelrc` na raiz com preset `next/babel` e plugin `babel-plugin-styled-components` com `{ "ssr": true }`
  - Adicionar script `"test:coverage": "jest --coverage --silent"` no `package.json`
  - Verificar que `yarn test --silent --passWithNoTests` executa sem erros de configuração
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 2. Centralizar tipos TypeScript em `src/types/`
  - [x] 2.1 Criar `src/types/device.ts` com interfaces `UserInfo` e `Device` (movidas de `src/services/fetchAvailableDevices/index.ts`)
    - Copiar as interfaces `UserInfo` e `Device` exatamente como estão em `fetchAvailableDevices/index.ts`
    - _Requirements: 1.1, 1.2_

  - [x] 2.2 Criar `src/types/lesson.ts` com interface `LessonStatus` (movida de `src/services/fetchLessonStatus/index.ts`)
    - Copiar a interface `LessonStatus` com os literais `'ACTIVE' | 'INACTIVE' | 'ENDED'`
    - _Requirements: 1.1, 1.2_

  - [x] 2.3 Criar `src/types/user.ts` com interfaces `User`, `RegisterData`, `RegisterResponse`, `LinkDeviceResponse`
    - Mover `User` de `fetchUsersList/index.ts`, `RegisterData`/`RegisterResponse` de `fetchRegister/index.ts`, `LinkDeviceResponse` de `fetchLinkDevice/index.ts`
    - _Requirements: 1.1, 1.2_

  - [x] 2.4 Atualizar `src/types/index.ts` — substituir todo o conteúdo atual (tipos `Order`, `Payment`, `GroupedOrders` etc. não utilizados) pelo barrel file que re-exporta apenas tipos de domínio ativos
    - O novo conteúdo deve re-exportar: `./heartRate`, `./lessonResult`, `./device`, `./lesson`, `./user`
    - _Requirements: 1.3, 9.1_

  - [x] 2.5 Atualizar os arquivos de serviço para importar tipos de `src/types/` em vez de defini-los localmente
    - Em `fetchAvailableDevices/index.ts`: remover as interfaces `UserInfo` e `Device`, adicionar `import { UserInfo, Device } from '@/types/device'`
    - Em `fetchLessonStatus/index.ts`: remover a interface `LessonStatus`, adicionar `import { LessonStatus } from '@/types/lesson'`
    - Em `fetchUsersList/index.ts`: remover a interface `User`, adicionar `import { User } from '@/types/user'`
    - Em `fetchRegister/index.ts`: remover `RegisterData` e `RegisterResponse`, adicionar `import { RegisterData, RegisterResponse } from '@/types/user'`
    - Em `fetchLinkDevice/index.ts`: remover `LinkDeviceResponse`, adicionar `import { LinkDeviceResponse } from '@/types/user'`
    - Em `useAvailableDevices/index.ts`: atualizar import de `Device` para vir de `@/types/device`
    - Em `useLinkDevice/index.ts`: atualizar import de `LinkDeviceResponse` para vir de `@/types/user`
    - Em `useUsersList/index.ts`: atualizar import de `User` para vir de `@/types/user`
    - Em `useLessonStatus/index.ts`: atualizar import de `LessonStatus` para vir de `@/types/lesson`
    - _Requirements: 1.4_

- [x] 3. Limpar código morto e habilitar TypeScript strict
  - [x] 3.1 Verificar se `src/app/globals.css` e `src/app/page.module.css` são referenciados em algum componente
    - Se `globals.css` for importado apenas em `layout.tsx` e não houver regras conflitantes com styled-components, mantê-lo; caso contrário, remover e garantir que `GlobalStyle` do styled-components cobre os resets necessários
    - Se `page.module.css` não for importado em nenhum arquivo, deletá-lo
    - _Requirements: 9.2_

  - [x] 3.2 Habilitar `"strict": true` no `tsconfig.json`
    - Alterar `"strict": false` para `"strict": true`
    - Executar `npx tsc --noEmit` para listar todos os erros introduzidos
    - Corrigir erros inline: substituir `error: any` por `error: unknown` com cast, adicionar verificações de `undefined` onde necessário, tipar parâmetros implicitamente `any`
    - Se o número de erros exceder 20, criar `src/types/strict-migration.md` com plano incremental antes de corrigir
    - _Requirements: 9.4, 9.5_

- [x] 4. Renomear arquivos de estilo e atualizar imports
  - Renomear `src/app/dashboard/styles.tsx` → `src/app/dashboard/Dashboard.styles.tsx`
  - Renomear `src/app/device/styles.tsx` → `src/app/device/Device.styles.tsx`
  - Renomear `src/app/register/styles.tsx` → `src/app/register/Register.styles.tsx`
  - Atualizar o import em `src/app/dashboard/page.tsx`: `from './styles'` → `from './Dashboard.styles'`
  - Atualizar o import em `src/app/dashboard/components/AthleteCard.tsx` se importar de `../styles`
  - Atualizar o import em `src/app/device/page.tsx`: `from './styles'` → `from './Device.styles'`
  - Atualizar o import em `src/app/register/page.tsx`: `from './styles'` → `from './Register.styles'`
  - Executar `next build` para confirmar que nenhum import quebrou
  - _Requirements: 2.1, 2.2, 2.4, 10.2, 10.3_

- [x] 5. Eliminar inline styles — criar styled-components substitutos
  - [x] 5.1 Adicionar `LoadingMessage` em `Dashboard.styles.tsx` e substituir o `<div style={{ color: '#fff', textAlign: 'center', paddingTop: '50px' }}>` em `dashboard/page.tsx`
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 5.2 Adicionar `EmptyResultMessage` em `Podium.styles.tsx` e substituir o `<div style={{ color: '#fff', fontSize: '18px' }}>` em `Podium.tsx`
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 5.3 Adicionar `UserSectionDivider`, `UserSectionLabel` e `EmptyStateHint` em `Device.styles.tsx` e substituir os três inline styles em `device/page.tsx`
    - `UserSectionDivider`: substitui `<div style={{ gridColumn: '1 / -1', borderTop: ..., paddingTop: ..., marginTop: ... }}>`
    - `UserSectionLabel`: substitui `<strong style={{ color: ..., fontSize: '12px', textTransform: ..., display: ..., marginBottom: ... }}>`
    - `EmptyStateHint`: substitui `<p style={{ fontSize: '12px', marginTop: '8px' }}>`
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 5.4 Adicionar prop transiente `$marginBottom` em `ErrorMessage` e `SuccessMessage` em `Register.styles.tsx` e substituir os inline styles em `register/page.tsx`
    - Substituir `<ErrorMessage style={{ marginBottom: '20px' }}>` por `<ErrorMessage $marginBottom="20px">`
    - Substituir `<SuccessMessage style={{ marginBottom: '20px' }}>` por `<SuccessMessage $marginBottom="20px">`
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 6. Criar hook `useDashboardZones`
  - Criar `src/hooks/useDashboardZones/index.ts`
  - O hook recebe `{ isActive: boolean, resultData?: LessonResult, pulseirasData: HeartRateData[] }` e retorna `ZoneStats[]`
  - Extrair o bloco `useMemo` de `dashboard/page.tsx` (≈30 linhas) para dentro do hook
  - O hook deve importar `useMemo` de `react`, `ZoneStats` e `HeartRateData` de `@/types/heartRate`, `LessonResult` de `@/types/lessonResult`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Criar hook `useDevicePage`
  - Criar `src/hooks/useDevicePage/index.ts`
  - Encapsular os 5 estados locais de `device/page.tsx`: `selectedDeviceId`, `selectedUserId`, `isStarting`, `isEnding`, `isModalOpen`
  - Encapsular os 4 handlers: `handleSelectDevice`, `handleLinkDevice`, `handleStartLesson`, `handleEndLesson`, mais `handleCloseModal` e `setSelectedUserId`
  - Orquestrar internamente: `useAvailableDevices`, `useUsersList`, `useLinkDevice`, `useLessonStatus`, `startLesson`, `endLesson`
  - Exportar interface `UseDevicePageReturn` com todos os campos tipados conforme o design
  - Expor `isLoading` (derivado de `devicesLoading || usersLoading`), `canLinkDevice`, `selectedDevice`, `isError`, `isSuccess`, `error`, `isLinking`
  - Capturar erros de `startLesson`/`endLesson` em estado local e expô-los via `error`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 8. Refatorar pages para usar novos hooks e extrair `LinkUserModal`
  - [x] 8.1 Refatorar `dashboard/page.tsx` para usar `useDashboardZones`
    - Remover o bloco `useMemo` de `zoneStats` da page
    - Adicionar `import { useDashboardZones } from '@/hooks/useDashboardZones'`
    - Chamar `useDashboardZones({ isActive, resultData, pulseirasData: pulseirasData ?? [] })`
    - Verificar que a page tem ≤ 100 linhas após a extração
    - _Requirements: 3.1, 3.2, 3.4, 10.4_

  - [x] 8.2 Extrair `LinkUserModal` de `device/page.tsx`
    - Criar `src/app/device/components/LinkUserModal.tsx`
    - Mover o bloco JSX do modal (≈60 linhas) para o novo componente com as props tipadas conforme o design: `isOpen`, `selectedDevice`, `users`, `selectedUserId`, `isLinking`, `isSuccess`, `isError`, `error`, `canLinkDevice`, `onClose`, `onUserSelect`, `onLink`
    - _Requirements: 3.3, 10.4_

  - [x] 8.3 Refatorar `device/page.tsx` para usar `useDevicePage` e `LinkUserModal`
    - Remover todos os `useState`, `useEffect`, handlers e imports de hooks/services individuais
    - Adicionar `import { useDevicePage } from '@/hooks/useDevicePage'`
    - Adicionar `import { LinkUserModal } from './components/LinkUserModal'`
    - Substituir o bloco do modal inline por `<LinkUserModal {...props} />`
    - Verificar que a page tem ≤ 100 linhas após a refatoração
    - _Requirements: 3.1, 3.4, 10.4_

- [x] 9. Checkpoint — verificar build e ausência de inline styles
  - Executar `next build` e confirmar saída sem erros
  - Executar `grep -r "style={{" src/app` e confirmar zero ocorrências
  - Garantir que todas as rotas `/dashboard`, `/device`, `/register` continuam funcionando
  - _Requirements: 7.1, 10.1, 10.3_

- [x] 10. Escrever testes para custom hooks existentes
  - [x] 10.1 Criar `src/hooks/usePulseiras/usePulseiras.test.ts`
    - Mock de `@/services/fetchPulseiras` com `jest.mock`
    - Wrapper com `QueryClientProvider` e `QueryClient({ defaultOptions: { queries: { retry: false } } })`
    - Cenários: `isLoading=true` inicial, dados retornados no sucesso, `isError=true` quando service lança erro
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 10.2 Criar `src/hooks/useLessonStatus/useLessonStatus.test.ts`
    - Mock de `@/services/fetchLessonStatus`
    - Cenários: loading, sucesso com `{ lessonId, status: 'ACTIVE', startedAt, duration }`, erro
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 10.3 Criar `src/hooks/useLessonResult/useLessonResult.test.ts`
    - Mock de `@/services/fetchLessonResult`
    - Cenários: hook desabilitado quando `enabled=false` (não deve chamar o service), sucesso, erro
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 10.4 Criar `src/hooks/useAvailableDevices/useAvailableDevices.test.ts`
    - Mock de `@/services/fetchAvailableDevices`
    - Cenários: loading, sucesso com array de `Device[]`, erro
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 10.5 Criar `src/hooks/useUsersList/useUsersList.test.ts`
    - Mock de `@/services/fetchUsersList`
    - Cenários: loading, sucesso com array de `User[]`, erro
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 10.6 Criar `src/hooks/useLinkDevice/useLinkDevice.test.ts`
    - Mock de `@/services/fetchLinkDevice`
    - Cenários de mutation: chamada com `{ deviceId, userId }` válidos, erro na mutation
    - Verificar que `queryClient.invalidateQueries` é chamado no `onSuccess`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6_

  - [x] 10.7 Criar `src/hooks/useRegister/useRegister.test.ts`
    - Mock de `@/services/fetchRegister`
    - Cenários de mutation: chamada com `RegisterData` válido, erro na mutation
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6_

  - [x] 10.8 Criar `src/hooks/useIsMobile/useIsMobile.test.ts`
    - Mock de `window.innerWidth` e `window.addEventListener`
    - Cenários: retorna `false` quando `innerWidth > breakpoint`, retorna `true` quando `innerWidth <= breakpoint`, atualiza ao disparar evento `resize`
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 10.9 Criar `src/hooks/useDashboardZones/useDashboardZones.test.ts`
    - Cenários: retorna zonas calculadas a partir de `pulseirasData` quando `isActive=true`, retorna zonas somadas de `resultData.deviceResults` quando `isActive=false`, retorna array de 5 zonas com `count=0` quando não há dados
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

  - [x] 10.10 Criar `src/hooks/useDevicePage/useDevicePage.test.ts`
    - Mock de `useAvailableDevices`, `useUsersList`, `useLinkDevice`, `useLessonStatus`, `startLesson`, `endLesson`
    - Cenários: estado inicial correto, `handleSelectDevice` abre modal e define `selectedDeviceId`, `handleLinkDevice` chama `linkDevice` com os IDs corretos, `handleCloseModal` fecha modal, `handleStartLesson` chama `startLesson` e gerencia `isStarting`, `handleEndLesson` chama `endLesson` e gerencia `isEnding`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 11. Escrever testes para utilitários e services
  - [ ] 11.1 Criar `src/utils/toBRL.test.ts`
    - Cenário de exemplo: `toBRL(0)` retorna `'R$ 0,00'`
    - Cenário de exemplo: `toBRL(1234.56)` retorna string contendo `'1.234,56'`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 11.2 Escrever property test para `toBRL` (Property 1)
    - **Property 1: `toBRL` formata qualquer número não-negativo como BRL**
    - Usar `fc.float({ min: 0, max: 1_000_000, noNaN: true })` com `numRuns: 100`
    - Verificar que o resultado corresponde a `/^R\$\s[\d.]+,\d{2}$/`
    - Adicionar tag `// Feature: nextjs-refactoring, Property 1: toBRL formats any non-negative number as BRL`
    - **Validates: Requirements 6.3**

  - [ ] 11.3 Criar `src/services/fetchAvailableDevices/fetchAvailableDevices.test.ts`
    - Mock de `global.fetch` com `jest.spyOn`
    - Cenários: retorna array de `Device[]` em resposta 200, lança `Error` em resposta 404, lança `Error` em resposta 500
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ] 11.4 Criar `src/services/fetchLessonStatus/fetchLessonStatus.test.ts`
    - Mock de `global.fetch`
    - Cenários: retorna `LessonStatus` em resposta 200, lança `Error` com mensagem descritiva em resposta não-2xx
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ]* 11.5 Escrever property test para services (Property 2) em `fetchLessonStatus.test.ts`
    - **Property 2: services lançam `Error` para qualquer status HTTP 4xx/5xx**
    - Usar `fc.integer({ min: 400, max: 599 })` com `fc.asyncProperty` e `numRuns: 100`
    - Mock de `global.fetch` com `jest.spyOn(...).mockResolvedValueOnce(new Response(..., { status }))`
    - Verificar que `fetchLessonStatus()` rejeita com instância de `Error`
    - Adicionar tag `// Feature: nextjs-refactoring, Property 2: services throw Error for any non-2xx status`
    - **Validates: Requirements 6.7**

  - [ ] 11.6 Criar `src/services/fetchLessonResult/fetchLessonResult.test.ts`
    - Mock de `global.fetch`
    - Cenários: retorna `LessonResult` em resposta 200, lança `Error` em resposta não-2xx
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ] 11.7 Criar `src/services/fetchPulseiras/fetchPulseiras.test.ts`
    - Mock de `global.fetch`
    - Cenários: retorna `HeartRateData[]` em resposta 200, lança `Error` em resposta não-2xx (corrigindo o comportamento atual de `console.warn` + retorno `undefined`)
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ] 11.8 Criar `src/services/fetchUsersList/fetchUsersList.test.ts`
    - Mock de `global.fetch`
    - Cenários: retorna `User[]` em resposta 200, retorna array vazio quando resposta é `{ data: [] }`, lança `Error` em resposta não-2xx
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ] 11.9 Criar `src/services/fetchLinkDevice/fetchLinkDevice.test.ts`
    - Mock de `global.fetch`
    - Cenários: retorna `LinkDeviceResponse` em resposta 200, lança `Error` em resposta não-2xx
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ] 11.10 Criar `src/services/fetchRegister/fetchRegister.test.ts`
    - Mock de `global.fetch`
    - Cenários: retorna `RegisterResponse` em resposta 200, lança `Error` em resposta não-2xx
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ] 11.11 Criar `src/services/startLesson/startLesson.test.ts`
    - Mock de `global.fetch`
    - Cenários: resolve sem erro em resposta 200, lança `Error` em resposta não-2xx
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ] 11.12 Criar `src/services/endLesson/endLesson.test.ts`
    - Mock de `global.fetch`
    - Cenários: resolve sem erro em resposta 200, lança `Error` em resposta não-2xx
    - _Requirements: 6.5, 6.6, 6.7_

- [ ] 12. Checkpoint final — build e cobertura
  - Executar `yarn test --silent --bail --coverage` e verificar cobertura de linha ≥ 80% em `src/hooks/`
  - Executar `next build` e confirmar saída sem erros de compilação TypeScript ou de módulo
  - Confirmar que `npx tsc --noEmit` não retorna erros com `"strict": true`
  - _Requirements: 5.7, 10.3, 10.6_

## Notas

- Tarefas marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Os checkpoints (tarefas 9 e 12) garantem validação incremental
- Property tests validam invariantes universais; testes de exemplo validam comportamentos específicos
- Sempre executar testes com `--silent --bail` para evitar output excessivo e parar no primeiro erro
