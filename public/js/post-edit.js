const save = (id) => {
  const titleEl = document.querySelector("#title");
  const body = tinymce.get("post-editor").getContent();
  const data = {
    title: titleEl.value,
    body: body,
  };
  console.log("data", data);
  let url = "/api/posts/";
  let method = "POST";
  if (id !== 0) {
    url = url + id;
    method = "PUT";
  }

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((res) => {
      location.assign("/dashboard");
    });
};
