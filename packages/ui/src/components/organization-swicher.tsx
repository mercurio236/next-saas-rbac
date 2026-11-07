import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'

export interface OrganizationProps {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
}

export interface OrganizationSwitcher {
  organizations: OrganizationProps[]
  currentOrg: string | null
}

export async function OrganizationSwitcher({
  organizations = [],
  currentOrg,
}: OrganizationSwitcher) {
  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-42 items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-5">
              <AvatarImage src={currentOrganization.avatarUrl ?? ''} />
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">{currentOrganization.name}</span>
          </>
        ) : (
          <span className="truncate text-left">select organization</span>
        )}
        <ChevronsUpDown className="ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-50"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link href={`/org/${organization.slug}`}>
                  <Avatar className="mr-2 size-5">
                    <AvatarImage src={organization.avatarUrl ?? ''} />
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{organization.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-organization" prefetch={false}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
