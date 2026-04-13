function getBoardPool(){

return [

/* 1 */
[
  [null,{type:"queen",moves:0},null,null,null,null],
  [null,{type:"king",moves:0},null,null,null,null],
  [null,null,{type:"knight",moves:0},null,null,null],
  [null,{type:"pawn",moves:0},null,null,{type:"rook",moves:0},null],
  [{type:"pawn",moves:0},null,null,{type:"knight",moves:0},null,null],
  [null,null,null,null,null,null]
],//good

/* 2 */
[
  [{type:"bishop",moves:0},{type:"rook",moves:0},null,{type:"rook",moves:0},null,null],
  [null,{type:"pawn",moves:0},null,null,null,null],
  [{type:"pawn",moves:0},null,null,null,null,{type:"bishop",moves:0}],
  [{type:"queen",moves:0},null,null,{type:"king",moves:0},{type:"pawn",moves:0},null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,{type:"knight",moves:0}]
],//good

/* 3 */
[
  [null,{type:"queen",moves:0},null,{type:"rook",moves:0},null,null],
  [null,{type:"pawn",moves:0},{type:"rook",moves:0},null,null,null],
  [{type:"rook",moves:0},{type:"pawn",moves:0},null,null,null,null],
  [{type:"pawn",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,{type:"pawn",moves:0},{type:"queen",moves:0},{type:"pawn",moves:0},{type:"king",moves:0},null]
],//good

/* 4 */
[
  [{type:"knight",moves:0},null,null,null,null,null],
  [null,null,{type:"knight",moves:0},null,null,{type:"queen",moves:0}],
  [null,null,{type:"king",moves:0},{type:"pawn",moves:0},null,null],
  [null,{type:"rook",moves:0},null,{type:"knight",moves:0},null,null],
  [null,null,{type:"rook",moves:0},null,null,null],
  [{type:"knight",moves:0},null,null,{type:"pawn",moves:0},null,null]
],//good

/* 5 */
[
  [{type:"king",moves:0},null,null,null,null,null],
  [{type:"pawn",moves:0},{type:"rook",moves:0},null,null,{type:"knight",moves:0},null],
  [{type:"queen",moves:0},{type:"rook",moves:0},null,null,null,{type:"bishop",moves:0}],
  [null,null,null,null,{type:"bishop",moves:0},{type:"pawn",moves:0}],
  [null,null,null,null,null,{type:"pawn",moves:0}],
  [null,null,null,null,{type:"knight",moves:0},null]
],//good

/* 6 */
[
  [{type:"knight",moves:0},null,{type:"knight",moves:0},null,null,null],
  [null,null,null,null,null,null],
  [null,{type:"knight",moves:0},null,null,{type:"knight",moves:0},null],
  [null,null,{type:"knight",moves:0},null,null,null],
  [{type:"knight",moves:0},null,null,{type:"knight",moves:0},null,null],
  [{type:"king",moves:0},{type:"knight",moves:0},null,null,null,{type:"knight",moves:0}]
],//good

/* 7 */
[
  [{type:"rook",moves:0},null,null,null,null,{type:"king",moves:0}],
  [null,null,null,null,{type:"pawn",moves:0},null],
  [null,null,null,null,null,{type:"pawn",moves:0}],
  [null,{type:"knight",moves:0},null,null,null,null],
  [null,{type:"bishop",moves:0},null,null,null,null],
  [{type:"pawn",moves:0},null,null,null,null,{type:"queen",moves:0}]
],//good

/* 8 */
[
  [{type:"king",moves:0},null,null,null,null,null],
  [null,{type:"pawn",moves:0},null,null,null,null],
  [{type:"pawn",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null]
],//good

/* 9 */
[
  [null,{type:"king",moves:0},null,{type:"bishop",moves:0},null,null],
  [null,{type:"pawn",moves:0},{type:"pawn",moves:0},null,null,null],
  [{type:"pawn",moves:0},null,{type:"knight",moves:0},null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,{type:"queen",moves:0},null,null,{type:"bishop",moves:0}]
],//g

/* 10 */
[
  [null,null,null,null,null,{type:"pawn",moves:0}],
  [null,null,null,{type:"queen",moves:0},{type:"bishop",moves:0},null],
  [null,{type:"knight",moves:0},null,null,null,{type:"rook",moves:0}],
  [null,null,null,null,null,null],
  [null,null,null,null,{type:"king",moves:0},null],
  [{type:"pawn",moves:0},null,null,null,{type:"rook",moves:0},{type:"rook",moves:0}]
],

[
  [null,null,null,{type:"rook",moves:0},null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"queen",moves:0},null,null,{type:"rook",moves:0},null,null],
  [null,null,{type:"king",moves:0},{type:"bishop",moves:0},null,null]
],

[
  [null,{type:"knight",moves:0},null,{type:"queen",moves:0},null,null],
  [null,null,null,null,null,null],
  [null,null,{type:"pawn",moves:0},null,null,null],
  [null,null,null,{type:"bishop",moves:0},null,null],
  [null,{type:"knight",moves:0},null,{type:"king",moves:0},null,null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,{type:"king",moves:0},null,null],
  [{type:"rook",moves:0},null,null,null,{type:"bishop",moves:0},null],
  [{type:"rook",moves:0},null,null,{type:"bishop",moves:0},{type:"queen",moves:0},null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [{type:"bishop",moves:0},{type:"king",moves:0},null,null,null,null],
  [null,{type:"queen",moves:0},null,null,null,null],
  [null,null,{type:"knight",moves:0},null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,{type:"pawn",moves:0},{type:"king",moves:0},null],
  [null,null,null,{type:"queen",moves:0},{type:"bishop",moves:0},null],
  [null,{type:"queen",moves:0},null,null,null,{type:"pawn",moves:0}],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,{type:"rook",moves:0},null],
  [null,{type:"bishop",moves:0},null,null,null,{type:"king",moves:0}],
  [{type:"pawn",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,{type:"rook",moves:0},{type:"king",moves:0},null],
  [null,null,{type:"bishop",moves:0},{type:"rook",moves:0},null,null],
  [null,{type:"pawn",moves:0},null,null,null,null],
  [null,null,null,null,null,null]
],

[
  [{type:"queen",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,{type:"queen",moves:0},null,null],
  [null,null,null,null,{type:"king",moves:0},null],
  [{type:"queen",moves:0},null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,{type:"king",moves:0},{type:"bishop",moves:0},null],
  [null,{type:"rook",moves:0},null,null,null,{type:"bishop",moves:0}],
  [null,null,null,null,{type:"pawn",moves:0},null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},{type:"pawn",moves:0},null,null,null,null],
  [{type:"king",moves:0},null,{type:"bishop",moves:0},null,null,null],
  [null,{type:"pawn",moves:0},null,{type:"pawn",moves:0},null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null]
],

[
  [{type:"rook",moves:0},null,null,{type:"rook",moves:0},null,null],
  [null,null,null,null,null,null],
  [null,null,{type:"king",moves:0},{type:"queen",moves:0},null,null],
  [null,null,null,{type:"queen",moves:0},null,null],
  [null,null,null,null,{type:"rook",moves:0},null],
  [null,null,null,{type:"pawn",moves:0},null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,{type:"bishop",moves:0}],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"king",moves:0},{type:"pawn",moves:0},null,null,null,null],
  [null,{type:"knight",moves:0},null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,{type:"pawn",moves:0},null,null,null],
  [{type:"knight",moves:0},{type:"bishop",moves:0},null,{type:"knight",moves:0},{type:"bishop",moves:0},{type:"king",moves:0}],
  [null,null,null,null,null,{type:"pawn",moves:0}],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,{type:"king",moves:0}],
  [{type:"bishop",moves:0},null,null,null,{type:"queen",moves:0},null],
  [null,null,null,{type:"rook",moves:0},null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,null,{type:"king",moves:0},null],
  [null,{type:"queen",moves:0},null,{type:"queen",moves:0},null,null],
  [null,null,null,{type:"knight",moves:0},null,null],
  [null,null,null,null,{type:"pawn",moves:0},null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,{type:"queen",moves:0}],
  [null,{type:"knight",moves:0},null,null,null,null],
  [null,{type:"king",moves:0},{type:"pawn",moves:0},null,null,null],
  [{type:"bishop",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,null,null]
],

[
  [null,null,null,null,null,{type:"rook",moves:0}],
  [null,null,{type:"queen",moves:0},null,null,null],
  [null,{type:"king",moves:0},null,null,null,null],
  [null,null,null,null,null,null],
  [null,{type:"queen",moves:0},{type:"rook",moves:0},null,null,{type:"bishop",moves:0}],
  [null,null,null,null,null,null]
],//27

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,{type:"queen",moves:0},{type:"king",moves:0},null,null],
  [null,null,{type:"pawn",moves:0},null,null,null],
  [{type:"bishop",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,{type:"bishop",moves:0},null,null],
  [null,null,{type:"bishop",moves:0},null,null,null],
  [null,{type:"knight",moves:0},{type:"king",moves:0},{type:"pawn",moves:0},null,null],
  [null,{type:"rook",moves:0},null,null,null,null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,{type:"knight",moves:0},null],
  [null,null,null,{type:"bishop",moves:0},null,{type:"king",moves:0}],
  [null,null,{type:"bishop",moves:0},null,null,null],
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null]
],

