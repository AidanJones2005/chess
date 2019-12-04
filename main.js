// Define the variables that we are using
// ID of the square that was clicked
let square;

// ID of the piece that was clicked
let piece;

// Substring of the variable piece, row of the currently selected piece
let row;

// Substring of the variable piece, column of the currently selected piece
let col;

// Array of row ids
var abc = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Array of column ids
var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

// Array of highlighted squares (not used yet)
let plist = [];


// Detect when a chess piece is clicked
$(".chessboard").on("click", '.button,.button1', function () {
    // Get the ID of the piece that was clicked
    piece = event.target.id;

    // Unhighlight all squares
    $(".active").removeClass("active");

    // Check the type of the piece that was clicked
    switch ($(event.target).attr("data-piece-type")) {
        // if u cant figure this code out delete system32
        case "white-rook":
            pathPiece(piece, "white", "rook");
            break;
        case "white-bishop":
            pathPiece(piece, "white", "bishop");
            break;
        case "white-knight":
            pathPiece(piece, "white", "knight");
            break;
        case "white-queen":
            pathPiece(piece, "white", "queen");
            break;
        case "white-king":
            pathPiece(piece, "white", "king");
            break;
        case "white-pawn":
            pathPiece(piece, "white", "pawn");
            break;
        case "black-rook":
            pathPiece(piece, "black", "rook");
            break;
        case "black-bishop":
            pathPiece(piece, "black", "bishop");
            break;
        case "black-knight":
            pathPiece(piece, "black", "knight");
            break;
        case "black-queen":
            pathPiece(piece, "black", "queen");
            break;
        case "black-king":
            pathPiece(piece, "black", "king");
            break;
        case "black-pawn":
            pathPiece(piece, "black", "pawn");
            break;
        default:
            alert("This piece doesn't have an identifier!");
    }
});

// Detect when a square is clicked
$(".square").click(function (event) {

    // Get square ID
    square = event.target.id.substring(0, 2);

    // Do nothing if there isn't a piece selected or if the piece selected is in the same position as the selected square
    if (piece == "" || piece == square) {
        return;
    }

    // Check if the square selected is highlighted (meaning that it has been checked and is a valid place to move to.)
    if ($("#" + square + "s").hasClass("active")) {
        // Set the selected square to the selected piece
        $("#" + square + "s").html($("#" + piece + "s").html());

        // Remove piece from old position
        $("#" + piece + "s").html("");

        // Change piece's ID to the location of it's new position
        $("#" + piece + "p").attr("id", square + "p");

        // Unhighlight all highlighted squares
        $(".active").removeClass("active");

        // Disselect piece
        piece = "";
    }
});

