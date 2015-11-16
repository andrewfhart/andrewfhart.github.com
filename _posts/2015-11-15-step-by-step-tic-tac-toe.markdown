---
layout: post
title:  "Step-by-Step Tic-Tac-Toe"
date:   2015-11-15 17:38:12
categories: cs002 tutorial
---

Overview (Step 0)
=================

One of the most challenging aspects of learning to program is not the strange and unfamiliar syntax of the language, but 
rather the strange and unfamiliar way of thinking about problems. We take so much for granted when we communicate
with one another, because we know the person we're communicating with will be able to fill in the gaps. A computer, however,
being a machine, must have everything explained to it literally, and in great detail. This forces us to think carefully about
our problems, and to become comfortable with breaking a problem down into many discrete parts.

How do we break things down? What is the "right" way to convert an idea into a working piece of code? Unfortunately, there is
no general answer to that question. Just like there are many ways to express an idea in natural language to your friend, there
are many ways to express your idea in a programming language to a computer. Some ways will be more efficient, some will feel
awkward, and some will simply not communicate the message effectively. What is needed is practice. Practice taking a problem
and identifying the sub-problems contained within it. Practice solving those sub-problems. Use the tools that the language
gives you. Get comfortable with how they work, and what their limitations are. More than anything else, you will find that 
practice helps you refine your technique. If you practice regularly, your programs will improve.

Planning is Key
---------------
I've designed this tutorial as a way to share with you the process that I use to implement ideas in code. In this case, we'll be dealing with a relatively simple idea (on the surface): creating an interactive game of Tic-Tac-Toe in which the user and
the computer compete with one another to win the game. Like most problems, this problem has many sub-problems hiding inside of it.
Before reading on, can you think of any? What functionality would we need? What are the rules of the game? What information 
would we be required to keep track of? How will we know when the game is over? How will we know who has won? Whose turn it is?

When faced with a problem like this one, the first thing you should ask yourself is: do I understand what is being asked of me?
Are the requirements clear? What hidden assumptions am I making? Am I assuming, for example, that the user will always go first?
Am I assuming that the size of the board is always 3x3? You are _certainly_ making assumptions. Good programmers are aware of
the assumptions they make. Examine those assumptions: they often tell you about things you'll need to consider when implementing
your solution in code.

Describe the Problem
--------------------

So, how does Tic-tac-toe work?

It's a game, played on a 3x3 grid, where two players take turns claiming cells on the grid using their symbol (traditionally using 
an 'x' for one player and an 'o' for the other) in an attempt to be the first player to mark three adjacent cells . The group of three cells can be either 
all in the same row, all in the same column, or along either of the two principal diagonals of the grid. The game ends when 
the first player successfully marks three adjacent cells (in which case that player is the winner), or when all cells have been
claimed and no valid moves remain (in which case the game results in a tie, or draw). 

Once you feel you understand the problem, you should take a moment to think about what might be the simplest thing you could 
build that might help you get further along. This is where you begin to break the problem of "implementing Tic-tac-toe in c++"
into smaller sub-problems like: "i need a way to display a tic-tac-toe board to the user" and "i need a way to ask the user for
the next move," "i need a way for the computer to determine _its_ own next move," and "i need a way to know when the game is
over." Take a moment to mentally expand this list of sub-problems for yourself before reading on. What else will you need in 
order to actually be able to have the computer and the user play Tic-tac-toe with each other?

So now you have a list of sub-problems you feel are important pieces of the bigger solution. It may turn out that some of those
sub-problems themselves need to be broken down into sub-problems, but for now, let's see if we can focus on arranging what we
have into a scaffold, or blue-print of our final solution. 

Converting to Code
------------------
All of this work, so far, and we haven't written 1 line of c++. A better way of looking at it is: we haven't wasted 1 second
writing code we might possibly never use, or want. But eventually, we need to write code. Let's do something now that will clearly be useful at this point, since we 
know we're going to need it for everything else down the line: let's figure out the minimal amount of 
code we'll need to just draw a tic-tac-toe board.

