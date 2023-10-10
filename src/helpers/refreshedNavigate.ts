export function refreshedNavigate(link: string) {
  const a = document.createElement('a')
  a.href = link
  a.click()
  a.remove()
}