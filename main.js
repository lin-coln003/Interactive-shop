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

  div.append(h1, h2, checkbox, label);
  list.push({
    name: name.value,
    price: price.value,
  });
  clearBtn.style.display = list.length > 0 ? "block" : "none";

  box.appendChild(div);
  name.value = "";
  price.value = " ";
});
clearBtn.addEventListener("click", () => {
  list.length = 0;
  box.innerHTML = "";
  clearBtn.style.display = "none";
});
