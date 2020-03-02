// Stores data for an individual piece 
function Piece(x, y, type, team) {
    let obj = {};

    // Piece type to unicode conversion
    const unicode = {
        "black": {
            "rook": "&#9814;",
            "knight": "&#9816;",
            "bishop": "&#9815;",
            "queen": "&#9813;",
            "king": "&#9812;",
            "pawn": "&#9817;"
        },
        "white": {
            "rook": "&#9820;",
            "knight": "&#9822;",
            "bishop": "&#9821;",
            "queen": "&#9819;",
            "king": "&#9818;",
            "pawn": "&#9823;"
        }
    };

    // Store piece data
    obj.row = y;
    obj.col = x;
    obj.type = type;
    obj.team = team;

    // Create piece html
    let piece = $("<button></button>");
    piece.addClass("button");
    piece.append(unicode[team][type]);
    piece.attr("data-x", x);
    piece.attr("data-y", y);
    piece.attr("id", x + "-" + y);

    // Add piece to chessboard
    chessboard.squares[y-1][x-1].append(piece);
    
    return obj;
}