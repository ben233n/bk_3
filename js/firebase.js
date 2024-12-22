$(document).ready(function () {
  // INITIALIZE FIREBASE
  firebase.initializeApp({
    apiKey: "AIzaSyDAh_3wP2GMY1L29bLM-Mc8zXuVup08ObY",
    authDomain: "ntue-a6414.firebaseapp.com",
    projectId: "ntue-a6414",
    storageBucket: "ntue-a6414.firebasestorage.app",
    messagingSenderId: "704219654807",
    appId: "1:704219654807:web:41133f8bea746839c557d2"
  });

  const db = firebase.firestore(); // Firestore 資料庫
  const storageRef = firebase.storage().ref(); // Storage 參考
  const imageCollectionRef = db.collection("images"); // Firestore collection
  
  let file; // 儲存選取的檔案


  
  // 監聽檔案選擇
  $("#input_img").change(function (event) {
    file = event.target.files[0];
  });


  // 監聽上傳按鈕點擊
  $("#upbtn").click(function () {
    $(this).parent(".upload_btn_box").css({
      display: "none",
      transform:"translateY(0px)"
    }).siblings(".upload").css({
      height: "100%"
    }).find("#youcanup").css({
      fontSize: "0.9rem"
    });
    $(".uploadimg").css({
      width: "0px",
      width: "0px"
    }).siblings(".loader").css({
      display: "block",
    });
    $("#youcanup").css({
      fontSize: "0rem"
    });
    

    const filePath = `images/${file.name}`;
    const fileRef = storageRef.child(filePath);

    // 上傳檔案到 Firebase Storage
    fileRef
      .put(file)
      .then((snapshot) => {
        alert("圖片上傳成功！");
        $(".uploadimg").css({
          width: "90px",
          width: "90px"
        }).siblings(".loader").css({
          display: "none",
        });
        $("#youcanup").css({
          fontSize: "0.9rem"
        });
        return fileRef.getDownloadURL(); // 獲取下載連結
      })
      .then((url) => {
        console.log("下載連結:", url);

        // 儲存下載連結到 Firestore（自動生成文件 ID）
        return imageCollectionRef.add({
          url: url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // 用於排序
        });
      })
      .then(() => {
        alert("圖片連結儲存成功！");
        loadLatestImage(); // 上傳後顯示最新的圖片
      })
      .catch((error) => {
        console.error("上傳失敗：", error);
      });
  });

  // 讀取資料庫中的最新一張照片並顯示
  function loadLatestImage() {
    imageCollectionRef
      .orderBy("timestamp", "desc") // 按時間降序排列，最新的圖片在前
      .limit(1) // 只取得最新一筆
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const url = doc.data().url;
          console.log("最新圖片連結:", url);
          $("#shareimg_img_img").attr("src", url); // 更新 img 的 src 顯示最新圖片
        } else {
          console.log("資料庫中沒有圖片");
          $("#shareimg_img_img").attr("alt", "尚未上傳圖片");
        }
      })
      .catch((error) => {
        console.error("讀取最新圖片失敗：", error);
      });
  }

  // 頁面載入時自動顯示最新一張圖片
  loadLatestImage();

  var user_bang=0;


