// Official news feeds read by the automatic search. Only publishers already
// approved in the catalog are used, and every item link is checked again
// against the publisher policy before it becomes a source.
//
// Checked in November 2026: the STF feed lists only banners and institutional
// pages, and the Planalto feed lists agenda posts, so neither is used.

export type NewsFeed = {
  key: string;
  label: string;
  url: string;
  /** Approved publisher (Publisher.key) that owns the item links. */
  publisherKey: string;
  author: string;
  reuseCondition: string;
  /** Item paths accepted as news articles (audio, video and agenda pages are ignored). */
  articlePath: RegExp;
};

export const NEWS_FEEDS: NewsFeed[] = [
  {
    key: "agencia-senado",
    label: "Agência Senado",
    url: "https://www12.senado.leg.br/noticias/rss",
    publisherKey: "senado",
    author: "Agência Senado",
    reuseCondition: "Reprodução autorizada mediante citação da Agência Senado.",
    articlePath: /^\/noticias\/materias\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/?$/,
  },
  {
    key: "agencia-camara",
    label: "Agência Câmara de Notícias",
    url: "https://www.camara.leg.br/noticias/rss/ultimas-noticias",
    publisherKey: "camara",
    author: "Agência Câmara de Notícias",
    reuseCondition: "A Câmara autoriza a reprodução das notícias da Agência Câmara com a respectiva assinatura.",
    articlePath: /^\/noticias\/\d+-[^/]+\/?$/,
  },
];
