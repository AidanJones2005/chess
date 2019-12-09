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
            console.log("This piece doesn't have an identifier!");
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
        // this part is self explanatory
        case "rook":
            pathNESW("n", team, -1, row, col, true);
            pathNESW("e", team, -1, row, col, true);
            pathNESW("s", team, -1, row, col, true);
            pathNESW("w", team, -1, row, col, true);
            break;
        case "bishop":
            pathDiag("ne", team, -1, row, col);
            pathDiag("nw", team, -1, row, col);
            pathDiag("se", team, -1, row, col);
            pathDiag("sw", team, -1, row, col);
            break;

        case "queen":
            pathDiag("ne", team, -1, row, col);
            pathDiag("nw", team, -1, row, col);
            pathDiag("se", team, -1, row, col);
            pathDiag("sw", team, -1, row, col);
            pathNESW("n", team, -1, row, col, true);
            pathNESW("e", team, -1, row, col, true);
            pathNESW("s", team, -1, row, col, true);
            pathNESW("w", team, -1, row, col, true);
            break;
        case "king":
            pathDiag("ne", team, 1, row, col);
            pathDiag("nw", team, 1, row, col);
            pathDiag("se", team, 1, row, col);
            pathDiag("sw", team, 1, row, col);
            pathNESW("n", team, 1, row, col, true);
            pathNESW("e", team, 1, row, col, true);
            pathNESW("s", team, 1, row, col, true);
            pathNESW("w", team, 1, row, col, true);
            break;
        case "knight":
            let rowpos = abc.indexOf(row.toString());
            let colpos = num.indexOf(col.toString());
            console.log("knight: " + abc[rowpos-2] + num[colpos+1]);

            // Up and down
            highlight(abc[rowpos-2] + num[colpos+1], true, team);
            highlight(abc[rowpos-2] + num[colpos-1], true, team);
            highlight(abc[rowpos+2] + num[colpos+1], true, team);
            highlight(abc[rowpos+2] + num[colpos-1], true, team);

            // Left and right
            highlight(abc[rowpos+1] + num[colpos+2], true, team);
            highlight(abc[rowpos-1] + num[colpos+2], true, team);
            highlight(abc[rowpos+1] + num[colpos-2], true, team);
            highlight(abc[rowpos-1] + num[colpos-2], true, team);
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
                        if (row == "G") {
                            pathNESW("n", team, 2, row, col, false);
                        } else {
                            pathNESW("n", team, 1, row, col, false);
                        }
                    break;
                default:
                    // The piece isn't a pawn
                    break;
            }

            break;
        case "black":
            switch (type) {
                case "pawn":
                    if (row == "B") {
                        pathNESW("s", team, 2, row, col, false);
                    } else {
                        pathNESW("s", team, 1, row, col, false);
                    }
                    break;
                default:
                    // Piece isn't pawn
                    break;
            }

            break;
        default:
            console.log("Team is not correct");
            break;
    }
}

function highlight(squid, attack, team) {
    // Check if space contains piece
    if ($("#" + squid + "p").length > 0 && attack == false) {
        // Square contains piece, return false
        return false;
    } else {
        // Square is empty or attack == true, highlight square and return true after checking what team occupies the space
        if ($("#" + squid + "p").length > 0) {
            if ($("#" + squid + "p").attr("data-piece-type").includes(team)) {
                return false;
            } else {
                $("#" + squid + "s").addClass("active");
            }
        } else {
            $("#" + squid + "s").addClass("active");
            return true;
        }
        return true;
    }
}

function pathNESW(nesw, team, limit, row, col, attack) {
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
         if (limit !== 0) {
             limit--;
         } else {
            return;
         }
        // Get the current row in the loop, and initialize "sn" (current selected row)
        let srow;
        let scol;
        if (nesw == "s" || nesw == "n") {
            srow = list[i];
            scol = col;
        } else {
            srow = row;
            scol = list[i];
        }

        // If there is a piece blocking the path, stop highlighting.
        if (!highlight(srow.toString() + scol.toString(), false, team)) {
            if ($("#" + srow.toString() + scol.toString() + "p").attr("data-piece-type").includes(team)) {
                break;
            } else {
                highlight(srow.toString() + scol.toString(), attack, team);
                break;
            }
        }
    }
}
function pathDiag(direction, team, limit, row, col) {
    let dirNS;
    let dirEW;
    switch (direction) {
        case "nw":
            dirNS = -1;
            dirEW = -1;
            break;
        case "ne":
            dirNS = -1;
            dirEW = 1;
            break;
        case "sw":
            dirNS = 1;
            dirEW = 1;
            break;
        case "se":
            dirNS = 1;
            dirEW = -1;
            break;
    }
    let continuecheck = true;
    irow = abc.indexOf(row.toString());
    icol = num.indexOf(col.toString());
    while (continuecheck) {
        if (limit !== 0) {
            limit--;
        } else {
            return;
        }
        // Get the current column in the loop, and initialize "sn" (current selected row)
        let snrow = abc[irow + dirNS];
        let sncol = num[icol + dirEW];
        // If there is a piece blocking the path, stop highlighting.
        if (sncol != null && snrow != null) {
            if (!highlight(snrow.toString() + sncol.toString(), false, team)) {
                if ($("#" + snrow.toString() + sncol.toString() + "p").attr("data-piece-type").includes(team)) {
                    continuecheck = false;
                } else {
                    highlight(snrow.toString() + sncol.toString(), true, team);
                    continuecheck = false;
                }
            }
        } else {
            continuecheck = false;
        }
        irow = irow + dirNS;
        icol = icol + dirEW;
    }
}
