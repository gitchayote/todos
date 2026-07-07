import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ GitHub Pages 배포 시 반드시 아래 값을 본인의 저장소 이름으로 바꿔주세요.
  // 예: 저장소 주소가 https://github.com/yourname/my-todo-app 이라면
  // base: '/my-todo-app/' 로 설정합니다.
  base: '/YOUR_REPO_NAME/',
})
