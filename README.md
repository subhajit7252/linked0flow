🧠 linked0flow

A Visual Memory Manager + Toy Compiler built in React

💡 Project Overview

linked0flow is an educational simulation tool that mimics how memory works in a simplified virtual system. You can:

Write and compile basic instructions (var, print, free, arithmetic)

Visualize memory blocks being allocated

Highlight blocks during reads (e.g. print a)

Simulate linked list-style variables (list a = [1,2,3])

Learn compiler basics and memory visualization in one place

🚀 Features

🧾 Compiler

var a = 5 → allocates memory

print a → prints and highlights memory block

var c = a + b → performs arithmetic

free a → releases memory

list x = [1,2,3] → creates sequential memory blocks (linked style)

🧠 Memory Visualizer

Color-coded blocks

Blue = allocated

Yellow = accessed

White = free

Real-time state update on compile

💻 Tech Stack

React + TailwindCSS (frontend)

Core logic in vanilla JS (compiler & memory manager)

📦 Future Plans

push, pop, insert support for linked list

True pointer visualization

Step-run mode for compiler

GitHub-hosted live demo

Export/import memory snapshots

🛠 How to Run

git clone https://github.com/subhajit7252/linked0flow
cd linked0flow
npm install
npm run dev  # or npm start

🙏 Credits

Built as part of a personal learning journey into:

Memory models

Compiler theory

React state visualizations

Mindful coding rituals

Designed and imagined by SUBHAJIT CHATTERJEE

“Real compilers don't just parse code — they compile beliefs into memory.”