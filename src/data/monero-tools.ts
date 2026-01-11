export interface Tool {
  title: string;
  subtitle: string;
  href: string;
  onionHref?: string;
}

export const blockExplorers: Tool[] = [
  {
    title: "xmrchain.net",
    subtitle: "Popular open-source Monero block explorer",
    href: "https://xmrchain.net",
  },
  {
    title: "Monero Watch",
    subtitle: "Alternative blockchain explorer",
    href: "https://monerowatch.com",
  },
  {
    title: "P2Pool Observer",
    subtitle: "Block explorer with miner proof verification",
    href: "https://blocks.p2pool.observer/",
  }
];

export const networkTools: Tool[] = [
  {
    title: "Monero.fail",
    subtitle: "Comprehensive node list and network map",
    href: "https://monero.fail",
  },
  {
    title: "monerohash.com",
    subtitle: "Interactive Monero node map",
    href: "https://monerohash.com/nodes-distribution.html",
  },
  {
    title: "TxStreet",
    subtitle: "Live transaction and block visualizer",
    href: "https://txstreet.com/v/xmr",
  },
  {
    title: "NOWNodes",
    subtitle: "Blockchain node APIs for developers",
    href: "https://nownodes.io",
  },
  {
    title: "GetBlock",
    subtitle: "Blockchain nodes provider",
    href: "https://getblock.io",
  },
];

export const utilities: Tool[] = [
  {
    title: "xmr.llcoins.net",
    subtitle: "Offline wallet and address generator",
    href: "https://xmr.llcoins.net",
  },
  {
    title: "monerotech.info",
    subtitle: "Paper wallet generator",
    href: "https://monerotech.info",
  },
  {
    title: "Cryptoradar",
    subtitle: "Compare Monero prices across exchanges",
    href: "https://cryptoradar.co/buy-monero",
  },
  {
    title: "Monero.how",
    subtitle: "Statistics and educational resources",
    href: "https://www.monero.how",
  },
  {
    title: "Monero Pro",
    subtitle: "Advanced charts and metrics dashboard",
    href: "https://moneropro.com",
  },
  {
    title: "MoneroLogs",
    subtitle: "Archive of Monero IRC channels",
    href: "https://monerologs.net",
  },
];

export const developerLibraries: Tool[] = [
  {
    title: "monero-ts",
    subtitle: "TypeScript/JavaScript library for Node.js and browsers",
    href: "https://github.com/monero-ecosystem/monero-ts",
  },
  {
    title: "monero-python",
    subtitle: "Python library with RPC and native bindings",
    href: "https://github.com/everoddandeven/monero-python",
  },
  {
    title: "monero-oxide",
    subtitle: "Rust implementation of the Monero blockchain protocol",
    href: "https://github.com/monero-oxide/monero-oxide",
  },
  {
    title: "monero-java",
    subtitle: "Java library for Monero wallet and daemon RPC",
    href: "https://github.com/monero-ecosystem/monero-java",
  },
  {
    title: "monero-cpp",
    subtitle: "C++ library for Monero wallet and daemon",
    href: "https://github.com/monero-ecosystem/monero-cpp",
  },
  {
    title: "monerophp",
    subtitle: "PHP library for Monero wallet RPC",
    href: "https://github.com/monero-integrations/monerophp",
  },
];

export const paymentGateways: Tool[] = [
  {
    title: "BTCPay Server",
    subtitle: "Self-hosted, open-source payment processor",
    href: "https://btcpayserver.org",
  },
  {
    title: "NOWPayments",
    subtitle: "Non-custodial crypto payment gateway",
    href: "https://nowpayments.io",
  },
  {
    title: "Bitcart",
    subtitle: "Open-source cryptocurrency payment platform",
    href: "https://bitcart.ai",
  },
  {
    title: "CoinPayments",
    subtitle: "Multi-cryptocurrency payment gateway",
    href: "https://www.coinpayments.net",
  },
  {
    title: "CDPay",
    subtitle: "Crypto payment gateway solution",
    href: "https://cdpay.eu",
  },
  {
    title: "CryptoWoo",
    subtitle: "WooCommerce Monero plugin",
    href: "https://www.cryptowoo.com",
  },
  {
    title: "Monero WooCommerce",
    subtitle: "PHP extension for WooCommerce stores",
    href: "https://github.com/monero-integrations/monerowp",
  },
];

export const exploreCount =
  blockExplorers.length + networkTools.length + utilities.length;
export const developCount = developerLibraries.length;
export const acceptCount = paymentGateways.length;
