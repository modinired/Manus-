import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  /**
   * Conversations Router
   */
  conversations: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const { getUserConversations } = await import("./db");
      return getUserConversations(ctx.user.id);
    }),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { createConversation } = await import("./db");
        const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return createConversation({
          id,
          userId: ctx.user.id,
          title: input.title || "New Conversation",
        });
      }),
    
    get: protectedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .query(async ({ input }) => {
        const { getConversation } = await import("./db");
        return getConversation(input.id);
      }),
  }),

  /**
   * Messages Router
   */
  messages: router({
    list: protectedProcedure
      .input(z.object({
        conversationId: z.string(),
      }))
      .query(async ({ input }) => {
        const { getConversationMessages } = await import("./db");
        return getConversationMessages(input.conversationId);
      }),
    
    send: protectedProcedure
      .input(z.object({
        conversationId: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { createMessage, updateConversation } = await import("./db");
        const { runAgent } = await import("./agent");
        const { getConversationMessages } = await import("./db");
        
        // Save user message
        const userMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await createMessage({
          id: userMessageId,
          conversationId: input.conversationId,
          role: "user",
          content: input.content,
        });
        
        // Get conversation history
        const history = await getConversationMessages(input.conversationId);
        
        // Run agent
        const agentResponse = await runAgent({
          conversationId: input.conversationId,
          userId: ctx.user.id,
          messages: history.map(m => ({
            role: m.role as "system" | "user" | "assistant",
            content: m.content,
          })),
        });
        
        // Save assistant message
        const assistantMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await createMessage({
          id: assistantMessageId,
          conversationId: input.conversationId,
          role: "assistant",
          content: agentResponse.content,
        });
        
        // Update conversation timestamp
        await updateConversation(input.conversationId, {
          updatedAt: new Date(),
        });
        
        return {
          userMessage: { id: userMessageId, content: input.content },
          assistantMessage: { id: assistantMessageId, content: agentResponse.content },
        };
      }),
  }),

  /**
   * Artifacts Router
   */
  artifacts: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const { getUserArtifacts } = await import("./db");
      return getUserArtifacts(ctx.user.id);
    }),
    
    byConversation: protectedProcedure
      .input(z.object({
        conversationId: z.string(),
      }))
      .query(async ({ input }) => {
        const { getConversationArtifacts } = await import("./db");
        return getConversationArtifacts(input.conversationId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
