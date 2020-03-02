// Generate Square
function Square(x, y, color) {
    let obj = {};
    obj.x = x;
    obj.y = y;
    obj.color = color;
    obj.id = x + "-" + y;
    let square = $("<div></div>");
    square.attr("data-x", x);
    square.attr("data-y", y);
    square.attr("id", obj.id);
    square.addClass([color ? "white" : "black", "square"]);
    $(".chessboard").append(square);
    obj.elem = $("#" + obj.id);
    obj.append = function(html) {
      obj.elem.append(html);
    };
    return obj;
}