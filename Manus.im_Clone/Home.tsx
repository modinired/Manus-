import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Chat } from "@/components/Chat";
import { ConversationList } from "@/components/ConversationList";
import { trpc } from "@/lib/trpc";
import { LogOut, Menu, X } from "lucide-react";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const createConversation = trpc.conversations.create.useMutation({
    onSuccess: (newConversation) => {
      setSelectedConversationId(newConversation.id);
      utils.conversations.list.invalidate();
    },
  });
  
  const utils = trpc.useUtils();

  const handleNewConversation = () => {
    createConversation.mutate({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="max-w-md w-full p-8 text-center">
          <div className="mb-8">
            {APP_LOGO && (
              <img src={APP_LOGO} alt={APP_TITLE} className="h-16 mx-auto mb-4" />
            )}
            <h1 className="text-4xl font-bold mb-2">{APP_TITLE}</h1>
            <p className="text-lg text-muted-foreground">
              Your AI-powered assistant for building, researching, and creating
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-1">🤖 Autonomous Agent</h3>
                <p className="text-sm text-muted-foreground">
                  Understands complex tasks and executes them autonomously
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-1">💻 Code Execution</h3>
                <p className="text-sm text-muted-foreground">
                  Writes and runs code in a secure sandbox environment
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-1">🔧 Powerful Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Access to file operations, web search, and data analysis
                </p>
              </div>
            </div>
            
            <Button size="lg" className="w-full" asChild>
              <a href={getLoginUrl()}>Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            {APP_LOGO && (
              <img src={APP_LOGO} alt={APP_TITLE} className="h-8" />
            )}
            <h1 className="text-xl font-bold">{APP_TITLE}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.name || user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={() => logout()}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-80 border-r bg-background transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } absolute md:relative h-full z-10`}
        >
          <ConversationList
            selectedId={selectedConversationId}
            onSelect={setSelectedConversationId}
            onNew={handleNewConversation}
          />
        </aside>

        {/* Chat Area */}
        <main className="flex-1 bg-background">
          {selectedConversationId ? (
            <Chat conversationId={selectedConversationId} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome to {APP_TITLE}</h2>
                <p className="mb-4">Select a conversation or start a new one to begin</p>
                <Button onClick={handleNewConversation}>
                  Start New Conversation
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
