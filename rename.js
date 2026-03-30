async function operator(proxies = [], targetPlatform, context) {
    const result = [];

    // ===== 参数区 =====
    const args = context?.arguments || {};

    const PREFIX = args.prefix || '';
    const USE_DATE = args.date === 'true';
    const USE_FLAG = args.flag === 'true';
    const SORT = args.sort || ''; // delay / name
    const DEDUPE = args.dedupe === 'true';

    // ===== 日期 =====
    const now = new Date();
    const DATE_PREFIX = `${now.getMonth() + 1}.${now.getDate()}日_`;

    // ===== 国旗映射 =====
    const flagMap = {
        "香港": "🇭🇰", "HK": "🇭🇰",
        "日本": "🇯🇵", "JP": "🇯🇵",
        "美国": "🇺🇸", "US": "🇺🇸",
        "新加坡": "🇸🇬", "SG": "🇸🇬",
        "台湾": "🇹🇼", "TW": "🇹🇼",
        "韩国": "🇰🇷", "KR": "🇰🇷",
        "德国": "🇩🇪", "DE": "🇩🇪",
        "英国": "🇬🇧", "UK": "🇬🇧",
        "法国": "🇫🇷", "FR": "🇫🇷",
        "印度": "🇮🇳", "IN": "🇮🇳",
        "越南": "🇻🇳", "VN": "🇻🇳"
    };

    // ===== 去重 =====
    const seen = new Set();

    for (let proxy of proxies) {
        if (!proxy.name) continue;

        // 去重（按 server+port）
        if (DEDUPE) {
            const key = `${proxy.server}:${proxy.port}`;
            if (seen.has(key)) continue;
            seen.add(key);
        }

        let name = proxy.name;

        // ===== 加国旗 =====
        if (USE_FLAG) {
            for (let k in flagMap) {
                if (name.includes(k)) {
                    name = flagMap[k] + " " + name;
                    break;
                }
            }
        }

        // ===== 拼前缀 =====
        let finalPrefix = PREFIX;
        if (USE_DATE) finalPrefix += DATE_PREFIX;

        proxy.name = finalPrefix + name;

        result.push(proxy);
    }

    // ===== 排序 =====
    if (SORT === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (SORT === 'delay') {
        result.sort((a, b) => (a.delay || 9999) - (b.delay || 9999));
    }

    return result;
}
