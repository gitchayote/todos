# Supabase Todo App

React(Vite) + Supabase로 만든 할 일 목록 앱입니다. GitHub Pages로 무료 배포할 수 있게 구성되어 있습니다.

## 1. Supabase 프로젝트 설정

1. https://supabase.com 에서 새 프로젝트를 생성합니다.
2. 좌측 메뉴 **SQL Editor**로 이동해서 이 저장소의 `supabase_setup.sql` 내용을 붙여넣고 실행합니다.
   - `todos` 테이블 생성
   - RLS(Row Level Security) 및 공개 접근 정책 설정
3. 좌측 메뉴 **Project Settings → API**로 이동해서 아래 두 값을 복사해둡니다.
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

## 2. 로컬 개발 환경 설정

```bash
npm install
cp .env.example .env
```

`.env` 파일을 열어서 방금 복사한 값을 채워넣습니다.

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

로컬 서버 실행:

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 정상 동작하는지 확인합니다.

## 3. GitHub 저장소에 올리기

```bash
git init
git add .
git commit -m "Initial commit: Supabase Todo App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 4. GitHub Pages 배포 설정

이 프로젝트에는 `.github/workflows/deploy.yml`이 이미 포함되어 있어서, `main` 브랜치에 push할 때마다 자동으로 빌드 후 배포됩니다.

**설정 순서:**

1. **`vite.config.js` 수정** — `base` 값을 본인 저장소 이름으로 바꿉니다.
   ```js
   base: '/YOUR_REPO_NAME/',
   ```
   (예: 저장소 주소가 `github.com/kim/todo-app`이면 `base: '/todo-app/'`)

2. **GitHub 저장소 → Settings → Secrets and variables → Actions** 로 이동해서 Repository secrets를 추가합니다.
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   
   (`.env` 파일은 git에 올라가지 않으므로, 배포 빌드 시에는 이 GitHub Secrets 값이 사용됩니다.)

3. **GitHub 저장소 → Settings → Pages** 로 이동해서 **Source**를 **GitHub Actions**로 설정합니다.

4. 위에서 수정한 내용을 커밋하고 push합니다.
   ```bash
   git add .
   git commit -m "Configure GitHub Pages base path"
   git push
   ```

5. 저장소의 **Actions** 탭에서 배포 진행 상황을 확인할 수 있습니다. 완료되면 다음 주소에서 앱에 접속할 수 있습니다.
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

## 참고

- 이 앱은 별도 로그인 기능 없이 누구나 같은 목록을 보고 편집할 수 있는 구조입니다(공개 데모용). 개인별 로그인이 필요하다면 Supabase Auth를 추가하고 `supabase_setup.sql`의 정책을 `auth.uid()` 기반으로 바꿔야 합니다.
- `.env` 파일과 실제 API 키는 절대 GitHub에 커밋하지 마세요 (`.gitignore`에 이미 포함되어 있습니다).