We don't need to make it perfect. In fact, since we don't have the rest of the functionality in place yet to play the game, we 
probably can't make it perfect, since so many important decisions have yet to be made. All it has to do at this point
is look roughly like a tic-tac-toe board and we'll be happy. This is a sketch. We'll put in the details as we go along. 

Since drawing the board is a nice, self-contained piece of functionality, it makes sense to implement it as a function, which is what we'll do. 

Before that, however, let's spend a few moments thinking about the `main` part of the program that will call the function:

{% highlight c++ %}
#include <iostream>
using namespace std;

int main (int argc, char* argv[])
{
  // State variables
  //
  // Board:
  //     0   1   2
  //   +---+---+---+
  // 0 |   |   | x | x = board[0][2]
  //   +---+---+---+
  // 1 |   |   |   |
  //   +---+---+---+
  // 2 |   |   |   |
  //   +---+---+---+
  int board[3][3];

  drawBoard(board);

}
{% endhighlight %}

OK - We've defined a really simple program that does just two things: (1) it declares a 2-dimensional array (3x3) of integers
which we'll use to represent the current "state" of each of the cells on our board. Hopefully you've thought a bit about the 
cells in the planning phase above. They can be in one of three states: "empty", "owned by the player", "owned by the computer".
When it comes to drawing the board, we'll represent those three states with either an empty space, an `x`, or an `o`.
The second thing this program does is call a (currently non-existant) function `drawBoard(board)`, passing it 
the 2D array of integers we just defined. This seems reasonable: in order to properly draw the board, we're going to need to
know the current state of each of the cells in the board -- and that is what our `board` variable holds.

Notice that I've described things using comments. Just seeing `int board[3][3];` might not tell you much in a few months.
Having those comments to remind you of the assumptions you made when setting up the board will be a big help down the
road.

Let's take a crack at implementing the `drawBoard` function now. To start with, we'll entirely ignore the `board` parameter -- we
haven't initialized it to anything, and have not spent any time thinking about exactly how we'll represent everything. For right
now we just want to get a 3x3 grid up on the screen. Here it is:

{% highlight c++ %}
void drawBoard(int board[][3]) {
  cout << "  " << "  A   B   C  " << endl;
  cout << "  " << "+---+---+---+" << endl;
  for (int row = 0; row < 3; row++) {
    cout << row << " " << "|   |   |   |" << endl;
    cout << " " << " " << "+---+---+---+" << endl;
  }
}
{% endhighlight %}

It's a void function, because it doesn't return anything: it simply draws our board on the screen. It accepts a single parameter,
which is the 2-dimensional array (3x3) that we will eventually use to know what to put in each of the cells, based on the 
current "state" of each cell on the board. Our board is
*always* 3x3, so we'll make that assumption in this function, which saves us having to provide a second "size" parameter. 

In the function body we draw a
3x3 grid of cells using ASCII characters to form the "board". I've included a little extra in the way of labeling, such that
each of the columns can be identified by a letter ("A", "B", "C") and each of the rows by a number ("1", "2", "3"). I chose 
this because that's how you'd access the cells if you were using a spreadsheet program like Excel. Making choices that the 
user is likely to already be familiar with is always a good idea: it cuts down on the amount of learning your users will have
to do in order to use your program.

