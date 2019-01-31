playground for new lichess layout

## Install

    yarn install

## Build

    gulp

## Hack

Most of the relevant layout code is in scss/components/_layout.scss.
The page will update on save as long as `gulp` is running.

## Goals

- Only play page for now.
- Responsive layout from 1 (or 2?) to 3 columns.
- Handle large desktop screens, all the way to tiny vertical cell phone.
- The board should occupy as much space as possible.
- The entire board must be above floating point.
- The clocks must be above floating point.
- In 3 columns mode, the full chat and chat input should be above floating point.

### Non-goals

- width  < 320px (iPhone 5 vertical)
- height < 320px

## Notes

### Square board

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

### Clocks

I don't think it's possible to move the clocks and board controls
from the right side to the top and bottom of the board, with just CSS.
In that case, we're stuck to 2 columns.

An alternative is to always have the clocks on top and bottom of the board.
Like chess.com does.
Cons:
- clocks should not be that far away one from another,
because it makes it harder to read them both at a glance.
- having clocks next to the board (as opposed to around the board)
has always been in lichess DNA.
- side clocks can be very large, there is room for it.
They're not competing with the board for vertical space.
