import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Monitor, Moon, Sun, Languages, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import UserNav from "./UserNav";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  return (
    <nav className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* ฝั่งซ้าย: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-2xl tracking-tighter text-blue-600 hover:opacity-80 transition-opacity">
          IT-STORE
        </Link>
        
        {/* ลิงก์จัดสเปคคอม - ย้าย Button ออกมาเป็นตัวหลักของ Link */}
        <Link href="/pc-builder">
          <Button
            variant="ghost"
            className="hidden md:flex gap-2 text-slate-600 hover:text-blue-600 font-medium"
          >
            <Monitor className="h-5 w-5" />
            <span>จัดสเปคคอม</span>
          </Button>
        </Link>
      </div>

      {/* ฝั่งขวา: เครื่องมือต่างๆ */}
      <div className="flex items-center gap-2">
        {/* ปุ่มเปลี่ยนภาษา */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-600">
              <Languages className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">ไทย (TH)</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">English (EN)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ปุ่มเปลี่ยน Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-600">
              <Sun className="h-5 w-5 dark:hidden" />
              {/* คุณสามารถเพิ่ม Icon Moon สำหรับ Dark mode ได้ที่นี่ในอนาคต */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">Light</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Dark</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" /> {/* เส้นแบ่งโซน */}

        {/* ส่วนของตะกร้าสินค้า (CartDrawer) */}
        <CartDrawer />

        {/* ส่วนของ User Profile (UserNav) */}
        <UserNav />
      </div>
    </nav>
  );
}
