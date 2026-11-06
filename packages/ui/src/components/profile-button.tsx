import { ChevronDown, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import Link from 'next/link'

export interface HeaderUserProps {
  name: string
  email: string
  imgAvatar: string | null
}

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

export async function ProfileButton({
  email,
  name,
  imgAvatar,
}: HeaderUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{name ?? 'User name'}</span>
          <span className="text-xs text-zinc-400">{email ?? ''}</span>
        </div>
        <Avatar>
          {imgAvatar && <AvatarImage src={imgAvatar} />}
          <AvatarFallback>{getInitials(name ?? 'Usuário')}</AvatarFallback>
        </Avatar>
        <ChevronDown className="text-muted-foreground size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/api/auth/sign-out" prefetch={false}>
            <LogOut className="mr-2" />
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
