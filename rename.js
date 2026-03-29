async function operator(proxies = [], targetPlatform, context) {
    const result = [];

    // 👉 读取 URL 参数
    const CUSTOM_PREFIX = context?.arguments?.chang_shu || 'ZZZ默认_';

    const now = new Date();
    const DATE_PREFIX = `${now.getMonth() + 1}.${now.getDate()}日_`;
    const FULL_PREFIX = CUSTOM_PREFIX + DATE_PREFIX;

    proxies.forEach(proxy => {
        if (proxy.name) {
            proxy.name = FULL_PREFIX + proxy.name;
        }
        result.push(proxy);
    });

    return result;
}
