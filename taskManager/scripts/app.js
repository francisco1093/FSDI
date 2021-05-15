
var isItImportant=false;

function toggleImportant(){
    console.log("icon Clicked");
    if(isItImportant){        
        isItImportant=false;
        $("#iImportant").removeClass('fas').addClass('far');
    }
    else{
        isItImportant=true;
        $("#iImportant").removeClass('far').addClass('fas');
    }
}

function saveTask(){
    console.log("Saving...");
    //get the value from controls
    let title =$("#txtTitle").val();
    let desc = $("#txtDesc").val();
    let dueDate=$("#txtDueDate").val();
    let alertText=$("#selAlert").val();
    let location =$("#txtDueDate").val();
    

    //create an object
    let theTask = new task(title,desc,isItImportant,dueDate,alertText,location);
    console.log(theTask);

}

function init(){
console.log("Task Manager");

$("#iImportant").click(toggleImportant);
$("#btnDetails").click(function(){$("#details").toggle()});
$("#btnSave").click(saveTask);
}

window.onload = init;
