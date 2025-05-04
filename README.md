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

print x[1] → prints specific node from linked list

push x = 9 → adds node at the end of the list

pop x → removes last node

insert x at 1 = 99 → inserts value in between

🧠 Memory Visualizer

Color-coded blocks

Blue = allocated

Yellow = accessed (highlighted)

White = free

Real-time state update on compile

Cascading flash animation for linked list

🔗 Linked List Visualizer (using Three.js)

Render linked list nodes in 3D space

Arrows/lines represent next pointers

Interactive layout (zoom, pan)

Node values rendered as floating labels

💻 Tech Stack

React + TailwindCSS (frontend)

Three.js (linked list visualizer)

Core logic in vanilla JS (compiler & memory manager)

📦 Future Plans

Step-run mode for compiler

Drag-and-drop memory defragmentation

GitHub-hosted live demo

Export/import memory snapshots

Runtime debug inspector panel

🛠 How to Run

git clone https://github.com/subhajit7252/linked0flow.git
cd linked0flow
npm install
npm run dev  # or npm start

🙏 Credits

Built as part of a personal learning journey into:

Memory models

Compiler theory

React state visualizations

Mindful coding rituals (Ghost Protocol)

3D visual rendering (Three.js)

Designed and imagined by SUBHAJIT CHATTERJEE

“Real compilers don't just parse code — they compile beliefs into memory.”