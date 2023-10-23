const addButton = document.getElementById("add-btn");

const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const createProduct = () => {
  const manufacturer = document.getElementById("manufacturer").value;
  const model = document.getElementById("model").value;
  const image = document.getElementById("image").value;
  const price = document.getElementById("price").value;
  const numberPlate = document.getElementById("number-plate").value;

  if (!manufacturer || !model || !image || !price || !numberPlate) {
    // throw new Error("Missing input.");
    alert("Missing input.");
    // console.log("missing input.")
  } else if (!urlPattern.test(image)) {
    alert("Invalid image URL.");
  } else if (price && !Number(price)) {
    alert("The price field must contain a number.");
  } else {
    const product = {
      manufacturer: manufacturer,
      model: model,
      image: image,
      price: price,
      numberPlate: numberPlate,
    };

    return product;
  }
};

const addProduct = async (product) => {
  try {
    const response = await fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    // console.log("data", data);
    // console.log("data.response:", data.response);

    return data;
  } catch (err) {
    return false;
  }
};

const giveStatus = (data) => {
  const messageWrapper = document.getElementById("message-wrapper");

  if (data.response === "Something went wrong.") {
    console.log("The car has not been added.");
  } else {
    messageWrapper.innerHTML = "The car has been added.";

    setTimeout(() => {
      window.location.replace("./index.html");
    }, 2000);
  }
};

addButton.addEventListener("click", async () => {
  const product = createProduct();
  const data = await addProduct(product);
  giveStatus(data);
});
