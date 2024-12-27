# Instructions for the AI
Follow the user’s requirements carefully & to the letter.

This is a money manager app helping users record and manage their expenses.

## Step-by-Step Approach
- First think step-by-step: describe your plan for what to build in pseudocode, in great detail.
- Confirm, then write code!

## Best Practices
- Always write correct, best practice, DRY principle (Don't Repeat Yourself), bug-free, fully functional, and working code aligned with the listed rules under Code Implementation Guidelines.
- Focus on easy readability of code over performance.
- Fully implement all requested functionality.
- Leave NO todos, placeholders, or missing pieces.
- Ensure code is complete and thoroughly verified.
- Include all required imports and ensure proper naming of key components.
- Be concise; minimize any other prose.
- If you think there might not be a correct answer, say so.
- If you do not know the answer, say so, instead of guessing.

## Coding Environment
The user asks questions about the following technologies:
- Next.js
- TypeScript
- TailwindCSS
- Shadcn UI
- Prisma
- MySQL

## Code Review
- Ensure all code is reviewed before submission.
- Ensure all code is formatted correctly.
- Ensure all code is readable and follows best practices.
- Ensure all code is free of errors and bugs.
- Ensure all code is optimized for performance.
- Ensure all code is secure and follows best practices.
- Ensure all code is well-documented and easy to understand.
- Ensure all code is organized and follows best practices.
- Ensure all code is tested and follows best practices.

## Code Implementation Guidelines
Follow these rules when writing code:
- Use early returns whenever possible to make the code more readable.
- Always use Tailwind classes for styling HTML elements; avoid using CSS or inline styles.
- Use “class:” instead of the ternary operator in class tags whenever possible.
- Use descriptive variable and function/const names. Event functions should be named with a “handle” prefix (e.g., `handleClick`, `handleKeyDown`).
- Implement accessibility features (e.g., `tabindex="0"`, `aria-label`, `onClick`, `onKeyDown`).
- Use consts instead of functions (e.g., `const toggle = () =>`). Also define a type if possible.
- Ensure all data interactions are secure, especially for user authentication and financial data.
- Follow DRY principles to avoid duplication.
- Use TypeScript features like interfaces, types, and generics where appropriate.
- Ensure all components are functional and pass prop types correctly.
- Handle errors gracefully and provide user feedback when necessary.
- Optimize code for readability and maintainability.
- Always prioritize secure APIs and evaluate potential risks.
- Encapsulate logic within utility functions for better maintainability.
- Adhere to clean architecture principles, keeping concerns separate and code organized.

## Folder Structure and Naming Conventions
- Follow the standard Next.js file structure.
- Name files and folders using kebab-case for consistency.
- Organize components, pages, and utilities into separate directories.
- Use descriptive names that reflect the purpose of the component or utility.
- New components are created in components folder directory
wealth-path
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── fonts
├── favicon.ico
├── lib
│   └── utils.ts
├── node_modules
├── .env
├── .eslintrc.json
├── .gitignore
├── code-style.md
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

