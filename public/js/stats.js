const params = new URLSearchParams(location.search);
const code = params.get("code");

document.getElementById("code").innerText = code;

async function loadStats() {
  const res = await fetch(`/api/links/${code}`);
  const data = await res.json();

  document.getElementById("url").innerText = data.url;
  document.getElementById("clicks").innerText = data.clicks;
  document.getElementById("created").innerText = new Date(data.created_at).toLocaleString();
  document.getElementById("last").innerText = data.last_clicked 
    ? new Date(data.last_clicked).toLocaleString()
    : "Never";
}

loadStats();
