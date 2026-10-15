const btn = document.getElementById("btn");
const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear List";
clearBtn.style.display = "none";
const name = document.getElementById("name");
const price = document.getElementById("price");
const box = document.getElementById("items-box");
box.after(clearBtn);
let currentCard = null;

const total = document.createElement("h2");
let isEditing = false;
total.textContent = "Total Purchased: Ksh 0";
box.after(total);
let list = JSON.parse(localStorage.getItem("shoppingList")) || [];
clearBtn.classList.add("clear");

btn.addEventListener("click", (event) => {
  event.preventDefault();

  if (isEditing) {
    alert("Please save or cancel the current item first");
    return;
  }

  // Input validation
  if (!name.value.trim()) {
    name.classList.add("input-error");
  } else {
    name.classList.remove("input-error");
  }

  if (
    !price.value.trim() ||
    !Number.isFinite(Number(price.value)) ||
    Number(price.value) < 0
  ) {
    price.classList.add("input-error");
  } else {
    price.classList.remove("input-error");
  }

  if (!name.value.trim() || !price.value.trim()) {
    alert("fill out all fields first");
    return;
  }

  if (!Number.isFinite(Number(price.value)) || Number(price.value) < 0) {
    alert("Please enter a valid price");
    return;
  }

  const itemName = name.value.trim();
  const itemPrice = Number(price.value);

  // Check for duplicate items
  if (list.some((item) => item.name.toLowerCase() === itemName.toLowerCase())) {
    name.classList.add("input-error");
    alert("item already exists");
    return;
  } else {
    name.classList.remove("input-error");
  }

  // Card creation

  list.push({
    name: itemName,
    price: itemPrice,
    purchased: false,
  });

  localStorage.setItem("shoppingList", JSON.stringify(list));

  clearBtn.style.display = list.length > 0 ? "block" : "none";

  name.value = "";
  price.value = "";

  //save button event logic

  renderItem();
  updateTotal();
});

function renderItem() {
  box.innerHTML = "";

  list.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const editBtn = document.createElement("button");
    const saveBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    const buttonContainer = document.createElement("div");

    buttonContainer.classList.add("btnContainer");

    h1.textContent = item.name;
    h2.textContent = `Ksh: ${item.price}`;

    checkbox.type = "checkbox";
    label.textContent = "Mark Purchased";
    checkbox.checked = item.purchased || false;

    if (item.purchased) {
      h1.style.textDecoration = "line-through";
      h2.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", () => {
      item.purchased = checkbox.checked;

      const decoration = checkbox.checked ? "line-through" : "none";
      h1.style.textDecoration = decoration;
      h2.style.textDecoration = decoration;

      localStorage.setItem("shoppingList", JSON.stringify(list));

      updateTotal();
    });

    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    saveBtn.textContent = "Save";
    saveBtn.classList.add("saveBtn");
    saveBtn.style.display = "none";

    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancelBtn");
    cancelBtn.style.display = "none";

    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();

      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
      editBtn.style.display = "block";
      btn.style.display = "inline";

      name.value = "";
      price.value = "";

      name.classList.remove("input-error");
      price.classList.remove("input-error");

      isEditing = false;

      if (currentCard) {
        currentCard.classList.remove("error");
      }

      currentCard = null;

      document.querySelectorAll(".editBtn").forEach((button) => {
        button.disabled = false;
      });
    });

    //edit
    editBtn.addEventListener("click", (event) => {
      event.preventDefault();

      if (isEditing) {
        if (currentCard) {
          currentCard.classList.add("error");
        }

        alert("please save the current item first");
        return;
      }

      isEditing = true;
      currentCard = div;

      name.value = item.name;
      price.value = item.price;

      name.classList.remove("input-error");
      price.classList.remove("input-error");

      saveBtn.style.display = "inline-block";
      editBtn.style.display = "none";
      btn.style.display = "none";
      cancelBtn.style.display = "inline-block";

      //   document.querySelectorAll(".editBtn").forEach((button) => {
      //     button.disabled = true;
      //   });
    });

    //save
    saveBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const newName = name.value.trim();
      const newPrice = price.value.trim();
      const numericPrice = Number(newPrice);

      // Input validation
      if (!newName) {
        name.classList.add("input-error");
      } else {
        name.classList.remove("input-error");
      }

      if (!newPrice || !Number.isFinite(numericPrice) || numericPrice < 0) {
        price.classList.add("input-error");
      } else {
        price.classList.remove("input-error");
      }

      if (!newName || !newPrice) {
        alert("please fill all fields first");
        return;
      }

      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        alert("enter a valid price");
        return;
      }

      // Check for duplicate names when editing
      const duplicate = list.some(
        (existingItem, existingIndex) =>
          existingIndex !== index &&
          existingItem.name.toLowerCase() === newName.toLowerCase(),
      );

      if (duplicate) {
        name.classList.add("input-error");
        alert("item already exists");
        return;
      } else {
        name.classList.remove("input-error");
      }

      item.name = newName;
      item.price = numericPrice;

      localStorage.setItem("shoppingList", JSON.stringify(list));

      saveBtn.style.display = "none";
      editBtn.style.display = "block";
      btn.style.display = "inline";
      cancelBtn.style.display = "none";

      name.value = "";
      price.value = "";

      name.classList.remove("input-error");
      price.classList.remove("input-error");

      isEditing = false;

      if (currentCard) {
        currentCard.classList.remove("error");
      }

      currentCard = null;

      document.querySelectorAll(".editBtn").forEach((button) => {
        button.disabled = false;
      });

      renderItem();
      updateTotal();
    });

    buttonContainer.append(editBtn, saveBtn, cancelBtn);
    div.append(h1, h2, checkbox, label, buttonContainer);
    box.appendChild(div);
  });

  clearBtn.style.display = list.length > 0 ? "block" : "none";
}

renderItem();

clearBtn.addEventListener("click", () => {
  isEditing = false;
  list = [];

  localStorage.removeItem("shoppingList");

  box.innerHTML = "";
  clearBtn.style.display = "none";

  name.value = "";
  price.value = "";

  name.classList.remove("input-error");
  price.classList.remove("input-error");

  btn.style.display = "inline";

  if (currentCard) {
    currentCard.classList.remove("error");
  }

  currentCard = null;

  document.querySelectorAll(".editBtn").forEach((button) => {
    button.disabled = false;
  });

  updateTotal();
});

function updateTotal() {
  const totalCost = list.reduce((sum, item) => {
    return item.purchased ? sum + Number(item.price) : sum;
  }, 0);

  total.textContent = `Total Purchased: KSh ${totalCost.toFixed(2)}`;
}

updateTotal();
