let score = 0;
let words = new Set();
let time = 60;

let timer = setInterval(function () {
    $("#timer").text(`${time} seconds`)
    time -= 1;
    if (time === -1) {
        clearInterval(timer)
        $('#guess').attr("disabled", "disabled")
    }

}, 1000)

$('#guess-form').on('submit', async function (evt) {
    evt.preventDefault();
    const $word = $("#guess")

    let word = $word.val();
    if (!word) return;

    if (words.has(word)) {
        $("#message").text(`${word} already guessed`)
        $word.val("")
        return
    }

    const resp = await axios.get("/check-word", { params: { word: word } });
    msg = resp.data.result

    if (msg === "not-word") {
        $("#message").text(`${word} is not a valid English word`)
    }

    else if (msg === "not-on-board") {
        $("#message").text(`${word} is not on this board`)
    }

    else {
        words.add(word)

        $("#message").text(`${word} is okay`)

        $("#score").text(gameScore(word))
    }

    $word.val("")
})

function gameScore(word) {
    score += word.length
    return score
}