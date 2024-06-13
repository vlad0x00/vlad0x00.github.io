Title: Identifier naming
Date: 2024-04-15
Tags: software-engineering
Synopsis: The thought process behind naming things in computing.

Here's some patterns I've noticed in what I consider high quality code when it comes to coming up with names for identifiers for, e.g., variables.

Names should be as verbose as necessary to understand the meaning _in the context in which the identifer is found_, and not more than that. Too verbose and the code is bulky, hard to edit, and hard to understand by glancing over. Not verbose enough and the code is unclear in meaning. Context here could mean the project it is in, the function the identifier is used in (e.g. as a parameter), or the class it's a member of.

- Describe the identifier using only words necessary to clarify its meaning in the given context. If you have a function declaration `move_atom(AtomID id)` that simply changes the position of the given atom, it's sufficient for the parameter to be just named `id`, instead of, e.g. `atom_id`. However, the `atom_` prefix might be useful in a function that deals with multiple types of IDs. So if a function also deals with a `bond_id`, given the situation, it's good to add the prefix to clarify the distinction between the two IDs.

- Ordinal identifiers should only be used if the order matters. If you have a function declaration like `angle(Point pt1, Point pt2, Point pt3)`, the order would matter if `pt2` is the vertex of the angle. However, if you have `plane(Point pt1, Point pt2, Point pt3)`, the order of the points doesn't matter and a naming scheme that doesn't necessarily imply the order is better. So something like `plane(Point pti, Point ptj, Point ptk)` would be a better option.

    The rationale is that the code that calls `plane` might have a bunch of points, such as `pt1`, `pt2`, `pt3`, `pt4`, ... `ptn`. And this code might need to call plane like `plane(pt2, pt3, pt4)`. If we declare `plane(Point pt1, Point pt2, Point pt3)`, a static code analyzer, or a person reading the code, might flag this as a bug, seeing as we used `pt2` in place of parameter `pt1`, and `pt3` in place of parameter `pt2`. To avoid confusion with ordering, if the order doesn't matter, the identifiers should signal that.

- Abbreviations should be used in two cases:
    1. When they're commonly understood. E.g. `num` is commonly understood to mean `number` and `idx` to mean `index`. 
    2. When the meaning is clear from the context. E.g. if you have a class `Projectile`, `pos`, `vel`, and `accel` are sensible names for `position`, `velocity` and `acceleration` members as the context clarifies the abbreviations. In a different scenario, these names, and especially `vel` might not be clear.
