import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface MobileSearchInputProps {
  search: string;
  onSearchChange: (search: string) => void;
}

export function MobileSearchInput({ search, onSearchChange }: MobileSearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search orders..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 bg-[#F2F0EA]"
      />
    </div>
  );
}

interface MobilePaginationButtonsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function MobilePaginationButtons({ page, totalPages, onPageChange }: MobilePaginationButtonsProps) {
  return (
    <div className="flex items-center justify-between bg-[#F2F0EA] p-3 rounded-xl border border-gray-100 shadow-sm">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="h-8 px-2"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
      </Button>
      
      <span className="text-sm font-medium text-gray-600">
        Page {page} of {totalPages}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="h-8 px-2"
      >
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}

// Deprecated: For backward compatibility if needed, but we should migrate away.
export function MobilePaginationControls({
  page,
  totalPages,
  onPageChange,
  search,
  onSearchChange,
}: MobileSearchInputProps & MobilePaginationButtonsProps) {
  return (
    <div className="space-y-4">
      <MobileSearchInput search={search} onSearchChange={onSearchChange} />
      <MobilePaginationButtons page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
