async function loadLinks() {
  const res = await fetch("/api/links");
  const data = await res.json();

  const tbody = document.getElementById("links");
  tbody.innerHTML = "";

  data.forEach(link => {
    tbody.innerHTML += `
      <tr>
        <td class="border p-2 text-blue-600 underline">
          <a href="/${link.code}" target="_blank">${link.code}</a>
        </td>
        <td class="border p-2 max-w-[250px] truncate">${link.url}</td>
        <td class="border p-2 text-center">${link.clicks}</td>
        <td class="border p-2 text-center">
          <a href="/stats.html?code=${link.code}" class="text-blue-500 underline">View</a>
        </td>
        <td class="border p-2 text-center">
          <button onclick="removeLink('${link.code}')" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </td>
      </tr>
    `;
  });
}

document.getElementById("createForm").onsubmit = async (e) => {
  e.preventDefault();
  console.log("Creating link...");
  const body = {
    url: document.getElementById("url").value,
    code: document.getElementById("code").value || undefined,
  };

  const res = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.error || "Created!";
  loadLinks();
};

async function removeLink(code) {
  await fetch(`/api/links/${code}`, { method: "DELETE" });
  loadLinks();
}

loadLinks();
