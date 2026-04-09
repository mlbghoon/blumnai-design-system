import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../ux-guideline/App'

// 갤러리 범위 R값 오버라이드: DS Select trigger를 6px(--radius-sm)로 통일
const galleryStyles = document.createElement('style')
galleryStyles.textContent = `
  main button[role="combobox"] {
    border-radius: var(--radius-sm) !important;
  }
`
document.head.appendChild(galleryStyles)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
