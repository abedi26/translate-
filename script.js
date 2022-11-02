const fromText = document.querySelector(".from-text"),
  exchangeIcon = document.querySelector(".exchange"),
  toText = document.querySelector(".from-to"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row i"),
  tranlateBtn = document.querySelector("button");
selectTag.forEach((tag, id) => {
  for (const countryCode in countries) {
    let selected;
    if (id === 0 && countryCode === "en-GB") {
      selected = "selected";
    } else if (id === 1 && countryCode === "hi-IN") {
      selected = "selected";
    }
    let option = `<option value="${countryCode}" ${selected}> ${countries[countryCode]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});
exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});
tranlateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "fromCopy") {
        navigator.clipboard.writeText(fromText.value);
      } else if (target.id == "toCopy") {
        navigator.clipboard.writeText(toText.value);
      }
    } else if (target.classList.contains("fa-volume-up")) {
      let utterernce;
      if (target.id == "fromVolume") {
        utterernce = new SpeechSynthesisUtterance(fromText.value);
        utterernce.lang = selectTag[0].value;
      } else {
        utterernce = new SpeechSynthesisUtterance(toText.value);
        utterernce.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterernce);
    }

  });
});