$(".chat_user").click(function () { 
  if(user_bang===0)
  {
    user_bang=1;
    $(".chat_user").css("background-color", "#a976e0");   
    $(".chat_user").css("border", "3px solid #a976e0"); 
  }
  else if(user_bang===1)
  {
    user_bang=2;
    $(".chat_user").css("background-color", "#484855");   
    $(".chat_user").css("border", "3px solid #484855"); 
  }
  else if(user_bang===2)
  {
    user_bang=0;
    $(".chat_user").css("background-color", "#43437a");   
    $(".chat_user").css("border", "3px solid #43437a"); 
  }

});
if ($(window).width() < 1200) {
  $(".chat_user").click(function () {
    const $this = $(this);
    // 放大主體及子元素
    $this.css({
      transform: "scale(1.2)",
      transition: "transform 0.3s"
    }).find(".chat_user_head").css({
      transform: "scale(1.1) translateY(10px)",
      transition: "transform 0.3s"
    }).siblings(".chat_user_body").css({
      transform: "scale(1.2) translateY(-5px)",
      transition: "transform 0.3s"
    });
  
    // 延遲縮小主體及子元素
    setTimeout(() => {
      $this.css({
        transform: "scale(1)",
        transition: "transform 0.3s"
      }).find(".chat_user_head").css({
        transform: "scale(1) translateY(0)",
        transition: "transform 0.3s"
      }).siblings(".chat_user_body").css({
        transform: "scale(1) translateY(0)",
        transition: "transform 0.3s"
      });
    }, 300);
  });
} else {
  $(".chat_user").hover(
    function () {
      $(this).css({
        transform: "scale(1.2)"
      }).find(".chat_user_head").css({
        transform: "scale(1.1)",
        transform:"translateY(10px)"
      }).siblings(".chat_user_body").css({
        transform: "scale(1.2)",
        transform:"translateY(-5px)"
      });
    },
    function () {
      $(this).css({
        transform: "scale(1)"
      }).find(".chat_user_head").css({
        transform: "scale(1)",
        transform:"translateY(0px)"
      }).siblings(".chat_user_body").css({
        transform: "scale(1)",
        transform:"translateY(0px)"
      });
    }
  );
}


  const $inputElement = $('#chat_input'); // 選取輸入框
  const $avatarElement = $('.b'); // 選取頭像
  const $sendButton = $('#chat_send'); // 選取送出按鈕
  const $messagesContainer = $('.chat_body'); // 留言區容器
  
  $sendButton.on('click', async function () {
    const message = $inputElement.val().trim();
    chat_input_len=document.getElementById('chat_input').value.trim(); 
    if(chat_input_len.length>0 && chat_input_len.length<30 )
    {
      let avatarColor = 'green'; // 預設顏色
    if (user_bang === 0) {
      avatarColor = '0';
    }
    else if (user_bang === 1) 
    {
      avatarColor = '1';
    }
    else if (user_bang === 2) 
    {
      avatarColor = '2';
    }

    if (message) {
      // 將留言與頭像顏色存到 Firestore
      await db.collection('messages').add({
        text: message,
        avatarColor: avatarColor, // 頭像顏色
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      $inputElement.val(''); // 清空輸入框
    }

    }
    else{
      alert("輸入錯誤");
    }
    
  });
  

  // 讀取留言並顯示
  db.collection('messages')
  .orderBy('timestamp', 'desc') // 按時間排序，舊的在上、新的在下
  .onSnapshot(function (snapshot) {
    $messagesContainer.empty(); // 清空再重新渲染

    snapshot.forEach(function (doc) {
      const data = doc.data();
      const time = data.timestamp
        ? data.timestamp.toDate().toLocaleString()
        : '時間不明';

      let $messageElement;

      // 條件判斷：根據 avatarColor 的值創建不同元素
      if (data.avatarColor === '0') {
        $messageElement = $(`
          
                                  <div class="chat_build">
                                    <div  class="chat_user_blue chat_user_XD">
                                        <div class="chat_user_head"></div>    
                                        <div class="chat_user_body"></div>                          
                                    </div>
                                    <div class="chat_build_say">
                                        <div class="chat_build_say_top">
                                            <h5 class="main_c item_size">匿名</h5>
                                            <h6 class="word_c p_size">${time}</h6>
                                        </div>
                                        <div class="chat_build_say_ad">
                                            <p class="reply">${data.text}</p>
                                        </div>
                                    </div>
                                </div>
        `);
      } else if (data.avatarColor === '1') {
        $messageElement = $(`
                                  <div class="chat_build">
                                    <div  class="chat_user_pur chat_user_XD">
                                        <div class="chat_user_head"></div>    
                                        <div class="chat_user_body"></div>                          
                                    </div>
                                    <div class="chat_build_say">
                                        <div class="chat_build_say_top">
                                            <h5 class="main_c item_size">匿名</h5>
                                            <h6 class="word_c p_size">${time}</h6>
                                        </div>
                                        <div class="chat_build_say_ad">
                                            <p class="reply">${data.text}</p>
                                        </div>
                                    </div>
                                </div>
        `);
      } else if (data.avatarColor === '2') {
        $messageElement = $(`
                                  <div class="chat_build">
                                    <div  class="chat_user_black chat_user_XD">
                                        <div class="chat_user_head"></div>    
                                        <div class="chat_user_body"></div>                          
                                    </div>
                                    <div class="chat_build_say">
                                        <div class="chat_build_say_top">
                                            <h5 class="main_c item_size">匿名</h5>
                                            <h6 class="word_c p_size">${time}</h6>
                                        </div>
                                        <div class="chat_build_say_ad">
                                            <p class="reply">${data.text}</p>
                                        </div>
                                    </div>
                                </div>
        `);
      } 

      $messagesContainer.prepend($messageElement); // 新留言放最下面
    });
  });

});