// Don't question this.
// Gets valid path for the selected piece, and highlights that valid path
function pathPiece(id, team, type) {
    // Get the ID of the piece
    piece = id.substring(0, 2);

    // Get the row of the piece
    row = id.substring(0, 1);

    // Get the column of the piece
    col = id.substring(1, 2);
    let continuecheck = true;
    let irow;
    let icol;
    switch (type) {
        // this part is self explainitory
        case "rook":
            pathNESW("n", team, "-1", row, col);
            pathNESW("e", team, "-1", row, col);
            pathNESW("s", team, "-1", row, col);
            pathNESW("w", team, "-1", row, col);
            break;
        case "bishop":
            // Highlight to the left side of the bishop
            console.log("bishop clicked");
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("bishop looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow - 1];
                let sncol = num[icol - 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol > 0 && abc.indexOf(snrow) > -1) {
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    continuecheck = false;
                }
                irow--;
                icol--;
            }
            // Highlight to the right side of the bishop
            continuecheck = true;
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("bishop looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow - 1];
                let sncol = num[icol + 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol < 9 && abc.indexOf(snrow) > -1) {
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    continuecheck = false;
                }
                irow--;
                icol++;
            }
            // Highlight to the bottom left side of the bishop
            continuecheck = true;
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("bishop looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow + 1];
                let sncol = num[icol - 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol > 0 && abc.indexOf(snrow) < 8) {
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    continuecheck = false;
                }
                irow++;
                icol--;
            }
            // Highlight to the bottom right side of the bishop
            continuecheck = true;
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("bishop looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow + 1];
                let sncol = num[icol + 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol < 9 && abc.indexOf(snrow) < 8) {
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false br on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    console.log("check return false br excede on " + snrow + ":" + sncol);
                    continuecheck = false;
                }
                irow++;
                icol++;
            }
            break;

        case "queen":
            // Highlight to the left side of the queen
            console.log("queen clicked");
            continuecheck = true;
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("queen looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow - 1];
                let sncol = num[icol - 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol > 0 && abc.indexOf(snrow) > -1 && sncol != null && snrow != null) {
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    continuecheck = false;
                }
                irow--;
                icol--;
            }
            // Highlight to the right side of the queen
            continuecheck = true;
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("queen looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow - 1];
                let sncol = num[icol + 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol < 9 && abc.indexOf(snrow) > -1) {
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    continuecheck = false;
                }
                irow--;
                icol++;
            }
            // Highlight to the bottom left side of the queen
            continuecheck = true;
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("queen looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow + 1];
                let sncol = num[icol - 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol > 0 && abc.indexOf(snrow) < 8 && sncol != null && snrow != null) {
                    console.log(snrow + ":" + sncol);
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    continuecheck = false;
                }
                irow++;
                icol--;
            }
            // Highlight to the bottom right side of the queen
            continuecheck = true;
            irow = abc.indexOf(row.toString());
            icol = num.indexOf(col.toString());
            while (continuecheck) {
                console.log("queen looping");
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let snrow = abc[irow + 1];
                let sncol = num[icol + 1];
                // If there is a piece blocking the path, stop highlighting.
                if (sncol < 9 && abc.indexOf(snrow) < 8 && sncol != null && snrow != null) {
                    if (!highlight(snrow.toString() + sncol.toString(), false)) {
                        console.log("check return false br on " + snrow + ":" + sncol);
                        if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                            continuecheck = false;
                        } else {
                            highlight(snrow.toString() + sncol.toString(), true);
                            continuecheck = false;
                        }
                    }
                } else {
                    console.log("check return false br excede on " + snrow + ":" + sncol);
                    continuecheck = false;
                }
                irow++;
                icol++;
            }
            // Highlight to the left side of the queen
            for (var i = num.indexOf(col.toString()) - 1; i > -1; i--) {
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let sn = num[i];

                // If there is a piece blocking the path, stop highlighting.
                if (!highlight(row.toString() + sn.toString(), false)) {
                    if ($("#" + row.toString() + sn.toString() + "p").attr("data-piece-type").includes(team)) {
                        break;
                    } else {
                        highlight(row.toString() + sn.toString(), true);
                        break;
                    }
                }
            }

            // Highlight to the right side of the queen
            for (var i = num.indexOf(col.toString()) + 1; i < 8; i++) {
                // Get the current column in the loop, and initialize "sn" (current selected row)
                let sn = num[i];

                // If there is a piece blocking the path, stop highlighting.
                if (!highlight(row.toString() + sn.toString(), false)) {
                    if ($("#" + row.toString() + sn.toString() + "p").attr("data-piece-type").includes(team)) {
                        break;
                    } else {
                        highlight(row.toString() + sn.toString(), true);
                        break;
                    }
                }
            }

            // Highlight from the queen downwards
            for (var i = abc.indexOf(row.toString()) + 1; i < 8; i++) {
                // Get the current row in the loop, and initialize "sn" (current selected row)
                let sn = abc[i];

                // If there is a piece blocking the path, stop highlighting.
                if (!highlight(sn.toString() + col.toString(), false)) {
                    if ($("#" + sn.toString() + col.toString() + "p").attr("data-piece-type").includes(team)) {
                        break;
                    } else {
                        highlight(sn.toString() + col.toString(), true);
                        break;
                    }
                }
            }
            // Highlight from the queen upwards
            for (var i = abc.indexOf(row.toString()) - 1; i > 0; i--) {
                // Get the current row in the loop, and initialize "sn" (current selected row)
                let sn = abc[i];

                // If there is a piece blocking the path, stop highlighting.
                if (!highlight(sn.toString() + col.toString(), false)) {
                    if ($("#" + sn.toString() + col.toString() + "p").attr("data-piece-type").includes(team)) {
                        break;
                    } else {
                        highlight(sn.toString() + col.toString(), true);
                        break;
                    }
                }
            }
            break;

        default:
            // The piece doesn't have a correct identifier
            console.log("Type is not correct.");
            break;
    }

    // Execute different code based on team
    switch (team) {
        case "white":

            switch (type) {
                // this part is self explainitory
                case "pawn":
                    // Highlight the space directly in front of the pawn
                    if (highlight(abc[abc.indexOf(row) - 1].toString() + col.toString(), false)) {
                        // If the pawn is in it's starting position, highlight two spaces ahead of it
                        if (row == "G") {
                            highlight(abc[abc.indexOf(row) - 2].toString() + col.toString(), false);
                        }
                    }
                    break;
                default:
                    // The piece isn't a pawn
                    console.log("bad");
                    break;
            }

            break;
        case "black":
            switch (type) {
                case "pawn":
                    if (highlight(abc[abc.indexOf(row) + 1].toString() + col.toString(), false)) {
                        if (row == "B") {
                            highlight(abc[abc.indexOf(row) + 2].toString() + col.toString(), false);
                        }
                    }
                    break;
                default:
                    // Piece isnt pawn
                    console.log("bad");
                    break;
            }

            break;
        default:
            console.log("Team is not correct");
            break;
    }
}

