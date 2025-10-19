# 🔗 Encurtador de Links (Front-end)

O **Encurtador de Links** é uma aplicação web que permite transformar URLs longas em links curtos, facilitando o compartilhamento e o monitoramento de acessos. O sistema foi desenvolvido com React no front-end e Node.js + Fastify + Drizzle ORM no back-end.

> 🔗 [Repositório do Back-end](https://github.com/luanabrizola/Encurtador-back-end)

## 📄 Descrição do Projeto
O front-end do Encurtador de Links é responsável por fornecer uma interface para criar, visualizar, editar, excluir e compartilhar links encurtados. Ele consome a API fornecida pelo back-end e exibe informações como legenda, link curto, URL original, contagem de cliques e data de criação.

## 🚀 Tecnologias Utilizadas

* [React JS](https://reactjs.org/) – Biblioteca JavaScript para construção da interface de usuário.
* [Vite](https://vitejs.dev/) - Ferramenta de build rápida para projetos front-end.
* [Tailwind CSS](https://tailwindcss.com/) – Framework CSS utilitário para estilização rápida.
* [React Icons](https://react-icons.github.io/react-icons/) – Biblioteca de ícones SVG para React.

## 🌐 Link da Aplicação

> **Front-end:** Hospedado na [Vercel](https://vercel.com/): [https://encurtador-front-end.vercel.app](https://encurtador-front-end.vercel.app)

O front-end da aplicação está hospedado na Vercel e fornece a interface do Encurtador de Links, permitindo criar, editar, excluir e compartilhar URLs encurtadas de forma prática. Ele consome os dados diretamente da API hospedada no Render, sem a necessidade de executar o servidor localmente.


## 📁 Estrutura do Projeto

```
Encurtador-front-end/
│
├── public/
├── src/
|    |   Home.jsx
|    ├── main.jsx
|    ├── index.css
├── node_modules/
├── .gitignore
├── eslint.config.js
├── package.json
├── index.html
├── README.md
└── vite.config.js
```

### 🔧 Instalação

1. Clone o repositório:

```
git clone https://github.com/luanabrizola/Encurtador-front-end.git
cd Encurtador-front-end
```

2. Instale as dependências:

```
npm install
```

## ⚙️ Rodando o Projeto Localmente (Front + Back)

Para executar a aplicação completa localmente (front-end e back-end), siga os passos abaixo:

1. Clone o repositório do back-end:
```
git clone https://github.com/luanabrizola/Encurtador-back-end.git
```

2. Configure e rode o back-end conforme as instruções no README do repositório do back-end.

3. Configure o front-end para usar o back-end local:
   - No arquivo `src/Home.jsx`, altere a URL da API na linha 7:
   ```
   const API_URL = "https://encurtador-back-end.onrender.com";
   ```
    para apontar para o servidor local do back-end:
    ```
    const API_URL = "http://localhost:3333";
    ```

4. Inicie o front-end:
```
npm run dev
```
Acesse a aplicação em: 👉 http://localhost:5173

## ✨ Funcionalidade Extra

Ao criar ou visualizar um link encurtado, o usuário pode compartilhar o link com apenas um clique em plataformas como WhatsApp, Telegram, Facebook e Twitter. Cada botão gera automaticamente a URL de compartilhamento adequada, incluindo o link curto, sem necessidade de copiar e colar manualmente. Essa funcionalidade tem como objetivo facilitar o compartilhamento rápido e direto dos links criados, tornando o sistema mais prático e melhorando a experiência do usuário ao permitir que ele compartilhe seus links encurtados diretamente nas redes sociais favoritas, economizando tempo e esforço.


## ✒️ Autores

- Ana Julia Defendi - @defendii: Responsável pela estruturação dos cards e pela funcionalidade de compartilhar link curto nas redes sociais.
- Ana Julia Menegasso - @AnaMenegasso: Responsável pela implementação da funcionalidade de editar o link curto executada junto com o back-end.
- Luana Rodrigues Brizola - @luanabrizola: Responsável pela estruturação do cabeçalho e formulário e pela implementação das funcionalidades de criar, excluir e copiar o link curto executadas junto com o back-end.
