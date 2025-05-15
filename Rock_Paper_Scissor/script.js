const gamecontainer = document.querySelector(".container");
const userresult = document.querySelector(".user_result img");
const botresult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionimages = document.querySelectorAll(".option_image");

const botImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
const outcomes = {
  RR: "Draw",
  RP: "BOT",
  RS: "YOU",
  PP: "Draw",
  PR: "YOU",
  PS: "BOT",
  SS: "Draw",
  SR: "BOT",
  SP: "YOU"
};

function handleoptionclicker(event) {
  const clickedimage = event.currentTarget;
  const clickedindex = Array.from(optionimages).indexOf(clickedimage);
  userresult.src = botresult.src = "images/rock.png";
  result.textContent = "Wait.....";

  optionimages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedindex);
  });

  gamecontainer.classList.add("start");

  setTimeout(() => {
    gamecontainer.classList.remove("start");

    const userimagesrc = clickedimage.querySelector("img").src;
    userresult.src = userimagesrc;

    const randomnumber = Math.floor(Math.random() * botImages.length);
    const botImagessrc = botImages[randomnumber];
    botresult.src = botImagessrc;

    const uservalue = ["R", "P", "S"][clickedindex];
    const botvalue = ["R", "P", "S"][randomnumber];
    const outcomekey = uservalue + botvalue;
    const outcome = outcomes[outcomekey] || "Unknown";

    result.textContent = outcome === "Draw" ? "Match Draw" : `${outcome} WON!!`;
  }, 2500);
}

optionimages.forEach(image => {
  image.addEventListener("click", handleoptionclicker);
});
