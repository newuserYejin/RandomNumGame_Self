let randomNum = 0
let userInput = document.querySelector("#userInput");
let goButton = document.getElementById("goButton")
let resetButton = document.querySelector("#resetButton")
let userInput_Value
let resultArea = document.querySelector("#resultArea")
let chance = 5
let chance_Area = document.querySelector("#chance_Area")
let gif = document.querySelector("#gif")
let userArray = []

goButton.addEventListener("click", guessNum)
userInput.addEventListener("focus", () => {
    userInput.value = ""
})
resetButton.addEventListener("click", reset)


function startGame() {      // 목표 랜덤 숫자 지정
    randomNum = Math.floor(Math.random() * 100) + 1;
    console.log("목표 값: ", randomNum)
}

function guessNum() {
    userInput_Value = parseInt(userInput.value)

    if ((userInput.value).length == 0) {
        resultArea.textContent = "숫자를 입력해주세요(1 ~ 100)"
        return
    }

    if (userInput_Value > 100 || userInput_Value < 1) {
        resultArea.textContent = "1부터 100까지의 숫자를 입력해주세요."
        return
    }

    if (userArray.includes(userInput_Value)) {
        resultArea.textContent = "이미 입력해본 숫자입니다."
        gif.src = "./image/circle_gif.gif"
        gif.style.transform = "none";
        return
    }

    userArray.push(userInput_Value)

    if (userInput_Value > randomNum) {
        resultArea.textContent = "DOWN!!!(숫자를 줄여주세요)"
        gif.src = "./image/arrow_gif.gif"
        gif.style.transform = "scaleY(-1)";
    } else if (userInput_Value < randomNum) {
        resultArea.textContent = "UP!!! (숫자를 키워주세요)"
        // ./image/start_gif.gif
        gif.src = "./image/arrow_gif.gif"
        gif.style.transform = "none";
    } else {
        resultArea.textContent = "정답!!! 한번 더 어떠세요?!"
        goButton.disabled = true
        gif.src = "./image/success_gif.gif"
        gif.style.transform = "none";
        return
    }

    chance--
    chance_Area.textContent = `남은 기회: ${chance}번`
    console.log("chance: ", chance)

    if (chance < 1) {
        goButton.disabled = true
        chance_Area.innerHTML = "기회를 모두 소진하셨습니다.<br>(다시 해보세요!)";
        gif.src = "./image/gameOver_gif.gif"
        gif.style.transform = "none";
        resultArea.textContent = "숫자 추리에 실패했어요ㅠㅠ"
    }
}

function reset() {
    startGame()
    resultArea.textContent = "결과 출력 (UP / DOWN)"
    goButton.disabled = false
    chance = 5
    chance_Area.textContent = "남은 기회: 5번"
    gif.src = "./image/start_gif.gif"
    gif.style.transform = "none";
    userInput.value = ""
}


startGame()