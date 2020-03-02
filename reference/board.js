let board = new Board();
board.loadPieces();
// Board object
function Board() {
    const obj = {};
    obj.pieces = [];

    // Load places to board.
    obj.loadPieces = function(){
        // Ajax request to get board data
        $.getJSON( "board.json", function( data ) {
            boardData = data;
            // Loop through available teams
            $.each(data, function (key, val) {
                // Piece's team
                let genteam = key;
                // Loop through pieces in team
                $.each(val, function (key, val) {
                    let coords = val["y"] + val["x"];
                    // Display piece on board
                    $("#" + coords + "s").html("<button class=\"button\" data-piece-name=\"" + key + "\" data-piece-team='" + genteam + "' data-piece-type=\"" + val["type"] + "\" id=\"" + coords + "p\">" + unicode[val["type"]] + "</button>");
                    // Add piece to data object.
                    obj.pieces.push(new BoardPiece(val["x"], val["y"], val["type"], genteam));
                });
            });
        });
    };
    obj.turn = 0;
    obj.switchTurn = function(){
        switch(this.turn) {
            case 0:
                this.turn = 1;
                break;
            case 1:
                this.turn = 2;
                break;
        }
    };
    return obj;
}