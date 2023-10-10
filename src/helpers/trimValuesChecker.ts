import { RefObject } from 'react'

// Login and Register Form Field inputs names
const loginFields: string[] = ['email', 'password']
const registerFields: string[] = [
  'name',
  'surname',
  'birthday',
  'email',
  'password',
  'confirm-password',
]

export function trimValuesChecker(formRef: RefObject<HTMLFormElement>, type: 'LOGIN' | 'REGISTER') {
  switch (type) {
    case 'LOGIN':
      loginFields?.map((loginField: string) => {
        ;(formRef?.current?.[loginField])!.value = formRef?.current?.[loginField]!.value?.trim()
      })
      break
    case 'REGISTER':
      registerFields?.map((registerField: string) => {
        ;(formRef?.current?.[registerField])!.value =
          formRef?.current?.[registerField]!.value?.trim()
      })
      break
  }
}