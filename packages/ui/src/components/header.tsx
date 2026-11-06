import { Slash } from 'lucide-react'
import Image from 'next/image'
import logo from '../assets/github.com-1.svg'
import {
  OrganizationSwitcher,
  type OrganizationProps,
} from './organization-swicher'
import { ProfileButton, type HeaderUserProps } from './profile-button'

interface HeaderProps {
  user: HeaderUserProps
  organization: OrganizationProps[]
}

export function Headers({ user, organization }: HeaderProps) {
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

        <OrganizationSwitcher organizations={organization} />
      </div>
      <div className="flex items-center gap-4">
        <ProfileButton user={user} />
      </div>
    </div>
  )
}
