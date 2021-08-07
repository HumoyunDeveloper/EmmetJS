class Realbot {
  constructor(_name = "RealBot", _age = 16) {
    this.name = _name,
      this.age = _age;

  }

  say(_quest = "", _dest) {
    if (typeof _dest === "object") {
      _dest.textContent = _quest;
    } else {
      document.querySelector(_dest).innerHTML = _quest;
    }
  }

  addSay(_quest = "", _dest) {
    if (typeof _dest === "object") {
      _dest.textContent = _quest;
    } else {
      document.querySelector(_dest).innerHTML += _quest;
    }
  }

  convertTags(_text) {
    var left = /</g;
    var right = />/g;
    var x1 = _text.replace(left, "&lt;");
    var x2 = x1.replace(right, "&gt;");
    return x2;
  }

  receiveAndAnswer(_text, _out) {
    var generated = "";

    if (/^\s*(\w[a-zA-Z0-9:]*)\s*(?:\[([^\]]*?)\])?\s*(?:\*\s*([0-9]+))?\s*(?:\(([^\)]*)?\))?$/g.test(_text)) {
      var regExp = /^\s*(\w[a-zA-Z0-9:]*)\s*(?:\[([^\]]*?)\])?\s*(?:\*\s*([0-9]+))?\s*(?:\(([^\)]*)?\))?$/g;
      if (regExp) {
        var res = regExp.exec(_text);
        var nameEl = res[1];

        if (res[2] && res[3]) {
          generated = "";
          var integer = Number(res[3]);

          if (integer) {
            if (res[2] && res[3] && res[4]) {
              var i3 = 0;
              generated = "";
              for (; i3 < integer; i3++) {
                var contentText = (res[4].replace(/::INC::/ig, i3 + 1));
                var valuee2 = (res[2].replace(/::INC::/ig, i3 + 1));
                contentText = this.convertTags(contentText);
                generated += `&lt;${nameEl}  ${valuee2}&gt;${contentText}&lt;/${nameEl}&gt;<br/>`;
              }
            } else {
              var i2 = 0;
              generated = "";
              for (; i2 < integer; i2++) {
                var valuee3 = (res[2].replace(/::INC::/ig, i2 + 1));

                generated += `&lt;${nameEl}  ${valuee3}&gt;&lt;/${nameEl}&gt;<br/>`;
              }
            }
          }
        }
        else if (res[1] && res[3] && !(res[2])) {
          generated = "";
          var integer = Number(res[3]);
          if (integer) {
            if (res[4]) {
              var i = 0;
              for (; i < integer; i++) {
                var valuee5 = (res[4].replace(/::INC::/ig, i + 1));
                valuee5 = this.convertTags(valuee5);
                generated += `&lt;${nameEl}&gt;${valuee5}&lt;/${nameEl}&gt;<br/>`;
              }
            } else {
              var i = 0;
              for (; i < integer; i++) {
                generated += `&lt;${nameEl}&gt;&lt;/${nameEl}&gt;<br/>`;
              }
            }
          }
        }
        else if (!(res[3]) && res[2] && res[1]) {
          if (res[4]) {
            var htmltagsconverted = this.convertTags(res[4]);
            generated = `&lt;${nameEl} ${res[2]}&gt;${htmltagsconverted}&lt;/${nameEl}&gt;<br/>`;
          } else {
            generated = `&lt;${nameEl} ${res[2]}&gt;&lt;/${nameEl}&gt;<br/>`;
          }
        }
        else {
          if (res[4]) {
            var htmltagsconverted2 = this.convertTags(res[4]);
            generated = `&lt;${nameEl}&gt;${htmltagsconverted2}&lt;/${nameEl}&gt;<br/>`;
          } else {
            generated = `&lt;${nameEl}&gt;&lt;/${nameEl}&gt;<br/>`;
          }
        }
      }
    } else {
      generated = "Invalid Syntax";
    }
    return generated;
  }

  getInfo() {
    return { name: this.name, age: this.age };
  }
}