Click to [download the program in its current state](https://gist.github.com/andrewfhart/926a5d85e303f9b2c610).

Step 1: Making the board work
=============================

Alright, so we've got a board displaying now, and it looks good: except all the cells are empty. If we agree that cells can be in one of three positions, we could use an integer to define it. Perhaps `0` means "empty", `1` means "owned by the user", and `2` means "owned by the computer." If that's the case, we'd better make sure we use the same mapping in our `board` parameter, so that the information that gets passed to `drawBoard` matches our assumptions. If we assume `board` contains the mapping as we just described it, we could improve our `drawBoard` function to better reflect the current state 
of the board (as represented by the `board` parameter). How would you do it? Think about it before you read on.

{% highlight c++ %}
void drawBoard(int board[][3]) {
  cout << "  " << "  A   B   C  " << endl;
  cout << "  " << "+---+---+---+" << endl;
  for (int row = 0; row < 3; row++) {
    cout << row << " ";
    for (int col = 0; col < 3; col++) {
      switch (board[row][col]) {
        case 1: cout << "| " << "x" << " "; break;
        case 2: cout << "| " << "o" << " "; break;
        default:cout << "| " << " " << " "; break;
      }
    }
    cout << "|" << endl;
    cout << " " << " " << "+---+---+---+" << endl;
  }
}
{% endhighlight %}

We've made the decision here that cells with a `1`, which we said above represent cells owned by the user, will be represented on the board by the character `x`, and cells with a `2`, which we said above represent cells owned by the computer, will be represented on the board by the character `o`. That's fine, of course, but it's an example of some of the things we should be thinking about in
the planning phase. We're also using raw numbers (e.g.: `1` and `2`) to represent states. We could (and probably should!) use
an `enum` for this instead, but we can get to that later. We're sketching. 

Let's write a few tests to check how our board performs under different scenarios. In our `main` function, we'll first _initialize_ the board to all zeros (empty), and then fill in a few cells with arbitrary values: 

{% highlight c++ %}
...
// Each board square will be in one of three possible
// states:  0=empty, 1=owned by 'x' (user), 2=owned by 'o' (computer).
int board[3][3] = {};

// Let's test our board by filling in a few cells randomly
board[0][0] = 1;
board[1][1] = 1;
board[2][2] = 1;
board[0][2] = 2;
board[2][0] = 2;

drawBoard(board);
...
{% endhighlight %}

Click to [download the program in its current state](https://gist.github.com/andrewfhart/d2210f0b60cb3f344807).



Step 2: Program Flow
====================

Alright, at this point you should have convinced yourself that the board works as expected, as long as the inputs
correspond to our assumptions. Let's revisit the `main` function and try to determine what the program flow looks
like as a whole. In this exercise, we're going to think about what it means to play tic-tac-toe: what happens, 
what order do things happen in, and how do we know when we're done?

For complicated programs, this kind of thinking is best done well away from a keyboard, where you're less tempted to
start writing code. Use a pencil and paper, a whiteboard, or anything where you can really explore the problem and 
draw pictures and diagrams to describe what is going on.

Since Tic-tac-toe is relatively simple, I like to organize my thoughts by inserting comments directly in the 
`main` function. These serve as placeholders for things I'll come back and implement. Generally, each of these 
comments represents one of the sub-problems we talked about in Step 0.

Remember, the specifics of the program flow _will_ change and evolve as you get into your implementation. These
comments are here to help you remember the big picture. It's fine if they change over the course of building
out the program.

What are the main steps of the program? At the highest level, they could be described as:

1. We'll need to determine who goes first. Either the user or the computer. 
2. We'll need to play the game, with each user taking turns making moves
3. We'll need to say who won

Right there, we've identified a couple of pieces of information we'll need to keep track of. Can you think of
what they are?

1. We need a way to store "whose turn is it right now?" A `bool` variable might work nicely here, since there are only two options: the user or the computer
2. We need a loop of some sort to help us progress through the game, since it is a turn-based game.
3. We'll need a way to keep track of "is the game over?" A `bool` variable might work nicely here too, for now, since the game is either over, or it isn't. When it comes time to say "who won" there are actually 3 outcomes: the `user`, the `computer`, or a `draw` or tie. So we might have to update this use an `int` or `enum`.

Before we move on, let's take a moment to dig into step (2) a bit more. What does "we'll need to play the game" really mean? Well, we could think of it as the following four things happening again and again, in a loop, as long as the game isn't over:

1. we draw the board in its current state
2. current player makes a move
3. we check if the current player just won the game
4. we swap the current player so the other player becomes the current player

And look - we already have (1) in place! That's our `drawBoard` function. Cool! Now we can start to arrange all of this information in our `main` function, and our game's main loop is really starting to take shape:

{% highlight c++ %}
int main (int argc, char* argv[])
{
  // State variables
  //
  // Board:
  //     0   1   2
  //   +---+---+---+
  // 0 |   |   | x | x = board[0][2]
  //   +---+---+---+
  // 1 |   |   |   |
  //   +---+---+---+
  // 2 |   |   |   |
  //   +---+---+---+
  //
  // Each board square will be in one of three possible
  // states:  0=empty, 1=owned by 'x', 2=owned by 'o'.
  int board[3][3] = {};

  // Flag to determine whether or not the game is finished
  // false: game should end: someone has won or there are no more valid moves
  // true:  game may continue
  bool gameIsValid = true;

  // Flag to determine whose turn it is
  // false: it is the computer's turn to make a move
  // true:  it is the player's turn to make a move
  bool playerTurn = true;

  /* Game Flow */
  // 1. determine who goes first
  // 2. Enter the main game "loop"
  while (gameIsValid) {
    // a. draw the board
    drawBoard(board);
    // b. current player makes a move
    // c. check if the current player has just won
    // d. swap current player
  }
  // 3. print final game result message
}
{% endhighlight %}

Click to [download the program in its current state](https://gist.github.com/andrewfhart/a5728d2a916a386264ea).

Step 3: Start filling in the gaps
=================================

Now that we've laid everything out, and have spent time thinking about the problem and planning our solution, it's time to
start imeplementing our solution in code. Fortunately, thanks to the work we've done so far, we now have a blueprint for what
needs to be done, so all we really have to do is think of a good way to implement it. Let's start with something 
easy: determining who goes first.

This is really just a coin flip. Either the user will go first, or the computer will go first. We could use a randomly
generated number to ensure this happens with equal probability.

We know how to implement a random number generator for values between `0` and `some_number`, exclusive:

{% highlight c++ %}
int val = rand() % some_num; 
{% endhighlight %}

So in this case, since we want to generate either a 0 or a 1 for our boolean `playerTurn` variable, we could do:

{% highlight c++ %}
playerTurn = rand() % 2;
{% endhighlight %}

That should do it! But we have to remember two things: we need to `#include <cstdlib>` to get access to the `rand()` function, and we need to remember to randomize the seed via `srand()` so that we actually get random numbers. Remember also that if you choose to use the current time in seconds as your seed, you'll need to `#include <ctime>` as well: `srand(time())`.

So, with that in place, our game loop now looks like:

{% highlight c++ %}
...
/* Game Flow */

// 1. determine who goes first
playerTurn = rand() % 2; // coin flip

// 2. Enter the main game "loop"
while (gameIsValid) {
  // a. draw the board
  drawBoard(board);
  // b. current player makes a move
  // c. check if the current player has just won
  // d. swap current player
}

// 3. print final game result message
...
{% endhighlight %}

Click to [download the program in its current state](https://gist.github.com/andrewfhart/cb3ce23ed91897f50e37).

Step 4: Getting Input from the User
===================================

According to our blueprint, the next unfinished task is the task of the "current player makes a move." As you think about this, you should realize that this step actually has two different interpretations: the current player might be the user on one turn, and the computer on the next. Making a move has very different implications depending on who our current player is. How could we structure this portion of our program to account for this? One way would be to just write everything we need for both implementations right there, in the main loop. 

That would not be very clean, though, and it would make our main loop harder to understand. It would be much nicer if we could find a way to structure things so that "getting the next move" was a function. We want our functions to have good design, though, and that means making sure each function does one thing, and only one thing. So in this case, we probably want to have _two_ functions: one to ask the user for the next move when it's the user's turn, and one to calculate the next move when it's the computer's turn.

Since we already have the `playerTurn` variable telling us whose turn it is, something like this would be really nice:

{% highlight c++ %}
if (playerTurn) {
  // Some function for asking the user what the next move should be...
  nextPlayerMove(board);

} else {
  // Some function for determining what the next move should be...
  nextComputerMove(board);
}
{% endhighlight %}

That's the wonderful thing about breaking problems down into sub-problems. We can sit here and think specifically about individual things like "how would i _like_ this to work?" without worrying too much about all of the other parts of the problem.  

In this case, we can calculate the player's next move by calling a function we'll write (`playerNextMove`) and the computer's next move by calling a different function we'll write (`computerNextMove`). You may notice I've included the `board` as a parameter to each function. Why? Well - because it seemed useful to me, based on thinking about _what it means_ to choose a valid move. The key word here is *valid*: our user is not free to choose any cell on the board at any time! The user may only choose spaces that have not previously been chosen. In other words: we need to know which cells are empty in order to be certain that the user has given us good input. Since `board` is our container for information about the current state of every cell, it makes sense that we provide it to the function. 

Another thing to note about the idea of validation. Validating user input, in this case, is entirely part of "getting the next player move." As such, we should handle validation _inside_ the `playerNextMove()` function, and not pollute the outside world with the concern of validating the result. In other words, the rest of the program should be able to confidently assume that the result of calling `playerNextMove()` leaves the board in a valid state.

There's some nice symmetry to our implementation now. Looking at the code, it reads (almost) like English:

> If it is now the player's turn, get the player's next move using the current state of the board. Otherwise (else), it must be the computer's turn, so get the computer's next move using the current state of the board.

Let's turn now to the `nextPlayerMove()` function. Since we're passing the current state of the board via `board`, and since `board` is an array, we can manipulate the variable directly to update the state, once we've validated the user input. So, in other words, `nextPlayerMove()` can be a `void` function since we'll directly update `board`:

{% highlight c++ %}
void nextPlayerMove(int board[][3]) {
  int row, col;        // containers to hold input from the user
  // our implementation here
  //...
  // at the end, we'll want to directly update board with the validated
  // move so that it gets recorded as the new current state of the board:
  board[row][col] = 1; // 1 means our user, 'x' when we draw the board. Really wish we'd used
                       // an enum here instead of these magic numbers! We'll have to fix this
}
{% endhighlight %}

OK, again, we've created a scaffold or blueprint of what we want to have happen in this function. It allows us to now focus on the implementation. We could simply `cin` the values for starters, but -- have we thought about how we want the user to give us input? The board we drew earlier uses letters for columns and rows for numbers, like Excel. We'd better use the same assumptions here when we're asking the user to enter input. It would be easier for _us_ if everything were numbers (since those can be used as direct array indices), but it's easier for our user if we use one letter and one number. Well, we know there's a very limited number of "correct" values, so we could simply translate for the user:

{% highlight c++ %}
void nextPlayerMove(int board[][3]) {
  int  row, col;       // containers to hold input from the user
  char col_c;          // container to hold the character input from the user
  
  cin >> col_c >> row; // obtain input from user (e.g.: A 1)
  // Translate character input for column into numeric equivalent
  if      (col_c == 'a' || col_c == 'A') { col = 0; }
  else if (col_c == 'b' || col_c == 'B') { col = 1; }
  else if (col_c == 'c' || col_c == 'C') { col = 2; }
  else {
    cout << "! Invalid column value entered. Your choices are: [A, B, C] " << endl;
  }
  // the rest of our implementation
  // ...
  // at the end, we'll want to directly update board with the validated
  // move so that it gets recorded as the new current state of the board:
  board[row][col] = 1; // 1 means our user, 'x' when we draw the board. Really wish we'd used
                       // an enum here instead of these magic numbers! We'll have to fix this
}
{% endhighlight %}

Validating the row input should be much easier, since it was given to us directly as an integer:

{% highlight c++ %}
// Validate the provided row value
if (row < 0 || row > 2) {
  cout << "! Invalid row value entered. Your choices are: [0, 1, 2] " << endl;
}
{% endhighlight %}

Now, we said earlier that we want the result of calling `nextPlayerMove` to be a valid update to the current state of the board. In other words, we need to handle all validation _inside_ this function. What should we do, then, when the user gives us bad input? Well, one solution would be to implement a loop, and continue to ask the user for input until the user finally gives us something that validates. That would be a _good_ solution, in this case, because all of the logic for handling user input and validation of that input is neatly wrapped up in one function. The rest of the program can call this function and be confident we'll leave the board in a good (valid) state. See if you can figure out how to implement the loop necessary to ensure that all of the input is properly valid. Keep in mind the three criteria:

1. The coordinate of the row must be between 0 and 2
2. The coordinate of the column must be between 0 and 2 (but given as A, B, or C)
3. The value of the corresponding location in `board` must be empty (`0`)

When you've worked on it a bit, compare what you have to this complete example:

{% highlight c++ %}
/** 
 * Get the next move from the player, and make sure that the
 * desired move is valid. Validity means:
 *   - column value is within bounds [A, B, C]
 *   - row value is within bounds    [0, 1, 2]
 *   - the selected cell is empty    board[row][col] == 0
 * Once input has been validated, update the board.
 *
 * @param  int[3][3] board  The current state of the board
 * @return void
 */
void nextPlayerMove(int board[][3]) {
  bool col_valid;         // Flag for column validity
  bool row_valid;         // Flag for row validity
  char col_c;             // container for the character value of the column
  int  col;               // container for the integer value of the column
  int  row;               // container for the integer value of the row

  cout << "Your turn. Where would you like to move next?" << endl;
  cout << "Type your move as two characters separated by a space (ex: A 1)" << endl;
  
  do {
    col_valid = true;     // assume correct input until proven wrong via tests later
    row_valid = true;     // ...
    // Obtain input from the user (one character for column, one int for row)
    cin >> col_c >> row;
    
    // Validate the provided column value
    if      (col_c == 'a' || col_c == 'A') { col = 0; }
    else if (col_c == 'b' || col_c == 'B') { col = 1; }
    else if (col_c == 'c' || col_c == 'C') { col = 2; }
    else {
      cout << "! Invalid column value entered. Your choices are: [A, B, C] " << endl;
      col_valid = false;
    }
    
    // Validate the provided row value
    if (row < 0 || row > 2) {
      cout << "! Invalid row value entered. Your choices are: [0, 1, 2] " << endl;
      row_valid = false;
    }
    
    // Ensure that the choice corresponds to an empty cell
    if (row_valid && col_valid && board[row][col] != 0) {
      cout << "! That cell is not empty. Please try a different cell " << endl;
      col_valid = false;
      row_valid = false;
    }
  } while (!col_valid || !row_valid);

  // Update the board with the user's latest choice
  board[row][col] = 1;  // user is always 'x'
}
{% endhighlight %}

Click to [download the program in its current state](https://gist.github.com/andrewfhart/f7c54954b0d1f84b663a).


Step 5: Adding Intelligence
===========================

At some point, the computer is going to have to make a move. We've just finished the part of the program that allows us to get information from the user, via `cin`, and to validate that information. Clearly, we can't take the same approach when it's the computer's turn. It's up to _us_, the developers, to write the logic the computer will use to make its move.

Before we get too wrapped up in how difficult that sounds, let's follow the principles that have successfully gotten us this far: do the minimum amount of work to be able to test and move on. We can _always_ make the program smarter, or more efficient, later. For now, let's do the minimum: have the computer choose a random empty cell every time it's its turn.

THAT's a problem we can solve. In fact, why don't you do it now. Here's a scaffold for you:

{% highlight c++ %}
/**
 * Determine the next move the computer should make. For now
 * the strategy will be simple: randomly pick an available 
 * cell.
 * Once a cell has been picked, update the board
 * 
 * @param  int[3][3] board   The current state of the board
 * @return void
 */
void nextComputerMove(int board[][3]) {
  int row, col;

  // Choose an *available* cell at random from the board

  // Update the board state
  board[row][col] = 2; //  computer is always 'o'. Ugh, again with the magic numbers.
                       //  We'll definitely have to fix this in a future step.
}
{% endhighlight %}

When you're done, compare your solution to this working example (If you cheat, it's not hurting me, just you...)

{% highlight c++ %}
/**
 * Determine the next move the computer should make. For now
 * the strategy will be simple: randomly pick an available 
 * cell.
 * Once a cell has been picked, update the board
 * 
 * @param  int[3][3] board   The current state of the board
 * @return void
 */
void nextComputerMove(int board[][3]) {
  int row, col;

  do {
    row = rand() % 3;  // Choose a random row
    col = rand() % 3;  // Choose a random column
  } while (board[row][col] != 0); // If taken, try again

  // Update the board state
  board[row][col] = 2; //  computer is always 'o'. Super ugly magic numbers
                       //  make an appearance again. We'll fix this next
}
{% endhighlight %}

Great. We've just programmed some "artificial intelligence" into our game. It now makes a move all by itself! It's not very "smart," but we'll get there.

Notice how all of the functions I've written have *lots* of comments? Each one has a little block comment on top that describes what it does, and most of them have inline comments to clarify the intention of individual lines. I bet it made it easier for you to follow. You should program this way too. Make things easier on yourself and others. 

Before we finish, let's make sure we can call this function from our `main` function:

{% highlight c++ %}
...
if (playerTurn) {
  // Some function for asking the user what the next move should be...
  nextPlayerMove(board);

} else {
  // Some function for determining what the next move should be...
  nextComputerMove(board);
}
...
{% endhighlight %}

Click to [download the program in its current state](https://gist.github.com/andrewfhart/e79eb09682313c0cf94c).

Step 5.5: Cleaning up our act
=============================
We've done pretty well so far, but there is one problem with our code that you might have spotted, and that we should address before we go further: we use a lot of magic numbers instead of `enum` values. `enum` was _designed_ to allow programmers to avoid putting random "magic" numeric values all throughout their programs. Here's a perfect example of the problem: 

{% highlight c++ %}
// Update the board state
board[row][col] = 2; //  computer is 2, uses symbol 'o' when drawn on board.
{% endhighlight %}

We're trying to say that the computer should be marked as the owner of this cell. But it is _not_ clear just by looking at it that `2` means "computer". If we had an `enum`, defined outside of `main` and outside of any functions so that we can use it anywhere, like this:

{% highlight c++ %}
/** 
 * Enumerate the possible states of a cell in the game. 
 */
enum {EMPTY, USER, COMPUTER};  // the compiler assigns EMPTY=0, USER=1, and COMPUTER=2
{% endhighlight %}

... then we could use *words* instead of numbers in our program, and things would be much clearer: 

{% highlight c++ %}
// Update the board state
board[row][col] = COMPUTER; //  computer owns this cell now.
{% endhighlight %}

Nothing changed behind the scenes - the compiler still sees an integer. But we as programmers can deal with *words* that we're much more comfortable with. Why don't you take a moment to update your code to use the `enum` above, and make it much clearer and easier to maintain.


Step 6: Knowing when to Quit
============================

Well, we've come a *long* way so far: we've got a program that can hold and display the internal state of the game, a way to ask for and validate user input, and even a way for the computer to "intelligently" choose its own moves. According to our blueprint, what we need now is a way to know when the game is over. 

Let's do the same thing we did earlier: plan how we'd _like_ it to look, and then structure the implementation to make that work. 

The relevant portion of our `main` loop looks like this, in blueprint form:
{% highlight c++ %}
  ...
  // c. check if the current player has just won
  // d. swap current player
}

// 3. print final game result message
{% endhighlight %}

Well, what if we had a function called `isGameOver` that would be able to determine whether or not the game was still valid? That would be useful here. It would be even more useful if that function also told us _how_ the game ended, particularly because we'll soon need to know that information in order to print the final game message. Perhaps the two could be combined into one, since we'll discover how the game ended in the process of determining if it in fact ended at all.

Let's review the four possible states the game can be in:

1. In progress - the game has not ended yet: no one has won, and there are valid moves left
2. User won - the user has successfully marked 3 cells in a row
3. Computer won - the computer has successfully marked 3 cells in a row
4. Draw - neither the user or the computer was successful, but there are no valid moves left

Hmm.. this seems like another good use case for using an enum. Let's define one for this:

{% highlight c++ %}
/**
 * Enumerate possible states the game can be in. The game is either
 *  IN_PROGRESS  - neither player has won, and there are still valid moves
 *  USER_WON     - user won by matching three in a row
 *  COMPUTER_WON - computer won by matching three in a row
 *  DRAW         - neither player has won, but there are no valid moves left
 * 
 * See the function `isGameOver` for related logic
 */
enum {IN_PROGRESS=0, USER_WON=USER, COMPUTER_WON=COMPUTER, DRAW};
{% endhighlight %}

Notice how we manually specified values this time? This allows us to specify that `PROGRESS` should be `0`, and `USER_WON` should be set to whatever `USER` is (defined in the other `enum`), and `COMPUTER_WON` should be set to whatever `USER` is, etc. Remember, `enum`s just provide *aliases* for integer values.

So, we might design a function called `isGameOver` to return an `int` value that was one of `IN_PROGRESS`, `USER_WON`,  `COMPUTER_WON`, or `DRAW` to account for each of the four possible outcomes. Such a function would, of course, need to be given the current state of the board (`board`) so that it could do the calculations. This seems reasonable. If we _did_ have such a function, our game flow blueprint could be updated as follows:

{% highlight c++ %}
...
// c. check if the game should end
if (isGameOver(board) > 0) {
  break; // game is no longer in progress, break out of game loop
} else {
  // d. swap current player (and stay in loop to continue playing)
}
...
{% endhighlight %}

Notice I changed the text of the blueprint to "check if the game should end" because it more directly corresponds with what we actually want now. As I said in step 0, blueprints are just that: guides. As the program evolves, they may change.

While we're here - let's just handle (d.) since it is so simple. Our `playerTurn` variable is holding information on whether or not it is currently the player's turn (`true`) or the computer's turn (`false`). To swap players after a turn, we simply need to set the value of `playerTurn` to `true` if it was `false`, or to `false` if it was `true`. Why don't you do that now.

OK, so now we need to actually implement this `isGameOver` function we've been talking about. We know it returns an integer. We know the value of that integer will be `IN_PROGRESS`, `USER_WON`, `COMPUTER_WON`, or `DRAW` depending on whether the game is still in progress, the user has won, the computer has won, or the game ended in a tie. We know it needs to be given the current state of the board in order to figure any of this out. Here's a reasonable scaffold for the `isGameOver` function. Use your knowledge of logic, of tic-tac-toe rules, and of multi-dimensional arrays to determine how to get the computer to know when the game is over.

{% highlight c++ %}
/**
 * Determine the status of the game given the current state
 * of the board. The status can be one of 4 values:
 *   IN_PROGRESS  - valid: no one has won yet, and there are valid moves remaining
 *   USER_WON     - invalid, user has won
 *   COMPUTER_WON - invalid, computer has won
 *   DRAW         - invalid, draw - no one has won but there are no valid moves remaining
 *
 * @param  int[3][3] board   The current state of the board
 * @return int               The status of the board in its current state
 */
int isGameOver (int board[][3]) {
  // your implementation here:

  // one suggested approach:
  // For each of the two players, determine if that player has "won". If it has, return the appropriate enum value
  // If no one has won, determine if there are any moves left. 
  // If there are valid moves left, return the enum value for game in progress
  // If there are no valid moves left, return the enum value for a draw (tie)
}
{% endhighlight %}

Click to [download the program in its current state](#).
(Solutions will be made available after 11/21)

Step 7: Printing the final message
===================================

We're getting to the very end here... more coming soon.

Step 8: Getting Strategic
=========================

In which we implement some better algorithms for choosing the next cell... more coming soon

Step 9: Wrapping up
=========================

In which we put the final touches, and talk about testing... more coming soon





