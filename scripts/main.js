// import RealBot from "../realbot/Bot.js";
var bot = new Realbot("Human", 16);

var code = document.getElementById("snippet");
document.getElementById("btn").onclick = () => {
  var res = bot.receiveAndAnswer(code.value, "#out")
  bot.say(res, "#out");
  code.value = "";
  code.focus();
}