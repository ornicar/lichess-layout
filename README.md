playground for new lichess layout

## Install

    yarn install

## Build

    gulp

## Hack

Most of the relevant layout code is in scss/components/_layout.scss.
The page will update on save as long as `gulp` is running.

## Goals

Responsive layout from 1 to 3 columns.
The board should occupy as much space as possible.

## Notes

Having a square element (the board) is difficult to do in CSS.
That's the main challenge of this layout experiment.
The current technique being used is the `padding-bottom` hack:
```
.site__main #board {
  height: 0;
  padding-bottom: 100%;
  width: 100%;
}
```
It works reasonably well without complicating the CSS.
Another option is complex calculations for the grid templates,
based on the vmin/vmax units, but it was harder to maintain.

Another option could be to adjust the board size with JavaScript.
This should be avoided if possible.
It requires displaying the layout in order for JavaScript
to measure distances, then changing elements sizes, and finally
redisplay the whole layout, causing reflows and slowing down
the page. Any pure CSS solution would be preferable to that.
