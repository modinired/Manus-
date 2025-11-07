Text file: www.theunwindai.com_p_architecture-behind-manus-ai-agent.md
Latest content with line numbers:
1	# Architecture Behind Manus AI Agent
2	
3	**URL:** https://www.theunwindai.com/p/architecture-behind-manus-ai-agent
4	
5	---
6	
7	unwind ai
8	About Us
9	Awesome LLM Apps
10	Sponsor Us
11	Login
12	Subscribe
13	unwind ai
14	Posts
15	Architecture Behind Manus AI Agent
16	Architecture Behind Manus AI Agent
17	PLUS: Standardized codebases for agentic systems, Qwen multimodal reasoning model
18	
19	Shubham Saboo & Gargi Gupta
20	March 28, 2025
21	
22	In partnership with
23	
24	Today’s top AI Highlights:
25	
26	CodeAct: AI Agents write and execute Python code on-the-fly to complete tasks
27	
28	Free ready-made backend templates for agent systems in production
29	
30	Give your Cursor AI agent a persistent memory with this MCP server
31	
32	Qwen’s opensource model that can reason over text, images, and videos
33	
34	Browserbase MCP server for LLMs to autonomously use a browser
35	
36	& so much more!
37	
38	Read time: 3 mins
39	
40	AI Tutorials
41	
42	We've been stuck in text-based AI interfaces for too long. Sure, they work, but they're not the most natural way humans communicate. Now, with OpenAI's new Agents SDK and their recent text-to-speech models, we can build voice applications without drowning in complexity or code.
43	
44	In this tutorial, we'll build a Multi-agent Voice RAG system that speaks its answers aloud. We'll create a multi-agent workflow where specialized AI agents handle different parts of the process - one agent focuses on processing documentation content, another optimizes responses for natural speech, and finally OpenAI's text-to-speech model delivers the answer in a human-like voice.
45	
46	Our RAG app uses OpenAI Agents SDK to create and orchestrate these agents that handle different stages of the workflow. OpenAI’s new speech model GPT-4o-mini TTS enhances the overall user experience with a natural, emotion-rich voice. You can easily steer its voice characteristics like the tone, pacing, emotion, and personality traits with simple natural language instructions.
47	
48	We share hands-on tutorials like this every week, designed to help you stay ahead in the world of AI. If you're serious about leveling up your AI skills and staying ahead of the curve, subscribe now and be the first to access our latest tutorials.
49	
50	Build a Voice RAG Agent
51	
52	Fully functional agentic RAG voice app with step-by-step instructions (100% opensource)
53	
54	Don’t forget to share this newsletter on your social channels and tag Unwind AI (X, LinkedIn, Threads, Facebook) to support us!
55	
56	Latest Developments
57	
58	Standardized Codebases for Agentic Systems 🔓📒
59	
60	Agno has launched Workspaces, an open-source toolkit that eliminates the infrastructure hurdles when building production-ready AI agent systems. Workspaces are standardized codebases for production Agentic Systems that contain a RestAPI (FastAPI) for serving agents, teams, and workflows, a Streamlit application for testing, and a Postgres database for session and vector storage.
61	
62	Workspaces are set up to run locally using Docker and be easily deployed to AWS. What makes this significant is that it handles the entire operational layer, allowing you to focus on agent logic rather than DevOps setup.
63	
64	Key Highlights:
65	
66	Complete agent infrastructure stack - Includes a FastAPI backend for serving agents and workflows, Postgres for session data and vector storage, and a Streamlit admin interface for testing and evaluation, all preconfigured to work together.
67	
68	Deployment options - Local development runs using Docker with simple workspace commands, while production deployment to AWS is handled through the same CLI with proper infrastructure management and secrets control.
69	
70	Multiple workspace templates - Choose between Agent App (full stack with admin interface) or Agent API (backend only) templates depending on project requirements, with both supporting agent teams and complex workflows.
71	
72	Database integration - Preconfigured SQLAlchemy and Alembic setup handles migrations, with support for knowledge bases, session storage, and agent state persistence while maintaining high performance at scale.
73	
74	The first search engine for leads
75	
76	Leadsforge is the very first search engine for leads. With a chat-like, easy interface, getting new leads is as easy as texting a friend! Just describe your ideal customer in the chat - industry, role, location, or other specific criteria - and our AI-powered search engine will instantly find and verify the best leads for you. No more guesswork, just results. Your lead lists will be ready in minutes!
77	
78	Sign & get 100 credits
79	
80	CodeAct: Architecture Behind Manus AI and Its Implementation
81	
82	Manus AI has impressed all of us with its autonomous task execution. You might have heard people criticising it for being a mere wrapper around Claude 3.5 Sonnet and fine-tuned Qwen models. But it’s much more than that. This multi-agent system is based on CodeAct architecture, a powerful alternative to traditional tool-calling approaches for AI agents.
83	
84	CodeAct equips AI agents with a Python Interpreter to write and execute Python code instead of making JSON function calls with built-in tool calling parameters, making them more efficient at solving complex problems. It gives agents the full power of Python to combine tools, maintain state, and process multiple inputs in a single step. It has demonstrated up to 20% higher success rates in benchmark tests.
85	
86	Key Highlights:
87	
88	Flexible Tool Combination & Logic - CodeAct lets your agent create intricate Python code to orchestrate tools in complex sequences, opening up possibilities for advanced workflows and adaptive decision-making. Think on-the-fly data transformation between tools and conditional branching based on results.
89	
90	Built-In Self-Debugging & Error Recovery - CodeAct leverages Python's robust error handling. When things go wrong, the agent can analyze error messages, adapt its code, and retry, leading to more resilient and autonomous task completion – a massive benefit for real-world deployment.
91	
92	Python's Extensive Ecosystem - CodeAct can make use of the vast library of Python modules to achieve various automation requirements, instead of being limited by custom-defined and specific tools. Imagine your agents interacting with APIs, performing complex data manipulation, or controlling external systems – all within a unified framework.
93	
94	Implement using LangGraph - The langgraph-codeact library implements CodeAct agents within LangGraph, offering message history persistence, variable management, and a customizable sandbox for secure code execution. Install it with pip install langgraph-codeact. You can use this with any model supported by LangChain.
95	
96	Quick Bites
97	
98	Alibaba Qwen team has officially released QVQ-Max multimodal reasoning model, previewed earlier in December, that can not only “understand” the content in images and videos but also analyze and reason with this information to give answers. The model is great at parsing images, even pointing out small details that you might overlook. This makes it the first open-weights model that can reason over images and videos. Available on GitHub, Hugging Face and Modelscope, you can try it for free on Qwen Chat.
99	
100	Cognition just launched "Devin Search" – a tool to help developers quickly understand codebases. It has two options: regular mode for fast answers about how features are built, and Deep Mode for complex questions like explaining system architecture. You can share search results with teammates and jump straight into Devin sessions from any search result. It’s available to all users.
101	
102	Zep AI just released a Graphiti MCP server that gives Cursor IDE persistent memory. Now your Cursor AI agent can remember your coding preferences and project specs between sessions without starting from scratch every time. The setup is pretty straightforward – configure Cursor as an MCP client, and Graphiti handles the knowledge graph that tracks how your requirements evolve over time.
103	
104	Tools of the Trade
105	
106	Browserbase MCP server: Allows LLMs to control cloud-based web browsers through Browserbase and Stagehand, enabling AI to perform actions like navigating websites, capturing screenshots, extracting data, and executing JavaScript without local browser installation.
107	
108	Kilo Code: An open-source AI agent VS Code extension that generates code, automates tasks, and provides suggestions to help you code more efficiently. It offers $15 worth of free Claude 3.7 Sonnet tokens with signup (no credit card needed)
109	
110	HyperPilot: A free playground to test and compare AI browser agents like OpenAI Operator and Claude Computer Use without the typical cost barriers or setup complexity. It's built on Hyperbrowser's infrastructure which enables you to integrate these browser agents into your own applications with just an API and 5 lines of code.
111	
112	Awesome LLM Apps: Build awesome LLM apps with RAG, AI agents, and more to interact with data sources like GitHub, Gmail, PDFs, and YouTube videos, and automate complex work.
113	
114	Hot Takes
115	
116	The reality of building web apps in 2025 is that it's a bit like assembling IKEA furniture. There's no "full-stack" product with batteries included, you have to piece together and configure many individual services:
117	- frontend / backend (e.g. React, Next.js, APIs)
118	- hosting (cdn, https, domains, autoscaling)
119	- database
120	- authentication (custom, social logins)
121	- blob storage (file uploads, urls, cdn-backed)
122	- email
123	- payments
124	- background jobs
125	- analytics
126	- monitoring
127	- dev tools (CI/CD, staging)
128	- secrets
129	- ...
130	I'm relatively new to modern web dev and find the above a bit overwhelming, e.g. I'm embarrassed to share it took me ~3 hours the other day to create and configure a supabase with a vercel app and resolve a few errors. The second you stray just slightly from the "getting started" tutorial in the docs you're suddenly in the wilderness. It's not even code, it's... configurations, plumbing, orchestration, workflows, best practices. A lot of glory will go to whoever figures out how to make it accessible and "just work" out of the box, for both humans and, increasingly and especially, AIs. ~
131	Andrej Karpathy
132	
133	
134	
135	AGI = All Ghibli Images? ~
136	AK
137	
138	That’s all for today! See you tomorrow with more such AI-filled content.
139	
140	Don’t forget to share this newsletter on your social channels and tag Unwind AI to support us!
141	
142	Unwind AI - X | LinkedIn | Threads | Facebook
143	
144	Awesome LLM Apps | Sponsor Us
145	
146	PS: We curate this AI newsletter every day for FREE, your support is what keeps us going. If you find value in what you read, share it with at least one, two (or 20) of your friends 😉 
147	
148	Subscribe now for FREE!
149	Reply
150	Newest first
151	Add your comment
152	Login
153	Login or Subscribe to participate.
154	Keep reading
155	Meta Llama-3 405B Preview in WhatsApp
156	
157	PLUS: Updates to Google's Vertex AI, Open LLM Leaderboard v2
158	
159	Gargi Gupta, Shubham Saboo /
160	
161	Opensource Qwen2.5 Omni with Real-time Video
162	
163	PLUS: AI agent frameworks that support MCP servers, Grok available on Telegram
164	
165	Shubham Saboo, Gargi Gupta /
166	
167	Build Claude Code from Scratch
168	
169	PLUS: Grok 2.5 is now open-source, Perplexity Comet leaked user credentials
170	
171	Shubham Saboo, Gargi Gupta /
172	
173	View more
174	
175	unwind ai
176	
177	Open-source Ecosystem for High-Leverage AI Builders
178	
179	Home
180	
181	Posts
182	
183	Authors
184	
185	About
186	
187	About Us
188	
189	Awesome LLM Apps
190	
191	Awesome LLM Apps
192	
193	© 2025 unwind ai.
194	
195	Privacy policy
196	
197	Terms of use
198	
199	Powered by beehiiv