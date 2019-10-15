# Front End Sample Code Stack Comparison

| Platform | Building Block | Entry Point | MVC Touch Points | Async Mechanism |
| -------- | -------------- | ----------- | ---------------- | --------------- |
| Traditional web | HTML/CSS/JS | _index.html_ | DOM (via jQuery), events | `Promise`/`async`/`await` |
| React (classes) | `Component` class | _App.js_ | state (instance variable) + props (constructor argument), events | `Promise`/`async`/`await` |
| React (hooks) | functions that return JSX | _App.js_ | state (local variable via `useState`) + props (function argument), events | `Promise`/`async`/`await` |
| iOS | view controller | initial view in storyboard | outlets, actions (events) | callbacks |
