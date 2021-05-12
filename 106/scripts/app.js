function saveTodo(){
    let input = $("#txtTodo");
    let text = input.val();
    console.log("Saving todo:"+text);

    let syntax = "<div class='todo-item'><h6>"+text+"</h6></div>";
    $("#pendingList").append(syntax);

    input.val("").focus();   

}


function init(){
    console.log("Todo App");
    $("#btnSave").click(saveTodo);
    $("#txtTodo").keypress(function(args){
        if(args.keyCode===13){
            saveTodo();
        }
    });

    $('body').on('click', '#pendingList div', function(){
         $(this).remove();
       });

}

window.onload = init;