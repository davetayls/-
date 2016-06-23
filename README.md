# ★

A challenge to myself to design a responsive system which can bend to **someone else's** will

I want to start by what it looks like and how it can cope with demands rather than what tech is used underneath.

I want it to be concise, readable and customisable at different responsive points.

I want it to focus on components and allow markup to be placed in different
locations and "just work" or give you the power to fix it.

I want to give this enough power that you don't need to add custom styling

Despite common best-practices, i wonder whether a structure based on fractions rather than columns
will be easier to work with and a lot less css heavy or complex. So I'm going to try it. The understanding
being that

a) designers don't always follow their own best practices and we have to accommodate it anyway
b) developers can apply some nesting thought as they build

Here's an initial musing:

```html
<h1>Basic Grid Fractions</h1>
  <div class="★">
    <div class="★-|1/3 ★sm-|1/2">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1">
      <div class="◘">1/3</div>
    </div>
  </div>
  
  <h1>Gutters</h1>
  <h2>Gutters everywhere</h2>
  <div class="★ ★--gutters">
    <div class="★-|1/3 ★sm-|1/2">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1">
      <div class="◘">1/3</div>
    </div>
  </div>  

  <h2>Gutters on cols</h2>
  <div class="★">
    <div class="★-|1/3 ★sm-|1/2">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1">
      <div class="◘">1/3</div>
    </div>
  </div>  

  <h2>Gutters with flush</h2>
  <div class="★ ★--gutters">
    <div class="★-|1/3 ★sm-|1/2 ★md-|--flushLeft">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div class="◘">1/3</div>
    </div>
    <div class="★-|1/3 ★sm-|1 ★md-|--flushRight">
      <div class="◘">1/3</div>
    </div>
  </div>  
```
