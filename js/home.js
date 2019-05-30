// ************************** Loader Gif ****************************************************
setTimeout(() => {
    document.getElementById("ul").style.display = "block"
    document.getElementById("loading").style.display = "none"
}, 900)

// ************************** Post  ****************************************************
var savePost = localStorage.getItem("savePost")
   savePost =  JSON.parse(savePost);
// ************************** Sign Up data Get ****************************************************

   var userData = localStorage.getItem("userData")
   userData =  JSON.parse(userData);
   console.log(userData)
  const dataBase = firebase.database().ref(`/`);
// ************************** Write Post ****************************************************
let textArea = document.getElementById("textArea");
textArea.setAttribute('placeholder',"What's on your mind ,"+userData.fulltName+"?")
let showDataInH1 = document.getElementById("showDataInH1")
// ************************** Post function ****************************************************
function postBtn(){
  let obj = {
    userId : userData.id,
    textArea : textArea.value,
    fulltName : userData.fulltName,
    like : 0,
    postId : [""]
  }
  // ************************** Save Post content in object ****************************************************
  console.log(obj)
  dataBase.child("Post").push(obj);


}
// ************************** Post content get from firebase ****************************************************
dataBase.child("Post").on(`child_added`,(snap)=>{
    var data =  snap.val();
    data.id = snap.key;
    console.log(data.id)
// ************************** Show post content ****************************************************
    let ul = document.getElementById("ul");
    let cretaLi = document.createElement("li");
    ul.appendChild(cretaLi);
    let h3 = document.createElement("h3");
    cretaLi.appendChild(h3);
    h3.innerHTML ="<img  src="+"https://img.icons8.com/color/48/000000/user.png " +" id ="+ "commentProfileImg"+">"+ data.fulltName;
    if (data.userId === userData.id){
    var deleteBTn =document.createElement("img");
    deleteBTn.setAttribute("src", "https://img.icons8.com/color/48/000000/cancel.png");
    deleteBTn.setAttribute("id", "deleteBTn");
    h3.appendChild(deleteBTn);
    var editBtn = document.createElement("img");
    editBtn.setAttribute("src", "https://img.icons8.com/ultraviolet/40/000000/pencil.png");
    editBtn.setAttribute("id", "editBtn");
    h3.appendChild(editBtn);

   

    deleteBTn.addEventListener("click", ()=>{
      dataBase.child("Post/"+data.id).remove();
    cretaLi.remove();
    })

    
    
    editBtn.addEventListener("click", ()=>{
      let textAreaEdit = document.createElement("textArea");
      textAreaEdit.setAttribute("class", "form-control");
      textAreaEdit.setAttribute("rows", 5);
      textAreaEdit.setAttribute("id", "textArea");
      console.log(data.textArea);
      textAreaEdit.innerHTML = data.textArea;
    textAreaEdit.setAttribute('placeholder',"What's on your mind ,"+userData.fulltName+"?")
    h3.appendChild(textAreaEdit);
    var postUpdateBtn = document.createElement("input");
    postUpdateBtn.setAttribute("type", "button");
    postUpdateBtn.setAttribute("value", "Update");
    postUpdateBtn.setAttribute("class","postupdateBtn");
    h3.appendChild(postUpdateBtn);
    p.setAttribute("style", "display:none")
    h5.setAttribute("style", "display:none")
 

    
    postUpdateBtn.addEventListener("click", ()=>{

      console.log(textAreaEdit.value)
      dataBase.child("Post/"+data.id ).update({
        textArea:textAreaEdit.value,
        
      })
      textAreaEdit.setAttribute("style", "display:none");
      h5.setAttribute("style", "display:block");
      p.setAttribute("style", "display:block");
      postUpdateBtn.setAttribute("style", "display:none")
    })
    
    })
    

    
    }
    let br = document.createElement("br");
    ul.appendChild(br);
    let h5 =document.createElement("h5");
    h3.appendChild(h5);
    const createLiText = document.createTextNode(data.textArea)
    h5.appendChild(createLiText);
    let p = document.createElement("p");
    cretaLi.appendChild(p)
// **************************like button ****************************************************  
flagchek = true;
for (var i = 0 ;i < data.postId.length; i++){
  if (data.postId[i] === userData.id){  
    flagchek = false;
    var creteLikeBTn =  document.createElement("input");
    creteLikeBTn.setAttribute("type", "button");
    creteLikeBTn.setAttribute("style" ,"color:blue")
    creteLikeBTn.setAttribute("value", "like "+ data.like);
    creteLikeBTn.setAttribute("name", data.id);
    creteLikeBTn.setAttribute("id", "likeBtn");
    p.appendChild(creteLikeBTn)
  }
}
if (flagchek=== true){  
  var creteLikeBTn =  document.createElement("input");
  creteLikeBTn.setAttribute("type", "button");
  creteLikeBTn.setAttribute("style" ,"color:white")
  creteLikeBTn.setAttribute("value", "like "+ data.like);
  creteLikeBTn.setAttribute("name", data.id);
  creteLikeBTn.setAttribute("id", "likeBtn");
  p.appendChild(creteLikeBTn)
}
// ************************** comment button****************************************************
    let creteCommentBTn =  document.createElement("input");
    creteCommentBTn.setAttribute("type", "button");
    creteCommentBTn.setAttribute("class", "commentBtn");
    creteCommentBTn.setAttribute("value", "Comment");
    creteCommentBTn.setAttribute("id", data.id);
    p.appendChild(creteCommentBTn)
// ************************** write comment****************************************************
    creteCommentBTn.addEventListener('click', ()=>{
        let writeComment = document.createElement("input");
        writeComment.setAttribute('type', "text")
        writeComment.setAttribute('id', "writeComment")
        writeComment.setAttribute('placeholder', userData.fulltName+" ? Write a comment ...")
        creteCommentBTn.appendChild(writeComment)
        cretaLi.appendChild(writeComment)
// ************************** sent comment ***************************************************
        let sentComment = document.createElement("input");
        sentComment.setAttribute('type', "button")
        sentComment.setAttribute('value', "Sent")
        sentComment.setAttribute('class', "sentComment")
        sentComment.setAttribute('id', data.id)
        creteCommentBTn.appendChild(sentComment)
        cretaLi.appendChild(sentComment)

// ************************** Get comment content from firebase****************************************************

        dataBase.child("Post/" + creteCommentBTn.id +"/comment").on(`child_added`,(snap)=>{
          var comment =  snap.val();
          comment.id = snap.key;
          console.log(comment.writeComment)
          let comemntUl = document.createElement('ul');
          let commentLi = document.createElement('li');
          commentLi.setAttribute("class", "commentLi");
          comemntUl.appendChild(commentLi);
          cretaLi.appendChild(comemntUl);
          let bold = document.createElement("b");
          bold.setAttribute('id', 'commentProfile');
          bold.innerHTML =  "<img  src="+"https://img.icons8.com/color/48/000000/user.png " +" id ="+ "commentProfileImg"+ ">"+comment.fulltName+ "";
          commentLi.appendChild(bold);
          if (comment.commentId === userData.id){
          var deleteCommentBTn =document.createElement("img");
          deleteCommentBTn.setAttribute("src", "https://img.icons8.com/color/48/000000/cancel.png");
          deleteCommentBTn.setAttribute("id", "deleteBTn");
          bold.appendChild(deleteCommentBTn);
          var editCommentBtn = document.createElement("img");
          editCommentBtn.setAttribute("src", "https://img.icons8.com/ultraviolet/40/000000/pencil.png");
          editCommentBtn.setAttribute("id", "editBtn");
          bold.appendChild(editCommentBtn);


          
          // ******************************************** delete comment button *********************************
          deleteCommentBTn.addEventListener("click", ()=>{
            dataBase.child("Post/"+sentComment.id+"/comment/"+comment.id).remove();
            comemntUl.remove();
            
          })
          // *********************** Edit comment btn *******************************
          editCommentBtn.addEventListener("click", ()=>{
            let commentEdit = document.createElement("textarea");
            commentEdit.setAttribute("rows", "2");
           commentEdit.setAttribute("class", "commentEdit");
           commentEdit.setAttribute('placeholder', userData.fulltName+" ? Write a comment ...")
           console.log(comment.writeComment);
           commentEdit.innerHTML = comment.writeComment;
           cmtH5.setAttribute("style", "display:none")
            commentLi.appendChild(commentEdit);
            let commentUpdateBtn = document.createElement("input");
            commentUpdateBtn.setAttribute("type", "button");
            commentUpdateBtn.setAttribute("id", "comemntUpdateBtn");
            commentUpdateBtn.setAttribute("value", "Update");
            commentLi.appendChild(commentUpdateBtn);



          commentUpdateBtn.addEventListener("click", ()=>{
            alert("Comment update not working")
          })

          })
    
          }
          const commentLiText = document.createTextNode(comment.writeComment);
          let cmtH5 = document.createElement("h5");;
          cmtH5.setAttribute("id", "cmtH5");
          bold.appendChild(cmtH5);
          cmtH5.appendChild(commentLiText);
     
        })


        
      
// ************************** sent comment function ****************************************************

      sentComment.addEventListener('click', ()=>{
        commentObj = {
          writeComment : writeComment.value,
          fulltName : userData.fulltName,
          commentId : userData.id,
        }
        console.log(commentObj)
// ************************** sent commetn content push on firebase****************************************************

  dataBase.child("Post/"+sentComment.id + "/comment").push(commentObj);
 
      })
   

// ************************    get like from firebase ****************************************

      dataBase.child("Post/" + creteCommentBTn.id+"/"+creteLikeBTn.id +"/like").on(`child_added`,(snap)=>{
    var like =  snap.val();
    like.id = snap.key;
  })
// ************************** like post function ****************************************************
    
 
    })
         
creteLikeBTn.addEventListener("click" , ()=>{
  var flag = true;
  for (var i = 0 ;i < data.postId.length; i++){
  if (data.postId[i] === userData.id){
    data.postId.splice(i,1);
    var newupdate = data.like;
    creteLikeBTn.setAttribute("style" ,"color:white")
    creteLikeBTn.setAttribute("value", "like " + (newupdate - 1));
    dataBase.child("Post/"+ creteLikeBTn.name).update({
          like : --data.like,
          postId: data.postId,
      })
  flag = false;
  break;
  }
}
  if (flag === true){
      data.postId.push(userData.id);
      var newupdate1 = data.like;
      creteLikeBTn.setAttribute("value", "like " + (newupdate1 + 1));
      creteLikeBTn.setAttribute("style" ,"color:blue")
      dataBase.child("Post/"+ creteLikeBTn.name).update({
      like : ++data.like,
      postId: data.postId,
      })
    }
    // location.reload()
})




  })


// ************************** show post content on browser get from firebase ****************************************************

dataBase.child("CurrentUser/"+userData.id+"/Post").on(`child_added`,(snap)=>{
    var data =  snap.val();
    data.id = snap.key;
    console.log(data.input)

    const createLi = document.createElement("li");
const createLiText = document.createTextNode(data.input)
createLi.appendChild(createLiText)

const createBr = document.createElement("br")
ul.appendChild(createBr)
ul.append(createLi)
})


// ************************************** Current Usres Log Out **********************************************
function logout(){
// **************************sweet alert  ****************************************************
  
    swal({
        title: "Are you sure?",
        text: "You LogOut from the Home page !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Successfully LogOut From the Home Page", {
            icon: "success",
          });
          firebase.auth().signOut().then(() =>{
            window.location.assign("./../login/login.html");
        localStorage.removeItem("userData")
                })
        } else {
          swal("You not LogOut form the Home Page !");
        }
      });


}
// ************************************** Current Usres Data **********************************************
document.getElementById("userName").innerHTML = userData.fulltName.toUpperCase();
document.getElementById("userEmail").innerHTML = userData.email;
document.getElementById("mobNum").innerHTML = userData.contactNum;
document.getElementById("postCreater").innerHTML = userData.fulltName;



















