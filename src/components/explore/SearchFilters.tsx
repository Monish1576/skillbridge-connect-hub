
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  clearFilters: () => void;
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  department,
  setDepartment,
  role,
  setRole,
  clearFilters
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row items-center">
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, skill, or keyword..."
          className="pl-9 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Select 
          defaultValue="all-departments" 
          value={department}
          onValueChange={setDepartment}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-departments">All Departments</SelectItem>
            <SelectItem value="computer-science">Computer Science</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="arts">Arts & Design</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          defaultValue="all-roles" 
          value={role}
          onValueChange={setRole}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-roles">All Roles</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="lecturer">Lecturers</SelectItem>
            <SelectItem value="staff">Other Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
