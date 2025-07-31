import { sxUser } from '@/ui/user/styles'
import { MyDialogProps } from '@/ui/user/types'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'

/**
 * @function SlideTransition
 * @description A component for Dialog transition animation.
 * It uses Material-UI's `Slide` component to animate a "slide up" effect.
 * Wrapped with `forwardRef` for proper integration with Material-UI's `TransitionProps`.
 *
 * @param {TransitionProps & { children: React.ReactElement }} props - Props for the transition component,
 * including `children` (the element being animated).
 * @param {React.Ref<unknown>} ref - The ref forwarded to the underlying DOM element, as required by Material-UI.
 * @returns {JSX.Element} A Slide component with an 'up' direction animation.
 */
const SlideTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction='up' // Specifies the animation direction: slides in from the bottom.
      ref={ref} // Forwards the ref for proper Material-UI functionality.
      {...props} // Spreads all other props (e.g., `in`, `timeout`).
    />
  )
})

/**
 * @function DialogContainer
 * @description A container component for Material-UI Dialog, encapsulating common logic for
 * opening/closing, animation, and dialog paper styles. It allows passing
 * the dialog's content (title, content, actions) as `children`.
 *
 * @param open - The open state of the dialog.
 * @param closeModal - Function to close the dialog.
 * @param children - The content to be rendered inside the dialog (e.g., DialogTitle, DialogContent, DialogActions).
 * @returns A Material-UI Dialog component with specified props and content.
 */
export function DialogContainer({ open, closeModal, children }: MyDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      slots={{ transition: SlideTransition }}
      slotProps={{
        paper: { sx: sxUser.dialogPaper }, // Apply styles to the dialog's paper container.
      }}
    >
      {children}
    </Dialog>
  )
}
