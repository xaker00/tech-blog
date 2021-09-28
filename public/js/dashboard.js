const deletePost = (id)=>{
    fetch('/api/posts/'+id, {method:'DELETE'}).then(res=>{
        if(res.status === 204){
            location.reload();
        }else{
            showModal('Error', res.body);
        }
    })
}