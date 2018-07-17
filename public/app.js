

$(document).ready(function () {
    let btn = $('#btn');
    // let inp = $('#inp').val();
    let list = $('#list');
    let prmt;

    while (!prmt) {

        prmt = prompt("Please enter your name");
    }
    let socket = io();



    socket.emit('name', prmt);

    socket.on('initConnect', function (data) {
        console.log(data);
        $('#connected').text('');
        for (let id in data) {
            console.log(data[id]);
            $('#connected').append(`<li>${data[id]}</li>`);
        }
    });

    socket.on('chat', function (data) {
        data.forEach(function(chatItem) {
            list.append(`<li>${chatItem}</li>`);
        })
    })

    btn.click(function () {
        let inp = $('#inp').val();
        console.log(inp);
        socket.emit('message', inp);
        list.append(`<li>${inp}</li>`);
    });

    socket.on('reciveData', function (data) {
        console.log(data);
        list.append(`<li>${data}</li>`);
    })
})