andrewfhart.github.com
======================

Personal website implemented in HTML, Javascript, and CSS[Jekyll](http://jeklyllrb.com/), and hosted with [GitHub Pages](https://pages.github.com/).

Installation
------------

The website utilizes [Jekyll](http://jekyllrb.com/) to generate static views for all of the pages. Installation is as easy as: 

```
~$ sudo apt-get install ruby ruby-dev rubygems
~$ (sudo) gem install jekyll
```

Next, install [Pygments](http://pygments.org/) to enable support for syntax highighting in blog posts and elsewhere:

```
~$ sudo apt-get install python-pygments
```

Development
-----------

When developing, start Jekyl with the `--watch` flag to have it automatically recompile files when changes occur:

```
~$ jekyll serve --watch
```

Production
----------

Currently, this site is hosted using [GitHub Pages](https://pages.github.com/). Deploying changes to production is as 
simple as pushing them to the `origin` repository hosted at [https://github.com/andrewfhart/andrewfhart.github.com](https://github.com/andrewfhart/andrewfhart.github.com).