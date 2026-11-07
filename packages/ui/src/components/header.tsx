import { Slash } from 'lucide-react'
import Image from 'next/image'
import logo from '../assets/github.com-1.svg'
import { type AppAbility } from '@saas/auth'
import {
  OrganizationSwitcher,
  type OrganizationProps,
} from './organization-swicher'
import { ProfileButton, type HeaderUserProps } from './profile-button'
import { Separator } from './separator'
import { ThemeSwitcher } from './theme/theme-switcher'

interface HeaderProps {
  user: HeaderUserProps
  organization: OrganizationProps[]
  currentOrg: string | null
  permissions: AppAbility | null
}

export function Headers({
  user,
  organization,
  currentOrg,
  permissions,
}: HeaderProps) {
  return (
    <div className="mx-auto flex max-w-300 items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          className="size-6 dark:invert"
          alt="logo"
          loading="eager"
        />
        <Slash className="text-border size-3 rotate-[-24deg]" />

        <OrganizationSwitcher
          currentOrg={currentOrg}
          organizations={organization}
        />
        {permissions?.can('get', 'Project') && <p>Projetos</p>}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" />
        <ProfileButton user={user} />
      </div>
    </div>
  )
}
