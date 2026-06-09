# AI商家增长链接

面向中国小商家的 AI 增长链接 MVP。当前项目展示商家主页、AI 客服页、二维码/部署预览、老板看板、线索看板、会话看板和营销内容生成器。

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

This workspace also includes `Open AI Growth Link.cmd`, which starts the local dev server with the bundled portable Node setup used on this machine.

## Real LUNA FIT Demo Setup

The fictional demo client is `LUNA FIT 私教健身工作室`.

Important label shown on demo pages:

```text
示例门店，仅用于功能演示
```

To activate the real database and AI path:

1. Create a Supabase project.
2. Open Supabase SQL editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_FAST_MODEL=deepseek-v4-flash
DEEPSEEK_PRO_MODEL=deepseek-v4-pro
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Start the app and seed the demo data:

```bash
curl -X POST http://localhost:3000/api/admin/seed-demo \
  -H "Content-Type: application/json" \
  -d "{\"confirm\":\"seed-luna-fit\"}"
```

If `ADMIN_SEED_TOKEN` is set, include:

```bash
-H "Authorization: Bearer YOUR_TOKEN"
```

Real-demo routes:

- `/business/luna-fit`
- `/chat/luna-fit`
- `/dashboard/luna-fit`
- `/dashboard/luna-fit/leads`
- `/dashboard/luna-fit/marketing`
- `/dashboard/luna-fit/landing`
- `/dashboard/luna-fit/deployment`
- `/lp/luna-fit`

Security notes:

- `SUPABASE_SERVICE_ROLE_KEY` is used only in server-side modules and API routes.
- `DEEPSEEK_API_KEY` is used only in server-side API routes.
- Frontend chat and marketing components call same-origin API routes, not DeepSeek directly.

## Baota / BT Panel Deployment Steps

Recommended server: Tencent Cloud Hong Kong Ubuntu, Node.js 22.13+ LTS, PM2, and Nginx installed from Baota / BT Panel.

1. In Baota, create a new website and bind your domain.
2. Upload or `git clone` this project to the website directory, for example `/www/wwwroot/ai-business-growth-link`.
3. In the Baota terminal, enter the project directory:

```bash
cd /www/wwwroot/ai-business-growth-link
```

4. Install dependencies:

```bash
npm install
```

5. Copy `.env.example` to `.env` and set your production domain:

```bash
cp .env.example .env
nano .env
```

Example:

```bash
PORT=3000
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

6. Build the Next.js app:

```bash
npm run build
```

7. Start with PM2:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

8. In Baota, configure Nginx reverse proxy from your domain to the local Next.js app.

## Nginx Reverse Proxy Setup

Reverse proxy target:

```text
http://127.0.0.1:3000
```

Example Nginx location block:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

In Baota, you can add this through Website Settings -> Reverse Proxy, or paste the location block into the Nginx site config if you manage it manually.

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
- `/business/luna-fit`
- `/chat/luna-fit`
- `/dashboard/luna-fit`

Dashboard child routes are also available:

- `/dashboard/[slug]/leads`
- `/dashboard/[slug]/conversations`
- `/dashboard/[slug]/marketing`
- `/dashboard/[slug]/landing`
- `/dashboard/[slug]/settings`
- `/dashboard/[slug]/deployment`

## Custom Client Landing Pages

Every business can have an instant landing page at `/lp/[slug]`. The dashboard route `/dashboard/[slug]/landing` is an internal editor for choosing a template, theme, hero image, CTA copy, visible sections, featured services, and featured FAQs.

Supabase persistence uses the `landing_pages` table from `supabase/schema.sql`. If no saved row exists, the page falls back to generated content from the business profile, services, and FAQs.

Available MVP templates:

- `fitness_offer`
- `beauty_premium`
- `local_service_direct`

Available MVP style presets:

- `clean_pro`
- `warm_premium`
- `bold_action`

## What Is Currently Demo / Mock

- Bella Hair, Lily Nail, and Glow Skin are mock data in `src/lib/businesses.ts`.
- LUNA FIT is a fictional demo client. With Supabase and DeepSeek env vars configured, it uses real database reads/writes and real AI API calls.
- Without Supabase or DeepSeek env vars, LUNA FIT falls back to local demo data and local fallback replies so the UI can still be previewed.
- Older mock leads and conversations remain for the beauty demo businesses.
- QR code generation is demo-ready and now uses the client landing page link by default.
- Website widget script is still a placeholder and does not load a real widget.
- Settings forms do not persist changes.
- Dashboard metrics are demo calculations.
- Authentication is not implemented.
- There is no payment flow.
- There is no real WeCom, Feishu, DingTalk, or mini program integration.

## What Needs To Be Connected Later

- Supabase for real business profiles, services, FAQs, leads, conversations, landing pages, and settings.
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
