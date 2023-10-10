export function swtichTheme(param: 'switch' | 'get') {
  if (param === 'get') {
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
        document.documentElement.style.colorScheme = 'dark'
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
        document.documentElement.style.colorScheme = 'light'
      }
    }
  } else if (param === 'switch') {
    if (
      (localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark') ||
      document.documentElement.className.includes('dark')
    ) {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    } else {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.documentElement.style.colorScheme = 'dark'
    }
  }
}