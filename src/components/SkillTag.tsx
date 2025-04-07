
import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  className?: string;
  size?: "default" | "sm";
}

export function SkillTag({ skill, className, size = "default" }: SkillTagProps) {
  return (
    <span className={cn(size === "default" ? "skill-tag" : "skill-tag-sm", className)}>
      {skill}
    </span>
  );
}
