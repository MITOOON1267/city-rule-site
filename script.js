"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("ruleSearch");
  const ruleCards = Array.from(
    document.querySelectorAll(".rule-card")
  );
  const searchStatus = document.getElementById("searchStatus");
  const noResults = document.getElementById("noResults");

  if (!searchInput || !searchStatus || !noResults) {
    console.error("検索に必要なHTML要素が見つかりません。");
    return;
  }

  function filterRules() {
    const query = searchInput.value
      .trim()
      .toLocaleLowerCase("ja");

    let visibleCount = 0;

    ruleCards.forEach((card) => {
      const searchableText = (
        card.innerText + " " +
        (card.dataset.search || "")
      ).toLocaleLowerCase("ja");

      const matches = searchableText.includes(query);

      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    noResults.hidden = visibleCount !== 0;

    if (query === "") {
      searchStatus.textContent =
        "全 " + ruleCards.length + " カテゴリー";
    } else {
      searchStatus.textContent =
        visibleCount + " カテゴリーが見つかりました";
    }
  }

  searchInput.addEventListener("input", filterRules);

  filterRules();
  console.log("City Rules website loaded successfully.");
});