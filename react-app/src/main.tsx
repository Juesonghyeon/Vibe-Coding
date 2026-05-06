import { createRoot } from 'react-dom/client'
import './index.css'
import CouterExam from './pages/CouterExam.js'
import CouterExam2 from './pages/CouterExam2.js'
import MainComp from './pages/sub/MainComp.js'

createRoot(document.getElementById('root')!).render(
  <MainComp/>
)
