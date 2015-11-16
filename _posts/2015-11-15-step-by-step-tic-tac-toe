---
layout: post
title:  "Step-by-Step Tic-Tac-Toe"
date:   2015-11-15 17:38:12
categories: cs002 tutorial
---

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

I've designed this tutorial as a way to share with you the process that I use to implement ideas in code. In this case, we'll be 
dealing with a relatively simple idea (on the surface): creating an interactive game of Tic-Tac-Toe in which the user and
the computer compete with one another to win the game. Like most problems, this problem has many sub-problems hiding inside of it.
Before reading on, can you think of any? What functionality would we need? What are the rules of the game? What information 
would we be required to keep track of? How will we know when the game is over? How will we know who has won? Whose turn it is?

When faced with a problem like this one, the first thing you should ask yourself is: do I understand what is being asked of me?
Are the requirements clear? What hidden assumptions am I making? Am I assuming, for example, that the user will always go first?
Am I assuming that the size of the board is always 3x3? You are _certainly_ making assumptions. Good programmers are aware of
the assumptions they make. Examine those assumptions: they often tell you about things you'll need to consider when implementing
your solution in code.

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

All of this work, so far, and we haven't written 1 line of c++. A better way of looking at it is: we haven't wasted 1 second
writing code we might possibly never use, or want. Let's do something that will clearly be useful, at this point, since we 
know we're going to be needing it for just about everything else down the line: let's figure out the minimal amount of 
code we'd need to just draw a tic-tac-toe board.

We don't need to make it perfect. In fact, since we don't have the rest of the functionality in place yet to play the game, we 
probably can't make it perfect, since so many important decisions have yet to be made. All it has to do at this point
is look roughly like a tic-tac-toe board and we'll be happy. This is a sketch. We'll put in the details as we go along. 

Since drawing the board is a nice, self-contained piece of functionality, it makes sense to implement it as a function. Before
we make the function, let's spend a few moments thinking about the main part of the program:

{% highlight c++ linenos %}
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
When it comes to drawing the board, we'll represent those three states with either an empty space, an 'x', or an 'o'.
The second thing this program does is call a (currently non-existant) function `drawBoard(board)`, passing to it as a parameter 
the 2D array of integers we just defined. This seems reasonable: in order to properly draw the board, we're going to need to
know the current state of each of the cells in the board -- and this is what our `board` variable holds.

Let's take a crack at implementing the `drawBoard` function now. To start with, we'll entirely ignore the `board` parameter -- we
haven't initialized it to anything, and have not spent any time thinking about exactly how we'll represent everything. For right
now we just want to get a 3x3 grid up on the screen. Here it is:

{% highlight c++ linenos %}
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



