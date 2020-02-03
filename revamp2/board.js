// Board object
function Board() {
    const obj = {};
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
                    obj.team[team].piece[key] = new Piece(val["x"], val["y"], val["type"]);
                });
            });
        });
    };
    obj.team = {};

}