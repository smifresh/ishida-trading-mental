// 共通スクリプト
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const pagetop = document.querySelector(".pagetop");

  // ハンバーガーメニューの開閉
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("is-open");
      nav.classList.toggle("is-open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    // メニュー内リンクをクリックしたら閉じる
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        hamburger.classList.remove("is-open");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // スクロール時：ヘッダー背景・ページトップボタンの表示
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 60);
    if (pagetop) pagetop.classList.toggle("is-show", y > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // スクロールでふわっと表示
  const targets = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("is-visible"));
  }

  // キーワード円形図：周囲のキーワードを円状に配置
  document.querySelectorAll(".keyword-circle").forEach((circle) => {
    const items = circle.querySelectorAll(".keyword-circle__item");
    const radius = 40; // 中心からの距離（％）
    items.forEach((item, i) => {
      const angle = (360 / items.length) * i - 90;
      const rad = (angle * Math.PI) / 180;
      item.style.left = 50 + radius * Math.cos(rad) + "%";
      item.style.top = 50 + radius * Math.sin(rad) + "%";
    });
  });

  // FAQアコーディオン
  document.querySelectorAll(".faq__item").forEach((item) => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", isOpen);
      a.style.maxHeight = isOpen ? a.scrollHeight + "px" : 0;
    });
  });

  // お問い合わせフォーム（送信先未設定のため、表示のみ）
  // ※ Formspree等を使う場合は form の action に URL を設定し、この処理を削除してください
  const form = document.querySelector(".js-contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (form.getAttribute("action")) return; // 送信先が設定されていれば通常送信
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const msg = document.querySelector(".form__message");
      if (msg) msg.classList.add("is-show");
      form.reset();
    });
  }
});
