var DateTime = luxon.DateTime;

var dt = DateTime.local();

const storage =  JSON.parse(localStorage.getItem("scheduleStorage")) || [] ;

$("#date").html(dt.toLocaleString(DateTime.DATE_HUGE));

storage.forEach(element => {
    $("#"+element.time).val(element.text);
});

var hours = $("textarea");

for (let index = 0; index < hours.length; index++) {

    const time = parseInt(hours[index].id);
    if (time < dt.hour) {
        $("#"+time).addClass("past");
    }else if (time === dt.hour) {
        $("#"+time).addClass("current");
    }else{
        $("#"+time).addClass("future");
    }
    
}



$(".savebtn").click(function (e) {

    const id = e.target.id.slice(0, -3);

    const savedText = {
        time: id,
        text: $("#"+id).val() || ""
    }; 

    const index = storage.findIndex(function (x) {
        return (savedText.time === x.time);
    });

    if (index + 1) {
        storage[index].text = savedText.text;      
    }else{
        storage.push(savedText);
    }
    
    
    localStorage.setItem("scheduleStorage", JSON.stringify(storage));
});