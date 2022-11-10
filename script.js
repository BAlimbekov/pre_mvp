$("#button").on("click", function(){
    const $input = $("#input");
    
    console.log($input.val())
    fetch('http://localhost:4000/' + $input.val())
        .then(response => response.json())
        .then(result => {
            console.log(result)
            $("#output")[0].innerHTML = result
        });
});