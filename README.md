# Sudoku-Inteligente
Projeto de Implementação de um Sudoku Inteligente, realizado na disciplina de Inteligência Artificial, no período 2020.1

1 - Objetivo: desenvolver um programa que simule um comportamento
de um agente auxiliar de jogador de SUDOKU.

2 - Problema: SUDOKU é um jogo de lógica matemática
que consiste em nove matrizes onde cada uma delas é formada por
nove posições. Cada posição deve ser preenchida por um valor entre
1 e 9, sendo que em cada matriz, linha ou coluna não pode haver
números repetidos. Inicialmente cada matriz tem algumas posições
preenchidas com valores aleatórios em posições aleatórias. Esses valores
são atribuidos pelo programa no início de cada partida e os demais são
escolhidos pelo agente.

3 - Solução: em cada execução, o programa deve escolher
aleatoriamente quais posições devem ser preenchidas. A quantidade
de posições deve estar entre, inclusive, 3 e 5. De forma semelhante,
as posições devem ser escolhidas aleatoriamente em cada execução. Os
números escolhidos podem ser qualquer um entre 1 e 9. O jogo deve
exibir a matriz maior (consistindo das nove matrizes menores) e solicitar ao usuário (i) em qual matriz menor deverá ocorrer a jogada e (ii) em qual posição da matriz deverá ser feita a jogada. Após a escolha da posição, o programa deve informar quais são os valores que podem ser escolhidos ou se ela já está preenchida. Caso o usuário escolha um valor diferente, o programa deve exibir uma mensagem de erro. Quando todas as posições estiverem preenchidas, o programa deve informar quantas jogadas foram realizadas.
