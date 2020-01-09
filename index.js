const LOCAL_IMAGE_COUNT = 10; // hardcoded

function getLocalImage() {
  const imageIndex = getRandomInt(1, LOCAL_IMAGE_COUNT);
  return `local-images/image${imageIndex}.jpg`;
}

function getRemoteImage() {
  return "https://source.unsplash.com/random";
}

function insertRandomBackgroundImage() {
  const oddsOfLocalImage = 0.1;
  const imageUrl =
    Math.random() < oddsOfLocalImage ? getLocalImage() : getRemoteImage();

  $("html").css({
    background: `url(${imageUrl}) no-repeat center center fixed`,
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover",
    transition: "background-image 1s",
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertRandomExpression() {
  const randomLaParlurePage = getRandomInt(1, 26);
  $.get(`https://www.laparlure.com/p/${randomLaParlurePage}/`, function(data) {
    const expressionsElements = $(".entry__item", data);
    const expressionIndex = getRandomInt(0, expressionsElements.length - 1);
    const expressionElement = $(
      expressionsElements[expressionIndex],
    ).children();

    const expression = expressionElement[0].innerText.trim();
    const definition = $(".entry__definition__text", expressionElement)[0]
      .innerText;
    const example = $(".entry__example__text", expressionElement)[0].innerText;

    $("#expression-text")[0].innerText = expression;
    $("#definition-text")[0].innerText = definition;
    $("#example-text")[0].innerText = example;
  });
}

$(document).ready(function() {
  insertRandomBackgroundImage();
  insertRandomExpression();
});
