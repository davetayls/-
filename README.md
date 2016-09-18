# ★ Responsive Grid System

This began as a bit of an experiment but is proving to be quite useful.

It is a grid system based on fractions which encourages modular semantics and flexibility to control a cell based on it's context within the system.

## Installation

Currently only available from the dist folder in this git repo or npm.

`npm install blackstar --save`

## Rules

### All columns should be wrapped in the `★` class.

### Media Sizes
The media sizes available currently map to these media queries however this might change to target particular sizes.

| Size | Media Query |
| -- | -- |
| No namespace | everywhere |
| `sm` | (min-width: 568px) |
| `md` | (min-width: 768px) |
| `lg` | (min-width:1024px) |
| `xl` | (min-width: 1280px) |

### Cell ClassName format

Class names for cells follow the following format and allow for the fractions based on 1,2,3,4,6

`★[namespace]-|[fraction][|fraction]`

Here are some examples:

```
★-|1 => full width block
★-|1/2 => half
★-|2/3 => two thirds
★-|2/3|1/2 => half when inside two thirds

★sm-|1 => full width block on small device
★sm-|1/2 => half on small device
★sm-|2/3 => two thirds on small device
★sm-|2/3|1/2 => half when inside two thirds on small device
```

Nesting is provided for a single level deep. So we don't currently include something like `★-|2/3|1/2|1/2`.

## Examples
Here are some examples of what it might look like:

```
  <div class="★">
    <div class="★-|1/3">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2 ★-|1/2|1/2 ">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1 ★-|1/2|1">
      <div>...</div>
    </div>
  </div>
```

## Gutters
```  
  <div class="★ ★--gutters">
    <div class="★-|1/3 ★sm-|1/2">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1">
      <div>...</div>
    </div>
  </div>
```

## Responsive Gutters
```  
  <div class="★ ★md--gutters">
    <div class="★-|1/3 ★sm-|1/2">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1">
      <div>...</div>
    </div>
  </div>
```

## Gutters with flush
```
  <div class="★ ★--gutters">
    <div class="★-|1/3 ★sm-|1/2 ★-|flushLeft">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1 ★-|flushRight">
      <div>...</div>
    </div>
  </div>  
```

## Responsive Gutters with flush
```
  <div class="★ ★md--gutters">
    <div class="★-|1/3 ★sm-|1/2 ★md-|flushLeft">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1/2">
      <div>...</div>
    </div>
    <div class="★-|1/3 ★sm-|1 ★md-|flushRight">
      <div>...</div>
    </div>
  </div>  
```
