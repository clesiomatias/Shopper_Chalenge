# 🚀 **Shopper Challenger**

Bem-vindo ao  **Shopper Challenger** , um projeto de integração entre **Next.js** e  **Node.js** , encapsulados em um ambiente Docker . Este repositório contém o frontend e backend para um sistema web otimizado e pronto para produção.

## 📋 **Descrição**

O objetivo deste projeto é criar uma aplicação web robusta que exemplifique minhas skils dom as melhores práticas de desenvolvimento com:

* **Frontend** : Next.js 15.x com TypeScript, utilizando recursos modernos como renderização híbrida e geração de páginas estáticas.
* **Backend** : Node.js com TypeScript, garantindo código escalável e tipado.
* **Containerização** : Docker, para garantir consistência entre os ambientes de desenvolvimento e produção.

---

## 🛠️ **Tecnologias Utilizadas**

* **Frontend** :
* [Next.js](https://nextjs.org/) com [TypeScript](https://www.typescriptlang.org/)  para o desenvolvimento do cliente.
* Suporte a variáveis de ambiente com `.env`.
* Build otimizado para produção com `npm run build`.
* **Backend** :
* [Node.js](https://nodejs.org/) e [TypeScript](https://www.typescriptlang.org/) para a API.
* Suporte a variáveis de ambiente e estrutura modular.
* **Infraestrutura** :
* Docker para orquestração de containers.
* Docker Compose para simplificar a configuração multi-container.

---

## 📦 **Estrutura do Repositório**

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">plaintext</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-plaintext">├── backend/
│   ├── api_node/
│   ├── Dockerfile
├── frontend/
│   ├── shopper_chalenger/
│   ├── Dockerfile
├── .env
├── docker-compose.yml
├── README.md
</code></div></div></pre>

---

## 🚀 **Como Rodar o Projeto Localmente**

### Pré-requisitos:

* [Docker](https://www.docker.com/) instalado.
* [Docker Compose]() configurado.

### Passos:

1. **Clone o Repositório**
   <pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">bash</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">git clone https://github.com/seuusuario/shopper-challenger.git
   cd shopper-challenger
   </code></div></div></pre>
2. **Configure o `.env`**
   Certifique-se de que seu arquivo `.env` na raiz contém aa variável [GOOGLE_API_KEY](https://developers.google.com/maps/documentation/routes/overview?hl=pt-br) válida.
3. **Inicie os Containers**
   <pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">bash</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">docker-compose up --build
   </code></div></div></pre>
4. **Acesse a Aplicação**
   * Frontend: [http://localhost:80](http://localhost:3000)
   * Backend: [http://localhost:8080](http://localhost:3001)

---

## 🧪 **Scripts Disponíveis**

### No Frontend:

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Cria uma build otimizada.
* `npm run start`: Inicia o servidor de produção.

### No Backend:

* `npm run start`: Inicia o servidor em produção.

---

## 🌟 **Contribuindo**

Contribuições são muito bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie sua branch (`git checkout -b minha-feature`).
3. Commit suas mudanças (`git commit -m 'Minha nova feature'`).
4. Faça o push para sua branch (`git push origin minha-feature`).
5. Abra um Pull Request.

---

## 📜 **Licença**

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Feito com 💻, ☕ e 🐳 por [Clésio Matias](https://github.com/clesiomatias).**
***Me sigam em minhas redes sociais
 🐙 [GitHub](https://github.com/clesiomatias)
 🔗 [LinkedIn](https://www.linkedin.com/in/clesiofmatias/)
 📸 [Instagram](https://www.instagram.com/clesiomatias/)***
**Visite meu [portfólio](https://clesiomatias-portfolio.netlify.app/).**