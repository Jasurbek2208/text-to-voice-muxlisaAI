import { RefObject } from "react"

export function setFormFields(formRef: RefObject<HTMLFormElement>, name: string, type: string, value: string | boolean) {
    (formRef?.current?.[name] as any)[type] = value
}