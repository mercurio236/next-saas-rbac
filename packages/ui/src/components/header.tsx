import Image from 'next/image'
import logo from '../assets/github.com-1.svg'
import { ProfileButton, type HeaderUserProps } from './profile-button'
import { Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-swicher'

export function Headers({ email, imgAvatar, name }: HeaderUserProps) {
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

        <OrganizationSwitcher />
      </div>
      <div className="flex items-center gap-4">
        <ProfileButton email={email} imgAvatar={imgAvatar} name={name} />
      </div>
    </div>
  )
}
