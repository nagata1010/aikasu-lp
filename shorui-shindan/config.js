/**
 * 書類診断LP 設定ファイル
 * CTAのリンク先・実績データなど、運用中に変更したい値はすべてここに集約しています。
 * 同じ値をHTMLやほかのJSファイルに重複して書かないでください。
 */
window.AIKASU_CONFIG = {
  // 無料診断の申込先URL。未設定(空文字)の場合、全CTAは#applicationセクションへスクロールし、
  // 「現在、申込先の設定準備中です」と表示します。架空のURL(LINE/フォーム等)を入れないでください。
  ctaUrl: "https://liff.line.me/2006838056-ZwaLw1eM/landing?follow=%40032mskjq&lp=6Dngh8&liff_id=2006838056-ZwaLw1eM",

  // プライバシーポリシーのURL。未設定の場合、リンクや「詳細はプライバシーポリシーをご確認ください」
  // という、存在しないリンクを前提にした表現は一切表示しません。
  privacyPolicyUrl: "https://aikasu.jp/privacypolicy",

  // 「利用の流れ」セクションで表示する運用値。ここを変更するだけで本文に反映されます。
  operations: {
    submissionFormats: "PDF・写真・スクリーンショット",
    resultMethod: "オンライン",
  },

  // 「支援イメージ」セクションの状態。
  // "illustrative": 実在の相談事例として確認が取れていない状態。「支援イメージ」と表示し、
  //                 入社・内定・年収アップなどの成果は一切表示しません。
  // "verified":     実在事例として確認が取れた場合のみ切り替えます。「個人が特定されないよう
  //                 一部編集しています」と表示します。未確認の年齢・職種・年収・企業名・応募数は
  //                 追加しないでください。
  // 現時点の確定状態は illustrative です。
  caseStudy: {
    status: "illustrative",
  },

  // 実在スタッフの写真・プロフィールを表示する場合にのみ設定します。
  // enabled が false の間は、氏名・役職・プロフィール文をページ上に一切表示しません。
  staffProfile: {
    enabled: false,
    image: "",
    name: "",
    role: "",
    description: "",
  },

  // 実績数値(利用者数・通過率など)。確定した値が出たら { label: "...", value: "..." } の形で
  // 追加してください。未確定の間は空配列のままにし、架空の数値は入れないでください。
  stats: [],

  // 利用者の声。確定したものが出たら { quote: "...", attribution: "..." } の形で追加してください。
  testimonials: [],
};

/**
 * 分析イベント送信。既存の分析基盤(GA4のgtag、GTMのdataLayer等)があればそれを利用し、
 * なければ何もしません。GA4/GTMのIDをこのファイルに書き込まないでください
 * (実際に接続されていない基盤のIDを捏造しないため)。
 */
window.sendAnalyticsEvent = function (eventName, params) {
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
  if (window.dataLayer) {
    window.dataLayer.push(Object.assign({ event: eventName }, params));
  }
};

window.trackCtaClick = function (location) {
  var ctaUrl = (window.AIKASU_CONFIG && window.AIKASU_CONFIG.ctaUrl) ? window.AIKASU_CONFIG.ctaUrl.trim() : "";
  window.sendAnalyticsEvent("cta_click", {
    cta_location: location,
    cta_destination_status: ctaUrl ? "configured" : "not_configured",
  });
};
