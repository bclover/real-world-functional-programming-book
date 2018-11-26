# Getting and Setting Data

A lot of functional programming revolves around functions. Getting and setting data is a crucial part in programming. It's also how you easily violate pure function rules by mutating data or creating null pointer exceptions.

Herein we'll cover the normal ways of getting & setting data, and why that isn't pure. We'll then cover the various safe and terse ways we can get data purely. Finally, we'll cover some basic getting and setting of data using lenses, prisms, and traversals via [Ramda](https://ramdajs.com/docs/) and [Focused](https://github.com/yelouafi/focused).
