// DISPLAY BY USER
displayMine = async () => {
  const accessToken = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/journal/mine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    const data = await res.json();

    let display = document.getElementById("journals");

    for (let i = 0; (i = display.childNodes.length); i++) {
      display.removeChild(display.firstChild);
    }

    if (data.length === 0) {
      let display = document.getElementById("journals");
      let header = document.createElement("h5");

      display.appendChild(header);
      header.textContent = "You haven't made any posts yet!";
      header.setAttribute("class", "noPosts");
    } else {
      for (i = 0; i < data.length; i++) {
        let display = document.getElementById("journals");
        let card = document.createElement("div");
        let body = document.createElement("div");
        let header = document.createElement("h5");
        let subtitle = document.createElement("h6");
        let para = document.createElement("p");
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        let current = data[i];
        let title = current.title;
        let date = current.date;
        let entry = current.entry;

        display.appendChild(card);
        card.appendChild(body);
        body.appendChild(header);
        body.appendChild(subtitle);
        body.appendChild(para);
        body.appendChild(editBtn);
        body.appendChild(deleteBtn);

        card.setAttribute("id", current.id);
        card.setAttribute("class", "card");
        body.setAttribute("class", "card-body");
        header.setAttribute("class", "card-title");
        subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
        para.setAttribute("class", "card-text");

        editBtn.setAttribute("class", "btn btn-dark edit-Btn");
        editBtn.setAttribute("type", "button");
        editBtn.setAttribute("onclick", `editJournal(${current.id})`);

        deleteBtn.setAttribute("class", "btn btn-dark edit-Btn");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("onclick", `deleteJournal(${current.id})`);

        header.textContent = title;
        subtitle.textContent = date;
        para.textContent = entry;
        editBtn.textContent = "Edit";
        deleteBtn.textContent = "Delete";
      }
    }
    console.log("displayMine function called!");
  } catch (err) {
    console.log(err);
  }
};

// DISPLAY ALL
displayAll = async () => {
  try {
    const res = await fetch("http://localhost:3000/journal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    let display = document.getElementById("journals");

    for (let i = 0; (i = display.childNodes.length); i++) {
      display.removeChild(display.firstChild);
    }

    if (data.length === 0) {
      let display = document.getElementById("journals");
      let header = document.createElement("h5");

      display.appendChild(header);
      header.textContent = "There aren't any posts yet!";
      header.setAttribute("class", "noPosts");
    } else {
      for (i = 0; i < data.length; i++) {
        let display = document.getElementById("journals");
        let card = document.createElement("div");
        let body = document.createElement("div");
        let header = document.createElement("h5");
        let subtitle = document.createElement("h6");
        let para = document.createElement("p");

        let current = data[i];
        let title = current.title;
        let date = current.date;
        let entry = current.entry;

        display.appendChild(card);
        card.appendChild(body);
        body.appendChild(header);
        body.appendChild(subtitle);
        body.appendChild(para);

        card.setAttribute("id", current.id);
        card.setAttribute("class", "card");
        body.setAttribute("class", "card-body");
        header.setAttribute("class", "card-title");
        subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
        para.setAttribute("class", "card-text");

        header.textContent = title;
        subtitle.textContent = date;
        para.textContent = entry;
      }
    }
    console.log("displayAll function called!");
  } catch (err) {
    console.log(err);
  }
};

// DISPLAY BY TITLE
displayByTitle = async () => {
  const title = document.getElementById("searchBar").value;

  try {
    const res = await fetch(`http://localhost:3000/journal/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    let display = document.getElementById("journals");

    for (let i = 0; (i = display.childNodes.length); i++) {
      display.removeChild(display.firstChild);
    }

    if (data.length === 0) {
      let display = document.getElementById("journals");
      let header = document.createElement("h5");

      display.appendChild(header);
      header.textContent = "There aren't any posts on this topic.";
      header.setAttribute("class", "noPosts");
    } else {
      for (i = 0; i < data.length; i++) {
        let display = document.getElementById("journals");
        let card = document.createElement("div");
        let body = document.createElement("div");
        let header = document.createElement("h5");
        let subtitle = document.createElement("h6");
        let para = document.createElement("p");

        let current = data[i];
        let title = current.title;
        let date = current.date;
        let entry = current.entry;

        display.appendChild(card);
        card.appendChild(body);
        body.appendChild(header);
        body.appendChild(subtitle);
        body.appendChild(para);

        card.setAttribute("id", current.id);
        card.setAttribute("class", "card");
        body.setAttribute("class", "card-body");
        header.setAttribute("class", "card-title");
        subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
        para.setAttribute("class", "card-text");

        header.textContent = title;
        subtitle.textContent = date;
        para.textContent = entry;
      }
    }
    console.log("displayByTitle function called!");
  } catch (err) {
    console.log(err);
  }
};
