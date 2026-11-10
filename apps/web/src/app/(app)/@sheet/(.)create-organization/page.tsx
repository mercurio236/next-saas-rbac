import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@saas/ui/components/sheet'
import { OrganizationForm } from '../../org/organization-form'
import { InterceptedSheetContent } from '@saas/ui/components/intercept-sheet-content'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
