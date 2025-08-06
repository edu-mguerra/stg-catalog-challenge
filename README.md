
# stg-catalog-challenge
Sistema completo de e-commerce com autenticação, catálogo, carrinho, histórico de pedidos e finalização via WhatsApp, construído com Next.js, TypeScript, Tailwind CSS e Supabase.

# Funcionalidades
- Autenticação com email (login/registro/proteção de rotas/logout)

- Catálogo responsivo com busca e filtro por categoria

- Visualização detalhada de produtos

- Carrinho com edição de quantidade, remoção e finalização via WhatsApp

- Histórico de pedidos salvo no Supabase

- Interface moderna com tema vidro (glassmorphism) e responsividade

- Mensagem formatada e link automático para WhatsApp no checkout

# Tecnologias Utilizadas
- Next.js + React + TypeScript

- Tailwind CSS

- Supabase (Auth, Database, Storage)

- WhatsApp API (link wa.me)

- IA para acelerar o desenvolvimento (ex: ChatGPT)

- IA Utilizada:
Utilizei o ChatGPT para auxiliar na lógica e no direcionamento do design, com foco especial na lógica do carrinho e na resolução de erros via logs. Além disso, o ChatGPT me ajudou a criar os produtos, fornecendo todas as informações necessárias, incluindo imagens.

# Links


Deploy funcionando: [https://stg-catalog-challenge-delta.vercel.app/]

# Observações
O pagamento é simulado; 
A finalização acontece via WhatsApp.


## Variáveis de Ambiente

# Instale as dependências: `npm install`

- Configure variáveis de ambiente para o Supabase (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

- Rode o projeto: 
  `npm run dev`

Acesse no navegador: `http://localhost:3000`



