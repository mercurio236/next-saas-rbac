'use client'

import { Alert, AlertDescription, AlertTitle } from '@saas/ui/components/alert'
import { Button } from '@saas/ui/components/button'
import { Checkbox } from '@saas/ui/components/checkbox'
import { Input } from '@saas/ui/components/input'
import { Label } from '@saas/ui/components/label'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { startTransition, useActionState } from 'react'
import { createOrganizationAction, OrganizationSchema } from './actions'

interface OrganizationFormProps {
  initialData?: OrganizationSchema
}

export function OrganizationForm({ initialData }: OrganizationFormProps) {
  const [{ success, message, errors }, formAction, isPending] = useActionState(
    createOrganizationAction,
    {
      success: false,
      message: null,
      errors: null,
    }
  )

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    startTransition(() => formAction(data))
  }

  return (
    <form onSubmit={handleSubmit} action="" className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p className="text-emerald-800">{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input name="name" id="name" />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
        />
        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="shouldAttachUserByDomain"
            id="shouldAttachUserByDomain"
            className="translate-0.5"
          />
          <label htmlFor="shouldAttachUserByDomain" className="space-y-1">
            <span className="text-sm leading-none font-medium">
              Auto join new members
            </span>
            <p className="text-muted-foreground text-sm">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
