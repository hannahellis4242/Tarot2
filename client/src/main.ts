import axios from "axios";

const getDeck = async () => {
  const { data } = await axios("/deck");
  return data;
};
const start = (images: string[]) => {
  const table = document.getElementById("table");
  if (!table) {
    return;
  }
  table.replaceChildren();
  const cards = new Array(78).fill(0).map((_, i) => {
    const card = document.createElement("div");
    card.id = `card-${i}`;
    card.classList.add("card", "clickable");
    {
      const img = document.createElement("img") as HTMLImageElement;
      img.src = "img/back.jpg";

      card.onclick = () => {
        console.log("clicked");
        img.src = images[i];
        card.classList.remove("clickable");
        card.onclick = () => {};
      };

      card.appendChild(img);
    }
    return card;
  });
  table.replaceChildren(...cards);
  console.log("screen : ", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
  console.log(table.getBoundingClientRect());
};

const contoler = document.getElementById("control");
if (contoler) {
  const button = document.createElement("button") as HTMLButtonElement;
  button.innerText = "start";
  button.onclick = async () => {
    try {
      const { deck } = await getDeck();
      button.innerText = "refresh";
      start(
        deck
          .map((x: { num: number }) => x.num)
          .map((i: number) => `img/img_${i}.jpg`)
      );
    } catch (e: any) {
      const errorParagraph = document.createElement("p");
      errorParagraph.classList.add("error");
      errorParagraph.innerText = JSON.stringify(e);
      document.body.appendChild(errorParagraph);
    }
  };
  contoler.replaceChildren(button);
}
