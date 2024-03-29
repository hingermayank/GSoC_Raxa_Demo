Ext.define('GSOC_Demo.controller.translate', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
		    transpage: '#page2'
        },
        control: {
            '#translate_button': {
                tap: 'to_layman',
                click: 'to_layman'
            }
        }
    },
	
	to_layman: function()
	{
        var form = this.getTranspage();
        var val  = form.getValues();
		prescript = val.prescription_field;
		result = to_parser.parse(prescript);
		console.log(result);
        result = result.toString().split(',');
		result.join(' ')
		Ext.getCmp('translation_field').setValue(result);
	}
});
	
	to_parser = (function() {
  
// the following code has been taken from peg-0.8.8.js and has been modified according to the need of our grammar.

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = [],
        peg$c3 = function(form) {
					return form.join('').toString() + ' of '
					},
        peg$c4 = function(name) {
					return name.join('').toString() + ' '
					},
		peg$c5 = function(concentration) {
					return concentration.join('').toString() + ', to be given '
					},
		peg$c6 = "sig",
		peg$c7 = { type: "literal", value: "sig", description: "sig" },	
		peg$c8 = function() {return ''},
		peg$c9 = /^[0-9]/,
        peg$c10 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c11 = function(quantity) {return quantity + ' '},
	    peg$c12 = function(unit) {
					return unit.join('').toString() + ' '
					},			
		peg$c13 = function(times) {
					return times.join('').toString() + ' times '
					},
		peg$c14 = function(period) {
					return period.join('').toString() + '.'
					},
		peg$c15 = "\n",
        peg$c16 = { type: "literal", value: "\n", description: "\"\\n\"" },
		peg$c17 = /^[a-z A-Z 0-9]/,
        peg$c18 = { type: "class", value: "[a-z A-Z 0-9]", description: "[a-z A-Z 0-9]" },
        
        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      s1 = peg$parseform();
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseform();
        }
      } else {
        s2 = peg$c0;
      }
      console.log(s2);
      if (s2 !== peg$FAILED) {
	   s3 = peg$parsename();
	  while (s3 !== peg$FAILED) {
          s4.push(s3);
          s3 = peg$parsename();
        }
          console.log(s4);
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecon();
		  while (s5 !== peg$FAILED) {
          s6.push(s5);
          s5 = peg$parsecon();
        }
            console.log(s6);
          if (s5 !== peg$FAILED) {
            s7 = peg$parsesig();
              console.log(s7);
            if (s7 !== peg$FAILED) {
				s8 = peg$parsequant();
              while (s8 !== peg$FAILED) {
                s9.push(s8);
                s8 = peg$parsequant();
              }
                console.log(s9);
			  if(s8 !== peg$FAILED){
			  s10 = peg$parseperiod();
			  while(s10!==peg$FAILED){
			  s11.push(s10),
			  s10=peg$parseperiod();
			  }
                  console.log(s11);
            } else {
              s11 = peg$c0;
            }
            if (s11 !== peg$FAILED) {
			
              s2 = [s2, s4, s6, s7, s9, s11];
              s1 = s2;
                console.log(s1);
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      }
      return s0;
    }

    function peg$parsenewline() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 10) {
        s1 = peg$c2;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestart();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }
	
	function peg$parseform() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
	  s2 = []; 
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c3(s2);
      }
      s0 = s2;

      return s0;
    }
	
    function peg$parsename() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
      s2 = [];
	  if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c4(s2);
      }
      s0 = s2;

      return s0;
    }

	function peg$parsecon() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
      s2 = [];
	  if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c5(s2);
      }
      s0 = s2;

      return s0;
    }

	
	function peg$parsequant() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
      s2 = [];
	  if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c11(s2);
      }
      s0 = s2;

      return s0;
    }

	
	function peg$parseunit() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
      s2 = [];
	  if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c12(s2);
      }
      s0 = s2;

      return s0;
    }

	
	function peg$parsetimes() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
      s2 = [];
	  if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c13(s2);
      }
      s0 = s2;

      return s0;
    }

	function peg$parseperiod() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
      s2 = [];
	  if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c14(s2);
      }
      s0 = s2;

      return s0;
    }

	
	
    function peg$parseletters() {
      var s0;

      if (peg$c17.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c18); }
      }

      return s0;
    }

    function peg$parsesig() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseletters();
      s2 = [];
	  if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s2.push(s1);
          s1 = peg$parseletters();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = s0;
        s2 = peg$c8();
      }
      s0 = s2;

      return s0;
    }



    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
  })();