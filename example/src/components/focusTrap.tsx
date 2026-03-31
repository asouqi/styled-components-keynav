import { useState, useEffect } from "react"
import styled from "styled-components"
import { useFocusTrap } from "styled-components-keynav"

const OpenButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #0056b3;
  }
  
  &:focus-visible {
    outline: 3px solid #007bff;
    outline-offset: 2px;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const Dialog = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  min-width: 320px;
  max-width: 90vw;
`

const DialogTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 1.25rem;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 0.875rem;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  
  ${({ $variant }) => $variant === 'primary' ? `
    background: #007bff;
    color: white;
    border: none;
    
    &:hover {
      background: #0056b3;
    }
  ` : `
    background: white;
    color: #333;
    border: 1px solid #ddd;
    
    &:hover {
      background: #f5f5f5;
    }
  `}
  
  &:focus-visible {
    outline: 3px solid #007bff;
    outline-offset: 2px;
  }
`

export function SimpleModal() {
    const [open, setOpen] = useState(false)
    const { containerRef, activate, deactivate, isActive } = useFocusTrap()

    const handleOpen = () => {
        setOpen(true)
        setTimeout(activate, 0) // activate after render
    }

    const handleClose = () => {
        deactivate() // restores focus to trigger button
        setOpen(false)
    }

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isActive) {
                handleClose()
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isActive])

    return (
        <>
            <OpenButton onClick={handleOpen}>Open Modal</OpenButton>

            {open && (
                <Overlay onClick={handleClose}>
                    <Dialog
                        ref={containerRef as React.RefObject<HTMLDivElement>}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <DialogTitle id="modal-title">Sign Up</DialogTitle>

                        <FormGroup>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" type="text" placeholder="John" />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" type="text" placeholder="Doe" />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </FormGroup>

                        <ButtonGroup>
                            <Button $variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button $variant="primary" onClick={handleClose}>
                                Submit
                            </Button>
                        </ButtonGroup>
                    </Dialog>
                </Overlay>
            )}
        </>
    )
}