[
  [null,null,null,null,null,{type:"bishop",moves:0}],
  [null,null,null,null,null,null],
  [{type:"knight",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,{type:"rook",moves:0},{type:"king",moves:0},null,null,null],
  [null,null,null,{type:"bishop",moves:0},null,null]
],

[
  [null,null,null,null,null,null],
  [{type:"bishop",moves:0},{type:"bishop",moves:0},{type:"king",moves:0},null,null,null],
  [{type:"queen",moves:0},null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,null,null]
],

[
  [{type:"pawn",moves:0},null,null,{type:"rook",moves:0},{type:"queen",moves:0},{type:"king",moves:0}],
  [null,null,{type:"knight",moves:0},{type:"pawn",moves:0},null,null],
  [null,{type:"knight",moves:0},null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"rook",moves:0},null,null,null,null,null]
],//33

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"king",moves:0},null,null,null,null,null],
  [{type:"queen",moves:0},null,{type:"pawn",moves:0},null,null,null],
  [null,null,null,{type:"queen",moves:0},null,null]
],

[
  [null,null,null,null,null,null],
  [null,null,null,null,null,null],
  [{type:"queen",moves:0},null,{type:"queen",moves:0},null,null,null],
  [null,null,null,{type:"king",moves:0},null,null],
  [{type:"bishop",moves:0},null,null,null,null,{type:"queen",moves:0}],
  [null,{type:"bishop",moves:0},null,null,null,null]
]

];

}