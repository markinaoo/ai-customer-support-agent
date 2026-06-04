# AI商家增长链接

面向中国小商家的 AI 增长链接 MVP。当前项目展示商家主页、AI 客服页、二维码/部署预览、老板看板、线索看板、会话看板和营销内容生成器。

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

This workspace also includes `Open AI Growth Link.cmd`, which starts the local dev server with the bundled portable Node setup used on this machine.

## How To Deploy To Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Open Vercel and create a new project from that repository.
3. Use the default Next.js framework preset.
4. Build command: `npm run build`
5. Install command: `npm install`
6. Output directory: leave empty/default for Next.js.
7. Environment variables: copy `.env.example` if needed. The current demo does not require any real secrets.
8. Click Deploy.

After deployment, set `NEXT_PUBLIC_APP_URL` in Vercel to your production domain, for example:

```bash
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

Useful local checks before deploying:

```bash
npm run lint
npm run build
```

## Main Demo Routes

- `/`
- `/demo`
- `/business/bella-hair`
- `/chat/bella-hair`
- `/dashboard/bella-hair`
- `/business/lily-nail`
- `/chat/lily-nail`
- `/dashboard/lily-nail`
- `/business/glow-skin`
- `/chat/glow-skin`
- `/dashboard/glow-skin`

Dashboard child routes are also available:

- `/dashboard/[slug]/leads`
- `/dashboard/[slug]/conversations`
- `/dashboard/[slug]/marketing`
- `/dashboard/[slug]/settings`
- `/dashboard/[slug]/deployment`

## What Is Currently Demo / Mock

- Business data is mock data in `src/lib/businesses.ts`.
- Leads and conversations are mock records.
- AI chat replies are local mock logic.
- Marketing generation uses local templates.
- QR code is a visual placeholder.
- Settings forms do not persist changes.
- Dashboard metrics are demo calculations.
- Authentication is not implemented.
- There is no payment flow.
- There is no real WeCom, Feishu, DingTalk, or mini program integration.

## What Needs To Be Connected Later

- Supabase for real business profiles, services, FAQs, leads, conversations, and settings.
- DeepSeek or another LLM provider for real AI customer replies.
- Real lead storage and follow-up status updates.
- Real authentication for owner dashboards.
- Real QR code generation using the deployed public/chat URLs.
- Real marketing generation with brand voice, campaign history, and approval workflow.
- Optional messaging integrations such as WeCom, Feishu, DingTalk, SMS, or email.

## Deployment Notes

The project is a standard Next.js App Router application and should deploy on Vercel without custom server configuration. Generated hero images are stored locally under `public/images`, so production pages do not depend on remote image hosting for the main hero visuals.

## Mainland China Accessibility Notes

- The app does not use Google Fonts; it uses system font stacks such as Microsoft YaHei and PingFang SC.
- The app does not include YouTube embeds, Twitter/X, Facebook, Instagram, Google Analytics, Google Tag Manager, or other third-party tracking scripts.
- Hero images are stored locally in `public/images` and compressed as JPEG files to reduce first-page load time.
- The demo widget script shown on the deployment page is a same-origin placeholder (`/widget.js`) and is not loaded by the app.
- Current API calls are same-origin Next.js route handlers. The chat and marketing previews have local fallback behavior for demo continuity.
- Vercel itself may still be slower or intermittently harder to access from mainland China depending on user network, DNS, and regional routing. For production use in mainland China, consider a China-accessible hosting/CDN strategy, ICP requirements where applicable, and locally reachable providers for AI, database, analytics, and object storage.
