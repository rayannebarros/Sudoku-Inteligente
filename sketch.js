let cells_problem = Array(9).fill().map(() => Array(9).fill(0));
let cells_solution = Array(9).fill().map(() => Array(9).fill(0));

function setup() {
  createCanvas(950, 450);

  //cria um grid com numeros aleatorios
  grid = new makeSudoku();

  let a = 0;
  let b = 0;

  //instancia uma cell, com cada um dos valores do grid e insere a cell na matriz cells
  for (let i = 0; i < 9; i++) {
    if (i != 0) b += 50;
    a = 0;
    for (let j = 0; j < 9; j++) {
      cells_problem[i][j] = new cell(a, b, i, j, grid[i][j]);
      a = a + 50;
    }
  }

  
  let solution = JSON.parse(JSON.stringify(grid));

  new solver(solution);

  console.log("PROBLEMA: ", grid);
  console.log("SOLUÇÃO:" , solution);

  
  a = 500;
  b = 0;
  for (let i = 0; i < 9; i++) {
    if (i != 0) b += 50;
    a = 500;
    for (let j = 0; j < 9; j++) {
      cells_solution[i][j] = new cell(a, b, i, j, solution[i][j]);
      a = a + 50;
    }
  }


}

function draw() {
  background(51);

  //desenha as listras separam as 9 matrizes
  new createNineBoxes().show();

  //desenha as celulas (que contem os valores aleatorios do grid)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells_problem[i][j].show();
    }
  }

  
  //desenha as celulas (o RESULTADO do grid, ou seja, o array solution)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells_solution[i][j].reshow();
    }
  }

}

function cell(a, b, i, j, num) {
  this.a = a;
  this.b = b;
  this.i = i;
  this.j = j;
  this.num = num;


  this.show = function () {
    //se for a matriz gerada pelo make Sudoku, imprime desta forma

    noFill();
    stroke(255);
    rect(this.a, this.b, 50, 50);

    fill(255);
    textSize(32);
    text(this.num, a + 17, b + 40);

  }

  this.reshow = function () {

    noFill();
    stroke(255);
    rect(this.a, this.b, 50, 50);

    fill(100);
    textSize(32);
    text(this.num, a + 17, b + 40);
  }
}

function createNineBoxes() {
  this.show = function () {
    push();
    strokeWeight(6);
    stroke(255);
    line(150, 0, 150, height);
    line(300, 0, 300, height);
    line(0, 150, 450, 150);
    line(0, 300, 450, 300);

    line(650, 0, 650, height);
    line(800, 0, 800, height);
    line(500, 150, 950, 150);
    line(500, 300, 950, 300);
    pop();
  }
}

function makeSudoku() {
  grid = Array(9).fill().map(() => Array(9).fill(0));

  grid = JSON.parse(JSON.stringify(randomInsertOneValue(grid)));

  new solver(grid)

  grid = JSON.parse(JSON.stringify(addEmpty(grid)));

  return grid;
}

function randomInsertOneValue(matriz){
  for (let i = Math.floor(random(0, 8)); i < 9; i++) {
    for (let j = Math.floor(random(0, 8)); j < 9; j++) {
      if (random() > 0.5) {
        matriz[i][j] = Math.floor(random(1, 10));
        return matriz;
      }
    }
  }
}

function addEmpty(matriz){
  for (let p_X = 0; p_X < 3; p_X++) {
    for (let p_Y = 0; p_Y < 3; p_Y++) {
      const box_X = p_X;
      const box_Y = p_Y;
      let removedElements = 0;
      const suposeToRemove = Math.floor(random(4, 7));

      while (removedElements < suposeToRemove) {
        for (let i = box_Y * 3; i < box_Y * 3 + 3; i++) {
          for (let j = box_X * 3; j < box_X * 3 + 3; j++) {
            if (random() > 0.5) {
              matriz[i][j] = 0;
              removedElements++;
            }

            if(removedElements >= suposeToRemove ) break;
          }

          if(removedElements >= suposeToRemove ) break;
        }
      }
    }
  }

  return matriz;
}

function solver(matriz) {
  let find = []
  find = findEmpty(matriz);

  if (find === false) {
    console.log("entrou no if");
    return true;
  }
  else {
    console.log("entrou no else");
    var [row, col] = find;
    console.log(row, col);
  }

  for (let i = 1; i < 10; i++) {
    if (checkValid(matriz, i, [row, col])) {
      matriz[row][col] = i;

      if (solver(matriz)) return true;

      matriz[row][col] = 0
    }
  }
}

function checkValid(matriz, num, pos) {

  //check row
  for (let i = 0; i < 9; i++) {
    if (matriz[pos[0]][i] == num & pos[1] != i) return false;
  }

  //check column
  for (let i = 0; i < 9; i++) {
    if (matriz[i][pos[1]] == num & pos[0] != i) return false;
  }

  let row = pos[0];
  let col = pos[1];

  //check box
  let box_x = Math.floor(row / 3);
  let box_y = Math.floor(col / 3);

  for (let i = box_x * 3; i < box_x * 3 + 3; i++) {
    for (let j = box_y * 3; j < box_y * 3 + 3; j++) {
      if (matriz[i][j] == num & (i, j) != pos) return false;
    }
  }

  return true;
}

function findEmpty(matriz) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matriz[i][j] == 0) {
        return [i, j];
      }
    }
  }
  return false;
}
