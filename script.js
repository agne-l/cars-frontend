const carsURL = "http://localhost:3000/cars";

const cardsWrapper = document.getElementById("cards-wrapper");

const buildCard = (car) => {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const carModelAndPriceWrapper = document.createElement("div");
  carModelAndPriceWrapper.setAttribute("class", "car-model-and-price-wrapper");

  const model = document.createElement("h2");
  model.innerHTML = car.model;

  const price = document.createElement("h3");
  price.innerHTML = `$${car.price}`;

  const image = document.createElement("img");
  image.setAttribute("class", "car-img");
  image.src = car.image;

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-car-btn");
  deleteButton.innerHTML = "delete";

  carModelAndPriceWrapper.append(model, price);
  card.append(carModelAndPriceWrapper, image, deleteButton);

  deleteButton.addEventListener("click", async () => {
    try {
      const response = await fetch(carsURL + "/" + car.id, {
        method: "DELETE",
      });
      const data = await response.json();
      location.reload();

      return data;
    } catch (err) {
      return false;
    }
  });

  return card;
};

const getAllProducts = async () => {
  try {
    const response = await fetch(carsURL);
    const responseInJson = await response.json();
    const cars = responseInJson.cars;
    console.log(cars);

    if (!cars.length) {
      // alert("There are no cars to show.");
      const messageWrapper = document.getElementById("cards-wrapper");
      messageWrapper.innerHTML = "There are no cars to show.";
    } else {
      cars.forEach((car) => {
        const card = buildCard(car);
        cardsWrapper.appendChild(card);
      });
    }
  } catch (err) {
    return false;
  }
};

getAllProducts();
