// Stores data for an individual piece 
function Piece(x, y, type, team, board) {
    let obj = {};
    obj.row = y;
    obj.col = x;
    obj.type = type;
    obj.team = team;
    let piece = $("<button></button>");
    piece.attr("data-x", x);
    piece.attr("data-y", y);
    piece.attr("id", x + "-" + y);
    board.squares[y][x].elem.append(piece);

}