function highlight(squid, force) {
    // Check if space contains piece
    if ($("#" + squid + "p").length > 0 && force == false) {
        // Square contains piece, return false
        return false;
    } else {
        // Square is empty, highlight square and return true
        if (force) {
            console.log("force = " + force);
        }
        $("#" + squid + "s").addClass("active");
        return true;
    }
}

function pathNESW(nesw, team, limit, row, col) {
    var op;
    var lim;
    var dir;
    var loca;
    var list = [];
    switch (nesw) {
        case "n":
            op = ">";
            lim = "0";
            dir = -1;
            list = abc;
            loca = abc.indexOf(row.toString());
            break;
        case "e":
            op = "<";
            lim = "9";
            dir = 1;
            list = num;
            loca = num.indexOf(col.toString());
            break;
        case "s":
            op = "<";
            lim = "8";
            dir = 1;
            list = abc;
            loca = abc.indexOf(row.toString());
            break;
        case "w":
            op = ">";
            lim = "0";
            dir = -1;
            list = num;
            loca = num.indexOf(col.toString());
            break;
        default:
            console.log("Incorrect direction identifier");
            break;
    }
    for (var i = loca + dir; eval(i + op + lim); i = i + dir) {
        // Get the current row in the loop, and initialize "sn" (current selected row)
        let srow;
        let scol;
        if (nesw == "s" || nesw == "n") {
            srow = list[i];
            scol = col;
            console.log("vertical " + srow);
        } else {
            srow = row;
            scol = list[i];
            console.log("horizontal " + scol + " : " + i);
        }

        // If there is a piece blocking the path, stop highlighting.
        if (!highlight(srow.toString() + scol.toString(), false)) {
            if ($("#" + srow.toString() + scol.toString() + "p").attr("data-piece-type").includes(team)) {
                break;
            } else {
                highlight(srow.toString() + scol.toString(), true);
                break;
            }
        }
    }
}