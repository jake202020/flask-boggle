$('#guess-form').on('submit', async function (evt) {
    evt.preventDefault();
    const $word = $("#guess")

    let word = $word.val();

    const resp = await axios.get("/check-word", { params: { word: word } });
    msg = resp.data.result

    if (msg === "not-word") {
        $("#message").text(`${word} is not a valid English word`)
    }

    else if (msg === "not-on-board") {
        $("#message").text(`${word} is not on this board`)
    }

    else {
        $("#message").text(`${word} is okay`)
    }

    $word.val("")
})