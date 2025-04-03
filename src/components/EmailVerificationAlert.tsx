
import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EmailVerificationAlert = () => {
  const { user, isEmailVerified, resendVerificationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);

  // If user is not logged in or email is already verified, don't show anything
  if (!user || isEmailVerified) {
    return null;
  }

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setIsResending(true);
    try {
      await resendVerificationEmail(user.email);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Email verification required</AlertTitle>
      <AlertDescription className="flex flex-col space-y-2">
        <p>Please verify your email address to access all features.</p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResendVerification}
            disabled={isResending}
          >
            {isResending ? "Sending..." : "Resend verification email"}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default EmailVerificationAlert;
