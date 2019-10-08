# Unique View Time (UVT)

## Code Challenge

_Instilled_ ​tracks the users experience of a particular video to a very granular level of detail. The result is a record for each “fragment” of video watched, detailing at which point in the video the viewed fragment began and at which point it ended.

One way we try to make sense of this data is the concept of “unique view time” or UVT: that is, a metric that makes sense of the question, “How much of a given video has this user watched at least once?”. For example, if I watch the first two minutes of the video and then go back and rewatch seconds 30 through 45, the UVT is still two minutes. Conversely, if I watch the first minute and the last minute of a two-hour video, my UVT is also two minutes.

Your objective is to write code that accepts a collection of viewed fragments as input and outputs the UVT. Viewed Fragments will consist of the start and ending time in ms of a given watched fragment of video. (It is up to you how to represent viewed fragments in your code.) Assume that the input is not sorted in any particular way.

---

## General Approach

* "Whiteboard" the problem to identify the larger problem, and any potential blockers
* Target the core functionality of the problem: "managing fragments"
* Tackle secondary challenge to visualize the aggregated "slices"
* Create a means for testing the solution dynamically without constraint
* Extend the challenge to roughly replicate the concept of creating fragments with videos (currently only produceable using `yarn serve`)
* Create the initial tests that define the core functionality
    * Additional tests required to identify edge cases to protect

---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```
