$(document).ready(function() {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $('.sendComment').click(e => {
        let data = e.target
        let id = data.dataset.id
        let comment = $(`.commentContent${id}`).val()
        console.log(id)
        console.log(comment)
        $.ajax({
            url: '/newsfeed/commitComment',
            type: 'POST',
            data: {
                comment: comment,
                feedid: id
            }
        })
        .then(data =>console.log(data))
    })
    $('.deleteannounce').click(e => {
        let data = e.target
        let id = data.dataset.id
        console.log(id)
        $.ajax({
            url: '/announcements/delete/'+id,
            type: 'POST',
        })
        .then(data => {
            console.log(data)
            window.location.href = '/announcements'
        })
    })
    $('.deletecomment').click(e => {
        let data = e.target
        let id = data.dataset.id
        $.ajax({
            url: '/newsfeed/comment/delete/'+id,
            type: 'POST'
        })
    })
    $('.deletefeed').click(e => {
        let data = e.target
        let id = data.dataset.id
        $.ajax({
            url: '/newsfeed/deleteFeed/'+id,
            type: 'POST'
        })
        .then(data => console.log(data))
    })
    $('.updatefeed').click(e => {
        let data = e.target
        let id = data.dataset.id
        let content = $('.updateContent').val()
        console.log(content)
        console.log(id)
        $.ajax({
            url: '/newsfeed/updateFeed/'+id,
            type: 'POST',
            data: {
                content: content
            }
        })
        .then(data => console.log(data))
    })
})

