import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAITools } from "@/lib/permissions";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  ResumeValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/auth"; // Import useAuth
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          if (!canUseAITools(subscriptionLevel)) {
            premiumModal.setOpen(true);
            return;
          }
          setShowInputDialog(true);
        }}
      >
        <WandSparklesIcon className="size-4" />
        Generate (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        resumeData={resumeData}
        onSummaryGenerated={(summary) => {
          onSummaryGenerated(summary);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

function InputDialog({
  open,
  onOpenChange,
  resumeData,
  onSummaryGenerated,
}: InputDialogProps) {
  const { toast } = useToast();
  const { userId, token } = useAuth(); // Get userId and token

  const form = useForm<GenerateSummaryInput>({
    resolver: zodResolver(generateSummarySchema),
    defaultValues: {
      jobTitle: resumeData.jobTitle || "",
      workExperiences: resumeData.workExperiences || [],
      educations: resumeData.educations || [],
      skills: resumeData.skills || [],
    },
  });

  async function onSubmit(input: GenerateSummaryInput) {
    if (!userId || !token) {
      toast({
        variant: "destructive",
        description: "Authentication error. Please log in again.",
      });
      return;
    }
    try {
      // Pass userId and token along with form input
      const response = await generateSummary({ ...input, userId, token });
      onSummaryGenerated(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="summary-description">
        <DialogHeader>
          <DialogTitle>Generate summary</DialogTitle>
          <DialogDescription id="summary-description">
            The AI will generate a summary based on your resume data.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* No input field needed as summary is generated from existing data */}
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
