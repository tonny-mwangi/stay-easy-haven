
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signIn" | "signUp";
}

const AuthDialog = ({ isOpen, onClose, initialTab = "signIn" }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === "signIn" ? "Welcome Back" : "Join EliteStays"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "signIn" 
              ? "Sign in to your account to continue" 
              : "Create an account to start booking your next stay"}
          </DialogDescription>
        </DialogHeader>
        <Tabs 
          defaultValue={initialTab} 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signIn">
            <SignInForm onSuccess={handleSuccess} />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUpForm onSuccess={handleSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
