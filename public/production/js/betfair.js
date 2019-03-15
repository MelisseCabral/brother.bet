function games() {
    $.ajax({
        url: 'https://us-central1-brother-bet.cloudfunctions.net/getReadable',
        dataType: "json",
        method: 'POST',
        crossDomain: true,
        headers: {
            'Accept': 'application/json'
        },
        data: {
            funcRead: 'listEvents'
        },
        success: function (data) {
            $('#games').html(JSON.stringify(data))
        }
    });
}

// Main.
document.addEventListener('DOMContentLoaded', async function () {
    games()
});

