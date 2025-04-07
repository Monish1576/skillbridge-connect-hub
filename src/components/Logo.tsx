
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-xl">
      <Book className="h-5 w-5" />
      <span>SkillBridge</span>
    </Link>
  );
}
