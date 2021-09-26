const showModal = (header, text) => {
  const headerEl = document.querySelector("#default-modal-header");
  const textEl = document.querySelector("#default-modal-text");

  headerEl.innerText = header;
  textEl.innerText = text;

  const elems = document.querySelectorAll(".modal");
  const instances = M.Modal.init(elems);
  console.log("instances", instances);
  const elem = document.querySelector("#default-modal");
  const instance = M.Modal.getInstance(elem);
  console.log("instance", instance);
  instance.open();
};
