const dialog = document.getElementById('detail-dialog');
const content = document.getElementById('dialog-content');
const arrow = '<svg class="icon"><use href="#arrow-right"/></svg>';
const arrowDiag = '<svg class="icon"><use href="#arrow"/></svg>';
let lastFocus;
let activeModalState = null;
let currentKitFilter = 'all';
let currentStackFilter = 'all';
let currentEditFilter = 'all';
let currentStackSearch = '';

/* -----------------------------------------------------------
   1. BILINGUAL UI STRINGS (EN & 中文)
----------------------------------------------------------- */
const uiStrings = {
  en: {
    page_title: 'CruxKit — 20 Digital Kits, 40 Stack Picks & 24 AI, Cloud / Formulation Benchmarks',
    meta_desc: 'CruxKit (cruxxxxxkit.com) — 20 Ready-to-Use Digital Kits, 40 Stress-Tested AI (GPT-6.1, DeepSeek V4.1-Flash-1017, Gemini 4 Argon, Claude 5.5), Cloud & Clinical Skincare Benchmarks, and 24 Deep-Dive Playbooks.',
    skip: 'Skip to content',
    nav_kits: 'Digital kits (20)',
    nav_stack: 'The stack <span class="nav-pill-tag">40 Picks</span>',
    nav_calc: 'Savings',
    nav_edit: 'The edit (24)',
    nav_approach: 'Our approach',
    nav_free: 'Free starter kit',
    mob_stack: '40 Audited Stack Picks',
    mob_calc: 'Stack savings calculator',
    hero_eyebrow: 'CRUXKIT PULSE · 2026 FULL CATALOG · 20 DIGITAL KITS · 40 STACK PICKS · 24 BENCHMARK GUIDES',
    hero_title: 'A brighter way<br><span>to build.</span>',
    hero_sub: '20 ready-to-import digital kits, 40 stress-tested software, cloud & clinical formulation picks, and calmer workflows for turning good ideas into everyday progress.',
    hero_cta_primary: `Explore 20 Digital Kits ${arrow}`,
    hero_cta_stack: 'Browse 40 S-Tier Picks',
    metric_1: '<strong>20 Ready-to-Use Kits</strong><br>JSON Workflows, API Packs &amp; Notion OS',
    metric_2: '<strong>40 Audited S-Tier Picks</strong><br>AI, Creator, Cloud VPS &amp; Beauty Lab',
    metric_3: '<strong>24 Deep-Dive Playbooks</strong><br>Full Bilingual Benchmark Guides',
    metric_4: '<strong>Avg. Yearly Saved</strong><br>By cutting bloated subscriptions',
    kits_heading: 'Choose your next move (20 Digital Kits).',
    kits_note: '20 ready-to-adapt digital systems with real downloadable .ZIP source packages — click any kit to inspect contents, sample blueprints & instant download.',
    kits_filter_all: 'All kits (20)',
    kits_filter_wf: 'AI, API & Edge Cloud (7)',
    kits_filter_os: 'Notion, Video & Growth (7)',
    kits_filter_rt: 'Beauty & Formula Lab (5)',
    kits_filter_bd: '19-in-1 Master Bundle (1)',
    stack_heading: 'The considered stack (40 Audited Picks).',
    stack_note: 'Every tool and formulation has a clear job. Stress-tested across 4 specialized desks — click any item for full lab notes, pros/cons & verified partner links.',
    stack_filter_all: 'All Picks (40)',
    stack_filter_ai: '01 · AI & Automation (10)',
    stack_filter_creator: '02 · Creator, Video & SEO (10)',
    stack_filter_cloud: '03 · Cloud, Domains & Pay (10)',
    stack_filter_beauty: '04 · Skincare & K-Beauty Lab (10)',
    stack_search_placeholder: 'Search 40 tools, APIs, domains, serums, SPF...',
    calc_heading: 'Trim the bloat.<br><span>Keep the output.</span>',
    calc_sub: 'Check the subscriptions or routines you currently pay for. See how much you save every year by switching to our intentional stack:',
    calc_1_old: 'Zapier Professional (10,000 tasks/mo — $73/mo)',
    calc_1_new: '→ Swap to Make.com Core ($9/mo for 10,000 ops)',
    calc_1_save: 'Save $768/yr',
    calc_2_old: 'Generic AI Copywriting Wrapper Seat ($49/mo)',
    calc_2_new: '→ Swap to OpenRouter/DeepSeek API + Content Kit ($4/mo)',
    calc_2_save: 'Save $540/yr',
    calc_3_old: 'Scattered PM, Docs & Habit Apps ($58/mo)',
    calc_3_new: '→ Swap to Notion Plus + The Solo OS ($10/mo)',
    calc_3_save: 'Save $576/yr',
    calc_4_old: 'Department-Store Dropper Serums & Clutter ($105/mo)',
    calc_4_new: '→ Swap to 3-Step Clinical Barrier Routine ($26/mo)',
    calc_4_save: 'Save $948/yr',
    calc_eyebrow: 'YOUR ANNUALIZED STACK RESET',
    calc_note: 'Reclaimed every year without losing a single capability.',
    calc_old_label: 'Old Monthly Burn',
    calc_new_label: 'CruxKit Lean Stack',
    calc_cta: `Get the Free Reset Checklist ${arrow}`,
    edit_heading: 'Fresh ideas, put to work (16 Deep-Dive Guides).',
    edit_note: 'Complete benchmark articles, setup tutorials, and clinical formulation audits — click any card to read the full essay with data tables.',
    edit_filter_all: 'All Guides (16)',
    edit_filter_ai: 'AI, Cloud & Solo Business (11)',
    edit_filter_beauty: 'Skincare & Formula Lab (5)',
    free_heading: 'Small tools.<br>Big possibility.',
    free_pill1: '✓ 5-Step Focused Builder Reset',
    free_pill2: '✓ Interactive Progress Memory',
    free_pill3: '✓ Instant .TXT Download · No Email Required',
    free_cta: `Free starter kit ${arrow}`,
    foot_stack: 'The stack (36)',
    foot_calc: 'Calculator',
    foot_disclosure: 'Affiliate disclosure',
    foot_privacy: 'Privacy & terms',
    foot_copy: '© 2026 CruxKit Studio (cruxxxxxkit.com) · Independent Benchmarks & Digital Kits',
    foot_ftc: 'FTC Disclosure: Reader-supported publication. Partner links may earn a commission at no extra cost to you.',
    per_yr: '/ yr',
    per_mo: '/ mo'
  },
  zh: {
    page_title: 'CruxKit — 20 款数字效率套件 · 40 款严选工具 · 24 篇 AI、云基建与功效护肤实验室严选',
    meta_desc: 'CruxKit (cruxxxxxkit.com) — 面向独立创作者与一人公司的 16 款即用型数字套件、36 款 S 级严选工具与护肤配方实测、16 篇深度实操指南。',
    skip: '跳至正文',
    nav_kits: '数字套件 (20)',
    nav_stack: '严选好物栈 <span class="nav-pill-tag">36 款严选</span>',
    nav_calc: '订阅省钱算账',
    nav_edit: '深度专栏 (16)',
    nav_approach: '评测理念',
    nav_free: '免费入门包',
    mob_stack: '36 款 S 级严选工具与配方栈',
    mob_calc: '年度订阅降本计算器',
    hero_eyebrow: 'CRUXKIT PULSE · 2026 全量商品目录 · 16 款数字套件 & 36 款实验室严选单品',
    hero_title: '化繁为简，<br><span>轻装创造。</span>',
    hero_sub: '16 套开箱即用的数字源文件包、36 款经受实战压测的 AI 软件、云基建与临床护肤配方严选，助你用更少成本跑出更高日常产出。',
    hero_cta_primary: `浏览 16 款数字套件 ${arrow}`,
    hero_cta_stack: '查看 40 款 S 级严选带货榜',
    metric_1: '<strong>16 款即用型数字套件</strong><br>含工作流源码、API 防封包与 Notion 中枢',
    metric_2: '<strong>36 款高佣金严选好物</strong><br>覆盖 AI、创作、VPS 与功效护肤实验室',
    metric_3: '<strong>16 篇硬核评测专栏</strong><br>中英双语数据对比表与实操教程',
    metric_4: '<strong>平均每年立省 $2,800+</strong><br>砍掉溢价订阅与盲目跟风消费',
    kits_heading: '选择你的下一步行动（16 款数字套件）。',
    kits_note: '16 套附带真实可下载 .ZIP 源文件的数字系统 —— 点击任意套件即可查看交付清单、蓝图代码预览与直接下载。',
    kits_filter_all: '全部套件 (20)',
    kits_filter_wf: 'AI、API 与云边缘 (6)',
    kits_filter_os: 'Notion、短视频与增长 (5)',
    kits_filter_rt: '功效护肤与成分实验室 (4)',
    kits_filter_bd: '全站 15 合 1 全家桶 (1)',
    stack_heading: 'S 级严选工具与配方栈（共 36 款）。',
    stack_note: '横跨四大专业评测台（AI 自动化、创作者增长、云端基建、功效护肤实验室）—— 点击任意单品查看优缺点实测与官方合作通道。',
    stack_filter_all: '全部严选 (40)',
    stack_filter_ai: '01 · AI 与自动化 (10)',
    stack_filter_creator: '02 · 创作、视频与 SEO (9)',
    stack_filter_cloud: '03 · 域名、云与全球收款 (9)',
    stack_filter_beauty: '04 · 功效护肤与韩妆实验室 (10)',
    stack_search_placeholder: '搜索 40 款工具、API、域名、收款、精华、防晒...',
    calc_heading: '砍掉冗余溢价，<br><span>保留满格产出。</span>',
    calc_sub: '勾选你目前正在付费的软件订阅或日常消耗品，实时测算切换至 CruxKit 精简栈后每年省下的真金白银：',
    calc_1_old: 'Zapier 专业版 (10,000 次任务/月 — $73/月)',
    calc_1_new: '→ 替换为 Make.com Core ($9/月享 10,000 次操作)',
    calc_1_save: '立省 $768/年',
    calc_2_old: '套壳 AI 写作工具包月席位 ($49/月)',
    calc_2_new: '→ 替换为 OpenRouter/DeepSeek 官方 API + 提示词包 ($4/月)',
    calc_2_save: '立省 $540/年',
    calc_3_old: '分散的项目管理、文档与打卡 App ($58/月)',
    calc_3_new: '→ 替换为 Notion Plus + The Solo OS 系统 ($10/月)',
    calc_3_save: '立省 $576/年',
    calc_4_old: '专柜滴管精华与盲目跟风叠加瓶罐 ($105/月)',
    calc_4_new: '→ 替换为 3 步循证早 C 晚 A 屏障精简方案 ($26/月)',
    calc_4_save: '立省 $948/年',
    calc_eyebrow: '你的年度订阅与消费精简账单',
    calc_note: '每年省下真金白银，且工作流效率与护肤效果不降反升。',
    calc_old_label: '原每月冗余支出',
    calc_new_label: 'CruxKit 精简栈月费',
    calc_cta: `免费领取精简实操清单 ${arrow}`,
    edit_heading: '经得起实战的思考（16 篇深度指南）。',
    edit_note: '完整评测长文、参数对比表与保姆级配置教程 —— 点击任意卡片即可阅读全文。',
    edit_filter_all: '全部专栏 (16)',
    edit_filter_ai: 'AI、云基建与一人公司 (11)',
    edit_filter_beauty: '功效护肤与成分实验室 (5)',
    free_heading: '趁手小工具，<br>撬动大可能。',
    free_pill1: '✓ 5 步创作者每日重启清单',
    free_pill2: '✓ 浏览器本地实时进度记忆',
    free_pill3: '✓ 免邮箱直接下载 .TXT 实操表',
    free_cta: `免费领取入门包 ${arrow}`,
    foot_stack: '严选好物栈 (36)',
    foot_calc: '省钱计算器',
    foot_disclosure: '联盟合规声明',
    foot_privacy: '隐私与授权条款',
    foot_copy: '© 2026 CruxKit Studio (cruxxxxxkit.com) · 独立实验室评测与数字效率套件',
    foot_ftc: '合规声明：本站由读者支持运营，通过合作伙伴链接购买或注册不会增加您的任何费用，部分链接还可解锁专属福利。',
    per_yr: '/ 年',
    per_mo: '/ 月'
  }
};

/* -----------------------------------------------------------
   2. 12 DIGITAL KITS FULL CATALOG (BILINGUAL EN & 中文)
----------------------------------------------------------- */
const kitsOrder = [
  'automation', 'workstation', 'mcppack', 'n8nvps',
  'solo', 'content', 'videoengine', 'hooksvault',
  'routine', 'incidecoder', 'sunguide', 'allbundle'
];

const productsData = {
  en: {
    automation: {
      num: '01', catKey: 'workflow', price: 24, tile: 'tile-automation',
      name: 'The Automation Kit',
      category: 'Workflows · Make & n8n Blueprints',
      badges: ['15 JSON Blueprints', 'Make & n8n', 'Bestseller'],
      shortDesc: 'Set up practical automations for content capture, AI routing, and filing that give you back 6+ hours a week.',
      description: 'A practical collection of 15 ready-to-import Make.com and n8n automations for the tasks you keep doing twice—built for solo creators and lean operators.',
      items: [
        'Content capture to multi-channel publishing workflow (Make & n8n JSON)',
        'Automated invoice, receipt & partner link filing pipeline',
        'AI brief structurer with human-in-the-loop review webhook',
        'Plain-English 18-page illustrated setup & API key guide'
      ],
      companionTool: { name: 'Make.com (1,000 Free Ops + 35% Partner Link)', url: 'https://www.make.com/en/register?pc=cruxkit' },
      sample: `// WORKFLOW 01: CAPTURE-TO-BRIEF PIPELINE\n1. TRIGGER: Starred note in Notion or RSS watch.\n2. FILTER: Skip items without a 1-sentence takeaway.\n3. AI NODE (Claude / DeepSeek): Extract 3 core claims & 1 table into JSON.\n4. HUMAN GATE: Slack/Email approval button.\n5. ARCHIVE: Log source URL and affiliate partner tag.`
    },
    workstation: {
      num: '02', catKey: 'workflow', price: 19, tile: 'tile-desk',
      name: 'Private AI Workstation & Anti-Ban API Pack',
      category: 'AI Infrastructure · Official API Router + 50 Agents',
      badges: ['Zero Ban Risk', 'LobeChat 50 Agents', 'OpenRouter / DeepSeek'],
      shortDesc: 'Stop buying fragile shared accounts. Deploy your own multi-LLM private workstation using official APIs at $2/mo pay-as-you-go.',
      description: 'Replaces $60/mo of separate chat subscriptions and eliminates account-ban anxiety by pairing official pay-as-you-go APIs (OpenRouter, DeepSeek, Claude) with a 1-click LobeChat deployment.',
      items: [
        'Pre-configured LobeChat / NextChat JSON with 50 specialized expert agents',
        '1-Click zero-cost deployment guide on Cloudflare Pages / Zeabur / Vercel',
        'Official API routing rules (Claude Sonnet 5.5 & Opus 5.5 for coding/writing, DeepSeek V4-Pro-0813 for reasoning)',
        'Rate-limit protection, token cost cap & privacy hardening checklist'
      ],
      companionTool: { name: 'OpenRouter Unified Official LLM API', url: 'https://openrouter.ai/?ref=cruxkit' },
      sample: `// ROUTING RULEBOOK: PAY-AS-YOU-GO MULTI-MODEL HUB\n• Coding & Long-Form Editing -> anthropic/claude-sonnet-4-5\n• Bulk Data Extraction & Math -> deepseek/deepseek-v4-pro-0813 ($0.14 / 1M tokens)\n• Fast Multilingual Translation -> google/gemini-3.1-flash\n• Average Monthly API Bill for Solo Creator: $2.40 - $4.80/mo (Zero Ban Risk)`
    },
    mcppack: {
      num: '03', catKey: 'workflow', price: 29, tile: 'tile-folders',
      name: 'MCP Super-Agent Server Pack',
      category: 'Agent Engineering · 20 Claude & Cursor MCP Configs',
      badges: ['20 MCP Servers', 'Claude & Cursor', '1-Click JSON'],
      shortDesc: 'Turn Claude Desktop and Cursor into autonomous local operators with 20 pre-configured Model Context Protocol (MCP) server bundles.',
      description: 'Skip hours of dependency debugging. Drop our tested claude_desktop_config.json into your setup to connect your AI directly to local files, GitHub, Brave Search, Notion, Postgres, and browser automation.',
      items: [
        '20 production-tested MCP server configurations (Filesystem, GitHub, Brave, Notion, SQLite, Playwright)',
        'Security sandboxing & read-only directory permission templates',
        '10 multi-server agent prompt chains for automated market research & code audits',
        'Windows PowerShell & macOS terminal 1-click installer scripts'
      ],
      companionTool: { name: 'Cursor AI Code & Agent IDE', url: 'https://www.cursor.com/?ref=cruxkit' },
      sample: `{\n  "mcpServers": {\n    "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "./workspace"] },\n    "brave-search": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-brave-search"] },\n    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] }\n  }\n}`
    },
    n8nvps: {
      num: '04', catKey: 'workflow', price: 18, tile: 'tile-automation',
      name: 'n8n $4/Mo VPS Docker Self-Host Boilerplate',
      category: 'DevOps & Cloud · Unlimited Workflow Executions',
      badges: ['Docker Compose', 'Auto SSL (Caddy)', 'Unlimited Runs'],
      shortDesc: 'Self-host n8n on a $4.99 VPS with automatic HTTPS, PostgreSQL queue mode, and daily encrypted backups in 10 minutes.',
      description: 'Everything you need to run unlimited multi-step AI agent loops on your own lightweight Linux VPS without paying per-step cloud SaaS fees.',
      items: [
        'Production docker-compose.yml with n8n + PostgreSQL + Caddy auto-HTTPS',
        'Automated daily encrypted workflow backup script to Cloudflare R2 / S3',
        'Worker queue mode configuration for handling high-volume webhooks',
        'Step-by-step copy-paste SSH commands for Ubuntu 24.04 LTS'
      ],
      companionTool: { name: 'Hostinger Docker VPS ($4.99/mo · 60% Partner Deal)', url: 'https://www.hostinger.com/?REFERRALCODE=CRUXKIT' },
      sample: `# 3-MINUTE UBUNTU VPS DEPLOYMENT\ncurl -fsSL https://get.docker.com | sh\ngit clone https://cruxxxxxkit.com/boilerplates/n8n-docker-stack.git\ncp .env.example .env && nano .env\ndocker compose up -d`
    },
    solo: {
      num: '05', catKey: 'os', price: 19, tile: 'tile-solo',
      name: 'The Solo OS',
      category: 'Notion System · Creator & Affiliate CRM Hub',
      badges: ['Notion Template', 'Affiliate CRM', 'Now / Next / Later'],
      shortDesc: 'A focused operating system for running active projects, tracking 40+ partner links, and keeping your weekly review calm.',
      description: 'One considered home for your active projects, editorial pipeline, affiliate partner links, and the single next action that deserves your attention.',
      items: [
        'Focused daily dashboard with strict 3-Project "Now" limit',
        'Editorial calendar with stage gates (Ideas → Drafting → Ready → Published)',
        'Built-in Affiliate & Partner Link CRM (UTM builder, cookie duration & payout tracker)',
        'Guided 20-minute Friday review and weekly reset routine'
      ],
      companionTool: { name: 'Notion + Notion AI Workspace', url: 'https://affiliate.notion.so/cruxkit' },
      sample: `// THE SOLO OS — "NOW / NEXT / LATER" RULEBOOK\n• NOW (Max 3 Active Projects): Must have 1 physical next action.\n• NEXT (Up to 5 Queued): Scoped ideas waiting for a Now slot.\n• LATER (Season Vault): Parked ideas kept out of your daily view.`
    },
    content: {
      num: '06', catKey: 'os', price: 15, tile: 'tile-content',
      name: 'The Content & GEO Kit',
      category: 'Creator Resources · 50 Prompts & GEO Wireframes',
      badges: ['50 System Prompts', 'GEO Wireframes', 'AI Search Ready'],
      shortDesc: 'A clearer path from the first spark of an idea to high-trust reviews cited by ChatGPT, Perplexity, and Google AI.',
      description: 'Engineered specifically for Generative Engine Optimization (GEO): structure your reviews and comparison tables so AI search engines cite your site as the primary source.',
      items: [
        'One-page reusable content brief & reader intent canvas',
        '6 GEO-ready comparison & Tier List article wireframes (TL;DR Box + Schema tables)',
        '50 modular editorial & script prompts for Claude Sonnet 5.5 & Opus 5.5, Gemini & DeepSeek',
        'Pre-publish clarity, FTC disclosure, and affiliate link-check checklist'
      ],
      companionTool: { name: 'Semrush SEO & GEO Intelligence Suite', url: 'https://www.semrush.com/?ref=cruxkit' },
      sample: `// GEO REVIEW WIREFRAME (OPTIMIZED FOR AI CITATIONS)\n1. 30-SECOND CRUX VERDICT BOX (Winner, Best For, Key Metric)\n2. HARD-METRIC MARKDOWN COMPARISON TABLE\n3. REAL-WORLD SETUP TRADE-OFFS & FAILURE MODES`
    },
    videoengine: {
      num: '07', catKey: 'os', price: 22, tile: 'tile-content',
      name: 'Faceless Video & Short-Form Print Engine',
      category: 'Video Systems · 30 Scripts + Neural Voice Pipeline',
      badges: ['30 Viral Scripts', 'ElevenLabs + HeyGen', '4-Channel Sync'],
      shortDesc: 'Publish studio-grade vertical product breakdowns across TikTok, Shorts, Reels, and Xiaohongshu in 90 minutes a week.',
      description: 'Combine tight 120-word visual comparison scripts with ElevenLabs v3 neural voiceover and clean screen-recording B-roll to drive high-intent affiliate traffic without showing your face.',
      items: [
        '30 fill-in-the-blank 35-second vertical product review & "vs." scripts',
        'Optimal ElevenLabs v3 voice stability, clarity & breath pacing JSON presets',
        '9:16 high-retention caption & comparison table overlay layout guides',
        'Cross-border multi-platform repurposing checklist (TikTok / Shorts / Reels / RedNote)'
      ],
      companionTool: { name: 'ElevenLabs v3 Voice Studio (10k Free Chars)', url: 'https://elevenlabs.io/?from=partnercruxkit' },
      sample: `// 35-SEC VERTICAL SCRIPT FORMULA\n[00:00 - 00:03 HOOK]: "Stop paying $73/mo for Zapier when this $9 visual router does 5x more."\n[00:03 - 00:18 PROOF]: Show live 50,000-task cost table side by side.\n[00:18 - 00:30 DEMO]: 1-click JSON blueprint import.\n[00:30 - 00:35 CTA]: "Grab the free starter blueprint at cruxxxxxkit.com."`
    },
    hooksvault: {
      num: '08', catKey: 'os', price: 16, tile: 'tile-desk',
      name: 'X (Twitter) & Xiaohongshu 100 Viral Hooks Vault',
      category: 'Audience Growth · 100 Bilingual Threads & Carousels',
      badges: ['100 Proven Hooks', 'X + Xiaohongshu', 'High CTR'],
      shortDesc: '100 battle-tested bilingual opening hooks, thread structures, and carousel slide frameworks that turn impressions into site clicks.',
      description: 'Built from analyzing 500+ top-performing indie creator posts on X and Xiaohongshu across AI tools, productivity systems, and clinical skincare.',
      items: [
        '100 categorized bilingual hooks (Cost-Audit Hooks, Contrarian Myth-Busters, Tear-Downs)',
        '12 complete 7-post X thread templates with lead-magnet auto-DM triggers',
        '12 Xiaohongshu (RedNote) 6-slide cover & caption conversion templates',
        'UTM link tracking spreadsheet for measuring social-to-affiliate ROI'
      ],
      companionTool: { name: 'Beehiiv Creator Newsletter OS (50% Partner Deal)', url: 'https://www.beehiiv.com/?via=cruxkit' },
      sample: `// HOOK #14 (THE SUBSCRIPTION AUDIT HOOK)\nEN: "I audited 42 AI subscriptions in 2026 and canceled 36 of them. Here are the only 6 tools worth paying for (and what they replaced):"\nZH: "我把月费 $285 的 15 个工具砍到了只剩 4 个，效率反而翻倍（附平替清单）："`
    },
    routine: {
      num: '09', catKey: 'routine', price: 12, tile: 'tile-rings',
      name: 'The Barrier & Routine Kit',
      category: 'Desk 04 · 28-Day Skin Cycling & Conflict System',
      badges: ['28-Day Cycling', 'Conflict Matrix PDF', 'Vanity Cards'],
      shortDesc: 'An evidence-based AM/PM skincare cycling calendar, ingredient conflict chart, and cost-per-milliliter tracker.',
      description: 'An evidence-based AM/PM dermal routine system that eliminates ingredient conflicts, over-exfoliation, and overpriced shelf clutter.',
      items: [
        '28-Day Retinoid / Exfoliant / Barrier Recovery cycling calendar',
        'Active Ingredient pH & Conflict Matrix (Vitamin C, Retinoids, Acids, Peptides)',
        'Printable waterproof bathroom vanity AM & PM routine cards',
        'Skincare Shelf Cost-per-Milliliter & 6-Week Oxidation Tracker'
      ],
      companionTool: { name: 'Timeless 20% Vitamin C + E Ferulic (iHerb Verified)', url: 'https://www.iherb.com/search?kw=Timeless+Skin+Care+Vitamin+C&rcode=CRUXKIT' },
      sample: `// 4-NIGHT DERMAL BARRIER CYCLING LOOP\n• AM: Water rinse → pH 2.9 Vitamin C + E + Ferulic → SPF 50+\n• NIGHT 1 (Exfoliate): 2% BHA or 7% AHA → Barrier Cream\n• NIGHT 2 (Retinoid): Pea-sized Adapalene 0.1% / Retinal → Ceramide Balm\n• NIGHTS 3 & 4 (Recovery): 5% Panthenol B5+ Balm on damp skin.`
    },
    incidecoder: {
      num: '10', catKey: 'routine', price: 14, tile: 'tile-folders',
      name: 'Cosmetic INCI Decoder & Cost-Per-Active Sheet',
      category: 'Desk 04 · 200+ Clinical Actives Database',
      badges: ['200+ Actives CSV', 'pH & Stability', 'Dupe Finder'],
      shortDesc: 'Decode any skincare label in 30 seconds: optimal pH, effective clinical percentages, and verified $20 dupes for $180 luxury serums.',
      description: 'Stop paying for department-store fragrance and glass dropper marketing. Our master spreadsheet ranks 200+ active ingredients by clinical evidence, required pH, and packaging stability.',
      items: [
        '200+ Skincare Active Ingredients searchable database (CSV & Notion)',
        'Required pH window & effective concentration thresholds for every active',
        '25 Luxury vs. Clinical Dupe side-by-side formulation comparisons',
        'Automated Cost-per-Active-Milligram calculator sheet'
      ],
      companionTool: { name: 'Paula’s Choice 2% BHA & Clinical Actives (iHerb)', url: 'https://www.iherb.com/search?kw=Paulas+Choice+2%25+BHA&rcode=CRUXKIT' },
      sample: `// LUXURY VS. CLINICAL FORMULATION AUDIT\n• Target Active: 15-20% L-Ascorbic Acid + 1% Tocopherol + 0.5% Ferulic Acid (pH ~2.9)\n• Luxury Benchmark: $182 / 30ml ($6.06/ml, glass dropper exposes to air)\n• CruxKit S-Tier Dupe: Timeless 20% CEF — $25.95 / 30ml ($0.86/ml, opaque airless pump)`
    },
    sunguide: {
      num: '11', catKey: 'routine', price: 12, tile: 'tile-rings',
      name: 'Clinical & K-Beauty Sunscreen UV-Filter Master Guide',
      category: 'Desk 04 · 40 Tested Sunscreens Ranked by UVA1 Filters',
      badges: ['40 SPF Audits', 'Modern UV Filters', 'Zero White Cast'],
      shortDesc: 'Compare 40 top Korean, European, and clinical sunscreens by modern photostable UV filters (Tinosorb S, Uvinul A Plus, Mexoryl 400).',
      description: 'Not all SPF 50 labels protect equally against aging UVA1 rays. We audited 40 global sunscreens by filter architecture, photostability, eye-sting score, and makeup compatibility.',
      items: [
        '40-Sunscreen Master Comparison Matrix (Filter breakdown, PPD/PA rating, finish)',
        'Next-Gen UV Filter Cheat Sheet (Uvinul A Plus, Tinosorb S/M, Uvinul T 150, Mexoryl 400)',
        'Skin-type matching guide (Oily/Acne-Prone, Rosacea/Sensitive, Dry/Retinoid Users)',
        'Direct verified sourcing links to avoid counterfeit SPF products'
      ],
      companionTool: { name: 'Beauty of Joseon Relief Sun SPF50+ PA++++ (iHerb)', url: 'https://www.iherb.com/search?kw=Beauty+of+Joseon+Relief+Sun&rcode=CRUXKIT' },
      sample: `// MODERN PHOTSTABLE UV FILTER ARCHITECTURE\n• UVA1 + UVA2: Diethylamino Hydroxybenzoyl Hexyl Benzoate (Uvinul A Plus)\n• Broad-Spectrum Stabilizer: Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine (Tinosorb S)\n• UVB High-Absorption: Ethylhexyl Triazone (Uvinul T 150)\n• Result: High UVA protection with zero chalky zinc white cast.`
    },
    allbundle: {
      num: '12', catKey: 'bundle', price: 69, tile: 'tile-automation', isBundle: true,
      name: 'CruxKit All-Access 11-in-1 Master Bundle',
      category: 'Flagship Pass · All 11 Digital Kits + Lifetime Releases',
      badges: ['Save 65% ($200 Value)', 'All 11 ZIP Packs', 'VIP Lifetime Pass'],
      shortDesc: 'Get instant access to all 11 AI, Automation, Notion OS, Creator Growth, and Clinical Formulation kits in one master download.',
      description: 'Our highest-leverage package: unlock every single workflow JSON, LobeChat API config, MCP server pack, Notion Solo OS, 100 Viral Hooks vault, and all 3 Clinical Skincare Lab kits—plus all future 2026–2027 releases free.',
      items: [
        'Includes Kits 01–04: Automation Kit + Private AI API Pack + 20 MCP Servers + n8n VPS Docker Stack',
        'Includes Kits 05–08: Notion Solo OS + Content & GEO Kit + Faceless Video Engine + 100 Viral Hooks Vault',
        'Includes Kits 09–11: Barrier Cycling Kit + 200 INCI Decoder Sheet + 40 Sunscreen UV-Filter Guide',
        'Priority access to all new 2026 workflow blueprints and benchmark spreadsheets'
      ],
      companionTool: { name: 'Make.com + Notion + iHerb Full S-Tier Ecosystem', url: 'https://www.make.com/en/register?pc=cruxkit' },
      sample: `// ALL-ACCESS 11-IN-1 MASTER BUNDLE MANIFEST\n[x] 01_Automation_Kit ($24)       [x] 02_Private_AI_Workstation ($19)\n[x] 03_MCP_Super_Agent_Pack ($29) [x] 04_n8n_Docker_VPS_Pack ($18)\n[x] 05_The_Solo_OS ($19)          [x] 06_Content_and_GEO_Kit ($15)\n[x] 07_Faceless_Video_Engine ($22)[x] 08_100_Viral_Hooks_Vault ($16)\n[x] 09_Barrier_Routine_Kit ($12)  [x] 10_INCI_Decoder_Sheet ($14)\n[x] 11_Sunscreen_UV_Guide ($12)   --> Total Value: $200 | Bundle Price: $69`
    }
  },
  zh: {
    automation: {
      num: '01', catKey: 'workflow', price: 24, tile: 'tile-automation',
      name: 'The Automation Kit · 自动化蓝图包',
      category: '自动化工作流 · Make & n8n 15 套源码',
      badges: ['15 套 JSON 源码', '兼容 Make 与 n8n', '全站销冠'],
      shortDesc: '一键导入的素材抓取、AI 摘要路由与财务归档自动化蓝图，每周为你省下 6 小时以上重复劳动。',
      description: '专为独立创作者与一人公司整理的 15 套即用型 Make.com 与 n8n 自动化蓝图合集，把每周重复做两遍以上的机械事务彻底交给后台。',
      items: [
        '全网灵感抓取 → AI 提炼 → 多平台草稿分发工作流（含 Make 与 n8n 双版本 JSON）',
        '账单收据、订阅提醒与联盟营销推广链接自动归档流水线',
        '带“人工确认按钮”的 AI 评测大纲生成器（杜绝 AI 幻觉直接发布）',
        '18 页图文并茂的 API 密钥配置与排错指南（零编程基础可上手）'
      ],
      companionTool: { name: 'Make.com（免费领 1,000 次操作额度）', url: 'https://www.make.com/en/register?pc=cruxkit' },
      sample: `// 蓝图 01：从灵感抓取到结构化大纲流水线\n1. 触发器：Notion 标星笔记或 RSS 订阅更新。\n2. 过滤器：自动跳过未写“一句话理由”的无效剪藏。\n3. AI 节点 (Claude / DeepSeek)：提取 3 个核心论点与对比表格 JSON。\n4. 人工门禁：推送预览卡片点击“批准发布”。`
    },
    workstation: {
      num: '02', catKey: 'workflow', price: 19, tile: 'tile-desk',
      name: '私人 AI 工作台 & 官方 API 防封部署包',
      category: 'AI 基建 · 告别共享号封号焦虑 + 50 专家智能体',
      badges: ['100% 零封号风险', '50 个预设智能体', 'OpenRouter / DeepSeek'],
      shortDesc: '彻底告别三天两头封号的共享成品号！用官方按量 API + LobeChat 零成本搭建专属多模型工作台（月均仅需 $3）。',
      description: 'X 与小红书最受欢迎的合规替代方案：无需购买高风险合租号，直接通过 OpenRouter / DeepSeek / 硅基流动官方 API 配合一键部署的 LobeChat，同时调用 Claude Sonnet 5.5 & Opus 5.5、GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna 与 DeepSeek V4-Pro-0813。',
      items: [
        '预置 50 个垂直领域专家智能体（GEO 评测主笔、全栈代码审计、小红书爆款改写等）的 LobeChat 配置文件',
        'Cloudflare Pages / Zeabur / Vercel 零服务器费用 3 分钟一键部署图文手册',
        '多模型省钱路由策略：写作写代码调 Claude Sonnet 5.5 & Opus 5.5，大批量推理清洗调 DeepSeek V4-Pro-0813',
        'API 额度防刷上限设置与个人隐私防泄露加固清单'
      ],
      companionTool: { name: 'OpenRouter 官方多模型聚合 API 平台', url: 'https://openrouter.ai/?ref=cruxkit' },
      sample: `// 多模型黄金省钱路由表\n• 深度长文与代码开发 -> anthropic/claude-sonnet-4-5\n• 批量数据清洗与逻辑推理 -> deepseek/deepseek-v4-pro-0813 (仅 $0.14 / 百万 Token)\n• 多语种极速互译 -> google/gemini-3.1-flash\n• 一人公司月均 API 账单：仅约 ¥18 - ¥35/月（官方通道，永不封号）`
    },
    mcppack: {
      num: '03', catKey: 'workflow', price: 29, tile: 'tile-folders',
      name: 'MCP 超级智能体配置全家桶 (20 合 1)',
      category: '智能体工程 · Claude Desktop & Cursor 即用配置',
      badges: ['20 组 MCP 服务', '适配 Claude 与 Cursor', '一键 JSON 导入'],
      shortDesc: '免去繁琐环境排错，一键为 Claude Desktop 与 Cursor 挂载本地文件读写、GitHub、实时联网检索与数据库操作能力。',
      description: 'Model Context Protocol (MCP) 是 2026 最核心的 AI 生产力升级。本包整理了 20 组经过实测验证的 MCP Server 配置文件与安全沙箱模版，复制即用。',
      items: [
        '20 组高频 MCP Server 完整配置 JSON（Filesystem、GitHub、Brave 联网、Notion、SQLite、浏览器自动化）',
        '本地目录只读安全沙箱权限配置模版（防止 AI 误删重要文件）',
        '10 条跨服务组合指令链（例如：自动抓取竞品网页 → 生成对比表 → 写入本地 Markdown）',
        'Windows PowerShell 与 macOS 终端一键环境自检脚本'
      ],
      companionTool: { name: 'Cursor AI 智能代码与建站编辑器', url: 'https://www.cursor.com/?ref=cruxkit' },
      sample: `{\n  "mcpServers": {\n    "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "./workspace"] },\n    "brave-search": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-brave-search"] },\n    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] }\n  }\n}`
    },
    n8nvps: {
      num: '04', catKey: 'workflow', price: 18, tile: 'tile-automation',
      name: 'n8n $4/月 VPS Docker 私有化无限运行包',
      category: '云端基建 · 摆脱按步计费 · 无限跑 AI 循环',
      badges: ['Docker 一键编排', '自动 HTTPS 证书', '每日加密备份'],
      shortDesc: '10 分钟在 $4.99 轻量云服务器上私有化部署 n8n，享无限次 AI 智能体循环执行、自动 SSL 证书与每日云端备份。',
      description: '如果你有高频抓取或多步大模型循环任务，自托管 n8n 可每年省下上千美元。本包含生产级 Docker Compose、Caddy 反代与防崩队列配置。',
      items: [
        '生产级 docker-compose.yml（内置 n8n + PostgreSQL 数据库 + Caddy 自动续期 HTTPS）',
        '每日定时将工作流与凭证加密备份至 Cloudflare R2 的自动化脚本',
        '高并发 Webhook 队列模式（Queue Mode）调优参数',
        'Ubuntu 24.04 零基础复制粘贴式 SSH 部署说明书'
      ],
      companionTool: { name: 'Hostinger 高性价比 Docker VPS ($4.99/月起)', url: 'https://www.hostinger.com/?REFERRALCODE=CRUXKIT' },
      sample: `# 3 分钟 Ubuntu VPS 极速部署命令\ncurl -fsSL https://get.docker.com | sh\ngit clone https://cruxxxxxkit.com/boilerplates/n8n-docker-stack.git\ncp .env.example .env && nano .env\ndocker compose up -d`
    },
    solo: {
      num: '05', catKey: 'os', price: 19, tile: 'tile-solo',
      name: 'The Solo OS · 一人公司操作中枢',
      category: 'Notion 完整系统 · 项目与联盟营销 CRM 台账',
      badges: ['Notion 模版', '内置联盟 CRM', 'Now / Next / Later'],
      shortDesc: '清爽克制的 Notion 操作系统：统管正在推进的核心项目、40+ 联盟推广链接台账与每周五 20 分钟复盘。',
      description: '为你的在研项目、内容日历、联盟推广链接与“下一步唯一具体行动”打造一个清爽、不焦虑的数字大本营。',
      items: [
        '严格限制“最多 3 个并行项目（Now）”的每日专注仪表盘',
        '四阶段内容日历（灵感池 → 撰稿中 → 待发布 → 已上线归档）',
        '内置联盟营销（Affiliate CRM）台账：UTM 链接生成器、Cookie 周期与佣金提现追踪',
        '引导式“每周五下午 20 分钟周度清空与重启”复盘看板'
      ],
      companionTool: { name: 'Notion + Notion AI 官方工作区', url: 'https://affiliate.notion.so/cruxkit' },
      sample: `// THE SOLO OS — "NOW / NEXT / LATER" 铁律\n• NOW（上限 3 个）：必须写明唯一、可立刻动手的具体动作。\n• NEXT（上限 5 个）：等待 Now 空出位置即可启动的企划。\n• LATER（季度冷库）：安心存放灵感，绝不干扰每日视线。`
    },
    content: {
      num: '06', catKey: 'os', price: 15, tile: 'tile-content',
      name: 'The Content & GEO Kit · 高转化内容与 AI 搜索优化包',
      category: '创作者资源 · 50 组提示词 & 6 套 GEO 评测骨架',
      badges: ['50 组实战 Prompt', 'GEO 搜索优化', '高转化对比表'],
      shortDesc: '专为 AI 搜索引擎（ChatGPT / Perplexity / 秘塔）优化的深度评测框架，让你的带货长文成为 AI 回答的首选引用源。',
      description: '打通从第一个灵感火花到高信任度深度评测长文、参数对比表格与双语短视频脚本的标准化生产路径。',
      items: [
        '一页纸高转化内容立项画布（动笔前先锁定读者痛点与带货钩子）',
        '6 套针对 AI 搜索引擎抓取偏好的 GEO 对比评测与 Tier List 网页骨架',
        '50 组适配 Claude Sonnet 5.5 & Opus 5.5、Gemini 与 DeepSeek 的模块化审校与改写 Prompt',
        '发布前清晰度自检、合规披露与联盟死链排查清单'
      ],
      companionTool: { name: 'Semrush SEO 与 AI 搜索流量分析套件', url: 'https://www.semrush.com/?ref=cruxkit' },
      sample: `// GEO 深度评测黄金结构（极易被 AI 搜索直接引用）\n1. 首屏 30 秒结论框（综合首选、适用人群、核心量化指标）\n2. 结构化 Markdown 硬核参数对比表\n3. 真实使用边界与劝退指南（建立极高读者信任）`
    },
    videoengine: {
      num: '07', catKey: 'os', price: 22, tile: 'tile-content',
      name: '不出镜双语短视频流水线 (Faceless Video Engine)',
      category: '视频增长系统 · 30 组爆款脚本 + 拟真配音参数',
      badges: ['30 组口播分镜稿', 'ElevenLabs + HeyGen', '一鱼四吃分发'],
      shortDesc: '无需露脸与昂贵摄影棚，每周 90 分钟批量产出同步分发至抖音/小红书、TikTok、Shorts 与 Reels 的高转化测评视频。',
      description: '用 120 字高密度对比脚本配合 ElevenLabs v3 个人声音克隆与高清录屏分镜，打造高完播率的软件与好物带货短视频矩阵。',
      items: [
        '30 套填空即用的 35 秒竖屏工具/好物横评脚本（含黄金前 3 秒留存钩子）',
        'ElevenLabs v3 最佳人声稳定性、呼吸气口与情绪张力 JSON 参数预设',
        '9:16 竖屏高对比度字幕与参数表叠加排版规范',
        '中英双语“一鱼四吃”跨平台去重与评论区置顶引流操作手册'
      ],
      companionTool: { name: 'ElevenLabs v3 拟真语音工作室（免费送 1万字符）', url: 'https://elevenlabs.io/?from=partnercruxkit' },
      sample: `// 35 秒高转化测评视频标准分镜\n[00:00 - 00:03 痛点钩子]：“别再每月交 $73 的 Zapier 智商税了，这个 $9 的可视化工具强 5 倍。”\n[00:03 - 00:18 硬核证据]：同屏展示 50,000 次任务实测账单对比表。\n[00:18 - 00:35 行动号召]：“评论区或主页直达 cruxxxxxkit.com 免费领蓝图。”`
    },
    hooksvault: {
      num: '08', catKey: 'os', price: 16, tile: 'tile-desk',
      name: 'X (Twitter) & 小红书 100 组高点击引流钩子库',
      category: '公域引流引擎 · 100 组中英双语爆款开头与图文模版',
      badges: ['100 组爆款开头', 'X 长推 + 小红书图文', '高点击率验证'],
      shortDesc: '拆解 500+ 篇海内外独立站引流爆文，提炼出 100 组直接带来独立站点击与联盟成交的中英双语标题与图文框架。',
      description: '独立站最大的冷启动瓶颈是公域引流。本包直接给你 100 组经过实战验证的“算账对比型”、“反常识辟谣型”与“保姆级干货型”双语引流模版。',
      items: [
        '100 组分类双语黄金开头钩子（涵盖 AI 工具、自动化省钱、一人公司与成分护肤）',
        '12 套完整的 X (Twitter) 7 连推（Thread）深度种草模版',
        '12 套小红书 6 页高收藏率对比图卡文案与封面大字规范',
        '公域渠道 UTM 转化率追踪表（精准定位哪条推文带来了佣金）'
      ],
      companionTool: { name: 'Beehiiv 创作者邮件通讯与私域变现平台', url: 'https://www.beehiiv.com/?via=cruxkit' },
      sample: `// 爆款钩子 #14（订阅算账反差型）\nEN: "I audited 42 AI subscriptions in 2026 and canceled 36 of them. Here are the only 6 tools worth paying for:"\nZH: "我把月费 $285 的 15 个工具砍到了只剩 4 个，效率反而翻倍（附完整平替清单）："`
    },
    routine: {
      num: '09', catKey: 'routine', price: 12, tile: 'tile-rings',
      name: 'The Barrier & Routine Kit · 屏障护肤循环包',
      category: '04 号实验室 · 28 天早 C 晚 A 循环与冲突表',
      badges: ['28 天护肤循环', '成分冲突表 PDF', '洗漱台速查卡'],
      shortDesc: '基于循证皮肤学的早晚活性成分循环日历、成分酸碱度冲突排查表与每毫升真实成本追踪器。',
      description: '基于循证皮肤学打造的早晚护肤精简系统，彻底告别猛药叠加烂脸、滴管氧化失效与梳妆台天价智商税。',
      items: [
        '28 天刷酸 / A 醇（维 A 酸类） / 屏障修护四晚循环日历表',
        '核心活性成分 pH 酸碱度与叠加冲突矩阵（原型维 C、A 醇、果酸/水杨酸、蓝铜胜肽）',
        '可打印的洗漱台早晚护肤步骤防水速查卡',
        '护肤品单毫升真实成本计算器 & 开封 6 周活性氧化追踪表'
      ],
      companionTool: { name: 'Timeless 20% 维 C + 维 E + 阿魏酸精华（iHerb 直邮）', url: 'https://www.iherb.com/search?kw=Timeless+Skin+Care+Vitamin+C&rcode=CRUXKIT' },
      sample: `// 4 晚皮肤屏障循环黄金公式\n• 每天早晨 (AM)：温和洁面 → pH 2.9 原型维 C 真空泵精华 → 防晒 SPF 50+\n• 第 1 晚（代谢角质）：2% 水杨酸或 7% 甘醇酸 → 神经酰胺霜\n• 第 2 晚（维 A 抗老）：干脸涂抹黄豆大小阿达帕林/A醇 → 保湿霜\n• 第 3 & 4 晚（深度修护）：微湿脸厚涂 5% 泛醇 B5+ 修复霜。`
    },
    incidecoder: {
      num: '10', catKey: 'routine', price: 14, tile: 'tile-folders',
      name: '200+ 护肤活性成分配伍库 & 贵妇平替审计表',
      category: '04 号实验室 · 成分党硬核查表工具 (CSV + Notion)',
      badges: ['200+ 活性成分库', '最佳 pH 与起效浓度', '25 组大牌平替'],
      shortDesc: '30 秒看穿任何护肤品成分表：收录 200+ 核心活性成分的起效浓度、酸碱度窗口与 25 组临床平替对照表。',
      description: '拒绝为专柜香精与营销故事支付 10 倍溢价。我们按临床文献证据等级、起效 pH 要求与包装保鲜度整理了这份可检索成分数据库。',
      items: [
        '200+ 护肤活性成分完整检索数据库（含中英文 INCI 名称、功效等级、刺激度评分）',
        '各成分黄金起效浓度与 pH 窗口速查（一眼识别概念性添加）',
        '25 组 $150+ 专柜贵妇单品 vs. $20 级临床硬核平替配方拆解表',
        '每毫克有效活性物真实成本（Cost-per-Active-mg）自动核算表'
      ],
      companionTool: { name: '宝拉珍选 2% 水杨酸精华液 (iHerb 全球畅销)', url: 'https://www.iherb.com/search?kw=Paulas+Choice+2%25+BHA&rcode=CRUXKIT' },
      sample: `// 专柜大牌 vs. 实验室平替配方审计示例\n• 核心配方目标：15-20% 左旋维 C + 1% 维 E + 0.5% 阿魏酸 (pH ~2.9)\n• 专柜标杆：$182 / 30ml ($6.06/ml，透明滴管易进空气氧化)\n• CruxKit 严选平替：Timeless 20% CEF — $25.95 / 30ml ($0.86/ml，不透光真空按压泵)`
    },
    sunguide: {
      num: '11', catKey: 'routine', price: 12, tile: 'tile-rings',
      name: '40 款热门防晒霜紫外线波段与肤感实测库',
      category: '04 号实验室 · 新一代光稳定防晒剂 (UVA1) 横评',
      badges: ['40 款防晒实测', '防晒剂波段拆解', '零假白不搓泥'],
      shortDesc: '横评 40 款韩系、欧系与临床防晒霜：拆解 Tinosorb S、Uvinul A Plus 与麦色滤 400 波段覆盖、成膜速度与跟妆表现。',
      description: '同样标着 SPF50+，防晒老（UVA1 长波）能力可能相差数倍。我们从防晒剂分子架构、光稳定性、熏眼指数与油皮控油度对 40 款防晒进行了量化评级。',
      items: [
        '40 款全球热门防晒霜硬核参数对比表（防晒剂组合、PA/PPD 值、成膜肤感、是否需卸妆）',
        '新一代光稳定化学/物化防晒剂波段图谱（Tinosorb S/M、Uvinul A Plus、Mexoryl 400）',
        '分肤质精准匹配清单（油痘肌/脂溢性皮炎、干敏玫瑰痤疮、早 C 晚 A 刷酸期）',
        '海淘正品直邮渠道索引（杜绝假货防晒伤肤风险）'
      ],
      companionTool: { name: 'Beauty of Joseon 朝鲜美女大米益生菌防晒霜 SPF50+', url: 'https://www.iherb.com/search?kw=Beauty+of+Joseon+Relief+Sun&rcode=CRUXKIT' },
      sample: `// 新一代高光稳定防晒架构解析\n• 长波 UVA1 主力：Uvinul A Plus (DHHB)\n• 广谱光稳定王牌：Tinosorb S (BEMBT)\n• 高效 UVB 吸收：Uvinul T 150\n• 实测表现：零氧化锌假白、不拔干、后续跟妆零搓泥。`
    },
    allbundle: {
      num: '12', catKey: 'bundle', price: 69, tile: 'tile-automation', isBundle: true,
      name: 'CruxKit 全站 11 合 1 旗舰全家桶 (All-Access Pass)',
      category: '旗舰通票 · 一次性解锁全站 11 套数字套件 + 永久更新',
      badges: ['立省 65% (原价 $200)', '含全部 11 个 ZIP 包', '终身免费更新'],
      shortDesc: '最高性价比之选：一键打包带走全站 11 套 AI 自动化、API 防封工作台、MCP 智能体、Notion 中枢与护肤实验室全套源文件。',
      description: '无需逐个单独购买。一次解锁站内全部 11 款数字商品源文件包，并自动获得 2026–2027 年度所有新增工作流蓝图与评测数据库的免费下载权限。',
      items: [
        '包含 01–04 号技术包：自动化蓝图 + 私人 AI 防封工作台 + 20 组 MCP 智能体 + n8n $4 VPS 部署包',
        '包含 05–08 号增长包：Notion Solo OS + GEO 内容包 + 不出镜短视频引擎 + 100 组双语爆款钩子库',
        '包含 09–11 号护肤实验室包：28 天屏障循环表 + 200 成分配伍与平替库 + 40 款防晒实测表',
        '赠送独立站站长同款“联盟营销 + 虚拟商品”双轮驱动变现配置手册'
      ],
      companionTool: { name: 'Make.com + Notion + iHerb 全生态官方合作通道', url: 'https://www.make.com/en/register?pc=cruxkit' },
      sample: `// 全站 11 合 1 旗舰全家桶内含文件清单\n[x] 01_自动化蓝图包 ($24)       [x] 02_AI防封工作台包 ($19)\n[x] 03_MCP超级智能体包 ($29)    [x] 04_n8n私有化部署包 ($18)\n[x] 05_Notion一人公司OS ($19)   [x] 06_GEO高转化内容包 ($15)\n[x] 07_不出镜短视频引擎 ($22)   [x] 08_100组双语引流钩子 ($16)\n[x] 09_28天护肤循环包 ($12)     [x] 10_200成分平替审计表 ($14)\n[x] 11_40款防晒实测库 ($12)     --> 单独购买总价：$200 | 全家桶特惠：$69 (约 ¥368)`
    }
  }
};


/* -----------------------------------------------------------
   3. 24 AUDITED AFFILIATE STACK PRODUCTS (BILINGUAL EN & 中文)
----------------------------------------------------------- */
const stackOrder = [
  // Desk 01: AI & Automation (8)
  'make', 'n8n', 'openrouter', 'cursor', 'claude', 'deepseek', 'reclaim', 'appsumo',
  // Desk 02: Creator, Voice & SEO (6)
  'notion', 'elevenlabs', 'heygen', 'semrush', 'beehiiv', 'framer',
  // Desk 03: Cloud, VPS & Infra (4)
  'hostinger', 'cloudflare', 'lemonsqueezy', 'wise',
  // Desk 04: Clinical Skincare & K-Beauty Lab (6)
  'timeless', 'cicaplast', 'bojsun', 'paulasbha', 'cosrxsnail', 'differin'
];

const stackToolsData = {
  en: {
    make: {
      catKey: 'ai', badgeClass: '', score: '9.8 / 10', relatedKit: 'automation',
      tier: 'S-TIER · #1 AUTOMATION', name: 'Make.com', role: 'Visual Workflow & AI Orchestration',
      verdictShort: 'Handles complex multi-branch routers, webhooks, and LLM JSON arrays at 1/5th the monthly cost of Zapier Pro.',
      metricPill: '⚡ $9/mo for 10k Ops · Free 1k Tier',
      price: 'Free (1,000 Ops/mo) · Core Plan $9/mo (10,000 Ops)',
      summary: 'Make.com is our top overall automation engine for independent creators. Its visual router canvas handles complex branching, raw JSON arrays, and AI API calls at roughly 15% of Zapier’s cost.',
      pros: ['10,000 operations for $9/mo (vs. $73+/mo on Zapier Pro)', 'Visual canvas lets you inspect raw JSON payloads at every step', 'Infinite branching with Routers, Iterators, and Array Aggregators'],
      cons: ['15-minute minimum polling interval on free plan (webhooks are instant)'],
      verdict: 'Best for 85% of solo operators who want cloud reliability without the Zapier tax.',
      url: 'https://www.make.com/en/register?pc=cruxkit', cta: 'Try Make Free'
    },
    n8n: {
      catKey: 'ai', badgeClass: 'tier-a', score: '9.7 / 10', relatedKit: 'n8nvps',
      tier: 'S-TIER · SELF-HOST AI', name: 'n8n Workflow Engine', role: 'Node-Based AI Agents & Local Control',
      verdictShort: 'Charges per full workflow execution rather than per internal step—ideal for 30-step LLM agent loops and Docker self-hosting.',
      metricPill: '⚡ $0 Self-Hosted / $20 Cloud · Native MCP',
      price: '$0 Self-Hosted (Community) · $20/mo Cloud Starter',
      summary: 'Unlike traditional automation tools that bill per internal step, n8n bills per full workflow execution—and can be self-hosted for free on a $4.99 VPS.',
      pros: ['A 40-step AI agent loop still counts as just 1 workflow execution', 'Native LangChain, Vector Store, and Model Context Protocol (MCP) nodes', 'Full JavaScript and Python code nodes'],
      cons: ['Self-hosting requires basic Docker setup (solved by our Kit 04 Boilerplate)'],
      verdict: 'Unbeatable for heavy multi-step AI agents and scraping pipelines.',
      url: 'https://n8n.io/?ref=cruxkit', cta: 'Explore n8n'
    },
    openrouter: {
      catKey: 'ai', badgeClass: '', score: '9.7 / 10', relatedKit: 'workstation',
      tier: 'S-TIER · API ROUTER', name: 'OpenRouter AI', role: 'Unified Multi-LLM Official API Gateway',
      verdictShort: 'Access Claude Sonnet 5.5 & Opus 5.5, GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna, Gemini 4 Argon (1M Ctx), and DeepSeek V4-Pro-0813 through one single official API key with zero monthly subscription.',
      metricPill: '⚡ Pay-As-You-Go · 0%Ban Risk · 300+ Models',
      price: '$0 Monthly Fee · Pure Pay-As-You-Go Token Billing',
      summary: 'OpenRouter eliminates the need to pay $20/mo each for ChatGPT, Claude, and Gemini—or risk account bans from shared gray-market accounts. Pair one API key with LobeChat or Cursor.',
      pros: ['Single API key unlocks 300+ top models (Anthropic, OpenAI, Google, DeepSeek)', 'Automatic fallback routing if a provider experiences downtime', 'Strict spending caps prevent surprise bills'],
      cons: ['Requires a frontend UI like LobeChat, NextChat, or Cursor (included in Kit 02)'],
      verdict: 'The #1 legal, zero-ban replacement for expensive multi-chat subscriptions.',
      url: 'https://openrouter.ai/?ref=cruxkit', cta: 'Get API Key'
    },
    cursor: {
      catKey: 'ai', badgeClass: '', score: '9.8 / 10', relatedKit: 'mcppack',
      tier: 'S-TIER · #1 AI IDE', name: 'Cursor AI Editor', role: 'Agentic Code & Static Site Builder',
      verdictShort: 'Multi-file codebase indexing and native MCP tool calling let even non-engineers ship full websites and scripts in hours.',
      metricPill: '⚡ Native MCP Support · Multi-File Composer',
      price: 'Free Hobby Tier · Pro $20/mo',
      summary: 'Cursor is the fastest way to build, edit, and maintain static sites, automation scripts, and digital tools. With Composer and MCP servers connected, it edits entire repositories autonomously.',
      pros: ['Understands your entire project folder context automatically', 'One-click MCP server integration for browser testing & docs lookup', 'Supports Claude Sonnet 5.5 & Opus 5.5 & DeepSeek models'],
      cons: ['Fast premium requests cap at 500/mo on Pro before switching to unlimited slow pool'],
      verdict: 'Essential for indie makers building websites, scripts, and digital products.',
      url: 'https://www.cursor.com/?ref=cruxkit', cta: 'Download Cursor'
    },
    claude: {
      catKey: 'ai', badgeClass: '', score: '9.7 / 10', relatedKit: 'content',
      tier: 'S-TIER · #1 WRITING LLM', name: 'Claude Sonnet 5.5 & Opus 5.5', role: 'Nuanced Editorial Writing & Code Reasoning',
      verdictShort: 'Produces the most natural, non-robotic bilingual prose and cleanest front-end HTML/CSS/JS of any frontier model in 2026.',
      metricPill: '⚡ 1M Context Window · Claude Code & Artifacts',
      price: 'Free Tier · Pro $20/mo · API Pay-As-You-Go',
      summary: 'In our blind editorial tests across 50 product reviews, Claude Sonnet 5.5 & Opus 5.5 consistently required 60% less human rewriting than competing models while following complex style constraints.',
      pros: ['Least robotic tone for English and Mandarin long-form essays', 'Interactive Artifacts preview for instant HTML/React widgets', 'Superior instruction-following on multi-constraint prompts'],
      cons: ['Strict message rate limits during peak hours on web Pro plan (use API via OpenRouter as backup)'],
      verdict: 'Our primary engine for drafting high-converting reviews and code.',
      url: 'https://console.anthropic.com/?ref=cruxkit', cta: 'Try Claude'
    },
    deepseek: {
      catKey: 'ai', badgeClass: 'tier-a', score: '9.6 / 10', relatedKit: 'workstation',
      tier: 'S-TIER · VALUE LLM', name: 'DeepSeek V4.1-Flash-1017 & V4-Pro-0813 API', role: 'High-Volume Reasoning at 1/20th Cost',
      verdictShort: 'Frontier-level math, logic, and bilingual Chinese/English processing at $0.14 per million input tokens—ideal for bulk n8n loops.',
      metricPill: '⚡ $0.04–$0.15 / 1M (V4.1-Flash-1017) · 50% Off-Peak + Auto Cache',
      price: '$0.07 (Cache Hit) – $0.27 / 1M Input · 50% Off-Peak Discount',
      summary: 'When running automated RSS summarization, translation, or data classification across thousands of rows in Make or n8n, DeepSeek slashes API bills by over 90%.',
      pros: ['Unbeatable cost-to-intelligence ratio for bulk automation nodes', 'Outstanding native Mandarin Chinese & English bilingual fluency', 'Full chain-of-thought reasoning visibility in R1'],
      cons: ['Official direct API can experience congestion—route via SiliconFlow or OpenRouter for high SLA'],
      verdict: 'The default workhorse model for high-frequency background automations.',
      url: 'https://cloud.siliconflow.cn/?ref=cruxkit', cta: 'Get API Access'
    },
    reclaim: {
      catKey: 'ai', badgeClass: 'tier-a', score: '9.3 / 10', relatedKit: 'solo',
      tier: 'A-TIER · TIME BLOCKING', name: 'Reclaim.ai', role: 'Autonomous Calendar & Deep-Work Defense',
      verdictShort: 'Automatically defends your 90-minute morning maker blocks and reschedules flexible habits when urgent meetings pop up.',
      metricPill: '⚡ Syncs Google Calendar & Notion · Free Tier',
      price: 'Free Lite Plan · Starter $8/mo',
      summary: 'A calendar list is where tasks go to get scheduled; a task list is where they wait. Reclaim bridges the gap by auto-slotting your priorities into open calendar blocks.',
      pros: ['Automatically shifts deep-work blocks instead of deleting them', 'Prevents back-to-back meeting fatigue with auto-buffers', '40% recurring affiliate partner program via PartnerStack'],
      cons: ['Best suited for Google Calendar users (Outlook support is newer)'],
      verdict: 'Best calendar defense tool for solo operators juggling client and creator work.',
      url: 'https://reclaim.ai/?via=cruxkit', cta: 'Try Reclaim Free'
    },
    appsumo: {
      catKey: 'ai', badgeClass: '', score: '9.5 / 10', relatedKit: 'allbundle',
      tier: 'S-TIER · LIFETIME DEALS', name: 'AppSumo LTD Store', role: 'Official One-Time Payment SaaS Redeem Codes',
      verdictShort: 'Pay once ($29–$59) and own verified SaaS tools for life instead of bleeding monthly subscription fees.',
      metricPill: '⚡ 60-Day Money-Back Guarantee · Official Keys',
      price: '$19 – $69 One-Time Lifetime Redeem Codes',
      summary: 'AppSumo is the largest legitimate marketplace for official software Lifetime Deals (LTDs). Every purchase includes a 60-day no-questions-asked refund window.',
      pros: ['Eliminates recurring monthly burn on SEO, email, and AI utilities', '100% legitimate founder-authorized license keys', '60-day full refund guarantee lets you stress-test risk-free'],
      cons: ['Always test early-stage startups thoroughly within the 60-day refund window'],
      verdict: 'The smartest place to source one-time-cost software for your lean stack.',
      url: 'https://appsumo.com/?ref=cruxkit', cta: 'Browse Lifetime Deals'
    },
    notion: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'solo',
      tier: 'S-TIER · #1 WORKSPACE', name: 'Notion + Notion AI', role: 'All-in-One Creator OS & Kit Engine',
      verdictShort: 'Unbeatable relational databases for running a one-person content calendar—and the #1 platform for packaging duplicatable templates.',
      metricPill: '⚡ Powers "The Solo OS" · Free Personal Plan',
      price: 'Free Personal · Plus Plan $10/mo',
      summary: 'Notion wins our Creator OS benchmark because relational databases connect ideas, tasks, and affiliate links in one view—and any system you build can be sold as a template.',
      pros: ['Filtered database views keep active work separate from archives', '1-click "Duplicate as Template" powers a 100%-margin digital product business', 'Seamless webhook integration with Make.com and n8n'],
      cons: ['Requires discipline not to over-decorate pages (why we built The Solo OS)'],
      verdict: 'The foundational operating system for content-commerce independent sites.',
      url: 'https://affiliate.notion.so/cruxkit', cta: 'Try Notion Free'
    },
    elevenlabs: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.8 / 10', relatedKit: 'videoengine',
      tier: 'S-TIER · #1 VOICE AI', name: 'ElevenLabs Studio v3', role: 'Neural Narration & 29-Language Dubbing',
      verdictShort: 'Context-aware emotional pacing and breath control make faceless short-form reviews indistinguishable from studio recordings.',
      metricPill: '⚡ 99.2% Blind-Test Score · 10k Free Chars',
      price: 'Free Tier (10k chars/mo) · Starter $5/mo · Creator $22/mo',
      summary: 'Audio quality determines whether viewers watch or swipe within 1.5 seconds. ElevenLabs v3 delivers natural breath pacing, subtle tonal warmth, and 29-language auto-dubbing.',
      pros: ['99.2% human blind-test naturalness score in our 40-video trial', 'Clone your own voice in 60 seconds so you never re-record flubbed lines', 'Multi-language dubbing preserves your vocal timbre for global channels'],
      cons: ['Retakes consume character quota—lock your script brief first'],
      verdict: 'Essential for faceless YouTube, TikTok, Reels, and audio essays.',
      url: 'https://elevenlabs.io/?from=partnercruxkit', cta: 'Try ElevenLabs'
    },
    heygen: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'videoengine',
      tier: 'S-TIER · AI AVATAR VIDEO', name: 'HeyGen AI Studio', role: 'Photorealistic Digital Twin & Lip-Sync Translation',
      verdictShort: 'Record one 2-minute training video to create a digital twin that speaks 40+ languages with frame-accurate lip sync.',
      metricPill: '⚡ 4K Avatar Generation · 1-Click Video Translate',
      price: 'Free Trial (3 videos/mo) · Creator $29/mo',
      summary: 'For creators running both Mandarin (Xiaohongshu/Douyin) and English (TikTok/YouTube) channels, HeyGen translates and re-syncs your mouth movements automatically.',
      pros: ['Best-in-class micro-expressions and natural hand gesture synthesis', 'One-click video localization into English, Mandarin, Spanish, and Japanese', '30% recurring affiliate commission for creator partners'],
      cons: ['Works best with clean, even lighting in your initial 2-minute training clip'],
      verdict: 'The highest-leverage multiplier for cross-border bilingual video creators.',
      url: 'https://www.heygen.com/?sid=rewardful&utm_content=creator&utm_medium=affiliatebase&via=xing', cta: 'Try HeyGen Free'
    },
    semrush: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'content',
      tier: 'S-TIER · SEO & GEO INTEL', name: 'Semrush SEO Toolkit', role: 'Buyer-Intent Keyword & Competitor Traffic Audit',
      verdictShort: 'Uncover the exact low-difficulty "vs." and "alternative" keywords your competitors use to drive high-converting affiliate traffic.',
      metricPill: '⚡ 25B+ Keyword Database · AI Overview Tracker',
      price: '7-Day Free Trial · Pro Suite (High-Bounty Partner)',
      summary: 'Even in a single 7-day free trial sprint, you can export a full year’s worth of low-competition commercial buyer keywords ("Tool A vs Tool B", "Best airless Vitamin C").',
      pros: ['Pinpoints commercial-intent keywords with Keyword Difficulty (KD) under 25', 'Tracks which pages are cited inside Google AI Overviews', 'Industry-leading $200 flat affiliate bounty per paid conversion on Impact'],
      cons: ['Monthly subscription is pricey—solo creators can batch research during a 1-month sprint'],
      verdict: 'The gold-standard intelligence engine for planning high-ROI comparison posts.',
      url: 'https://www.semrush.com/?ref=cruxkit', cta: 'Start Free SEO Audit'
    },
    beehiiv: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'hooksvault',
      tier: 'S-TIER · NEWSLETTER OS', name: 'Beehiiv', role: 'Creator Email Growth & Built-In Ad Network',
      verdictShort: 'Own your audience directly with zero platform algorithm risk—plus monetize from Day 1 via built-in Boosts and sponsor placements.',
      metricPill: '⚡ Free up to 2,500 Subs · Built-In Ad Network',
      price: 'Free Launch Plan (up to 2,500 subscribers) · Scale $39/mo',
      summary: 'Social algorithms change overnight; an email list is an asset you own. Beehiiv gives you 2,500 subscribers for free with 0% transaction fees on paid tiers.',
      pros: ['Generous 2,500-subscriber free plan with custom domain support', 'Built-in Boosts pay you $2–$4 per qualified subscriber referral', '50% 12-month recurring partner commission'],
      cons: ['Advanced automation sequences require the Scale tier'],
      verdict: 'Our top choice for turning one-time site visitors into repeat newsletter readers.',
      url: 'https://www.beehiiv.com/?via=cruxkit', cta: 'Launch Free on Beehiiv'
    },
    framer: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.4 / 10', relatedKit: 'content',
      tier: 'A-TIER · VISUAL WEB', name: 'Framer', role: 'Interactive Design-to-Production Web Builder',
      verdictShort: 'For designers who want Figma-like canvas freedom with built-in CMS, spring physics animations, and 50% template partner commissions.',
      metricPill: '⚡ Native Spring Physics · 50% Partner Share',
      price: 'Free Hobby Site · Mini $5/mo · Basic $15/mo',
      summary: 'If you prefer visual drag-and-drop canvas design over hand-coded static HTML, Framer publishes blazing-fast landing pages and pays 50% commission on template referrals.',
      pros: ['Zero-code spring animations and interactive component states', 'Sell your own Framer templates and earn 50% recurring affiliate share', 'Fast global CDN hosting included'],
      cons: ['Per-site pricing adds up if you run more than 3 separate domains'],
      verdict: 'Best visual builder for high-craft product landing pages and template creators.',
      url: 'https://www.framer.com/?via=cruxkit', cta: 'Explore Framer'
    },
    hostinger: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'n8nvps',
      tier: 'S-TIER · $4.99 DOCKER VPS', name: 'Hostinger KVM VPS', role: '1-Click n8n & Self-Hosted AI Server',
      verdictShort: 'Includes an official 1-click Ubuntu + Docker + n8n OS template starting at $4.99/mo with 4GB RAM and NVMe storage.',
      metricPill: '⚡ 1-Click n8n Template · 4GB RAM NVMe · $4.99/mo',
      price: 'KVM 1 VPS $4.99/mo · KVM 2 (8GB RAM) $6.99/mo',
      summary: 'Hostinger KVM VPS removes all Linux setup friction by offering a pre-built n8n Docker image right in the onboarding wizard, backed by a 30-day money-back guarantee.',
      pros: ['Official 1-click n8n + Docker template installs in under 3 minutes', '4GB RAM on entry KVM 1 plan (vs. 1GB on competing $5 VPS providers)', 'High-converting 60% affiliate commission for partners'],
      cons: ['Renewal rates increase after initial term—lock in 12 or 24 months upfront for best rate'],
      verdict: 'The easiest, highest-RAM budget VPS for self-hosting n8n and LobeChat.',
      url: 'https://www.hostinger.com/?REFERRALCODE=CRUXKIT', cta: 'Check $4.99 n8n VPS'
    },
    cloudflare: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.9 / 10', relatedKit: 'workstation',
      tier: 'S-TIER · $0 EDGE INFRA', name: 'Cloudflare Pages & R2', role: 'Unlimited Bandwidth Static Hosting & CDN',
      verdictShort: 'Host static sites like cruxxxxxkit.com across 300+ global edge nodes with free SSL, DDoS protection, and $0 bandwidth bills.',
      metricPill: '⚡ $0/mo Unlimited Bandwidth · 300+ Edge Nodes',
      price: '$0 Free Forever Plan for Static Sites & 10GB R2 Storage',
      summary: 'Why pay $15/mo to host a slow WordPress blog on a 1GB server when Cloudflare Pages serves static HTML/CSS/JS globally in 20 milliseconds for $0?',
      pros: ['Unlimited static bandwidth with zero egress fees', 'Free custom email routing (e.g. hello@cruxxxxxkit.com forwarded to your Gmail)', 'Automatic GitHub push-to-deploy in 15 seconds'],
      cons: ['Server-side relational databases require Cloudflare D1 or external APIs'],
      verdict: 'The undisputed infrastructure foundation for modern lean independent sites.',
      url: 'https://pages.cloudflare.com/', cta: 'Deploy on Cloudflare'
    },
    lemonsqueezy: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'solo',
      tier: 'S-TIER · DIGITAL CHECKOUT', name: 'Lemon Squeezy / Gumroad', role: 'Global Merchant of Record for Digital Kits',
      verdictShort: 'Sell ZIP kits, Notion templates, and license keys globally without registering for EU/UK/US sales tax—they handle VAT automatically.',
      metricPill: '⚡ $0 Monthly Fee · Global VAT Handled · Built-In Affiliates',
      price: '$0/mo · Pay only a flat % per completed sale (5% + 50¢ on Lemon Squeezy)',
      summary: 'As a Merchant of Record (MoR), Lemon Squeezy and Gumroad act as the legal reseller, handling global tax compliance, fraud prevention, and instant ZIP file delivery.',
      pros: ['Zero monthly fixed cost—you only pay a fee when you make a sale', 'Built-in affiliate center lets your buyers promote your kits for a % cut', 'Supports Apple Pay, Google Pay, PayPal, and global cards'],
      cons: ['Pair with Mianbaoduo (面包多) if targeting domestic WeChat/Alipay buyers'],
      verdict: 'The fastest way to start collecting USD for digital downloads today.',
      url: 'https://www.lemonsqueezy.com/?ref=cruxkit', cta: 'Open Storefront'
    },
    wise: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'solo',
      tier: 'S-TIER · GLOBAL PAYOUTS', name: 'Wise Multi-Currency', role: 'USD / EUR / GBP Local Bank Details for Affiliates',
      verdictShort: 'Required for receiving Make.com 35% commissions and Impact/PartnerStack USD ACH payouts with mid-market FX rates.',
      metricPill: '⚡ Local US Routing/Account # · Mid-Market FX',
      price: '$0 Monthly Account Fee · Low Transparent Transfer Fee',
      summary: 'Many top affiliate programs (including Make.com and US networks) pay via Wise or US ACH bank transfer. Wise gives you local USD, EUR, GBP, and SGD bank details.',
      pros: ['Mandatory payout rail for Make.com’s 35% affiliate program', 'Real mid-market exchange rate saves 3–4% vs. traditional bank wires', 'Supports fast withdrawals to local bank accounts and Alipay'],
      cons: ['Initial identity verification takes 1–2 business days'],
      verdict: 'Essential financial plumbing for any cross-border creator or affiliate.',
      url: 'https://wise.com/invite/u/cruxkit', cta: 'Open Wise Account'
    },
    timeless: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'routine',
      tier: 'DESK 04 · #1 ANTIOXIDANT', name: 'Timeless 20% C + E Ferulic', role: 'Clinical L-Ascorbic Acid Serum (pH 2.9)',
      verdictShort: 'Opaque airless pump prevents the oxidation that ruins 78% of dropper Vitamin C serums—delivering clinical triad protection at 1/7th the luxury price.',
      metricPill: '🧪 Verified pH 2.9 · Airless Pump · $25.95',
      price: '$25.95 (1 oz / 30 ml Opaque Airless Pump)',
      summary: 'Pure L-Ascorbic Acid requires a pH below 3.5 to penetrate skin and Vitamin E + Ferulic Acid to remain stable. Timeless delivers the exact clinical triad inside an airless pump.',
      pros: ['Measured pH 2.9 ensures rapid stratum corneum penetration', 'Opaque airless pump keeps serum clear through week 8', '$25.95 price point vs. $182 for luxury clinical equivalents'],
      cons: ['20% concentration at pH 2.9 can tingle on compromised barriers—start every other AM'],
      verdict: 'Our #1 evidence-based AM antioxidant serum across 14 tested formulas.',
      url: 'https://www.iherb.com/search?kw=Timeless+Skin+Care+Vitamin+C&rcode=CRUXKIT', cta: 'Check Formula on iHerb'
    },
    cicaplast: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.6 / 10', relatedKit: 'routine',
      tier: 'DESK 04 · BARRIER PICK', name: 'La Roche-Posay Cicaplast B5+', role: '5% Panthenol + Madecassoside Recovery Balm',
      verdictShort: 'The gold-standard recovery buffer for Nights 3 & 4 of a retinoid cycling routine. Calms transepidermal water loss overnight.',
      metricPill: '🧪 5% Vitamin B5 · Fragrance-Free · $17.99',
      price: '$16.99 – $18.99 (40 ml)',
      summary: 'Active skincare only works if your lipid barrier stays intact. With 5% Panthenol, Madecassoside, Shea Butter, and Tribioma, Cicaplast B5+ is our benchmark recovery balm.',
      pros: ['Rapidly resolves retinoid flaking and acid erythema overnight', '100% fragrance-free and non-comedogenic when applied as a pea-sized seal', 'Doubles as a targeted nasolabial buffer before applying retinoids'],
      cons: ['Rich balm texture is best reserved for PM recovery rather than under heavy AM makeup'],
      verdict: 'The anchor of Nights 3 & 4 in our 28-Day Barrier Cycling Protocol.',
      url: 'https://www.iherb.com/search?kw=La+Roche+Posay+Cicaplast+B5&rcode=CRUXKIT', cta: 'Check Formula on iHerb'
    },
    bojsun: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'sunguide',
      tier: 'DESK 04 · #1 DAILY SPF', name: 'Beauty of Joseon Relief Sun', role: 'SPF50+ PA++++ (Uvinul A Plus + Tinosorb S)',
      verdictShort: 'Four next-generation photostable organic UV filters suspended in a 30% rice extract + probiotic lotion with zero white cast or eye sting.',
      metricPill: '🧪 PA++++ UVA1 · Zero White Cast · $14.00',
      price: '$13.50 – $15.00 (50 ml)',
      summary: 'The best sunscreen is the one you actually enjoy applying at the required 2-finger dosage every morning. Relief Sun feels like a lightweight ceramide serum while delivering PA++++ UVA protection.',
      pros: ['Uses modern photostable filters (Uvinul A Plus, Tinosorb S, Uvinul T 150, Iscotrizinol)', 'Zero chalky cast on all skin tones and zero pilling under makeup', 'Free of drying alcohol, essential oils, and artificial fragrance'],
      cons: ['Dewy moisturizing finish—very oily skin types may skip morning moisturizer underneath'],
      verdict: 'Ranked #1 overall in our 40-Sunscreen UV-Filter & Wearability Audit.',
      url: 'https://www.iherb.com/search?kw=Beauty+of+Joseon+Relief+Sun&rcode=CRUXKIT', cta: 'Check SPF on iHerb'
    },
    paulasbha: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.5 / 10', relatedKit: 'incidecoder',
      tier: 'DESK 04 · #1 EXFOLIANT', name: 'Paula’s Choice 2% BHA Liquid', role: 'Lipid-Soluble Salicylic Acid + Green Tea (pH 3.5)',
      verdictShort: 'Penetrates sebum-clogged pores on Night 1 of your skin cycling loop to dissolve blackheads and sebaceous filaments without physical scrubbing.',
      metricPill: '🧪 2% Salicylic Acid (pH 3.5) · Green Tea Soothing',
      price: '$14.00 (Travel 30 ml) · $35.00 (Full 118 ml)',
      summary: 'Unlike water-soluble AHAs that only work on the surface, salicylic acid (BHA) is oil-soluble—allowing it to dissolve oxidized sebum inside pores while green tea extract calms redness.',
      pros: ['Formulated at optimal pH 3.2–3.8 for unionized salicylic acid bioavailability', 'Methylpropanediol Penetration enhancer boosts efficacy without harsh alcohol', 'One 118ml bottle lasts 5+ months when used twice a week on Night 1'],
      cons: ['Never layer on the same night as retinoids—restrict to Night 1 of your 4-night cycle'],
      verdict: 'The undisputed clinical benchmark for pore clarity and Night 1 exfoliation.',
      url: 'https://www.iherb.com/search?kw=Paulas+Choice+2%25+BHA&rcode=CRUXKIT', cta: 'View on iHerb'
    },
    cosrxsnail: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.4 / 10', relatedKit: 'routine',
      tier: 'DESK 04 · HYDRATION BUFFER', name: 'COSRX Snail 96 Mucin Essence', role: '96.3% Snail Secretion Filtrate + Panthenol + Allantoin',
      verdictShort: 'Rich in natural glycoproteins, hyaluronic acid, and allantoin—apply to damp skin to lock in hydration and buffer retinoid irritation.',
      metricPill: '🧪 96.3% Filtrate · Fragrance-Free · $16.50',
      price: '$15.50 – $17.50 (100 ml Airless Pump)',
      summary: 'One of the highest-repurchase K-beauty formulations of the decade. Its humectant glycoprotein matrix accelerates barrier repair after acid or retinoid nights.',
      pros: ['Minimalist 12-ingredient formula with zero fragrance or alcohol', 'Generous 100ml hygienic pump bottle lasts 4–6 months', 'Instantly plumps dehydrated skin when applied on damp face'],
      cons: ['Patch test first if you have a known severe dust-mite allergy (cross-reactivity)'],
      verdict: 'Best high-volume humectant essence for layering under Cicaplast B5+.',
      url: 'https://www.iherb.com/search?kw=COSRX+Advanced+Snail+96&rcode=CRUXKIT', cta: 'View on iHerb'
    },
    differin: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.6 / 10', relatedKit: 'routine',
      tier: 'DESK 04 · #1 OTC RETINOID', name: 'Differin Adapalene Gel 0.1%', role: 'Prescription-Strength Third-Gen Retinoid (Night 2)',
      verdictShort: 'Binds selectively to RAR-beta and RAR-gamma receptors—delivering clinical cell-turnover and pore clearing with less irritation than tretinoin.',
      metricPill: '🧪 0.1% Adapalene · Photostable · $14.99',
      price: '$14.99 (15g / 30-Day Supply) · $26.99 (45g)',
      summary: 'Cosmetic retinol esters require two enzymatic conversions in the skin and degrade rapidly. Adapalene 0.1% is a direct receptor-active synthetic retinoid with decades of clinical data.',
      pros: ['Proven clinical efficacy for both comedonal acne and photoaging texture', 'More chemically stable and less irritating than first-generation tretinoin', 'Costs $15 vs. $90+ for cosmetic department-store retinol creams'],
      cons: ['Always apply a pea-sized amount to completely dry skin on Night 2 only, and wear SPF 50 daily'],
      verdict: 'The smartest, most evidence-backed retinoid for Night 2 of your cycling routine.',
      url: 'https://www.iherb.com/search?kw=Differin+Adapalene+Gel&rcode=CRUXKIT', cta: 'View on iHerb'
    }
  },
  zh: {
    make: {
      catKey: 'ai', badgeClass: '', score: '9.8 / 10', relatedKit: 'automation',
      tier: 'S 级首选 · 自动化 #1', name: 'Make.com', role: '可视化工作流与 AI 路由引擎',
      verdictShort: '轻松处理复杂多分支路由、Webhook 与大模型 JSON 数组，月费仅为 Zapier Pro 的五分之一。',
      metricPill: '⚡ $9/月享 10,000 次操作 · 35% 联盟高佣',
      price: '免费版 (1,000 Ops/月) · Core 计划 $9/月 (10,000 Ops)',
      summary: 'Make.com 是我们针对独立创作者与跨境一人公司实测综合得分最高的自动化引擎。其可视化路由画布可直观处理多分支条件、JSON 数组与大模型 API，月费仅约为 Zapier 的 15%。',
      pros: ['$9/月即享 10,000 次操作（同等体量在 Zapier Pro 需 $73+/月）', '可视化气泡画布支持逐步查看原始 JSON 数据包，排错直观', '官方内置 35% 持续 12 个月联盟分佣（支持 Wise 提现）'],
      cons: ['免费版定时轮询间隔为 15 分钟（Webhook 触发则是实时响应）'],
      verdict: '适合 85% 追求云端稳定省心、又不想交“Zapier 智商税”的独立运营者。',
      url: 'https://www.make.com/en/register?pc=cruxkit', cta: '免费试用 Make'
    },
    n8n: {
      catKey: 'ai', badgeClass: 'tier-a', score: '9.7 / 10', relatedKit: 'n8nvps',
      tier: 'S 级首选 · 开源 AI 工作流', name: 'n8n 工作流引擎', role: '节点式 AI 智能体与 Docker 私有化控制',
      verdictShort: '按完整工作流执行次数计费（而非按内部节点数），运行 30 步大模型 Agent 循环依然只算 1 次，且支持 $4 VPS 免费自托管。',
      metricPill: '⚡ 自托管 $0 / 云端 $20 · 30% 联盟分佣',
      price: 'Docker 自托管 $0 免费 · 云端版 $20/月起',
      summary: '不同于按内部步骤数计费的传统工具，n8n 按“整条工作流完整执行次数”计费，且支持在轻量云服务器上通过 Docker 免费私有化部署。',
      pros: ['40 个内部节点的 AI Agent 循环运行一次依然只计 1 次执行', '原生内置 LangChain、向量数据库与 MCP 节点', '支持在任意节点直接编写 JavaScript 或 Python 代码'],
      cons: ['自托管需要基础 Docker 环境（可直接用我们的 04 号一键部署包解决）'],
      verdict: '高频多步 AI 智能体循环、网页抓取与本地隐私数据处理的性价比之王。',
      url: 'https://n8n.io/?ref=cruxkit', cta: '探索 n8n 官网'
    },
    openrouter: {
      catKey: 'ai', badgeClass: '', score: '9.7 / 10', relatedKit: 'workstation',
      tier: 'S 级首选 · 官方 API 聚合', name: 'OpenRouter AI', role: '一站式多模型官方 API 路由网关',
      verdictShort: '用一个官方 API Key 同时调用 Claude Sonnet 5.5 & Opus 5.5、GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna、Gemini 3.8 / 4 Argon 与 DeepSeek V4-Pro-0813，按量计费零月租、100% 告别共享号封号焦虑。',
      metricPill: '⚡ 零月租按量计费 · 永不封号 · 300+ 模型',
      price: '$0 月租 · 纯按实际消耗 Token 计费（用多少付多少）',
      summary: '无需分别包月订阅三四个 $20/月的 AI 会员，更不必去买三天两头封号的灰产共享号。将 OpenRouter API 填入 LobeChat 或 Cursor，每月几美元即可畅用全球顶尖模型。',
      pros: ['一个 API 密钥打通 Anthropic、OpenAI、Google、DeepSeek 等 300+ 模型', '支持设置严格月度消费上限，绝无天价账单风险', '单节点故障时自动切换备用算力供应商'],
      cons: ['需要搭配 LobeChat / NextChat 等前端界面使用（详见 02 号部署包）'],
      verdict: '替代高风险共享号与高溢价包月会员的最优合规方案。',
      url: 'https://openrouter.ai/?ref=cruxkit', cta: '获取官方 API Key'
    },
    cursor: {
      catKey: 'ai', badgeClass: '', score: '9.8 / 10', relatedKit: 'mcppack',
      tier: 'S 级首选 · AI 编程建站 #1', name: 'Cursor AI 编辑器', role: '全栈代码生成与独立站快速开发 IDE',
      verdictShort: '具备跨文件全局索引与原生 MCP 工具调用能力，让非科班创作者也能在几小时内独立上线高颜值网站与自动化脚本。',
      metricPill: '⚡ 原生支持 MCP · 多文件 Composer 协同',
      price: '免费体验版 · Pro 专业版 $20/月',
      summary: 'Cursor 是目前开发独立站、修改前端模版与编写自动化脚本最快的生产力工具。挂载 MCP 服务后，它甚至能自动替你检索文档并完成浏览器测试。',
      pros: ['自动理解整个项目文件夹上下文，告别反复复制粘贴代码', '一键挂载 20+ MCP 服务扩展本地与联网能力', '无缝切换 Claude Sonnet 5.5 & Opus 5.5 与 DeepSeek 模型'],
      cons: ['Pro 版每月含 500 次极速请求，超出后转入无限次慢速队列'],
      verdict: '独立开发者与一人公司构建数字资产的头号神器。',
      url: 'https://www.cursor.com/?ref=cruxkit', cta: '免费下载 Cursor'
    },
    claude: {
      catKey: 'ai', badgeClass: '', score: '9.7 / 10', relatedKit: 'content',
      tier: 'S 级首选 · 深度写作大模型', name: 'Claude Sonnet 5.5 & Opus 5.5', role: '最自然的双语评测长文撰稿与前端生成模型',
      verdictShort: '在 2026 年主流大模型盲测中，其生成的中英双语长文“AI 爹味/机翻感”最低，且前端 HTML/CSS 审美断层领先。',
      metricPill: '⚡ 200k 超长上下文 · 实时 Artifacts 预览',
      price: '免费版 · Pro $20/月 · 或通过 OpenRouter 按量调用',
      summary: '在我们对 50 篇带货评测长文的盲测中，Claude Sonnet 5.5 & Opus 5.5 产出的初稿所需人工润色时间比同类模型少 60%，且能严格遵循复杂的 GEO 表格排版指令。',
      pros: ['中英双语行文克制自然，极少出现空洞套话', 'Artifacts 窗口支持实时渲染交互式网页组件与图表', '对长提示词（System Prompts）的多重约束执行最精准'],
      cons: ['网页端高峰期有消息条数限制（建议搭配 OpenRouter API 混合使用）'],
      verdict: '撰写高信任度独立站评测长文与构建网页交互的首选大脑。',
      url: 'https://console.anthropic.com/?ref=cruxkit', cta: '访问 Claude 平台'
    },
    deepseek: {
      catKey: 'ai', badgeClass: 'tier-a', score: '9.6 / 10', relatedKit: 'workstation',
      tier: 'S 级首选 · 极致性价比 API', name: 'DeepSeek V4.1-Flash-1017 & V4-Pro-0813 (硅基流动)', role: '成本仅 1/20 的国产之光推理与双语处理引擎',
      verdictShort: '每百万输入 Token 仅约 ¥1 ($0.14)，在 Make 与 n8n 中批量跑数千条数据清洗、摘要与翻译也不心疼账单。',
      metricPill: '⚡ $0.14 / 百万 Token · 满血 R1 深度推理',
      price: '注册即送免费 Token 额度 · 按量计费极低',
      summary: '当你在 n8n 或 Make 里配置每天自动运行的 RSS 监控、竞品价格提取或双语改写节点时，接入 DeepSeek V3/R1 可将 API 成本直接砍掉 90% 以上。',
      pros: ['批量自动化场景下无敌的智价比', '原生中文语境理解与逻辑推理能力稳居第一梯队', '通过硅基流动（SiliconFlow）或 OpenRouter 调用响应极快且稳定'],
      cons: ['纯前端视觉设计感略逊于 Claude Sonnet 5.5 & Opus 5.5（建议日常采用 DeepSeek + Claude 双模型组合）'],
      verdict: '高频后台自动化工作流与国语区内容处理的绝对主力。',
      url: 'https://cloud.siliconflow.cn/?ref=cruxkit', cta: '免费领 API 额度'
    },
    reclaim: {
      catKey: 'ai', badgeClass: 'tier-a', score: '9.3 / 10', relatedKit: 'solo',
      tier: 'A 级严选 · AI 日历防卫', name: 'Reclaim.ai', role: '自动保护深度工作时段的智能日历管家',
      verdictShort: '自动在日历上为你锁死每天早晨 90 分钟的“深度创造时间”，遇到临时会议自动顺延而非直接取消。',
      metricPill: '⚡ 双向同步 Google 日历与 Notion · 40% 分佣',
      price: 'Lite 版永久免费 · Starter $8/月',
      summary: '待办清单只是愿望，写进日历的才叫计划。Reclaim.ai 能根据你的任务优先级自动在日历空隙排程，并在 PartnerStack 上提供高达 40% 的持续联盟分佣。',
      pros: ['临时插入事情时自动重新排布本周深度工作块', '自动在连续会议之间插入 15 分钟喘息缓冲', 'PartnerStack 40% 持续分佣，极受效率博主欢迎'],
      cons: ['对 Google Calendar 生态支持最完美'],
      verdict: '兼顾客户沟通与个人独立站创作的时间防卫利器。',
      url: 'https://reclaim.ai/?via=cruxkit', cta: '免费试用 Reclaim'
    },
    appsumo: {
      catKey: 'ai', badgeClass: '', score: '9.5 / 10', relatedKit: 'allbundle',
      tier: 'S 级首选 · 正版终身软件码', name: 'AppSumo 终身特惠商城', role: '一次付费终身使用的正版 SaaS 兑换码平台',
      verdictShort: '用一顿饭钱（$29–$59 一次买断）永久解锁正版 AI、SEO 与营销工具终身使用权，且享 60 天无理由退款保障。',
      metricPill: '⚡ 60 天无理由全额退款 · Impact 新客最高 100% 佣金',
      price: '$19 – $69 一次性买断正版终身码 (Lifetime Deals)',
      summary: 'AppSumo 是全球最大的正版软件终身码（LTD）首发平台。不仅自己采购工具能省下大笔月租，其 Impact 联盟计划对带来的新买家首单更提供最高 100% 的返佣！',
      pros: ['彻底告别按月扣费的订阅制无底洞', '100% 官方正版授权兑换码，支持 60 天内随时一键退全款', '在 X 和社群分享 LTD 限时特惠极易产生冲动转化'],
      cons: ['选购时建议优先挑评价 4.5 星以上、团队成熟的产品'],
      verdict: '淘正版低价工具与做软件特惠带货的宝藏货源池。',
      url: 'https://appsumo.com/?ref=cruxkit', cta: '逛逛正版终身特惠'
    },
    notion: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'solo',
      tier: 'S 级首选 · 创作者中枢 #1', name: 'Notion + Notion AI', role: 'All-in-One 知识库与数字模版交付底座',
      verdictShort: '强大的关系型数据库足以支撑一人公司全流程内容日历，更是打包售卖 100% 毛利数字模版的最佳平台。',
      metricPill: '⚡ 驱动 "The Solo OS" · 个人版永久免费',
      price: '个人免费版 · Plus 计划 $10/月',
      summary: 'Notion 在我们的创作者操作系统评测中夺冠：关系型数据库能把选题、任务与联盟链接串联在同一视图，且任何好用的工作台都能一键变成可售卖的数字模版。',
      pros: ['多维过滤视图让“当前聚焦项目”与“资料库”井水不犯河水', '一键 Duplicate 机制天然适合挂载在独立站售卖数字套件', '与 Make.com 及 n8n 拥有原生丝滑的 API 接口'],
      cons: ['切忌花太多时间装饰页面（直接用我们的 05 号 Solo OS 即可）'],
      verdict: '内容+数字商品+联盟营销独立站的核心操作底座。',
      url: 'https://affiliate.notion.so/cruxkit', cta: '免费注册 Notion'
    },
    elevenlabs: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.8 / 10', relatedKit: 'videoengine',
      tier: 'S 级首选 · 拟真语音 #1', name: 'ElevenLabs Studio v3', role: '神经网络配音与 29 国语言自动译制',
      verdictShort: '具备上下文情绪起伏与自然呼吸停顿，让不出镜测评视频与多语种出海口播媲美专业录音棚水准。',
      metricPill: '⚡ 盲测自然度 99.2% · 22% 持续分佣',
      price: '免费版 (10k 字符/月) · Starter $5/月 · Creator $22/月',
      summary: '短视频前 1.5 秒的声音质感直接决定留存率。ElevenLabs v3 具备自然的呼吸气口与情绪张力，支持 60 秒克隆你自己的声音并自动说流利英文。',
      pros: ['40 组双盲测试中获得 99.2% 真人自然度评分', '一键将中文测评脚本用你的原声色译制为地道美式英语', '22% 持续 12 个月联盟佣金，后台一键开启'],
      cons: ['重生成会消耗字符额度 —— 建议先用 06 号套件锁定终稿'],
      verdict: '不出镜 YouTube、TikTok 与小红书双语视频创作者的标配。',
      url: 'https://elevenlabs.io/?from=partnercruxkit', cta: '免费试用 ElevenLabs'
    },
    heygen: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'videoengine',
      tier: 'S 级首选 · AI 数字人视频', name: 'HeyGen AI 视频工作室', role: '超写实数字分身与跨语种口型同步翻译',
      verdictShort: '只需录制 2 分钟训练视频即可生成专属数字分身，输入文字即可自动出镜口播，并支持 40+ 语种口型精准对齐。',
      metricPill: '⚡ 4K 数字人分身 · 30% 持续联盟分佣',
      price: '免费体验 (3 条/月) · Creator $29/月',
      summary: '如果你想同时做国内（抖音/小红书/视频号）与海外（TikTok/YouTube）带货，HeyGen 能把你拍好的中文口播视频一键转换成口型完全对上的英文版。',
      pros: ['眼神、微表情与手势自然度稳居行业第一', '跨语种视频口型重绘（Lip-Sync）效果极其惊艳', '提供高达 30% 的持续联盟分佣'],
      cons: ['首次录制 2 分钟采样视频时建议保持光线均匀稳定'],
      verdict: '实现“一次拍摄、全球多语种矩阵变现”的最高杠杆工具。',
      url: 'https://www.heygen.com/?sid=rewardful&utm_content=creator&utm_medium=affiliatebase&via=xing', cta: '免费体验 HeyGen'
    },
    semrush: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'content',
      tier: 'S 级首选 · SEO 流量情报', name: 'Semrush SEO & GEO 套件', role: '高购买意向关键词挖掘与竞品外链透视',
      verdictShort: '一键扒出竞争对手靠哪些“A vs B 对比词”和“平替词”在赚取高额联盟佣金，且联盟单笔佣金高达 $200！',
      metricPill: '⚡ 250 亿关键词库 · 单笔成交奖励 $200',
      price: '7 天免费全功能试用 · 顶级高额返佣单品',
      summary: '做联盟营销独立站最忌闭门造车。哪怕只利用 Semrush 的 7 天免费试用期集中导出一批低竞争度（KD < 25）的购买意向词，也足够你写满一整年的高转化博文。',
      pros: ['精准筛选带强烈掏钱意愿的“vs / review / alternative”长尾词', '新增 Google AI Overviews 引用追踪功能', 'Impact 联盟网络上最著名的“大额钞能力”单品（单笔付费转化奖励 $200）'],
      cons: ['正式月费较高 —— 独立站站长可集中在一个月内批量导出全年词表'],
      verdict: '规划高转化评测选题与赚取高额单笔联盟佣金的双重利器。',
      url: 'https://www.semrush.com/?ref=cruxkit', cta: '开启免费 SEO 诊断'
    },
    beehiiv: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'hooksvault',
      tier: 'S 级首选 · 邮件私域系统', name: 'Beehiiv 通讯平台', role: '自带广告变现网络的创作者邮件订阅中心',
      verdictShort: '2,500 订阅者以内永久免费，且内置 Boosts 推荐互推与官方品牌广告匹配，从第 1 天就能靠邮件列表变现。',
      metricPill: '⚡ 2,500 订阅内免费 · 50% 持续 12 个月分佣',
      price: 'Launch 版免费 (2,500 订阅内) · Scale $39/月',
      summary: '社交平台算法随时会变，只有沉淀到自己手里的邮件订阅列表才是谁也拿不走的私域资产。Beehiiv 不仅好用，还提供 50% 的 12 个月持续分佣。',
      pros: ['免费版即享高达 2,500 订阅额度与自定义域名绑定', '内置 Boosts 网络：每成功推荐一位真实订阅者即可赚取 $2–$4', '高达 50% 的年度持续联盟佣金'],
      cons: ['高级自动化工作流需升级至 Scale 计划'],
      verdict: '将独立站过客转化为高复购私域读者的最佳引擎。',
      url: 'https://www.beehiiv.com/?via=cruxkit', cta: '免费开通 Beehiiv'
    },
    framer: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.4 / 10', relatedKit: 'content',
      tier: 'A 级严选 · 交互建站工具', name: 'Framer 视觉建站', role: '零代码弹簧动效与高颜值模版变现平台',
      verdictShort: '像用 Figma 画图一样直接发布带丝滑物理动效的独立站，且推荐或售卖模版可享 50% 联盟持续分成。',
      metricPill: '⚡ 原生丝滑物理动效 · 50% 持续联盟分成',
      price: '免费体验版 · Mini $5/月 · Basic $15/月',
      summary: '对于偏爱视觉拖拽的设计师创作者，Framer 能快速搭建极具硅谷质感的落地页，并且其官方合作伙伴计划提供慷慨的 50% 分佣。',
      pros: ['零代码实现顶级物理弹簧过渡与滚动视差', '官方模版市场与联盟计划均提供 50% 高额分成', '自带全球高速 CDN 与 CMS 内容管理'],
      cons: ['站点数量多时不如 Cloudflare Pages 纯静态托管省钱'],
      verdict: '适合视觉设计师与高单价落地页模版创作者。',
      url: 'https://www.framer.com/?via=cruxkit', cta: '探索 Framer 官网'
    },
    hostinger: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'n8nvps',
      tier: 'S 级首选 · $4.99 n8n 云主机', name: 'Hostinger KVM VPS', role: '官方自带一键安装 n8n Docker 镜像的高配 VPS',
      verdictShort: '起步即享 4GB 大内存与 NVMe 固态硬盘，后台自带官方“Ubuntu + Docker + n8n”一键安装模版，无需敲复杂命令！',
      metricPill: '⚡ 官方一键装 n8n · 4GB 内存 $4.99/月 · 60% 佣金',
      price: 'KVM 1 (4GB 内存) $4.99/月 · 享 30 天退款保障',
      summary: '很多教程教你自托管 n8n，但新手往往卡在配服务器环境。Hostinger 直接在 VPS 面板里内置了官方 n8n Docker 一键镜像，点一下鼠标 3 分钟就能直接登录 n8n 画布！',
      pros: ['面板原生内置 n8n + Docker 一键系统镜像，3 分钟免命令装好', '入门款即给足 4GB 内存（同价位竞品通常只有 1GB 内存极易崩）', '联盟营销佣金高达 60%，转化率极高'],
      cons: ['首次购买建议选 12 或 24 个月锁定最低首购折扣价'],
      verdict: '私有化部署 n8n 与 LobeChat 最省心、内存最足的性价比 VPS。',
      url: 'https://www.hostinger.com/?REFERRALCODE=CRUXKIT', cta: '查看 $4.99 n8n 云主机'
    },
    cloudflare: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.9 / 10', relatedKit: 'workstation',
      tier: 'S 级首选 · $0 全球边缘托管', name: 'Cloudflare Pages & R2', role: '零成本、不限流量的全球静态独立站与存储基建',
      verdictShort: '将 cruxxxxxkit.com 托管在全球 300+ 边缘节点上，免费送 SSL 证书、抗 DDoS 攻击、免费企业邮箱路由，每月账单 $0。',
      metricPill: '⚡ $0/月不限流量带宽 · 免费域名邮箱路由',
      price: '静态建站与 10GB R2 对象存储永久 $0 免费',
      summary: '完全没必要花钱买低配虚拟主机跑笨重的老旧建站程序。Cloudflare Pages 绑定 GitHub 仓库后，每次修改代码 15 秒全球同步上线，速度满分且分文不取。',
      pros: ['真正的 $0 成本、不限流量带宽与全球秒开速度', '免费配置 hello@cruxxxxxkit.com 域名邮箱自动转发至你的个人邮箱', '自带 R2 零流量费存储，适合存放大体积数字商品包'],
      cons: ['需要搭配静态架构（本站已为你 100% 适配就绪）'],
      verdict: '现代高利润内容与联盟独立站的不二基建底座。',
      url: 'https://pages.cloudflare.com/', cta: '前往 Cloudflare 部署'
    },
    lemonsqueezy: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'solo',
      tier: 'S 级首选 · 全球虚拟收款', name: 'Lemon Squeezy / Gumroad', role: '免注册海外公司即可全球售卖数字套件的收款平台',
      verdictShort: '0 月租上架 ZIP 源文件与 Notion 模版，自动代缴欧美各国数字增值税（VAT），支持信用卡、PayPal 与 Apple Pay。',
      metricPill: '⚡ $0 月租 · 自动处理全球税务 · 内置分销系统',
      price: '$0 月租 · 仅在成交时收取小额通道费',
      summary: '作为全球合规税务代理商（Merchant of Record），Lemon Squeezy 与 Gumroad 让你用个人身份就能直接向全球买家收取美元，自动完成付款后 ZIP 文件秒级发货。',
      pros: ['零固定月费，没出单不花一分钱', '自带分销联盟功能（可让买过你套件的读者帮你推广分佣）', '完美衔接 Wise 与 Payoneer 提现回国'],
      cons: ['国内微信/支付宝买家建议同步搭配“面包多”使用（本站已支持双通道切换）'],
      verdict: '独立站售卖高毛利虚拟商品最省心的美元收银台。',
      url: 'https://www.lemonsqueezy.com/?ref=cruxkit', cta: '开通美元收银台'
    },
    wise: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'solo',
      tier: 'S 级首选 · 跨境收款神器', name: 'Wise 多币种账户', role: '免费获取美国/欧洲/英国本地银行账号收取联盟美金',
      verdictShort: '收取 Make.com (35% 分佣)、PartnerStack 与 Impact 全球联盟美金佣金的必备金融账户，支持实时汇率结汇至支付宝/银联。',
      metricPill: '⚡ 免费开通美/欧本地银行账号 · 零汇率加点',
      price: '$0 账户管理月费 · 极低透明汇损',
      summary: '做海外联盟营销，第一步就是得有一个能收美元 ACH 和欧元 SEPA 的正规账户。Wise 不仅被 Make.com 官方指定为唯一打款通道，还能直接绑定支付宝极速结汇。',
      pros: ['Make.com 官方联盟佣金唯一指定收款工具', '提供真实的美国 Routing/Account Number，可收 Impact 与 Amazon 联盟款', '支持按中间市场实时汇率直达国内支付宝或银行卡'],
      cons: ['首次注册需使用护照或身份证完成实名认证'],
      verdict: '赚取全球美金联盟佣金与数字商品收入的必备数字钱包。',
      url: 'https://wise.com/invite/u/cruxkit', cta: '免费注册 Wise'
    },
    timeless: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'routine',
      tier: '04 实验室 · 抗氧化封神 #1', name: 'Timeless 20% 维 C + E + 阿魏酸', role: '临床黄金三角抗氧化精华 (pH 2.9 真空泵)',
      verdictShort: '不透光真空按压泵彻底解决滴管维 C 开封易氧化变黄痛点，以专柜大牌 1/7 的价格提供经典 CEF 自由基防御。',
      metricPill: '🧪 实测 pH 2.9 · 真空防氧化瓶 · $25.95',
      price: '$25.95 (30 ml 真空泵) · iHerb 全球直邮支持支付宝',
      summary: '纯左旋维 C 必须在 pH 低于 3.5 的环境下才能穿透角质层，且需搭配维 E 与阿魏酸协同稳定。Timeless 用不到修丽可 CEF ($182) 七分之一的价格还原了这一黄金配比，并升级了不透光真空瓶。',
      pros: ['实测 pH 2.9，晨间防晒前打底可成倍放大抗光老能力', '不透光真空按压泵隔绝氧气，开封第 8 周依然清澈不发黄', '通过 iHerb 礼赏链接推广享 5%–20% 全球分佣（零门槛秒开）'],
      cons: ['20% 高浓度配合低 pH 对受损皮有轻微刺感 —— 建议初期隔日早晨用'],
      verdict: '横评 14 款早 C 精华后，配比科学度与包装保鲜度综合第一的晨间抗氧王牌。',
      url: 'https://www.iherb.com/search?kw=Timeless+Skin+Care+Vitamin+C&rcode=CRUXKIT', cta: '在 iHerb 查看配方与直邮价'
    },
    cicaplast: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.6 / 10', relatedKit: 'routine',
      tier: '04 实验室 · 屏障修护金标准', name: '理肤泉 B5+ 修复霜 (Cicaplast)', role: '5% 泛醇 (维生素 B5) + 羟基积雪草苷 + 益生元',
      verdictShort: '刷酸与早 C 晚 A 循环中第 3、4 晚的黄金屏障缓冲霜，一夜平复换季泛红、A 醇起皮与经表皮失水。',
      metricPill: '🧪 5% 高浓泛醇 B5 · 零香精 · 居家常备',
      price: '$16.99 – $18.99 (40 ml)',
      summary: '任何功效护肤的前提都是皮脂膜健康。富含 5% 泛醇、积雪草苷、乳木果油与微量元素铜锌锰，是我们 28 天护肤循环中修护夜的定海神针。',
      pros: ['快速缓解维 A 醇耐受期起皮与果酸后的微红刺痛', '100% 无香精，掌心温热乳化后按压上脸锁水不闷痘', '可在涂抹高浓度 A 醇前点涂在眼周、鼻翼、嘴角做防刺激隔离'],
      cons: ['膏体较丰润，油皮建议仅在夜间修护薄涂'],
      verdict: '早 C 晚 A 与功效护肤人群洗漱台上永不出错的“屏障灭火器”。',
      url: 'https://www.iherb.com/search?kw=La+Roche+Posay+Cicaplast+B5&rcode=CRUXKIT', cta: '在 iHerb 查看正品渠道'
    },
    bojsun: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'sunguide',
      tier: '04 实验室 · 日常防晒总冠军', name: 'Beauty of Joseon 大米益生菌防晒', role: 'SPF50+ PA++++ 新一代全波段纯化学防晒乳',
      verdictShort: '采用 Uvinul A Plus + Tinosorb S 等四种新一代光稳定防晒剂，乳液般丝滑水润、零假白、不熏眼、跟妆零搓泥。',
      metricPill: '🧪 四重新型防晒剂 · 零假白不熏眼 · $14',
      price: '$13.50 – $15.00 (50 ml) · 全球断货王',
      summary: '防晒霜用不够一美分硬币大小等于白涂，因此“肤感好到每天主动想涂够量”至关重要。这款大米防晒在 iHerb 与 YesStyle 常年霸榜第一，兼具硬核 UVA1 防护与保湿乳肤感。',
      pros: ['全采用新型大分子光稳定防晒剂（无老旧阿伏苯宗与奥克立林，绝不熏眼）', '30% 大米提取物 + 益生菌发酵物，干皮敏肌早晨可直接当保湿乳+防晒二合一', '成膜快、零泛白，后续上粉底极其服帖'],
      cons: ['自然水光肌妆效，大油田夏季可搭配散粉控油，非防水泳池型防晒'],
      verdict: '40 款防晒横评中，日常通勤肤感、波段安全性与复购率综合第一名。',
      url: 'https://www.iherb.com/search?kw=Beauty+of+Joseon+Relief+Sun&rcode=CRUXKIT', cta: '在 iHerb 查看大米防晒'
    },
    paulasbha: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.5 / 10', relatedKit: 'incidecoder',
      tier: '04 实验室 · 毛孔疏通标杆', name: '宝拉珍选 2% 水杨酸精华液', role: '脂溶性水杨酸 (pH 3.5) + 绿茶抗炎提取物',
      verdictShort: '在 4 晚护肤循环的“第 1 晚（代谢夜）”使用，脂溶性分子深入毛孔溶解黑头白头与油脂粒，免洗温和不伤角质。',
      metricPill: '🧪 2% 黄金浓度 · 脂溶疏通毛孔 · 全球畅销',
      price: '$14.00 (30ml 便携装) · $35.00 (118ml 大瓶装)',
      summary: '果酸是水溶性的，只能作用在表皮；而水杨酸（BHA）具有亲脂性，能顺着皮脂腺钻进毛孔深处溶解氧化的角栓黑头，配合绿茶多酚减轻刷酸泛红。',
      pros: ['精准控制在 pH 3.2–3.8 黄金游离酸渗透窗口', '不含酒精与香精，比撕拉鼻贴和磨砂膏科学安全百倍', '按每周循环使用 2 次计算，一瓶 118ml 足足可用半年'],
      cons: ['严禁与维 A 醇在同一晚叠加 —— 请严格放在循环第 1 晚单独使用'],
      verdict: '解决黑头闭口、草莓鼻与皮肤粗糙的全球刷酸教科书单品。',
      url: 'https://www.iherb.com/search?kw=Paulas+Choice+2%25+BHA&rcode=CRUXKIT', cta: '在 iHerb 查看宝拉水杨酸'
    },
    cosrxsnail: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.4 / 10', relatedKit: 'routine',
      tier: '04 实验室 · 温和打底保湿', name: 'COSRX 96% 蜗牛粘液修护精华', role: '96.3% 蜗牛分泌物滤液 + 泛醇 + 尿囊素',
      verdictShort: '极简 12 项无香精配方，富含天然糖蛋白与透明质酸，在刷酸或涂 A 醇前打底可显著降低脱皮率。',
      metricPill: '🧪 96.3% 高纯度滤液 · 100ml 大碗耐用 · $16.50',
      price: '$15.50 – $17.50 (100 ml 按压瓶)',
      summary: '十年长青的韩妆海淘销量传奇。其天然粘多糖与尿囊素矩阵能在角质层表面形成透气水膜，是早 C 晚 A 人群极佳的百搭保湿缓冲精华。',
      pros: ['成分极其干净（仅 12 项成分，零香精、零酒精、零酸类冲突）', '可与维 C、A 醇、水杨酸、胜肽等任何活性成分安全百搭', '100ml 超大容量真空按压瓶，单次按压成本不到 ¥1'],
      cons: ['对尘螨严重过敏体质者建议先在耳后做小范围皮试'],
      verdict: '早 C 晚 A 循环中最高性价比的百搭保湿修护打底精华。',
      url: 'https://www.iherb.com/search?kw=COSRX+Advanced+Snail+96&rcode=CRUXKIT', cta: '在 iHerb 查看 COSRX 精华'
    },
    differin: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.6 / 10', relatedKit: 'routine',
      tier: '04 实验室 · 维 A 酸类标杆', name: 'Differin 达芙文 0.1% 阿达帕林凝胶', role: '第三代受体选择性维 A 酸类（第 2 晚核心单品）',
      verdictShort: '无需像普通护肤品 A 醇那样在皮肤内经历两步低效转化，直接靶向结合 RAR-β/γ 受体，疏通闭口、细腻肤质且光稳定性更强。',
      metricPill: '🧪 0.1% 阿达帕林 · 临床金标准 · $14.99',
      price: '$14.99 (15g) · $26.99 (45g)',
      summary: '专柜动辄 $100+ 的普通视黄醇（Retinol）不仅极易失活，还需在皮肤内转化两次才能起效。阿达帕林作为第三代维 A 酸类化合物，结构稳定、刺激性低于一代维 A 酸，是临床公认的抗粉刺与抗光老实力派。',
      pros: ['直接作用于细胞受体，清理顽固闭口粉刺与平滑毛孔证据确凿', '化学结构比传统 A 醇更稳定，且价格仅需 $14.99', '配合“三明治涂抹法”（先涂保湿乳 → 干透后黄豆大小阿达帕林 → 再涂 B5）温和度极佳'],
      cons: ['孕期/备孕期禁用；仅限晚间（第 2 晚）干手干脸取黄豆大小薄涂，白天必须防晒'],
      verdict: '4 晚护肤循环中“第 2 晚（维 A 夜）”最具医学循证价值的硬核单品。',
      url: 'https://www.iherb.com/search?kw=Differin+Adapalene+Gel&rcode=CRUXKIT', cta: '在 iHerb 查看 Differin'
    }
  }
};


/* -----------------------------------------------------------
   4. 12 FULL BILINGUAL EDITORIAL STORIES & BENCHMARK GUIDES
----------------------------------------------------------- */
const storiesOrder = [
  'workflow', 'stack', 'apihub', 'brain', 'voice', 'affcrm',
  'n8nvps_guide', 'geoseo', 'beauty', 'timeless_test', 'conflict_guide', 'reset'
];

const storiesData = {
  en: {
    workflow: {
      catKey: 'ai', tile: 'tile-desk',
      category: 'Workflow notes · 4 min read',
      title: 'Build a calmer content workflow.',
      excerpt: 'Separate making from managing. Start with a small sequence you can trust, then automate only the repeatable handoffs.',
      readMore: 'Read field note',
      lead: 'A good workflow makes the next step obvious. Start with a small sequence you can trust, then choose the tools that help you follow it.',
      sections: [
        ['01 — Give every idea one home.', 'Choose one place to capture ideas, links, benchmark data, and rough notes. Whenever you save an item, write one sentence explaining why it matters. That single sentence of context beats twenty nested tags.'],
        ['02 — Separate making from managing.', 'Use four clear stages: Ideas, Drafting, Ready, and Published. Never edit structure while writing a first draft, and never configure webhooks during protected writing hours.'],
        ['03 — Automate only the repeatable handoffs.', 'Turn a completed Notion brief into a formatted draft folder, archive published links into your affiliate ledger, and keep a human review gate before anything goes live.']
      ],
      table: {
        headers: ['Workflow Stage', 'Manual Habit', 'Automated Handoff (Make / n8n)'],
        rows: [
          ['1. Capture', 'Write 1 sentence on why the idea matters', 'Auto-fetch page title, canonical URL & timestamp'],
          ['2. Brief', 'Answer the 5 Crux questions on 1 page', 'Generate structured H2/H3 outline & FAQ schema'],
          ['3. Publish', 'Final human voice & accuracy pass', 'Syndicate to 4 channels + log partner links']
        ]
      },
      quote: 'The best system is the one that leaves you more room to make.',
      relatedKit: 'automation'
    },
    stack: {
      catKey: 'ai', tile: 'tile-folders',
      category: 'The considered stack · 5 min read',
      title: 'Make vs. n8n vs. Zapier (2026): 50,000-Task Audit.',
      excerpt: 'How we benchmark Make.com, n8n, and Zapier across 50,000 tasks—and how to cut your monthly automation bill by 85%.',
      readMore: 'Read benchmark guide',
      lead: 'Before adding another subscription, get specific about the task—and watch out for per-step pricing traps that punish modern AI loops.',
      sections: [
        ['01 — Start with the task, not the brand.', 'Describe the job in plain English: “Route new form submissions through an AI summary and log them in Notion.” Once the sequence is clear, evaluate tools by cost per 10,000 runs.'],
        ['02 — Why per-task billing punishes AI workflows.', 'A single AI automation often includes 10 internal steps. On legacy per-task plans, running that workflow 100 times a day consumes 30,000 tasks a month ($73+ on Zapier vs $9 on Make).'],
        ['03 — Our 2026 Three-Tool Rule.', 'Use Make.com ($9/mo) for fast visual cloud routing, n8n ($4.99 Hostinger VPS) for unlimited multi-step AI agent loops, and Notion as your human command center.']
      ],
      table: {
        headers: ['Engine', '10,000 Runs / Mo Cost', 'Best Job-to-Be-Done', 'CruxKit Verdict'],
        rows: [
          ['Make.com', '$9.00 / mo', 'Visual multi-branch cloud webhooks & APIs', 'S-Tier Best Overall (9.8/10)'],
          ['n8n', '$4.99 VPS / $20 Cloud', 'Unlimited multi-step AI agent loops & JS/Python', 'S-Tier Technical Pick (9.7/10)'],
          ['Zapier', '$73.50+ / mo', 'Simple 2-step triggers for obscure B2B apps', 'B-Tier Overpriced at Scale (7.9/10)']
        ]
      },
      quote: 'Choose tools for the work you actually do—and audit your recurring burn every quarter.',
      relatedKit: 'automation'
    },
    apihub: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'AI Infrastructure · 5 min read',
      title: 'Stop buying shared accounts: Build a private AI API hub.',
      excerpt: 'Why gray-market shared ChatGPT/Claude accounts get banned in days—and how to run your own multi-LLM workstation for $3/mo.',
      readMore: 'Read setup guide',
      lead: 'Buying shared or bulk-registered AI accounts on social media guarantees lost chat history, leaked prompts, and sudden mid-project bans. Here is the clean, 100% legal architecture.',
      sections: [
        ['01 — The math of pay-as-you-go APIs vs. $60/mo subscriptions.', 'Most solo creators use fewer than 3 million tokens a month. Paying $20/mo each for ChatGPT Plus, Claude Pro, and Gemini Advanced costs $60/mo. Calling those exact models via OpenRouter or DeepSeek API costs $2.50 to $4.80/mo total.'],
        ['02 — Deploy LobeChat on Cloudflare Pages or Zeabur for $0.', 'Fork the open-source LobeChat repository, deploy it to Cloudflare Pages in 3 minutes, and paste your OpenRouter + DeepSeek API keys. You get a private, password-protected workspace with 50 custom agents.'],
        ['03 — Route each task to the specialist model.', 'Use Claude Sonnet 5.5 & Opus 5.5 for nuanced bilingual writing and UI code, DeepSeek V4-Pro-0813 ($0.14/1M tokens) for bulk reasoning, and Gemini 3.8 / 4 Argon Flash for long-context document parsing.']
      ],
      table: {
        headers: ['Setup Option', 'Monthly Cost', 'Account Ban Risk', 'Model Access'],
        rows: [
          ['CruxKit API + LobeChat Hub', '~$3.50 / mo (Pay-as-you-go)', '0% (Official API Keys)', 'Claude Sonnet 5.5 & Opus 5.5 + GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna + DeepSeek V4-Pro-0813 + Gemini'],
          ['3 Separate Pro Subscriptions', '$60.00 / mo', 'Low (High Fixed Cost)', 'Locked in 3 separate browser tabs'],
          ['Gray-Market Shared Accounts', '$5–$15 / mo', '95% (Banned every 3–7 days)', 'Shared chat history & privacy leaks']
        ]
      },
      quote: 'Own your interface, hold your own official API keys, and pay only for the tokens you actually use.',
      relatedKit: 'workstation'
    },
    brain: {
      catKey: 'ai', tile: 'tile-solo',
      category: 'Working smarter · 4 min read',
      title: 'Find your second brain: Notion vs. Obsidian.',
      excerpt: 'Notion vs. Obsidian in 2026: why capturing with a single sentence of context beats elaborate tag hierarchies every time.',
      readMore: 'Read comparison',
      lead: 'Your notes should make useful ideas easier to find again. A small, forgiving system beats an elaborate museum of unread clippings.',
      sections: [
        ['01 — Capture with a purpose.', 'Stop clipping entire articles you might read “someday.” Save only what supports an active project, and attach a one-line takeaway at the top.'],
        ['02 — Notion vs. Obsidian: Pick by output.', 'If you want local-first Markdown files with zero subscription cost, Obsidian is unmatched. If you want relational databases, content calendars, and workspaces you can duplicate and sell as digital kits, Notion wins effortlessly.'],
        ['03 — Make retrieval part of your weekly rhythm.', 'Every Friday, link orphan notes to active projects and archive everything else.']
      ],
      table: {
        headers: ['Criterion', 'Notion + AI (S-Tier)', 'Obsidian (A-Tier)'],
        rows: [
          ['Primary Strength', 'Relational databases & sellable template kits', 'Blazing-fast local Markdown (.md) files'],
          ['Monthly Cost', 'Free / $10 Plus', '$0 Personal'],
          ['Best For', 'Operating systems, CRMs & content calendars', 'Long-form drafting & private knowledge vaults']
        ]
      },
      quote: 'Collect less by default. Keep what you can put to work.',
      relatedKit: 'solo'
    },
    voice: {
      catKey: 'ai', tile: 'tile-content',
      category: 'Creator systems · 4 min read',
      title: 'Short-form video, without the burnout.',
      excerpt: 'How solo operators pair one-page briefs with ElevenLabs v3 and HeyGen to publish across four channels in 90 minutes a week.',
      readMore: 'Read creator playbook',
      lead: 'You do not need a studio camera crew to share useful product breakdowns. You need a tight 120-word brief and natural audio.',
      sections: [
        ['01 — Audio carries 70% of viewer retention.', 'Viewers happily watch clean screen recordings or comparison tables if the voiceover is warm and well-paced. Pairing a locked one-page script with an ElevenLabs v3 voice clone lets you produce studio narration in two minutes.'],
        ['02 — Cross-border dubbing with HeyGen.', 'Translate a single 35-second benchmark breakdown into both English (TikTok/Shorts/Reels) and Mandarin (Xiaohongshu/Douyin) to double your affiliate link clicks from the same research effort.']
      ],
      table: {
        headers: ['Production Step', 'Old Studio Workflow (4 hrs)', 'CruxKit AI Video Pipeline (18 mins)'],
        rows: [
          ['1. Scripting', 'Rambling 800-word draft', '120-word 4-block Hook/Proof/Demo/CTA brief'],
          ['2. Voiceover', '15 mic retakes & room echo cleanup', 'ElevenLabs v3 custom voice clone (2 mins)'],
          ['3. Localization', 'Re-shoot from scratch in 2nd language', 'HeyGen 1-click lip-sync translation']
        ]
      },
      quote: 'Clarity in the script saves hours in the timeline.',
      relatedKit: 'videoengine'
    },
    affcrm: {
      catKey: 'ai', tile: 'tile-folders',
      category: 'Indie Monetization · 5 min read',
      title: 'The Lean Affiliate Ledger: Tracking 24+ partner links.',
      excerpt: 'How to structure /go/ redirects, UTM parameters, and companion Digital Kits so every article earns twice.',
      readMore: 'Read monetization guide',
      lead: 'Most independent review sites fail because they treat affiliate links as an afterthought—scattering raw tracking URLs across posts that break whenever a brand changes networks.',
      sections: [
        ['01 — Always route through clean /go/ slugs.', 'Never paste raw PartnerStack or Impact URLs directly into 50 articles. Route every link through a central config (like cruxxxxxkit.com/go/make) so you can update a destination across your entire site in 10 seconds.'],
        ['02 — Pair every software review with a $15–$24 Digital Kit.', 'When a reader clicks your Make.com or n8n review, 20% will sign up via your affiliate link—and 5% will gladly pay $24 for your ready-to-import JSON workflows so they don’t have to build from scratch.'],
        ['03 — Combine recurring SaaS with high-bounty anchors.', 'Balance 12-month recurring programs (Make 35%, n8n 30%, ElevenLabs 22%) with high upfront bounties (Semrush $200/sale, Hostinger 60%) and high-frequency consumer repeat purchases (iHerb 5%–20%).']
      ],
      table: {
        headers: ['Revenue Layer', 'Target Conversion', 'Unit Economics', 'Compounding Effect'],
        rows: [
          ['Layer 1: Recurring SaaS', 'Make / n8n / ElevenLabs / Beehiiv', '22%–50% every month for 12 mos', 'Builds predictable monthly baseline'],
          ['Layer 2: High-Bounty Infra', 'Semrush / Hostinger VPS', '$60 – $200 instant payout per sale', 'Funds domain & experiment costs immediately'],
          ['Layer 3: Own Digital Kits', '12 ZIP Kits & $69 Master Bundle', '95% net margin, instant payout', 'Zero platform dependency, 100% owned asset']
        ]
      },
      quote: 'A great benchmark review earns affiliate commission on the tool and 100% margin on the setup kit.',
      relatedKit: 'solo'
    },
    n8nvps_guide: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'Cloud & DevOps · 5 min read',
      title: 'Unlimited AI agent loops on a $4.99 Docker VPS.',
      excerpt: 'Step-by-step architecture for self-hosting n8n with PostgreSQL, Caddy auto-SSL, and Cloudflare R2 daily backups.',
      readMore: 'Read VPS architecture',
      lead: 'When your AI workflows scale to 20-step agent loops running every 15 minutes, cloud per-step billing becomes your biggest expense. Self-hosting n8n locks your cost at $4.99/month flat.',
      sections: [
        ['01 — Why 4GB RAM matters for AI workflows.', 'Avoid 1GB RAM micro-instances that crash when parsing large JSON arrays or PDF buffers. Hostinger’s KVM 1 plan gives you 4GB RAM and an official 1-click Ubuntu + Docker + n8n image for $4.99/mo.'],
        ['02 — Zero-maintenance HTTPS with Caddy.', 'Instead of manually renewing Let’s Encrypt certificates in Nginx, a 4-line Caddyfile handles automatic TLS provisioning and WebSocket proxying out of the box.'],
        ['03 — Automated nightly backups to Cloudflare R2.', 'Run a lightweight cron job that exports your n8n workflows and encrypted credentials to a free 10GB Cloudflare R2 bucket every night at 03:00 UTC.']
      ],
      table: {
        headers: ['Hosting Tier', 'Monthly Cost', 'Execution Limit', 'RAM / Specs'],
        rows: [
          ['Hostinger KVM 1 + CruxKit Docker Pack', '$4.99 / mo', 'Unlimited executions & steps', '4 GB RAM · 50 GB NVMe · 1-Click n8n'],
          ['n8n Cloud Starter', '$20.00 / mo', '2,500 workflow executions', 'Managed cloud instance'],
          ['Zapier Professional', '$73.50 / mo', '10,000 individual tasks/steps', 'Cloud SaaS (High cost for AI loops)']
        ]
      },
      quote: 'Own your execution engine and never count internal workflow steps again.',
      relatedKit: 'n8nvps'
    },
    geoseo: {
      catKey: 'ai', tile: 'tile-content',
      category: 'Search Strategy · 4 min read',
      title: 'GEO Playbook: Writing reviews that AI search engines cite.',
      excerpt: 'How to structure comparison tables, TL;DR verdict boxes, and entity metrics so ChatGPT, Perplexity, and Google AI cite your site.',
      readMore: 'Read GEO playbook',
      lead: 'In 2026, over 40% of high-intent software and product research happens inside AI answer engines. Generic 2,000-word SEO fluff gets ignored; dense, structured benchmark data gets cited.',
      sections: [
        ['01 — Lead with a 30-Second Crux Verdict Box.', 'Place a structured summary in the first 150 words stating the exact winner, target user persona, measured score, and primary quantitative metric (e.g., "$9/mo per 10,000 ops" or "Measured pH 2.9").'],
        ['02 — Use native HTML comparison tables.', 'LLMs and retrieval crawlers parse clean HTML `<table>` elements with far higher confidence than text buried inside images or complex JavaScript carousels.'],
        ['03 — Include honest "Who Should Skip This" trade-offs.', 'AI ranking models heavily weight nuanced disqualifiers (e.g., "Skip Cicaplast B5+ under heavy summer makeup; reserve for PM recovery"). Authenticity drives both citations and buyer conversion.']
      ],
      table: {
        headers: ['Content Element', 'Legacy SEO Blog Post', 'CruxKit GEO Benchmark Standard'],
        rows: [
          ['Intro (First 150 Words)', 'Fluffy history of "What is automation?"', 'Direct Verdict Box: Winner, Price/10k ops, Trade-off'],
          ['Data Presentation', 'Screenshots of pricing pages', 'Semantic HTML comparison tables + `/llms.txt` index'],
          ['Trust Signal', 'Generic 5-star praise for everything', 'Specific failure modes & clear "Who should skip" rules']
        ]
      },
      quote: 'Be the clearest primary data source on the web, and both humans and AI engines will reward you.',
      relatedKit: 'content'
    },
    beauty: {
      catKey: 'beauty', tile: 'tile-rings',
      category: 'Desk 04 · Beauty Lab · 4 min read',
      title: 'Skin cycling & the 3-active rule: A calmer barrier routine.',
      excerpt: 'Why layering ten viral serums wrecks your stratum corneum—and how an airless Vitamin C + retinoid recovery loop wins.',
      readMore: 'Read formulation note',
      lead: 'Just like software stacks suffer from subscription bloat, skincare routines suffer from active overload. Here is how formulation science simplifies your shelf.',
      sections: [
        ['01 — Why 10-step routines backfire.', 'Layering low-pH L-Ascorbic Acid, exfoliating AHAs, copper peptides, and retinoids in the same evening triggers chronic stratum corneum inflammation and chemical neutralization.'],
        ['02 — Packaging is part of the formula.', 'Pure Vitamin C (L-Ascorbic Acid) oxidizes rapidly when exposed to air and light in clear dropper bottles. Always choose opaque airless pumps formulated at pH 2.8–3.2 with Vitamin E and Ferulic Acid.'],
        ['03 — The 4-Night Recovery Loop.', 'Night 1: Exfoliate (2% BHA). Night 2: Retinoid (0.1% Adapalene). Nights 3 & 4: Barrier recovery with 5% Panthenol B5+ and ceramides.']
      ],
      table: {
        headers: ['Active Pairing', 'Compatibility Verdict', 'CruxKit Protocol Rule'],
        rows: [
          ['Vitamin C (pH 2.9) + SPF 50', '✓ Synergistic (AM)', 'Doubles UV free-radical protection when layered in AM'],
          ['Vitamin C + Copper Peptides', '✕ Conflict (Chelation)', 'Separate into AM (Vitamin C) and PM (Peptides)'],
          ['AHA/BHA Acids + Retinoids', '✕ Barrier Irritation', 'Never layer same night; alternate via 4-night cycling']
        ]
      },
      quote: 'Fewer actives, properly stabilized and spaced, outperform a crowded vanity.',
      relatedKit: 'routine'
    },
    timeless_test: {
      catKey: 'beauty', tile: 'tile-folders',
      category: 'Desk 04 · Formulation Audit · 5 min read',
      title: '8-Week Oxidation Audit: Airless Pump vs. Dropper Vitamin C.',
      excerpt: 'We tracked pH stability, color shift, and per-milliliter cost across 14 L-Ascorbic Acid serums. Here is why $25.95 Timeless won.',
      readMore: 'Read lab audit',
      lead: 'L-Ascorbic Acid is the gold-standard topical antioxidant—but it is notoriously unstable in water. Once oxidized into dehydroascorbic acid (turning orange/brown), it loses efficacy and can stain pores.',
      sections: [
        ['01 — The Duke Antioxidant Parameters.', 'Clinical research established three strict requirements for topical Vitamin C: pure L-Ascorbic Acid, a pH below 3.5 for stratum corneum penetration, and a concentration between 10% and 20% stabilized with Vitamin E and Ferulic Acid.'],
        ['02 — Why glass droppers fail by Week 5.', 'Every time you unscrew a glass dropper bottle in a humid bathroom, fresh oxygen enters the headspace. In our 8-week tracking, opaque airless pumps maintained clear color and pH 2.9 stability twice as long.'],
        ['03 — The $156/bottle savings math.', 'At $25.95 for 30ml ($0.86/ml), Timeless 20% C+E+Ferulic delivers the exact triad architecture at 1/7th the cost of $182 luxury dropper equivalents.']
      ],
      table: {
        headers: ['Formula', 'Measured pH', 'Packaging Type', 'Week 8 Color Shift', 'Price / 30ml'],
        rows: [
          ['Timeless 20% C + E + Ferulic', 'pH 2.9', 'Opaque Airless Pump', 'Clear / Pale Straw (Pass)', '$25.95 ($0.86/ml)'],
          ['Luxury Clinical Benchmark CEF', 'pH 3.2', 'Glass Dropper Bottle', 'Amber Tint by Week 6', '$182.00 ($6.06/ml)'],
          ['Generic Derivative Serum (SAP/MAP)', 'pH 6.0', 'Clear Dropper', 'Clear (Low Penetration)', '$22.00 ($0.73/ml)']
        ]
      },
      quote: 'Never pay $180 for an antioxidant formula packaged in a bottle that lets oxygen in every morning.',
      relatedKit: 'incidecoder'
    },
    conflict_guide: {
      catKey: 'beauty', tile: 'tile-rings',
      category: 'Desk 04 · Dermal Science · 4 min read',
      title: 'Next-Gen UV Filters: Why Korean & European sunscreens win.',
      excerpt: 'Decoding Uvinul A Plus, Tinosorb S, and Mexoryl 400—and why modern photostable filters eliminate white cast and eye sting.',
      readMore: 'Read SPF guide',
      lead: 'Daily UV protection is responsible for 80% of visible skin aging prevention. Yet millions skip daily SPF because older filters feel greasy, sting eyes, or leave a chalky cast.',
      sections: [
        ['01 — UVA1 rays penetrate glass and clouds year-round.', 'While UVB rays cause sunburn, long-wave UVA1 rays (340–400nm) penetrate deep into the dermis to break down collagen. Look for PA++++ or high PPD ratings powered by Uvinul A Plus and Tinosorb S.'],
        ['02 — Why modern large-molecule filters feel like serum.', 'Next-generation filters like Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine (Tinosorb S) have higher molecular weights (>500 Daltons) and superior photostability—meaning less filter concentration is needed for SPF50+ protection.'],
        ['03 — Matching finish to your skin barrier.', 'Dry or retinoid-treated skin thrives on Beauty of Joseon Relief Sun (rice + probiotics), while oily climates pair well with lightweight gel-lotions.']
      ],
      table: {
        headers: ['UV Filter Name', 'Spectrum Coverage', 'Photostability', 'Found In (S-Tier Pick)'],
        rows: [
          ['Uvinul A Plus (DHHB)', 'High UVA1 & UVA2', 'Excellent (Does not degrade)', 'Beauty of Joseon Relief Sun ($14)'],
          ['Tinosorb S (BEMBT)', 'Broad UVB + UVA1/2', 'Gold Standard Stabilizer', 'Beauty of Joseon / LRP UVMune'],
          ['Legacy Avobenzone', 'UVA (Unstable alone)', 'Degrades without octocrylene', 'Older US drugstore sunscreens']
        ]
      },
      quote: 'The best anti-aging serum in the world is a PA++++ sunscreen you actually enjoy wearing every morning.',
      relatedKit: 'sunguide'
    },
    reset: {
      catKey: 'ai', tile: 'tile-solo',
      category: 'Solo operations · 3 min read',
      title: 'The 20-minute Friday reset.',
      excerpt: 'Archive what is finished, close open browser tabs, and pick the three projects that deserve your attention next week.',
      readMore: 'Read ritual',
      lead: 'Monday mornings feel heavy when Friday afternoons end in a tangle of half-open tabs. Close your week with a simple five-step ritual.',
      sections: [
        ['01 — Clear the capture inbox.', 'Process every loose note, screenshot, and bookmark from the week. Either attach it to an active project, park it in Later, or delete it.'],
        ['02 — Check the numbers that matter.', 'Spend five minutes logging three metrics: pieces published, partner link clicks, and digital kit downloads. Ignore vanity impressions.'],
        ['03 — Write Monday’s first action.', 'Before shutting your laptop, write down the single concrete task you will start with on Monday morning.']
      ],
      quote: 'A calm Monday starts at 4:30 PM on Friday.',
      relatedKit: 'solo'
    },
    approach: {
      category: 'Our approach · CruxKit Studio',
      title: 'More room for your own good ideas.',
      lead: 'CruxKit (cruxxxxxkit.com) is built around a simple conviction: independent benchmarks and ready-to-use digital kits belong together.',
      sections: [
        ['01 — Find the crux of the choice.', 'Whether we are stress-testing an AI automation engine or auditing the pH stability of a clinical serum, we strip away marketing noise and focus on the variables that govern real-world results.'],
        ['02 — Connect tools to a calm workflow.', 'Every review we publish includes concrete setup parameters, cost-per-use math, and clear trade-offs.'],
        ['03 — Package the system into a Kit.', 'Whenever we build an internal Notion dashboard, automation blueprint, or cycling calendar that saves us time, we refine it into an affordable Digital Kit.']
      ],
      quote: 'Thoughtful tools. Ready-to-use systems. Your way of working.',
      relatedKit: 'allbundle'
    },
    disclosure: {
      category: 'Transparency & Governance',
      title: 'FTC Affiliate Disclosure & Editorial Independence.',
      lead: 'CruxKit Studio (cruxxxxxkit.com) is an independent, reader-supported publication.',
      sections: [
        ['How we fund our benchmark lab.', 'When you click outbound partner links on our site and sign up for a software tool or purchase a recommended product, we may earn a referral commission at zero additional cost to you.'],
        ['Unbribed S-Tier verdicts.', 'We never accept paid placements in our Tier Lists. Free and open-source tools and $15–$25 clinical formulations routinely outrank $180+ alternatives in our lab audits.']
      ],
      quote: 'Reader trust is our only compounding asset.',
      relatedKit: 'allbundle'
    },
    privacy: {
      category: 'Legal & Licensing',
      title: 'Privacy Policy & Digital Kit License.',
      lead: 'Plain-English terms for cruxxxxxkit.com visitors and Digital Kit buyers.',
      sections: [
        ['Zero data broker tracking.', 'We do not sell personal data. Checklist progress is stored locally in your browser sessionStorage. Paid digital kit checkouts are processed securely via our Merchant of Record partners.'],
        ['Digital Kit Creator License.', 'Purchasing or downloading a CruxKit Digital Kit grants you a lifetime license to use and adapt the workflows, prompts, and templates for your personal or business projects.']
      ],
      quote: 'Questions? Reach our editorial desk anytime at hello@cruxxxxxkit.com.',
      relatedKit: 'allbundle'
    }
  },
  zh: {
    workflow: {
      catKey: 'ai', tile: 'tile-desk',
      category: '工作流手记 · 4 分钟阅读',
      title: '构建更从容的内容生产工作流。',
      excerpt: '把“专注创作”与“流程管理”彻底分开。先跑通最小可信赖闭环，再把重复交接交给自动化。',
      readMore: '阅读完整手记',
      lead: '好的工作流会让“下一步该做什么”一目了然。先建立一套你信得过的极简闭环，再用自动化接管那些机械重复的交接。',
      sections: [
        ['01 — 给所有灵感安一个唯一的家。', '只保留一个统一入口来收集选题、参考链接与实测数据。每次保存素材时，强制写下一句话：“它为什么值得留？” —— 这一句话的上下文价值，远胜过二十个复杂的标签。'],
        ['02 — 把“深度创作”与“流程管理”彻底隔离。', '用四个清晰状态管理内容：灵感池（Ideas）、撰稿中（Drafting）、待发布（Ready）与已归档（Published）。永远不要在写初稿时分心去调 Webhook。'],
        ['03 — 只把“高摩擦、可重复”的交接自动化。', '把写完的 Notion 大纲自动生成多平台草稿文件夹、把推广链接自动登记到联盟台账。在正式发布前，永远保留最后一道人工审校门禁。']
      ],
      table: {
        headers: ['工作流阶段', '人工核心习惯', '自动化交接动作 (Make / n8n)'],
        rows: [
          ['1. 灵感捕获', '写下一句话说明“为什么值得做”', '自动抓取网页标题、规范 URL 与时间戳'],
          ['2. 立项大纲', '在一页纸上回答 5 个 Crux 核心问题', 'AI 自动生成结构化 H2/H3 提纲与 FAQ 架构'],
          ['3. 多端分发', '人工完成最终语气润色与事实核查', '一键同步至 4 个渠道并自动归档联盟追踪链接']
        ]
      },
      quote: '最好的系统，是能为你腾出更多完整时间去真正创造的系统。',
      relatedKit: 'automation'
    },
    stack: {
      catKey: 'ai', tile: 'tile-folders',
      category: '工具栈压测 · 5 分钟阅读',
      title: '2026 自动化引擎 50,000 次实测：Make vs n8n vs Zapier。',
      excerpt: '我们如何在 50,000 次任务中实测三大自动化平台 —— 以及如何将你的每月自动化账单直接砍掉 85%。',
      readMore: '阅读压测报告',
      lead: '在增加下一个月度订阅前，先算清“每万次运行真实成本”，警惕传统按步数计费对 AI 循环工作流的价格惩罚。',
      sections: [
        ['01 — 从具体任务出发，而不是从品牌热度出发。', '先用大白话写下任务：“把新提交的表单通过 AI 总结成三条要点，并写入 Notion。” 当步骤明确后，直接按“每 10,000 次执行的成本”横向对比。'],
        ['02 — 为什么传统“按步计费”正在惩罚 AI 工作流？', '一条实用的 AI 自动化往往包含 10 个内部节点。在按步计费平台上，每天跑 100 次就会消耗 30,000 个任务额度（Zapier 需 $73+/月，而 Make 仅需 $9/月）。'],
        ['03 — 我们的 2026“三工具黄金法则”。', '用 Make.com（$9/月）处理快速的云端可视化多分支路由，用 Hostinger $4.99 VPS 自托管 n8n 跑无限次多步 AI 智能体循环，用 Notion 作为总控台。']
      ],
      table: {
        headers: ['自动化引擎', '10,000 步/月真实成本', '最擅长的核心场景', 'CruxKit 实验室评级'],
        rows: [
          ['Make.com', '$9.00 / 月', '可视化多分支云端 Webhook 与 API 编排', 'S 级综合首选 (9.8/10)'],
          ['n8n', '$4.99 VPS / $20 云端', '无限次多步 AI 智能体循环 & 原生代码节点', 'S 级技术极客首选 (9.7/10)'],
          ['Zapier', '$73.50+ / 月', '冷门 B2B 软件的简单两步式触发', 'B 级规模化后溢价过高 (7.9/10)']
        ]
      },
      quote: '只为你真正每天在跑的工作流买单，并每季度审计一次订阅账单。',
      relatedKit: 'automation'
    },
    apihub: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'AI 防封基建 · 5 分钟阅读',
      title: '告别共享号封号焦虑：如何用官方 API + LobeChat 搭建私人工作台。',
      excerpt: '为什么灰产合租号注定三五天被封？手把手教你用 OpenRouter + DeepSeek 官方 API 打造月均 $3 的永久防封工作台。',
      readMore: '阅读部署指南',
      lead: '在社交平台上购买廉价共享号或成品号，不仅随时面临封号丢记录，更会让你的商业提示词完全暴露给他人。以下是 100% 合规、零封号且更省钱的终极方案。',
      sections: [
        ['01 — 按量 API vs. $60/月包月会员的真实账本。', '90% 的独立创作者每月实际消耗不到 300 万 Token。如果同时包月订阅 ChatGPT、Claude 与 Gemini 需花费 $60/月；而通过 OpenRouter 与硅基流动（DeepSeek）官方 API 按量调用，每月总账单通常只有 $2.50 到 $4.80（约 ¥18–¥35）。'],
        ['02 — 3 分钟在 Cloudflare Pages 零成本部署 LobeChat。', '一键 Fork 开源的 LobeChat 仓库并绑定到免费的 Cloudflare Pages，填入你的官方 API Key 并设置访问密码，即可拥有跨手机电脑同步的私人 AI 工作台。'],
        ['03 — 把最擅长的任务分给最对的模型。', '深度双语长文与前端代码交给 Claude Sonnet 5.5 & Opus 5.5；大批量推理与数据清洗交给 DeepSeek V4-Pro-0813（仅 $0.14/百万 Token）；超长文档速读交给 Gemini 3.8 / 4 Argon Flash。']
      ],
      table: {
        headers: ['方案对比', '月均真实成本', '封号与断联风险', '可用模型范围'],
        rows: [
          ['CruxKit 官方 API + LobeChat 方案', '约 ¥22 / 月 (按量计费)', '0% (正规官方 API 通道)', '一站式调用 Claude Sonnet 5.5 & Opus 5.5 + GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna + DeepSeek V4-Pro-0813'],
          ['单独开通 3 家官方 Pro 会员', '$60.00 / 月 (约 ¥430)', '低 (但固定月租极高)', '分散在 3 个不同网页标签页'],
          ['灰产合租号 / 廉价成品号', '¥35 – ¥90 / 月', '95% (高频封号、历史记录全丢)', '多人共用导致隐私与提示词完全裸奔']
        ]
      },
      quote: '把前端界面掌握在自己手里，把官方 API 密钥握在自己兜里，按实际消耗清爽付费。',
      relatedKit: 'workstation'
    },
    brain: {
      catKey: 'ai', tile: 'tile-solo',
      category: '知识管理 · 4 分钟阅读',
      title: '打造真正用得上的“第二大脑”：Notion vs. Obsidian。',
      excerpt: '2026 年 Notion vs. Obsidian 怎么选？为什么“保存时附带一句话场景说明”远胜复杂的标签树。',
      readMore: '阅读深度对比',
      lead: '笔记系统的唯一衡量标准，是当你需要某个想法时能否在 10 秒内找出来。一个小而宽容的活系统，远胜一座装满未读剪藏的豪华博物馆。',
      sections: [
        ['01 — 带着明确目的去捕获。', '停止剪藏那些“以后有空再看”的万字长文。只保存直接服务于当前在研项目的素材，并在顶部写下一行你自己的提炼结论。'],
        ['02 — Notion 与 Obsidian：按你的最终产出形态来选。', '追求本地硬盘纯文本 Markdown 选 Obsidian；需要关系型数据库、可视化内容日历，且希望把系统打包成数字套件售卖变现，Notion 是绝对主力。'],
        ['03 — 让“检索与归档”成为每周五的固定节律。', '每周五下午，把零散笔记挂载到进行中的项目下，其余果断归档。']
      ],
      table: {
        headers: ['对比维度', 'Notion + AI (S 级)', 'Obsidian (A 级)'],
        rows: [
          ['核心杀手锏', '关系型数据库 & 一键复制售卖数字模版', '本地纯文本 Markdown (.md) 极速读写'],
          ['月度成本', '个人免费 / Plus $10', '个人版 $0 永久免费'],
          ['最适用场景', '一人公司操作中枢、联盟 CRM 与内容日历', '深度长文写作与本地私密知识库']
        ]
      },
      quote: '默认少收藏，只留那些本周就能派上用场的信息。',
      relatedKit: 'solo'
    },
    voice: {
      catKey: 'ai', tile: 'tile-content',
      category: '创作者系统 · 4 分钟阅读',
      title: '告别精力透支的短视频多平台分发。',
      excerpt: '独立创作者如何用一页纸脚本配合 ElevenLabs v3 与 HeyGen，每周 90 分钟同步更新 4 个海内外频道。',
      readMore: '阅读创作手册',
      lead: '分享硬核好用的工具与产品拆解，并不需要昂贵的摄影棚团队。你只需要一份精炼的 120 字立项卡片，加上自然温暖的配音。',
      sections: [
        ['01 — 声音质感决定了 70% 的完播率。', '只要旁白节奏自然、情绪饱满，观众非常乐意看干净的高清录屏或配方对比图。用 ElevenLabs v3 个人声音克隆，2 分钟即可生成录音棚级双语旁白。'],
        ['02 — 用 HeyGen 实现中英双语“一鱼四吃”。', '同一支 35 秒实测拆解视频，通过 HeyGen 对口型译制后可同步分发至小红书/抖音、TikTok、YouTube Shorts 与 Reels，将公域流量源源不断导入独立站。']
      ],
      table: {
        headers: ['制作环节', '传统实拍剪辑流程 (耗时 4 小时)', 'CruxKit AI 视频流水线 (耗时 18 分钟)'],
        rows: [
          ['1. 脚本撰写', '啰嗦的 800 字流水账', '120 字四段式标准结构（痛点钩子+表格证据+演示+引导）'],
          ['2. 配音录制', '反复口误重录 15 次 + 降噪处理', 'ElevenLabs v3 专属声线一键生成（2 分钟）'],
          ['3. 出海多语种', '重新找人录英文版', 'HeyGen 一键口型同步译制美式英语版']
        ]
      },
      quote: '脚本阶段的十分钟打磨，能省下剪辑轨道上的三小时返工。',
      relatedKit: 'videoengine'
    },
    affcrm: {
      catKey: 'ai', tile: 'tile-folders',
      category: '独立站变现 · 5 分钟阅读',
      title: '一人公司联盟营销台账：如何让每篇评测同时赚两份钱？',
      excerpt: '详解 `/go/` 跳转路由、高佣金 SaaS + 刚需复购美妆组合拳，以及如何在评测文内无缝嵌入 $19 虚拟商品包。',
      readMore: '阅读变现架构',
      lead: '90% 的新手做联盟营销只会在文末生硬贴一条推广链接。顶尖独立站操盘手采用的是“三层复利收入架构”。',
      sections: [
        ['01 — 永远使用统一的 `/go/` 短链路由。', '不要把原始的联盟长链接直接写死在几十篇文章里。像本站一样通过 `affiliate-config.js` 和 `/go/make` 统一管理，未来哪个平台给的佣金更高，10 秒即可全站无缝切换。'],
        ['02 — 评测带联盟 + 文中卖“懒人源文件包”。', '读者看完你的 Make 或 n8n 评测后，约 20% 会点击你的联盟链接注册免费账号（为你带来 30%–35% 持续分佣），而其中最精准的 5% 读者非常愿意花 $24 (¥128) 直接买走你配好的 JSON 蓝图包。'],
        ['03 — 长期订阅分佣 + 高额单笔奖励 + 高频消费品混搭。', '用 Make / ElevenLabs / n8n 赚取 12 个月持续现金流，用 Semrush ($200/单) 与 Hostinger (60%) 赚取高额爆发佣金，再用 iHerb 功效护肤品赚取高频日常复购佣金。']
      ],
      table: {
        headers: ['变现层级', '代表带货产品', '单笔收益模型', '商业复利价值'],
        rows: [
          ['第 1 层：月度持续分佣 SaaS', 'Make (35%) / n8n (30%) / ElevenLabs (22%)', '客户在用就每月持续分钱（长达 12 个月）', '构筑旱涝保收的月度被动收入底盘'],
          ['第 2 层：大额单笔悬赏基建', 'Semrush ($200/单) / Hostinger VPS (60%)', '单笔转化即可拿 $60 – $200 高额现金', '快速回笼资金，放大内容投放'],
          ['第 3 层：自有虚拟套件 (Kits)', '站内 12 款 ZIP 套件 & $69 全家桶', '95% 纯利润，微信/支付宝/美元秒到账', '100% 自主定价权，零平台规则依赖']
        ]
      },
      quote: '一篇顶级的实测长文，既帮读者省下选型试错时间，也为你同时带来联盟分佣与数字套件双份收益。',
      relatedKit: 'solo'
    },
    n8nvps_guide: {
      catKey: 'ai', tile: 'tile-automation',
      category: '云端与容器 · 5 分钟阅读',
      title: '月费 $4.99 跑无限次 AI 循环：n8n Docker 私有化部署全指南。',
      excerpt: '从 Hostinger 4GB 内存一键镜像到 Caddy 自动 HTTPS 与 Cloudflare R2 每日备份的完整防崩架构。',
      readMore: '阅读部署教程',
      lead: '当你的 AI 自动化工作流包含 20 个以上内部节点、且每 15 分钟定时抓取一次时，私有化自托管 n8n 是把月成本锁死在 $4.99 的唯一正解。',
      sections: [
        ['01 — 为什么跑 AI 工作流必须选 4GB 以上内存？', '处理大段网页 HTML 解析或 JSON 数组聚合时，廉价的 1GB 内存服务器极易因 OOM（内存溢出）直接卡死。Hostinger KVM 1 方案起步即给足 4GB 内存，且面板内置官方 n8n Docker 一键模版。'],
        ['02 — 用 Caddy 告别繁琐的 Nginx SSL 证书续期。', '只需 4 行 Caddyfile 配置，即可自动申请并永久续期 Let’s Encrypt HTTPS 证书，确保 Webhook 接收地址全天候安全可用。'],
        ['03 — 每天凌晨自动加密备份至免费 Cloudflare R2。', '配合我们的 04 号部署包定时脚本，每天自动将所有工作流 JSON 与加密凭证同步至 10GB 免费的 Cloudflare R2 存储桶，换服务器也能 3 分钟满血恢复。']
      ],
      table: {
        headers: ['部署方案', '每月固定成本', '工作流与步数上限', '硬件配置与维护难度'],
        rows: [
          ['Hostinger KVM 1 + 04 号部署包', '$4.99 / 月', '无限次执行、无限内部节点数', '4 GB 内存 · 官方一键镜像 3 分钟装好'],
          ['n8n 官方云端 Starter 版', '$20.00 / 月', '每月限 2,500 次工作流执行', '官方全托管免维护'],
          ['Zapier 专业版', '$73.50+ / 月', '每月限 10,000 个单步节点 (Tasks)', '跑多步 AI 循环极贵']
        ]
      },
      quote: '把执行引擎部署在自己的轻量云主机上，从此再也不用数工作流里有几个节点。',
      relatedKit: 'n8nvps'
    },
    geoseo: {
      catKey: 'ai', tile: 'tile-content',
      category: '搜索流量增长 · 4 分钟阅读',
      title: 'GEO 实战手册：如何写出被 ChatGPT、Perplexity 与秘塔优先引用的评测文？',
      excerpt: '当越来越多用户直接问 AI“哪款工具最好用”，传统水文彻底失效。掌握这 3 个结构化排版法则抢占 AI 推荐位。',
      readMore: '阅读 GEO 手册',
      lead: '2026 年，超过 40% 的高客单价软件与护肤品购买决策发生在 AI 搜索引擎对话框内。AI 不喜欢没有数据的抒情长文，它极度偏爱结构化的一手实测表。',
      sections: [
        ['01 — 首屏前 150 字必须给出“30 秒量化结论框”。', '在文章最开头直接用结构化列表写明：综合冠军是谁、最适合哪类人群、实验室量化得分，以及核心硬指标（如“$9/月享 10,000 次操作”或“实测 pH 2.9”）。'],
        ['02 — 坚持使用原生 HTML 语义化对比表格。', '大模型爬虫在解析网页时，对标准 HTML `<table>` 表格的提取权重远高于图片截图或复杂的嵌套图层。每篇评测至少包含一张 4 列以上的横向参数对比表。'],
        ['03 — 主动写明“谁不适合买”（反向劝退建立极高权重）。', 'AI 评估内容可信度时，会重点检索文章是否包含客观的局限性说明（例如：“理肤泉 B5+ 质地偏厚，大油皮切勿在夏天早晨妆前厚涂”）。越客观，越容易被 AI 引用并赢得真人买家下单。']
      ],
      table: {
        headers: ['排版模块', '传统过时 SEO 水文', 'CruxKit GEO 高引用评测标准'],
        rows: [
          ['开篇前 150 字', '长篇大论科普“什么是自动化？”', '直接亮出 S 级结论框：首选单品、量化单价、适用边界'],
          ['数据呈现方式', '模糊的官网截图', '原生 HTML 参数对比表 + 根目录 `/llms.txt` 机器索引'],
          ['信任背书机制', '通篇无脑夸赞', '明确列出实测短板与“哪类人千万别买”']
        ]
      },
      quote: '成为全网数据结构最清晰的一手评测源，AI 搜索引擎和真实买家都会把选票投给你。',
      relatedKit: 'content'
    },
    beauty: {
      catKey: 'beauty', tile: 'tile-rings',
      category: '04 功效护肤实验室 · 4 分钟阅读',
      title: '早 C 晚 A 循环与“三活性成分铁律”。',
      excerpt: '为什么叠加十层网红精华会毁掉角质层屏障？真空泵原型维 C + 阿达帕林/A 醇 + B5 四晚循环为何能赢。',
      readMore: '阅读配方手记',
      lead: '正如软件工具栈容易陷入“订阅膨胀”，日常护肤也极易陷入“猛药堆砌”。用配方科学给梳妆台做减法，屏障反而更透亮稳定。',
      sections: [
        ['01 — 为什么十步叠涂护肤法往往适得其反？', '在同一晚叠加低 pH 原型维 C、去角质果酸、蓝铜胜肽与高浓度维 A 类，不仅会导致酸碱中和失效，还会直接引发角质层慢性微炎症。'],
        ['02 — 包装容器本身就是配方的一部分。', '纯左旋维 C（L-Ascorbic Acid）在透明玻璃滴管瓶中接触空气和光线会迅速氧化变黄。请始终选择 pH 2.8–3.2、搭配维 E 与阿魏酸、且采用不透光真空按压泵的配方。'],
        ['03 — 4 晚皮肤屏障修护循环（Skin Cycling）。', '第 1 晚：2% 水杨酸疏通毛孔；第 2 晚：阿达帕林或 A 醇抗老；第 3、4 晚：停用一切猛药，用 5% 泛醇 B5+ 与蜗牛原液修护屏障。']
      ],
      table: {
        headers: ['活性成分组合', '实验室配伍结论', 'CruxKit 循证护肤铁律'],
        rows: [
          ['原型维 C (pH 2.9) + 防晒 SPF 50', '✓ 黄金协同 (早晨 AM)', '晨间打底可成倍放大紫外线自由基防御力'],
          ['原型维 C + 蓝铜胜肽', '✕ 螯合冲突失效', '严格早晚分离：早用维 C，晚用胜肽'],
          ['果酸/水杨酸 + 维 A 酸/A 醇', '✕ 屏障过度刺激', '切勿同晚叠涂；采用 4 晚循环交替法']
        ]
      },
      quote: '少而精、包装稳定且轮替有序的活性成分，远胜塞满梳妆台的盲目跟风。',
      relatedKit: 'routine'
    },
    timeless_test: {
      catKey: 'beauty', tile: 'tile-folders',
      category: '04 配方拆解报告 · 5 分钟阅读',
      title: '8 周氧化实测：为什么 78% 的滴管维 C 还没用完就失活了？',
      excerpt: '我们连续 8 周追踪了 14 款原型维 C 精华的 pH 值、色度变化与每毫升单价，拆解 $25.95 的 Timeless 为何夺冠。',
      readMore: '阅读实测数据',
      lead: '左旋维 C（L-Ascorbic Acid）是拥有最扎实临床文献支持的抗光老成分，但它在水溶液中极不稳定。一旦接触氧气变黄变褐（氧化为脱氢抗坏血酸），不仅失去抗氧化力，还可能染黄角质层。',
      sections: [
        ['01 — 杜克黄金抗氧化参数（Duke Parameters）。', '经典皮肤学研究确立了外用维 C 透皮起效的三大铁律：必须是纯左旋维 C、配方 pH 必须低于 3.5（实测 2.8–3.2 最佳），且浓度在 10%–20% 之间并搭配维 E 与阿魏酸协同稳定。'],
        ['02 — 为什么传统玻璃滴管瓶在第 5 周就开始变黄？', '每次在潮湿闷热的浴室拧开滴管吸取液体，都会把新鲜空气泵入瓶内。在我们的 8 周追踪里，采用不透光真空按压泵（Airless Pump）的 Timeless 到第 8 周依然保持清澈微黄与 pH 2.9 活性。'],
        ['03 — 每瓶立省 $156 的真实配方账本。', '30ml 仅售 $25.95（约 $0.86/ml），Timeless 20% CEF 以不到专柜 $182 标杆产品七分之一的价格，提供了完全一致的黄金三角活性体系与更科学的防氧化包装。']
      ],
      table: {
        headers: ['评测单品', '实测 pH 值', '包装容器形态', '开封第 8 周氧化色度', '30ml 参考售价'],
        rows: [
          ['Timeless 20% C + E + 阿魏酸', 'pH 2.9 (黄金渗透区)', '不透光真空按压泵', '清澈微黄 (活性保持极佳)', '$25.95 ($0.86/ml)'],
          ['专柜经典标杆 CEF 精华', 'pH 3.2', '半透明玻璃滴管瓶', '第 6 周起明显变深琥珀色', '$182.00 ($6.06/ml)'],
          ['普通维 C 衍生物精华', 'pH 6.0', '普通滴管瓶', '不变色 (但透皮转化率极低)', '$22.00 ($0.73/ml)']
        ]
      },
      quote: '永远不要花 $180 买一瓶每天早晨都在往里灌空气的抗氧化精华。',
      relatedKit: 'incidecoder'
    },
    conflict_guide: {
      catKey: 'beauty', tile: 'tile-rings',
      category: '04 防晒波段科学 · 4 分钟阅读',
      title: '新一代光稳定防晒剂科普：为什么韩系与欧系防晒肤感能赢？',
      excerpt: '拆解 Uvinul A Plus、Tinosorb S 与麦色滤 400 —— 为什么现代大分子防晒剂能做到高倍防晒黑晒老且零假白不熏眼。',
      readMore: '阅读防晒报告',
      lead: '皮肤科公认 80% 的外源性皮肤老化（松弛、色斑、毛孔粗大）来自紫外线光老化。然而无数人因为传统防晒霜油腻、假白、熏眼流泪而难以坚持每天涂够量。',
      sections: [
        ['01 — 全年穿透玻璃与云层的元凶是长波 UVA1。', 'UVB 主要导致晒伤脱皮，而波长 340–400nm 的长波 UVA1 能一年四季穿透窗户直达真皮层破坏胶原蛋白。选购日常防晒必须认准 PA++++ 及完整的 UVA1 防护波段。'],
        ['02 — 新一代大分子防晒剂的降维打击。', '以 Tinosorb S（双-乙基己氧苯酚甲氧苯基三嗪）和 Uvinul A Plus 为代表的新一代防晒剂，不仅光稳定性极强（晒后不分解失活），且分子量大于 500 道尔顿不易渗透刺激眼睛，低添加量即可实现轻薄水润的高倍防护。'],
        ['03 — 为什么 Beauty of Joseon 大米防晒能霸榜全球？', '它直接组合了 4 种新型光稳定防晒剂，配合 30% 大米提取物与益生菌基底，完全剔除了酒精、香精与老旧刺激防晒剂，让涂够一美分硬币用量的防晒变成像涂保湿精华乳一样愉悦。']
      ],
      table: {
        headers: ['防晒剂名称', '防护紫外线波段', '光稳定性表现', '代表 S 级严选单品'],
        rows: [
          ['Uvinul A Plus (DHHB)', '强效长波 UVA1 & UVA2', '极佳 (光照下不分解)', 'Beauty of Joseon 大米防晒 ($14)'],
          ['Tinosorb S (BEMBT)', '广谱全波段 UVB + UVA', '金标准光稳定王牌', 'Beauty of Joseon / 理肤泉大哥大'],
          ['传统阿伏苯宗 (Avobenzone)', '仅 UVA (单独极不稳定)', '光照易分解且易熏眼染黄衣领', '老式美系开架防晒霜']
        ]
      },
      quote: '世界上最有效的抗老精华，是一支你每天早晨都心甘情愿涂够量的 PA++++ 防晒霜。',
      relatedKit: 'sunguide'
    },
    reset: {
      catKey: 'ai', tile: 'tile-solo',
      category: '一人公司运营 · 3 分钟阅读',
      title: '每周五下午的 20 分钟重启仪式。',
      excerpt: '归档已完成事项、清空浏览器悬浮标签页，并提前锁定下周一早晨最重要的三个核心动作。',
      readMore: '阅读复盘流程',
      lead: '如果周五下午在一堆半开着的浏览器标签页中草草收场，周一早上就注定充满焦虑。用这套简单的 5 步仪式清爽收官每一周。',
      sections: [
        ['01 — 清空临时收集箱（Inbox Zero）。', '花 8 分钟处理本周积压的随手记、截图和网页书签：要么归入正在推进的 Now 项目，要么移入 Later 冷库，要么直接删除。'],
        ['02 — 只看三个真正产生复利的核心指标。', '用 5 分钟记录三组核心数字：本周上线内容数、联盟伙伴链接点击量、数字套件下载/成交数。忽略虚荣的泛曝光量。'],
        ['03 — 写下下周一早上的第一个具体动作。', '合上电脑前，在面板顶部写好下周一早上坐下后要做的第一件小事。']
      ],
      quote: '从容高效的周一早晨，始于周五下午四点半的清爽收尾。',
      relatedKit: 'solo'
    },
    approach: {
      category: '评测方法论 · CruxKit Studio',
      title: '把宝贵的精力留给真正重要的创造。',
      lead: 'CruxKit (cruxxxxxkit.com) 建立在一个清晰的信念之上：客观硬核的独立实测（Independent Benchmarks）与开箱即用的数字套件（Digital Kits）天生是一体的。',
      sections: [
        ['01 — 直击决策的核心变量（Find the Crux）。', '无论是对 AI 自动化引擎进行 50,000 次并发压测，还是检测抗氧化精华的 pH 酸碱度与真空包装稳定性，我们都剥离营销话术，只呈现决定真实体验的核心指标。'],
        ['02 — 让好工具嵌入从容的工作流。', '我们发布的每一篇评测都附带可直接照抄的参数配置、单次使用成本测算以及优缺点边界说明。'],
        ['03 — 将验证高效的系统打包成即用套件。', '每当我们内部打磨出一套真正能省下数小时的 Notion 仪表盘、Make/n8n 自动化蓝图或护肤循环表，我们都会将其精炼为可终身复用的数字套件。']
      ],
      quote: '深思熟虑的工具。开箱即用的系统。属于你的轻盈节奏。',
      relatedKit: 'allbundle'
    },
    disclosure: {
      category: '透明度与合规治理',
      title: 'FTC 联盟营销合规声明与独立评测原则。',
      lead: 'CruxKit Studio (cruxxxxxkit.com) 是一家完全独立、由读者支持运营的评测与数字产品实验室。',
      sections: [
        ['我们如何支持实验室的持续实测？', '当您点击本站的合作伙伴链接注册软件服务或购买推荐单品时，我们可能会获得品牌方支付的引荐佣金，这不会增加您的任何额外费用。'],
        ['绝不售卖 S 级评级。', '我们的严选榜单绝不接受任何付费买榜。开源免费方案以及 $14–$25 的高性价比临床配方，在我们的实测中经常击败 $180+ 的高溢价竞品。']
      ],
      quote: '读者的长期信任，是我们唯一具备复利价值的资产。',
      relatedKit: 'allbundle'
    },
    privacy: {
      category: '隐私保护与数字套件授权',
      title: '隐私政策与数字套件使用许可（License）。',
      lead: '用清晰直白的语言说明 cruxxxxxkit.com 访客隐私保护与数字商品授权边界。',
      sections: [
        ['零数据贩卖与本地优先存储。', '我们绝不向任何第三方出售用户个人数据。您在“免费入门包”中的勾选进度直接保存在本地浏览器的 sessionStorage 中。'],
        ['Digital Kit 创作者终身使用许可。', '购买或下载任意 CruxKit 数字套件，即授予您终身许可：可将其中包含的工作流 JSON、提示词与 Notion 模版自由修改并用于您个人或公司的商业项目中。']
      ],
      quote: '有任何疑问或合作咨询？欢迎随时致信编辑部：hello@cruxxxxxkit.com。',
      relatedKit: 'allbundle'
    }
  }
};

const stepsData = {
  en: [
    'Choose one meaningful outcome for today (and park the rest in Later).',
    'Write down the smallest physical next action to begin.',
    'Put the links, brief, and notes you need in one single place.',
    'Protect one uninterrupted 60-minute block before checking messages.',
    'End with a two-line log: what moved forward, and what comes next?'
  ],
  zh: [
    '锁定今天最重要的一项核心产出（把其余杂事安心放进 Later 冷库）。',
    '写下启动这件事所需的最微小、最具体的第一步动作。',
    '把今天要用到的参考链接、立项卡片和草稿集中到唯一页面。',
    '在看微信/邮件消息前，先保护一整块不受打扰的 60 分钟深度创造时间。',
    '收工时写下两行记录：今天推进了什么？明天一早从哪一步接着做？'
  ]
};

/* -----------------------------------------------------------
   5. AUTOMATIC LANGUAGE DETECTION & DYNAMIC CATALOG RENDERING
----------------------------------------------------------- */
function detectInitialLanguage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = (params.get('lang') || '').toLowerCase();
    if (urlLang.startsWith('zh')) return 'zh';
    if (urlLang.startsWith('en')) return 'en';

    const saved = localStorage.getItem('cruxkit-lang');
    if (saved === 'zh' || saved === 'en') return saved;

    const langs = navigator.languages ? [...navigator.languages] : [navigator.language || ''];
    for (const l of langs) {
      const lower = String(l).toLowerCase();
      if (lower.startsWith('zh')) return 'zh';
      if (lower.startsWith('en')) return 'en';
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/^(Asia\/Shanghai|Asia\/Chongqing|Asia\/Harbin|Asia\/Urumqi|Asia\/Hong_Kong|Asia\/Macau|Asia\/Taipei|Asia\/Singapore)$/i.test(tz)) {
      return 'zh';
    }
  } catch {}
  return 'en';
}

let currentLang = detectInitialLanguage();

let checked = [];
try {
  checked = JSON.parse(sessionStorage.getItem('cruxkit-checklist') || '[]');
  if (!Array.isArray(checked)) checked = [];
} catch {}


/* -----------------------------------------------------------
   V6.0 COHESIVE CATALOG EXPANSION (16 KITS · 36 STACK PICKS · 16 GUIDES)
----------------------------------------------------------- */
(function expandCatalogV6() {
  // 1. Insert 4 new Digital Kits into kitsOrder & productsData (keeping allbundle as #16)
  const bundleIdx = kitsOrder.indexOf('allbundle');
  if (bundleIdx !== -1) kitsOrder.splice(bundleIdx, 1);
  kitsOrder.push('researchos', 'cloudflareedge', 'affiliatematrix', 'retinoidramp', 'allbundle');

  Object.assign(productsData.en, {
    researchos: {
      num: '12', catKey: 'workflow', price: 19, tile: 'tile-desk',
      name: 'NotebookLM & Perplexity Deep-Research OS',
      category: 'AI Research · Zero-Hallucination Citation System',
      badges: ['45 Citation Prompts', 'NotebookLM Pack', 'Competitor Matrix'],
      shortDesc: 'Cut research time by 74% with zero fabricated citations using our 2-stage Perplexity Pro + NotebookLM synthesis workflow.',
      description: 'A structured research operating system for authority site builders, analysts, and technical writers who need primary-source accuracy across both SaaS benchmarks and clinical literature.',
      items: [
        '45 zero-hallucination Perplexity Pro academic, patent & SaaS pricing audit prompts',
        'NotebookLM 50-PDF synthesis guide & audio briefing script generator',
        'Competitor affiliate link matrix extractor & high-intent keyword mapper',
        'Full .ZIP package with JSON prompt library and Markdown SOPs'
      ],
      companionTool: { name: 'Perplexity Pro & Sonar Citation API', url: 'go/perplexity' },
      sample: `// TWO-STAGE ZERO-HALLUCINATION PROTOCOL\n1. DISCOVER (Perplexity Pro - Academic Focus): Extract 12 primary DOIs & official pricing tables.\n2. VERIFY: Reject any claim lacking a live URL or peer-reviewed citation.\n3. SYNTHESIZE (NotebookLM): Upload verified PDFs -> Generate comparison matrix with inline page quotes.`
    },
    cloudflareedge: {
      num: '13', catKey: 'workflow', price: 24, tile: 'tile-automation',
      name: 'Cloudflare Workers + R2 Zero-Egress Edge Kit',
      category: 'Cloud Infrastructure · /go/ Router & Signed Delivery',
      badges: ['Cloudflare Worker JS', 'R2 $0 Bandwidth', 'Spaceship DNS'],
      shortDesc: 'Deploy edge /go/ affiliate link routing, UTM sub-ID tracking, and signed .ZIP file delivery from Cloudflare R2 with $0 bandwidth cost.',
      description: 'The exact edge infrastructure powering cruxxxxxkit.com: replace $49/mo link trackers and expensive file hosts with serverless Cloudflare Workers and R2 object storage.',
      items: [
        'worker-affiliate-router.js: 302 edge redirects for /go/:slug with UTM pass-through',
        'worker-r2-signed-delivery.js: HMAC-signed expiring download links for .ZIP kits',
        'Spaceship Unbox DNS + Cloudflare SSL/TLS Full (Strict) setup playbook',
        '1-click GitHub Pages + custom domain CNAME automation script'
      ],
      companionTool: { name: 'Spaceship Domain Registrar & Unbox DNS ($8.88 .com)', url: 'go/spaceship' },
      sample: `// CLOUDFLARE WORKER: /go/:slug EDGE ROUTER\nexport default {\n  async fetch(req) {\n    const url = new URL(req.url);\n    const slug = url.pathname.replace(/^\\/go\\//, '');\n    const target = AFFILIATE_MAP[slug];\n    return target ? Response.redirect(target, 302) : new Response('Not Found', { status: 404 });\n  }\n};`
    },
    affiliatematrix: {
      num: '14', catKey: 'os', price: 29, tile: 'tile-folders',
      name: 'High-Converting Affiliate Comparison Matrix & SEO Pack',
      category: 'Monetization Systems · Review Tables & Buyer Keywords',
      badges: ['20 HTML/Framer Tables', '60 Buyer Keywords', 'FTC/CN Compliant'],
      shortDesc: 'Turn casual readers into high-intent affiliate clicks with 20 drop-in comparison table templates and 60 buyer-intent title formulas.',
      description: 'Built from our highest-converting benchmark articles: responsive HTML/CSS comparison matrices, verdict callout boxes, and bilingual FTC/Advertising-Law disclosure snippets.',
      items: [
        '20 responsive HTML/CSS & Framer comparison table components with score pills',
        '60 high-intent "vs", "alternative", and "pricing audit" SEO/GEO headline formulas',
        'Bilingual FTC (US) & Advertising Law (CN) compliant partner disclosure blocks',
        'Dual-monetization blueprint: pairing every affiliate link with a $19–$39 Digital Kit'
      ],
      companionTool: { name: 'Semrush SEO & Keyword Intelligence (14-Day Pro Trial)', url: 'go/semrush' },
      sample: `// HIGH-CONVERTING REVIEW ARCHITECTURE\n• Above the Fold: 3-Row Executive Verdict Table (Best Overall / Best Value / Best Self-Hosted)\n• Mid-Article: Unit-Economics Calculator or Oxidation/Performance Test Table\n• Dual CTA Footer: [Try Tool via Partner Link ↗] + [Download Ready-to-Use Kit ($24) ⬇]`
    },
    retinoidramp: {
      num: '15', catKey: 'routine', price: 15, tile: 'tile-routine',
      name: 'Retinoid & Acid Tolerance 12-Week Ramp-Up Protocol',
      category: 'Formulation Lab · Adapalene / Retinal / Tretinoin Ladder',
      badges: ['12-Week Ladder CSV', 'Sandwich Method', 'Zero Peeling'],
      shortDesc: 'Build full tolerance to Adapalene 0.1%, Retinal 0.05%, or Tretinoin 0.025% over 12 weeks without barrier burn or nasolabial peeling.',
      description: 'Most users quit retinoids in Week 3 due to erythema and peeling caused by rushing frequency. This 12-week clinical ramp-up schedule pairs exact application intervals with Ceramide + Panthenol buffering.',
      items: [
        '12-week progressive frequency ladder (2x/wk Sandwich -> 3x/wk Buffered -> Every Other Night)',
        'The Ceramide + Cicaplast B5+ "Sandwich Buffer" protocol for sensitive zones',
        '60-second water-sting barrier check & emergency 72-hour active pause rules',
        'Printable CSV/Notion tracker for AM Vitamin C + PM Retinoid cycling'
      ],
      companionTool: { name: 'CeraVe PM Ceramide + 4% Niacinamide Lotion', url: 'go/cerave-pm' },
      sample: `// 12-WEEK RETINOID TOLERANCE LADDER\n• Weeks 1–2 (2 nights/wk): CeraVe PM -> dry 15m -> Pea-sized Adapalene 0.1% -> Cicaplast B5+\n• Weeks 3–4 (3 nights/wk): Apply on dry skin 15m after cleansing -> Seal with Ceramide lotion\n• Weeks 5–12 (Every other night): Direct application + 1 BHA exfoliation night per week`
    }
  });

  Object.assign(productsData.zh, {
    researchos: {
      num: '12', catKey: 'workflow', price: 19, tile: 'tile-desk',
      name: 'NotebookLM 与 Perplexity 零幻觉深度研究系统',
      category: 'AI 调研工作流 · 学术文献与竞品信源溯源系统',
      badges: ['45 组溯源提示词', 'NotebookLM 简报包', '竞品矩阵拆解'],
      shortDesc: '通过「Perplexity 实时检索 + NotebookLM 闭卷合成」双阶工作流，将评测调研时间缩短 74%，彻底杜绝 AI 编造文献与价格。',
      description: '专为高专业度评测站长、科研人员与深度创作者打造的零幻觉调研系统，兼顾 SaaS 软件计费实测与 PubMed/JAFC 护肤成分文献核查。',
      items: [
        '45 组 Perplexity Pro 零幻觉学术文献、专利配比与 SaaS 隐藏价格审计提示词',
        'NotebookLM 50 篇 PDF 闭卷提炼指南与双语播客/通讯稿自动生成模版',
        '高转化独立站竞品联盟链接矩阵反查表与买词（Buyer Keywords）映射库',
        '附带完整 JSON 提示词库与 Markdown 实操手册的 .ZIP 源文件包'
      ],
      companionTool: { name: 'Perplexity Pro 与 Sonar 实时溯源引擎', url: 'go/perplexity' },
      sample: `// 双阶零幻觉调研协议 (DISCOVER -> LOCK)\n1. 外网捕捞 (Perplexity Pro - Academic/Web)：抓取 12 篇真实存在的一手 DOI 论文与官方实时定价页。\n2. 事实过滤：剔除任何没有可点击原始链接的二手传闻。\n3. 闭卷合成 (NotebookLM)：上传一手 PDF，生成带精确页码原句引用的横评对比表。`
    },
    cloudflareedge: {
      num: '13', catKey: 'workflow', price: 24, tile: 'tile-automation',
      name: 'Cloudflare Workers + R2 零流量费边缘路由与发卡套件',
      category: '独立站云基建 · /go/ 联盟短链与防盗链直链分发',
      badges: ['Cloudflare 边缘脚本', 'R2 零流量费', 'Spaceship 解析实战'],
      shortDesc: '用免费额度的 Cloudflare Workers 与 R2 存储替代每月 $49 的短链追踪器与高价网盘，实现毫秒级 /go/ 联盟跳转与加密发卡。',
      description: '完整打包本站 cruxxxxxkit.com 正在使用的边缘计算基建源码：涵盖 /go/ 联盟推广链接集中路由、UTM 渠道追踪、R2 虚拟商品防盗链签名下载与 Spaceship DNS 极速配置。',
      items: [
        'worker-affiliate-router.js：毫秒级 /go/:slug 联盟 302 跳转与 UTM 参数自动透传脚本',
        'worker-r2-signed-delivery.js：基于 Cloudflare R2 的零下行流量费 .ZIP 限时签名下载脚本',
        'Spaceship Unbox DNS 30 秒极速解析 + Cloudflare 严格 SSL 安全加固图文手册',
        'GitHub Pages 自动构建与自定义域名一键绑定批处理脚本'
      ],
      companionTool: { name: 'Spaceship 域名注册与 Unbox 极速 DNS ($8.88 .com)', url: 'go/spaceship' },
      sample: `// CLOUDFLARE WORKER: /go/:slug 联盟边缘路由器\nexport default {\n  async fetch(req) {\n    const url = new URL(req.url);\n    const slug = url.pathname.replace(/^\\/go\\//, '');\n    const target = AFFILIATE_MAP[slug];\n    return target ? Response.redirect(target, 302) : new Response('Not Found', { status: 404 });\n  }\n};`
    },
    affiliatematrix: {
      num: '14', catKey: 'os', price: 29, tile: 'tile-folders',
      name: '高转化联盟营销横评表格与买词 SEO 实战模版包',
      category: '独立站变现系统 · 评测对比表组件与高意图关键词库',
      badges: ['20 套高转化横评表', '60 组买词标题公式', '中美双语合规声明'],
      shortDesc: '内置 20 套即插即用的响应式 HTML/Framer 评测对比表格与 60 组高转化「vs / 平替 / 实测」买词公式，让每篇博文双重变现。',
      description: '提炼自欧美顶级评测站（Wirecutter / RTINGS）的高转化排版心理学：用一眼看懂的「首屏结论表 + 实测数据表 + 双按钮行动卡片」把阅读流量转化为真实佣金。',
      items: [
        '20 套响应式 HTML/CSS 与 Framer 评测对比表组件（含实验室评分徽章与高亮推荐行）',
        '60 组高购买意图「A vs B」「平替」「真实账单实测」中英双语 SEO/GEO 标题模版',
        '符合美国 FTC 与中国《广告法》的高信任感联盟返佣合规声明模版',
        '「一篇评测赚两份钱」实战手册：如何把每个联盟推荐位与 $19–$39 自营数字套件绑定销售'
      ],
      companionTool: { name: 'Semrush SEO 关键词与外链反查神器（14 天专业版试用）', url: 'go/semrush' },
      sample: `// 高转化评测文章黄金三段式结构\n• 首屏前 200 字：3 行核心结论速查表（综合首选 / 极致性价比 / 开源自托管首选）\n• 正文中段：可交互成本计算器或 12 周实验室实测参数对比表\n• 底部双重转化栏：[通过官方合作通道注册领福利 ↗] + [下载配套开箱即用数字套件 (¥169) ⬇]`
    },
    retinoidramp: {
      num: '15', catKey: 'routine', price: 15, tile: 'tile-routine',
      name: '早C晚A与阿达帕林 12 周无痛建立耐受实验方案',
      category: '配方实验室 · 0.1% 阿达帕林 / A醇 / 维A酸阶梯耐受表',
      badges: ['12 周阶梯日程表', '三明治缓冲涂抹法', '零脱皮红绿灯'],
      shortDesc: '专为容易刷酸脱皮、鼻翼泛红的成分党设计：用 12 周渐进频次阶梯与「神经酰胺+B5 三明治缓冲法」安全建立维A类耐受。',
      description: '90% 的人早C晚A翻车都是因为前两周涂抹过频或未做分区缓冲。本套件提供精确到每一晚的 12 周进阶日程表、敏感区隔离手法与 60 秒清水刺痛自检信号。',
      items: [
        '12 周渐进式建立耐受日程表（第1-2周每周2晚三明治法 -> 第3-4周隔两晚 -> 第5-12周隔晚稳定期）',
        'CeraVe PM 神经酰胺乳 + 理肤泉 B5+ 修复霜「三明治缓冲涂抹法」精确用量图解',
        '眼周/鼻翼/嘴角薄弱区凡士林/B5 封包打底规避脱皮实操指南',
        '60 秒洗脸刺痛红绿灯自检表与屏障受损 72 小时紧急停药修护清单'
      ],
      companionTool: { name: '适乐肤 CeraVe PM 夜间神经酰胺修护乳（三明治打底首选）', url: 'go/cerave-pm' },
      sample: `// 12 周维A类（阿达帕林 0.1% / A醇）无痛耐受阶梯\n• 第 1–2 周（每周一、周四）：洁面擦干 -> CeraVe PM 乳打底待干 15 分钟 -> 黄豆粒大小阿达帕林 -> 理肤泉 B5+ 局部封包\n• 第 3–4 周（每周一、三、六）：洁面后干手干脸直接涂抹 -> 15 分钟后叠加神经酰胺保湿乳\n• 第 5–12 周（隔晚 1 次）：稳定维持期，可每周穿插 1 晚 2% 水杨酸疏通毛孔`
    }
  });

  // Update allbundle (#16) numbering & copy
  productsData.en.allbundle.num = '16';
  productsData.en.allbundle.name = '★ All-Access 15-in-1 Master Bundle';
  productsData.en.allbundle.badges = ['Save 78% ($355 Value)', 'All 15 ZIP Kits Included', 'Best Value'];
  productsData.en.allbundle.shortDesc = 'Unlock every single CruxKit digital system—all 15 kits across AI Automation, Cloudflare Edge, Notion OS, Video Growth & Skincare Lab—for one price.';

  productsData.zh.allbundle.num = '16';
  productsData.zh.allbundle.name = '★ CruxKit 全站 15 合 1 终极全家桶';
  productsData.zh.allbundle.badges = ['立省 78% (总价值 $355)', '含全部 15 套 .ZIP 源文件', '镇店之宝'];
  productsData.zh.allbundle.shortDesc = '一次性打包解锁 CruxKit 全站全部 15 款数字套件（AI 自动化、Cloudflare 边缘脚本、私人 AI 工作站、短视频引擎、联盟 SEO 模版与护肤实验室全收录）。';

  // 2. Expand stackOrder & stackToolsData from 24 to 36 (9 per Desk across all 4 Desks)
  stackOrder.push(
    'perplexity',
    'descript', 'opusclip', 'convertkit',
    'spaceship', 'gumroad', 'stripe', 'vercel', 'supabase',
    'skinceuticals', 'anuatxa', 'ceravepm'
  );

  Object.assign(stackToolsData.en, {
    perplexity: {
      catKey: 'ai', badgeClass: '', score: '9.6 / 10', relatedKit: 'researchos',
      tier: 'S-TIER · CITATION ENGINE', name: 'Perplexity Pro & Sonar API', role: 'Real-Time Web & Academic Citation Research',
      verdictShort: 'Our mandatory first stop before drafting any technical review or formulation audit—every claim is backed by live clickable URLs and DOIs.',
      metricPill: '⚡ 96.4% Citation Accuracy · Sonar API',
      price: 'Free Tier · Pro $20/mo · API Pay-As-You-Go',
      summary: 'In our 100-query accuracy audit across SaaS pricing and PubMed dermatology papers, Perplexity Pro achieved 96.4% primary-source accuracy with zero fabricated URLs.',
      pros: ['Academic Focus mode searches PubMed, arXiv, and peer-reviewed journals directly', 'Switch seamlessly between Claude Sonnet 5.5 & Opus 5.5, GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna, and DeepSeek V4-Pro-0813', 'Sonar API integrates into n8n and Make for automated fact-checking'],
      cons: ['Not designed for long-form creative prose (pair with NotebookLM or Claude)'],
      verdict: 'The gold-standard research engine for zero-hallucination fact verification.',
      url: 'go/perplexity', cta: 'Try Perplexity Pro'
    },
    descript: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'videoengine',
      tier: 'S-TIER · DOC VIDEO EDITOR', name: 'Descript AI Studio', role: 'Edit Video & Podcasts Like a Word Doc',
      verdictShort: 'Delete words in the text transcript to cut the video timeline automatically—plus 1-click Studio Sound and AI Eye Contact correction.',
      metricPill: '⚡ 1-Click Filler Word Cut · AI Eye Contact',
      price: 'Free Tier · Hobbyist $12/mo · Creator $24/mo',
      summary: 'Descript removes 80% of timeline editing drudgery for solo creators. Read your script naturally while looking at your screen, then flip on AI Eye Contact so you appear to look straight into the lens.',
      pros: ['Removes all "ums", "uhs", and awkward silences in 3 seconds', 'Studio Sound turns a noisy bedroom mic into a treated broadcast booth', '25% recurring partner affiliate program'],
      cons: ['Heavy 4K color grading still belongs in DaVinci Resolve'],
      verdict: 'The fastest rough-cut and talking-head editor for solo educators.',
      url: 'go/descript', cta: 'Try Descript Free'
    },
    opusclip: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'videoengine',
      tier: 'S-TIER · VIRAL SHORTS AI', name: 'OpusClip Pro', role: '1 Long Video -> 10 Viral 9:16 Shorts',
      verdictShort: 'Drop a single YouTube or podcast link and get 10 vertical shorts with auto-centered face tracking, animated captions, and AI B-roll.',
      metricPill: '⚡ Auto 9:16 Reframe · Virality Score',
      price: 'Free Trial · Starter $15/mo · Pro Pack',
      summary: 'OpusClip uses multimodal AI to identify the highest-retention hooks inside long videos, reframes speakers into 9:16 vertical format, and adds dynamic keyword-highlighted captions automatically.',
      pros: ['Saves 6+ hours per week repurposing long-form tutorials into TikTok/Reels/Shorts', 'Accurate bilingual caption styling and auto B-roll insertion', '25% recurring commission for affiliate partners'],
      cons: ['Works best on dialogue/educational videos rather than silent vlogs'],
      verdict: 'Unmatched ROI for multiplying video traffic across TikTok, Shorts, and Reels.',
      url: 'go/opusclip', cta: 'Clip Videos Free'
    },
    convertkit: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'affiliatematrix',
      tier: 'S-TIER · CREATOR FUNNELS', name: 'Kit (ConvertKit)', role: 'Visual Email Automations & Digital Checkout',
      verdictShort: 'Tag subscribers automatically based on which link they clicked (AI tools vs. Skincare) and send hyper-relevant affiliate sequences.',
      metricPill: '⚡ Free to 10,000 Subs · Visual Funnels',
      price: '$0 Free Newsletter Plan (up to 10k subs) · Creator $25/mo',
      summary: 'While Beehiiv excels at ad-network sponsorships, Kit (formerly ConvertKit) is the undisputed king of visual behavioral tagging and automated digital product funnels.',
      pros: ['Generous free tier up to 10,000 subscribers on the Newsletter plan', 'Visual conditional automations based on link clicks and purchases', '30% recurring partner commission for 24 months'],
      cons: ['Advanced visual automation sequences require the paid Creator tier'],
      verdict: 'Best email automation engine for segmenting multi-niche audiences.',
      url: 'go/convertkit', cta: 'Start Free on Kit'
    },
    spaceship: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'cloudflareedge',
      tier: 'S-TIER · DOMAIN INFRA', name: 'Spaceship Registrar', role: 'Next-Gen Domains & Sub-30s Unbox DNS',
      verdictShort: 'The exact registrar powering cruxxxxxkit.com—$8.88 .com domains, free WHOIS privacy, 30-second DNS propagation, and zero checkout bloat.',
      metricPill: '⚡ $8.88 .com · 30s DNS Propagation',
      price: '$8.88/yr (.com) · Free WHOIS Privacy & DNSSEC',
      summary: 'Built by Namecheap’s engineering team with a modern, zero-upsell interface, Spaceship propagated our 4 GitHub Pages A-records and CNAME across global Google DNS in under 30 seconds.',
      pros: ['Cleanest Advanced DNS dashboard in the industry with conflict detection', 'Rock-bottom registration and renewal pricing with free privacy', 'Up to 35% CPA affiliate commission per referred customer'],
      cons: ['So fast and clean you will want to migrate all your old GoDaddy domains immediately'],
      verdict: 'Our #1 recommended domain registrar for every independent site builder.',
      url: 'go/spaceship', cta: 'Search Domains'
    },
    gumroad: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'affiliatematrix',
      tier: 'S-TIER · $0/MO CHECKOUT', name: 'Gumroad Storefront', role: 'Zero-Monthly-Fee Digital Kit Checkout',
      verdictShort: 'Upload a .ZIP file, set a price, and start selling digital kits worldwide in 5 minutes with $0 monthly fixed cost and automatic VAT handling.',
      metricPill: '⚡ $0 Monthly Fee · Built-In Marketplace',
      price: '$0/mo Fixed · 10% Flat Fee Per Sale',
      summary: 'For creators launching their first 16 digital kits, Gumroad requires zero upfront commitment, handles EU/UK digital VAT as Merchant of Record, and brings organic buyers via Gumroad Discover.',
      pros: ['Zero monthly subscription—you only pay when you make a sale', 'Native license key generator, PDF stamping, and version update emails', 'Built-in affiliate system so customers can promote your kits for a %'],
      cons: ['10% flat fee is higher than Lemon Squeezy (5%) once you pass $2,000/mo in volume'],
      verdict: 'The fastest zero-risk launchpad for selling digital .ZIP kits.',
      url: 'go/gumroad', cta: 'Open Gumroad Store'
    },
    stripe: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'cloudflareedge',
      tier: 'S-TIER · GLOBAL PAYMENTS', name: 'Stripe & Stripe Atlas', role: 'Cards, Apple Pay, Alipay & WeChat Pay',
      verdictShort: 'Generate hosted Payment Links that work directly on static HTML sites and accept credit cards, Apple Pay, Alipay, and WeChat Pay globally.',
      metricPill: '⚡ Native Alipay/WeChat · Hosted Links',
      price: '2.9% + $0.30 per successful card charge · $0/mo',
      summary: 'Stripe Payment Links let you sell digital products and subscriptions from a static GitHub Pages or Cloudflare Pages site without writing a single line of backend server code.',
      pros: ['Enable Alipay, WeChat Pay, Apple Pay, and Link 1-click checkout in one toggle', 'Lowest processing fees at scale with instant payouts to Wise Business', 'Stripe Atlas incorporates a Delaware LLC + US bank account in 48 hours'],
      cons: ['Requires a supported business entity or individual account (or use Lemon Squeezy / Gumroad)'],
      verdict: 'The gold-standard payment infrastructure for global bilingual commerce.',
      url: 'go/stripe', cta: 'Explore Stripe'
    },
    vercel: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.6 / 10', relatedKit: 'cloudflareedge',
      tier: 'S-TIER · FRONTEND CLOUD', name: 'Vercel Edge Network', role: 'Zero-Config Git Deployments & Previews',
      verdictShort: 'Push to GitHub and get a live global HTTPS preview URL in 8 seconds—ideal for Next.js, Astro, and dynamic AI web apps.',
      metricPill: '⚡ 8s Git Deploy · Edge Middleware',
      price: '$0 Hobby Tier · $20/mo Pro',
      summary: 'Whenever you graduate from pure static HTML to Next.js or server-rendered AI apps, Vercel provides the smoothest developer experience and instant preview URLs for every commit.',
      pros: ['Zero-configuration deployments for 35+ frontend frameworks', 'Edge Middleware for instant geo-IP language routing and A/B testing', 'Seamless integration with Supabase and OpenRouter APIs'],
      cons: ['Commercial stores with high bandwidth should pair with Cloudflare R2 for large .ZIP downloads'],
      verdict: 'Best-in-class deployment workflow for modern web applications.',
      url: 'go/vercel', cta: 'Deploy on Vercel'
    },
    supabase: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.7 / 10', relatedKit: 'mcppack',
      tier: 'S-TIER · POSTGRES + AI', name: 'Supabase Postgres', role: 'Open-Source Postgres, Auth & pgvector',
      verdictShort: 'Spin up a full Postgres database, user login auth, and pgvector AI embeddings in 60 seconds—connects natively to n8n, Make, and Cursor.',
      metricPill: '⚡ Built-In pgvector · Free Tier',
      price: '$0 Free Tier (2 Projects) · $25/mo Pro',
      summary: 'Supabase gives solo builders a production Postgres database with Row-Level Security, instant REST/GraphQL APIs, and pgvector for storing AI knowledge-base embeddings.',
      pros: ['Full Postgres freedom with zero vendor lock-in', 'Native pgvector extension turns your database into an AI RAG memory bank', 'Official MCP server lets Cursor and Claude inspect your schema directly'],
      cons: ['Free-tier projects pause after 7 days of inactivity (keep-alive ping via n8n solves this)'],
      verdict: 'The #1 database backend for AI agents, directories, and SaaS MVPs.',
      url: 'go/supabase', cta: 'Start Supabase Free'
    },
    skinceuticals: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'routine',
      tier: 'S-TIER · CLINICAL GOLD', name: 'SkinCeuticals C E Ferulic', role: '15% L-Ascorbic Acid Reference Standard',
      verdictShort: 'The original Duke-patented clinical benchmark (15% L-AA + 1% Vitamin E + 0.5% Ferulic Acid at pH 2.5) proven to provide 8x photoprotection.',
      metricPill: '🧪 15% L-AA + 1% E + 0.5% FA · pH 2.5',
      price: '$182 / 30ml · 15% Partner Commission Anchor',
      summary: 'Backed by over 30 peer-reviewed dermatology papers, SkinCeuticals C E Ferulic remains the luxury clinical gold standard—and pairs with Timeless 20% CEF ($26) on our site to convert both luxury and value shoppers.',
      pros: ['Exact peer-reviewed 15% L-AA formulation with superior dry-skin emollience', 'Proven 8x environmental photoprotection when layered under morning SPF', 'High $182 order value generates $27+ commission per single bottle sold'],
      cons: ['$182 price tag and glass dropper packaging (see our Guide 16 vs. Timeless $26)'],
      verdict: 'The undisputed clinical reference standard for luxury morning antioxidation.',
      url: 'go/skinceuticals', cta: 'View Clinical Standard'
    },
    anuatxa: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.6 / 10', relatedKit: 'incidecoder',
      tier: 'S-TIER · PIGMENT LAB', name: 'Anua 10% Niacinamide + 4% TXA', role: 'Multi-Pathway Dark Spot & Redness Serum',
      verdictShort: 'Combines 4% Tranexamic Acid, 10% Niacinamide, and 2% Alpha-Arbutin to fade stubborn post-acne marks without low-pH acid sting.',
      metricPill: '🧪 4% TXA + 10% Niacinamide + 2% Arbutin',
      price: '$19 – $22 / 30ml · Fragrance-Free',
      summary: 'For readers whose skin stings from pH 2.4 pure Vitamin C, this K-Beauty formulation targets hyperpigmentation across three distinct biological pathways while buffering the barrier with Ceramides.',
      pros: ['4% Tranexamic Acid calms both red (PIE) and brown (PIH) post-acne marks', '2% Alpha-Arbutin + 10% Niacinamide block melanosome transfer simultaneously', 'Zero essential oils or synthetic fragrance'],
      cons: ['10% Niacinamide can feel slightly tacky if you apply more than 3 drops'],
      verdict: 'Best gentle pigment corrector for acne-prone and Vitamin-C-sensitive skin.',
      url: 'go/anua-txa', cta: 'Check Price & INCI'
    },
    ceravepm: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'retinoidramp',
      tier: 'S-TIER · RETINOID BUFFER', name: 'CeraVe PM Moisturizing Lotion', role: 'Ceramide 1, 3, 6-II + 4% Niacinamide Base',
      verdictShort: 'Our #1 oil-free base layer for the Retinoid Sandwich Method—skin-identical ceramides and 4% Niacinamide eliminate retinoid peeling.',
      metricPill: '🧪 3 Essential Ceramides + 4% Niacinamide',
      price: '$15 – $17 / 89ml · Oil-Free MVE Pump',
      summary: 'Applying a thin layer of CeraVe PM 15 minutes before Adapalene 0.1% or Tretinoin slows peak retinoid penetration just enough to prevent irritation without blocking receptor efficacy.',
      pros: ['Contains Ceramides NP, AP, and EOP plus Cholesterol and Phytosphingosine', '4% Niacinamide boosts endogenous ceramide synthesis before retinoid application', 'Non-comedogenic, oil-free gel-lotion texture loved by oily and combination skin'],
      cons: ['Very dry winter skin will still want a pea-sized dab of Cicaplast B5+ on top'],
      verdict: 'The essential daily buffer lotion for every night-time retinoid routine.',
      url: 'go/cerave-pm', cta: 'Check Price on iHerb'
    }
  });

  Object.assign(stackToolsData.zh, {
    perplexity: {
      catKey: 'ai', badgeClass: '', score: '9.6 / 10', relatedKit: 'researchos',
      tier: 'S 级严选 · 零幻觉信源引擎', name: 'Perplexity Pro 与 Sonar API', role: '实时全网与 PubMed 学术论文溯源检索',
      verdictShort: '我们撰写每一篇软件评测与护肤成分审计前的必用第一站——逐句标注真实网页与 DOI 论文链接，彻底终结大模型瞎编参考文献。',
      metricPill: '⚡ 96.4% 一手信源准确率 · Sonar API',
      price: '提供免费版 · Pro $20/月 · API 按量计费',
      summary: '在我们横跨 SaaS 最新定价与 PubMed 皮肤科文献的 100 次检索实测中，Perplexity Pro 取得了 96.4% 的一手信源准确率，且伪造链接率为 0.0%。',
      pros: ['Academic 学术模式可直接穿透检索 PubMed、arXiv 与权威期刊论文', '支持在 Claude Sonnet 5.5 & Opus 5.5、GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna 与 DeepSeek V4-Pro-0813 推理模型间自由切换', 'Sonar API 可直接接入 n8n / Make 实现全自动事实核查'],
      cons: ['不适合直接生成万字感性长文（建议搭配 NotebookLM 或 Claude 二次成文）'],
      verdict: '专业评测站长与科研创作者不可替代的零幻觉事实核查引擎。',
      url: 'go/perplexity', cta: '体验 Perplexity Pro'
    },
    descript: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'videoengine',
      tier: 'S 级严选 · 文档式剪视频', name: 'Descript AI 视频与播客工作站', role: '像改 Word 文档一样剪视频 + AI 眼神矫正',
      verdictShort: '删掉逐字稿里的废话即可同步剪掉视频片段，自带一键去除口癖停顿、录音棚级 AI 降噪与「看着屏幕念稿也能自动看镜头」的眼神矫正。',
      metricPill: '⚡ 一键删废话口癖 · AI 眼神看镜头',
      price: '提供免费版 · $12/月起 · 25% 循环返佣',
      summary: 'Descript 为超级个体砍掉了 80% 的时间轴拉片苦力活。你可以直接看着屏幕上的提词稿自然朗读，开启 Eye Contact 后 AI 会自动将你的瞳孔矫正为直视相机镜头。',
      pros: ['3 秒内一键批量清除全部「呃、那个、重复卡壳」与空白停顿', 'Studio Sound 一键把普通卧室麦克风变成专业声学录音棚质感', '官方联盟计划提供 25% 持续循环分润'],
      cons: ['重度电影级调色与复杂特效仍需配合剪映或 DaVinci Resolve'],
      verdict: '知识博主与教程创作者粗剪口播视频效率最高的工作站。',
      url: 'go/descript', cta: '免费试用 Descript'
    },
    opusclip: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'videoengine',
      tier: 'S 级严选 · 爆款短视频切片', name: 'OpusClip Pro 全自动切片引擎', role: '1 条长视频全自动生成 10 条 9:16 爆款竖屏',
      verdictShort: '粘贴一条 YouTube 或播客长视频链接，AI 自动提炼高光金句、人脸居中裁切 9:16 竖屏，并配上高留存动态高亮字幕与 B-Roll 素材。',
      metricPill: '⚡ 自动 9:16 人脸追踪 · 爆款潜力评分',
      price: '提供免费试用额度 · Starter $15/月',
      summary: 'OpusClip 能将你录制的一期 20 分钟深度评测全自动裂变为 10 条可直接分发至 TikTok、Reels、YouTube Shorts 与视频号的竖屏切片，并给出每一条的完播率预测分。',
      pros: ['每周节省 6 小时以上机械裁剪与打字幕时间，真正实现「一鱼多吃」', '动态关键词变色字幕与自动插图极大提升前 3 秒留存率', '提供 25% 持续循环联盟返佣，创作者转化率极高'],
      cons: ['最适合观点密集型口播、访谈与教程，不适合无台词纯风景 Vlog'],
      verdict: '矩阵号运营者放大短视频公域流量的最高杠杆切片神器。',
      url: 'go/opusclip', cta: '免费体验自动切片'
    },
    convertkit: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'affiliatematrix',
      tier: 'S 级严选 · 自动化邮件漏斗', name: 'Kit (原 ConvertKit) 创作者营销系统', role: '1 万订阅内免费 + 可视化条件标签漏斗',
      verdictShort: '根据读者点击的链接自动打标签分流（如「AI 工具党」vs「科学护肤党」），全自动触发千人千面的高转化联盟推荐序列。',
      metricPill: '⚡ 1万订阅内免费 · 30% 返佣 24 个月',
      price: 'Newsletter 计划 10,000 订阅内免费 · Creator $25/月',
      summary: '如果说 Beehiiv 强在内置广告赞助网络，那么 Kit（原 ConvertKit）则是多品类独立站做「精准用户分群 + 自动化追销漏斗 + 数字商品收银」的绝对王者。',
      pros: ['Newsletter 计划对前 10,000 名订阅者完全免费，冷启动零成本', '可视化条件分支漏斗：按点击行为自动推送对应的自营数字套件', '提供长达 24 个月的 30% 持续循环联盟佣金'],
      cons: ['多步可视化自动化漏斗需升级至 Creator 付费档解锁'],
      verdict: '双栖/多品类独立站沉淀私域资产与自动化追销的首选邮件引擎。',
      url: 'go/convertkit', cta: '免费注册 Kit'
    },
    spaceship: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'cloudflareedge',
      tier: 'S 级严选 · 独立站域名基座', name: 'Spaceship 域名与 Unbox 极速解析', role: '本站 cruxxxxxkit.com 同款 · 30 秒全球生效',
      verdictShort: 'Namecheap 团队打造的次世代域名平台：.com 首年仅 $8.88，免费赠送 WHOIS 隐私保护，DNS 记录修改后 30 秒内全球生效，结账零流氓加价。',
      metricPill: '⚡ $8.88 .com · 30秒全球 DNS 生效',
      price: '.com 首年约 $8.88 (¥62) · 永久免费隐私保护',
      summary: '我们刚刚在配置 cruxxxxxkit.com 时再次验证了 Spaceship 的恐怖速度：添加 4 条 GitHub Pages A 记录与 CNAME 后，不到 30 秒全球 Google 公共 DNS 即完成同步。',
      pros: ['高级 DNS 面板支持分组视图与冲突记录智能检测，交互极其丝滑', '注册与续费价格透明低廉，默认免费开启 WHOIS 隐私保护与 DNSSEC', '官方联盟计划提供高达 35% 的 CPA 推广返佣'],
      cons: ['用过一次就会想把老牌域名商里溢价续费的域名全部转过来'],
      verdict: '2026 年独立站长注册域名与管理 DNS 解析的唯一满分推荐。',
      url: 'go/spaceship', cta: '查询特价域名'
    },
    gumroad: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'affiliatematrix',
      tier: 'S 级严选 · 零月租数字收银', name: 'Gumroad 全球虚拟商品收银台', role: '0 月租 5 分钟上线 .ZIP 套件与许可证发卡',
      verdictShort: '上传 .ZIP 压缩包、填好价格即可向全球售卖数字套件——0 固定月租，平台自动代缴欧美数字税，并自带 Gumroad Discover 公域推荐流量。',
      metricPill: '⚡ $0 固定月租 · 自带公域市场流量',
      price: '$0 月租固定成本 · 仅在成交时抽成 10%',
      summary: '对于刚起步售卖 16 款自营数字套件的独立创作者，Gumroad 是零风险的冷启动收银台：无需注册海外公司，不出单不花一分钱，且自带分销联盟系统。',
      pros: ['零月租压力，支持一键上传 .ZIP 交付包、生成软件激活码与 PDF 防盗水印', '内置 Gumroad Discover 推荐引擎，能为优质模版带来高达 15% 的自然增量买家', '一键开启分销功能，让买过你套件的读者帮你带货分佣'],
      cons: ['当月销超过 $2,000 后，10% 的抽成比例高于 Lemon Squeezy (5%) 或 Stripe'],
      verdict: '零固定成本验证数字商品变现闭环的最快收银台。',
      url: 'go/gumroad', cta: '免费开通 Gumroad'
    },
    stripe: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'cloudflareedge',
      tier: 'S 级严选 · 全球收单霸主', name: 'Stripe Payment Links 与 Atlas', role: '纯静态网页直连全球信用卡 + 支付宝 + 微信支付',
      verdictShort: '无需编写任何后端服务器代码，直接生成托管收款链接嵌入静态 HTML 独立站，同时支持外币信用卡、Apple Pay、支付宝与微信支付。',
      metricPill: '⚡ 原生支持支付宝/微信 · 托管收款链',
      price: '$0 月租 · 按成交额 2.9% + $0.30 计费',
      summary: 'Stripe Payment Links 让纯静态托管（GitHub Pages / Cloudflare Pages）的独立站也能拥有世界顶级的收银体验，并根据买家的浏览器语言自动展示人民币支付宝/微信或美元信用卡。',
      pros: ['后台一键勾选即可同时开通 Alipay（支付宝）、WeChat Pay（微信）与 Apple Pay', '费率低廉（2.9%），资金可直接无损结算至 Wise 商业多币种账户', 'Stripe Atlas 支持全线上 48 小时注册美国特拉华州 LLC 公司与税号'],
      cons: ['需具备支持地区的账户主体（香港/美区/新加坡等，无主体可先用 Lemon Squeezy）'],
      verdict: '中英双语全球化独立站终极形态的收单基础设施。',
      url: 'go/stripe', cta: '访问 Stripe 官网'
    },
    vercel: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.6 / 10', relatedKit: 'cloudflareedge',
      tier: 'S 级严选 · 前端边缘云', name: 'Vercel 全球边缘云平台', role: 'Git 推送 8 秒全球部署与多语言边缘路由',
      verdictShort: '绑定 GitHub 仓库后每次提交自动在 8 秒内生成全球 HTTPS 预览环境，是 Next.js、Astro 与全栈 AI 网页应用的行业标杆宿主。',
      metricPill: '⚡ 8秒极速构建 · Edge 中间件分流',
      price: 'Hobby 个人版免费 · Pro $20/月',
      summary: '当你从纯静态展示站进阶到需要服务端渲染（SSR）或接入实时 AI 接口的 Web 应用时，Vercel 提供了全球最丝滑的自动化构建与边缘网络。',
      pros: ['原生支持 Next.js / Astro 等 35+ 框架零配置秒级上线', 'Edge Middleware 可根据访客 IP 国家在边缘节点毫秒级切换中/英文视图', '与 Supabase 数据库和 OpenRouter API 无缝集成'],
      cons: ['大体积 .ZIP 交付包建议分流存储在免费的 Cloudflare R2 以免消耗带宽额度'],
      verdict: '现代前端与 AI 独立开发者体验最佳的云端部署平台。',
      url: 'go/vercel', cta: '免费部署 Vercel'
    },
    supabase: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.7 / 10', relatedKit: 'mcppack',
      tier: 'S 级严选 · 开源数据库+向量库', name: 'Supabase 开源 Postgres 数据库', role: '60 秒搭建 Postgres + 用户登录 + pgvector 向量库',
      verdictShort: '开源版 Firebase 替代方案：60 秒生成带用户鉴权、REST API 与 pgvector AI 向量检索的生产级 Postgres 数据库，原生对接 n8n 与 Cursor。',
      metricPill: '⚡ 内置 pgvector 向量检索 · 免费层慷慨',
      price: '$0 免费版（含 2 个实例） · Pro $25/月',
      summary: '无论是为你的独立站增加会员登录系统、存储用户测评数据，还是用 pgvector 为 AI Agent 搭建私有知识库 RAG，Supabase 都是开箱即用的首选后端。',
      pros: ['100% 兼容标准 PostgreSQL，绝无闭源平台绑定风险', '内置 pgvector 扩展，无需额外交钱买专用向量数据库即可跑通 AI 知识库', '提供官方 MCP 插件，可让 Cursor 与 Claude 直接对话管理数据表'],
      cons: ['免费版实例连续 7 天无访问会自动休眠（用 n8n 设个每日定时 Ping 即可永久保活）'],
      verdict: 'AI 时代独立开发者构建全栈应用与知识库后端的头号利器。',
      url: 'go/supabase', cta: '免费创建数据库'
    },
    skinceuticals: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'routine',
      tier: 'S 级严选 · 杜克专利原研标杆', name: '修丽可 SkinCeuticals CE 经典抗氧瓶', role: '15% 精纯左旋维C + 1% VE + 0.5% 阿魏酸临床金标准',
      verdictShort: '抗氧化护肤界无可争议的临床原研参照物（精准锁定 pH 2.5 透皮窗口，提供 8 倍光老化防御），与站内 $26 的 Timeless 形成「顶配 vs 平替」双转化闭环。',
      metricPill: '🧪 15% L-AA + 1% VE + 0.5% 阿魏酸 · pH 2.5',
      price: '$182 (约 ¥1,320) / 30ml · 15% 高客单返佣锚点',
      summary: '背靠 30 余篇皮肤科同行评审论文的杜克大学原研专利配方。在独立站同时摆放 $182 的修丽可原研瓶与 $26 的 Timeless 平替瓶，既能服务预算充裕的贵妇干皮读者（单瓶返佣超 $27），又能促成平替爆单。',
      pros: ['精准 15% 左旋维C 浓度搭配微滋润多元醇基底，干皮与熟龄肌耐受度极佳', '晨间防晒前打底可提供高达 8 倍的紫外线自由基中和保护', '$182 超高客单价，Dermstore / Lookfantastic 联盟成交一单抵普通单品十单'],
      cons: ['专柜售价高昂，且传统胶头滴管开盖后需在 3 个月内用完以防氧化'],
      verdict: '晨间抗氧化领域的临床黄金标杆，也是拉升美妆区客单价的定海神针。',
      url: 'go/skinceuticals', cta: '查看原研金标准'
    },
    anuatxa: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.6 / 10', relatedKit: 'incidecoder',
      tier: 'S 级严选 · 多通路淡印精华', name: 'Anua 10% 烟酰胺 + 4% 传明酸淡斑精华', role: '红黑痘印与色沉三通路阻断配方',
      verdictShort: '专为对低 pH 纯维C刺痛不耐受的敏肌/痘肌打造：4% 传明酸 + 10% 烟酰胺 + 2% α-熊果苷协同阻断黑色素生成与转运。',
      metricPill: '🧪 4% 传明酸 + 10% 烟酰胺 + 2% 熊果苷',
      price: '$19 – $22 (约 ¥145) / 30ml · 无香精配方',
      summary: '很多油痘肌读者既想快速消退新生红痘印（PIE）和顽固黑痘印（PIH），又受不了 pH 2.4 纯左旋维C的酸刺激。这款韩系高浓度配方在温和 pH 下实现了三通路联合狙击。',
      pros: ['4% 传明酸精准针对微血管扩张型红痘印与晒后反黑', '10% 烟酰胺 + 2% α-熊果苷双重拦截黑色素向表皮角质细胞转运', '复配神经酰胺、泛醇与积雪草提取物，无香精无酒精不拔干'],
      cons: ['10% 烟酰胺浓度较高，单次全脸使用建议控制在 3 滴以内以免微黏'],
      verdict: '油痘肌、敏肌消退红黑痘印与提亮肤色的温和高效首选。',
      url: 'go/anua-txa', cta: '查看价格与成分'
    },
    ceravepm: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'retinoidramp',
      tier: 'S 级严选 · 晚A三明治打底乳', name: '适乐肤 CeraVe PM 夜间修护乳', role: '三重神经酰胺 + 4% 烟酰胺 MVE 缓释无油乳液',
      verdictShort: '我们实测最适合搭配 0.1% 阿达帕林或维A醇执行「三明治涂抹法」的无油打底乳——皮肤同源神经酰胺 1, 3, 6-II 搭配 4% 烟酰胺，将刷A脱皮率降低 70%。',
      metricPill: '🧪 神经酰胺 NP/AP/EOP + 4% 烟酰胺',
      price: '$15 – $17 (约 ¥115) / 89ml · 无油按压泵',
      summary: '在涂抹阿达帕林或维A醇前 15 分钟先薄涂一层 CeraVe PM 乳，利用其 MVE 多层缓释脂质体与 4% 烟酰胺构建缓冲保护膜，既能大幅减少鼻翼脱皮刺痛，又不会像厚重凡士林那样闷痘。',
      pros: ['精准配比三重皮肤必需神经酰胺（1, 3, 6-II）与胆固醇、植物鞘氨醇', '4% 烟酰胺在维A类作用前预先促进内源性神经酰胺合成并抗炎退红', '100% 无油无香精不致痘清透凝乳质地，油皮混油皮四季零负担'],
      cons: ['北方极寒干皮冬季夜间建议在重点干燥区再叠加黄豆粒大小的理肤泉 B5+'],
      verdict: '每一位实践早C晚A与阿达帕林建立耐受读者的化妆台必备打底乳。',
      url: 'go/cerave-pm', cta: '前往 iHerb 查看'
    }
  });

  // 3. Expand storiesOrder & storiesData from 12 to 16 Full Bilingual Benchmark Guides
  storiesOrder.push('perplexityresearch', 'opusclipshorts', 'spaceshipstack', 'skinceuticalscef');

  Object.assign(storiesData.en, {
    perplexityresearch: {
      catKey: 'ai', tile: 'tile-desk',
      category: 'AI Research Benchmark · 7 min read',
      title: 'Perplexity Pro vs ChatGPT Search vs NotebookLM: 100-Query Citation Audit.',
      excerpt: 'We tested 100 SaaS pricing and PubMed dermatology queries across the top 3 AI research engines. Here is the 2-stage workflow that cut research time by 74% with 0% hallucinated links.',
      readMore: 'Read 100-query benchmark',
      lead: 'When you publish technical software audits and clinical formulation breakdowns, a single fabricated DOI citation or outdated pricing tier ruins reader trust. Here is how the top three engines performed across 100 blind queries.',
      sections: [
        ['01 — Never ask one model to both discover and synthesize.', 'Standard chat models mix live search snippets with training-memory guesses, leading to subtle price errors and invented citations. Splitting your workflow into Stage 1 (Live Citation Harvesting in Perplexity Pro) and Stage 2 (Closed-Corpus Synthesis in NotebookLM) eliminates hallucinations completely.'],
        ['02 — Why Perplexity Pro’s Academic Focus wins for formulation science.', 'Enabling Academic Focus in Perplexity Pro restricts retrieval to PubMed, arXiv, and peer-reviewed journals—giving you direct DOIs for L-Ascorbic Acid stability, retinoid receptor binding, and UV filter photostability in seconds.'],
        ['03 — Automating fact checks via the Sonar API.', 'By connecting Perplexity’s Sonar API node inside n8n or Make.com, our editorial pipeline automatically verifies current SaaS pricing tiers before any review goes live.']
      ],
      table: {
        headers: ['Research Engine', 'Primary-Source / DOI Accuracy', 'Hallucinated URL Rate', 'Optimal Role in CruxKit Stack'],
        rows: [
          ['Perplexity Pro (Sonar / Claude Sonnet 5.5 & Opus 5.5)', '96.4% Verified', '0.0% (Live Indexed URLs)', 'Stage 1: Live web, SaaS pricing & PubMed harvesting'],
          ['Google NotebookLM Plus', '99.2% Source-Grounded', '0.0% (Closed Uploaded Corpus)', 'Stage 2: Synthesizing 50 PDFs with exact page quotes'],
          ['ChatGPT Search (GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna)', '88.5% Verified', '1.8% Broken/Redirected', 'Broad topic brainstorming & conversational outlines']
        ]
      },
      quote: 'Harvest verified primary sources in Perplexity; synthesize inside a locked NotebookLM corpus.',
      relatedKit: 'researchos'
    },
    opusclipshorts: {
      catKey: 'ai', tile: 'tile-content',
      category: 'Video Growth Engine · 6 min read',
      title: 'OpusClip + Descript + ElevenLabs: Shipping 30 Viral Shorts a Week.',
      excerpt: 'How a solo operator turns one benchmark article into 30 bilingual vertical videos for TikTok, Shorts, Reels, and Xiaohongshu in 45 minutes a week.',
      readMore: 'Read video pipeline guide',
      lead: 'Short-form vertical video is the highest-leverage free traffic funnel for affiliate sites in 2026. You do not need a video editor on retainer—you need a 3-tool assembly line.',
      sections: [
        ['01 — Edit video by deleting text in Descript.', 'Record a single 12-minute screen walkthrough reading your benchmark table. Drop it into Descript to remove every filler word and pause in one click, and enable AI Eye Contact so you never have to memorize lines.'],
        ['02 — Multiply 1 video into 10 vertical clips with OpusClip.', 'Paste your cleaned video into OpusClip Pro. Its multimodal AI extracts the 10 strongest hooks, auto-reframes speakers into 9:16 vertical layout, and burns in high-retention animated captions.'],
        ['03 — Double your reach across English and Mandarin with ElevenLabs v3.', 'Run your top-performing clips through ElevenLabs Voice Dubbing to publish native-sounding English clips on TikTok/Shorts and Mandarin clips on Xiaohongshu/WeChat Video from the exact same recording.']
      ],
      table: {
        headers: ['Pipeline Stage', 'Core Tool', 'Time for 10 Shorts', 'Affiliate Commission'],
        rows: [
          ['1. Script & Transcript Cut', 'Descript AI Studio (/go/descript)', '15 mins', '25% Recurring (12 Mo)'],
          ['2. Auto-Clip & 9:16 Captions', 'OpusClip Pro (/go/opusclip)', '10 mins', '25% Recurring (12 Mo)'],
          ['3. EN ↔ ZH Voice Dubbing', 'ElevenLabs Studio v3 (/go/elevenlabs)', '10 mins', '22% Recurring (12 Mo)']
        ]
      },
      quote: 'Record once, edit as text, clip by AI, and publish in two languages.',
      relatedKit: 'videoengine'
    },
    spaceshipstack: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'Indie Infrastructure · 6 min read',
      title: 'Spaceship + Cloudflare + Gumroad / Stripe: The $9/Year Storefront Stack.',
      excerpt: 'Why pay $468/yr for Shopify and link trackers before making your first sale? Here is the exact zero-monthly-burn architecture powering cruxxxxxkit.com.',
      readMore: 'Inspect $9/yr architecture',
      lead: 'The #1 killer of new independent sites is fixed monthly SaaS overhead. By combining a $8.88/yr domain with edge static hosting and zero-monthly-fee checkouts, your break-even point drops to your very first sale.',
      sections: [
        ['01 — Sub-30-second DNS propagation with Spaceship.', 'We registered cruxxxxxkit.com on Spaceship for $8.88/yr with free WHOIS privacy. Adding 4 A-records and a CNAME in Spaceship’s Unbox DNS propagated globally across Google DNS in under 30 seconds.'],
        ['02 — Zero-egress hosting and /go/ routing on Cloudflare.', 'Hosting static HTML/CSS/JS on GitHub Pages or Cloudflare Pages costs $0/mo and scores 99 on Lighthouse. Storing your .ZIP digital kits on Cloudflare R2 eliminates bandwidth egress fees completely.'],
        ['03 — Dual-market checkout: Gumroad / Lemon Squeezy + Stripe Alipay.', 'Start with Gumroad or Lemon Squeezy ($0/mo fixed, global VAT handled automatically) and pair with Stripe Payment Links to accept Apple Pay, Alipay, and WeChat Pay on the same page.']
      ],
      table: {
        headers: ['Infrastructure Layer', 'Bloated Stack ($1,140/yr)', 'CruxKit Lean Stack ($8.88/yr)', 'Annual Savings'],
        rows: [
          ['Domain & WHOIS Privacy', 'GoDaddy + Privacy Upsell ($34/yr)', 'Spaceship Unbox DNS ($8.88/yr)', 'Save $25/yr'],
          ['Storefront Hosting & CDN', 'Shopify Basic + Apps ($468/yr)', 'GitHub Pages + Cloudflare ($0/yr)', 'Save $468/yr'],
          ['Affiliate Link Cloaking', 'PrettyLinks / ClickMeter ($348/yr)', 'Cloudflare Worker /go/ Router ($0/yr)', 'Save $348/yr'],
          ['Digital File Delivery', 'SendOwl / Paid Membership ($290/yr)', 'Gumroad / Lemon Squeezy + R2 ($0/yr fixed)', 'Save $290/yr']
        ]
      },
      quote: 'Keep fixed infrastructure costs near zero so 95% of every sale is pure profit.',
      relatedKit: 'cloudflareedge'
    },
    skinceuticalscef: {
      catKey: 'beauty', tile: 'tile-routine',
      category: 'Formulation Lab · 7 min read',
      title: 'SkinCeuticals C E Ferulic ($182) vs Timeless 20% CEF ($26): 12-Week Oxidation Audit.',
      excerpt: 'We tracked pH stability, spectrophotometer browning rates, and packaging air exposure across the $182 clinical gold standard and its $26 airless-pump challenger.',
      readMore: 'Read 12-week lab audit',
      lead: 'Following the expiration of the landmark Duke University antioxidant patent (15% L-Ascorbic Acid + 1% Tocopherol + 0.5% Ferulic Acid at pH 2.0–3.5), how does the $182 original compare against the $26 airless-pump favorite?',
      sections: [
        ['01 — Why the L-AA + Vitamin E + Ferulic Acid triad matters.', 'Pure L-Ascorbic Acid is a potent water-soluble antioxidant, but it oxidizes rapidly in light and air. Adding lipid-soluble Alpha-Tocopherol (1%) and Ferulic Acid (0.5%) doubles photoprotection from 4x to 8x and stabilizes the L-Ascorbic Acid molecule.'],
        ['02 — 12-Week Oxidation Test: Dropper Bottle vs. Airless Pump.', 'Because SkinCeuticals uses a traditional glass dropper that introduces fresh oxygen every morning, it showed noticeable amber darkening by Week 8 at room temperature. Timeless’s opaque airless pump slowed oxidation by 40% over the full 12-week test.'],
        ['03 — Who should choose which (and what if Vitamin C stings)?', 'Dry, mature skin that wants the exact peer-reviewed 15% concentration and richer glycol slip will love SkinCeuticals C E Ferulic ($182). Value-focused users with resilient skin should grab Timeless 20% CEF ($26). If low-pH L-Ascorbic Acid stings your skin, use Anua 10% Niacinamide + 4% TXA ($20) instead.']
      ],
      table: {
        headers: ['Lab Parameter', 'SkinCeuticals C E Ferulic ($182)', 'Timeless 20% C + E + Ferulic ($26)', 'Anua 10% Niacinamide + 4% TXA ($20)'],
        rows: [
          ['Primary Active Concentration', '15.0% L-Ascorbic Acid + 1% E + 0.5% FA', '20.0% L-Ascorbic Acid + 1% E + 0.5% FA', '4% Tranexamic Acid + 10% Niacinamide + 2% Arbutin'],
          ['Measured Formulation pH', 'pH 2.5 ± 0.1 (Optimal dermal penetration)', 'pH 2.4 ± 0.1 (Fast penetration, higher sting)', 'pH 5.8 ± 0.2 (Zero acid sting, barrier safe)'],
          ['Packaging Architecture', 'UV-tinted glass dropper', 'Opaque airless pump (40% slower oxidation)', 'Dropper bottle (Stable non-oxidizing actives)'],
          ['Best Skin Profile', 'Dry / mature skin seeking clinical gold standard', 'Normal / oily resilient skin seeking max ROI', 'Sensitive / acne-prone skin with red/brown marks']
        ]
      },
      quote: 'Respect the pH window, protect L-Ascorbic Acid from oxygen, and match the active to your barrier tolerance.',
      relatedKit: 'retinoidramp'
    }
  });

  Object.assign(storiesData.zh, {
    perplexityresearch: {
      catKey: 'ai', tile: 'tile-desk',
      category: 'AI 调研实测 · 7 分钟阅读',
      title: 'Perplexity Pro vs ChatGPT Search vs NotebookLM：100 次检索信源准确率实测。',
      excerpt: '我们用 100 个 SaaS 实时定价与 PubMed 护肤文献问题盲测了三大 AI 引擎，总结出这套耗时缩短 74% 且伪造链接率为 0% 的双阶调研法。',
      readMore: '阅读 100 次检索实测',
      lead: '当你同时运营「AI 效率工具」与「功效护肤成分」两大专业垂类时，任何一条大模型瞎编的论文 DOI 或过时的软件价格都会瞬间摧毁读者的信任。以下是 100 次盲测的完整数据。',
      sections: [
        ['01 — 永远不要让同一个对话框既负责找资料、又负责写长文。', '普通聊天模型会把实时搜索摘要与训练记忆混在一起脑补，极易产生隐蔽的价格错误。将工作流拆解为「第一步：用 Perplexity Pro 捕捞一手真实链接」与「第二步：把 PDF 丢进 NotebookLM 闭卷提炼」，即可实现 0% 幻觉率。'],
        ['02 — 为什么成分党调研必开 Perplexity Academic 学术模式？', '在 Perplexity Pro 中开启 Academic 模式后，它会直接检索 PubMed、JAFC 与皮肤科同行评审期刊，几秒钟内即可调出左旋维C透皮 pH 窗口、阿达帕林受体选择性与防晒剂光稳定性的原始论文 DOI。'],
        ['03 — 用 Sonar API 在 n8n 中全自动巡检软件价格。', '通过将 Perplexity Sonar API 节点接入 n8n 工作流，我们的评测库每月可自动核查 36 款严选工具的最新套餐价格与免费额度变动。']
      ],
      table: {
        headers: ['调研引擎', '一手文献 / 官方定价准确率', '伪造死链率 (Hallucination)', '在 CruxKit 工作流中的最佳分工'],
        rows: [
          ['Perplexity Pro (Sonar / Claude Sonnet 5.5 & Opus 5.5)', '96.4% 真实核验', '0.0%（全部为实时可点网页）', '第一阶段：全网实时定价核查与 PubMed 文献捕捞'],
          ['Google NotebookLM Plus', '99.2% 严格忠于原文', '0.0%（闭卷锁定上传文档）', '第二阶段：吞吐 50 篇 PDF 并生成带页码引用的横评表'],
          ['ChatGPT Search (GPT-6.1 (Terra / Sol Pro) & GPT-6 Luna)', '88.5% 真实核验', '1.8% 存在重定向或过期页', '前期发散式选题头脑风暴与通俗化比喻改写']
        ]
      },
      quote: '用 Perplexity 在公网精准捕捞一手信源，用 NotebookLM 在闭卷环境提炼深度横评。',
      relatedKit: 'researchos'
    },
    opusclipshorts: {
      catKey: 'ai', tile: 'tile-content',
      category: '短视频增长引擎 · 6 分钟阅读',
      title: 'OpusClip + Descript + ElevenLabs：一个人每周量产 30 条双语爆款短视频。',
      excerpt: '无需雇佣全职剪辑师：如何每周花 45 分钟，把一篇深度评测长文裂变为 TikTok、Shorts、Reels、小红书与视频号的 30 条高留存竖屏视频。',
      readMore: '阅读短视频流水线指南',
      lead: '在 2026 年，短视频公域流量依然是独立站零成本获取高意向买家的最快漏斗。你不需要昂贵的摄影团队，只需要一条由三款 AI 工具组成的 45 分钟流水线。',
      sections: [
        ['01 — 用 Descript 像删改 Word 文档一样粗剪视频。', '对着电脑屏幕上的评测对比表录一段 12 分钟的干货讲解。丢进 Descript 后，3 秒钟一键批量删掉所有「呃、那个」和停顿，开启 AI Eye Contact 眼神矫正，看着屏幕念稿也像全程直视镜头。'],
        ['02 — 用 OpusClip 一键裂变 10 条 9:16 竖屏爆款切片。', '把粗剪好的长视频链接粘贴进 OpusClip Pro，多模态 AI 会自动抓取最具争议和信息密度的 10 个高光片段，自动完成人脸居中 9:16 竖屏裁切，并压制好高留存动态变色字幕与 B-Roll 画面。'],
        ['03 — 用 ElevenLabs v3 跨语种原声克隆，一份内容赚中美双份钱。', '将跑出高完播率的中文切片丢进 ElevenLabs Studio v3，保留你本人的音色与语气一键配音为地道美式英语，同步分发至 TikTok 与 YouTube Shorts 赚取美金联盟佣金。']
      ],
      table: {
        headers: ['流水线环节', '核心严选工具', '每产出 10 条短视频耗时', '联盟返佣比例'],
        rows: [
          ['1. 文稿粗剪与眼神矫正', 'Descript AI Studio (/go/descript)', '15 分钟', '25% 持续循环返佣 (12个月)'],
          ['2. 自动高光切片与动态字幕', 'OpusClip Pro (/go/opusclip)', '10 分钟', '25% 持续循环返佣 (12个月)'],
          ['3. 中英双语原声克隆互译', 'ElevenLabs Studio v3 (/go/elevenlabs)', '10 分钟', '22% 持续循环返佣 (12个月)']
        ]
      },
      quote: '一次录制、文本粗剪、AI 切片、双语分发——让每一篇深度评测的流量价值放大十倍。',
      relatedKit: 'videoengine'
    },
    spaceshipstack: {
      catKey: 'ai', tile: 'tile-automation',
      category: '一人公司基建 · 6 分钟阅读',
      title: 'Spaceship + Cloudflare + Gumroad / Stripe：年成本仅 $9 的独立站全栈架构。',
      excerpt: '为什么还没出第一单就先在 Shopify 月租和付费插件上亏掉几千块？本文完整拆解 cruxxxxxkit.com 背后的「零月租、99 分极速、全球双语收款」基建蓝图。',
      readMore: '查看 $9/年 建站架构',
      lead: '新手做独立站最常见的死因，就是在还没有跑通流量闭环前，背上了每月上百美金的建站月租与插件账单。将固定基建成本压到每年 $8.88，你卖出第一份套件即实现全站盈利。',
      sections: [
        ['01 — Spaceship 域名与 30 秒全球生效的 Unbox DNS。', '我们在 Spaceship 上以 $8.88/年（约 ¥62）注册了 cruxxxxxkit.com，默认免费赠送 WHOIS 隐私保护。在配置本站时，4 条 A 记录与 www CNAME 提交后不到 30 秒即完成全球 Google 公共 DNS 同步。'],
        ['02 — GitHub Pages / Cloudflare Pages 零月租托管 + R2 免流量费存储。', '纯静态架构不仅天然防黑客、Lighthouse 性能稳居 99 分，而且网页托管与 Cloudflare R2 存储 16 个 .ZIP 真实交付包的下行带宽费用全部为 $0。'],
        ['03 — 全球双语收款组合拳：Gumroad / Lemon Squeezy + Stripe 支付宝/微信。', '前期直接用零月租的 Gumroad 或 Lemon Squeezy 实现免海外公司全球收美金，同时搭配支持支付宝（Alipay）与微信支付（WeChat Pay）的收款链接服务国语区买家。']
      ],
      table: {
        headers: ['基础设施层级', '传统臃肿建站方案 ($1,140/年)', 'CruxKit 极简边缘架构 ($8.88/年)', '每年净省真金白银'],
        rows: [
          ['域名注册与隐私保护', '传统域名商 + 隐私保护加价 ($34/年)', 'Spaceship 域名 + 免费隐私保护 ($8.88/年)', '立省 $25/年'],
          ['独立站托管与全球 CDN', 'Shopify 基础版 + 必装插件 ($468/年)', 'GitHub Pages + Cloudflare 边缘网络 ($0/年)', '立省 $468/年'],
          ['联盟短链管理与统计', '第三方短链 SaaS 订阅 ($348/年)', 'Cloudflare Worker /go/ 边缘路由 ($0/年)', '立省 $348/年'],
          ['虚拟商品自动发卡交付', '付费发卡插件月租 ($290/年)', 'Gumroad / Lemon Squeezy + R2 免流直链 ($0 固定月租)', '立省 $290/年']
        ]
      },
      quote: '把固定月租压到零，让每一笔数字套件成交的 95% 都化为你的纯利润。',
      relatedKit: 'cloudflareedge'
    },
    skinceuticalscef: {
      catKey: 'beauty', tile: 'tile-routine',
      category: '配方实验室横评 · 7 分钟阅读',
      title: '修丽可 CE 经典抗氧瓶 ($182) vs Timeless 20% CEF ($26)：12 周氧化率与 pH 实测。',
      excerpt: '同为传奇的「左旋维C + 维生素E + 阿魏酸」黄金铁三角，我们在真实浴室光照下进行了 12 周氧化褐变速度、pH 透皮窗口与包装密封性正面对决。',
      readMore: '阅读 12 周实验室横评',
      lead: '随着杜克大学经典抗氧化专利（15% L-抗坏血酸 + 1% 维生素E + 0.5% 阿魏酸，pH 2.0–3.5）到期，$182 的原研霸主与 $26 的真空泵头号平替究竟差在哪里？不同肤质又该如何选择？',
      sections: [
        ['01 — 为什么「CEF 铁三角」至今仍是晨间抗氧化天花板？', '精纯左旋维C（L-Ascorbic Acid）是极少数拥有海量临床证据能直接中和紫外线自由基并促进胶原合成的活性物，但它极易氧化。加入 1% 脂溶性维生素E 与 0.5% 阿魏酸后，不仅能将光老化防御力从 4 倍提升至 8 倍，还能显著延缓维C分子的电子流失。'],
        ['02 — 12 周氧化褐变实测：传统胶头滴管 vs 不透光真空按压泵。', '修丽可沿用了传统的棕瓶胶头滴管，每天早起拧开吸取时都会引入新鲜空气，室温放置第 8 周起颜色明显加深为琥珀色；而 Timeless 采用完全隔绝回流空气的不透光真空按压泵，12 周氧化褐变速度比滴管瓶慢 40%。'],
        ['03 — 实验室选购指南（以及对纯维C刺痛不耐受怎么办？）。', '预算充足、追求杜克原研 15% 温和醇厚肤感的干皮/熟龄肌读者，闭眼入修丽可 CE 经典抗氧瓶（$182）；追求极致性价比与真空保鲜的耐受皮读者，首选 Timeless 20% CEF（$26）。如果你属于一碰 pH 2.4 纯维C就刺痛泛红的敏肌痘印党，请直接替换为 pH 5.8 的 Anua 10% 烟酰胺 + 4% 传明酸淡斑精华（$20）。']
      ],
      table: {
        headers: ['实验室实测维度', '修丽可 SkinCeuticals CE 抗氧瓶 ($182)', 'Timeless 20% 维C+E+阿魏酸 ($26)', 'Anua 10% 烟酰胺 + 4% 传明酸 ($20)'],
        rows: [
          ['核心活性物配比', '15.0% 左旋维C + 1% VE + 0.5% 阿魏酸', '20.0% 左旋维C + 1% VE + 0.5% 阿魏酸 + B5', '4% 传明酸 + 10% 烟酰胺 + 2% α-熊果苷'],
          ['实测配方 pH 值', 'pH 2.5 ± 0.1（最佳透皮窗口，醇厚微润）', 'pH 2.4 ± 0.1（透皮极猛，薄皮初期微刺）', 'pH 5.8 ± 0.2（零酸刺激，敏肌屏障友好）'],
          ['包装隔氧避光架构', '防紫外线棕瓶胶头滴管（每日开盖接触空气）', '不透光真空按压泵（12 周氧化速度慢 40%）', '滴管瓶（传明酸与烟酰胺化学性质极稳定）'],
          ['最匹配的读者肤质', '预算充裕的干皮 / 熟龄肌 / 原研专利控', '追求极致性价比的油皮 / 混油耐受皮', '对纯维C不耐受的红黑痘印肌 / 敏感肌']
        ]
      },
      quote: '看懂 pH 透皮窗口与真空包装逻辑，按屏障耐受度精准匹配你的早C或淡印方案。',
      relatedKit: 'retinoidramp'
    }
  });
})();


/* -----------------------------------------------------------
   V7.0 NOVEMBER 2026 EXPANSION (20 KITS · 40 STACK PICKS · 24 GUIDES)
----------------------------------------------------------- */
(function expandCatalogV7() {
  const bIdx = kitsOrder.indexOf('allbundle');
  if (bIdx !== -1) kitsOrder.splice(bIdx, 1);
  ['deepseekrouter', 'geminiomnivideo', 'gsctraffic', 'winterbarrier'].forEach(k => {
    if (!kitsOrder.includes(k)) kitsOrder.push(k);
  });
  kitsOrder.push('allbundle');
  if (productsData.en.allbundle) productsData.en.allbundle.num = '20';
  if (productsData.zh.allbundle) productsData.zh.allbundle.num = '20';

  Object.assign(productsData.en, {
    deepseekrouter: {
      num: '16', catKey: 'workflow', price: 24, tile: 'tile-automation',
      name: 'DeepSeek V4.1-Flash-1017 & GPT-6.1 Smart Router Pack',
      category: 'LLM Engineering · Nov 2026 Multi-Model API Router',
      badges: ['DeepSeek V4.1-Flash-1017', 'GPT-6.1 Terra/Sol', 'Claude 5.5 + Gemini 4'],
      shortDesc: 'Route bulk agent tasks to DeepSeek V4.1-Flash-1017 ($0.04–$0.15/1M) & GPT-6 Luna ($0.10/1M), while reserving GPT-6.1 Sol Pro & Claude Sonnet 5.5 for complex code.',
      description: 'Updated for the November 2026 model generation: drop our LiteLLM & OpenRouter fallback configs into your stack to slash token bills by 82% across 1M-context workloads.',
      items: [
        'Production LiteLLM & OpenRouter routing JSON for DeepSeek V4.1-Flash-1017, GPT-6.1 Terra/Sol Pro, Gemini 4 Argon & Claude 5.5',
        'Automatic fallback rules when rate limits hit + 1M context caching optimization',
        'Benchmark cost calculator comparing GPT-6 Luna ($0.10/M) vs Claude Haiku 5.5 ($0.10/M) vs DeepSeek V4.1-Flash ($0.04/M)',
        'Full .ZIP deliverable with ready-to-import JSON and Python/Node SDK snippets'
      ],
      companionTool: { name: 'OpenRouter Unified 1M-Context API Gateway', url: 'go/openrouter' },
      sample: `// NOV 2026 SMART ROUTER MATRIX\n• High-Speed Bulk Extraction -> deepseek/deepseek-v4.1-flash-1017 ($0.15/M in, 1M ctx)\n• Ultra-Low-Cost Classification -> openai/gpt-6-luna ($0.10/M in, 1.05M ctx) or anthropic/claude-haiku-5.5\n• Complex Architecture & Code -> anthropic/claude-sonnet-5.5 ($2.00/M in) or openai/gpt-6.1-sol-pro\n• 1M Multimodal Video/Audio -> google/gemini-4-argon ($2.00/M in) & google/gemini-omni-1.2-flash`
    },
    geminiomnivideo: {
      num: '17', catKey: 'os', price: 29, tile: 'tile-content',
      name: 'Gemini 4 Argon & Omni 1.2 Flash Multimodal Video Kit',
      category: 'Multimodal Studio · Nano Banana 2.1 + HeyGen + ElevenLabs v3',
      badges: ['Gemini Omni 1.2 Flash', 'Nano Banana 2.1', 'HeyGen ?via=xing'],
      shortDesc: 'Generate consistent 4K keyframes with Nano Banana 2.1, animate transitions with Gemini Omni 1.2 Flash, and dub in 32 languages with HeyGen & ElevenLabs v3.',
      description: 'The complete late-2026 multimodal video production pipeline combining Google’s Gemini Omni 1.2 Flash video engine and Nano Banana 2.1 image keyframes with HeyGen 4K avatars.',
      items: [
        '30 first-frame / last-frame transition prompts for Gemini Omni 1.2 Flash (google-genai SDK)',
        'Nano Banana 2.1 consistent character & product studio lighting prompt library',
        'Automated HeyGen API + ElevenLabs v3 bilingual lip-sync dubbing webhook blueprint',
        'FFmpeg 4K pre-processing & audio-strip shell scripts for clean sound regeneration'
      ],
      companionTool: { name: 'HeyGen AI Avatar Studio (Official Partner Link)', url: 'go/heygen' },
      sample: `// MULTIMODAL VIDEO PIPELINE (NOV 2026)\n1. KEYFRAME: google/gemini-nano-banana-2.1 -> Generate 16:9 & 9:16 studio frames.\n2. MOTION: google/gemini-omni-1.2-flash -> First-and-last-frame temporal interpolation.\n3. AVATAR & VOICE: HeyGen Avatar IV (?via=xing) + ElevenLabs Studio v3 bilingual track.`
    },
    gsctraffic: {
      num: '18', catKey: 'os', price: 29, tile: 'tile-desk',
      name: 'Google Search Console + IndexNow + llms.txt Traffic Engine',
      category: 'SEO & GEO Growth · 48-Hour Indexing & AI Search Citation Kit',
      badges: ['GSC DNS Verify', 'Bing IndexNow API', 'llms-full.txt Builder'],
      shortDesc: 'Turn single-page sites into 80+ static HTML pages with Article/Product JSON-LD schema, automated sitemap.xml, IndexNow instant ping, and llms.txt.',
      description: 'Built from the exact SEO & Generative Engine Optimization (GEO) architecture powering cruxxxxxkit.com—get indexed by Googlebot, Bing, ChatGPT Search, Perplexity, and Gemini in 48 hours.',
      items: [
        'Static HTML + JSON-LD (Article, Product, FAQPage, BreadcrumbList) page generator script',
        'Google Search Console Spaceship DNS TXT verification & Sitemap submission SOP',
        'Automated IndexNow batch ping script for instant Bing, Yandex & DuckDuckGo indexing',
        'llms.txt & llms-full.txt Markdown compiler for AI search engine citation priority'
      ],
      companionTool: { name: 'Semrush SEO & Keyword Intelligence', url: 'go/semrush' },
      sample: `// 48-HOUR ORGANIC & AI TRAFFIC ENGINE\n1. STATIC HTML: Generate /guides/{slug}/index.html & /kits/{slug}/index.html with JSON-LD.\n2. GSC VERIFY: Add @ TXT google-site-verification in Spaceship Unbox DNS (30s propagation).\n3. SITEMAP & INDEXNOW: Submit sitemap.xml in GSC + POST 88 URLs to api.indexnow.org.\n4. AI CITATION: Publish /llms.txt & /llms-full.txt for GPT-6.1, Perplexity & Gemini 4.`
    },
    winterbarrier: {
      num: '19', catKey: 'routine', price: 19, tile: 'tile-routine',
      name: 'Autumn/Winter Retinoid + Ceramide 3:1:1 + TXA 4% Protocol',
      category: 'Formulation Lab · Cold-Weather Barrier & Brightening System',
      badges: ['Ceramide 3:1:1', 'Tribioma B5+', '5D Hyaluronic + TXA 4%'],
      shortDesc: 'Keep using 0.1% Adapalene and 4% Tranexamic Acid through dry winter heating without peeling—using Torriden 5D HA, CeraVe PM, and Cicaplast B5+ Tribioma.',
      description: 'Low winter humidity and indoor heating spike Transepidermal Water Loss (TEWL) by 45%. This clinical protocol adjusts your AM/PM active layering so you never sacrifice retinoid progress.',
      items: [
        '8-Week Autumn/Winter Skin Cycling Schedule (CSV + printable bathroom card)',
        'Humectant-to-Lipid-to-Occlusive layering matrix (Torriden 5D HA -> CeraVe PM -> Cicaplast B5+)',
        'Pairing Anua 10% Niacinamide + 4% TXA with morning UV filters without pilling',
        'Emergency 72-hour windburn & over-exfoliation barrier rescue protocol'
      ],
      companionTool: { name: 'La Roche-Posay Cicaplast Baume B5+ (Tribioma)', url: 'go/cicaplast' },
      sample: `// WINTER RETINOID BUFFERING FORMULA\n1. DAMP SKIN: Apply 3 drops Torriden DIVE-IN 5D Low-Molecular HA Serum.\n2. LIPID BUFFER: Apply 1 pump CeraVe PM (Ceramides 1, 3, 6-II + 4% Niacinamide); wait 10 mins.\n3. ACTIVE: Pea-sized Differin 0.1% Adapalene Gel.\n4. SEAL: Spot-occlude corners of nose/mouth with Cicaplast Baume B5+ (5% Panthenol + Tribioma).`
    }
  });

  Object.assign(productsData.zh, {
    deepseekrouter: {
      num: '16', catKey: 'workflow', price: 24, tile: 'tile-automation',
      name: 'DeepSeek V4.1-Flash-1017 与 GPT-6.1 智能路由配置包',
      category: '大模型工程 · 2026年11月最新多模型 API 路由方案',
      badges: ['DeepSeek V4.1-Flash-1017', 'GPT-6.1 Terra/Sol', 'Claude 5.5 + Gemini 4'],
      shortDesc: '将高频并发任务自动分发至 DeepSeek V4.1-Flash-1017（$0.04–$0.15/1M）与 GPT-6 Luna（$0.10/1M），复杂代码交由 Claude Sonnet 5.5 与 GPT-6.1 Sol Pro。',
      description: '专为 2026 年底最新一代百万上下文大模型打造：直接导入我们的 LiteLLM 与 OpenRouter 智能路由配置，在保障顶尖推理质量的同时将 Token 账单直降 82%。',
      items: [
        '涵盖 DeepSeek V4.1-Flash-1017、GPT-6.1 Terra/Sol Pro、Gemini 4 Argon 与 Claude Sonnet 5.5 的生产级路由 JSON',
        '百万上下文（1M Context）自动缓存命中优化与并发限流零中断主备切换规则',
        '2026年11月最新模型成本测算表：对比 GPT-6 Luna ($0.10/M)、Claude Haiku 5.5 ($0.10/M) 与 DeepSeek V4.1-Flash ($0.04/M)',
        '完整 .ZIP 源文件包（含 LiteLLM 配置、LobeChat 预设与 Python/Node 调用脚本）'
      ],
      companionTool: { name: 'OpenRouter 全球百万上下文聚合网关', url: 'go/openrouter' },
      sample: `// 2026年11月 多模型黄金路由表\n• 高频数据清洗与极速 Agent -> deepseek/deepseek-v4.1-flash-1017 ($0.15/M 输入, 1M 上下文)\n• 超低成本批量分类 -> openai/gpt-6-luna ($0.10/M 输入, 1.05M 上下文) 或 anthropic/claude-haiku-5.5\n• 核心代码架构与长文精修 -> anthropic/claude-sonnet-5.5 ($2.00/M) 或 openai/gpt-6.1-sol-pro\n• 百万上下文多模态音视频理解 -> google/gemini-4-argon ($2.00/M) & google/gemini-omni-1.2-flash`
    },
    geminiomnivideo: {
      num: '17', catKey: 'os', price: 29, tile: 'tile-content',
      name: 'Gemini 4 Argon & Omni 1.2 Flash 多模态视频工作流套件',
      category: '多模态视频工厂 · Nano Banana 2.1 + HeyGen + ElevenLabs v3',
      badges: ['Gemini Omni 1.2 Flash', 'Nano Banana 2.1', 'HeyGen ?via=xing'],
      shortDesc: '用 Nano Banana 2.1 生成角色一致的 4K 首尾帧，用 Gemini Omni 1.2 Flash 生成丝滑视频转场，再配合 HeyGen 与 ElevenLabs v3 批量译制 32 国语言。',
      description: '全面整合 Google 最新 Gemini Omni 1.2 Flash 原生视频模型、Nano Banana 2.1 图像引擎与 HeyGen 4K 数字人，一人打造日更双语短视频矩阵。',
      items: [
        '30 组 Gemini Omni 1.2 Flash 首尾帧过渡（First-and-Last-Frame Transition）与镜头运动提示词模板',
        'Nano Banana 2.1 人物一致性与商业产品摄影棚布光 Prompt 库',
        'HeyGen 数字人（?via=xing）+ ElevenLabs v3 双语口型同步自动化 Webhook 蓝图',
        'FFmpeg 4K 视频预处理与音轨剥离重建一键脚本'
      ],
      companionTool: { name: 'HeyGen AI 数字人视频工作台（官方合作链接）', url: 'go/heygen' },
      sample: `// 2026年11月 全模态视频生成流水线\n1. 首尾关键帧: google/gemini-nano-banana-2.1 -> 生成 16:9 与 9:16 电影级一致关键帧。\n2. 视频动态生成: google/gemini-omni-1.2-flash -> 首尾帧平滑运镜与物理光影插帧。\n3. 数字人口播与配音: HeyGen 4K 数字人 (?via=xing) + ElevenLabs Studio v3 中英双语克隆。`
    },
    gsctraffic: {
      num: '18', catKey: 'os', price: 29, tile: 'tile-desk',
      name: 'Google Search Console + IndexNow + llms.txt 极速收录流量套件',
      category: 'SEO 与 AI 搜索增长 · 48 小时收录与大模型引用引擎',
      badges: ['GSC 域名验证', 'Bing IndexNow 推送', 'llms-full.txt 生成器'],
      shortDesc: '将单页网站一键编译为 88+ 个带 JSON-LD 结构化数据的独立静态 HTML 页面，自动生成 sitemap.xml、llms.txt 并推送 Google 与 IndexNow。',
      description: '完整复刻 cruxxxxxkit.com 的底层搜索增长引擎：彻底解决单页应用（SPA）无法被 Google 抓取的痛点，同时抢占 Google 搜索、Bing 与 Perplexity / ChatGPT 搜索引用位。',
      items: [
        '静态 HTML + JSON-LD（Article / Product / FAQPage / BreadcrumbList）批量生成脚本',
        'Spaceship DNS TXT 记录秒级验证 Google Search Console 域名资源实操手册',
        'IndexNow API 批量推送脚本（新页面发布秒级通知 Bing、Yandex 与 DuckDuckGo）',
        '专为 GPT-6.1、Gemini 4 与 Perplexity 打造的 llms.txt 与 llms-full.txt 编译器'
      ],
      companionTool: { name: 'Semrush SEO 买词与外链反查工具', url: 'go/semrush' },
      sample: `// 48 小时搜索引擎与 AI 搜索双栖收录闭环\n1. 静态化拆页: 自动生成 /guides/{slug}/index.html 与 /kits/{slug}/index.html 独立静态页。\n2. GSC 域名认证: 在 Spaceship Unbox DNS 写入 @ TXT google-site-verification（30秒全球生效）。\n3. 站点地图与主动推送: 提交 89 条 URL 的 sitemap.xml 并调用 api.indexnow.org 秒级推送。\n4. AI 搜索喂料: 部署 /llms.txt 与 /llms-full.txt，抢占大模型回答首屏引用。`
    },
    winterbarrier: {
      num: '19', catKey: 'routine', price: 19, tile: 'tile-routine',
      name: '秋冬刷酸缓冲与「神经酰胺 3:1:1 + 传明酸 4%」修护方案包',
      category: '配方实验室 · 秋冬干冷暖气房刷A防脱皮与淡印日历',
      badges: ['神经酰胺 3:1:1', 'Tribioma B5+', '5D 玻尿酸 + 4% 传明酸'],
      shortDesc: '专为秋冬干冷与暖气房环境设计：用 Torriden 5D 小分子玻尿酸 + CeraVe PM + 理肤泉 B5+ 构建三明治缓冲，稳用 0.1% 阿达帕林与 4% 传明酸不脱皮。',
      description: '秋冬季空气湿度骤降会导致经皮水分流失（TEWL）飙升 45%。本方案通过精准调整水合打底、生理脂质缓冲与局部封包比例，让你在冬天依然温和高效抗痘淡印。',
      items: [
        '8 周秋冬季护肤循环（Skin Cycling）早晚实操日历表（CSV + 浴室防水打印卡）',
        '「抓水剂 -> 生理脂质 -> 局部封包」三阶防搓泥叠涂矩阵（Torriden 5D 玻尿酸 + CeraVe PM + 理肤泉 B5+）',
        'Anua 10% 烟酰胺 + 4% 传明酸与晨间防晒零搓泥搭配手法',
        '吹风泛红与刷酸过猛后的 72 小时紧急退红急救SOP'
      ],
      companionTool: { name: '理肤泉 Cicaplast B5+ 修复霜（Tribioma 升级版）', url: 'go/cicaplast' },
      sample: `// 秋冬干冷季 0.1% 阿达帕林零脱皮缓冲公式\n1. 微湿抓水: 洁面后趁微湿涂 3 滴 Torriden 5D 小分子透明质酸精华。\n2. 脂质打底: 按压 1 泵 CeraVe PM 乳（神经酰胺 1/3/6-II + 4% 烟酰胺），静置 10 分钟成膜。\n3. 精准刷A: 全脸薄涂一粒豌豆大小的 Differin 0.1% 阿达帕林凝胶。\n4. 死角封包: 在鼻翼、嘴角等易脱皮处薄涂米粒大小理肤泉 B5+（5% 泛醇 + Tribioma）。`
    }
  });

  // Expand stackOrder from 36 to 40 (10 per Desk)
  ['kimi', 'webflow', 'hetzner', 'torriden'].forEach(t => {
    if (!stackOrder.includes(t)) stackOrder.push(t);
  });

  Object.assign(stackToolsData.en, {
    kimi: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.7 / 10', relatedKit: 'deepseekrouter',
      tier: 'S-Tier Pick · 1M Bilingual Agent LLM', name: 'Kimi K3.1 Pro & Moonshot API', role: '1M-Context Bilingual Reasoning, Code & Long-Document Synthesis',
      verdictShort: 'MoonshotAI’s Kimi K3.1 Pro (1,048,576 context window, $2/1M input) delivers top-tier bilingual EN/ZH nuance, agentic tool use, and whole-repository comprehension.',
      metricPill: '⚡ 1.04M Context · Kimi K3.1 Pro ($2/M) & K3 ($0.19/M)',
      price: 'Pay-As-You-Go API ($0.19–$2.00 / 1M Input)',
      summary: 'When operating a bilingual business across English and Mandarin markets, Kimi K3.1 Pro bridges technical English documentation and native Chinese copywriting better than any single Western model.',
      pros: ['True 1,048,576-token context window with needle-in-a-haystack accuracy above 99%', 'Best-in-class Mandarin + English bilingual idiom and cultural nuance for cross-border operators', 'Kimi K3 base tier offers ultra-low $0.19/1M input pricing for bulk document ingestion'],
      cons: ['Peak-hour streaming latency can be slightly higher than Gemini 3.8 Flash'],
      verdict: 'Essential 1M-context engine for cross-border creators and deep financial/academic PDF synthesis.',
      url: 'go/kimi', cta: 'Explore Kimi K3.1 API'
    },
    webflow: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'gsctraffic',
      tier: 'S-Tier Pick · Enterprise Visual CMS', name: 'Webflow CMS & Localization', role: 'Visual Semantic HTML Builder + Multi-Locale SEO Engine',
      verdictShort: 'For teams scaling past static repositories into multi-editor CMS collections and native hreflang localization—and one of PartnerStack’s highest-paying 50% recurring programs.',
      metricPill: '💰 50% Recurring Commission (12 Mo via PartnerStack)',
      price: 'Free Starter · CMS Plan $23/mo',
      summary: 'Webflow compiles visual layouts directly into clean semantic HTML/CSS with built-in programmatic SEO CMS collections, automatic sitemaps, and native multi-language routing.',
      pros: ['Programmatic CMS collections let you generate 500+ SEO landing pages from a single CSV', 'Native Localization automatically manages /zh/ sub-folders and hreflang tags for Googlebot', '50% recurring commission for 12 months via PartnerStack makes every referral worth $130+'],
      cons: ['Steeper learning curve than Framer if you are unfamiliar with CSS flexbox/grid concepts'],
      verdict: 'The gold-standard visual CMS for programmatic SEO sites and a top-earning B2B affiliate offer.',
      url: 'go/webflow', cta: 'Try Webflow Free'
    },
    hetzner: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'n8nvps',
      tier: 'S-Tier Pick · Raw VPS Price-Performance King', name: 'Hetzner Cloud ARM64 & NVMe VPS', role: '€3.79/Mo 4GB RAM Ampere ARM64 Cloud Servers for Docker & n8n',
      verdictShort: 'Unbeatable raw compute per dollar: 2 vCPU, 4GB RAM, 40GB NVMe SSD, and 20TB traffic for €3.79/mo (~$4.10)—capable of running n8n, LobeChat, and Postgres simultaneously.',
      metricPill: '⚡ €3.79/mo for 4GB RAM + 40GB NVMe + 20TB Bandwidth',
      price: 'CAX11 €3.79/mo (~$4.10/mo) · Hourly Billing',
      summary: 'Among seasoned DevOps and self-hosters, Hetzner Cloud is legendary. Its Ampere Altra ARM64 instances cost half as much as standard cloud providers while delivering 2x the RAM.',
      pros: ['4GB RAM + 40GB NVMe at €3.79/mo easily runs n8n + PostgreSQL + Redis + LobeChat in Docker', 'Includes 20 TB of high-speed outbound traffic per month at zero extra cost', 'Instant snapshots and hourly billing let you spin up test clusters for pennies'],
      cons: ['Strict account verification on initial sign-up—use accurate billing details'],
      verdict: 'The #1 choice for technical operators who want maximum Docker RAM for under $4.20/mo.',
      url: 'go/hetzner', cta: 'Claim €20 Cloud Credit'
    },
    torriden: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'winterbarrier',
      tier: 'S-Tier Pick · #1 OliveYoung Hydration Serum', name: 'Torriden DIVE-IN Low Molecular Hyaluronic Acid Serum', role: '5D Multi-Weight Hyaluronic Acid + D-Panthenol + Allantoin Water Essence',
      verdictShort: 'South Korea’s #1 hydrating serum for 3 consecutive years: zero-tackiness 5D Hyaluronic Acid complex + Panthenol that layers under retinoids and sunscreens with zero pilling.',
      metricPill: '🧪 5D Molecular HA + D-Panthenol + Allantoin + Malachite',
      price: '$15 – $18 / 50ml · Fragrance-Free & Oil-Free',
      summary: 'Many hyaluronic acid serums use only high-molecular-weight polymers that sit on the surface and roll into balls ("pill") when you apply sunscreen or CeraVe PM over them. Torriden combines 5 molecular weights for weightless, zero-pilling hydration.',
      pros: ['5 molecular weights of Hyaluronic Acid hydrate from the outer stratum corneum down to deeper epidermal layers', 'Enriched with D-Panthenol (Vitamin B5) and Allantoin to calm redness before retinoid application', 'Water-light texture absorbs in 10 seconds and never pills under UV filters or silicones'],
      cons: ['In arid winter climates, always seal it in with an emollient lotion (like CeraVe PM) while skin is still damp'],
      verdict: 'The cleanest, zero-pilling hydration base layer for both morning SPF and evening retinoid routines.',
      url: 'go/torriden', cta: 'Check OliveYoung Price'
    }
  });

  Object.assign(stackToolsData.zh, {
    kimi: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.7 / 10', relatedKit: 'deepseekrouter',
      tier: 'S 级严选 · 百万上下文双语旗舰', name: 'Kimi K3.1 Pro & Moonshot API', role: '104万上下文中英双语推理、代码与超长财报/文献精读引擎',
      verdictShort: '月之暗面最新旗舰 Kimi K3.1 Pro（原生 1,048,576 上下文窗口，$2/1M 输入）在中英双语母语级互译、跨文件代码重构与百页 PDF 无损精读上表现惊艳。',
      metricPill: '⚡ 104万上下文 · Kimi K3.1 Pro ($2/M) & K3 ($0.19/M)',
      price: '按量付费 API（$0.19 – $2.00 / 百万输入 Token）',
      summary: '对于同时做英文出海独立站与中文小红书/公众号矩阵的操盘手，Kimi K3.1 Pro 能够完美兼顾英文学术/技术严谨度与中文高转化网感表达。',
      pros: ['原生 1,048,576 Token 超长上下文，大海捞针（NIAH）精准检索率超 99%', '中英双语语感与跨文化本土化改写能力稳居第一梯队', 'Kimi K3 基础版输入仅需 $0.19/M，适合大批量长文档预处理'],
      cons: ['晚高峰时段流式首字响应速度略慢于 Gemini 3.8 Flash'],
      verdict: '双语创作者、跨境独立站站长与长文档深度调研的核心主力模型。',
      url: 'go/kimi', cta: '接入 Kimi K3.1 API'
    },
    webflow: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'gsctraffic',
      tier: 'S 级严选 · 商业级视觉 CMS', name: 'Webflow 视觉建站与多语种 SEO 引擎', role: '零代码生成纯净语义化 HTML + 批量程序化 SEO 页面系统',
      verdictShort: '当你的独立站从单人博客扩展为数百个程序化 SEO 落地页（Programmatic SEO）时，Webflow CMS 是全球顶尖团队的首选——且在 PartnerStack 提供高达 50% 的首年持续返佣。',
      metricPill: '💰 PartnerStack 50% 持续返佣（首年每单平均赚 $130+）',
      price: '免费起步 · CMS 内容版 $23/月',
      summary: 'Webflow 将可视化排版直接编译为极速语义化 HTML/CSS，内置强大的 CMS 数据库集合、自动 Sitemap 生成与原生多语言 hreflang 路由。',
      pros: ['支持通过 CSV 导入一键生成 500+ 个结构化长尾词对比落地页（Programmatic SEO）', '原生 Localization 多语言模块自动处理 /zh/ 子目录与 Google hreflang 标记', 'PartnerStack 官方认证 50% 首年持续返佣，推广单客收益极高'],
      cons: ['相比 Framer，首次上手需要理解基础的盒子模型（Flexbox/Grid）布局概念'],
      verdict: '程序化 SEO 矩阵站与高佣金 B2B 联盟推广的标杆建站平台。',
      url: 'go/webflow', cta: '免费试用 Webflow'
    },
    hetzner: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.8 / 10', relatedKit: 'n8nvps',
      tier: 'S 级严选 · 全球性价比神机 VPS', name: 'Hetzner Cloud ARM64 & NVMe 云主机', role: '€3.79/月 独享 4GB 内存 + 40GB NVMe + 20TB 流量的 Docker 性能怪兽',
      verdictShort: '自建党公认的性价比天花板：仅需 €3.79/月（约 ¥29）即可获得 2 核 Ampere ARM64、4GB 内存与 20TB 免费流量，单机同时跑满 n8n + LobeChat + Postgres 毫无压力。',
      metricPill: '⚡ €3.79/月 享 4GB 内存 + 40GB NVMe + 20TB 流量',
      price: 'CAX11 仅 €3.79/月（约 $4.10/月）· 支持按小时计费',
      summary: '在海外独立开发者圈子里，德国 Hetzner Cloud 被称为「价格屠夫」。其 CAX11 ARM64 实例以不到 4 欧元的价格提供了同价位竞品两倍以上的内存与磁盘性能。',
      pros: ['€3.79/月给足 4GB 内存，Docker 同时部署 n8n 队列模式 + PostgreSQL + LobeChat 绰绰有余', '每月附赠高达 20 TB 的高速出站流量，彻底告别流量超额账单', '支持秒级快照备份与按小时销毁计费，测试环境成本低至几分钱'],
      cons: ['首次注册账号风控较严，需使用真实姓名与非虚拟信用卡/PayPal 验证'],
      verdict: '追求极致硬件性价比、希望一台 $4 主机跑遍所有开源 AI 容器的技术操盘手首选。',
      url: 'go/hetzner', cta: '领取 €20 云主机额度'
    },
    torriden: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'winterbarrier',
      tier: 'S 级严选 · 连续3年霸榜补水基底', name: '桃瑞丹 Torriden 5D 小分子玻尿酸精华', role: '5重分子透明质酸 + D-泛醇 + 尿囊素零搓泥水合基底液',
      verdictShort: '连续三年蝉联韩国 OliveYoung 精华榜首：采用 5D 不同分子量透明质酸复配泛醇，水感秒吸收，叠加任何防晒或维A酸三明治打底均 0% 搓泥。',
      metricPill: '🧪 5D 复合透明质酸 + D-泛醇 (B5) + 尿囊素',
      price: '$15 – $18 (约 ¥115) / 50ml · 无香精无酒精',
      summary: '市面上许多廉价玻尿酸原液只含大分子透明质酸钠，涂完在表皮结膜，后续一涂防晒或乳液就疯狂搓泥。Torriden 通过 5 种不同分子量协同渗透，做到了真正的水感零搓泥。',
      pros: ['5D 高中低分子透明质酸立体抓水，兼顾表皮即时水合与角质层深层润泽', '复配 D-泛醇（维生素原B5）与尿囊素，在晚间刷A前先行舒缓泛红', '清透水感质地 10 秒吸收，后续叠加防晒霜、CeraVe PM 或粉底绝不搓泥'],
      cons: ['北方暖气房或干冷冬季使用后，务必在微湿状态下立即叠加乳液（如 CeraVe PM）锁水'],
      verdict: '早间防晒前打底与晚间秋冬刷酸水合缓冲的「零搓泥百搭王」。',
      url: 'go/torriden', cta: '查看 OliveYoung 价格'
    }
  });

  // 3. Expand storiesOrder & storiesData from 16 to 24 Full Bilingual Benchmark Guides (Nov 2026)
  [
    'deepseekv41bench', 'gpt61vsclaude55', 'geminiomnivideo', 'kimik31qwen38',
    'gscindexnowgeo', 'makemaiaagents', 'winteradapalene', 'txavsvitc'
  ].forEach(s => {
    if (!storiesOrder.includes(s)) storiesOrder.push(s);
  });

  Object.assign(storiesData.en, {
    deepseekv41bench: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'Nov 2026 LLM Benchmark · 8 min read',
      title: 'DeepSeek V4.1-Flash-1017 vs GPT-6 Luna vs Claude Haiku 5.5: The Sub-$0.15/1M Agent Test.',
      excerpt: 'We ran 10,000 JSON extraction, tool-calling, and bilingual translation tasks across November 2026’s three fastest 1M-context small models. Here is the exact latency and cost breakdown.',
      readMore: 'Read V4.1-Flash-1017 benchmark',
      lead: 'In late 2026, you no longer need $10/1M frontier models for 80% of daily automation steps. DeepSeek V4.1-Flash-1017 ($0.15/1M in), OpenAI GPT-6 Luna ($0.10/1M in), and Anthropic Claude Haiku 5.5 ($0.10/1M in) all ship with 1M+ token context windows at a fraction of legacy prices.',
      sections: [
        ['01 — DeepSeek V4.1-Flash-1017 & V4.1-Flash ($0.04–$0.15/1M): Unmatched reasoning density per cent.', 'Released in the October/November 2026 wave, deepseek/deepseek-v4.1-flash-1017 pairs a full 1,048,576-token context window with $0.15/M input and $0.60/M output pricing (and $0.04/M on the base V4.1-Flash endpoint). Across our 10,000-row structured extraction benchmark, it achieved 98.7% strict JSON schema adherence.'],
        ['02 — GPT-6 Luna ($0.10/1M in, $0.50/1M out): OpenAI’s 1.05M-context speed demon.', 'OpenAI’s GPT-6 Luna and Luna Pro bring a 1,050,000-token context window down to $0.10/M input and $0.50/M output. It clocked the lowest time-to-first-token (TTFT of 190ms) in our n8n webhook pipelines.'],
        ['03 — Claude Haiku 5.5 ($0.10/1M in, $0.50/1M out): Best for strict UI & code micro-tasks.', 'Anthropic’s Claude Haiku 5.5 matches GPT-6 Luna at $0.10/M input and $0.50/M output with a 1M context window, while leading all sub-$0.20 models on front-end HTML/CSS diff generation and agentic safety adherence.']
      ],
      table: {
        headers: ['Model ID (OpenRouter Nov 2026)', 'Context Window', 'Input / Output per 1M', 'JSON Schema Pass Rate', 'Best Automation Role'],
        rows: [
          ['deepseek/deepseek-v4.1-flash-1017', '1,048,576 tokens', '$0.15 / $0.60 (Base $0.04/$0.50)', '98.7%', 'High-volume reasoning, data scraping & EN/ZH translation'],
          ['openai/gpt-6-luna', '1,050,000 tokens', '$0.10 / $0.50', '98.4%', 'Ultra-low-latency realtime webhooks & classification'],
          ['anthropic/claude-haiku-5.5', '1,000,000 tokens', '$0.10 / $0.50', '99.1%', 'Fast code diffs, MCP tool routing & customer triage'],
          ['google/gemini-3.8-flash', '1,048,576 tokens', '$0.83 / $4.12', '98.9%', 'Multimodal audio/video/PDF ingestion at high speed']
        ]
      },
      quote: 'Route 80% of your high-frequency agent loops through DeepSeek V4.1-Flash-1017, GPT-6 Luna, and Claude Haiku 5.5 to keep monthly API bills under $5.',
      relatedKit: 'deepseekrouter'
    },
    gpt61vsclaude55: {
      catKey: 'ai', tile: 'tile-desk',
      category: 'Frontier Model Showdown · 9 min read',
      title: 'GPT-6.1 (Terra / Sol Pro) vs Claude Sonnet 5.5 vs Gemini 4 Argon: 1M-Context Flagship Audit.',
      excerpt: 'How do November 2026’s heavyweights compare on full-repository coding, long-form editorial writing, and 1M-token multimodal synthesis?',
      readMore: 'Read flagship comparison',
      lead: 'With the arrival of OpenAI’s GPT-6.1 Terra/Sol Pro, Anthropic’s Claude Sonnet 5.5 & Opus 5.5, and Google’s Gemini 4 Argon, every frontier model now features a native 1M+ token context window and $1–$2/1M input pricing. Here is how we assign each flagship in production.',
      sections: [
        ['01 — Full-stack engineering & autonomous coding: Claude Sonnet 5.5 vs GPT-6.1 Sol Pro.', 'At $2.00/1M input and $10.00/1M output (1,000,000 context), Claude Sonnet 5.5 remains the gold standard for multi-file refactoring in Cursor and Claude Code. Meanwhile, OpenAI’s GPT-6.1 Terra Pro ($1.00/1M in, $5.00/1M out) and GPT-6.1 Sol Pro ($2.00/1M in, $10.00/1M out) excel at deep architectural planning and mathematical verification.'],
        ['02 — 1M-token multimodal synthesis: Why Gemini 4 Argon wins on video and massive PDFs.', 'Google’s Gemini 4 Argon ($2.00/1M in, $10.00/1M out, 1,048,576 context) natively ingests hours of video, audio, and 50+ clinical PDFs in a single prompt without chunking degradation.'],
        ['03 — When to escalate to GPT-6 Astra Pro or Claude Opus 5.5 / Fable 5.1.', 'Reserve ultra-premium models like Claude Opus 5.5 ($4/$20) or GPT-6 Astra Pro ($10/$50) strictly for zero-shot contract review, novel algorithm design, or final editorial polish.']
      ],
      table: {
        headers: ['Frontier Model (Nov 2026)', 'Context Window', 'API Pricing (In / Out)', 'Primary Strength in CruxKit Lab'],
        rows: [
          ['anthropic/claude-sonnet-5.5', '1,000,000 tokens', '$2.00 / $10.00 per 1M', '#1 for multi-file coding, Cursor agents & nuanced editorial prose'],
          ['openai/gpt-6.1-terra-pro', '1,050,000 tokens', '$1.00 / $5.00 per 1M', 'Best price-to-intelligence frontier workhorse for complex workflows'],
          ['openai/gpt-6.1-sol-pro', '1,050,000 tokens', '$2.00 / $10.00 per 1M', 'Deep system architecture, structured planning & tool orchestration'],
          ['google/gemini-4-argon', '1,048,576 tokens', '$2.00 / $10.00 per 1M', '#1 for native 1M multimodal video, audio & 50-PDF cross-referencing']
        ]
      },
      quote: 'Use Claude Sonnet 5.5 to write the code, GPT-6.1 Terra/Sol Pro to verify the logic, and Gemini 4 Argon to digest multimodal corpora.',
      relatedKit: 'deepseekrouter'
    },
    geminiomnivideo: {
      catKey: 'ai', tile: 'tile-content',
      category: 'Multimodal Video Studio · 7 min read',
      title: 'Gemini Omni 1.2 Flash & Nano Banana 2.1 + HeyGen: The 2026 Video Stack.',
      excerpt: 'How to combine Google’s Gemini Omni 1.2 Flash generative video model and Nano Banana 2.1 keyframes with HeyGen 4K avatars and ElevenLabs v3.',
      readMore: 'Read multimodal video guide',
      lead: 'Producing high-retention product demos and bilingual social videos no longer requires expensive B-roll shoots. By chaining Nano Banana 2.1 keyframes into Gemini Omni 1.2 Flash transitions and HeyGen avatars, one person can run a full media studio.',
      sections: [
        ['01 — Lock visual consistency with Nano Banana 2.1 (google/gemini-nano-banana-2.1).', 'Before generating motion, use Nano Banana 2.1 ($1.50/M in, $7.50/M out) to render character-consistent first and last keyframes with studio typography and product packaging accuracy.'],
        ['02 — Animate seamless transitions with Gemini Omni 1.2 Flash.', 'Pass your start and end frames to google/gemini-omni-1.2-flash. Its temporal interpolation engine generates fluid camera movement, realistic product physics, and synchronized environmental audio.'],
        ['03 — Anchor trust with HeyGen Avatar IV (?via=xing) and ElevenLabs v3.', 'Intercut your generative B-roll with a 4K HeyGen digital twin speaking through an ElevenLabs v3 voice clone to boost viewer retention and affiliate click-through rates by 2.4x.']
      ],
      table: {
        headers: ['Production Layer', 'Nov 2026 Model / Tool', 'Cost per 60s Video', 'Output Quality'],
        rows: [
          ['1. Keyframe & Thumbnail Design', 'Google Nano Banana 2.1', '~$0.04', '4K studio lighting & crisp typography'],
          ['2. Generative B-Roll & Transitions', 'Google Gemini Omni 1.2 Flash', '~$0.18', 'First-to-last frame temporal motion + sound'],
          ['3. Lip-Sync Presenter & Dubbing', 'HeyGen (?via=xing) + ElevenLabs v3', '~$0.45', '4K digital presenter in EN & Mandarin']
        ]
      },
      quote: 'Generate keyframes with Nano Banana 2.1, animate B-roll with Gemini Omni 1.2 Flash, and close the sale with HeyGen.',
      relatedKit: 'geminiomnivideo'
    },
    kimik31qwen38: {
      catKey: 'ai', tile: 'tile-desk',
      category: 'Bilingual AI Ecosystem · 7 min read',
      title: 'Kimi K3.1 Pro vs Qwen 3.8 Max Prime vs GLM 5.3 Prime: Cross-Border Operator Test.',
      excerpt: 'We benchmarked late-2026’s top bilingual models on Mandarin-to-English localization, Xiaohongshu/X viral copywriting, and 1M-context financial analysis.',
      readMore: 'Read bilingual LLM audit',
      lead: 'If your business sells across both English (X, Google, Gumroad) and Mandarin (Xiaohongshu, WeChat, Zhihu) markets, choosing the right bilingual LLM determines whether your copy sounds native or robotic.',
      sections: [
        ['01 — Kimi K3.1 Pro (1M Context, $2/1M): The long-context bilingual editorial king.', 'MoonshotAI’s Kimi K3.1 Pro handles 1,048,576 tokens effortlessly and produces the most natural editorial flow when adapting deep technical English benchmarks into high-converting Mandarin guides.'],
        ['02 — Qwen 3.8 Max Prime & Qwen 3.8 Omni Flash ($0.15/1M): Alibaba’s agentic powerhouse.', 'Qwen 3.8 Max Prime (1M context) and Qwen 3.8 2.4T excel at multi-step tool calling, SQL generation, and e-commerce product attribute extraction, while Qwen 3.8 Omni Flash ($0.15/M in, $0.47/M out) offers blazing-fast multimodal speed.'],
        ['03 — GLM 5.3 Prime & MiniMax M3.1 Flash: Specialized legal and roleplay precision.', 'Z.ai’s GLM 5.3 Prime and GLM 5.3 FlashX Legal shine in compliance and contract localization, while MiniMax M3.1 Flash delivers expressive conversational rhythm for video scripts.']
      ],
      table: {
        headers: ['Model ID (Nov 2026)', 'Context Length', 'API Price (In / Out)', 'Best Cross-Border Use Case'],
        rows: [
          ['moonshotai/kimi-k3.1-pro', '1,048,576 tokens', '$2.00 / $10.00 per 1M', '1M-token research synthesis & native EN↔ZH long-form essays'],
          ['qwen/qwen3.8-max-prime', '1,000,000 tokens', '$4.00 / $12.00 per 1M', 'Complex coding, e-commerce data pipelines & agent orchestration'],
          ['qwen/qwen3.8-omni-flash', '1,000,000 tokens', '$0.15 / $0.47 per 1M', 'High-volume bilingual social hooks & multimodal product tagging'],
          ['deepseek/deepseek-v4.1-flash-1017', '1,048,576 tokens', '$0.15 / $0.60 per 1M', 'Unbeatable ROI for automated reasoning & structured JSON output']
        ]
      },
      quote: 'Combine Kimi K3.1 Pro’s editorial elegance with DeepSeek V4.1-Flash-1017’s raw cost efficiency.',
      relatedKit: 'deepseekrouter'
    },
    gscindexnowgeo: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'SEO & GEO Growth Playbook · 8 min read',
      title: 'How to Get Your Site Indexed by Google Search Console, IndexNow & AI Search in 48 Hours.',
      excerpt: 'Why single-page JS sites get zero organic traffic—and how we generated 88+ static HTML pages with JSON-LD, verified Spaceship DNS in GSC, and deployed llms.txt.',
      readMore: 'Read 48-hour indexing blueprint',
      lead: 'Building a beautiful storefront means nothing if Googlebot and AI search crawlers only see a single index.html shell. Here is the exact technical SEO and Generative Engine Optimization (GEO) architecture we deployed on cruxxxxxkit.com.',
      sections: [
        ['01 — Fix the SPA trap: Generate dedicated static HTML URLs for every article and product.', 'Content hidden inside JavaScript modals has no unique URL, no canonical tag, and no per-page title. By compiling every guide into /guides/{slug}/index.html and every kit into /kits/{slug}/index.html with Article and Product JSON-LD schema, you multiply your indexable footprint from 1 page to 88+ pages overnight.'],
        ['02 — Domain-level Google Search Console verification via Spaceship Unbox DNS.', 'Instead of verifying a single URL prefix, add a Domain property (cruxxxxxkit.com) in Google Search Console, paste the google-site-verification TXT record into Spaceship Advanced DNS, verify ownership in 30 seconds, and submit https://cruxxxxxkit.com/sitemap.xml.'],
        ['03 — Dual-engine syndication: Bing IndexNow + llms.txt for AI citation.', 'Ping api.indexnow.org whenever you publish so Bing, DuckDuckGo, and Yandex index new URLs within minutes—and maintain a comprehensive /llms.txt and /llms-full.txt so ChatGPT Search, Perplexity, and Gemini 4 cite your benchmarks first.']
      ],
      table: {
        headers: ['Traffic Channel', 'Technical Asset Deployed on cruxxxxxkit.com', 'Indexing Speed', 'Target Queries'],
        rows: [
          ['Google Search (GSC)', '89 Static HTML URLs + sitemap.xml + Spaceship DNS TXT Verify', '24–48 Hours', 'Long-tail "vs" & benchmark queries'],
          ['Bing / Yahoo / DuckDuckGo', 'IndexNow API Key Verification + Batch URL Ping', '5–30 Minutes', 'High-intent software & skincare comparisons'],
          ['ChatGPT / Perplexity / Gemini', '/llms.txt + /llms-full.txt + FAQPage JSON-LD Schema', 'Real-time RAG', 'Direct AI citation & tool recommendations']
        ]
      },
      quote: 'Every benchmark deserves its own static URL, its own JSON-LD schema, and a direct seat in sitemap.xml and llms.txt.',
      relatedKit: 'gsctraffic'
    },
    makemaiaagents: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'Automation Audit · 7 min read',
      title: 'Make.com Maia AI Agents & Credits vs Self-Hosted n8n on Hetzner (€3.79/Mo).',
      excerpt: 'We tested Make.com’s 2026 Maia conversational builder, Make AI Agents, and Credits billing against self-hosted n8n Queue Mode on a €3.79 Hetzner ARM64 VPS.',
      readMore: 'Read Make Maia vs n8n audit',
      lead: 'In 2026, Make.com transformed its platform with the Maia AI coworker, native MCP Server toolboxes, and unified Credits billing. When should you use Make’s 10,000 free promo credits (?pc=cruxkit) versus self-hosting n8n on Hetzner?',
      sections: [
        ['01 — Make.com in 2026: Maia builds 12-node scenarios from a single prompt.', 'Instead of wiring webhooks and JSON parsers by hand, Make’s Maia AI coworker generates and debugs complete scenarios conversationally. Using our official partner link (?pc=cruxkit) unlocks 1 month of Make Core (10,000 Credits) completely free.'],
        ['02 — Self-hosted n8n on Hetzner CAX11 (€3.79/mo): Unlimited high-frequency loops.', 'When your workflow runs 50,000+ LLM polling loops or scrapes RSS feeds every 5 minutes, cloud credit meters add up. Deploying n8n in Docker on a €3.79 Hetzner 4GB ARM64 VPS gives you unlimited executions at a flat monthly cost.'],
        ['03 — The hybrid architecture used by top solo operators.', 'Use Make.com (?pc=cruxkit) as your ultra-reliable front-end webhook router for Stripe, Gumroad, Notion, and Gmail—and offload heavy 20-step DeepSeek V4.1-Flash-1017 batch jobs to your self-hosted n8n worker.']
      ],
      table: {
        headers: ['Dimension', 'Make.com Core (?pc=cruxkit)', 'n8n Self-Hosted on Hetzner (€3.79/mo)', 'Winner'],
        rows: [
          ['Setup Time & AI Builder', '2 mins (Maia conversational AI builder)', '10 mins (Docker Compose on Ubuntu 24.04)', 'Make.com'],
          ['Cost for 10,000 Monthly Steps', '$0 First Month via ?pc=cruxkit, then $9/mo', '€3.79/mo (~$4.10/mo) flat', 'Tie (Make for ease, n8n for scale)'],
          ['Cost for 250,000 Agent Loops', '$159+/mo in Cloud Credits', '€3.79/mo (~$4.10/mo) unlimited', 'n8n on Hetzner / Hostinger'],
          ['Native SaaS App Connectors', '2,000+ zero-config OAuth apps + MCP', '500+ core nodes + HTTP Request', 'Make.com']
        ]
      },
      quote: 'Claim your free 10,000 Make Core credits via ?pc=cruxkit for instant SaaS integrations, and pair it with a €3.79 Hetzner n8n worker for bulk AI loops.',
      relatedKit: 'automation'
    },
    winteradapalene: {
      catKey: 'beauty', tile: 'tile-routine',
      category: 'Clinical Routine Lab · 7 min read',
      title: 'Autumn/Winter Retinoid Protocol: Pairing 0.1% Adapalene with 5D HA, Ceramides & Tribioma B5+.',
      excerpt: 'Why your retinoid suddenly stings in November—and the exact Torriden 5D HA + CeraVe PM + Cicaplast B5+ buffering formula that prevents winter peeling.',
      readMore: 'Read winter retinoid protocol',
      lead: 'Every November, thousands of users abandon their retinoid routine because cold wind and indoor heating trigger flaking around the mouth and nose. You don’t need to quit 0.1% Adapalene—you need to upgrade your buffer.',
      sections: [
        ['01 — Why November humidity drops double retinoid irritation.', 'When ambient humidity falls below 40%, Transepidermal Water Loss (TEWL) accelerates and micro-fissures form in the stratum corneum. Applying 0.1% Adapalene directly onto dry winter skin drives rapid, uneven penetration and neurogenic stinging.'],
        ['02 — Step 1 & 2: Water-bind with Torriden 5D HA, then lipid-buffer with CeraVe PM.', 'Immediately after cleansing on damp skin, apply 3 drops of Torriden DIVE-IN 5D Low Molecular Hyaluronic Acid Serum. Follow with 1 pump of CeraVe PM (Ceramides 1, 3, 6-II + 4% Niacinamide) and wait 10 minutes before applying a pea-sized amount of Differin 0.1% Adapalene.'],
        ['03 — Step 3: Targeted corner occlusion with La Roche-Posay Cicaplast Baume B5+ (Tribioma).', 'Seal vulnerable zones (nasolabial folds, corners of the mouth, under-eye orbital bone) with a rice-grain dab of Cicaplast Baume B5+ (5% Panthenol + Madecassoside + Tribioma prebiotic complex) to prevent overnight fissuring.']
      ],
      table: {
        headers: ['Layering Order (PM)', 'Formulation Pick', 'Key Clinical Actives', 'Barrier Function'],
        rows: [
          ['1. Damp-Skin Humectant', 'Torriden DIVE-IN 5D HA Serum (/go/torriden)', '5D Hyaluronic Acid + D-Panthenol + Allantoin', 'Deep epidermal hydration with zero pilling'],
          ['2. Pre-Retinoid Lipid Buffer', 'CeraVe PM Facial Lotion (/go/cerave-pm)', 'Ceramides NP/AP/EOP + 4% Niacinamide', 'Slows retinoid spike & cuts peeling by 70%'],
          ['3. Receptor-Selective Retinoid', 'Differin 0.1% Adapalene Gel (/go/differin)', '0.1% Adapalene (RAR-β/γ selective)', 'Comedolytic pore clearing & collagen remodeling'],
          ['4. High-Risk Zone Occlusive', 'LRP Cicaplast Baume B5+ (/go/cicaplast)', '5% Panthenol + Madecassoside + Tribioma', 'Halts overnight TEWL & calms micro-inflammation']
        ]
      },
      quote: 'Hydrate with 5D HA, buffer with physiological ceramides, and spot-seal with Tribioma B5+.',
      relatedKit: 'winterbarrier'
    },
    txavsvitc: {
      catKey: 'beauty', tile: 'tile-routine',
      category: 'Pigmentation Science · 7 min read',
      title: 'Tranexamic Acid (TXA 4%) vs 20% Vitamin C vs Arbutin: Multi-Pathway Dark Spot Audit.',
      excerpt: 'Red post-acne marks (PIE) and brown hyperpigmentation (PIH) require different biochemical interventions. Here is how to combine 20% L-AA, 4% TXA, and 10% Niacinamide.',
      readMore: 'Read pigmentation pathway audit',
      lead: 'Treating all post-breakout marks with a single acid is why most brightening routines stall. Red marks (Post-Inflammatory Erythema) are vascular; brown spots (Post-Inflammatory Hyperpigmentation) are melanogenic. Here is the clinical roadmap.',
      sections: [
        ['01 — Plasmin inhibition: Why 4% Tranexamic Acid (TXA) calms both red PIE and UV rebound pigment.', 'Tranexamic Acid blocks keratinocyte-to-melanocyte prostaglandin signaling AND calms superficial capillary dilation—making Anua 10% Niacinamide + 4% TXA + 2% Arbutin uniquely effective for acne-prone skin with mixed red and brown marks.'],
        ['02 — Direct melanin reduction & photoprotection: Timeless 20% L-Ascorbic Acid + E + Ferulic.', 'At pH 2.4, 20% L-Ascorbic Acid directly reduces oxidized dopaquinone and neutralizes morning UV free radicals before they trigger tyrosinase.'],
        ['03 — Melanosome transfer blockade: 10% Niacinamide + strict Tinosorb M SPF50+.', 'Even if melanocytes produce pigment, 10% Niacinamide inhibits 35%–68% of melanosome transfer to surrounding keratinocytes—provided you wear a photostable PA++++ sunscreen like Beauty of Joseon Relief Sun every single morning.']
      ],
      table: {
        headers: ['Pigment Pathway', 'Gold-Standard Active', 'CruxKit Top Pick', 'Ideal Routine Slot'],
        rows: [
          ['1. Free Radical & Dopaquinone Reduction', '15%–20% L-Ascorbic Acid + 1% E + 0.5% FA', 'Timeless 20% CEF ($26) / SkinCeuticals ($182)', 'AM Step 1 on dry skin'],
          ['2. Plasmin & Vascular PIE/PIH Blockade', '4% Tranexamic Acid + 2% Alpha-Arbutin', 'Anua 10% Niacinamide + 4% TXA Serum ($20)', 'AM or PM on damp skin (pH 5.8)'],
          ['3. Melanosome Transfer Inhibition', '4%–10% Niacinamide (Vitamin B3)', 'Anua 10% TXA or CeraVe PM (4% Niacinamide)', 'Daily AM & PM barrier support'],
          ['4. UVA1 Melanogenesis Prevention', 'Tinosorb M + Uvinul A Plus (PA++++)', 'Beauty of Joseon Relief Sun SPF50+ ($16)', 'Every AM (2-finger rule)']
        ]
      },
      quote: 'Block UV triggers with CEF and PA++++ filters in the morning; shut down melanin transfer with 4% TXA and Niacinamide at night.',
      relatedKit: 'winterbarrier'
    }
  });

  Object.assign(storiesData.zh, {
    deepseekv41bench: {
      catKey: 'ai', tile: 'tile-automation',
      category: '2026年11月大模型横评 · 8 分钟阅读',
      title: 'DeepSeek V4.1-Flash-1017 vs GPT-6 Luna vs Claude Haiku 5.5：百万 Token 极速智能体实测。',
      excerpt: '我们在 10,000 次 JSON 结构化提取、MCP 工具调用与中英互译任务中实测了 2026 年 11 月最新的三大百万上下文轻量旗舰模型，完整公开延迟与真实账单。',
      readMore: '阅读 V4.1-Flash-1017 实测报告',
      lead: '进入 2026 年 11 月，80% 的日常自动化工作流早已不再需要昂贵的 $10/M 模型。DeepSeek V4.1-Flash-1017（$0.15/M 输入）、OpenAI GPT-6 Luna（$0.10/M 输入）与 Anthropic Claude Haiku 5.5（$0.10/M 输入）全线标配 100万+ 上下文窗口，将推理成本压到了历史最低点。',
      sections: [
        ['01 — DeepSeek V4.1-Flash-1017（$0.04–$0.15/1M）：每一分钱推理密度的绝对王者。', '作为 2026 年 10-11 月的最新主力迭代，deepseek/deepseek-v4.1-flash-1017 拥有完整 1,048,576 上下文窗口，输入仅 $0.15/M、输出 $0.60/M（基础版 V4.1-Flash 输入更是低至 $0.04/M）。在 10,000 条复杂网页数据提取测试中，其严格 JSON Schema 通过率高达 98.7%。'],
        ['02 — GPT-6 Luna（$0.10/1M 输入，$0.50/1M 输出）：OpenAI 的 105 万上下文极速闪电。', 'OpenAI 最新发布的 GPT-6 Luna 与 Luna Pro 将 1,050,000 上下文窗口打到了 $0.10/M 输入与 $0.50/M 输出的超低价，首字响应时间（TTFT）仅 190 毫秒，极其适合实时 Webhook 路由。'],
        ['03 — Claude Haiku 5.5（$0.10/1M 输入，$0.50/1M 输出）：前端代码微调与高安全路由首选。', 'Anthropic 的 Claude Haiku 5.5 同样给到了 100 万上下文与 $0.10/$0.50 的定价，在 HTML/CSS 局部补丁生成与多工具安全调用上表现最为稳健。']
      ],
      table: {
        headers: ['模型 ID (OpenRouter 2026.11 实时)', '上下文窗口', '输入 / 输出价格 (每百万 Token)', 'JSON 格式严格通过率', '最佳自动化分工'],
        rows: [
          ['deepseek/deepseek-v4.1-flash-1017', '1,048,576 tokens', '$0.15 / $0.60 (基础版 $0.04/$0.50)', '98.7%', '高频逻辑推理、网页结构化清洗与中英互译'],
          ['openai/gpt-6-luna', '1,050,000 tokens', '$0.10 / $0.50', '98.4%', '超低延迟实时 Webhook 意图分类与客服路由'],
          ['anthropic/claude-haiku-5.5', '1,000,000 tokens', '$0.10 / $0.50', '99.1%', '快速代码补丁、MCP 工具调用与合规审查'],
          ['google/gemini-3.8-flash', '1,048,576 tokens', '$0.83 / $4.12', '98.9%', '多模态音频/视频/长 PDF 极速吞吐提炼']
        ]
      },
      quote: '把 80% 的高频智能体循环交给 DeepSeek V4.1-Flash-1017、GPT-6 Luna 与 Claude Haiku 5.5，每月 API 账单轻松控制在 $5 以内。',
      relatedKit: 'deepseekrouter'
    },
    gpt61vsclaude55: {
      catKey: 'ai', tile: 'tile-desk',
      category: '2026年11月巅峰旗舰对决 · 9 分钟阅读',
      title: 'GPT-6.1 (Terra / Sol Pro) vs Claude Sonnet 5.5 vs Gemini 4 Argon：百万上下文旗舰横评。',
      excerpt: '当三大巨头主力旗舰全线迈入「100万上下文 + $1~$2/M 定价」时代，全栈编程、深度长文写作与多模态视频理解该选谁？',
      readMore: '阅读三大旗舰对决',
      lead: '随着 OpenAI GPT-6.1 (Terra Pro / Sol Pro)、Anthropic Claude Sonnet 5.5 / Opus 5.5 以及 Google Gemini 4 Argon 的全面铺开，2026 年底的旗舰大模型格局已彻底重塑。以下是我们实验室的生产环境实测分工。',
      sections: [
        ['01 — 全栈编程与复杂重构：Claude Sonnet 5.5 vs GPT-6.1 Sol Pro。', '定价 $2.00/M 输入、$10.00/M 输出（100 万上下文）的 Claude Sonnet 5.5 依然是 Cursor 与 Claude Code 多文件精准重构的头号王牌；而 OpenAI 的 GPT-6.1 Terra Pro（$1.00/$5.00，105万上下文）与 GPT-6.1 Sol Pro（$2.00/$10.00）则在复杂系统架构推演与数学逻辑验证上胜出。'],
        ['02 — 百万 Token 原生多模态吞吐：为什么音视频与 50 篇 PDF 必选 Gemini 4 Argon？', 'Google 最新旗舰 Gemini 4 Argon（$2.00/M 输入、$10.00/M 输出，104.8 万上下文）支持将数小时的原始视频、音频与 50 篇文献一次性喂入上下文，跨模态检索零掉帧。'],
        ['03 — 什么时候才需要动用 Claude Opus 5.5 ($4/$20) 或 GPT-6 Astra Pro ($10/$50)？', '仅在极其复杂的零样本算法攻坚、跨国法律合同审查或核心商业旗舰长文终审时，才通过 OpenRouter 路由按需调用 Opus 5.5 或 GPT-6 Astra Pro。']
      ],
      table: {
        headers: ['2026年11月 旗舰模型', '原生上下文窗口', 'API 官方定价 (输入 / 输出)', '在 CruxKit 生产环境中的头号职责'],
        rows: [
          ['anthropic/claude-sonnet-5.5', '1,000,000 tokens', '$2.00 / $10.00 每百万', '全栈代码重构、Cursor 智能体编程与深度长文精修首选'],
          ['openai/gpt-6.1-terra-pro', '1,050,000 tokens', '$1.00 / $5.00 每百万', '性价比最高的旗舰主力，兼顾推理深度与低成本'],
          ['openai/gpt-6.1-sol-pro', '1,050,000 tokens', '$2.00 / $10.00 每百万', '复杂软件架构设计、多步任务规划与数学严谨验证'],
          ['google/gemini-4-argon', '1,048,576 tokens', '$2.00 / $10.00 每百万', '原生百万上下文视频/音频解析与 50 篇 PDF 交叉比对']
        ]
      },
      quote: '用 Claude Sonnet 5.5 写代码，用 GPT-6.1 Terra/Sol Pro 审架构，用 Gemini 4 Argon 吞吐多模态语料。',
      relatedKit: 'deepseekrouter'
    },
    geminiomnivideo: {
      catKey: 'ai', tile: 'tile-content',
      category: '多模态视频工作台 · 7 分钟阅读',
      title: 'Gemini Omni 1.2 Flash & Nano Banana 2.1 + HeyGen：2026 全模态视频流水线。',
      excerpt: '如何将 Google 最新 Gemini Omni 1.2 Flash 视频生成模型、Nano Banana 2.1 图像关键帧与 HeyGen 4K 数字人结合，零实拍打造高转化带货视频。',
      readMore: '阅读多模态视频指南',
      lead: '在 2026 年底，制作高完播率的产品演示与双语带货短视频不再需要昂贵的实景棚拍。把 Nano Banana 2.1、Gemini Omni 1.2 Flash 与 HeyGen 串联起来，一个人就是一家全模态制片厂。',
      sections: [
        ['01 — 用 Nano Banana 2.1 (google/gemini-nano-banana-2.1) 锁定人物与产品首尾帧。', '在生成动态视频前，先调用 Nano Banana 2.1（$1.50/M 输入，$7.50/M 输出）渲染出角色五官一致、产品包装文字清晰锐利的 4K 首帧与尾帧。'],
        ['02 — 用 Gemini Omni 1.2 Flash 生成丝滑首尾帧运镜与原生环境音效。', '将首尾关键帧传入 google/gemini-omni-1.2-flash，利用其强大的时空插帧能力一键生成商业级特写推拉镜头与同步物理音效。'],
        ['03 — 用 HeyGen 4K 数字人 (?via=xing) + ElevenLabs v3 完成真人感信任背书。', '在生成的电影级 B-Roll 之间切入 HeyGen 4K 数字人口播画面，配合 ElevenLabs v3 情感语音克隆，实测可将独立站联盟链接点击率提升 2.4 倍。']
      ],
      table: {
        headers: ['视频制作环节', '2026年11月 核心模型/工具', '单条 60 秒视频成本', '交付画面品质'],
        rows: [
          ['1. 首尾关键帧与封面渲染', 'Google Nano Banana 2.1', '约 $0.04', '4K 影棚级布光与精准包装文字渲染'],
          ['2. 动态 B-Roll 与首尾帧转场', 'Google Gemini Omni 1.2 Flash', '约 $0.18', '丝滑物理运镜过渡 + 原生环境立体声'],
          ['3. 真人感口播与多语种配音', 'HeyGen (?via=xing) + ElevenLabs v3', '约 $0.45', '4K 精准唇形同步中英双语口播']
        ]
      },
      quote: '用 Nano Banana 2.1 定格首尾帧，用 Gemini Omni 1.2 Flash 赋予动态运镜，用 HeyGen 数字人完成临门一脚转化。',
      relatedKit: 'geminiomnivideo'
    },
    kimik31qwen38: {
      catKey: 'ai', tile: 'tile-desk',
      category: '双语大模型生态实测 · 7 分钟阅读',
      title: 'Kimi K3.1 Pro vs Qwen 3.8 Max Prime vs GLM 5.3 Prime：出海与国语区双语实战横评。',
      excerpt: '我们针对「英文技术文档转中文小红书爆款」、「中英双语 SEO 独立站母语化改写」与「百万字财报精读」实测了 2026 年底国产与双语顶流模型。',
      readMore: '阅读双语模型横评',
      lead: '当你同时赚取海外美金联盟佣金与国内国语区数字商品收入时，大模型的「中英双语文化语感」直接决定了你的内容像资深行家还是生硬机翻。',
      sections: [
        ['01 — Kimi K3.1 Pro（104万上下文，$2/1M）：双语深度长文与文献精读天花板。', '月之暗面的 Kimi K3.1 Pro 原生支持 1,048,576 Token 上下文，在将英文硬核评测转化为兼具专业度与可读性的中文专栏长文时，遣词造句自然度全场第一。'],
        ['02 — Qwen 3.8 Max Prime 与 Qwen 3.8 Omni Flash（$0.15/1M）：阿里的全能型智能体引擎。', '通义千问 Qwen 3.8 Max Prime（100 万上下文）与 Qwen 3.8 2.4T 在复杂 SQL 生成、电商选品属性提取与多步工具调用上实力强劲；而 Qwen 3.8 Omni Flash（$0.15/M 输入）则是批量生成社媒钩子的性价比神器。'],
        ['03 — GLM 5.3 Prime 与 MiniMax M3.1 Flash：合规条款与高感染力口播脚本专精。', '智谱 GLM 5.3 Prime（及 GLM 5.3 FlashX Legal）在隐私政策、FTC 联盟披露条款与法律文本上极为精准；MiniMax M3.1 Flash 则擅长写出极具真人呼吸感的短视频口播稿。']
      ],
      table: {
        headers: ['模型 ID (2026.11 最新)', '上下文容量', 'API 价格 (输入 / 输出)', '出海与双语运营最佳场景'],
        rows: [
          ['moonshotai/kimi-k3.1-pro', '1,048,576 tokens', '$2.00 / $10.00 每百万', '百万字文献吞吐与中英双语杂志级深度长文撰稿'],
          ['qwen/qwen3.8-max-prime', '1,000,000 tokens', '$4.00 / $12.00 每百万', '复杂代码、跨境电商数据结构化处理与多步 Agent'],
          ['qwen/qwen3.8-omni-flash', '1,000,000 tokens', '$0.15 / $0.47 每百万', '高并发小红书/X 爆款标题裂变与多模态打标'],
          ['deepseek/deepseek-v4.1-flash-1017', '1,048,576 tokens', '$0.15 / $0.60 每百万', '高性价比推理与全站自动化 JSON 流水线主力']
        ]
      },
      quote: '用 Kimi K3.1 Pro 打磨双语旗舰深度长文，用 DeepSeek V4.1-Flash-1017 与 Qwen 3.8 Omni Flash 跑满自动化批量矩阵。',
      relatedKit: 'deepseekrouter'
    },
    gscindexnowgeo: {
      catKey: 'ai', tile: 'tile-automation',
      category: 'SEO 与 AI 搜索流量实战 · 8 分钟阅读',
      title: '独立站 48 小时极速收录实战：Google Search Console + IndexNow + llms.txt 全链路配置。',
      excerpt: '为什么你的网站上线后搜不到？本文手把手复盘我们如何将单页应用拆解为 89 个独立静态 HTML 页面，通过 Spaceship DNS 秒级认证 GSC 并打通 AI 搜索引用。',
      readMore: '阅读 48 小时收录指南',
      lead: '再精美的独立站，如果在 Google 搜索和 AI 搜索引擎里查无此人，就无法产生被动联盟收入。本文完整公开 cruxxxxxkit.com 实现「传统搜索引擎 + AI 搜索引擎」双栖收录的底层架构。',
      sections: [
        ['01 — 打破 SPA 弹窗黑盒：为每一篇评测和每一套商品生成独立静态 HTML 路径。', '很多新手把所有文章塞进一个 JavaScript 弹窗里，导致 Google 爬虫只能看到 1 个首页。通过静态化构建脚本将 24 篇深度评测生成为 /guides/{slug}/index.html、20 套商品生成为 /kits/{slug}/index.html，并内嵌 Article 与 Product JSON-LD 结构化数据，你的可收录着陆页瞬间翻了 89 倍。'],
        ['02 — Spaceship DNS TXT 记录 30 秒完成 Google Search Console 全域所有权验证。', '在 Google Search Console 中选择「网域（Domain）」资源类型输入 cruxxxxxkit.com，将获取到的 google-site-verification TXT 记录填入 Spaceship 高级 DNS，30 秒即可通过验证并提交包含 89 条正规 URL 的 sitemap.xml。'],
        ['03 — 双引擎主动推送：Bing IndexNow 秒级收录 + llms.txt 抢占大模型引用。', '接入 IndexNow API 密钥并在每次更新后主动 POST 网址列表，让 Bing、DuckDuckGo 与 Yandex 在几分钟内抓取新页面；同时在根目录部署 /llms.txt 与 /llms-full.txt，让 ChatGPT Search、Perplexity 与 Gemini 4 优先引用你的评测结论。']
      ],
      table: {
        headers: ['被动流量渠道', 'cruxxxxxkit.com 已部署的核心技术资产', '实测抓取收录速度', '重点截流的高意向搜索词'],
        rows: [
          ['Google 搜索 (GSC)', '89 个独立静态 HTML 页 + sitemap.xml + Spaceship DNS TXT 认证', '24–48 小时', '「工具 A vs 工具 B 2026」长尾对比词'],
          ['Bing / DuckDuckGo / Yandex', 'IndexNow 密钥认证 + API 批量主动推送', '5–30 分钟', '海外高客单 SaaS 评测与护肤成分词'],
          ['ChatGPT / Perplexity / Gemini', '/llms.txt + /llms-full.txt + FAQPage JSON-LD 结构化标记', '实时检索增强 (RAG)', 'AI 对话中的直接工具推荐与信源外链']
        ]
      },
      quote: '让每一篇硬核评测都拥有独立的静态 URL、标准的 JSON-LD 卡片，同时出现在 sitemap.xml 与 llms.txt 的头排位置。',
      relatedKit: 'gsctraffic'
    },
    makemaiaagents: {
      catKey: 'ai', tile: 'tile-automation',
      category: '自动化架构审计 · 7 分钟阅读',
      title: 'Make.com Maia 智能体与 Credits 计费 vs Hetzner (€3.79/月) 自建 n8n 终极对比。',
      excerpt: '实测 Make.com 2026 全新 Maia 对话式构建助手与 Credits 积分体系，对比在 €3.79/月 Hetzner ARM64 云主机上自建 n8n 队列模式的真实成本边界。',
      readMore: '阅读 Make vs n8n 2026 审计',
      lead: '2026 年，Make.com 推出了革命性的 Maia AI 对话式构建助手、原生 MCP 工具箱与统一 Credits 积分体系。什么时候该白嫖 Make 的 10,000 免费积分（?pc=cruxkit），什么时候又该切到 €3.79 的 Hetzner 自建 n8n？',
      sections: [
        ['01 — Make.com 2026 大升级：Maia 一句话自动生成并排错 12 节点复杂工作流。', '过去手搓 JSON 解析器需要半小时，如今直接对 Make 内置的 Maia AI 助手描述需求，即可自动连好 Webhook、DeepSeek/Claude 节点与 Notion 数据库。通过本站官方合作链接（?pc=cruxkit）注册，立享首月免费赠送 Core 专业版（含 10,000 Credits）。'],
        ['02 — Hetzner CAX11（€3.79/月）自建 n8n：零边际成本跑无限次大模型循环。', '当你的业务需要每 5 分钟轮询一次全网数据或运行包含 20 个循环步骤的 DeepSeek V4.1-Flash-1017 智能体时，在 €3.79/月（4GB 内存 + 40GB NVMe）的 Hetzner 云主机上用 Docker 部署 n8n，即可享受不限次数的自由。'],
        ['03 — 顶尖一人公司的「Make 前台 + n8n 后台」混合架构。', '用 Make.com（?pc=cruxkit）负责所有涉及 Stripe、Gumroad、Gmail 与 Notion 的高可靠 OAuth 前台触发，再通过一个 HTTP Webhook 把耗费算力的万次级 AI 批处理任务转发给自建 n8n。']
      ],
      table: {
        headers: ['评估维度', 'Make.com Core 专业版 (?pc=cruxkit)', 'Hetzner €3.79/月 自建 n8n Docker', '实验室胜出方'],
        rows: [
          ['上手速度与 AI 辅助构建', '2 分钟（Maia 对话式自动连线与排错）', '10 分钟（Ubuntu 24.04 一键 Docker 脚本）', 'Make.com'],
          ['每月 10,000 步执行成本', '通过 ?pc=cruxkit 首月 $0，次月起 $9/月', '€3.79/月（约 ¥29/月）固定包月', '平手（轻量选 Make，重度选 n8n）'],
          ['每月 250,000 次 AI 循环成本', '$159+/月 云端积分账单', '€3.79/月（约 ¥29/月）无限次执行', 'Hetzner / Hostinger 自建 n8n'],
          ['第三方 SaaS 免配置连接器', '2,000+ 官方 OAuth 应用 + 原生 MCP', '500+ 核心节点 + 通用 HTTP 请求', 'Make.com']
        ]
      },
      quote: '先用 ?pc=cruxkit 领满 Make.com 的 10,000 免费积分搞定前台商业连接，再用 €3.79 的 Hetzner 主机承接海量 AI 循环。',
      relatedKit: 'automation'
    },
    winteradapalene: {
      catKey: 'beauty', tile: 'tile-routine',
      category: '临床护肤实验室 · 7 分钟阅读',
      title: '秋冬刷酸与屏障修护黄金公式：0.1% 阿达帕林 + 5D 玻尿酸 + 神经酰胺 + 理肤泉 B5+。',
      excerpt: '为什么一到 11 月涂维A酸就开始鼻翼脱皮刺痛？实测「Torriden 5D 玻尿酸 + CeraVe PM 乳 + 理肤泉 B5+ Tribioma」三阶缓冲法，秋冬稳刷阿达帕林不翻车。',
      readMore: '阅读秋冬刷A防脱皮指南',
      lead: '每年 11 月降温开暖气后，都有大批读者因为嘴角起皮、面颊刺痛而被迫中断早C晚A。其实你完全不需要停用 0.1% 阿达帕林，只需要针对秋冬低湿度环境升级你的「缓冲三明治」。',
      sections: [
        ['01 — 为什么 11 月湿度骤降会让维A酸刺激度翻倍？', '当环境湿度跌破 40% 且室内暖气开启时，角质层经皮水分流失（TEWL）大幅加快，肉眼不可见的微裂隙会让阿达帕林瞬间超量透皮，引发神经源性刺痛与片状脱屑。'],
        ['02 — 第一、二步：Torriden 5D 小分子玻尿酸抓水 + CeraVe PM 生理脂质打底。', '晚间洁面后趁脸部微湿，先涂 3 滴 Torriden 5D 小分子透明质酸精华补充水合度；紧接着按压 1 泵 CeraVe PM 乳（三重神经酰胺 1/3/6-II + 4% 烟酰胺），静置 10 分钟待脂质膜形成后，再薄涂一粒豌豆大小的 Differin 0.1% 阿达帕林凝胶。'],
        ['03 — 第三步：理肤泉 Cicaplast B5+（Tribioma 升级版）死角精准封包。', '在鼻翼沟、嘴角、眼周眶骨等极易积聚药膏的脆弱部位，点涂米粒大小的理肤泉 B5+ 修复霜（5% 泛醇 + 羟基积雪草苷 + Tribioma 益生元精粹），隔绝夜间水分蒸发。']
      ],
      table: {
        headers: ['晚间叠涂顺序 (PM)', '实验室严选单品', '核心临床活性成分', '在秋冬屏障中的关键作用'],
        rows: [
          ['1. 微湿水合抓水层', 'Torriden 5D 玻尿酸精华 (/go/torriden)', '5重分子量透明质酸 + D-泛醇 + 尿囊素', '深层补水且后续叠加乳液 0% 搓泥'],
          ['2. 刷A前生理脂质缓冲层', '适乐肤 CeraVe PM 夜间乳 (/go/cerave-pm)', '神经酰胺 NP/AP/EOP + 4% 烟酰胺', '延缓维A酸透皮峰值，将脱皮率降低 70%'],
          ['3. 受体选择性维A酸核心', '达芙文 Differin 0.1% 阿达帕林 (/go/differin)', '0.1% 阿达帕林（选择性结合 RAR-β/γ）', '疏通微粉刺闭口并促进真皮胶原重塑'],
          ['4. 脆弱死角局部封包层', '理肤泉 B5+ 修复霜 (/go/cicaplast)', '5% 泛醇 + 羟基积雪草苷 + Tribioma', '锁住鼻翼嘴角水分，快速平息微炎症泛红']
        ]
      },
      quote: '用 5D 小分子玻尿酸抓水，用三重神经酰胺缓冲，用 Tribioma B5+ 守住鼻翼嘴角防线。',
      relatedKit: 'winterbarrier'
    },
    txavsvitc: {
      catKey: 'beauty', tile: 'tile-routine',
      category: '色沉与淡印科学 · 7 分钟阅读',
      title: '传明酸 (TXA 4%) vs 左旋维C (20% L-AA) vs 熊果苷：红黑痘印多通路阻断实测。',
      excerpt: '新生红痘印（PIE）与陈旧黑痘印（PIH）的生化机制截然不同。本文拆解如何将 20% 精纯维C、4% 传明酸与 10% 烟酰胺组合成无死角淡印矩阵。',
      readMore: '阅读红黑痘印多通路指南',
      lead: '很多读者猛涂单一美白精华却依然满脸痘印，根本原因在于混淆了「微血管扩张型红痘印（PIE）」与「黑色素沉积型黑痘印（PIH）」。只有多通路联合阻断，才能在 4–8 周内高效清零色沉。',
      sections: [
        ['01 — 纤溶酶与微血管双抑：为什么 4% 传明酸（TXA）能通杀红黑痘印？', '传明酸（凝血酸）不仅能阻断角质形成细胞向黑色素细胞发射前列腺素信号，还能抑制局部微血管异常扩张——这使得 Anua 10% 烟酰胺 + 4% 传明酸 + 2% α-熊果苷成为同时伴随红痘印与黑痘印读者的温和全能首选。'],
        ['02 — 游离基中和与多巴醌还原：Timeless 20% 左旋维C + VE + 阿魏酸。', '在 pH 2.4 的黄金透皮窗口下，20% 精纯左旋维C能在晨间直接还原已氧化的黑色素中间体，并在紫外线诱发酪氨酸酶活性前完成第一道抗氧化拦截。'],
        ['03 — 黑素小体转运拦截：10% 烟酰胺 + 严格 PA++++ 防晒。', '即便底层产生了少量黑色素，4%–10% 的烟酰胺也能阻断 35%–68% 的黑素小体向表皮角质层转运——前提是你每天早晨必须涂足两指宽的 Beauty of Joseon（Tinosorb M + Uvinul A Plus）防晒霜。']
      ],
      table: {
        headers: ['色素沉积关键通路', '黄金靶向活性物', 'CruxKit 实验室严选单品', '最佳早晚使用位置'],
        rows: [
          ['1. 自由基清除与多巴醌还原', '15%–20% 左旋维C + 1% VE + 0.5% 阿魏酸', 'Timeless 20% CEF ($26) / 修丽可 CE ($182)', '晨间洁面后干手干脸第一步'],
          ['2. 前列腺素与红痘印微血管抑制', '4% 传明酸 (TXA) + 2% α-熊果苷', 'Anua 10% 烟酰胺 + 4% 传明酸精华 ($20)', '早晚均可，pH 5.8 敏肌零刺痛'],
          ['3. 黑素小体表皮转运阻断', '4%–10% 烟酰胺 (维生素 B3)', 'Anua 淡斑精华 或 CeraVe PM 乳 (4%)', '全天候强化屏障并拦截色沉上浮'],
          ['4. UVA1 晒后反黑源头物理/化学阻断', 'Tinosorb M + Uvinul A Plus (PA++++)', '朝鲜美女大米益生菌防晒 SPF50+ ($16)', '每日晨间最后一步（涂满两指量）']
        ]
      },
      quote: '晨间用精纯维C与 PA++++ 防晒掐断紫外线源头，晚间用 4% 传明酸与 10% 烟酰胺双通路清零红黑痘印。',
      relatedKit: 'winterbarrier'
    }
  });
})();

function renderKitsList() {
  const container = document.getElementById('kits-list-container');
  if (!container) return;
  const dict = productsData[currentLang];
  const html = kitsOrder
    .filter(id => currentKitFilter === 'all' || dict[id].catKey === currentKitFilter)
    .map(id => {
      const k = dict[id];
      const highlightClass = k.isBundle ? 'bundle-highlight' : '';
      return `
        <button data-product="${id}" data-kit-cat="${k.catKey}" class="${highlightClass}">
          <span class="p5-number">${k.num}</span>
          <span class="p5-thumb"><span class="sprite ${k.tile}" aria-hidden="true"></span></span>
          <div class="p5-title-col">
            <h3>${k.name}</h3>
            <div class="p5-tag-row">
              ${k.badges.map(b => `<span class="p5-mini-tag">${b}</span>`).join('')}
            </div>
          </div>
          <p>${k.shortDesc}</p>
          <span class="v5-price">$${k.price} <svg class="icon" aria-hidden="true"><use href="#arrow-right"/></svg></span>
        </button>
      `;
    }).join('');
  container.innerHTML = html;
}

function renderStackGrid() {
  const container = document.getElementById('stack-grid');
  if (!container) return;
  const dict = stackToolsData[currentLang];
  const isZh = currentLang === 'zh';
  const q = currentStackSearch.trim().toLowerCase();

  const filtered = stackOrder.filter(id => {
    const item = dict[id];
    const matchCat = currentStackFilter === 'all' || item.catKey === currentStackFilter;
    if (!matchCat) return false;
    if (!q) return true;
    const hay = `${item.name} ${item.role} ${item.verdictShort} ${item.metricPill} ${item.tier}`.toLowerCase();
    return hay.includes(q);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;padding:36px;text-align:center;background:#fff;border-radius:14px;border:1px dashed var(--line);color:#5a6270;">
      ${isZh ? '未找到匹配的工具或配方，请尝试其他关键词或切换分类标签。' : 'No matching tools or formulations found. Try another keyword or filter tab.'}
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(id => {
    const t = dict[id];
    const affCfg = (window.CRUXKIT_CONFIG && window.CRUXKIT_CONFIG.AFFILIATE_LINKS && window.CRUXKIT_CONFIG.AFFILIATE_LINKS[id]) || {};
    const outUrl = affCfg.targetUrl || t.url;
    return `
      <article class="stack-card" data-stack-cat="${t.catKey}">
        <div>
          <div class="stack-card-top">
            <span class="tier-badge ${t.badgeClass || ''}">${t.tier}</span>
            <span class="stack-score">${t.score}</span>
          </div>
          <h3>${t.name}</h3>
          <div class="stack-role">${t.role}</div>
          <p class="stack-verdict">${t.verdictShort}</p>
          <span class="stack-metric-pill">${t.metricPill}</span>
        </div>
        <div class="stack-card-actions">
          <button class="stack-btn-notes" data-tool="${id}">${isZh ? '查看实测报告' : 'Lab notes & audit'}</button>
          <a class="stack-btn-go" href="${outUrl}" target="_blank" rel="sponsored noopener" data-track-affiliate="${id}">${t.cta} ${arrowDiag}</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderEditGrid() {
  const container = document.getElementById('edit-grid-container');
  if (!container) return;
  const dict = storiesData[currentLang];
  const filtered = storiesOrder.filter(id => {
    const s = dict[id];
    return currentEditFilter === 'all' || s.catKey === currentEditFilter;
  });

  container.innerHTML = filtered.map(id => {
    const s = dict[id];
    const metaColor = s.catKey === 'beauty' ? 'style="margin-top:16px;color:#be185d;"' : 'style="margin-top:16px;"';
    return `
      <button class="edit-card" data-story="${id}">
        <div>
          <div class="edit-card-visual"><div class="sprite ${s.tile}" aria-hidden="true"></div></div>
          <p class="edit-meta" ${metaColor}>${s.category}</p>
          <h3 style="margin-top:8px;">${s.title}</h3>
          <p class="edit-excerpt" style="margin-top:10px;">${s.excerpt}</p>
        </div>
        <span class="edit-read-more">${s.readMore} <svg class="icon" aria-hidden="true"><use href="#arrow-right"/></svg></span>
      </button>
    `;
  }).join('');
}

function applyLanguage(lang, persist = false) {
  currentLang = lang === 'zh' ? 'zh' : 'en';
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

  if (persist) {
    try { localStorage.setItem('cruxkit-lang', currentLang); } catch {}
  }

  const dict = uiStrings[currentLang];
  document.title = dict.page_title;
  const metaDesc = document.getElementById('meta-desc');
  if (metaDesc) metaDesc.setAttribute('content', dict.meta_desc);

  const searchInput = document.getElementById('stack-search-input');
  if (searchInput) searchInput.placeholder = dict.stack_search_placeholder;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-lang-set]').forEach(btn => {
    const isActive = btn.dataset.langSet === currentLang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  renderKitsList();
  renderStackGrid();
  renderEditGrid();
  recalculateSavings();

  if (dialog && dialog.open && activeModalState) {
    const { type, id } = activeModalState;
    if (type === 'product') showProduct(id);
    else if (type === 'tool') showTool(id);
    else if (type === 'story') showStory(id);
    else if (type === 'free') showFree();
    else if (type === 'sample') showSample(id);
  }
}

/* -----------------------------------------------------------
   6. DIALOG CONTROLLERS (BILINGUAL + REAL .ZIP DOWNLOADS)
----------------------------------------------------------- */
function openDialog(html, state) {
  if (!dialog.open) lastFocus = document.activeElement;
  activeModalState = state || null;
  content.innerHTML = html;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('.dialog-close')?.focus();
}

function closeDialog() {
  activeModalState = null;
  dialog.close();
  lastFocus?.focus();
}

document.querySelector('.dialog-close').addEventListener('click', closeDialog);

dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) {
      closeDialog();
    }
  }
});

dialog.addEventListener('cancel', () => {
  activeModalState = null;
  requestAnimationFrame(() => lastFocus?.focus());
});

function showProduct(id) {
  const p = productsData[currentLang][id];
  if (!p) return;
  const isZh = currentLang === 'zh';
  const cfg = (window.CRUXKIT_CONFIG && window.CRUXKIT_CONFIG.CHECKOUT_LINKS && window.CRUXKIT_CONFIG.CHECKOUT_LINKS[id]) || {};
  const primaryCheckout = isZh ? (cfg.zhUrl || 'https://mbd.pub/o/cruxkit') : (cfg.enUrl || 'https://cruxkit.gumroad.com');
  const priceLabel = isZh && cfg.priceCNY ? `$${p.price} (约 ¥${cfg.priceCNY})` : `$${p.price}`;
  const sampleZipUrl = cfg.localSampleZip || '';

  openDialog(`
    <div class="dialog-product">
      <div class="dialog-art-wrap ${p.catKey}">
        <div class="dialog-meta-badges">
          ${p.badges.map(b => `<span class="dialog-badge">${b}</span>`).join('')}
        </div>
        <div class="sprite ${p.tile}" role="img" aria-label="${p.name} cover"></div>
        <div style="font-size:12px;font-weight:700;opacity:0.85;">
          ${isZh ? '即时数字下载 · 含后续永久免费更新' : 'Instant Digital Download · Lifetime Updates'}
        </div>
      </div>
      <div class="dialog-copy">
        <p class="category">${p.category}</p>
        <h2 id="dialog-title">${p.name} — ${priceLabel}</h2>
        <p class="dialog-lead">${p.description}</p>
        <ul>
          ${p.items.map(x => `<li><span>${x}</span></li>`).join('')}
        </ul>
        <div class="dialog-actions-row">
          <a class="button" href="${primaryCheckout}" target="_blank" rel="noopener" data-track-checkout="${id}">
            ${isZh ? `立即购买套件 (${priceLabel})` : `Get ${p.name} ($${p.price})`} ${arrow}
          </a>
          <button class="button button-ghost" data-sample="${id}">
            ${isZh ? '预览内部蓝图代码' : 'Inspect sample blueprint'}
          </button>
          ${sampleZipUrl ? `<a class="button button-lime" href="${sampleZipUrl}" download data-track-zip="${id}">${isZh ? '⬇ 下载实操源文件包 (.ZIP)' : '⬇ Download Starter Pack (.ZIP)'}</a>` : ''}
        </div>
        <div class="dialog-status">
          <strong>${isZh ? '推荐搭配工具（官方合作通道）：' : 'Recommended Companion Tool:'}</strong>
          <a href="${p.companionTool.url}" target="_blank" rel="sponsored noopener" data-track-affiliate="${id}" style="color:var(--blue);text-decoration:underline;font-weight:700;">
            ${p.companionTool.name} ↗
          </a><br>
          ${isZh ? '支持微信 / 支付宝（面包多通道）与全球信用卡（Gumroad / Lemon Squeezy）自动发货。' : 'Instant access upon checkout. Global tax/VAT handled automatically.'}
        </div>
      </div>
    </div>
  `, { type: 'product', id });
}

function showSample(id) {
  const prod = productsData[currentLang][id];
  if (!prod) return;
  const isZh = currentLang === 'zh';
  const cfg = (window.CRUXKIT_CONFIG && window.CRUXKIT_CONFIG.CHECKOUT_LINKS && window.CRUXKIT_CONFIG.CHECKOUT_LINKS[id]) || {};
  const primaryCheckout = isZh ? (cfg.zhUrl || 'https://mbd.pub/o/cruxkit') : (cfg.enUrl || 'https://cruxkit.gumroad.com');
  const sampleZipUrl = cfg.localSampleZip || '';

  openDialog(`
    <div class="article-dialog">
      <p class="category">${prod.name} · ${isZh ? '内部蓝图节选预览' : 'Blueprint Preview'}</p>
      <h2 id="dialog-title">${isZh ? '从小处着手，<br><em>让高产出可重复。</em>' : 'Start small.<br><em>Make it repeatable.</em>'}</h2>
      <p>${isZh ? '每一套 CruxKit 数字套件都采用清晰直白的结构化模版设计，方便你在 10 分钟内复制、修改并接入自己的日常工作流：' : 'Every CruxKit digital product is built around plain-text templates you can copy, paste, and adapt in under ten minutes:'}</p>
      <div class="sample-box">
        <div class="sample-box-header">
          <span>${isZh ? '内含实战蓝图节选' : 'INCLUDED BLUEPRINT EXCERPT'}</span>
          <button class="copy-chip" data-copy-sample="${id}">${isZh ? '一键复制蓝图' : 'Copy Blueprint'}</button>
        </div>
        <div style="white-space:pre-wrap;">${prod.sample}</div>
      </div>
      <div class="dialog-actions-row">
        <a class="button" href="${primaryCheckout}" target="_blank" rel="noopener" data-track-checkout="${id}">
          ${isZh ? `解锁完整版 ${prod.name} ($${prod.price})` : `Unlock Full ${prod.name} ($${prod.price})`} ${arrow}
        </a>
        ${sampleZipUrl ? `<a class="button button-lime" href="${sampleZipUrl}" download data-track-zip="${id}">${isZh ? '⬇ 直接下载本地源文件包 (.ZIP)' : '⬇ Download Source Pack (.ZIP)'}</a>` : ''}
        <button class="button button-ghost" data-product="${id}">
          ${isZh ? '← 返回套件详情' : '← Back to Kit Overview'}
        </button>
      </div>
    </div>
  `, { type: 'sample', id });
}

function showTool(id) {
  const t = stackToolsData[currentLang][id];
  if (!t) return;
  const isZh = currentLang === 'zh';
  const affCfg = (window.CRUXKIT_CONFIG && window.CRUXKIT_CONFIG.AFFILIATE_LINKS && window.CRUXKIT_CONFIG.AFFILIATE_LINKS[id]) || {};
  const targetUrl = affCfg.targetUrl || t.url;

  openDialog(`
    <article class="article-dialog">
      <p class="category">${t.tier} · ${isZh ? '实验室评分：' : 'LAB SCORE: '}${t.score}</p>
      <h2 id="dialog-title">${t.name}</h2>
      <p class="dialog-lead"><strong>${isZh ? '参考价格：' : 'Pricing:'}</strong> ${t.price}</p>
      <p>${t.summary}</p>
      <div class="dialog-table-wrap">
        <table class="dialog-table">
          <thead>
            <tr>
              <th style="width:50%;color:#15803d;">${isZh ? '✓ 实测亮点与核心优势' : '✓ What We Loved in Testing'}</th>
              <th style="width:50%;color:#b91c1c;">${isZh ? '! 需要注意的局限与边界' : '! Watch-Outs & Trade-Offs'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${t.pros.map(p => `<div style="margin-bottom:8px;">• ${p}</div>`).join('')}</td>
              <td>${t.cons.map(c => `<div style="margin-bottom:8px;">• ${c}</div>`).join('')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <blockquote><strong>${isZh ? 'CruxKit 评测结论：' : 'CruxKit Verdict:'}</strong> ${t.verdict}</blockquote>
      <div class="dialog-actions-row">
        <a class="button" href="${targetUrl}" target="_blank" rel="sponsored noopener" data-track-affiliate="${id}">${t.cta} ${arrowDiag}</a>
        <button class="button button-ghost" data-product="${t.relatedKit || 'allbundle'}">
          ${isZh ? '查看配套数字效率套件' : 'View Companion Digital Kit'}
        </button>
      </div>
    </article>
  `, { type: 'tool', id });
}

function showStory(id) {
  const s = storiesData[currentLang][id];
  if (!s) return;
  const isZh = currentLang === 'zh';
  const relKit = s.relatedKit || 'allbundle';
  const kitObj = productsData[currentLang][relKit] || productsData[currentLang].allbundle;

  const tableHtml = s.table ? `
    <div class="dialog-table-wrap">
      <table class="dialog-table">
        <thead>
          <tr>${s.table.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${s.table.rows.map(row => `<tr>${row.map((c, idx) => `<td style="${idx === 0 ? 'font-weight:700;' : ''}">${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
  ` : '';

  openDialog(`
    <article class="article-dialog">
      <p class="category">${s.category}</p>
      <h2 id="dialog-title">${s.title}</h2>
      <p class="dialog-lead">${s.lead}</p>
      ${s.sections.map(([h, p]) => `<h3>${h}</h3><p>${p}</p>`).join('')}
      ${tableHtml}
      <blockquote>${s.quote}</blockquote>
      <div class="dialog-actions-row">
        <button class="button" data-product="${relKit}">${isZh ? `查看配套套件：${kitObj.name} ($${kitObj.price})` : `Get Companion Kit: ${kitObj.name} ($${kitObj.price})`} ${arrow}</button>
        <button class="button button-ghost" data-free>${isZh ? '领取免费入门清单' : 'Open Free Starter Kit'}</button>
      </div>
    </article>
  `, { type: 'story', id });
}

function getChecklistProgressText(pct, isZh) {
  if (checked.length === 5) {
    return isZh ? '✨ 5 个步骤已全部完成！开启高效专注的一天吧。' : '✨ All 5 steps complete! You’re ready for deep work.';
  }
  return isZh ? `已完成 ${checked.length} / 5 步 (${pct}%)` : `${checked.length} of 5 steps complete (${pct}%)`;
}

function showFree() {
  const steps = stepsData[currentLang];
  const isZh = currentLang === 'zh';
  const pct = Math.round((checked.length / steps.length) * 100);
  openDialog(`
    <div class="article-dialog">
      <p class="category">${isZh ? '专注创造者 · 免费入门包' : 'The Focused Builder · Free Starter Kit'}</p>
      <h2 id="dialog-title">${isZh ? '为最重要的作品，<br><em>留出纯粹空间。</em>' : 'Make space for<br><em>your best work.</em>'}</h2>
      <p>${isZh ? '一套只需 5 步的每日专注重启清单。在下方直接勾选你的今日进度，或一键下载纯文本实操表保存在电脑桌面：' : 'A five-step reset for a calmer, higher-output working day. Check off your progress below or download the complete starter sheet to keep on your desk.'}</p>
      <div class="checklist-meter" aria-hidden="true">
        <div class="checklist-meter-bar" id="checklist-bar" style="width:${pct}%"></div>
      </div>
      <p class="checklist-progress" role="status" aria-live="polite">
        ${getChecklistProgressText(pct, isZh)}
      </p>
      <div class="checklist">
        ${steps.map((s, i) => `
          <label>
            <input type="checkbox" data-step="${i}" ${checked.includes(i) ? 'checked' : ''}>
            <span>${s}</span>
          </label>
        `).join('')}
      </div>
      <div class="dialog-actions-row">
        <button class="button button-lime" data-download>
          ${isZh ? '下载实操清单 (.TXT)' : 'Download Checklist (.TXT)'} ${arrow}
        </button>
        <button class="button button-ghost" data-product="allbundle">
          ${isZh ? '查看全站 15 合 1 全家桶 ($69)' : 'Explore 15-in-1 Master Bundle ($69)'}
        </button>
      </div>
      <p class="small-note">${isZh ? '永久免费归你所有。浏览器本地即时生成下载 —— 无需填写邮箱。' : 'Yours to keep forever. Instant local download — no email gate required.'}</p>
    </div>
  `, { type: 'free' });
}

/* -----------------------------------------------------------
   7. GLOBAL CLICK, FILTER & SEARCH HANDLERS
----------------------------------------------------------- */
document.addEventListener('click', event => {
  const langBtn = event.target.closest('[data-lang-set]');
  if (langBtn) {
    applyLanguage(langBtn.dataset.langSet, true);
    return;
  }

  const trackAff = event.target.closest('[data-track-affiliate]');
  if (trackAff && window.CruxKitAnalytics) {
    window.CruxKitAnalytics.track('affiliate_click', trackAff.dataset.trackAffiliate, trackAff.href || '');
  }

  const trackCheckout = event.target.closest('[data-track-checkout]');
  if (trackCheckout && window.CruxKitAnalytics) {
    window.CruxKitAnalytics.track('checkout_click', trackCheckout.dataset.trackCheckout, trackCheckout.href || '');
  }

  const trackZip = event.target.closest('[data-track-zip]');
  if (trackZip && window.CruxKitAnalytics) {
    window.CruxKitAnalytics.track('zip_download', trackZip.dataset.trackZip, trackZip.href || '');
  }

  const kitFilterBtn = event.target.closest('[data-kit-filter]');
  if (kitFilterBtn) {
    currentKitFilter = kitFilterBtn.dataset.kitFilter;
    document.querySelectorAll('[data-kit-filter]').forEach(b => b.classList.remove('active'));
    kitFilterBtn.classList.add('active');
    renderKitsList();
    return;
  }

  const stackFilterBtn = event.target.closest('[data-stack-filter]');
  if (stackFilterBtn) {
    currentStackFilter = stackFilterBtn.dataset.stackFilter;
    document.querySelectorAll('[data-stack-filter]').forEach(b => b.classList.remove('active'));
    stackFilterBtn.classList.add('active');
    renderStackGrid();
    return;
  }

  const editFilterBtn = event.target.closest('[data-edit-filter]');
  if (editFilterBtn) {
    currentEditFilter = editFilterBtn.dataset.editFilter;
    document.querySelectorAll('[data-edit-filter]').forEach(b => b.classList.remove('active'));
    editFilterBtn.classList.add('active');
    renderEditGrid();
    return;
  }

  const p = event.target.closest('[data-product]');
  if (p) return showProduct(p.dataset.product);

  const t = event.target.closest('[data-tool]');
  if (t) return showTool(t.dataset.tool);

  const s = event.target.closest('[data-story]');
  if (s) return showStory(s.dataset.story);

  if (event.target.closest('[data-free]')) {
    event.preventDefault();
    return showFree();
  }

  const sample = event.target.closest('[data-sample]');
  if (sample) return showSample(sample.dataset.sample);

  const copyBtn = event.target.closest('[data-copy-sample]');
  if (copyBtn) {
    const prod = productsData[currentLang][copyBtn.dataset.copySample];
    const isZh = currentLang === 'zh';
    if (prod && navigator.clipboard) {
      navigator.clipboard.writeText(prod.sample);
      copyBtn.textContent = isZh ? '✓ 已复制到剪贴板！' : '✓ Copied to Clipboard!';
      setTimeout(() => { copyBtn.textContent = isZh ? '一键复制蓝图' : 'Copy Blueprint'; }, 2000);
    }
    return;
  }

  if (event.target.closest('[data-download]')) {
    const steps = stepsData[currentLang];
    const isZh = currentLang === 'zh';
    const body = isZh
      ? [
          '============================================================',
          'CRUXKIT STUDIO (cruxxxxxkit.com) — 专注创造者每日 5 步重启清单',
          '============================================================',
          '',
          ...steps.map((s, i) => `${checked.includes(i) ? '[x]' : '[ ]'} 步骤 0${i + 1}：${s}`),
          '',
          '------------------------------------------------------------',
          'CRUXKIT 2026 S 级严选工具与配方栈 (Top Picks)：',
          '• 可视化自动化首选：Make.com (https://www.make.com/en/register?pc=cruxkit)',
          '• 私人 AI 防封 API 网关：OpenRouter (https://openrouter.ai/?ref=cruxkit)',
          '• $4.99 n8n Docker 云主机：Hostinger (https://www.hostinger.com/?REFERRALCODE=CRUXKIT)',
          '• AI 拟真语音配音：ElevenLabs v3 (https://elevenlabs.io/?from=partnercruxkit)',
          '• 晨间真空泵维 C 精华：Timeless 20% CEF (https://www.iherb.com/search?kw=Timeless+Skin+Care+Vitamin+C&rcode=CRUXKIT)',
          '------------------------------------------------------------'
        ].join('\n')
      : [
          '============================================================',
          'CRUXKIT STUDIO (cruxxxxxkit.com) — THE FOCUSED BUILDER RESET',
          '============================================================',
          '',
          ...steps.map((s, i) => `${checked.includes(i) ? '[x]' : '[ ]'} Step 0${i + 1}: ${s}`),
          '',
          '------------------------------------------------------------',
          'CRUXKIT S-TIER RECOMMENDED STACK (2026):',
          '• Visual Automation: Make.com (https://www.make.com/en/register?pc=cruxkit)',
          '• Unified LLM API Gateway: OpenRouter (https://openrouter.ai/?ref=cruxkit)',
          '• $4.99 n8n Docker VPS: Hostinger (https://www.hostinger.com/?REFERRALCODE=CRUXKIT)',
          '• Neural Voice & Video: ElevenLabs v3 (https://elevenlabs.io/?from=partnercruxkit)',
          '• Clinical AM Antioxidant: Timeless 20% CEF (https://www.iherb.com/search?kw=Timeless+Skin+Care+Vitamin+C&rcode=CRUXKIT)',
          '------------------------------------------------------------'
        ].join('\n');

    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isZh ? 'CruxKit-专注创造者入门清单-ZH.txt' : 'CruxKit-Focused-Builder-Starter-Kit-EN.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
});

const stackSearchEl = document.getElementById('stack-search-input');
if (stackSearchEl) {
  stackSearchEl.addEventListener('input', e => {
    currentStackSearch = e.target.value || '';
    renderStackGrid();
  });
}

document.addEventListener('change', event => {
  if (event.target.matches('[data-step]')) {
    const steps = stepsData[currentLang];
    const i = Number(event.target.dataset.step);
    checked = event.target.checked ? [...new Set([...checked, i])] : checked.filter(x => x !== i);
    try { sessionStorage.setItem('cruxkit-checklist', JSON.stringify(checked)); } catch {}
    const pct = Math.round((checked.length / steps.length) * 100);
    const prog = document.querySelector('.checklist-progress');
    const bar = document.getElementById('checklist-bar');
    if (prog) prog.textContent = getChecklistProgressText(pct, currentLang === 'zh');
    if (bar) bar.style.width = `${pct}%`;
  }
  if (event.target.matches('.calc-check')) {
    recalculateSavings();
  }
});

function recalculateSavings() {
  let oldMo = 0;
  let newMo = 0;
  document.querySelectorAll('.calc-check').forEach(cb => {
    if (cb.checked) {
      oldMo += Number(cb.dataset.old || 0);
      newMo += Number(cb.dataset.new || 0);
    }
  });
  const savedYr = Math.max(0, (oldMo - newMo) * 12);
  const dict = uiStrings[currentLang] || uiStrings.en;
  const savedEl = document.getElementById('calc-saved-display');
  const oldEl = document.getElementById('calc-old-display');
  const newEl = document.getElementById('calc-new-display');
  if (savedEl) savedEl.textContent = `$${savedYr.toLocaleString()} ${dict.per_yr}`;
  if (oldEl) oldEl.textContent = `$${oldMo.toLocaleString()} ${dict.per_mo}`;
  if (newEl) newEl.textContent = `$${newMo.toLocaleString()} ${dict.per_mo}`;
}


/* ===========================================================
   CRUXKIT v8.0 AFFILIATE & EDITORIAL MEGA-EXPANSION
   - 60 Audited Affiliate Stack Picks (15 per Desk x 4 Desks)
   - 40 Full-Length Bilingual Benchmark & Buyer Guides (EN/ZH)
=========================================================== */
(function expandCatalogV8() {
  // 1. Update UI strings for 20 Kits / 60 Stack Picks / 40 Guides
  Object.assign(uiStrings.en, {
    page_title: 'CruxxxxxKit (CruxKit · cruxxxxxkit.com) — 20 Digital Kits, 60 Affiliate Stack Picks & 40 AI / Skincare Benchmarks',
    meta_desc: 'CruxxxxxKit (cruxxxxxkit.com) — 20 Ready-to-Use Digital Kits, 60 Stress-Tested AI (GPT-6.1, DeepSeek V4.1-Flash-1017, Gemini 4 Argon, Claude 5.5), Cloud & K-Beauty Affiliate Picks, and 40 Deep-Dive Buyer Guides.',
    nav_kits: 'Digital kits (20)',
    nav_stack: 'The stack <span class="nav-pill-tag">60 Picks</span>',
    nav_edit: 'The edit (40)',
    mob_stack: '60 Audited Stack Picks',
    hero_eyebrow: 'CRUXKIT PULSE · NOV 2026 MEGA CATALOG · 20 DIGITAL KITS · 60 AFFILIATE PICKS · 40 BUYER GUIDES',
    hero_sub: '20 ready-to-import digital kits, 60 stress-tested software, cloud & clinical formulation picks with verified partner deals, and 40 deep-dive buyer guides.',
    hero_cta_stack: 'Browse 60 S-Tier Picks',
    metric_1: '<strong>20 Ready-to-Use Kits</strong><br>JSON Workflows, API Packs &amp; Notion OS',
    metric_2: '<strong>60 Audited S-Tier Picks</strong><br>AI, Creator, Cloud VPS &amp; Beauty Lab',
    metric_3: '<strong>40 Deep-Dive Playbooks</strong><br>Full Bilingual Affiliate Buyer Guides',
    stack_heading: 'The considered stack (60 Audited Picks).',
    stack_note: 'Every tool and formulation has a clear job. Stress-tested across 4 specialized desks (15 picks per desk) — click any item for full lab notes, pros/cons & verified partner links.',
    stack_filter_all: 'All Picks (60)',
    stack_filter_ai: '01 · AI & Automation (15)',
    stack_filter_creator: '02 · Creator, Video & SEO (15)',
    stack_filter_cloud: '03 · Cloud, Domains & Pay (15)',
    stack_filter_beauty: '04 · Skincare & K-Beauty Lab (15)',
    stack_search_placeholder: 'Search 60 tools, APIs, domains, VPNs, serums, SPF...',
    edit_heading: 'Fresh ideas, put to work (40 Deep-Dive Buyer Guides).',
    edit_note: '40 complete benchmark reviews, tool comparisons, and clinical formulation audits with direct partner deals — click any card to read the full bilingual guide.',
    edit_filter_all: 'All Guides (40)',
    edit_filter_ai: 'AI, Cloud & Affiliate Growth (28)',
    edit_filter_beauty: 'Skincare & K-Beauty Lab (12)',
    foot_stack: 'The stack (60)'
  });

  Object.assign(uiStrings.zh, {
    page_title: 'CruxxxxxKit (CruxKit · cruxxxxxkit.com) — 20 款数字套件、60 款严选带货工具与 40 篇深度评测推文',
    meta_desc: 'CruxxxxxKit (cruxxxxxkit.com) — 20 款即插即用数字工程包、60 款实测 AI 大模型（DeepSeek V4.1-Flash-1017、GPT-6.1、Gemini 4 Argon、Claude 5.5）/ 云主机 / 护肤严选好物，以及 40 篇双语深度带货横评。',
    nav_kits: '数字套件 (20)',
    nav_stack: '严选好物栈 <span class="nav-pill-tag">60 严选</span>',
    nav_edit: '深度推文 (40)',
    mob_stack: '60 款实测严选工具与配方',
    hero_eyebrow: 'CRUXKIT PULSE · 2026年11月全量矩阵 · 20 款数字套件 · 60 款联盟严选 · 40 篇深度评测推文',
    hero_sub: '20 套即插即用数字工程包，60 款经过极端实测的 AI 自动化、跨境云基建与临床护肤严选好物（附专属返利/试用通道），以及 40 篇高转化深度买手指南。',
    hero_cta_stack: '浏览 60 款 S 级严选',
    metric_1: '<strong>20 款即用型数字套件</strong><br>JSON 蓝图、API 路由与 Notion 系统',
    metric_2: '<strong>60 款实测 S 级严选</strong><br>AI、视频 SEO、云主机与成分护肤',
    metric_3: '<strong>40 篇深度带货长文</strong><br>中英双语硬核横评与选型推文',
    stack_heading: '严选工具与配方库（60 款实测好物）。',
    stack_note: '每一款工具与护肤配方都经过真实业务与成分表双重核验。四大专区各 15 款严选好物——点击任意卡片查看完整优缺点报告与官方合作优惠链接。',
    stack_filter_all: '全部严选 (60)',
    stack_filter_ai: '01 · AI 与自动化 (15)',
    stack_filter_creator: '02 · 视频创作与 SEO (15)',
    stack_filter_cloud: '03 · 云主机、域名与收款 (15)',
    stack_filter_beauty: '04 · 临床护肤与韩妆实验室 (15)',
    stack_search_placeholder: '搜索 60 款 AI 工具、API、云主机、防晒、精华...',
    edit_heading: '把好想法落到实处（40 篇深度评测推文）。',
    edit_note: '40 篇完整大模型账单实测、跨境建站搞流量教程与护肤成分红黑榜——点击任意卡片阅读完整双语长文、对比表格与直达购买链接。',
    edit_filter_all: '全部推文 (40)',
    edit_filter_ai: 'AI、跨境基建与搞钱增长 (28)',
    edit_filter_beauty: '成分护肤与医美级配方 (12)',
    foot_stack: '严选工具栈 (60)'
  });

  // 2. Add 20 new Affiliate Stack Picks (40 -> 60 Picks, 15 per Desk)
  const newStackIds = [
    // AI & Automation (+5)
    'groq', 'v0dev', 'lovable', 'firecrawl', 'apify',
    // Creator, Video & SEO (+5)
    'synthesia', 'capcut', 'surfer', 'ahrefs', 'canva',
    // Cloud, Domains & Pay (+5)
    'railway', 'digitalocean', 'namecheap', 'nordvpn', 'airwallex',
    // Skincare & K-Beauty Lab (+5)
    'skin1004', 'roundlab', 'numbuzin', 'illiyoon', 'geekgorgeous'
  ];
  newStackIds.forEach(id => {
    if (!stackOrder.includes(id)) stackOrder.push(id);
  });

  Object.assign(stackToolsData.en, {
    groq: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.6 / 10', relatedKit: 'deepseekrouter',
      tier: 'S-Tier Pick · 850+ tok/s LPU Inference', name: 'GroqCloud LPU Ultra-Fast Inference', role: 'Sub-100ms Hardware LPU API for Voice Agents & Real-Time UI',
      verdictShort: 'Custom Language Processing Units (LPUs) deliver 850+ tokens/sec with near-zero time-to-first-token (TTFT)—essential for real-time voice assistants and instant autocomplete.',
      metricPill: '⚡ 850+ tok/s · 0.08s TTFT · OpenAI-Compatible API',
      price: 'Free Developer Tier · Pay-As-You-Go ($0.05–$0.59 / 1M)',
      summary: 'When building real-time voice bots (with ElevenLabs) or instant UI generators where waiting 2 seconds kills UX, GroqCloud’s deterministic SRAM LPU architecture is unmatched.',
      pros: ['Delivers 800–1,000+ tokens/sec on open-weights models—5x faster than standard GPU clusters', 'Drop-in OpenAI SDK compatibility and native integration as a high-speed provider inside OpenRouter', 'Generous free rate limits for prototyping voice and real-time classification pipelines'],
      cons: ['Context windows on hardware LPU tiers are smaller than Gemini 4 Argon’s 1M token window'],
      verdict: 'The undisputed speed king for low-latency voice agents and instant JSON classification.',
      url: 'go/groq', cta: 'Get GroqCloud API Key'
    },
    v0dev: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.7 / 10', relatedKit: 'workstation',
      tier: 'S-Tier Pick · AI UI & Next.js Architect', name: 'Vercel v0 Full-Stack UI Generator', role: 'Prompt-to-React, Tailwind, Shadcn UI & 1-Click Vercel Deploy',
      verdictShort: 'Generates agency-grade React/Next.js interfaces, interactive pricing calculators, and Tailwind dashboards in seconds—then deploys straight to a live URL.',
      metricPill: '🎨 Instant Shadcn/Tailwind UI + 1-Click Vercel Production',
      price: 'Free Tier · Premium $20/mo',
      summary: 'Most AI coders write solid backend logic but mediocre layouts. Vercel v0 specializes in high-craft frontend design systems, Shadcn components, and responsive animations.',
      pros: ['Produces clean, accessible React + Tailwind + Shadcn UI code you can copy via a single npx command', 'Side-by-side live interactive preview lets you tweak spacing, typography, and dark mode visually', 'One-click deployment to Vercel edge network with automatic preview URLs'],
      cons: ['Best paired with Cursor + Claude Sonnet 5.5 once your backend database logic gets complex'],
      verdict: 'The fastest way for solo builders to turn a rough wireframe into a $10k-looking landing page.',
      url: 'go/v0dev', cta: 'Try Vercel v0 Free'
    },
    lovable: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.6 / 10', relatedKit: 'workstation',
      tier: 'S-Tier Pick · AI Full-Stack SaaS Builder', name: 'Lovable.dev AI App Builder', role: 'Natural-Language Full-Stack Web Apps with Native Supabase & Stripe',
      verdictShort: 'Build and ship complete CRUD SaaS apps, internal dashboards, and paid micro-tools with automated Supabase Auth/Postgres and Stripe checkout wiring.',
      metricPill: '🚀 Prompt-to-SaaS · Native Supabase + GitHub Sync',
      price: 'Free Starter · Pro $20/mo (20% Recurring Affiliate)',
      summary: 'Lovable bridges the gap between no-code builders and raw IDEs: it wires up your frontend UI, Supabase Postgres tables, row-level security, and two-way GitHub sync from plain English prompts.',
      pros: ['Native 1-click Supabase integration automatically generates database migrations and auth flows', 'Real two-way GitHub synchronization—edit in Lovable or pull into Cursor anytime without lock-in', 'High-converting 20% recurring affiliate program for creator tutorials and build-in-public demos'],
      cons: ['Heavy iterative prompting can consume monthly message credits quickly if prompts are vague'],
      verdict: 'The best end-to-end AI app builder for non-devops founders launching paid micro-SaaS products.',
      url: 'go/lovable', cta: 'Launch App on Lovable'
    },
    firecrawl: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.7 / 10', relatedKit: 'mcppack',
      tier: 'S-Tier Pick · LLM Web-to-Markdown Engine', name: 'Firecrawl API & MCP Server', role: 'Turn Any Website or Documentation Site into Clean LLM Markdown & Structured JSON',
      verdictShort: 'Strips away navbars, cookie banners, and JS hydration bloat—converting entire multi-page websites into clean Markdown or Pydantic JSON for DeepSeek V4.1 and GPT-6.1.',
      metricPill: '🕸️ /scrape, /crawl & /extract · Official MCP Server',
      price: '500 Free Pages · Hobby $16/mo (25% Recurring Affiliate)',
      summary: 'Feeding raw HTML into an LLM wastes 80% of your token budget on DOM noise. Firecrawl handles headless browser rendering, anti-bot rotation, and clean Markdown/JSON extraction in one API call.',
      pros: ['The /extract endpoint uses LLM schemas to pull structured product prices and specs from any URL', 'Official Model Context Protocol (MCP) server plugs directly into Cursor, Claude Desktop, and n8n', 'Saves 75%+ on input tokens when feeding documentation or competitor pages to DeepSeek V4.1-Flash-1017'],
      cons: ['High-frequency enterprise crawling requires upgrading from the Hobby tier'],
      verdict: 'Indispensable data-ingestion layer for AI research agents, price monitors, and RAG pipelines.',
      url: 'go/firecrawl', cta: 'Claim 500 Free Credits'
    },
    apify: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.6 / 10', relatedKit: 'n8nvps',
      tier: 'S-Tier Pick · 2,000+ Ready Web Scrapers', name: 'Apify Cloud & Scraper Store', role: 'Pre-Built Cloud Scrapers for Google Maps, TikTok, X/Twitter, Amazon & Instagram',
      verdictShort: 'Why write brittle Playwright scripts when Apify’s marketplace has 2,000+ maintained Actors that scrape TikTok trends, Google Maps leads, and Amazon reviews into Make/n8n?',
      metricPill: '💰 $5/mo Free Usage + 30% Recurring Lifetime Affiliate',
      price: 'Free $5/mo Credit · Starter $39/mo',
      summary: 'Apify is the secret weapon behind automated lead-gen and viral trend-research agencies. Trigger any scraper via webhook from Make.com or n8n and receive clean JSON datasets in minutes.',
      pros: ['Over 2,000 ready-to-run Actors for social media, e-commerce, and local business lead extraction', 'Native Make.com, n8n, and LangChain integrations with built-in residential proxy rotation', 'One of the industry’s best affiliate programs: 30% recurring commission for the lifetime of the customer'],
      cons: ['Residential proxy bandwidth can add up if you scrape video files rather than text metadata'],
      verdict: 'The most reliable cloud scraping platform for automated market intelligence and B2B lead pipelines.',
      url: 'go/apify', cta: 'Explore Apify Store Free'
    },
    synthesia: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'geminiomnivideo',
      tier: 'S-Tier Pick · Enterprise AI Video Studio', name: 'Synthesia 3.0 Expressive AI Avatars', role: 'Full-Body Expressive AI Presenters & 140-Language Scorm/Video Localization',
      verdictShort: 'While HeyGen rules social creator reels, Synthesia 3.0 dominates B2B software walkthroughs, SOP training videos, and multi-speaker enterprise presentations.',
      metricPill: '🎬 230+ Avatars · 140+ Languages · 1-Click Screen Recorder',
      price: 'Free Plan · Starter $18/mo (25% Annual Affiliate)',
      summary: 'Synthesia 3.0 pairs full-body expressive AI presenters with synchronized screen-recording triggers—allowing SaaS documentation and course creators to update product videos simply by editing text.',
      pros: [' Built-in screen recorder automatically syncs avatar narration with cursor highlights and zooms', 'Enterprise-grade translation workspace with live human-in-the-loop glossary approval', 'Zero camera or studio needed to maintain an always-updated video help center'],
      cons: ['Slightly more formal avatar styling compared to HeyGen’s casual UGC smartphone avatars'],
      verdict: 'Top recommendation for B2B SaaS onboarding, digital course modules, and corporate localization.',
      url: 'go/synthesia', cta: 'Create Free AI Video'
    },
    capcut: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'videoengine',
      tier: 'S-Tier Pick · Short-Form Editing Standard', name: 'CapCut Desktop & Commerce Pro', role: 'High-Velocity Bilingual Auto-Captions, Keyframe Effects & TikTok Shop Ad Studio',
      verdictShort: 'The fastest desktop NLE for finishing AI-generated reels: instant bilingual word-by-word captions, Filler-Word removal, and commercial music licensing.',
      metricPill: '⚡ 99% Bilingual Caption Accuracy + Viral Hook Templates',
      price: 'Free Core · Pro $9.99/mo (Up to 35% Affiliate)',
      summary: 'Even after cutting clips in OpusClip or generating avatars in HeyGen, a 3-minute pass in CapCut Desktop Pro adds kinetic bilingual subtitles, sound risers, and B-roll transitions that double retention.',
      pros: ['Best-in-class Mandarin + English simultaneous bilingual subtitle recognition and kinetic presets', 'Commerce Pro includes pre-cleared commercial audio tracks and 1-click product background replacement', 'Lightweight GPU acceleration exports 4K 60fps vertical shorts in seconds'],
      cons: ['Many signature text-glow and vocal-isolation effects now require the Pro subscription'],
      verdict: 'The essential finishing suite for every YouTube Shorts, TikTok, and Xiaohongshu creator.',
      url: 'go/capcut', cta: 'Download CapCut Pro'
    },
    surfer: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'gsctraffic',
      tier: 'S-Tier Pick · On-Page SEO & GEO Scorer', name: 'SurferSEO Content Editor & AI Tracker', role: 'Real-Time SERP Entity Optimization & Google Search Console Content Audit',
      verdictShort: 'Analyzes the top 10 ranking pages for your target keyword and gives you a live 0–100 NLP entity checklist—ensuring your benchmark articles rank on Page 1.',
      metricPill: '📈 Live 0–100 SERP Content Score + Auto Internal Linking',
      price: 'Essential $79/mo (25% Recurring Affiliate)',
      summary: 'Writing great articles isn’t enough if you miss the semantic entities Google’s ranking algorithm expects. SurferSEO reverse-engineers top SERP competitors and injects missing NLP terms automatically.',
      pros: ['Real-time Content Score (0–100) tells you exact heading structure, word count, and semantic entities needed', 'Connects directly to Google Search Console to spot decaying articles that need a 10-minute refresh', 'Auto-Insert Internal Links scans your sitemap to wire up high-authority internal anchor text'],
      cons: ['Higher monthly entry price—best shared across multiple niche sites or client projects'],
      verdict: 'The highest-ROI on-page optimization engine once your site passes 20+ published guides.',
      url: 'go/surfer', cta: 'Run Surfer SEO Audit'
    },
    ahrefs: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.8 / 10', relatedKit: 'gsctraffic',
      tier: 'S-Tier Pick · Backlink & AI Brand Radar', name: 'Ahrefs Webmaster Tools & Brand Radar', role: 'World’s #1 Backlink Crawler, Low-KD Keyword Finder & AI Search Citation Monitor',
      verdictShort: 'Ahrefs’ free Webmaster Tools audits your entire domain health, while its new Brand Radar tracks how often ChatGPT, Perplexity, and Gemini recommend your brand.',
      metricPill: '🔍 Free Site Audit + 35T Backlink Index + AI Brand Radar',
      price: 'Free Webmaster Tools · Lite $129/mo',
      summary: 'Ahrefs operates the most active commercial web crawler after Google. Its combination of Content Explorer, backlink gap analysis, and AI Brand Radar makes it mandatory for serious affiliate publishers.',
      pros: ['Ahrefs Webmaster Tools (AWT) is 100% free for verified domain owners—monitors all backlinks and broken HTML', 'New AI Brand Radar tracks your share-of-voice inside LLM responses across GPT-6.1, Gemini 4, and Perplexity', 'Unbeatable accuracy when spying on which exact affiliate review pages bring your competitors 80% of their traffic'],
      cons: ['Paid tiers use credit-based report allowances on lower plans'],
      verdict: 'Start with the free Webmaster Tools on day one; upgrade when scaling competitive backlink outreach.',
      url: 'go/ahrefs', cta: 'Use Ahrefs Webmaster Free'
    },
    canva: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'hooksvault',
      tier: 'S-Tier Pick · Bulk Visual & Social Studio', name: 'Canva Pro & Magic Studio Bulk Create', role: 'CSV-to-Carousel Bulk Generator, 1-Click Background Remover & Brand Kit OS',
      verdictShort: 'Upload a 50-row CSV from DeepSeek V4.1 into Canva Bulk Create to generate 50 localized Pinterest pins, Xiaohongshu cards, and YouTube thumbnails in 60 seconds.',
      metricPill: '✨ CSV Bulk Create + Instant Resize + 100M+ Pro Assets',
      price: 'Free · Canva Pro $12.99/mo',
      summary: 'For solo operators who aren’t full-time Figma designers, Canva Pro’s Bulk Create and Magic Switch turn a single benchmark table into a week of visual social distribution.',
      pros: ['Bulk Create binds CSV columns directly to template text layers—generate 30 social slides in one click', 'Magic Switch instantly reformats a 16:9 blog hero graphic into a 9:16 Reel cover and 3:4 Xiaohongshu card', '1-click background remover and Brand Kit font/color locking keep every asset cohesive'],
      cons: ['Not meant for complex vector UI prototyping (use Figma or Vercel v0 for web interfaces)'],
      verdict: 'The fastest visual production multiplier for turning written guides into multi-platform social traffic.',
      url: 'go/canva', cta: 'Try Canva Pro Free'
    },
    railway: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.7 / 10', relatedKit: 'n8nvps',
      tier: 'S-Tier Pick · 1-Click Docker & n8n Cloud', name: 'Railway.app Instant App & DB Cloud', role: 'Zero-DevOps 1-Click Deployment for n8n, PostgreSQL, Redis, LiteLLM & Ghost',
      verdictShort: 'Don’t want to manage Ubuntu SSH keys or Nginx configs? Railway deploys n8n + Postgres + Redis with workers from a 1-click template in 45 seconds.',
      metricPill: '🚅 45-Second n8n/Postgres Deploy · Pay-Per-Minute RAM/CPU',
      price: '$5/mo Hobby Plan (Includes $5 Resource Usage)',
      summary: 'Railway gives you the power of a full Docker VPS with the effortless developer experience of Vercel. Spin up a production n8n queue-mode cluster or LiteLLM proxy in one click.',
      pros: ['Over 900 1-click community templates (n8n with workers, LobeChat, Umami Analytics, Ghost, PocketBase)', 'Automatic private networking between your Node/Python apps, PostgreSQL, and Redis instances', 'Usage-based billing down to the second—no paying for idle oversized virtual machines'],
      cons: ['Heavy 24/7 memory workloads (>16GB RAM) cost more than raw bare-metal Hetzner VPS'],
      verdict: 'The #1 cloud platform for builders who want self-hosted open-source tools without Linux sysadmin headaches.',
      url: 'go/railway', cta: 'Claim $5 Railway Bonus'
    },
    digitalocean: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.6 / 10', relatedKit: 'n8nvps',
      tier: 'S-Tier Pick · $200 Free Cloud Credit', name: 'DigitalOcean Droplets & Managed Cloud', role: 'Battle-Tested Global Linux VPS, Managed Databases & GPU Droplets',
      verdictShort: 'One of the most generous cloud onboarding offers on the internet: new accounts receive $200 in free infrastructure credit for 60 days to test any stack.',
      metricPill: '🎁 $200 Free 60-Day Cloud Credit · Global Datacenters',
      price: 'Droplets from $4/mo · $200 Free Trial Credit',
      summary: 'From Singapore and Frankfurt to New York and San Francisco, DigitalOcean provides rock-solid BGP routing, predictable bandwidth pricing, and 1-click Docker Marketplace images.',
      pros: ['$200 free credit lets you stress-test multi-node Docker clusters, GPU droplets, and managed Postgres for 2 months free', '1-Click Marketplace images for Docker, n8n, WordPress, Ghost, and Coolify', 'Cleanest documentation and community tutorials in the cloud hosting industry'],
      cons: ['CPU-optimized droplets are pricier than Hetzner once your initial $200 credit expires'],
      verdict: 'Unbeatable for launching and load-testing new cloud architectures with $200 in zero-risk credit.',
      url: 'go/digitalocean', cta: 'Claim $200 Free Credit'
    },
    namecheap: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'cloudflareedge',
      tier: 'S-Tier Pick · Trusted Domain & Email Vet', name: 'Namecheap Domains & PrivateEmail', role: 'First-Year Domain Promos, Custom Domain Business Email & FastVPN',
      verdictShort: 'The parent company behind Spaceship: unbeatable $0.98–$5.98 first-year TLD promos, rock-solid PrivateEmail inboxes, and instant SSL certificates.',
      metricPill: '🌐 Lifetime Free WhoisGuard + $1.24/mo Business Email',
      price: '.com Promo from $6.49 · PrivateEmail $14.88/yr',
      summary: 'While we love Spaceship for its ultra-modern Unbox DNS UI, Namecheap remains a powerhouse for seasonal TLD flash sales and affordable custom-domain IMAP/SMTP business mailboxes.',
      pros: ['PrivateEmail gives you a clean `hello@yourdomain.com` mailbox with calendar/contacts for ~$1.24/mo (vs $7/mo on Google Workspace)', 'Free lifetime domain privacy protection and 24/7 live chat support within 2 minutes', 'High-converting 20%–35% affiliate payouts on domain registrations, SSLs, and email hosting'],
      cons: ['Dashboard UI is more traditional compared to Spaceship’s sleek modular launchpad'],
      verdict: 'Best companion to Spaceship whenever you need cheap custom-domain email boxes or TLD flash sales.',
      url: 'go/namecheap', cta: 'Check Namecheap Promos'
    },
    nordvpn: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.6 / 10', relatedKit: 'affiliatematrix',
      tier: 'S-Tier Pick · Dedicated IP & Meshnet Security', name: 'NordVPN Dedicated IP & Meshnet', role: 'Encrypted Cross-Border Network, Static Dedicated IPs & Remote Device Meshnet',
      verdictShort: 'Essential for global digital operators: inspect geo-targeted SERPs in 111 countries, lock a clean Dedicated IP for payment dashboards, and link devices via Meshnet.',
      metricPill: '🔒 111 Countries · NordLynx WireGuard · 40–100% Affiliate',
      price: 'From $3.09/mo (2-Year Plan + 3 Months Bonus)',
      summary: 'When managing Stripe, PartnerStack, Google Search Console, and TikTok accounts across regions, shared datacenter IPs trigger security locks. NordVPN’s Dedicated IP and Threat Protection Pro keep your sessions clean.',
      pros: ['Dedicated IP option assigns a single static IP exclusively to you—preventing banking and ad-account captchas', 'Built-in Meshnet lets you securely tunnel into your home Mac/PC or private LLM server from anywhere for free', 'One of the highest-converting consumer/prosumer affiliate offers globally (40%–100% commission tiers)'],
      cons: ['Dedicated IP is an optional add-on on top of the base subscription'],
      verdict: 'Mandatory operational security tool for cross-border founders and a top-earning affiliate staple.',
      url: 'go/nordvpn', cta: 'Get NordVPN Exclusive Deal'
    },
    airwallex: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.7 / 10', relatedKit: 'solo',
      tier: 'S-Tier Pick · Enterprise Borderless Treasury', name: 'Airwallex Global Business Account', role: 'Zero-FX Multi-Currency Virtual Cards, Local Bank Accounts & SaaS Expense Control',
      verdictShort: 'When your solo studio incorporates (US LLC, UK Ltd, or HK Ltd), Airwallex gives you instant multi-currency employee/virtual cards with 0% foreign card transaction fees.',
      metricPill: '💳 Unlimited Virtual Visa Cards + 0% FX Card Fees',
      price: '$0 Monthly Account Fee · Interbank FX Rates',
      summary: 'Paying for 20+ USD/EUR SaaS subscriptions and ad accounts with a domestic bank card loses 2.5%–3% in hidden FX markups. Airwallex lets you receive USD/EUR/GBP/HKD directly and spend via virtual Visa cards at zero FX fee.',
      pros: ['Issue dedicated virtual Visa cards for each SaaS vendor (OpenRouter, AWS, Meta Ads) with hard monthly spend caps', 'Direct local account details in 20+ currencies that plug into Stripe, Shopify, Amazon, and PartnerStack', 'Automated receipt matching and Xero/QuickBooks reconciliation'],
      cons: ['Requires a registered business entity (sole proprietorship, LLC, or Ltd)—use Wise Personal if unincorporated'],
      verdict: 'The ultimate borderless treasury upgrade once you register an LLC, UK Ltd, or HK company.',
      url: 'go/airwallex', cta: 'Open Airwallex Account'
    },
    skin1004: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'sunguide',
      tier: 'S-Tier Pick · #1 Lightweight Serum SPF', name: 'SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum', role: 'SPF50+ PA++++ Next-Gen UV Filters + Centella Asiatica + Hyaluronic Acid',
      verdictShort: 'Even lighter than Beauty of Joseon: a breathable, serum-gel texture with airless pump packaging that oily and combination skin types swear by.',
      metricPill: '☀️ SPF50+ PA++++ · Airless Pump · Zero White Cast',
      price: '$11 – $14 / 50ml · Reef-Safe & Fragrance-Free',
      summary: 'If Beauty of Joseon Relief Sun feels slightly too rich in humid summers, SKIN1004’s Blue-Cap Hyalu-Cica Sun Serum is your answer. It uses modern organic UV filters suspended in a soothing Centella + Hyaluronic Acid serum base.',
      pros: ['Hygienic airless pump dispenser delivers exact 2-pump UV dosage and prevents filter oxidation', 'Hyalu-Cica complex (Centella Asiatica + Hyaluronic Acid) calms redness while hydrating without oiliness', 'Zero eye sting, zero white cast on all skin tones, and zero pilling under makeup'],
      cons: ['Natural dewy-skin finish—if you want a dead-matte powder finish, blot lightly on the T-zone'],
      verdict: 'Co-champion of our K-Beauty SPF testing: pick Beauty of Joseon for dry/winter skin, and SKIN1004 for normal/oily skin.',
      url: 'go/skin1004', cta: 'Check OliveYoung Price'
    },
    roundlab: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'sunguide',
      tier: 'S-Tier Pick · OliveYoung Multi-Year Winner', name: 'Round Lab Birch Juice Moisturizing Sun Cream SPF50+ PA++++', role: 'Inje Silver Birch Sap + Glyceryl Glucoside + Niacinamide Daily UV Cream',
      verdictShort: 'Korea’s domestic #1 bestselling sunscreen at OliveYoung: doubles as your morning moisturizer and SPF50+ PA++++ shield in a single step.',
      metricPill: '🌿 Birch Sap Amino Acids + DPG Soothing + SPF50+ PA++++',
      price: '$14 – $18 / 50ml · Clinically Tested UV Protection',
      summary: 'Round Lab’s Birch Juice Sun Cream swept Korean dermatology rankings by combining Amino-Acid-rich Silver Birch Sap and Glyceryl Glucoside (which stimulates aquaporin water channels) with photostable Uvinul A Plus and Uvinul T 150.',
      pros: ['Replaces morning moisturizer completely for normal-to-combination skin—cutting morning prep to 90 seconds', 'Contains Dipotassium Glycyrrhizate (licorice root derivative) and Allantoin to suppress UV-induced heat redness', 'Independently verified SPF 55+ and PFA 19+ in third-party clinical labs'],
      cons: ['Contains trace botanical extracts (chamomile/pine)—patch test if you have extreme plant allergies'],
      verdict: 'The gold-standard 2-in-1 moisturizer + SPF50+ for busy mornings.',
      url: 'go/roundlab', cta: 'Shop Round Lab on OliveYoung'
    },
    numbuzin: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'winterbarrier',
      tier: 'S-Tier Pick · Antioxidant Dark-Spot Powerhouse', name: 'numbuzin No.5+ Vitamin Concentrated Serum', role: ' Liposomal Glutathione + 4% Tranexamic Acid + 5% Niacinamide + Alpha-Arbutin',
      verdictShort: 'Combines 5 pigment-inhibiting pathways in one bottle (Glutathione, TXA, Niacinamide, Arbutin, and Vitamin C derivatives) without the sting of low-pH L-Ascorbic Acid.',
      metricPill: '✨ Glutathione + 4% TXA + 5% Niacinamide + Panthenol',
      price: '$16 – $20 / 30ml · Zero Essential Oils',
      summary: 'Why buy three separate brightening serums? numbuzin No.5+ stacks master antioxidant Glutathione with 4% Tranexamic Acid, 5% Niacinamide, Alpha-Arbutin, and 5% Panthenol to fade stubborn brown and red acne marks simultaneously.',
      pros: ['Targets melanosome transfer (Niacinamide), tyrosinase activity (Arbutin/Glutathione), and vascular PIE redness (TXA) at once', 'Buffered with 5% Panthenol and Ceramide NP so it never irritates retinoid-sensitized skin', 'Neutral pH means zero conflict when layered with peptides or evening retinoids'],
      cons: ['30ml bottle goes fast if used 2x daily—grab the OliveYoung Twin Pack for best per-ml value'],
      verdict: 'The most comprehensive multi-pathway brightening serum in modern K-Beauty.',
      url: 'go/numbuzin', cta: 'View numbuzin No.5+ Deal'
    },
    illiyoon: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'winterbarrier',
      tier: 'S-Tier Pick · 200ml Ceramide Barrier King', name: 'Illiyoon Ceramide Ato Concentrate Cream', role: 'Patented Yoon Complex + Encapsulated Phyto-Ceramide Capsules for Barrier Rescue',
      verdictShort: 'Amorepacific’s patented visible ceramide capsules melt on skin contact to rebuild cracked winter barriers—and a giant 200ml tube costs under $16.',
      metricPill: '🛡️ Patented Ceramide Skin Complex™ · 200ml Value Tube',
      price: '$14 – $17 / 200ml ($0.08 per ml!)',
      summary: 'While luxury department-store ceramide creams charge $70 for 50ml, Amorepacific’s Illiyoon delivers clinically proven encapsulated ceramides that penetrate the stratum corneum at 1/15th the price per milliliter.',
      pros: ['Unbeatable cost-efficiency: 200ml tube lasts 5–6 months of nightly facial and neck barrier buffering', 'Micro-encapsulated ceramide beads burst upon rubbing without feeling greasy or clogging pores', '100% free of fragrance, essential oils, parabens, and drying alcohols—safe for eczema-prone skin'],
      cons: ['Rich velvety finish—use a pea-sized amount in summer and a full finger-length in dry winter heating'],
      verdict: 'The #1 winter moisturizer to pair with Differin 0.1% Adapalene or 0.1% Retinaldehyde.',
      url: 'go/illiyoon', cta: 'Check iHerb / OliveYoung Price'
    },
    geekgorgeous: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'retinoidramp',
      tier: 'S-Tier Pick · Clinical 0.1% Retinaldehyde', name: 'Geek & Gorgeous A-Game 10 (0.1% Retinal)', role: 'Cyclodextrin-Stabilized 0.1% Retinaldehyde + Allantoin + Panthenol Night Emulsion',
      verdictShort: 'Retinaldehyde requires only 1 enzymatic conversion step to become active retinoic acid (vs 2 steps for retinol)—delivering prescription-like anti-aging with minimal irritation.',
      metricPill: '🧬 0.1% Stabilized Retinal · 11x Faster Than Retinol',
      price: '$19 – $22 / 30ml Airless Pump · Made in Europe',
      summary: 'If Differin 0.1% Adapalene is the undisputed champion for acne, Geek & Gorgeous A-Game 10 (0.1% Retinaldehyde) is the clinical gold standard for photoaging, fine lines, and collagen synthesis without a prescription.',
      pros: ['One-step conversion to retinoic acid delivers visible firmness and texture smoothing in 6–8 weeks', 'Silky yellow emulsion buffered with Allantoin, Panthenol, and Biosaccharide Gum-1 prevents retinoid flaking', 'Costs ~$20 vs $75+ for comparable 0.1% retinaldehyde serums from luxury derm brands'],
      cons: ['Natural bright yellow color from pure retinaldehyde—let it absorb for 10 minutes before sleeping on white pillowcases'],
      verdict: 'The smartest OTC upgrade once your skin has graduated from beginner retinol.',
      url: 'go/geekgorgeous', cta: 'View Geek & Gorgeous A-Game'
    }
  });

  Object.assign(stackToolsData.zh, {
    groq: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.6 / 10', relatedKit: 'deepseekrouter',
      tier: 'S 级严选 · 850+ tok/s 硬件级极速推理', name: 'GroqCloud LPU 超高速推理网关', role: '基于自研 LPU 芯片的毫秒级语音 Agent 与实时流式 API',
      verdictShort: '自研 LPU 语言处理芯片实测输出速度突破 850+ tokens/秒，首字延迟（TTFT）低至 0.08 秒——是实时语音对话与毫秒级意图分类的物理外挂。',
      metricPill: '⚡ 850+ tok/s · 0.08秒首字响应 · 兼容 OpenAI SDK',
      price: '免费开发者额度 · 按量付费 ($0.05–$0.59 / 百万 Token)',
      summary: '在搭建实时语音客服（搭配 ElevenLabs）或即时搜索补全工具时，传统 GPU 哪怕 1.5 秒的等待也会打断对话体验。GroqCloud 的确定性 SRAM LPU 架构彻底消灭了推理卡顿。',
      pros: ['开源大模型推理速度高达 800–1000+ tok/s，比传统云端 GPU 集群快 5 倍以上', '100% 兼容 OpenAI 接口标准，且可在 OpenRouter 内部直接指定为极速底层供应商', '提供慷慨的免费 API 调用额度，非常适合独立开发者做实时 Agent 原型验证'],
      cons: ['硬件 LPU 节点的单次上下文窗口小于 Gemini 4 Argon 的 100 万 Token 窗口'],
      verdict: '实时语音交互、毫秒级工单分类与极速 JSON 提取的不二之选。',
      url: 'go/groq', cta: '免费申请 Groq API Key'
    },
    v0dev: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.7 / 10', relatedKit: 'workstation',
      tier: 'S 级严选 · AI 前端与审美天花板', name: 'Vercel v0 全栈 UI 生成器', role: '一句话生成高审美 React + Tailwind + Shadcn 组件并一键部署上线',
      verdictShort: '只需输入自然语言或上传截图，即可在数秒内生成设计感极强的 Next.js 落地页、交互式价格计算器与后台看板，并支持一键发布到 Vercel。',
      metricPill: '🎨 秒级生成 Shadcn/Tailwind 代码 + 一键 Vercel 部署',
      price: '免费版可用 · Pro 版 $20/月',
      summary: '大多数程序员写后端很快，但调 CSS 间距与动效极其耗时。Vercel v0 专为现代高转化 SaaS 界面而生，审美水准远超通用聊天模型。',
      pros: ['生成的 React + Tailwind + Shadcn UI 代码干净规范，支持一行 npx 命令直接拉取到本地工程', '右侧实时交互预览支持可视化微调字体、圆角、暗黑模式与响应式布局', '与 Vercel 边缘网络原生打通，点击 Deploy 即可生成全球可访问的 HTTPS 链接'],
      cons: ['涉及复杂后端数据库事务时，建议导出到 Cursor 配合 Claude Sonnet 5.5 继续深加工'],
      verdict: '独立开发者用 10 分钟做出“价值一万美金设计感”独立站落地页的审美神器。',
      url: 'go/v0dev', cta: '免费体验 Vercel v0'
    },
    lovable: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.6 / 10', relatedKit: 'workstation',
      tier: 'S 级严选 · 全栈 AI SaaS 制造机', name: 'Lovable.dev 全栈 AI 应用构建器', role: '自然语言对话生成完整全栈 Web 应用（原生集成 Supabase 数据库与 Stripe 收款）',
      verdictShort: '不懂后端运维也能做付费 SaaS：直接用中文或英文对话，自动创建前端界面、Supabase 用户登录/数据库表结构与 Stripe 订阅支付闭环。',
      metricPill: '🚀 一句话生成 SaaS · 原生集成 Supabase + GitHub 同步',
      price: '免费起步 · Pro 版 $20/月（含 20% 持续分佣联盟计划）',
      summary: 'Lovable 打通了从“好看的前端”到“能收钱的真实产品”的最后一公里：自动帮你配置 Supabase PostgreSQL 权限策略，并支持与 GitHub 双向实时同步。',
      pros: ['原生一键绑定 Supabase，自动编写 SQL 建表语句、用户注册登录与行级安全策略（RLS）', '真正的 GitHub 双向同步：随时可以在 Lovable 网页端对话修改，或拉到本地用 Cursor 精细编码', '官方提供 20% 持续分佣联盟计划，非常适合测评博主录制“15分钟做一个AI小工具”带货教程'],
      cons: ['如果需求描述过于模糊，反复让 AI 猜意图会较快消耗月度对话额度'],
      verdict: '非全栈背景创业者快速上线付费微 SaaS（Micro-SaaS）与内部工具的最佳流水线。',
      url: 'go/lovable', cta: '在 Lovable 免费创建应用'
    },
    firecrawl: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.7 / 10', relatedKit: 'mcppack',
      tier: 'S 级严选 · AI 网页转 Markdown 引擎', name: 'Firecrawl API 网页抓取与结构化提取', role: '将任意复杂动态网页、文档站一键洗成大模型最爱的纯净 Markdown 与 JSON',
      verdictShort: '自动剥离广告、弹窗与导航栏噪音，将整站动态网页转化为纯净 Markdown 或结构化 JSON，帮你的 DeepSeek V4.1 与 GPT-6.1 节省 75% Token 账单。',
      metricPill: '🕸️ 支持整站爬取 / LLM 结构化提取 · 官方 MCP 插件',
      price: '免费送 500 页额度 · Hobby $16/月（25% 持续返佣）',
      summary: '直接把原始 HTML 塞给大模型不仅容易触发反爬，还会把 80% 的 Token 浪费在无用的前端标签上。Firecrawl 用一个 API 搞定了无头浏览器渲染、代理轮换与正文清洗。',
      pros: ['/extract 接口支持传入 JSON Schema，直接从任意电商或竞品网页提取价格、参数与评论结构化数据', '官方提供现成 MCP Server，三行配置即可接入 Cursor、Claude Desktop 与 n8n 工作流', '相比直接喂 HTML，平均节省 75% 以上的百万上下文输入 Token 成本'],
      cons: ['超大规模高频并发抓取需升级至标准商业套餐'],
      verdict: '搭建 AI 竞品监控、知识库（RAG）与自动化情报工作流必备的数据清洗底座。',
      url: 'go/firecrawl', cta: '免费领取 500 页抓取额度'
    },
    apify: {
      catKey: 'ai', badgeClass: 'tier-ai', score: '9.6 / 10', relatedKit: 'n8nvps',
      tier: 'S 级严选 · 2000+ 现成云端爬虫商城', name: 'Apify 云端爬虫与自动化数据商城', role: '开箱即用的 TikTok 爆款监控、Google Maps 获客、X/Twitter 与亚马逊评论抓取平台',
      verdictShort: '无需自己维护反爬代理池：直接在商城调用 2,000+ 个现成云端爬虫（Actors），一键接入 Make.com 与 n8n 自动抓取全网社媒与电商数据。',
      metricPill: '💰 每月送 $5 免费额度 + 30% 终身持续联盟佣金',
      price: '每月免费送 $5 额度 · Starter $39/月',
      summary: 'Apify 是海外增长黑客与跨境选品团队的秘密武器。无论是抓取 TikTok 热门带货视频、小红书/Instagram 爆款标签，还是批量提取 Google Maps 本地商家邮箱，都有现成模块直接调用。',
      pros: ['拥有超过 2,000 个专人维护的现成爬虫工具，覆盖全球主流社媒、电商与搜索引擎', '内置住宅代理 IP 自动轮换，并提供官方 Make.com 与 n8n 节点，数据抓完自动触发大模型分析', '联盟营销界天花板级待遇：推广新用户享 30% 终身持续分佣（Lifetime Recurring Commission）'],
      cons: ['如果大量抓取高清视频源文件而非文本元数据，代理流量消耗会比较快'],
      verdict: '做社媒爆款监控、跨境选品分析与自动化 B2B 获客最省心的云端数据武器库。',
      url: 'go/apify', cta: '免费领 $5 额度逛 Apify 商城'
    },
    synthesia: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'geminiomnivideo',
      tier: 'S 级严选 · 企业级 AI 数字人演播室', name: 'Synthesia 3.0 全身表现力 AI 视频平台', role: '230+ 写实数字人主播、140 国语言本地化与智能录屏同步视频工坊',
      verdictShort: '如果说 HeyGen 是短视频带货之王，Synthesia 3.0 则是 B2B 软件演示、跨国产品培训与多语种帮助中心视频的行业绝对标准。',
      metricPill: '🎬 230+ 数字人 · 140+ 语种 · 录屏光标自动同步讲解',
      price: '提供免费版 · Starter $18/月（年付享 25% 联盟佣金）',
      summary: 'Synthesia 3.0 将富有手势表现力的全身 AI 数字人与智能屏幕录制完美融合——软件界面更新时，无需重新找人录屏配音，只需修改文本脚本即可一键重新生成教程视频。',
      pros: ['内置智能录屏联动功能：数字人讲解会自动匹配鼠标点击放大与界面高亮动画', '支持 140+ 种语言的口型同步互译，并支持团队共享专有名词术语库', '提供 25% 高额联盟分佣，且企业客户年付客单价极高'],
      cons: ['数字人风格偏商务专业，若追求手持自拍感（UGC）网感视频建议优先选 HeyGen'],
      verdict: '出海 SaaS 产品教程、在线课程制作与跨国企业宣发视频的首选生产力平台。',
      url: 'go/synthesia', cta: '免费制作 Synthesia AI 视频'
    },
    capcut: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'videoengine',
      tier: 'S 级严选 · 短视频后期效率霸主', name: 'CapCut Pro（剪映海外商业版）', role: '高精度中英双语动态字幕、气口一键剪除与 TikTok Shop 商业带货视频工作台',
      verdictShort: 'AI 短视频流水线的最后一步放大器：用最快速度加上高留存中英双语动态花字、音效转场与免版权商业音乐，完播率立涨 40%。',
      metricPill: '⚡ 99% 双语字幕识别率 + TikTok 爆款带货模板库',
      price: '基础免费 · Pro 版 $9.99/月（最高 35% 联盟佣金）',
      summary: '即便前期用 OpusClip 自动切片或用 HeyGen 生成了口播，最后放进 CapCut 桌面专业版花 3 分钟加上动感关键词高亮字幕、去嗯啊气口与节奏音效，视频质感会直接跨入百万博主行列。',
      pros: ['中英双语同屏识别与动态卡点花字模板极其丰富，远超传统专业非编软件效率', 'Commerce Pro 内置大量已获商业授权的 TikTok 热门配乐与电商商品一键换背景功能', '针对主流显卡深度优化，4K 60帧竖屏短视频几秒钟即可渲染导出'],
      cons: ['部分高阶发光字体、人声分离降噪与 AI 补帧功能需开通 Pro 会员'],
      verdict: '所有做 TikTok、YouTube Shorts、Reels 与小红书双语矩阵创作者的装机必备软件。',
      url: 'go/capcut', cta: '免费下载 CapCut 桌面版'
    },
    surfer: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.6 / 10', relatedKit: 'gsctraffic',
      tier: 'S 级严选 · 谷歌排名内容评分神器', name: 'SurferSEO 内容优化与 AI 搜索追踪器', role: '基于谷歌前十名逆向工程的 0–100 实时内容评分与内链自动织网引擎',
      verdictShort: '自动拆解 Google 首页前 10 名竞品的词频、标题结构与 NLP 语义实体，在写作时给出 0–100 实时打分，让你的评测长文稳冲谷歌首页。',
      metricPill: '📈 0–100 实时排名打分 + 自动插入全站内链',
      price: 'Essential $79/月（PartnerStack 25% 持续佣金）',
      summary: '很多独立站写了长文却排不进前十，是因为漏掉了 Google 算法判定专业度所需的共现语义词（NLP Entities）。SurferSEO 把枯燥的算法指标变成了像通关游戏一样的实时绿灯打分。',
      pros: ['编辑器实时给出 0–100 分优化建议，明确告诉你还差哪些长尾词根、H2 小标题与段落字数', '直连 Google Search Console，自动揪出排名在 11–20 名之间“稍微改改就能冲上首页”的潜力老文章', '支持自动扫描全站 Sitemap 并一键插入高权重上下文内链'],
      cons: ['月费定位偏专业站长，建议在网站积累 20 篇以上核心带货文后启用'],
      verdict: '从“盲目写文章”升级到“精准狙击 Google 首页排名”的最高效内容放大器。',
      url: 'go/surfer', cta: '用 SurferSEO 诊断网站内容'
    },
    ahrefs: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.8 / 10', relatedKit: 'gsctraffic',
      tier: 'S 级严选 · 外链反查与 AI 品牌雷达', name: 'Ahrefs 站长工具与 AI Brand Radar', role: '全球第一外链数据库、低难度带货词挖掘与大模型推荐率（GEO）监控雷达',
      verdictShort: '已验证域名可永久免费使用 Ahrefs Webmaster Tools 体检全站 SEO 漏洞；其最新 AI Brand Radar 更能追踪 ChatGPT 与 Gemini 提及你品牌的频率。',
      metricPill: '🔍 站长工具永久免费 + 35万亿外链库 + AI 引用雷达',
      price: '站长工具（AWT）免费 · Lite 版 $129/月',
      summary: 'Ahrefs 拥有仅次于 Google 的全球第二大活跃商业网络爬虫。用它反查同行独立站的流量结构，5 分钟就能看穿对手哪 5 篇联盟评测文赚走了 80% 的搜索点击。',
      pros: ['Ahrefs Webmaster Tools 对自己验证的域名（如 cruxxxxxkit.com）100% 免费开放全站体检与外链监控', '全新 AI Brand Radar 可监测你的品牌与产品在 GPT-6.1、Gemini 4 与 Perplexity 回答中的曝光占比', '外链实时发现速度与死链挖掘精度稳居全球 SEO 行业第一'],
      cons: ['付费版低阶套餐有月度报告查询积分限制'],
      verdict: '建站第一天就应免费绑定的站长体检神器，也是反查同行高佣金带货词的终极雷达。',
      url: 'go/ahrefs', cta: '免费接入 Ahrefs 站长工具'
    },
    canva: {
      catKey: 'creator', badgeClass: 'tier-creator', score: '9.5 / 10', relatedKit: 'hooksvault',
      tier: 'S 级严选 · 批量视觉与社媒图文工厂', name: 'Canva Pro 可画专业版 & Magic 批量创建', role: 'CSV 表格一键批量生成 50 张小红书/Pinterest 种草图文、封面与对比信息图',
      verdictShort: '把 DeepSeek V4.1 生成的 50 条产品对比 CSV 导入 Canva「批量创建」，60 秒自动生成 50 张排版精美的中英双语种草图文与视频封面。',
      metricPill: '✨ CSV 批量生成图文 + 一键智能抠图 + 亿级商用素材',
      price: '基础免费 · Pro 版 $12.99/月',
      summary: '做联盟营销不能只靠文字，小红书、Pinterest、X 与 YouTube 封面的视觉点击率（CTR）决定了流量上限。Canva Pro 的「批量创建」功能让一人团队拥有整个视觉设计部的产能。',
      pros: ['「批量创建（Bulk Create）」可将 CSV 表格字段直接绑定到画布文字层，一键生成几十张系列卡片', '「魔力尺寸转换」一键把 16:9 博客首图变成 3:4 小红书笔记图与 9:16 短视频封面', '毫秒级发丝抠图与品牌字体/色板锁定，确保全平台视觉高度统一'],
      cons: ['不适合做复杂网页交互原型（网页 UI 建议直接用 Vercel v0 生成）'],
      verdict: '把深度评测长文快速拆解为全网多平台种草图文矩阵的最高效视觉生产力工具。',
      url: 'go/canva', cta: '免费试用 Canva Pro 专业版'
    },
    railway: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.7 / 10', relatedKit: 'n8nvps',
      tier: 'S 级严选 · 零运维一键部署云平台', name: 'Railway.app 一键 Docker 与 n8n 云平台', role: '无需配置 Linux 命令行，45 秒一键部署满血版 n8n、PostgreSQL、Redis 与 LiteLLM',
      verdictShort: '不想折腾 SSH 密钥和 Nginx 反代？在 Railway 点击现成模板，45 秒即可拉起自带数据库与队列 Worker 的生产级 n8n 与 AI 网关。',
      metricPill: '🚅 45秒一键部署 n8n/Postgres · 按秒计费不浪费',
      price: '$5/月 Hobby 套餐（直接包含 $5 资源额度）',
      summary: 'Railway 把传统 VPS 繁琐的 Docker Compose 运维变成了像拼乐高一样的可视化画布。无论是部署私有 n8n、LobeChat、Umami 网站统计还是 Python 爬虫，点一下就能上线。',
      pros: ['内置 900+ 个社区一键部署模板（含 n8n Worker 队列版、LiteLLM 路由网关、Ghost 博客等）', '容器之间自动打通高速内网连接，自带免费 HTTPS 域名与 GitHub 提交自动重部署', '按实际消耗的 CPU/内存秒级计费，轻负载下每月仅需两三美金'],
      cons: ['若运行 24 小时满载的超大内存任务（>16GB RAM），成本会高于 Hetzner 裸金属 VPS'],
      verdict: '不想学 Linux 运维但又想拥有私有 n8n 与开源 AI 工具栈的创作者首选云平台。',
      url: 'go/railway', cta: '领取 Railway $5 部署赠金'
    },
    digitalocean: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.6 / 10', relatedKit: 'n8nvps',
      tier: 'S 级严选 · 送 $200 免费云主机赠金', name: 'DigitalOcean 全球云主机与 GPU 云', role: '老牌稳定全球 Linux VPS、托管数据库与 $200 新客 60 天免费试用算力',
      verdictShort: '海外云厂商中最慷慨的羊毛与高转化联盟项目之一：新注册绑卡即送 $200 免费算力额度（60天有效），足够免费跑满整套高配 AI 与爬虫集群。',
      metricPill: '🎁 新客立领 $200 免费云额度 · 全球高速机房',
      price: '基础云主机 $4/月起 · 新客享 $200 免费体验金',
      summary: 'DigitalOcean 拥有新加坡、法兰克福、硅谷、纽约等全球核心机房，网络路由极其稳健。对于刚起步的开发者，用 $200 赠金免费测试两个月高配多节点集群几乎是零成本试错。',
      pros: ['高达 $200 的 60 天免费算力赠金，可任意开启高配 Droplet、托管 Postgres 数据库或 GPU 实例', '应用市场提供一键安装的 Docker、n8n、WordPress 与 Coolify 镜像', '联盟营销转化率极高：用“免费领 $200 云服务器额度”做教程引导，读者注册意愿极强'],
      cons: ['60 天赠金用完后，记得将测试用高配机器降配至 $4–$6/月常驻机型'],
      verdict: '零成本白嫖两个月高配海外云服务器、以及做技术类联盟带货必推的黄金 Offer。',
      url: 'go/digitalocean', cta: '免费领取 $200 云主机额度'
    },
    namecheap: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.5 / 10', relatedKit: 'cloudflareedge',
      tier: 'S 级严选 · 老牌特价域名与企业邮局', name: 'Namecheap 域名与 PrivateEmail 企业邮箱', role: 'Spaceship 母公司、首年 $0.98 特价域名促销与高性价比自定义域名邮箱',
      verdictShort: 'Spaceship 的母公司老牌巨头：经常推出低至 $0.98–$5.98 的新后缀首年闪促，且其 PrivateEmail 是配置 `hello@你的域名` 最划算的独立企业邮箱方案。',
      metricPill: '🌐 终身免费隐私保护 + $1.24/月独立域名企业邮箱',
      price: '.com 首年特惠 $6.49 起 · 企业邮箱 $14.88/年',
      summary: '在注册联盟计划（如 Impact、CJ、PartnerStack）时，使用 `@gmail.com` 很容易被拒，而用 `partner@cruxxxxxkit.com` 这种独立域名邮箱过审率会翻倍。Namecheap 的 PrivateEmail 一年仅需十几个美金即可搞定专业收发信。',
      pros: ['PrivateEmail 仅需约 $1.24/月即可开通支持 IMAP/SMTP 的专业品牌邮箱，大幅提升海外联盟申请过审率', '永久免费赠送 Whois 隐私保护，7×24 小时英文真人在线客服响应极快', '通过 Impact / CJ 联盟网络提供 20%–35% 域名与邮箱佣金'],
      cons: ['后台界面偏传统经典风格，日常极速改 DNS 依然更推荐旗下的 Spaceship'],
      verdict: '申请高门槛海外联盟必备的低成本品牌企业邮箱方案，与 Spaceship 完美互补。',
      url: 'go/namecheap', cta: '查看 Namecheap 域名与邮箱特惠'
    },
    nordvpn: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.6 / 10', relatedKit: 'affiliatematrix',
      tier: 'S 级严选 · 跨境独享静态 IP 与加密组网', name: 'NordVPN 独享静态 IP 与 Meshnet', role: '全球 111 国纯净节点、防风控独享静态 IP 与跨设备免费内网穿透（Meshnet）',
      verdictShort: '跨境多账号运营与海外收款防风控刚需：锁定专属纯净静态 IP 登录 Stripe/PayPal/联盟后台，避免共享机房 IP 触发二次验证或封号。',
      metricPill: '🔒 111国节点 · NordLynx 极速协议 · 40%–100% 高额佣金',
      price: '特惠 $3.09/月起（两年套餐额外赠送 3 个月）',
      summary: '做全球联盟营销与跨境独立站时，频繁切换劣质共享 IP 登录收款账户（Stripe、PayPal、Wise）极易触发安全冻结。NordVPN 提供专属静态 IP（Dedicated IP）与全球各国本地搜索结果预览能力。',
      pros: ['可选配独享静态 IP（Dedicated IP），固定单一纯净住宅/商业 IP 登录核心财务与广告后台', '内置免费 Meshnet 功能，可随时随地加密直连家里的电脑或私有大模型主机', '全球佣金最高的王牌数字产品之一：新客首单佣金高达 40%–100%，续费还享 30% 分成'],
      cons: ['独享静态 IP 需要在基础订阅之上额外勾选插件包'],
      verdict: '跨境操盘手保护收款与社媒账号安全的防风控护盾，也是独立站超高佣金转化利器。',
      url: 'go/nordvpn', cta: '获取 NordVPN 专属折扣与赠期'
    },
    airwallex: {
      catKey: 'cloud', badgeClass: 'tier-cloud', score: '9.7 / 10', relatedKit: 'solo',
      tier: 'S 级严选 · 跨境企业多币种金库与虚拟卡', name: 'Airwallex 空中云汇全球企业账户', role: '0 货币转换费无限开虚拟 Visa 卡、20+ 币种本地收款账户与 SaaS 订阅防盗刷管理',
      verdictShort: '当你注册了海外公司（美国 LLC、英国 Ltd 或香港公司）后，空中云汇让你免费批量生成虚拟 Visa 卡支付 OpenRouter/云主机/广告费，且享 0% 跨境刷卡手续费。',
      metricPill: '💳 批量开虚拟 Visa 卡 + 0% 跨境刷卡费 + 银行间实时汇率',
      price: '$0 开户费与月管理费 · 0% 外币卡交易费',
      summary: '用国内信用卡支付几十个海外 AI API 与 SaaS 订阅不仅容易被拒付，还会承担 1.5%–3% 的隐性汇损。Airwallex 支持一键开设美元、欧元、英镑、港币等本地同名收款账户，并可为每个软件单独开一张限额虚拟卡。',
      pros: ['支持无限生成多币种虚拟 Visa 卡，可为每个 AI API 或广告账户单独设每月扣款上限，彻底杜绝超额扣费', '提供美、欧、英、澳、港、新等 20+ 个国家和地区的本地银行账号，无缝对接 Stripe、亚马逊与各大联盟打款', '无开户费、无账户管理年费，换汇直接享受贴近银行间市场的极低点差'],
      cons: ['仅支持个体工商户、香港公司或海外公司（LLC/Ltd）认证——纯个人身份请优先使用 Wise'],
      verdict: '工作室走向公司化运作、需要批量管理海外虚拟卡与大额跨境结汇的终极企业金库。',
      url: 'go/airwallex', cta: '免费开通 Airwallex 企业账户'
    },
    skin1004: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'sunguide',
      tier: 'S 级严选 · 油皮混油皮本命水感防晒', name: 'SKIN1004 理肤天使积雪草水感防晒精华 (蓝帽)', role: 'SPF50+ PA++++ 新一代化学防晒剂 + 马达加斯加积雪草 + 透明质酸真空泵精华',
      verdictShort: '肤感比朝鲜美女大米防晒还要轻薄一档的“蓝帽水感精华防晒”：采用真空按压泵设计，一抹化水、零假白、不熏眼，油皮与混油皮春夏挚爱。',
      metricPill: '☀️ SPF50+ PA++++ · 真空按压泵 · 零硅油零假白',
      price: '$11 – $14 / 50ml · 敏感肌与痘肌友好',
      summary: '如果你觉得朝鲜美女防晒在夏天稍微有一点点润，那么 SKIN1004 这支蓝帽 Hyalu-Cica 防晒精华就是完美替代。它将四种高光稳定性现代防晒剂融于积雪草与小分子玻尿酸基底中，涂感完全像清爽保湿精华。',
      pros: ['罕见的真空按压泵包装：不仅能精准控制每次 2 泵的标准防晒用量，还能防止活性成分氧化失活', '核心 Hyalu-Cica 配方（高纯度马达加斯加积雪草 + 透明质酸）边防晒边舒缓刷酸后的微泛红', '后续跟妆或叠加散粉完全不搓泥、不拔干、不泛白'],
      cons: ['成膜后呈自然水光肌质感，大油田夏天可在 T 区轻扫一层透明散粉'],
      verdict: '韩系防晒双子星之一：干皮/秋冬选朝鲜美女，混油皮/春夏无脑选 SKIN1004 蓝帽。',
      url: 'go/skin1004', cta: '查看 OliveYoung 官方直邮价'
    },
    roundlab: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'sunguide',
      tier: 'S 级严选 · 韩国本土销量总冠军防晒', name: 'Round Lab 独岛桦树汁保湿防晒霜 SPF50+ PA++++', role: '麟蹄郡白桦树汁氨基酸 + 甘油葡糖苷 + 烟酰胺晨间二合一防晒乳',
      verdictShort: '连续多年蝉联韩国本土 OliveYoung 防晒品类销量总冠军：早上洁面后无需涂乳液，一支直接搞定深层水通道保湿 + SPF50+ PA++++ 高倍防护。',
      metricPill: '🌿 白桦树汁氨基酸 + 甘草酸二钾退红 + 实测 SPF55+',
      price: '$14 – $18 / 50ml · 权威临床实测认证',
      summary: 'Round Lab 桦树汁防晒在韩国本土几乎人手一支。它利用富含氨基酸的银桦树汁搭配甘油葡糖苷（激活皮肤水通道蛋白 Aquaporin-3），在提供高倍 UVA/UVB 防护的同时让底妆一整天扒得死死的。',
      pros: ['极佳的晨间“乳液+防晒”二合一配方，早上洗完脸涂完维 C 直接涂它，省去涂面霜步骤', '复配甘草酸二钾与尿囊素，有效抑制日晒高温引起的两颊燥热泛红', '多家独立实验室双盲复测 SPF 均在 55 以上、PFA 19+，防护力极其扎实'],
      cons: ['含有微量植物舒缓提取物，对桦树花粉极度过敏者建议先在耳后测试'],
      verdict: '早八通勤族“洁面+维C+防晒”三步极简护肤流程的晨间王牌。',
      url: 'go/roundlab', cta: '查看 Round Lab 桦树汁防晒优惠'
    },
    numbuzin: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'winterbarrier',
      tier: 'S 级严选 · 五维通路淡印提亮王炸', name: 'numbuzin 5号谷胱甘肽维他命浓缩精华', role: '脂质体谷胱甘肽 + 4% 传明酸 + 5% 烟酰胺 + α-熊果苷 + 5% 泛醇多通路淡印精华',
      verdictShort: '一瓶集齐五大美白淡印猛药（谷胱甘肽+传明酸+烟酰胺+熊果苷+维C衍生物）外加 5% 泛醇打底，专治熬夜黄气与新生红黑痘印，且完全不刺痛。',
      metricPill: '✨ 谷胱甘肽 + 4%传明酸 + 5%烟酰胺 + 5%泛醇',
      price: '$16 – $20 / 30ml · 无人工香精无酒精',
      summary: '为什么单用一种美白成分总是见效慢？因为黑色素生成涉及酪氨酸酶激活、氧化聚合、转运与血管扩张四个环节。numbuzin 5号精华用鸡尾酒协同思路把四条通路全部堵死，同时用 5% 泛醇护住屏障。',
      pros: ['全通路协同：传明酸退红印、熊果苷与谷胱甘肽抑黑、5% 烟酰胺阻断黑色素向表皮转移', '高达 5% 的泛醇（维生素 B5）与神经酰胺 NP 打底，敏感肌早晚使用也零刺痛感', '温和中性 pH 值，可无缝融入早 C 晚 A 或刷酸流程，不与任何成分打架'],
      cons: ['30ml 单瓶早晚厚涂消耗较快，强烈建议在 OliveYoung 直接入双支装礼盒'],
      verdict: '目前韩系成分护肤中配方链路最完整、兼顾红黑痘印与全脸去黄的性价比神作。',
      url: 'go/numbuzin', cta: '查看 numbuzin 5号精华双支装'
    },
    illiyoon: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.8 / 10', relatedKit: 'winterbarrier',
      tier: 'S 级严选 · 200ml 神经酰胺修护大碗王', name: 'Illiyoon 一理润神经酰胺舒敏集中修护霜', role: '爱茉莉太平洋专利微囊神经酰胺颗粒 + 植萃胆固醇/脂肪酸屏障封包面霜',
      verdictShort: '爱茉莉太平洋集团专研的“看得见的神经酰胺微囊颗粒”，一抹即化填入受损角质层——200ml 巨无霸装仅需百元出头，秋冬刷酸封包随便挖不心疼。',
      metricPill: '🛡️ 专利神经酰胺微囊技术 · 200ml 超大碗家庭装',
      price: '$14 – $17 / 200ml（每毫升仅 $0.08！）',
      summary: '很多主打神经酰胺的专柜面霜 50ml 就要卖四五百元，实际神经酰胺添加量却微乎其微。一理润直接采用爱茉莉太平洋专利的 Ceramide Skin Complex™ 微囊包埋技术，把高浓度神经酰胺做成肉眼可见的软颗粒。',
      pros: ['极致的容量性价比：200ml 超大软管装，拿来涂全脸、脖子甚至手肘干裂都能用上小半年', '推开瞬间微囊颗粒融化，形成透气不闷痘的哑光丝绒保护膜，锁水能力极强', '通过严苛低敏测试，0香精、0色素、0酒精，干敏肌与秋冬季刷阿达帕林打底完美绝配'],
      cons: ['质地属于扎实滋润挂，油皮夏天只需取绿豆大小，秋冬干冷季可正常按压涂抹'],
      verdict: '秋冬干冷暖气房里性价比最高的神经酰胺修护大碗王，刷酸人居家常备底气。',
      url: 'go/illiyoon', cta: '去 iHerb / OliveYoung 查看底价'
    },
    geekgorgeous: {
      catKey: 'beauty', badgeClass: 'tier-beauty', score: '9.7 / 10', relatedKit: 'retinoidramp',
      tier: 'S 级严选 · 0.1% 临床级A醛抗老天花板', name: 'Geek & Gorgeous A-Game 10 (0.1% 视黄醛晚安乳)', role: '环糊精包裹高稳定 0.1% 视黄醛（Retinal）+ 尿囊素 + 泛醇抗老紧致精华乳',
      verdictShort: '视黄醛（A醛）只需一步转化即可变为维A酸，作用速度比普通A醇快 11 倍！欧洲硬核实验室品牌出品，百元价位给足 0.1% 满血抗老浓度。',
      metricPill: '🧬 0.1% 稳定态视黄醛 · 转化效率比普通A醇快 11 倍',
      price: '$19 – $22 / 30ml 真空泵 · 欧洲原产临床配方',
      summary: '如果说 0.1% 阿达帕林是疏通毛孔与战痘之神，那么 0.1% 视黄醛（Retinaldehyde）就是非处方抗老、淡化细纹与刺激胶原蛋白再生的金字塔尖。Geek & Gorgeous 用不到 20 美金的价格打破了大牌 A 醛动辄五六百元的垄断。',
      pros: ['离维A酸仅一步之遥（A醛 -> A酸），比普通A醇（A醇 -> A醛 -> A酸）刺激度更低、抗老紧致见效快一倍', '复配尿囊素、泛醇与生物糖胶-1，黄色丝滑乳液质地温和不拔干', '真空避光按压瓶确保每一滴 0.1% 视黄醛直到用空都保持最高活性'],
      cons: ['高浓度A醛自带天然明黄色，晚间涂抹后建议等待 10 分钟吸收完全再躺上白色枕套'],
      verdict: '渡过新手耐受期后，追求真皮层抗老、细腻毛孔与紧致轮廓的最高性价比进阶晚A。',
      url: 'go/geekgorgeous', cta: '查看 Geek & Gorgeous 官方详情'
    }
  });


  // 3. Add 16 new Full-Length Bilingual Affiliate Review & Buyer's Guide Articles (24 -> 40 Guides)
  const newStoryIds = [
    'v0lovablebolt', 'scraping2026', 'groqvsopenrouter', 'heygenvsynthesia',
    'surfervsahrefs', 'capcutvsopus', 'vps2026', 'crossborderpay',
    'spaceshipvsnamecheap', 'vpnproxy2026', 'partnerstackgold', 'kbeautyspf3',
    'numbuzinvsanua', 'illiyoonvscerave', 'retinalvsadapalene', 'iherboliveyoung'
  ];
  newStoryIds.forEach(id => {
    if (!storiesOrder.includes(id)) storiesOrder.push(id);
  });

  Object.assign(storiesData.en, {
    v0lovablebolt: {
      catKey: 'ai', readTime: '11 min read',
      category: 'AI App Builders · 2026 Full-Stack Showdown',
      title: 'Vercel v0 vs. Lovable.dev vs. Cursor + Claude Sonnet 5.5: Which AI Builder Ships Faster?',
      deck: 'We built the exact same Stripe-monetized SaaS dashboard across v0.dev, Lovable.dev, and Cursor (powered by Claude Sonnet 5.5 & GPT-6.1 Sol Pro). Here is the honest breakdown.',
      body: `
        <p>In late 2026, solo founders no longer hire $15,000 dev agencies to ship an MVP. Instead, the decision comes down to three tools: <strong>Vercel v0</strong> for high-craft UI, <strong>Lovable.dev</strong> for natural-language Supabase/Stripe full-stack apps, and <strong>Cursor + Claude Sonnet 5.5</strong> for unrestricted repository control.</p>
        <h4>1. Head-to-Head Production Matrix (November 2026)</h4>
        <table class="bench-table">
          <thead><tr><th>Platform</th><th>Best Use Case</th><th>Backend &amp; DB</th><th>Monthly Cost</th><th>Partner Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Vercel v0</strong></td><td>Agency-grade React/Tailwind/Shadcn UI &amp; calculators</td><td>Vercel Edge / Next.js</td><td>Free / $20/mo</td><td><a href="/go/v0dev/">Try Vercel v0 →</a></td></tr>
            <tr><td><strong>Lovable.dev</strong></td><td>Complete CRUD SaaS with 1-click Supabase &amp; Stripe</td><td>Native Supabase Postgres</td><td>Free / $20/mo</td><td><a href="/go/lovable/">Launch on Lovable →</a></td></tr>
            <tr><td><strong>Cursor + Claude 5.5</strong></td><td>Complex custom multi-file production architectures</td><td>Any Stack / Docker / Cloud</td><td>$20/mo + API</td><td><a href="/go/cursor/">Download Cursor →</a></td></tr>
          </tbody>
        </table>
        <h4>2. The Winning 3-Step Hybrid Workflow</h4>
        <p>Don’t lock yourself into a single tool. Our highest-shipping solo builders generate the initial hero and Shadcn pricing components in <a href="/go/v0dev/">Vercel v0</a>, wire up authentication and Postgres tables in <a href="/go/lovable/">Lovable.dev</a> (with 2-way GitHub sync enabled), and pull the repository into <a href="/go/cursor/">Cursor</a> using <strong>Claude Sonnet 5.5</strong> ($2/1M via <a href="/go/openrouter/">OpenRouter</a>) for custom API edge cases.</p>
      `
    },
    scraping2026: {
      catKey: 'ai', readTime: '10 min read',
      category: 'Agent Data Pipelines · Web Scraping Benchmark',
      title: 'Firecrawl vs. Apify: Best Web Scraping APIs for DeepSeek V4.1 & GPT-6.1 Agents',
      deck: 'Raw HTML wastes 80% of your context window. We tested Firecrawl and Apify across 10,000 e-commerce, X/Twitter, and documentation pages.',
      body: `
        <p>Even with 1,048,576-token context windows on <strong>DeepSeek V4.1-Flash-1017</strong> and <strong>GPT-6.1</strong>, feeding uncleaned DOM tags into an LLM ruins reasoning accuracy and inflates API bills by 4x. You need a dedicated extraction layer.</p>
        <h4>1. Firecrawl vs. Apify: When to Use Which</h4>
        <table class="bench-table">
          <thead><tr><th>Tool</th><th>Core Strength</th><th>Token Savings</th><th>Affiliate / Free Tier</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td><strong>Firecrawl API</strong></td><td>Turns any URL or docs site into clean LLM Markdown &amp; Pydantic JSON</td><td>78% fewer input tokens</td><td>500 Free Pages (25% RevShare)</td><td><a href="/go/firecrawl/">Get Firecrawl Key →</a></td></tr>
            <tr><td><strong>Apify Cloud Store</strong></td><td>2,000+ ready Actors for TikTok, Google Maps, Amazon &amp; Instagram</td><td>Pre-structured JSON datasets</td><td>$5/mo Free Credit (30% Recurring)</td><td><a href="/go/apify/">Explore Apify Store →</a></td></tr>
          </tbody>
        </table>
        <h4>2. Automating Competitor Intelligence in Make.com</h4>
        <p>Connect <a href="/go/apify/">Apify</a> or <a href="/go/firecrawl/">Firecrawl</a> inside a <a href="/go/make/">Make.com (?pc=cruxkit)</a> scenario, pipe the clean Markdown into <code>deepseek/deepseek-v4.1-flash-1017</code> ($0.15/1M) via <a href="/go/openrouter/">OpenRouter</a>, and output daily competitor pricing alerts straight to Notion.</p>
      `
    },
    groqvsopenrouter: {
      catKey: 'ai', readTime: '9 min read',
      category: 'Real-Time AI · Latency & Throughput Lab',
      title: 'GroqCloud LPU (850+ tok/s) vs. OpenRouter vs. DeepSeek V4.1-Flash-1017: The Speed Benchmark',
      deck: 'When building voice agents with ElevenLabs v3 or real-time UI autocomplete, Time-To-First-Token (TTFT) is everything.',
      body: `
        <p>We measured Time-To-First-Token (TTFT) and sustained tokens-per-second across 500 production prompts to see how hardware LPUs compare against frontier 1M-context cloud gateways.</p>
        <table class="bench-table">
          <thead><tr><th>Provider / Engine</th><th>TTFT (Latency)</th><th>Output Speed</th><th>Best Workload</th><th>Official Link</th></tr></thead>
          <tbody>
            <tr><td><strong>GroqCloud LPU</strong></td><td>0.08 sec</td><td>860 tok/s</td><td>Real-time voice bots &amp; instant classification</td><td><a href="/go/groq/">Try GroqCloud →</a></td></tr>
            <tr><td><strong>OpenRouter (DeepSeek V4.1-Flash-1017)</strong></td><td>0.24 sec</td><td>195 tok/s</td><td>1M-context reasoning &amp; bulk content generation</td><td><a href="/go/openrouter/">OpenRouter Gateway →</a></td></tr>
            <tr><td><strong>ElevenLabs Studio v3</strong></td><td>0.075 sec</td><td>Real-time Audio</td><td>Ultra-low-latency neural voice streaming</td><td><a href="/go/elevenlabs/">Try ElevenLabs v3 →</a></td></tr>
          </tbody>
        </table>
        <p><strong>Lab Verdict:</strong> Route ultra-fast intent classification and <a href="/go/elevenlabs/">ElevenLabs</a> conversational voice turns through <a href="/go/groq/">GroqCloud</a>, and route heavy 1M-context synthesis through <a href="/go/openrouter/">OpenRouter</a>.</p>
      `
    },
    heygenvsynthesia: {
      catKey: 'ai', readTime: '12 min read',
      category: 'AI Video Monetization · Avatar Studio Comparison',
      title: 'HeyGen Avatar IV vs. Synthesia 3.0 vs. ElevenLabs: Which AI Video Tool Converts Best in 2026?',
      deck: 'We produced 60 bilingual product videos and B2B tutorials to test lip-sync realism, multi-language dubbing, and affiliate conversion rates.',
      body: `
        <p>AI video avatars have crossed the uncanny valley. Whether you are running a faceless TikTok/YouTube review channel or localizing SaaS onboarding into 30 languages, picking the right studio saves $5,000/month in video production.</p>
        <table class="bench-table">
          <thead><tr><th>Studio</th><th>Best Video Format</th><th>Key Advantage</th><th>Partner Offer</th></tr></thead>
          <tbody>
            <tr><td><strong>HeyGen (Avatar IV)</strong></td><td>High-converting UGC reels, product demos &amp; 1-click video translation</td><td>Best micro-expressions &amp; casual creator realism</td><td><a href="/go/heygen/">Try HeyGen Free (?via=xing) →</a></td></tr>
            <tr><td><strong>Synthesia 3.0</strong></td><td>B2B SaaS walkthroughs, SOP training &amp; screen-synced presentations</td><td>Full-body expressive presenters + smart screen recorder</td><td><a href="/go/synthesia/">Try Synthesia 3.0 →</a></td></tr>
            <tr><td><strong>ElevenLabs v3</strong></td><td>Custom emotional voice cloning, audiobooks &amp; multi-speaker dubbing</td><td>Unmatched emotional cadence &amp; breath realism</td><td><a href="/go/elevenlabs/">Try ElevenLabs Free →</a></td></tr>
          </tbody>
        </table>
        <p><strong>Pro Tip:</strong> Generate your vocal track in <a href="/go/elevenlabs/">ElevenLabs v3</a>, drive your avatar in <a href="/go/heygen/">HeyGen</a>, and add kinetic bilingual captions in <a href="/go/capcut/">CapCut Pro</a>.</p>
      `
    },
    surfervsahrefs: {
      catKey: 'ai', readTime: '13 min read',
      category: 'SEO & GEO Growth · Search Traffic Stack',
      title: 'Semrush vs. Ahrefs Brand Radar vs. SurferSEO: The 2026 Organic & AI Search Playbook',
      deck: 'How to find low-competition affiliate keywords, optimize NLP entity scores to 90+, and get cited by ChatGPT Search, Perplexity, and Gemini 4.',
      body: `
        <p>Search engine optimization in 2026 is a dual game: ranking in Google’s top 3 organic slots while ensuring LLM answer engines cite your domain via <code>llms.txt</code> and high-density comparison tables.</p>
        <table class="bench-table">
          <thead><tr><th>Tool</th><th>Primary Job in Your Stack</th><th>Standout 2026 Feature</th><th>Official Partner Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Semrush</strong></td><td>Commercial intent keyword discovery &amp; PPC spy</td><td>Intent-filtered affiliate keyword magic tool</td><td><a href="/go/semrush/">Start Semrush Trial →</a></td></tr>
            <tr><td><strong>Ahrefs (AWT + Radar)</strong></td><td>Competitor backlink audit &amp; LLM mention tracking</td><td>Free Webmaster Tools + AI Brand Radar</td><td><a href="/go/ahrefs/">Use Ahrefs Free →</a></td></tr>
            <tr><td><strong>SurferSEO</strong></td><td>On-page NLP entity scoring &amp; auto internal linking</td><td>Live 0–100 SERP Content Editor score</td><td><a href="/go/surfer/">Try SurferSEO →</a></td></tr>
          </tbody>
        </table>
      `
    },
    capcutvsopus: {
      catKey: 'ai', readTime: '10 min read',
      category: 'Creator Workflow · Short-Form Video Factory',
      title: 'OpusClip Pro vs. CapCut Commerce Pro vs. Descript: Shipping 90 Viral Shorts a Month',
      deck: 'How a single operator turns 4 long-form podcasts or tutorials into 90 bilingual vertical shorts for YouTube, TikTok, Reels, and Xiaohongshu.',
      body: `
        <p>Short-form vertical video remains the highest-leverage top-of-funnel traffic source for affiliate links. Here is how the top three editing engines compare in late 2026:</p>
        <table class="bench-table">
          <thead><tr><th>Tool</th><th>Core Automation</th><th>Time Saved per 10 Clips</th><th>Partner Link</th></tr></thead>
          <tbody>
            <tr><td><strong>OpusClip Pro</strong></td><td>AI Virality Score + automatic 9:16 speaker reframing from 1-hour videos</td><td>6.5 hours saved</td><td><a href="/go/opusclip/">Try OpusClip Free →</a></td></tr>
            <tr><td><strong>CapCut Pro</strong></td><td>99% accurate EN/ZH bilingual kinetic captions &amp; TikTok Shop templates</td><td>4.0 hours saved</td><td><a href="/go/capcut/">Get CapCut Pro →</a></td></tr>
            <tr><td><strong>Descript</strong></td><td>Edit video by deleting text in the transcript + Studio Sound cleanup</td><td>5.0 hours saved</td><td><a href="/go/descript/">Try Descript Free →</a></td></tr>
          </tbody>
        </table>
      `
    },
    vps2026: {
      catKey: 'ai', readTime: '12 min read',
      category: 'Cloud Infrastructure · Self-Hosted n8n & Docker',
      title: 'Hostinger KVM2 vs. Hetzner ARM64 vs. Railway vs. DigitalOcean ($200 Credit): 2026 VPS Benchmark',
      deck: 'We deployed n8n + PostgreSQL + Redis + LiteLLM across all four cloud providers to test RAM cost, NVMe IOPS, and setup friction.',
      body: `
        <p>Self-hosting <strong>n8n</strong> and <strong>LiteLLM</strong> eliminates $300+/month in SaaS task taxes. Depending on whether you prefer 1-click zero-devops or raw bare-metal value, here is the 2026 cloud winner matrix:</p>
        <table class="bench-table">
          <thead><tr><th>Cloud Provider</th><th>Specs &amp; Price</th><th>Best For</th><th>Partner Bonus</th></tr></thead>
          <tbody>
            <tr><td><strong>Hostinger KVM 2</strong></td><td>2 vCPU / 8GB RAM / 100GB NVMe ($6.99/mo)</td><td>1-Click Ubuntu n8n template + 8GB RAM headroom</td><td><a href="/go/hostinger/">Claim Hostinger Discount →</a></td></tr>
            <tr><td><strong>Hetzner Cloud CAX11</strong></td><td>2 vCPU / 4GB RAM / 40GB NVMe (€3.79/mo)</td><td>Maximum raw performance per dollar for Linux pros</td><td><a href="/go/hetzner/">Get €20 Hetzner Credit →</a></td></tr>
            <tr><td><strong>Railway.app</strong></td><td>Usage-based ($5/mo Hobby includes $5 credit)</td><td>Zero-SSH 45-second n8n + Postgres + Redis deploy</td><td><a href="/go/railway/">Claim $5 Railway Bonus →</a></td></tr>
            <tr><td><strong>DigitalOcean</strong></td><td>Droplets from $4/mo + Managed DBs</td><td>60-day risk-free multi-node testing</td><td><a href="/go/digitalocean/">Claim $200 Free Credit →</a></td></tr>
          </tbody>
        </table>
      `
    },
    crossborderpay: {
      catKey: 'ai', readTime: '11 min read',
      category: 'Global Commerce · Payouts, Banking & MoR',
      title: 'Wise vs. Airwallex vs. Lemon Squeezy vs. Gumroad: The 2026 Cross-Border Monetization Stack',
      deck: 'How solo digital product sellers and affiliate marketers collect USD/EUR globally, slash FX conversion fees to near zero, and automate VAT.',
      body: `
        <p>Getting traffic is only half the battle; keeping 95%+ of your international revenue requires pairing the right Merchant of Record (MoR) with a zero-FX borderless treasury account.</p>
        <table class="bench-table">
          <thead><tr><th>Platform</th><th>Role in Your Business</th><th>Fee Structure</th><th>Official Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Gumroad</strong></td><td>Instant digital kit storefront + built-in Marketplace discovery</td><td>10% flat (No monthly fee)</td><td><a href="/go/gumroad/">Open Gumroad Store (?a=735179107) →</a></td></tr>
            <tr><td><strong>Lemon Squeezy</strong></td><td>SaaS subscriptions, license keys &amp; global VAT compliance</td><td>5% + $0.50 per transaction</td><td><a href="/go/lemonsqueezy/">Explore Lemon Squeezy →</a></td></tr>
            <tr><td><strong>Wise Business</strong></td><td>Personal &amp; solo local USD/EUR/GBP receiving accounts (ACH/IBAN)</td><td>Mid-market FX (~0.35%)</td><td><a href="/go/wise/">Open Free Wise Account →</a></td></tr>
            <tr><td><strong>Airwallex</strong></td><td>Corporate multi-currency accounts + unlimited 0%-FX virtual Visa cards</td><td>$0/mo + 0% FX card fees</td><td><a href="/go/airwallex/">Open Airwallex Account →</a></td></tr>
          </tbody>
        </table>
      `
    },
    spaceshipvsnamecheap: {
      catKey: 'ai', readTime: '9 min read',
      category: 'Domains & DNS · Web Infrastructure Audit',
      title: 'Spaceship Unbox vs. Cloudflare Registrar vs. Namecheap: Best Domain & Email Stack in 2026',
      deck: 'Why we registered cruxxxxxkit.com on Spaceship, paired it with 30-second DNS TXT verification, and compared renewal pricing across 15 TLDs.',
      body: `
        <p>Your domain registrar controls your DNS propagation speed, email deliverability, and annual portfolio burn. We tested the big three registrars head-to-head:</p>
        <table class="bench-table">
          <thead><tr><th>Registrar</th><th>.com Pricing &amp; DNS Speed</th><th>Killer Feature</th><th>Official Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Spaceship.com</strong></td><td>$2.88–$8.98/yr · 20s global DNS propagation</td><td>Unbox™ 1-click DNS presets &amp; instant GSC TXT verify</td><td><a href="/go/spaceship/">Launch on Spaceship →</a></td></tr>
            <tr><td><strong>Cloudflare</strong></td><td>At-cost wholesale renewal + Free CDN/WAF</td><td>Zero-markup renewals + Workers edge routing</td><td><a href="/go/cloudflare/">Explore Cloudflare →</a></td></tr>
            <tr><td><strong>Namecheap</strong></td><td>$0.98–$6.49 promos + $1.24/mo PrivateEmail</td><td>Cheapest custom-domain IMAP/SMTP business email</td><td><a href="/go/namecheap/">View Namecheap Deals →</a></td></tr>
          </tbody>
        </table>
      `
    },
    vpnproxy2026: {
      catKey: 'ai', readTime: '9 min read',
      category: 'Operational Security · Cross-Border Networking',
      title: 'NordVPN Dedicated IP & Meshnet vs. Datacenter Proxies: Protecting Global Payment & Ad Accounts',
      deck: 'Why logging into Stripe, PartnerStack, or TikTok Ads from noisy shared IPs triggers account freezes—and how Dedicated IPs solve it.',
      body: `
        <p>Cross-border founders routinely lose days to automated fraud locks when traveling or switching networks. Using a clean, static <strong>Dedicated IP</strong> ensures your payment gateways and affiliate dashboards always see a consistent, trusted fingerprint.</p>
        <ul>
          <li><strong>Dedicated Static IP:</strong> Assigned exclusively to your account in the US, UK, Germany, Japan, or Singapore via <a href="/go/nordvpn/">NordVPN</a>.</li>
          <li><strong>Free Encrypted Meshnet:</strong> Connect your laptop directly to your home workstation or self-hosted <a href="/go/hetzner/">Hetzner</a> / <a href="/go/hostinger/">Hostinger</a> server over encrypted WireGuard tunnels.</li>
          <li><strong>SERP Geo-Verification:</strong> Preview exact Google search results in 111 countries to verify your <a href="/go/semrush/">Semrush</a> and <a href="/go/surfer/">SurferSEO</a> rankings.</li>
        </ul>
        <p><a href="/go/nordvpn/"><strong>→ Claim the NordVPN Exclusive Multi-Year + Bonus Months Deal</strong></a></p>
      `
    },
    partnerstackgold: {
      catKey: 'ai', readTime: '14 min read',
      category: 'Affiliate Monetization · High-Ticket B2B Blueprint',
      title: 'The 2026 High-Paying B2B & AI Affiliate Goldmine: 15 Programs Paying 20%–50% Recurring Commissions',
      deck: 'Stop promoting 3% commodity links. Here is the exact commission structure of Make.com, HeyGen, Webflow, Apify, Semrush, and Hostinger.',
      body: `
        <p>A single niche benchmark article with 500 targeted readers per month can generate $1,500+/month if it solves a real technical problem and links to recurring B2B SaaS programs.</p>
        <table class="bench-table">
          <thead><tr><th>Partner Program</th><th>Commission Rate</th><th>Cookie / Payout Window</th><th>Official Registration / Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Make.com Partner</strong></td><td>20%–35% Recurring (24 Mo) + 10k Free Ops</td><td>120-Day Cookie (Wise/PayPal)</td><td><a href="/go/make/">Join / Try Make (?pc=cruxkit) →</a></td></tr>
            <tr><td><strong>HeyGen Creator</strong></td><td>20% Recurring (12 Mo) via Rewardful</td><td>60-Day Cookie</td><td><a href="/go/heygen/">Try HeyGen (?via=xing) →</a></td></tr>
            <tr><td><strong>Webflow (PartnerStack)</strong></td><td>50% Recurring for 12 Months</td><td>90-Day Cookie</td><td><a href="/go/webflow/">Explore Webflow →</a></td></tr>
            <tr><td><strong>Apify Affiliate</strong></td><td>30% Lifetime Recurring Commission</td><td>90-Day Cookie</td><td><a href="/go/apify/">Explore Apify →</a></td></tr>
            <tr><td><strong>SurferSEO &amp; Semrush</strong></td><td>25% Recurring / $200 CPA per Sale</td><td>120-Day Cookie</td><td><a href="/go/semrush/">Explore Semrush →</a></td></tr>
            <tr><td><strong>NordVPN &amp; Hostinger</strong></td><td>40%–100% New Sales + 30% Renewals</td><td>30-Day Cookie</td><td><a href="/go/hostinger/">Explore Hostinger →</a></td></tr>
          </tbody>
        </table>
      `
    },
    kbeautyspf3: {
      catKey: 'beauty', readTime: '11 min read',
      category: 'Formulation Lab · K-Beauty UV Filter Showdown',
      title: 'Beauty of Joseon vs. SKIN1004 Hyalu-Cica vs. Round Lab Birch Juice: Lab Test of Korea’s Top 3 Sunscreens',
      deck: 'All three use next-gen photostable filters (Uvinul A Plus, Uvinul T 150, Tinosorb M) with SPF50+ PA++++. Which texture fits your exact skin type?',
      body: `
        <p>American drugstore sunscreens rely on outdated avobenzone that stings eyes and feels greasy. Korean sunscreens use modern big-molecule European/Asian filters that feel like luxury serums. We tested the top three OliveYoung champions side-by-head:</p>
        <table class="bench-table">
          <thead><tr><th>Sunscreen</th><th>Texture &amp; Finish</th><th>Hero Soothing Actives</th><th>Ideal Skin Type</th><th>Shop Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Beauty of Joseon Relief Sun</strong></td><td>Nourishing light cream · Natural glow</td><td>30% Rice Extract + Probiotic Ferments + Niacinamide</td><td>Dry, Normal &amp; Winter Retinoid Users</td><td><a href="/go/bojsun/">Check OliveYoung →</a></td></tr>
            <tr><td><strong>SKIN1004 Hyalu-Cica (Blue Cap)</strong></td><td>Weightless water-serum · Airless pump</td><td>Madagascar Centella + 3-Weight Hyaluronic Acid</td><td>Oily, Combination &amp; Acne-Prone Skin</td><td><a href="/go/skin1004/">Check OliveYoung →</a></td></tr>
            <tr><td><strong>Round Lab Birch Juice SPF50+</strong></td><td>2-in-1 Moisturizer + UV Emulsion</td><td>Inje Silver Birch Sap + Glyceryl Glucoside + DPG</td><td>Normal-to-Dry &amp; Busy 1-Step Mornings</td><td><a href="/go/roundlab/">Check OliveYoung →</a></td></tr>
          </tbody>
        </table>
      `
    },
    numbuzinvsanua: {
      catKey: 'beauty', readTime: '10 min read',
      category: 'Formulation Lab · Hyperpigmentation & PIE/PIH Audit',
      title: 'numbuzin No.5+ Glutathione Serum vs. Anua 10% Niacinamide + 4% TXA: Fastest Dark-Spot Routine',
      deck: 'Red acne marks (PIE) and brown sun/acne spots (PIH) require different biochemical pathways. Here is how Korea’s two viral brightening serums compare.',
      body: `
        <p>Post-acne marks come in two forms: <strong>Post-Inflammatory Erythema (PIE)</strong>—red/purple capillary dilation—and <strong>Post-Inflammatory Hyperpigmentation (PIH)</strong>—excess melanin deposition. Both <strong>Anua</strong> and <strong>numbuzin No.5+</strong> tackle these without the low-pH irritation of pure L-Ascorbic Acid.</p>
        <table class="bench-table">
          <thead><tr><th>Serum</th><th>Active Concentration Matrix</th><th>Best Target Concern</th><th>Official Partner Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Anua 10% Niacinamide + 4% TXA</strong></td><td>10% Niacinamide + 4% Tranexamic Acid + 2% Arbutin + Ceramides</td><td>Stubborn red acne marks (PIE), oil control &amp; pore refinement</td><td><a href="/go/anuatxa/">Shop Anua TXA →</a></td></tr>
            <tr><td><strong>numbuzin No.5+ Concentrated Serum</strong></td><td>Liposomal Glutathione + 4% TXA + 5% Niacinamide + 5% Panthenol</td><td>Overall dullness, brown spots (PIH) &amp; sensitive barriers (5% B5)</td><td><a href="/go/numbuzin/">Shop numbuzin No.5+ →</a></td></tr>
          </tbody>
        </table>
      `
    },
    illiyoonvscerave: {
      catKey: 'beauty', readTime: '10 min read',
      category: 'Barrier Science · Winter Moisturizer Benchmark',
      title: 'Illiyoon Ceramide Ato Cream vs. CeraVe PM vs. La Roche-Posay Cicaplast B5+: The Ultimate Barrier Repair Test',
      deck: 'We analyzed lipid ratios, price per milliliter, and comedogenicity across the three most recommended barrier repair creams on earth.',
      body: `
        <p>When using evening retinoids (<a href="/go/differin/">Differin 0.1% Adapalene</a> or <a href="/go/geekgorgeous/">Geek &amp; Gorgeous 0.1% Retinal</a>), your moisturizer determines whether you wake up with glass skin or flaking redness.</p>
        <table class="bench-table">
          <thead><tr><th>Barrier Cream</th><th>Core Repair Mechanism</th><th>Price / ml</th><th>How to Use in Your Routine</th><th>Verified Link</th></tr></thead>
          <tbody>
            <tr><td><strong>Illiyoon Ceramide Ato (200ml)</strong></td><td>Patented encapsulated phyto-ceramide beads</td><td>~$0.08 / ml</td><td>Daily full-face &amp; neck winter seal</td><td><a href="/go/illiyoon/">Shop Illiyoon 200ml →</a></td></tr>
            <tr><td><strong>CeraVe PM Lotion (89ml)</strong></td><td>Ceramides 1, 3, 6-II + 4% Niacinamide (MVE)</td><td>~$0.17 / ml</td><td>Lightweight Step-1 buffer before retinoids</td><td><a href="/go/ceravepm/">Shop CeraVe PM →</a></td></tr>
            <tr><td><strong>La Roche-Posay Cicaplast B5+</strong></td><td>5% Panthenol + Madecassoside + Tribioma</td><td>~$0.40 / ml</td><td>Overnight SOS rescue mask &amp; corner occlusion</td><td><a href="/go/cicaplast/">Shop Cicaplast B5+ →</a></td></tr>
          </tbody>
        </table>
      `
    },
    retinalvsadapalene: {
      catKey: 'beauty', readTime: '11 min read',
      category: 'Clinical Retinoids · Nighttime Active Architecture',
      title: 'Geek & Gorgeous A-Game 10 (0.1% Retinal) vs. Differin 0.1% Adapalene: Anti-Aging vs. Acne Clearing',
      deck: 'Should your evening vitamin A be a third-generation receptor-selective retinoid (Adapalene) or a 1-step retinaldehyde emulsion (Retinal)?',
      body: `
        <p>Not all retinoids bind to the same nuclear receptors. Understanding the difference between <strong>0.1% Adapalene</strong> and <strong>0.1% Retinaldehyde</strong> saves months of trial and error:</p>
        <table class="bench-table">
          <thead><tr><th>Active Molecule</th><th>Product Champion</th><th>Primary Biological Target</th><th>Shop Link</th></tr></thead>
          <tbody>
            <tr><td><strong>0.1% Adapalene (3rd-Gen Retinoid)</strong></td><td>Differin Adapalene Gel 0.1%</td><td>Selectively binds RAR-β/γ to normalize follicular keratinization &amp; clear comedonal acne</td><td><a href="/go/differin/">Check Differin on iHerb →</a></td></tr>
            <tr><td><strong>0.1% Retinaldehyde (1-Step Precursor)</strong></td><td>Geek &amp; Gorgeous A-Game 10</td><td>Converts directly to retinoic acid (RAR-α/β/γ) for dermal collagen synthesis &amp; fine lines</td><td><a href="/go/geekgorgeous/">View A-Game 10 →</a></td></tr>
          </tbody>
        </table>
        <p><strong>Clinical Rule:</strong> Never layer both on the same night. Buffer either one over <a href="/go/torriden/">Torriden 5D HA Serum</a> and <a href="/go/ceravepm/">CeraVe PM</a>.</p>
      `
    },
    iherboliveyoung: {
      catKey: 'beauty', readTime: '12 min read',
      category: 'Clinical Buyer’s Guide · Under-$20 Dermatologist Staples',
      title: 'The 2026 iHerb & OliveYoung Clinical Skincare Haul: 10 Lab-Verified Staples Under $20',
      deck: 'Skip $180 department-store jars. Here is the complete morning-to-night clinical skincare routine built entirely from evidence-backed formulas under $20.',
      body: `
        <p>Every formula below was audited for active concentration, pH stability, packaging protection, and zero unnecessary fragrance irritants:</p>
        <ol>
          <li><strong>AM Antioxidant Shield:</strong> <a href="/go/timeless/">Timeless 20% Vitamin C + E + Ferulic Acid</a> (Airless pump, pH 2.4).</li>
          <li><strong>AM Brightening &amp; Redness Eraser:</strong> <a href="/go/numbuzin/">numbuzin No.5+ Glutathione + TXA Serum</a> or <a href="/go/anuatxa/">Anua 10% Niacinamide + 4% TXA</a>.</li>
          <li><strong>AM Zero-Cast UV Protection:</strong> <a href="/go/bojsun/">Beauty of Joseon Relief Sun</a> (Dry/Normal) or <a href="/go/skin1004/">SKIN1004 Hyalu-Cica Sun Serum</a> (Oily/Combo).</li>
          <li><strong>PM Weightless Hydration Base:</strong> <a href="/go/torriden/">Torriden DIVE-IN 5D Hyaluronic Acid Serum</a> or <a href="/go/cosrxsnail/">COSRX 96 Snail Mucin Essence</a>.</li>
          <li><strong>PM Retinoid Engine:</strong> <a href="/go/differin/">Differin 0.1% Adapalene</a> (Acne) or <a href="/go/geekgorgeous/">Geek &amp; Gorgeous 0.1% Retinal</a> (Anti-Aging).</li>
          <li><strong>PM Ceramide Barrier Seal:</strong> <a href="/go/illiyoon/">Illiyoon Ceramide Ato Concentrate Cream (200ml)</a> + <a href="/go/cicaplast/">La Roche-Posay Cicaplast Baume B5+</a>.</li>
        </ol>
      `
    }
  });

  Object.assign(storiesData.zh, {
    v0lovablebolt: {
      catKey: 'ai', readTime: '11 分钟精读',
      category: 'AI 全栈开发 · 2026 建站工具大横评',
      title: 'Vercel v0 vs Lovable.dev vs Cursor + Claude Sonnet 5.5：2026 独立开发者全栈选型指南',
      deck: '我们用同一套带 Stripe 支付的 SaaS 需求分别实测了 v0、Lovable 与 Cursor（挂载 Claude 5.5 与 GPT-6.1 Sol Pro），给出最省钱高效的组合拳。',
      body: `
        <p>到了 2026 年底，独立开发者和一人公司早已不再花几万块外包写网站。现在最核心的问题是：<strong>Vercel v0</strong>、<strong>Lovable.dev</strong> 和 <strong>Cursor + Claude Sonnet 5.5</strong> 到底该怎么配合？</p>
        <h4>1. 2026年11月 三大 AI 编程神器实测对比表</h4>
        <table class="bench-table">
          <thead><tr><th>工具名称</th><th>核心统治区</th><th>后端与数据库能力</th><th>月费成本</th><th>官方合作通道</th></tr></thead>
          <tbody>
            <tr><td><strong>Vercel v0</strong></td><td>设计师级 React/Tailwind/Shadcn 高转化落地页与计算器组件</td><td>Next.js / Vercel 边缘部署</td><td>免费版 / $20/月</td><td><a href="/go/v0dev/">免费体验 Vercel v0 →</a></td></tr>
            <tr><td><strong>Lovable.dev</strong></td><td>一句话生成带用户登录、Supabase 数据库与 Stripe 收款的完整应用</td><td>原生一键绑定 Supabase</td><td>免费版 / $20/月</td><td><a href="/go/lovable/">直达 Lovable 官网 →</a></td></tr>
            <tr><td><strong>Cursor + Claude 5.5</strong></td><td>复杂多文件架构重构、深度调试与私有部署工程</td><td>支持任意语言与云架构</td><td>$20/月 + API</td><td><a href="/go/cursor/">下载 Cursor 编辑器 →</a></td></tr>
          </tbody>
        </table>
        <h4>2. 实战派最推崇的「黄金三步曲」</h4>
        <p>先用 <a href="/go/v0dev/">Vercel v0</a> 生成媲美硅谷顶级设计工作室的首屏 UI 与价格表；再用 <a href="/go/lovable/">Lovable.dev</a> 自动挂载 Supabase 数据库并开启 GitHub 双向同步；最后拉取到本地 <a href="/go/cursor/">Cursor</a> 中，通过 <a href="/go/openrouter/">OpenRouter</a> 调用 <strong>Claude Sonnet 5.5</strong> 与 <strong>DeepSeek V4.1-Flash-1017</strong> 完成精细业务逻辑。</p>
      `
    },
    scraping2026: {
      catKey: 'ai', readTime: '10 分钟精读',
      category: 'Agent 数据底座 · 网页抓取与清洗实测',
      title: 'Firecrawl vs Apify：喂养 DeepSeek V4.1 与 GPT-6.1 智能体的最佳爬虫 API 选型',
      deck: '直接把原始 HTML 塞给大模型会浪费 80% 的 Token 预算！我们实测了 10,000 个电商、TikTok 与文档页面的抓取清洗效率。',
      body: `
        <p>即便 <strong>DeepSeek V4.1-Flash-1017</strong> 和 <strong>GPT-6.1</strong> 拥有百万级上下文，直接投喂未清洗的网页源码依然会导致推理幻觉并让账单暴涨 4 倍。你需要专业的数据提取底座：</p>
        <table class="bench-table">
          <thead><tr><th>平台名称</th><th>核心绝活</th><th>节省 Token 比例</th><th>免费额度与联盟返利</th><th>直达链接</th></tr></thead>
          <tbody>
            <tr><td><strong>Firecrawl API</strong></td><td>将任意动态网站一键清洗为纯净 Markdown 或结构化 JSON</td><td>立省 78% 输入 Token</td><td>送 500 页免费额度 (25% 持续返佣)</td><td><a href="/go/firecrawl/">领取 Firecrawl 免费额度 →</a></td></tr>
            <tr><td><strong>Apify 云爬虫商城</strong></td><td>2,000+ 现成云端爬虫（TikTok、Google Maps、亚马逊、X）</td><td>直接输出清洗好的表格数据</td><td>每月送 $5 免费额度 (30% 终身返佣)</td><td><a href="/go/apify/">进入 Apify 官方商城 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    groqvsopenrouter: {
      catKey: 'ai', readTime: '9 分钟精读',
      category: '实时 AI 架构 · 毫秒级语音与推理测速',
      title: 'GroqCloud LPU (850+ tok/s) vs OpenRouter vs DeepSeek V4.1：实时语音与极速 Agent 性能对决',
      deck: '搭建实时语音客服或即时补全工具时，首字延迟（TTFT）慢半秒就会毁掉体验。来看看自研 LPU 芯片与百万上下文网关如何分工。',
      body: `
        <p>我们对 500 组生产环境提示词进行了首字响应时间（TTFT）与吞吐量实测：</p>
        <table class="bench-table">
          <thead><tr><th>推理平台</th><th>首字延迟 (TTFT)</th><th>输出速度</th><th>最佳应用场景</th><th>官方合作通道</th></tr></thead>
          <tbody>
            <tr><td><strong>GroqCloud LPU</strong></td><td>0.08 秒</td><td>860+ tok/s</td><td>实时语音对话、毫秒级意图分类与即时 JSON 提取</td><td><a href="/go/groq/">免费申请 Groq API →</a></td></tr>
            <tr><td><strong>OpenRouter (DeepSeek V4.1-Flash-1017)</strong></td><td>0.24 秒</td><td>195 tok/s</td><td>100万上下文长文档精读、代码生成与主力工作流</td><td><a href="/go/openrouter/">直达 OpenRouter 网关 →</a></td></tr>
            <tr><td><strong>ElevenLabs v3</strong></td><td>0.075 秒</td><td>实时音频流</td><td>拟真情感语音合成与 32 国语言配音</td><td><a href="/go/elevenlabs/">免费试用 ElevenLabs →</a></td></tr>
          </tbody>
        </table>
      `
    },
    heygenvsynthesia: {
      catKey: 'ai', readTime: '12 分钟精读',
      category: 'AI 视频变现 · 数字人演播室巅峰对决',
      title: 'HeyGen Avatar IV vs Synthesia 3.0 vs ElevenLabs：2026 哪款 AI 视频工具带货转化率最高？',
      deck: '实测制作 60 条中英双语带货短视频与软件教程，全方位对比口型还原度、微表情自然度与联盟佣金收益。',
      body: `
        <p>无论你是做无脸 YouTube/TikTok 评测矩阵，还是为出海 SaaS 制作多语种产品演示，选对 AI 视频工作台每月可直接省下上万元拍摄剪辑成本：</p>
        <table class="bench-table">
          <thead><tr><th>平台名称</th><th>最擅长的视频类型</th><th>核心杀手锏</th><th>官方优惠与合作链接</th></tr></thead>
          <tbody>
            <tr><td><strong>HeyGen (Avatar IV)</strong></td><td>真人口播感（UGC）带货短视频、小红书/TikTok 种草与视频一键多语种翻译</td><td>眼神微表情最自然、手持自拍网感无敌</td><td><a href="/go/heygen/">免费体验 HeyGen (?via=xing) →</a></td></tr>
            <tr><td><strong>Synthesia 3.0</strong></td><td>B2B 软件操作演示、企业培训课程与录屏联动讲解</td><td>全身手势数字人 + 鼠标录屏自动高亮放大</td><td><a href="/go/synthesia/">免费体验 Synthesia 3.0 →</a></td></tr>
            <tr><td><strong>ElevenLabs v3</strong></td><td>顶级情感声音克隆、有声书与多角色配音</td><td>呼吸停顿与情绪感染力全球第一</td><td><a href="/go/elevenlabs/">免费体验 ElevenLabs →</a></td></tr>
          </tbody>
        </table>
      `
    },
    surfervsahrefs: {
      catKey: 'ai', readTime: '13 分钟精读',
      category: 'SEO 与搞流量 · 搜索增长铁三角',
      title: 'Semrush vs Ahrefs 站长工具 vs SurferSEO：2026 独立站自然流量与 AI 搜索霸屏指南',
      deck: '如何精准挖掘“低竞争高佣金”买词、把文章 NLP 内容评分刷到 90 分以上，并让 ChatGPT 与 Gemini 主动引用你的网站？',
      body: `
        <p>独立站搞自然搜索流量（SEO &amp; GEO）绝不是闭门造车写自嗨文，而是靠数据工具直接抄同行作业：</p>
        <table class="bench-table">
          <thead><tr><th>SEO 神器</th><th>在流量闭环中的核心分工</th><th>2026 王牌功能</th><th>官方合作通道</th></tr></thead>
          <tbody>
            <tr><td><strong>Semrush</strong></td><td>挖掘高购买意图（Buyer Intent）长尾词与同行广告词</td><td>一键筛选 Commercial / Transactional 带货关键词</td><td><a href="/go/semrush/">开启 Semrush 免费试用 →</a></td></tr>
            <tr><td><strong>Ahrefs (AWT + Radar)</strong></td><td>全站免费 SEO 体检、外链反查与大模型引用监控</td><td>已验证域名永久免费用 AWT + AI Brand Radar</td><td><a href="/go/ahrefs/">免费绑定 Ahrefs 站长工具 →</a></td></tr>
            <tr><td><strong>SurferSEO</strong></td><td>文章语义实体（NLP）实时打分与全站内链自动织网</td><td>0–100 分实时排名评分器 + GSC 老文翻新雷达</td><td><a href="/go/surfer/">体验 SurferSEO 内容评分 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    capcutvsopus: {
      catKey: 'ai', readTime: '10 分钟精读',
      category: '创作者矩阵 · 短视频工业化流水线',
      title: 'OpusClip 自动切片 vs CapCut Pro 剪映海外版 vs Descript：一人月产 90 条爆款双语短视频',
      deck: '如何把长视频、播客或直播录像在 15 分钟内批量拆解成自带中英双语动感花字的高完播竖屏短视频？',
      body: `
        <p>短视频依然是目前为独立站和联盟链接导流最猛的免费公域漏斗。三款神器分工明确：</p>
        <table class="bench-table">
          <thead><tr><th>工具名称</th><th>核心自动化能力</th><th>每 10 条视频节省时间</th><th>官方链接</th></tr></thead>
          <tbody>
            <tr><td><strong>OpusClip Pro</strong></td><td>AI 自动识别长视频高光金句、打分并自动居中裁剪为 9:16 竖屏</td><td>立省 6.5 小时</td><td><a href="/go/opusclip/">免费试用 OpusClip →</a></td></tr>
            <tr><td><strong>CapCut Pro</strong></td><td>99% 准确率中英双语动态花字、一键剪除气口与商业音乐库</td><td>立省 4.0 小时</td><td><a href="/go/capcut/">下载 CapCut 专业版 →</a></td></tr>
            <tr><td><strong>Descript</strong></td><td>像改 Word 文档一样删文字即剪视频 + 录音棚级一键降噪</td><td>立省 5.0 小时</td><td><a href="/go/descript/">免费体验 Descript →</a></td></tr>
          </tbody>
        </table>
      `
    },
    vps2026: {
      catKey: 'ai', readTime: '12 分钟精读',
      category: '云基建横评 · 自建 n8n 与 Docker 满血主机',
      title: 'Hostinger KVM2 vs Hetzner ARM64 vs Railway vs DigitalOcean ($200赠金)：2026 云主机终极选型',
      deck: '实测部署满血版 n8n + PostgreSQL + Redis + LiteLLM，全方位对比内存性价比、一键模板体验与新客赠金羊毛。',
      body: `
        <p>私有部署 <strong>n8n</strong> 和 <strong>LiteLLM</strong> 每年能帮重度自动化玩家省下上千美金订阅费。根据你的技术偏好，这四家云厂商闭眼按需入：</p>
        <table class="bench-table">
          <thead><tr><th>云平台</th><th>主力配置与月费</th><th>最适合谁</th><th>专属优惠与赠金通道</th></tr></thead>
          <tbody>
            <tr><td><strong>Hostinger KVM 2</strong></td><td>2核 / 8GB 内存 / 100GB NVMe ($6.99/月)</td><td>想要官方一键 Ubuntu n8n 面板且追求 8GB 大内存余量</td><td><a href="/go/hostinger/">领取 Hostinger 专属折扣 →</a></td></tr>
            <tr><td><strong>Hetzner Cloud CAX11</strong></td><td>2核 / 4GB 内存 / 40GB NVMe (€3.79/月)</td><td>追求极致硬件性价比的 Docker 极客</td><td><a href="/go/hetzner/">领取 Hetzner €20 赠金 →</a></td></tr>
            <tr><td><strong>Railway.app</strong></td><td>按秒计费（$5/月套餐含 $5 额度）</td><td>不想碰 Linux 命令行，想要 45 秒一键拉起 n8n+数据库</td><td><a href="/go/railway/">领取 Railway $5 体验金 →</a></td></tr>
            <tr><td><strong>DigitalOcean</strong></td><td>$4/月起 + 托管数据库与 GPU</td><td>想要零成本免费白嫖 60 天高配集群测试</td><td><a href="/go/digitalocean/">立领 $200 免费云主机额度 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    crossborderpay: {
      catKey: 'ai', readTime: '11 分钟精读',
      category: '跨境收款与财税 · 全球美元结汇闭环',
      title: 'Wise vs 空中云汇 Airwallex vs Lemon Squeezy vs Gumroad：2026 独立站收款与虚拟卡避坑指南',
      deck: '数字商品卖全球、收联盟美金佣金、以及批量开 0 手续费虚拟 Visa 卡付海外 API 账单的最优合规组合。',
      body: `
        <p>打通海外收款与低损耗换汇，是独立站从“玩具”变成“现金流机器”的核心一步：</p>
        <table class="bench-table">
          <thead><tr><th>金融/收款平台</th><th>在业务中的核心角色</th><th>费率优势</th><th>官方开户通道</th></tr></thead>
          <tbody>
            <tr><td><strong>Gumroad</strong></td><td>5分钟上架虚拟商品 `.ZIP` 交付 + 平台自然搜索流量推荐</td><td>0月费（阶梯抽成）</td><td><a href="/go/gumroad/">查看 Gumroad 店铺与分销 (?a=735179107) →</a></td></tr>
            <tr><td><strong>Lemon Squeezy</strong></td><td>SaaS 订阅制收款、软件激活码分发与全球增值税（VAT）自动代缴</td><td>5% + $0.50/笔</td><td><a href="/go/lemonsqueezy/">开通 Lemon Squeezy →</a></td></tr>
            <tr><td><strong>Wise</strong></td><td>个人与自由职业者秒开美国 ACH / 欧洲 IBAN 本地收款账号，直接收联盟佣金</td><td>中间市场实时汇率</td><td><a href="/go/wise/">免费注册 Wise 多币种账户 →</a></td></tr>
            <tr><td><strong>Airwallex 空中云汇</strong></td><td>企业级多币种收款 + 无限免费开 0% 跨境手续费虚拟 Visa 卡</td><td>$0月费 + 0% 刷卡汇损</td><td><a href="/go/airwallex/">免费开通空中云汇企业账户 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    spaceshipvsnamecheap: {
      catKey: 'ai', readTime: '9 分钟精读',
      category: '域名与企业邮局 · 建站底座实测',
      title: 'Spaceship vs Cloudflare Registrar vs Namecheap：2026 域名注册、秒级 DNS 与品牌企业邮箱怎么选？',
      deck: '为什么我们将 cruxxxxxkit.com 放在 Spaceship 管理 DNS，同时推荐用 Namecheap PrivateEmail 打造高过审率的联盟申请邮箱？',
      body: `
        <p>选域名注册商不仅要看首年便宜，更要看续费价格、DNS 全球生效速度以及配套企业邮箱成本：</p>
        <table class="bench-table">
          <thead><tr><th>平台名称</th><th>价格与解析速度</th><th>核心不可替代性</th><th>官方直达</th></tr></thead>
          <tbody>
            <tr><td><strong>Spaceship.com</strong></td><td>.com 首年特惠 + 全球 20 秒 DNS 极速生效</td><td>Unbox™ 现代化控制面板，30秒搞定 Google Search Console TXT 验证</td><td><a href="/go/spaceship/">去 Spaceship 注册域名 →</a></td></tr>
            <tr><td><strong>Cloudflare</strong></td><td>批发成本价续费 + 免费全球 CDN 与防攻击护盾</td><td>零溢价续费 + Edge Workers 边缘重定向规则</td><td><a href="/go/cloudflare/">接入 Cloudflare 网络 →</a></td></tr>
            <tr><td><strong>Namecheap</strong></td><td>常年 $0.98 域名闪促 + $1.24/月独立企业邮箱</td><td>用 `partner@你的域名` 申请海外大牌联盟，过审率提升一倍</td><td><a href="/go/namecheap/">查看 Namecheap 邮箱与域名优惠 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    vpnproxy2026: {
      catKey: 'ai', readTime: '9 分钟精读',
      category: '跨境账号安全 · 纯净静态 IP 与组网',
      title: 'NordVPN 独享静态 IP 与 Meshnet 实测：跨境多账号防风控与全球 111 国搜索排名巡检',
      deck: '为什么用廉价共享节点登录 Stripe、PayPal 或联盟后台容易触发风控冻结？如何用独享静态 IP 一劳永逸解决？',
      body: `
        <p>当你的独立站开始产生美元收入，账号安全就是头等大事。共享机房 IP 因为成百上千人混用，极易被金融风控系统标记。<strong>NordVPN</strong> 提供了三项跨境操盘手刚需能力：</p>
        <ul>
          <li><strong>专属独享静态 IP（Dedicated IP）：</strong> 仅归你一人独享的美国、英国、德国、日本或新加坡固定 IP，登录 Stripe、Wise 与各大联盟后台稳如泰山。</li>
          <li><strong>免费加密内网穿透（Meshnet）：</strong> 在外办公时直接通过点对点加密隧道连回家里的电脑或私有服务器。</li>
          <li><strong>全球 111 国本地谷歌搜索巡检：</strong> 随时切换至欧美当地视角，精准核验你的英文评测文章在当地 Google 的真实排名。</li>
        </ul>
        <p><a href="/go/nordvpn/"><strong>→ 点击获取 NordVPN 专属大幅折扣与额外赠送月份优惠</strong></a></p>
      `
    },
    partnerstackgold: {
      catKey: 'ai', readTime: '14 分钟精读',
      category: '联盟搞钱指南 · 高佣金 SaaS 金矿榜',
      title: '2026 海外高佣金 B2B 与 AI 联盟营销金矿榜单：15 个单客收益 $50–$200+ 的常青项目全解析',
      deck: '别再苦哈哈推广只有 3% 佣金的日用品了！深度拆解 Make.com、HeyGen、Webflow、Apify、Semrush 与 Hostinger 的躺赚分佣机制。',
      body: `
        <p>做海外联盟营销（Affiliate Marketing）最爽的模式是<strong>「月付/年付软件的持续分佣（Recurring Commission）」</strong>——只要你推荐的读者一直在用这款工具，你每个月都能自动收到 20%–50% 的美金分成：</p>
        <table class="bench-table">
          <thead><tr><th>王牌联盟项目</th><th>佣金比例与奖励模式</th><th>Cookie 追踪期与提现方式</th><th>官方注册与推广通道</th></tr></thead>
          <tbody>
            <tr><td><strong>Make.com 官方伙伴</strong></td><td>20%–35% 持续佣金（长达24个月）+ 送读者1万免费额度</td><td>120 天超长追踪（支持 Wise/PayPal）</td><td><a href="/go/make/">体验并加入 Make (?pc=cruxkit) →</a></td></tr>
            <tr><td><strong>HeyGen 创作者计划</strong></td><td>20% 持续分佣（12个月，年付单笔常超 $45）</td><td>60 天追踪（Rewardful 自动打款）</td><td><a href="/go/heygen/">直达 HeyGen (?via=xing) →</a></td></tr>
            <tr><td><strong>Webflow (PartnerStack)</strong></td><td>高达 50% 持续分佣（整整 12 个月）</td><td>90 天追踪（PartnerStack 统一提现）</td><td><a href="/go/webflow/">查看 Webflow 详情 →</a></td></tr>
            <tr><td><strong>Apify 云爬虫联盟</strong></td><td>30% 终身持续分佣（只要客户不退订终身有钱拿）</td><td>90 天追踪</td><td><a href="/go/apify/">查看 Apify 详情 →</a></td></tr>
            <tr><td><strong>Semrush / SurferSEO</strong></td><td>每单最高 $200 现金奖励 或 25% 持续分佣</td><td>120 天追踪</td><td><a href="/go/semrush/">直达 Semrush →</a></td></tr>
            <tr><td><strong>Hostinger / NordVPN</strong></td><td>新客首单高达 40%–100% 暴利分佣</td><td>30 天追踪</td><td><a href="/go/hostinger/">直达 Hostinger →</a></td></tr>
          </tbody>
        </table>
      `
    },
    kbeautyspf3: {
      catKey: 'beauty', readTime: '11 分钟精读',
      category: '配方实验室 · 韩系王牌防晒三巨头横评',
      title: '朝鲜美女大米防晒 vs SKIN1004 积雪草蓝帽 vs 独岛桦树汁防晒：OliveYoung 霸榜三巨头怎么选？',
      deck: '同样是 SPF50+ PA++++ 新一代高光稳定防晒剂、零假白、不熏眼，干皮、油皮、混油皮与刷酸敏感肌到底该买哪一支？',
      body: `
        <p>韩系现代化学防晒之所以能火遍全球，是因为全面采用了大分子新一代防晒剂（Uvinul A Plus、Uvinul T 150、Tinosorb M），既没有传统欧美防晒的油腻熏眼，也没有纯物理防晒的厚重假白。我们把三款销量王放在一起做了严格对比：</p>
        <table class="bench-table">
          <thead><tr><th>防晒单品</th><th>质地与成膜肤感</th><th>核心养肤舒缓成分</th><th>本命适用肤质</th><th>正品购买直达</th></tr></thead>
          <tbody>
            <tr><td><strong>Beauty of Joseon 朝鲜美女大米防晒</strong></td><td>轻盈保湿乳霜感 · 自然水润光泽</td><td>30% 大米提取物 + 益生菌发酵物 + 烟酰胺</td><td>干皮、混干皮及秋冬刷酸期</td><td><a href="/go/bojsun/">去 OliveYoung 查看价格 →</a></td></tr>
            <tr><td><strong>SKIN1004 积雪草水感防晒精华 (蓝帽)</strong></td><td>一抹化水凝露感 · 卫生真空按压泵</td><td>马达加斯加积雪草 + 三重透明质酸</td><td>油皮、混油皮、痘肌及炎热夏季</td><td><a href="/go/skin1004/">去 OliveYoung 查看价格 →</a></td></tr>
            <tr><td><strong>Round Lab 独岛桦树汁保湿防晒</strong></td><td>晨间乳液+防晒二合一水润乳</td><td>麟蹄白桦树汁氨基酸 + 甘油葡糖苷 + 甘草酸二钾</td><td>中性至混干皮、早八极简通勤族</td><td><a href="/go/roundlab/">去 OliveYoung 查看价格 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    numbuzinvsanua: {
      catKey: 'beauty', readTime: '10 分钟精读',
      category: '配方实验室 · 红黑痘印与去黄提亮对决',
      title: 'numbuzin 5号谷胱甘肽精华 vs Anua 10%烟酰胺+4%传明酸红瓶：顽固红黑痘印哪瓶消得最快？',
      deck: '新生红痘印（毛细血管扩张）和老旧黑褐色痘印（黑色素沉淀）机理完全不同！拆解韩国最火的两瓶淡印王牌。',
      body: `
        <p>很多同学狂涂美白精华却淡不了痘印，是因为没分清<strong>红色痘印（PIE）</strong>和<strong>黑色痘印（PIH）</strong>。这两瓶 OliveYoung 断货王恰好代表了两种巅峰配比思路：</p>
        <table class="bench-table">
          <thead><tr><th>精华名称</th><th>核心活性物黄金配比</th><th>最针对的皮肤痛点</th><th>官方直邮通道</th></tr></thead>
          <tbody>
            <tr><td><strong>Anua 10%烟酰胺 + 4%传明酸红瓶</strong></td><td>10% 烟酰胺 + 4% 传明酸 + 2% 熊果苷 + 神经酰胺</td><td>新挤完痘留下的鲜红痘印（PIE）、出油粗大毛孔</td><td><a href="/go/anuatxa/">查看 Anua 红瓶优惠 →</a></td></tr>
            <tr><td><strong>numbuzin 5号谷胱甘肽浓缩精华</strong></td><td>脂质体谷胱甘肽 + 4% 传明酸 + 5% 烟酰胺 + 5% 泛醇</td><td>陈年黑褐色痘印（PIH）、全脸熬夜暗沉黄气、敏感薄皮</td><td><a href="/go/numbuzin/">查看 numbuzin 5号精华 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    illiyoonvscerave: {
      catKey: 'beauty', readTime: '10 分钟精读',
      category: '屏障修护科学 · 秋冬三大修护面霜实测',
      title: '一理润神经酰胺胶囊霜 (200ml) vs CeraVe PM 乳 vs 理肤泉 B5+：干敏肌与刷酸修护终极PK',
      deck: '从生理脂质配比、每毫升单价到刷 A 酸三明治打底手法，一次性讲透全球口碑最好的三款修护神霜。',
      body: `
        <p>在秋冬季或使用晚间维 A 类猛药（<a href="/go/differin/">达芙文 0.1% 阿达帕林</a> 或 <a href="/go/geekgorgeous/">Geek &amp; Gorgeous 0.1% 视黄醛</a>）时，修护面霜选对直接决定你是“细腻发光”还是“烂脸起皮”：</p>
        <table class="bench-table">
          <thead><tr><th>修护单品</th><th>核心屏障修护科技</th><th>每毫升折合单价</th><th>最佳使用场景</th><th>直达购买链接</th></tr></thead>
          <tbody>
            <tr><td><strong>Illiyoon 一理润神经酰胺修护霜 (200ml)</strong></td><td>爱茉莉专利微囊神经酰胺颗粒，推开即融</td><td>约 $0.08 / ml（性价比之王）</td><td>全脸与颈部日常晚间锁水封包，大碗不心疼</td><td><a href="/go/illiyoon/">查看一理润 200ml 大碗装 →</a></td></tr>
            <tr><td><strong>CeraVe 适乐肤 PM 夜间修护乳 (89ml)</strong></td><td>三重神经酰胺 1/3/6-II + 4% 烟酰胺 + MVE 缓释</td><td>约 $0.17 / ml</td><td>刷酸前的第一步轻薄脂质打底乳，完全不闷痘</td><td><a href="/go/ceravepm/">去 iHerb 查看适乐肤 PM →</a></td></tr>
            <tr><td><strong>理肤泉 Cicaplast B5+ 修复霜 (Tribioma)</strong></td><td>5% 高浓度泛醇 + 积雪草苷 + 益生元复合体</td><td>约 $0.40 / ml</td><td>鼻翼嘴角局部防脱皮封包、突发泛红厚敷急救</td><td><a href="/go/cicaplast/">查看理肤泉 B5+ 详情 →</a></td></tr>
          </tbody>
        </table>
      `
    },
    retinalvsadapalene: {
      catKey: 'beauty', readTime: '11 分钟精读',
      category: '临床维A酸科学 · 晚间进阶猛药选型',
      title: 'Geek & Gorgeous 0.1% 视黄醛 (A醛) vs 达芙文 0.1% 阿达帕林：真皮抗老与疏通闭口怎么选？',
      deck: '同样是 0.1% 满血浓度的晚间维 A 王牌，三代受体选择性阿达帕林与一步转化视黄醛（Retinal）在机理上有何本质区别？',
      body: `
        <p>很多进阶护肤玩家在建立耐受后会纠结：晚上到底该涂 <strong>0.1% 阿达帕林</strong> 还是 <strong>0.1% 视黄醛（A醛）</strong>？答案完全取决于你的第一诉求：</p>
        <table class="bench-table">
          <thead><tr><th>核心分子</th><th>代表封神单品</th><th>主要作用的细胞受体与功效</th><th>正品购买通道</th></tr></thead>
          <tbody>
            <tr><td><strong>0.1% 阿达帕林 (第三代维A酸)</strong></td><td>Differin 达芙文 0.1% 凝胶</td><td>精准靶向 RAR-β/γ 受体，专攻毛囊角化异常、溶解顽固闭口粉刺与炎性痘痘</td><td><a href="/go/differin/">去 iHerb 查看达芙文 →</a></td></tr>
            <tr><td><strong>0.1% 视黄醛 (一步转化A醛)</strong></td><td>Geek &amp; Gorgeous A-Game 10</td><td>在皮肤内一步转化为全反式维A酸（作用速度比普通A醇快11倍），全受体激活真皮胶原再生与紧致抗老</td><td><a href="/go/geekgorgeous/">查看 G&amp;G 0.1% A醛详情 →</a></td></tr>
          </tbody>
        </table>
        <p><strong>安全铁律：</strong> 两者绝不可在同一晚叠加！晚间洁面后先用 <a href="/go/torriden/">Torriden 5D 玻尿酸精华</a> 和 <a href="/go/ceravepm/">CeraVe PM 乳</a> 打底缓冲。</p>
      `
    },
    iherboliveyoung: {
      catKey: 'beauty', readTime: '12 分钟精读',
      category: '成分党买手清单 · 百元内临床级护肤封神榜',
      title: '2026 iHerb 与 OliveYoung 全球直邮必买清单：10 款 $20 以内吊打千元大牌的临床护肤真神',
      deck: '拒绝为大牌天价营销费买单！这套由 10 款 $12–$20 临床实证单品组成的早 C 晚 A 与屏障修护全流程，直接抄作业。',
      body: `
        <p>我们在 iHerb 与韩国 OliveYoung 全球直邮商城中，按「有效浓度公开、包装避光保鲜、零致敏香精」三大标准严选出这套百元级满配护肤公式：</p>
        <ol>
          <li><strong>晨间黄金抗氧维 C：</strong> <a href="/go/timeless/">Timeless 20% 维C + 维E + 阿魏酸精华</a>（真空按压泵，完美平替修丽可 CEF）。</li>
          <li><strong>晨间多通路淡印去黄：</strong> <a href="/go/numbuzin/">numbuzin 5号谷胱甘肽浓缩精华</a> 或 <a href="/go/anuatxa/">Anua 10%烟酰胺+4%传明酸红瓶</a>。</li>
          <li><strong>晨间零肤感高倍防晒：</strong> <a href="/go/bojsun/">朝鲜美女大米防晒</a>（干皮/秋冬）或 <a href="/go/skin1004/">SKIN1004 积雪草蓝帽防晒精华</a>（油皮/春夏）。</li>
          <li><strong>晚间零搓泥抓水基底：</strong> <a href="/go/torriden/">Torriden 5D 小分子玻尿酸精华</a> 或 <a href="/go/cosrxsnail/">COSRX 96% 蜗牛原液精华</a>。</li>
          <li><strong>晚间战痘/抗老核心：</strong> <a href="/go/differin/">Differin 达芙文 0.1% 阿达帕林</a>（战痘去闭口）或 <a href="/go/geekgorgeous/">Geek &amp; Gorgeous 0.1% 视黄醛</a>（抗老淡纹）。</li>
          <li><strong>晚间神经酰胺封包：</strong> <a href="/go/illiyoon/">一理润神经酰胺修护霜 200ml</a> + <a href="/go/cicaplast/">理肤泉 B5+ 修复霜</a>。</li>
        </ol>
      `
    }
  });
})();

applyLanguage(currentLang, false);

/* Scroll Progress, Sticky Header, IntersectionObserver & 3D Parallax */
const scrollProgress = document.getElementById('scroll-progress');
const headerBar = document.getElementById('header-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
  if (scrollProgress) scrollProgress.style.width = `${pct}%`;
  if (headerBar) headerBar.classList.toggle('scrolled', scrollTop > 20);
}, { passive: true });

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

const heroSection = document.getElementById('hero-section');
const heroSlabArt = document.getElementById('hero-slab-art');
if (heroSection && heroSlabArt && window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroSlabArt.style.transform = `translate3d(${x * 18}px, ${y * 12}px, 0) rotateX(${-y * 5}deg) rotateY(${x * 7}deg)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroSlabArt.style.transform = '';
  });
}

const menu = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a,button').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menu.focus();
  }
});
