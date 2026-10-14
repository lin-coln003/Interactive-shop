const btn = document.getElementById("btn");
const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear List";
clearBtn.style.display = "none";
const name = document.getElementById("name");
const price = document.getElementById("price");
const box = document.getElementById("items-box");

box.after(clearBtn);

const list = [];
clearBtn.classList.add("clear");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!name.value.trim() || !price.value.trim()) {
    alert("fill out all fields first");
    return;
  }
  if (isNaN(price.value) || price.value < 0) {
    alert("Please enter a valid price");
    return;
  }

  const div = document.createElement("div");
  div.classList.add("card");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editBtn = document.createElement("button");
  editBtn.style.textContent = "Edit";
  editBtn.style.display = "none";
  editBtn.textContent = "Edit";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.style.display = "none";
  saveBtn.type = "button";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.display = "none";
  cancelBtn.type = "button";

  
  const editName = document.createElement("input");
  editName.type = "text";
  editName.style.display = "none";

  const editPrice = document.createElement("input");
  editPrice.type = "number";
  editPrice.min = "0";
  editPrice.step = "any";
  editPrice.style.display = "none";

  label.textContent = "Mark Purchased";
  checkbox.type = "checkbox";
  h1.textContent = name.value;
  h2.textContent = `Ksh: ${price.value}`;

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      h1.style.textDecoration = "line-through";
      h2.style.textDecoration = "line-through";
    } else {
      h1.style.textDecoration = "none";
      h2.style.textDecoration = "none";
    }
  });

  
  editBtn.addEventListener("click", () => {
    editName.value = h1.textContent;
    editPrice.value = h2.textContent.replace("Ksh: ", "");

    h1.style.display = "none";
    h2.style.display = "none";
    editBtn.style.display = "none";

    editName.style.display = "block";
    editPrice.style.display = "block";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
  });

  
  saveBtn.addEventListener("click", () => {
    if (!editName.value.trim() || !editPrice.value.trim()) {
      alert("fill out all fields first");
      return;
    }

    if (
      isNaN(editPrice.value) ||
      Number(editPrice.value) < 0
    ) {
      alert("Please enter a valid price");
      return;
    }

    h1.textContent = editName.value.trim();
    h2.textContent = `Ksh: ${editPrice.value}`;

    
    const index = Array.from(box.children).indexOf(div);
    if (index !== -1) {
      list[index].name = editName.value.trim();
      list[index].price = editPrice.value;
    }

    h1.style.display = "block";
    h2.style.display = "block";
    editBtn.style.display = "block";

    editName.style.display = "none";
    editPrice.style.display = "none";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
  });

  
  cancelBtn.addEventListener("click", () => {
    h1.style.display = "block";
    h2.style.display = "block";
    editBtn.style.display = "block";

    editName.style.display = "none";
    editPrice.style.display = "none";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
  });

  div.append(
    h1,
    h2,
    editName,
    editPrice,
    checkbox,
    label,
    editBtn,
    saveBtn,
    cancelBtn
  );

  list.push({
    name: name.value,
    price: price.value,
  });

  clearBtn.style.display = list.length > 0 ? "block" : "none";
  editBtn.style.display = list.length > 0 ? "block" : "none";

  box.appendChild(div);
  name.value = "";
  price.value = " ";
});

clearBtn.addEventListener("click", () => {
  list.length = 0;
  box.innerHTML = "";
  clearBtn.style.display = "none";
});