# Manus Clone: AI-Powered Agent Platform

**Version:** 1.0.0  
**Status:** Production Ready  
**License:** Proprietary

## Overview

Manus Clone is a production-ready AI agent platform inspired by [Manus.im](https://manus.im), designed to serve as both a commercial offering within the CESAR product package and as an internal tool for building AI-powered applications. The platform implements a **CodeAct-inspired architecture** [[1]](https://www.theunwindai.com/p/architecture-behind-manus-ai-agent), where the AI agent writes and executes Python code on-the-fly to accomplish complex tasks, providing significantly more flexibility than traditional tool-calling mechanisms.

## Key Features

The platform provides a comprehensive suite of features for building autonomous AI agents:

### Core Capabilities

**Autonomous Agent System**: The platform implements an advanced AI agent that can understand natural language requests, break them down into actionable steps, and execute them autonomously. The agent maintains context across multiple turns of conversation and can handle complex, multi-step tasks that would be difficult or impossible with conventional chatbots.

**Code Execution Sandbox**: Following the CodeAct paradigm [[1]](https://www.theunwindai.com/p/architecture-behind-manus-ai-agent), the agent can write and execute Python code in a secure sandbox environment. This enables the agent to perform calculations, data processing, file manipulation, and other tasks that require programmatic execution. The sandbox is designed to be secure and isolated, preventing malicious code from affecting the host system.

**Tool System**: The platform includes a flexible tool system that allows the agent to interact with external services and APIs. Built-in tools include code execution, file operations, web search, and data analysis. The tool system is extensible, allowing developers to add custom tools for specific use cases.

**Conversational Interface**: A modern, responsive chat interface built with React 19 and Tailwind CSS provides a seamless user experience. The interface supports real-time messaging, conversation management, and artifact viewing. The design is inspired by modern AI chat applications like ChatGPT and Claude, with a focus on usability and aesthetics.

**Persistent Storage**: All conversations, messages, and generated artifacts are stored in a PostgreSQL database, ensuring data persistence and enabling features like conversation history, search, and analytics. The database schema is designed for scalability and performance, with proper indexing and foreign key relationships.

### Technical Architecture

The platform is built on a modern, production-ready technology stack:

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS | Modern, responsive UI |
| **UI Components** | shadcn/ui | Consistent, accessible components |
| **Backend** | Express 4, tRPC 11 | Type-safe API layer |
| **Database** | PostgreSQL/MySQL, Drizzle ORM | Data persistence |
| **Authentication** | JWT, OAuth 2.0 | Secure user authentication |
| **LLM Integration** | OpenAI API, Anthropic API | AI agent intelligence |
| **Code Execution** | E2B, LangChain Sandbox | Secure code execution |

### Architecture Highlights

The platform follows a **microservices-inspired architecture** with clear separation of concerns:

**Frontend Layer**: The React-based frontend communicates with the backend exclusively through tRPC, providing end-to-end type safety. All UI components are built using shadcn/ui for consistency and accessibility. The frontend is optimized for performance with code splitting, lazy loading, and efficient state management.

**API Layer**: The tRPC-based API layer provides type-safe endpoints for all operations. The API is designed to be consumed by both the web frontend and external services, making it suitable for integration with other CESAR components. All endpoints are protected by authentication middleware, ensuring that only authorized users can access data.

**Agent Layer**: The AI agent orchestration layer manages the conversation flow, tool execution, and code generation. The agent uses a sophisticated prompt engineering approach to maximize the capabilities of the underlying LLM. The agent can maintain context across multiple turns, handle interruptions, and recover from errors gracefully.

**Tool Execution Layer**: The tool execution layer provides a secure environment for running untrusted code and interacting with external services. Tools are implemented as modular functions that can be easily extended or replaced. The execution layer includes rate limiting, timeout handling, and error recovery mechanisms.

**Data Layer**: The database layer uses Drizzle ORM for type-safe database operations. The schema is designed to support multi-tenancy, conversation history, artifact storage, and user management. All database queries are optimized for performance with proper indexing and query planning.

## Architecture Diagram

The following diagram illustrates the high-level architecture of the platform:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Chat UI     │  │ Conversation │  │  Artifacts   │      │
│  │  Component   │  │    List      │  │    Viewer    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ tRPC (Type-safe API)
┌─────────────────────────────────────────────────────────────┐
│                         API Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Conversations│  │   Messages   │  │  Artifacts   │      │
│  │   Router     │  │    Router    │  │   Router     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Agent Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Agent      │  │     Tool     │  │   Sandbox    │      │
│  │ Orchestrator │  │   Executor   │  │   Manager    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │   LLM API    │  │  Code Sandbox│
│   Database   │  │ (OpenAI/etc) │  │     (E2B)    │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Database Schema

The platform uses a well-designed relational schema to support all features:

### Tables

**users**: Stores user accounts and authentication information. Each user has a unique ID, name, email, login method, role (user or admin), and timestamps for account creation and last sign-in.

**conversations**: Represents chat sessions. Each conversation belongs to a user and has a title, creation timestamp, and last update timestamp. Conversations are the primary organizational unit for messages and artifacts.

**messages**: Individual messages within conversations. Each message has a role (user, assistant, or system), content, optional metadata (stored as JSON), and a creation timestamp. Messages are ordered chronologically within conversations.

**tasks**: Represents agent tasks and their execution state. Each task has a status (pending, running, completed, or failed), input, output, error information, and timestamps. Tasks are used for tracking long-running operations and providing visibility into the agent's work.

**artifacts**: Stores generated files and outputs. Each artifact has a name, type, content (for small artifacts), storage URL (for large files in S3), metadata, and creation timestamp. Artifacts are associated with conversations and users.

### Relationships

The schema includes the following relationships:

- A user has many conversations
- A conversation has many messages
- A conversation has many artifacts
- A user has many tasks
- A conversation has many tasks

All relationships are enforced through foreign key constraints to maintain referential integrity.

## API Reference

The platform exposes a comprehensive tRPC API for all operations.

### Conversations API

The conversations API provides endpoints for managing chat sessions:

**`conversations.list`**: Returns all conversations for the authenticated user, ordered by last update time. This endpoint is used to populate the conversation sidebar in the UI.

**`conversations.create`**: Creates a new conversation with an optional title. Returns the newly created conversation object with a unique ID.

**`conversations.get`**: Retrieves a specific conversation by ID. Returns the conversation object or undefined if not found.

### Messages API

The messages API handles message sending and retrieval:

**`messages.list`**: Returns all messages in a conversation, ordered chronologically. This endpoint is used to display the conversation history in the chat interface.

**`messages.send`**: Sends a user message and triggers the AI agent to generate a response. This endpoint:
1. Saves the user message to the database
2. Retrieves the conversation history
3. Invokes the AI agent with the full context
4. Saves the agent's response to the database
5. Updates the conversation timestamp
6. Returns both the user message and assistant response

### Artifacts API

The artifacts API provides access to generated files and outputs:

**`artifacts.list`**: Returns all artifacts for the authenticated user, ordered by creation time.

**`artifacts.byConversation`**: Returns all artifacts associated with a specific conversation.

## Installation and Setup

Follow these steps to install and configure the platform:

### Prerequisites

Ensure you have the following installed:

- Node.js 22.13.0 or later
- pnpm 9.0.0 or later
- MySQL 8.0+ or PostgreSQL 14+ database
- Access to an LLM API (OpenAI, Anthropic, etc.)

### Quick Start

Clone the repository and install dependencies:

```bash
# If starting from a checkpoint, skip the clone step
cd manus_clone
pnpm install
```

Configure environment variables by creating a `.env` file:

```bash
DATABASE_URL=mysql://user:password@localhost:3306/manus_clone
JWT_SECRET=your-secret-key
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im/login
BUILT_IN_FORGE_API_KEY=your-api-key
```

Initialize the database:

```bash
pnpm db:push
```

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Configuration

The platform is highly configurable through environment variables.

### Required Configuration

The following environment variables are required for the platform to function:

- `DATABASE_URL`: Connection string for the database
- `JWT_SECRET`: Secret key for signing JWT tokens
- `OAUTH_SERVER_URL`: OAuth server base URL
- `VITE_OAUTH_PORTAL_URL`: Login portal URL
- `BUILT_IN_FORGE_API_KEY`: API key for the LLM service

### Optional Configuration

The following environment variables are optional but recommended:

- `VITE_APP_TITLE`: Application title (default: "Manus Clone")
- `VITE_APP_LOGO`: Logo URL for branding
- `OWNER_OPEN_ID`: Owner user ID for admin access
- `OWNER_NAME`: Owner display name
- `VITE_ANALYTICS_ENDPOINT`: Analytics service endpoint
- `VITE_ANALYTICS_WEBSITE_ID`: Analytics website ID

### Feature Flags

Enable or disable specific features:

- `FEATURE_CODE_EXECUTION`: Enable code execution (default: true)
- `FEATURE_WEB_SEARCH`: Enable web search (default: true)
- `FEATURE_IMAGE_GEN`: Enable image generation (default: true)
- `FEATURE_FILE_OPS`: Enable file operations (default: true)

## Development

The platform is designed for easy development and extension.

### Project Structure

The codebase is organized as follows:

```
manus_clone/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and helpers
│   │   └── _core/          # Core framework code
│   └── public/             # Static assets
├── server/                 # Backend application
│   ├── agent/              # AI agent implementation
│   │   ├── index.ts        # Agent orchestrator
│   │   ├── tools.ts        # Tool definitions
│   │   └── sandbox.ts      # Code execution sandbox
│   ├── db.ts               # Database queries
│   ├── routers.ts          # tRPC routers
│   └── _core/              # Core framework code
├── drizzle/                # Database schema and migrations
│   └── schema.ts           # Table definitions
└── shared/                 # Shared types and constants
```

### Adding New Tools

To add a new tool for the AI agent:

1. Define the tool in `server/agent/tools.ts`:

```typescript
export const myCustomTool: Tool = {
  name: "my_custom_tool",
  description: "Description of what the tool does",
  parameters: {
    type: "object",
    properties: {
      input: {
        type: "string",
        description: "Input parameter description",
      },
    },
    required: ["input"],
  },
  execute: async (args: Record<string, unknown>) => {
    // Implementation
    return { success: true, result: "..." };
  },
};
```

2. Register the tool in `getAvailableTools()`:

```typescript
export function getAvailableTools(): Tool[] {
  return [
    codeExecutionTool,
    fileOperationsTool,
    webSearchTool,
    dataAnalysisTool,
    myCustomTool, // Add your tool here
  ];
}
```

### Adding New API Endpoints

To add a new tRPC endpoint:

1. Add the endpoint to `server/routers.ts`:

```typescript
myFeature: router({
  myEndpoint: protectedProcedure
    .input(z.object({
      param: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      // Implementation
      return { result: "..." };
    }),
}),
```

2. Use the endpoint in the frontend:

```typescript
const { data } = trpc.myFeature.myEndpoint.useQuery({ param: "value" });
```

## Testing

The platform includes a comprehensive testing setup.

### Running Tests

Run the test suite:

```bash
pnpm test
```

Run tests in watch mode during development:

```bash
pnpm test:watch
```

### Writing Tests

Tests are written using Vitest. Example test:

```typescript
import { test, expect } from 'vitest';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

test('Create conversation', async () => {
  const client = createTRPCProxyClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/api/trpc',
        headers: {
          authorization: `Bearer ${TEST_TOKEN}`,
        },
      }),
    ],
  });

  const conversation = await client.conversations.create.mutate({
    title: 'Test Conversation',
  });

  expect(conversation.id).toBeDefined();
  expect(conversation.title).toBe('Test Conversation');
});
```

## Deployment

The platform can be deployed in various configurations.

### Docker Deployment

Build and run with Docker:

```bash
docker build -t manus-clone .
docker run -p 3000:3000 --env-file .env manus-clone
```

### Production Deployment

For production deployments, refer to the [Deployment Guide](./DEPLOYMENT_GUIDE.md) for detailed instructions on:

- Docker and Kubernetes deployment
- Reverse proxy configuration
- Database optimization
- Monitoring and logging
- Security best practices
- Scaling strategies

## CESAR Integration

The platform is designed to integrate seamlessly with the CESAR product ecosystem. For detailed integration instructions, refer to the [CESAR Integration Guide](./CESAR_INTEGRATION.md), which covers:

- API integration patterns
- Authentication and authorization
- Database integration strategies
- Deployment architectures
- Feature flags and configuration
- Monitoring and observability
- Security considerations
- Scaling and cost management

## Roadmap

Future enhancements planned for the platform:

**Version 1.1** (Q1 2026):
- Streaming responses for real-time feedback
- Conversation search and filtering
- Artifact viewer in the UI
- Enhanced code execution with more languages
- Improved error handling and recovery

**Version 1.2** (Q2 2026):
- Multi-modal support (images, audio, video)
- Collaborative conversations (multiple users)
- Advanced analytics and insights
- Custom agent personalities
- Plugin system for third-party extensions

**Version 2.0** (Q3 2026):
- Self-hosted LLM support
- Advanced memory and context management
- Workflow automation
- Integration marketplace
- Enterprise features (SSO, audit logs, compliance)

## Contributing

This is a proprietary project developed for the CESAR product ecosystem. For internal development:

1. Create a feature branch from `main`
2. Implement your changes with tests
3. Submit a pull request for review
4. Ensure all tests pass and code quality checks succeed
5. Merge after approval

## Support

For support and questions:

- **Documentation**: Refer to the [Deployment Guide](./DEPLOYMENT_GUIDE.md) and [CESAR Integration Guide](./CESAR_INTEGRATION.md)
- **Issues**: Report bugs and feature requests through the internal issue tracker
- **Contact**: Reach out to the development team for assistance

## License

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## References

1. [The Unwind AI: Architecture Behind Manus AI Agent](https://www.theunwindai.com/p/architecture-behind-manus-ai-agent)
2. [Manus 1.5 Release Blog](https://manus.im/blog/manus-1.5-release)
3. [LangGraph CodeAct GitHub Repository](https://github.com/langchain-ai/langgraph-codeact)

---

**Built with ❤️ by the CESAR Development Team**

