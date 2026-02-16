import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Monitor, Moon, Sun, Languages, ShoppingCart } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-slate-950 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="font-bold text-2xl tracking-tighter text-blue-600">IT-STORE</div>
      
      <div className="flex items-center gap-2">
        {/* ปุ่มเปลี่ยนภาษา */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><Languages className="h-5 w-5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>ไทย (TH)</DropdownMenuItem>
            <DropdownMenuItem>English (EN)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ปุ่มเปลี่ยน Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><Sun className="h-5 w-5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Light</DropdownMenuItem>
            <DropdownMenuItem>Dark</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ตะกร้าสินค้า */}
        <Button variant="outline" className="ml-2 gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span>ตะกร้า (0)</span>
        </Button>
      </div>
    </nav>
  )
}