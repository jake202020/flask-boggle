let score = 0;
let words = new Set();
let time = 10;

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
        score += word.length
        $("#message").text(`${word} is okay`)
        $("#score").text(score)
    }

    $word.val("")
})

let timer = setInterval(async function () {
    time -= 1;
    $("#timer").text(`${time} seconds`)

    if (time === 0) {
        $('#guess').attr("disabled", "disabled")
        $('#submit').attr("disabled", "disabled")
        clearInterval(timer)
        await gameScore();
    }

}, 1000)

async function gameScore() {
    $("#score").text("")
    const resp = await axios.post("/post-score", { score: score })
    if (resp.data.brokeRecord) {
        $("#message").text(`New record: ${score}`);
    } else {
        $("#message").text(`Final score: ${score}`);
    }
}