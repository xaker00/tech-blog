const saveComment = (postId) => {
  const commentEl = document.querySelector("#comment");
  const commentText = commentEl.value;
  console.log("postId", postId);
  console.log("commentText", commentText);
  fetch("/api/comments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({postId:postId, comment:commentText})
  }).then(res=>{
    if(res.status === 201){
      location.reload();
    }else{
      showModal('Error', 'Cannot save comment');
    }
  });
};
