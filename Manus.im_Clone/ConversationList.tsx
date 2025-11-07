import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, MessageSquare, Loader2 } from "lucide-react";

interface ConversationListProps {
  selectedId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export function ConversationList({ selectedId, onSelect, onNew }: ConversationListProps) {
  const { data: conversations = [], isLoading } = trpc.conversations.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button onClick={onNew} className="w-full" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                selectedId === conversation.id ? "bg-accent border-primary" : ""
              }`}
              onClick={() => onSelect(conversation.id)}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {conversation.title || "Untitled Conversation"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conversation.updatedAt
                      ? new Date(conversation.updatedAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

