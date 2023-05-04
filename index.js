function updateDownloadData() {
  const cachedResponse = localStorage.getItem("cache");
  if (cachedResponse) {
    const { data, expiration } = JSON.parse(cachedResponse);

    if (expiration > Date.now()) {
      updateButton(data);
      return;
    }
  }

  // Make a request to the update URL
  fetch("https://hazel-nzhul.vercel.app/update/win32/0.0.0")
    .then((response) => response.json())
    .then((data) => {
      updateButton(data);

      // Cache the response in localStorage for 15 minutes
      const expiration = Date.now() + 15 * 60 * 1000;
      localStorage.setItem("cache", JSON.stringify({ data, expiration }));
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateButton(data) {
  const filename = data.url.split("/").pop();

  const downloadLink = document.querySelector(".downloadBtn");
  downloadLink.href = data.url;
  downloadLink.download = filename;

  downloadLink.style.display = "block";

  const loadingBtn = document.querySelector(".loading");
  loadingBtn.style.display = "none";

  const version = document.querySelector(".version");
  version.innerText = `[ ${data.name} ]`;
}

updateDownloadData();
