// POST JOURNAL
postJournal = async () => {
  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let entry = document.getElementById("entry").value;
  let newEntry = {
    journal: {
      title,
      date,
      entry,
    },
  };
  const accessToken = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/journal/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(newEntry),
    });
    const data = await res.json();

    console.log("postJournal function response: ", data);
    displayMine();
  } catch (err) {
    console.log(err);
  }
};

// UPDATE JOURNAL
editJournal = async (postId) => {
  const accessToken = localStorage.getItem("token");

  let card = document.getElementById(postId);
  let input = document.createElement("input");

  if (card.childNodes.length < 2) {
    card.appendChild(input);
    input.setAttribute("type", "text");
    input.setAttribute("id", "updatedEntry");
    input.setAttribute("placeholder", "Edit your journal entry");
  } else {
    let updated = document.getElementById("updatedEntry").value;
    let updatedEntry = {
      journal: {
        entry: updated,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:3000/journal/update/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify(updatedEntry),
        }
      );
      const data = await res.json();

      displayMine();
      console.log("editJournal function called!");
    } catch (err) {
      console.log(err);
    }
  }
};

// DELETE JOURNAL
deleteJournal = (postId) => {
  console.log("deleteJournal function called!");
};
