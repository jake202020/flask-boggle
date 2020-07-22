$('#guess-form').on('submit', async function (evt) {
    evt.preventDefault();
    const $word = $("#guess")

    let word = $word.val();

    const resp = await axios.get("/check-word", { params: { word: word } });
    console.log(resp)

    $word.val("")
})