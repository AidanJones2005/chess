let board = new Board();
board.loadPieces();
function Board() {
    const obj = {};
    obj.pieces = [];
    obj.loadPieces = function(){
        $.getJSON( "board.json", function( data ) {
            boardData = data;
            $.each(data, function (key, val) {
                let genteam = key;
                $.each(val, function (key, val) {
                    let coords = val["y"] + val["x"];
                    $("#" + coords + "s").html("<button class=\"button\" data-piece-name=\"" + key + "\" data-piece-team='" + genteam + "' data-piece-type=\"" + val["type"] + "\" id=\"" + coords + "p\">" + unicode[val["type"]] + "</button>");
                    console.log(coords);
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