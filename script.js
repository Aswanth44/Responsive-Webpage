const form = document.getElementById("responseForm");
const progress = document.querySelector(".progress");
const gif = document.getElementById("reactionGif");
const text = document.getElementById("reactionText");

const inputs = form.querySelectorAll("input, textarea");

inputs.forEach(input => {
    input.addEventListener("input", updateProgress);
});

function updateProgress() {
    let filled = 0;
    inputs.forEach(input => {
        if (input.value.trim() !== "") filled++;
    });
    progress.style.width = (filled / inputs.length) * 100 + "%";
}

form.addEventListener("submit", e => {
    e.preventDefault();
    gif.src = "assets/loading.gif";
    text.textContent = "Submitting your response...";

    setTimeout(() => {
        gif.src = "assets/success.gif";
        text.textContent = "🎉 Response Submitted Successfully!";
        form.reset();
        progress.style.width = "0%";
    }, 2000);
});
