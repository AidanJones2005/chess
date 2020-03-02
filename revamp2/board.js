// Board object
function Board() {
    const obj = {};
    obj.team = {};
    obj.squares = {};
    obj.generateBoard = function (x, y) {
        let row = 0;
        let color = false;
        for (let yi=0; yi<=y; yi++) {
            obj.squares[yi] = [];
            for (let xi = 0; xi <= x; xi++) {
                obj.squares[yi][xi] = new Square(xi, yi, color);
                color = !color;
            }
            color = !color;
        }
    };
    obj.loadPieces = function(){
        // Ajax request to get board data
        $.getJSON( "board.json", function( data ) {
            boardData = data;
            // Loop through available teams
            $.each(data, function (key, val) {
                // Piece's team
                let team = key;
                obj.team[team] = new Team(team);
                // Loop through pieces in team
                $.each(val, function (key, val) {
                    let coords = val["y"] + val["x"];
                    obj.team[team].piece[key] = new Piece(val["x"], val["y"], val["type"], team);
                });
            });
        });
    };
    return obj;
}
