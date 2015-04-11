# Dungeon World Character Manager

This is my React playground. As such, it 1) lacks tests, 2) needs refactored, 3) is buggy, 4) is about as usable as a blister pack of arsnic pills.

## Run it

On OSX:

```
git clone [this thing]
cd dungeon-world-app
open index.html
```

On other systems: I mean you get the idea, right?

## TODO / Wishlist

+ Add reset button to the new character form
+ Redirect back to the dashboard after adding a character, with that char the new current char
+ Instead of listing stats on the sheet alphabetically, sort by mod? In theory, you will be using your +2 stat more often.
+ Model character sheet arrangement on default Dungeon Wolrd sheets (like, printable ones). OR whatever the community thinks is the best paper sheet.
+ Add an "Export to RPOL Format" button that exports rpol.net-compatible text that creates a nice looking character sheet using their mix of BB code and HTML.
+ Add level, experience needed for next level.
+ Add editable Current HP, Current XP, level (or calculate level from total XP - and keep a running XP instead of a reset)
+ Save to a database. It's all local storage in the browser at the moment.
