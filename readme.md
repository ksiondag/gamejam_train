# Game Jam: Train by Git Team

(not officially a part of any git organization)

## Post-Mortem

Super close second place! Woo!

I have once again learned to not try to use third-party libraries I haven't
used before during a game jam.

So, that's 2 times learned that lesson, and 1 time learned "it's fine to use a
new library for a game jam" lesson learned (see [Shapes in
Wonderland](https://github.com/ksiondag/gamejam_shapes_in_wonderland)).

I think the real lesson is, "If you're going to use a new language or library
in a Game Jam, using that language/library should be the focus of the Game Jam,
and you should go in planning to do that."

In fact, we can add "concepts" to "language/library" part of the lesson.

This game jam I went with an idea I've had for a while, making a time-travel
text adventure game out of git. So, this game jam was about that concept, and
all work should have been towards that end only, and finding a library that
would do it for was a big waste of time.

Also, implementing "traditional" text-adventure commands ended up eating a lot
of design, code, and just straight-up time of everyone involved. The git stuff
wasn't implemented until about 30 hours in, and only really took like 6 hours
of thinking and 2-3 hours of prototype code.

Oh, speaking of "prototype", I need to be okay with hacking something together
to just play with ideas quicker before trying to do things better. I mean,
trying to focus on quality first does not work, it ends up being a
hacked-together mess anyways. Might as well just go with whatever seems easiest
first and learn better strats as I hit the problems with my approach.

But anyways, things only came together once the git part of the game was
actually in the game. Focusing on the point is necessary.

I've always agreed with it, but now I've really come to appreciate
[design by subtraction](https://www.youtube.com/watch?v=AmSBIyT0ih0). At first,
there was going to be non-git actions, git committing, and git rebasing, and
maybe more. I also didn't think to use git log.

What the game became by the end was just git's log, branch, checkout, merge,
and basic commands "help", "quit", and "reset".

### The Good

Starting off with "Enter help for more information:" feels right. There's no
exposition dump, the player gets to play right away. The help command's
printout is properly short, and gives the player a good list of new things to
try. There's an instant feedback that invites the player to interact with a
fairly passive game.

Sticking on with the bare minimum of commands ended up being pretty perfect.
The git toolset already allows for a great variety of problems to solve, only
allowing the player access to those commands allows a focus on evolving the
complexities from a "simple" git toolset.

### The Bad

"Describe" started out as "History", which makes sense as an alias for "git
log" in this case. "Describe" was also present as a command, but it just
printed out a static description of the room, which was problematic as the room
changed but that description did not.

Getting rid of that static description was a good idea, but changing the
"history" command to "describe" was, unfortunately, confusing. It made the log
nature of the description unintuitive, and players did not understand why
descriptions repeated themselves in different branches of the level.

The game's code, also, is really just hacked together, and growing it with more
git commands and more sophisticated puzzles will most certainly require a
rewrite of the entire "engine". Which is completely fine, as it gives me an
excuse to use this idea for future game jams.

The... "antagonist", for lack of a better term, was, well, lacking. The writing
overall was a bit inconsistent, it's something that's going to need work going
foward.

### The Interesting

Every single player when starting the game, typed "help", got the list of
commands, typed the second command ("describe"), saw a prompt to "Push the
button", and typed out "push the button".

Without meaning to, I took advantage of an affordance of text-adventure games
(trying real world verbs on present nouns) to teach the player that the game
wasn't following the expected text adventure rules.

The player saw "push the button is an unrecognized command" and then started
further exploring the available commands listed out in "help". The player would
usually try out "realities", see a reality named "button_pushed" and
instinctively "warp" to that reality, moving on to the next level.

It felt like a perfect introduction to the surface mechanics of the game.

### Going Forward

I'd like proper browser support next iteration. It doesn't need to use
[js-git](https://github.com/creationix/js-git), I've learned that hacking
something together that sorta works and improving from there is the way to go,
at least until I got the experience to really understand how to do something
right the first time.

I'll probably just save various save-games on the server, and serve the content
necessary based on user commands. Ugly and inefficient, but I'll know how to do
it somewhat quickly.

I'd like to incorporate js-git eventually, and have everything efficiently
saved browser-side if possible. But that needn't be the focus next time.

Further, I think a non-malevolent origin of exposition and narrative should be
guiding the player along in the logs. I feel that's a better metaphor for one's
introduction to git, and I do eventually want this whole thing to be a proper
introduction to git.

I think, narratively, I'd like the game to be an exploration of
"fourth-dimensional" thinking. Somewhat akin to the fourth-dimensional
[Tralfamadores](https://en.wikipedia.org/wiki/Tralfamadore) in
Slaughterhouse-Five. Git could be a third-dimensional being's limited means of
interacting with the fourth dimension.


### Conclusion

Super happy with how this game jam went, and I really like the end-result.
Looking forward to exploring this idea further and really polishing the
presentation of the whole thing.

Hopefully, I have time during [Ludum Dare 35](https://twitter.com/ludumdare/status/721141090993049600)
to do another iteration of this.

Maybe I'll have time to give the game a proper title.

Anyways, "gamejam_train" finds its last commit with this post-mortem. Though,
perhaps I'll update this readme with the next iteration.

