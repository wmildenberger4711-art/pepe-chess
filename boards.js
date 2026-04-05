function getBoardPool(){

return [

/* 1 */
[
  [null,null,null,null,{type:"bishop",moves:0},null],
  [null,{type:"king",moves:0},null,null,null,null],
  [null,null,{type:"queen",moves:0},null,{type:"knight",moves:0},null],
  [{type:"rook",moves:0},{type:"pawn",moves:0},null,null,null,null],
  [null,null,null,{type:"pawn",moves:0},null,null],
  [null,null,null,null,null,null]
],//

/* 2 */
[
  [null,null,null,{type:"knight",moves:0},null,null],
  [{type:"knight",moves:0},null,null,null,null,null],
  [null,null,{type:"bishop",moves:0},null,null,null],
  [null,{type:"rook",moves:0},null,null,null,null],
  [{type:"pawn",moves:0},null,null,{type:"king",moves:0},null,null],
  [null,null,null,null,null,null]
],

/* 3 */
[
  [{type:"rook",moves:0},null,null,null,null,{type:"king",moves:0}],
  [null,null,{type:"pawn",moves:0},null,null,null],
  [null,{type:"pawn",moves:0},null,null,{type:"knight",moves:0},null],
  [null,null,null,{type:"bishop",moves:0},null,null],
  [{type:"queen",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null]
],//

/* 4 */
[
  [null,null,{type:"rook",moves:0},{type:"queen",moves:0},null,null],
  [null,null,null,null,{type:"knight",moves:0},null],
  [null,{type:"rook",moves:0},null,{type:"pawn",moves:0},null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,{type:"king",moves:0},{type:"bishop",moves:0},null]
],//

/* 5 */
[
  [null,null,null,{type:"bishop",moves:0},null,null],
  [{type:"queen",moves:0},null,{type:"knight",moves:0},null,null,null],
  [{type:"rook",moves:0},null,null,{type:"king",moves:0},null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,{type:"bishop",moves:0}],
  [null,null,null,null,{type:"pawn",moves:0},null]
],//

/* 6 */
[
  [{type:"knight",moves:0},null,{type:"knight",moves:0},null,null,null],
  [null,null,null,null,null,null],
  [null,{type:"knight",moves:0},null,null,{type:"knight",moves:0},null],
  [null,null,{type:"knight",moves:0},null,null,null],
  [{type:"knight",moves:0},null,null,{type:"knight",moves:0},null,null],
  [{type:"king",moves:0},{type:"knight",moves:0},null,null,null,{type:"knight",moves:0}]
],

/* 7 */
[
  [null,{type:"queen",moves:0},null,{type:"queen",moves:0},null,null],
  [null,null,null,null,null,null],
  [{type:"knight",moves:0},null,{type:"king",moves:0},null,null,{type:"rook",moves:0}],
  [{type:"bishop",moves:0},null,null,{type:"pawn",moves:0},null,{type:"rook",moves:0}],
  [null,{type:"knight",moves:0},{type:"pawn",moves:0},null,{type:"pawn",moves:0},null],
  [null,null,null,null,null,null]
],//

/* 8 */
[
  [{type:"king",moves:0},null,null,null,null,null],
  [null,{type:"pawn",moves:0},null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null]
],//
/* 9 */
[
  [null,{type:"rook",moves:0},{type:"queen",moves:0},null,{type:"knight",moves:0},null],
  [null,null,null,null,null,null],
  [{type:"bishop",moves:0},null,null,{type:"pawn",moves:0},null,null],
  [null,null,null,{type:"king",moves:0},null,null],
  [null,null,{type:"knight",moves:0},null,null,null],
  [null,null,null,null,null,null]
],//

/* 10 */
[
  [null,null,{type:"queen",moves:0},null,{type:"queen",moves:0},null],
  [null,null,null,null,{type:"queen",moves:0},null],
  [null,null,null,null,null,null],
  [null,null,{type:"king",moves:0},null,{type:"queen",moves:0},{type:"queen",moves:0}],
  [null,null,null,null,null,null],
  [null,null,{type:"queen",moves:0},null,{type:"queen",moves:0},null]
]

];

}