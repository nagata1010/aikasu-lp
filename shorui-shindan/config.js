/**
 * 書類診断LP 設定ファイル
 * CTAのリンク先・実績データなど、運用中に変更したい値はすべてここに集約しています。
 */
window.AIKASU_CONFIG = {
  // 無料診断の申込先URL。未設定(空文字)の場合、CTAは「利用の流れ」セクションへスクロールします。
  // 例: "https://forms.gle/xxxxxxxx" や LINE公式アカウントのURLなど
  ctaUrl: "",

  // プライバシーポリシーのURL。未設定の場合、フッターにリンクは表示されません。
  privacyPolicyUrl: "",

  // 「利用の流れ」セクションで表示する運用値。ここを変更するだけで本文に反映されます。
  operations: {
    submissionFormats: "PDF・写真・スクリーンショット",
    resultMethod: "オンライン(ビデオ通話)",
  },

  // 実績数値(利用者数・通過率など)。確定した値が出たら { label: "...", value: "..." } の形で追加してください。
  // 未確定の間は空配列のままにし、架空の数値は入れないでください。
  stats: [],

  // 利用者の声。確定したものが出たら { quote: "...", attribution: "..." } の形で追加してください。
  testimonials: [],
};

/**
 * 分析イベント送信。既存の分析基盤(GA4のgtag、GTMのdataLayer等)があればそれを利用し、
 * なければ何もしません。後から別の分析基盤に接続する場合はこの関数だけ差し替えてください。
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
  window.sendAnalyticsEvent("cta_click", { cta_location: location });
};
