"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn, getAuthRedirectPath } from '../lib/utils'
import {
  ChevronDown,
  Menu,
  LogOut,
  Bell,
  LayoutDashboard,
  User,
  ChevronRight,
  AlertCircle,
  Home,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Sidebar } from './Sidebar'
import { navigation } from '../lib/SidebarItems'
import { useAuthStore } from '../store/AuthStore'
// API removed

interface LayoutWrapperProps {
  children: React.ReactNode
}

type PageInfo = {
  name: string
  icon: any
  href?: string
  parentName?: string
  parentIcon?: any
  parentHref?: string
}

const findCurrentPage = (
  items: typeof navigation,
  pathname: string
): PageInfo | null => {
  for (const item of items) {
    // If exact match or starts with parent href
    if (item.href !== "#" && (item.href === pathname || pathname.startsWith(item.href + '/'))) {
      return { name: item.name, icon: item.icon, href: item.href }
    }

    if (item.children) {
      for (const child of item.children) {
        // Exact match for child or dynamic child (like /warehouse/wh001)
        if (child.href === pathname || pathname.startsWith(child.href + '/')) {
          let parentHref = item.href;
          if (parentHref === "#" && item.children.length > 0) {
            parentHref = item.children[0].href;
          }
          return {
            name: child.name,
            icon: child.icon,
            href: child.href,
            parentName: item.name,
            parentIcon: item.icon,
            parentHref: parentHref,
          }
        }
      }
    }
  }
  return null
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter();
  const user = useAuthStore(state => state.user)
  const accessToken = useAuthStore(state => state.accessToken)


  // Public routes where layout should not be shown
  const noLayoutRoutes = ['/', '/login', '/register', '/about-us', '/verify-otp', '/forgot-password']

  // If on a public route, just render children
  if (noLayoutRoutes.includes(pathname) || pathname === '/' || pathname === '') {
    return <>{children}</>
  }

  // Authentication redirects disabled completely for static showcase.
  // The layout will render without checking tokens or user presence.

  // Error State UI - Removed as we are no longer fetching globally
  // We rely on the stored user state. If the user object is missing while authenticated, that's handled by auth logic.


  const currentPage = findCurrentPage(navigation, pathname) || {
    name: 'Dashboard',
    icon: LayoutDashboard,
  }

  const PageIcon = currentPage.icon
  const ParentIcon = currentPage.parentIcon

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <div
        className={cn(
          'flex-1 flex flex-col overflow-hidden transition-all duration-300',
          isCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[240px]'
        )}
      >
        <header className='bg-[#F2F0EA] border-b border-[#0D140B] px-6 py-3 relative z-30 shadow-[0_5px_30px_rgba(37,66,34,0.03)]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='sm'
                className='lg:hidden text-[#3B5238] hover:text-[#0D140B]'
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className='h-5 w-5' />
              </Button>

              {/* Page Title & Back Button */}
              <div className='flex items-center gap-3'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => router.back()}
                  className='h-[36px] w-[36px] flex items-center justify-center shrink-0 rounded-full bg-[#E3E0D8] hover:bg-[#00C725]/20 text-[#3B5238]/60 hover:text-[#0D140B] transition-colors border border-[#0D140B]'
                  title='Go Back'
                >
                  <ArrowLeft className='h-[18px] w-[18px] stroke-[1.5px]' />
                </Button>
                {currentPage.parentName ? (
                  <>
                    {ParentIcon && (
                      <ParentIcon className='h-[16px] w-[16px] text-[#3B5238]/60 hidden sm:block stroke-[1.5px]' />
                    )}
                    {currentPage.parentHref ? (
                      <Link href={currentPage.parentHref} className='text-[13px] font-sans font-medium text-[#3B5238] whitespace-nowrap hover:text-[#0D140B] transition-colors'>
                        {currentPage.parentName}
                      </Link>
                    ) : (
                      <span className='text-[13px] font-sans font-medium text-[#3B5238] whitespace-nowrap'>
                        {currentPage.parentName}
                      </span>
                    )}
                    <ChevronRight className="h-[14px] w-[14px] text-[#3B5238] shrink-0 stroke-[2px]" />
                    {currentPage.href ? (
                      <Link href={currentPage.href} className='text-[14px] font-sans font-semibold text-[#0D140B] whitespace-nowrap hover:text-[#00C725] transition-colors'>
                        {currentPage.name}
                      </Link>
                    ) : (
                      <span className='text-[14px] font-sans font-semibold text-[#0D140B] whitespace-nowrap'>
                        {currentPage.name}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <PageIcon className='h-[18px] w-[18px] text-[#00C725] hidden sm:block stroke-[2px]' />
                    {currentPage.href ? (
                      <Link href={currentPage.href} className='text-[15px] font-sans font-semibold text-[#0D140B] whitespace-nowrap hover:text-[#00C725] transition-colors'>
                        {currentPage.name}
                      </Link>
                    ) : (
                      <span className='text-[15px] font-sans font-semibold text-[#0D140B] whitespace-nowrap'>
                        {currentPage.name}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='flex items-center gap-3 h-auto p-1.5 pr-3 hover:bg-[#00C725]/20 rounded-full border border-transparent hover:border-[#0D140B] transition-all duration-300'
                >
                  <Avatar className='h-9 w-9 border border-[#0D140B]'>
                    <AvatarImage className="grayscale" src={user?.avatar || '/placeholder-avatar.jpg'} />
                    <AvatarFallback className="bg-[#E3E0D8] text-[#0D140B] font-editorial-serif">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className='hidden sm:block text-left mr-1'>
                    <p className='text-[13px] font-sans font-semibold text-[#0D140B] leading-none mb-1'>
                      {user?.name || 'User'}
                    </p>
                    <p className='text-[11px] font-sans text-[#3B5238] leading-none'>
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <ChevronDown className='h-4 w-4 text-[#3B5238]/60' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56 bg-[#F2F0EA] border-[#0D140B] shadow-[0_10px_40px_rgba(37,66,34,0.08)] rounded-xl overflow-hidden font-sans p-1 z-50'>
                <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.1em] text-[#3B5238]/60 font-medium px-3 py-2">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#00C725]/40 mx-2" />
                <DropdownMenuItem onClick={() => router.push("/profile")} className="text-[#0D140B] focus:bg-[#00C725]/20 focus:text-[#0D140B] rounded-lg cursor-pointer my-1 text-[13px] font-medium transition-colors">
                  <User className='mr-2 h-4 w-4 text-[#00C725]' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/notifications")} className="text-[#0D140B] focus:bg-[#00C725]/20 focus:text-[#0D140B] rounded-lg cursor-pointer my-1 text-[13px] font-medium transition-colors">
                  <Bell className='mr-2 h-4 w-4 text-[#00C725]' />
                  <span>Notifications</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-[#00C725]/40 mx-2" />
                <DropdownMenuItem className='text-[#e55c5c] focus:bg-[#e55c5c]/10 focus:text-[#d44848] rounded-lg cursor-pointer my-1 text-[13px] font-medium transition-colors' onClick={() => {
                  useAuthStore.getState().logout();
                  router.push("/");
                }}>
                  <LogOut className='mr-2 h-[14px] w-[14px]' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <div className='flex-1 overflow-auto bg-[#E3E0D8]'>

          {children}
        </div>
      </div>
    </div>
  )
}
