# 🚀 Fastify App

A high-performance Node.js API built with **Fastify**, written in **TypeScript**, and configured with **ESLint** and **Prettier** for consistent code style and code quality.

---

## 📦 Tech Stack

- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Nodemon](https://nodemon.io/)

---

## 📁 Project Structure

```

.
├── src/
│   ├── routes/           # API route handlers (routes and schemas)
│   ├── controller/       # Request handlers (controller logic)
│   ├── services/         # Business logic or database integration
│   └── server.ts         # App entry point (Fastify instance & bootstrap)
├── .eslintrc.js          # ESLint config
├── .prettierrc           # Prettier config
├── tsconfig.json         # TypeScript config
└── package.json

````

---

## 🛠️ Scripts

| Command           | Description                                      |
|------------------|--------------------------------------------------|
| `npm run dev`    | Starts the app in development mode (with reload) |
| `npm run build`  | Compiles TypeScript files to JavaScript (`dist/`)|
| `npm run lint`   | Checks code for linting errors using ESLint      |
| `npm run format` | Formats code using Prettier                      |

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run in development**

   ```bash
   npm run dev
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Lint and format code**

   ```bash
   npm run lint
   npm run format
   ```

---

## 📬 Example Request

```bash
curl http://localhost:3000/posts
```

## 📄 License

MIT License
