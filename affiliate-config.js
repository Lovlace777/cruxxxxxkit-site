/**
 * ============================================================================
 * CRUXKIT STUDIO (cruxxxxxkit.com) — CENTRAL COMMERCIAL & AFFILIATE CONFIG
 * ============================================================================
 * 实战部署说明：
 * 1. 全站 24 款严选联盟单品 (AFFILIATE_LINKS) 与 12 款虚拟商品包 (CHECKOUT_LINKS) 均由此文件统一驱动。
 * 2. 当你注册好各平台联盟账号后，只需替换下方 `targetUrl` 即可一键生效全站带货链接！
 */

window.CRUXKIT_CONFIG = {
  brandDomain: 'cruxxxxxkit.com',

  // --------------------------------------------------------------------------
  // A. 24 款高通量联盟营销单品总控表 (24 AUDITED AFFILIATE PARTNER LINKS)
  // --------------------------------------------------------------------------
  AFFILIATE_LINKS: {
    make:      { name: 'Make.com', targetUrl: 'https://www.make.com/en/register?pc=cruxkit', goPath: './go/make/index.html', commission: '35% 12-Mo Recurring (Wise)' },
    n8n:       { name: 'n8n Cloud & Fair-Code', targetUrl: 'https://n8n.io/?ref=cruxkit', goPath: './go/n8n/index.html', commission: '30% 12-Mo Recurring (PartnerStack)' },
    openrouter:{ name: 'OpenRouter Unified API', targetUrl: 'https://openrouter.ai/?ref=cruxkit', goPath: './go/openrouter/index.html', commission: 'Official Multi-LLM API Router' },
    cursor:    { name: 'Cursor AI Code IDE', targetUrl: 'https://www.cursor.com/?ref=cruxkit', goPath: './go/cursor/index.html', commission: 'S-Tier AI Coding & Site Builder' },
    claude:    { name: 'Claude 3.7 / Anthropic', targetUrl: 'https://console.anthropic.com/?ref=cruxkit', goPath: './go/claude/index.html', commission: 'Best Writing & Reasoning LLM' },
    deepseek:  { name: 'DeepSeek / SiliconFlow API', targetUrl: 'https://cloud.siliconflow.cn/?ref=cruxkit', goPath: './go/deepseek/index.html', commission: 'Lowest-Cost Reasoning API' },
    reclaim:   { name: 'Reclaim.ai Smart Calendar', targetUrl: 'https://reclaim.ai/?via=cruxkit', goPath: './go/reclaim/index.html', commission: '40% Recurring (PartnerStack)' },
    appsumo:   { name: 'AppSumo Software LTDs', targetUrl: 'https://appsumo.com/?ref=cruxkit', goPath: './go/appsumo/index.html', commission: 'Up to 100% New Buyer Commission (Impact)' },
    notion:    { name: 'Notion + Notion AI', targetUrl: 'https://affiliate.notion.so/cruxkit', goPath: './go/notion/index.html', commission: 'Template Engine & Workspace Partner' },
    elevenlabs:{ name: 'ElevenLabs Studio v3', targetUrl: 'https://elevenlabs.io/?from=partnercruxkit', goPath: './go/elevenlabs/index.html', commission: '22% 12-Mo Recurring (PartnerStack)' },
    heygen:    { name: 'HeyGen AI Video Avatar', targetUrl: 'https://www.heygen.com/?sid=rewardful&via=cruxkit', goPath: './go/heygen/index.html', commission: '30% Recurring Commission' },
    semrush:   { name: 'Semrush SEO & GEO Suite', targetUrl: 'https://www.semrush.com/?ref=cruxkit', goPath: './go/semrush/index.html', commission: '$200 Bounty Per Sale (Impact)' },
    beehiiv:   { name: 'Beehiiv Newsletter OS', targetUrl: 'https://www.beehiiv.com/?via=cruxkit', goPath: './go/beehiiv/index.html', commission: '50% 12-Mo Recurring Commission' },
    framer:    { name: 'Framer Web Builder', targetUrl: 'https://www.framer.com/?via=cruxkit', goPath: './go/framer/index.html', commission: '50% 12-Mo Recurring Commission' },
    hostinger: { name: 'Hostinger Cloud & Docker VPS', targetUrl: 'https://www.hostinger.com/?REFERRALCODE=CRUXKIT', goPath: './go/hostinger/index.html', commission: '60% Commission ($4.99 n8n VPS)' },
    cloudflare:{ name: 'Cloudflare Pages & R2', targetUrl: 'https://pages.cloudflare.com/', goPath: './go/cloudflare/index.html', commission: '$0 Edge Hosting Infrastructure' },
    lemonsqueezy:{ name: 'Lemon Squeezy / Gumroad', targetUrl: 'https://www.lemonsqueezy.com/?ref=cruxkit', goPath: './go/lemonsqueezy/index.html', commission: 'Global MoR Digital Checkout' },
    wise:      { name: 'Wise Multi-Currency Account', targetUrl: 'https://wise.com/invite/u/cruxkit', goPath: './go/wise/index.html', commission: 'Global Affiliate Payout Account' },
    timeless:  { name: 'Timeless 20% Vitamin C + E Ferulic', targetUrl: 'https://www.iherb.com/search?kw=Timeless+Skin+Care+Vitamin+C&rcode=CRUXKIT', goPath: './go/timeless/index.html', commission: '5%-20% iHerb Rewards (Alipay Payout)' },
    cicaplast: { name: 'La Roche-Posay Cicaplast B5+', targetUrl: 'https://www.iherb.com/search?kw=La+Roche+Posay+Cicaplast+B5&rcode=CRUXKIT', goPath: './go/cicaplast/index.html', commission: '5%-20% iHerb / Dermstore Partner' },
    bojsun:    { name: 'Beauty of Joseon Relief Sun SPF50+', targetUrl: 'https://www.iherb.com/search?kw=Beauty+of+Joseon+Relief+Sun&rcode=CRUXKIT', goPath: './go/boj-sun/index.html', commission: '5%-20% iHerb / YesStyle Bestseller' },
    paulasbha: { name: 'Paula’s Choice 2% BHA Liquid', targetUrl: 'https://www.iherb.com/search?kw=Paulas+Choice+2%25+BHA&rcode=CRUXKIT', goPath: './go/paulas-bha/index.html', commission: '5%-20% iHerb Global Bestseller' },
    cosrxsnail:{ name: 'COSRX Snail 96 Mucin Essence', targetUrl: 'https://www.iherb.com/search?kw=COSRX+Advanced+Snail+96&rcode=CRUXKIT', goPath: './go/cosrx-snail/index.html', commission: '5%-20% iHerb / YesStyle Cult Classic' },
    differin:  { name: 'Differin Adapalene Gel 0.1%', targetUrl: 'https://www.iherb.com/search?kw=Differin+Adapalene+Gel&rcode=CRUXKIT', goPath: './go/differin/index.html', commission: '5%-20% iHerb OTC Retinoid Benchmark' }
  },

  // --------------------------------------------------------------------------
  // B. 12 款高利润虚拟商品自动发货总控表 (12 DIGITAL KITS CHECKOUT)
  // --------------------------------------------------------------------------
  CHECKOUT_LINKS: {
    automation:  { priceUSD: 24, priceCNY: 128, enUrl: 'https://cruxkit.gumroad.com/l/automation-kit', zhUrl: 'https://mbd.pub/o/cruxkit-automation', localSampleZip: './deliverables/01_CruxKit_Automation_Kit_v2026.zip' },
    workstation: { priceUSD: 19, priceCNY: 98,  enUrl: 'https://cruxkit.gumroad.com/l/ai-workstation', zhUrl: 'https://mbd.pub/o/cruxkit-workstation', localSampleZip: './deliverables/02_CruxKit_Private_AI_Workstation_Pack_v2026.zip' },
    mcppack:     { priceUSD: 29, priceCNY: 148, enUrl: 'https://cruxkit.gumroad.com/l/mcp-agent-pack', zhUrl: 'https://mbd.pub/o/cruxkit-mcp-pack', localSampleZip: './deliverables/03_CruxKit_MCP_Super_Agent_Pack_v2026.zip' },
    n8nvps:      { priceUSD: 18, priceCNY: 88,  enUrl: 'https://cruxkit.gumroad.com/l/n8n-vps-docker', zhUrl: 'https://mbd.pub/o/cruxkit-n8n-vps', localSampleZip: './deliverables/04_CruxKit_n8n_Docker_VPS_Boilerplate_v2026.zip' },
    solo:        { priceUSD: 19, priceCNY: 98,  enUrl: 'https://cruxkit.gumroad.com/l/solo-os', zhUrl: 'https://mbd.pub/o/cruxkit-solo-os', localSampleZip: './deliverables/05_CruxKit_Solo_OS_Notion_System_v2026.zip' },
    content:     { priceUSD: 15, priceCNY: 78,  enUrl: 'https://cruxkit.gumroad.com/l/content-kit', zhUrl: 'https://mbd.pub/o/cruxkit-content-kit', localSampleZip: './deliverables/06_CruxKit_Content_and_GEO_Prompts_v2026.zip' },
    videoengine: { priceUSD: 22, priceCNY: 118, enUrl: 'https://cruxkit.gumroad.com/l/faceless-video', zhUrl: 'https://mbd.pub/o/cruxkit-video-engine', localSampleZip: './deliverables/07_CruxKit_Faceless_Video_Engine_v2026.zip' },
    hooksvault:  { priceUSD: 16, priceCNY: 88,  enUrl: 'https://cruxkit.gumroad.com/l/100-hooks-vault', zhUrl: 'https://mbd.pub/o/cruxkit-100-hooks', localSampleZip: './deliverables/08_CruxKit_X_and_Xiaohongshu_100_Hooks_v2026.zip' },
    routine:     { priceUSD: 12, priceCNY: 58,  enUrl: 'https://cruxkit.gumroad.com/l/barrier-routine-kit', zhUrl: 'https://mbd.pub/o/cruxkit-barrier-kit', localSampleZip: './deliverables/09_CruxKit_Barrier_and_Skin_Cycling_Kit_v2026.zip' },
    incidecoder: { priceUSD: 14, priceCNY: 68,  enUrl: 'https://cruxkit.gumroad.com/l/inci-decoder-sheet', zhUrl: 'https://mbd.pub/o/cruxkit-inci-decoder', localSampleZip: './deliverables/10_CruxKit_Cosmetic_INCI_Decoder_Sheet_v2026.zip' },
    sunguide:    { priceUSD: 12, priceCNY: 58,  enUrl: 'https://cruxkit.gumroad.com/l/sunscreen-uv-guide', zhUrl: 'https://mbd.pub/o/cruxkit-sun-guide', localSampleZip: './deliverables/11_CruxKit_Sunscreen_UV_Filter_Guide_v2026.zip' },
    allbundle:   { priceUSD: 69, priceCNY: 368, enUrl: 'https://cruxkit.gumroad.com/l/all-access-bundle', zhUrl: 'https://mbd.pub/o/cruxkit-all-bundle', localSampleZip: './deliverables/12_CruxKit_All_Access_11_in_1_Master_Bundle_v2026.zip' }
  }
};

window.CruxKitAnalytics = {
  track(eventType, itemKey, destination) {
    try {
      const key = 'cruxkit-click-telemetry';
      const logs = JSON.parse(localStorage.getItem(key) || '[]');
      logs.push({ ts: new Date().toISOString(), lang: document.documentElement.lang || 'en', eventType, itemKey, destination });
      localStorage.setItem(key, JSON.stringify(logs.slice(-300)));
    } catch {}
  },
  getReport() {
    try {
      const logs = JSON.parse(localStorage.getItem('cruxkit-click-telemetry') || '[]');
      const summary = {};
      for (const item of logs) {
        const k = `${item.eventType}:${item.itemKey}`;
        summary[k] = (summary[k] || 0) + 1;
      }
      console.table(summary);
      return { totalClicks: logs.length, summary, recent: logs.slice(-10) };
    } catch {
      return { totalClicks: 0, summary: {}, recent: [] };
    }
  }
};
