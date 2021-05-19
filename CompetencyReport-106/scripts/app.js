var isItImportant=false;
var urlServer="http://fsdi.azurewebsites.net/api";

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
    let location =$("#txtLocation").val();
    

    
    if(!title)
    {
       // window.alert("error: you must provide a title");
       $("#errorTitle").removeClass("hide"); 
       setTimeout(function(){
        $("#errorTitle").addClass("hide"); 
       },4000);
       return;
    }

    if(!dueDate)
    {
       // window.alert("error: you must provide a title");
       $("#errorDueDate").removeClass("hide"); 
       setTimeout(function(){
        $("#errorDueDate").addClass("hide"); 
       },4000);
       return;
    }



    //create an object
    let theTask = new task(title,desc,isItImportant,dueDate,alertText,location);
    

    $(':input').val('');
    if(isItImportant){        
        isItImportant=false;
        $("#iImportant").removeClass('fas').addClass('far');
    }


    //send task to server
    $.ajax({
        url:urlServer+'/tasks',
        type:'POST',
        data: JSON.stringify(theTask),
        contentType:"application/json",
        success: function(res){
            console.log("Server says",res);
            displayTask(res);
        },
        error:function(errorDet){
            console.error("Error on req", errorDet);
        }
    });

}
function displayTask(task){
  

    $("#indicatorTask").removeClass("hide");
    let alert = "";
    switch(task.alertText) {
        case "1":alert = "Don't Forget to:";break;
        case "2":alert = "Stop:";break;
        case "3":alert = "Start:";break;
        case "4":alert = "Get more coffee:";break;
    }
    
    let syntax = `<div id="task${task.id}" class="task">
    <div class="sec-1">
        ${alert}
        <i id="iDelete" onclick="deleteTask(${task.id})" class="far fa-trash-alt"></i>
    </div>

    <div class="sec-2">
        <div class="sec-title">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <div class="sec-date">
            <label>${task.dueDate}</label>
        </div>
        <div class="sec-location">
            <label>${task.location}</label>
        </div></div></div>` ;
         
        
        $("#tasksContainer").append(syntax);
        if(task.important)
        {
            console.log("IMPPORTANTE"+task.id);
            $("#task"+task.id).addClass('importantTask');
        
            }
                
  
  
  /*  let syntax = `<div class="task">
    <h5>${task.alertText}</h5>
    <div>${task.title}</div>
    <div>${task.isItImportant}</div>
    <div>${task.desc}</div>
    <div>${task.dueDate}</div>
    </div>`;
    $("#tasksContainer").append(syntax);
*/
}
function deleteTask(id){
    console.log("Deleting a task..."+id);

    $.ajax({
        url:urlServer+'/tasks/'+id,
        type: "DELETE",
        success:function(){
            console.log("Delete");
           $("#task"+id).remove();
           if(document.getElementsByClassName('task').length ==0)
                 $("#indicatorTask").addClass("hide");
        },
        error:function(){
            console.error("Error");
        }
    })

}

function retrieveTasks(){
    $.ajax({
        url: urlServer+'/tasks',
        type:"GET",
        success:function(list){
            console.log("Retrieve",list);
            
            for(let i=0;i<list.length;i++){
                let task = list[i];

                if(task.user==="FranciscoCardenas")
                     displayTask(task);
            }

        },
        error:function(err){
            console.error("Error",err);
        }

    })
}

function init(){
console.log("Task Manager");

retrieveTasks();
$("#iImportant").click(toggleImportant);
$("#btnDetails").click(function(){$("#details").toggle()});
$("#btnSave").click(saveTask);
}

window.onload = init;

function testRequest(){
    $.ajax({
        url:"http://fsdi.azurewebsites.net/api",
        type:'GET',
        success: function(res){
            console.log("Server says",res);
        },
        error:function(errorDet){
            console.error("Error on req", errorDet);
        }
    })
}