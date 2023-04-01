function fetchData() {
  fetch("http://localhost:3000/quotes")
    .then((response) => response.json())
    .then((quotes) => quotes.forEach((data) => showList(data)));
}

function showList(data) {
  let li = document.createElement("li");
  li.className = "quote-card";
  li.innerHTML = `   
    <blockquote class="blockquote">
      <p class="mb-0">${data.quote}</p>
      <footer class="blockquote-footer">${data.author}</footer>
      <br>
<form id ="myform">
<imput type='hidden' name='likes' id =likes>      
<button type='submit'  id='${data.id}'class='btn-success'>Likes: <span id ="span">0</span></button>
</form>      
      <button  class='btn-danger'>Delete</button>
    </blockquote>
  `;
  document.getElementById("myul").append(li);
  createLikes(data);
}

function createQuote() {
  document.getElementById("newquoteform").addEventListener("submit", () => {
    event.preventDefault();

    let quotee = event.target.quote.value;
    let authorr = event.target.author.value;

    // make a POST request to a server endpoint
    fetch(`http://localhost:3000/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quote: quotee, author: authorr }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.id);
      })
      .catch((error) => {
        console.error("There was a problem submitting the data:", error);
      });
  });
}
function createLikes(data) {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  document.getElementById(`${data.id}`).addEventListener("click", (e) => {
    e.preventDefault();
    let c = 1
    document.getElementById("span").textContent = c++;
  });
}

createQuote();
fetchData();
